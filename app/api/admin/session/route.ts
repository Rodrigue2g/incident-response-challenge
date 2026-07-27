import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
  verifyAdminSession,
  verifyCredentials,
} from "@/server/admin-auth";

const attempts = new Map<string, { count: number; windowStarted: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 10;

function clientKey(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || now - current.windowStarted > WINDOW_MS) {
    attempts.set(key, { count: 1, windowStarted: now });
    return false;
  }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

export async function GET(request: NextRequest) {
  const authenticated = verifyAdminSession(
    request.cookies.get(ADMIN_SESSION_COOKIE)?.value,
  );
  return NextResponse.json({ authenticated });
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: "Too many sign-in attempts. Try again in a minute." },
      { status: 429 },
    );
  }

  let payload: { username?: unknown; password?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (
    typeof payload.username !== "string" ||
    typeof payload.password !== "string" ||
    !verifyCredentials(payload.username, payload.password)
  ) {
    return NextResponse.json(
      { error: "The administrator ID or password is incorrect." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSession(), {
    httpOnly: true,
    maxAge: ADMIN_SESSION_MAX_AGE,
    sameSite: "strict",
    path: "/",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: "strict",
    path: "/",
  });
  return response;
}
