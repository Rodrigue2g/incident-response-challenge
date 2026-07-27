import "server-only";

import {
  createHmac,
  pbkdf2Sync,
  timingSafeEqual,
} from "node:crypto";
import {
  adminPasswordHash,
  adminPasswordSalt,
  adminSessionSigningKey,
  adminUsername,
} from "@/server/generated-admin-credentials";

export const ADMIN_SESSION_COOKIE = "citadelle_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 4;

function equalText(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function verifyCredentials(username: string, password: string): boolean {
  const candidateHash = pbkdf2Sync(
    password,
    Buffer.from(adminPasswordSalt, "hex"),
    210_000,
    32,
    "sha256",
  ).toString("hex");

  return (
    equalText(username, adminUsername) &&
    equalText(candidateHash, adminPasswordHash)
  );
}

function signature(payload: string): string {
  return createHmac("sha256", adminSessionSigningKey)
    .update(payload)
    .digest("base64url");
}

export function createAdminSession(): string {
  const payload = Buffer.from(
    JSON.stringify({
      sub: adminUsername,
      exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE,
    }),
  ).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function verifyAdminSession(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, suppliedSignature, extra] = token.split(".");
  if (!payload || !suppliedSignature || extra) return false;
  if (!equalText(signature(payload), suppliedSignature)) return false;

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { sub?: unknown; exp?: unknown };
    return (
      session.sub === adminUsername &&
      typeof session.exp === "number" &&
      session.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}
