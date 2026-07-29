import { NextRequest, NextResponse } from "next/server";
import {
  issueCompletionToken,
  validPwnIssuerSecret,
} from "@/server/completion";

export async function POST(request: NextRequest) {
  if (!validPwnIssuerSecret(request.headers.get("x-citadelle-pwn-secret"))) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const token = issueCompletionToken();
  const publicUrl = process.env.PUBLIC_APP_URL || request.nextUrl.origin;
  return new NextResponse(
    `${publicUrl.replace(/\/$/, "")}/api/complete/redeem?token=${encodeURIComponent(token)}\n`,
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}
