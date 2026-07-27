import { NextRequest, NextResponse } from "next/server";
import { createChatProvider } from "@/lib/chat/provider";
import type { ChatMessage } from "@/lib/chat/types";

const attempts = new Map<string, { count: number; windowStarted: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

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
  return current.count > MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  const key = clientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json(
      { error: "Too many requests. Wait a moment before trying again." },
      { status: 429 },
    );
  }

  let payload: { message?: unknown; history?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof payload.message !== "string" || !payload.message.trim()) {
    return NextResponse.json({ error: "Enter a message." }, { status: 400 });
  }
  if (payload.message.length > 800) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const history = Array.isArray(payload.history)
    ? payload.history
        .filter(
          (item): item is ChatMessage =>
            typeof item === "object" &&
            item !== null &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string",
        )
        .slice(-10)
    : [];

  const reply = await createChatProvider().reply(payload.message, history);
  return NextResponse.json(reply);
}
