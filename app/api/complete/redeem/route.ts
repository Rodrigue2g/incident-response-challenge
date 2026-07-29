import { NextRequest, NextResponse } from "next/server";
import {
  COMPLETION_COOKIE,
  COMPLETION_MAX_AGE,
  createCompletionCookie,
  redeemCompletionToken,
} from "@/server/completion";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token || !redeemCompletionToken(token)) {
    return new NextResponse(
      "This completion link is invalid or has expired.\n\nTokens are single-use and valid for 30 minutes.\nRun `cleanup` again from your shell to get a fresh link.\n",
      { status: 410, headers: { "content-type": "text/plain; charset=utf-8" } },
    );
  }

  // Next.js standalone sets request.url to the server's bind address (e.g.
  // http://0.0.0.0:3000) rather than the client-visible host, so derive the
  // redirect from the Host / x-forwarded-host headers instead.
  const proto =
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(/:$/, "");
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.host;
  const secure = proto === "https";

  const response = NextResponse.redirect(`${proto}://${host}/success`);
  response.cookies.set(COMPLETION_COOKIE, createCompletionCookie(), {
    httpOnly: true,
    maxAge: COMPLETION_MAX_AGE,
    sameSite: "strict",
    secure,
    path: "/",
  });
  return response;
}
