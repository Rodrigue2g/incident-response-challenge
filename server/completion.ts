import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import {
  completionSigningKey,
  pwnIssuerSecret,
} from "@/server/generated-admin-credentials";

export const COMPLETION_COOKIE = "citadelle_challenge_complete";
export const COMPLETION_MAX_AGE = 60 * 60 * 4;
const TOKEN_TTL_MS = 30 * 60 * 1000;

const globalTokens = globalThis as typeof globalThis & {
  citadelleUsedCompletionTokens?: Set<string>;
};
const usedTokens =
  globalTokens.citadelleUsedCompletionTokens ??
  (globalTokens.citadelleUsedCompletionTokens = new Set<string>());

function equalText(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function signature(payload: string): string {
  return createHmac("sha256", completionSigningKey)
    .update(payload)
    .digest("base64url");
}

export function validPwnIssuerSecret(value: string | null): boolean {
  return typeof value === "string" && equalText(value, pwnIssuerSecret);
}

export function issueCompletionToken(): string {
  const payload = Buffer.from(
    JSON.stringify({
      nonce: randomBytes(24).toString("base64url"),
      exp: Date.now() + TOKEN_TTL_MS,
    }),
  ).toString("base64url");
  return `${payload}.${signature(`completion-token:${payload}`)}`;
}

export function redeemCompletionToken(token: string): boolean {
  if (usedTokens.has(token)) return false;
  const [payload, suppliedSignature, extra] = token.split(".");
  if (!payload || !suppliedSignature || extra) return false;
  if (
    !equalText(
      signature(`completion-token:${payload}`),
      suppliedSignature,
    )
  ) {
    return false;
  }

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { nonce?: unknown; exp?: unknown };
    if (
      typeof data.nonce !== "string" ||
      typeof data.exp !== "number" ||
      data.exp <= Date.now()
    ) {
      return false;
    }
    usedTokens.add(token);
    return true;
  } catch {
    return false;
  }
}

export function createCompletionCookie(): string {
  const payload = Buffer.from(
    JSON.stringify({
      complete: true,
      exp: Math.floor(Date.now() / 1000) + COMPLETION_MAX_AGE,
    }),
  ).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function verifyCompletionCookie(value: string | undefined): boolean {
  if (!value) return false;
  const [payload, suppliedSignature, extra] = value.split(".");
  if (!payload || !suppliedSignature || extra) return false;
  if (!equalText(signature(payload), suppliedSignature)) return false;

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { complete?: unknown; exp?: unknown };
    return (
      data.complete === true &&
      typeof data.exp === "number" &&
      data.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}
