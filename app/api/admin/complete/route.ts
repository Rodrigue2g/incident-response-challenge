import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSession,
} from "@/server/admin-auth";
import {
  COMPLETION_COOKIE,
  COMPLETION_MAX_AGE,
  createCompletionCookie,
} from "@/server/completion";

export async function POST(request: NextRequest) {
  const authenticated = verifyAdminSession(
    request.cookies.get(ADMIN_SESSION_COOKIE)?.value,
  );

  if (!authenticated) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const response = NextResponse.json({ completed: true });
  const secure =
    request.headers.get("x-forwarded-proto") === "https" ||
    request.nextUrl.protocol === "https:";
  response.cookies.set(COMPLETION_COOKIE, createCompletionCookie(), {
    httpOnly: true,
    maxAge: COMPLETION_MAX_AGE,
    sameSite: "strict",
    secure,
    path: "/",
  });
  return response;
}
