import "server-only";

import type { ChatProvider } from "./types";
import { OllamaChatProvider } from "./ollama-provider";
import { RulesChatProvider } from "./rules-provider";

class FallbackChatProvider implements ChatProvider {
  constructor(
    private readonly primary: ChatProvider,
    private readonly fallback: ChatProvider,
  ) {}

  async reply(
    message: Parameters<ChatProvider["reply"]>[0],
    history: Parameters<ChatProvider["reply"]>[1],
  ) {
    try {
      return await this.primary.reply(message, history);
    } catch (error) {
      console.error("Model chatbot unavailable; using local fallback.", error);
      return this.fallback.reply(message, history);
    }
  }
}

export function createChatProvider(): ChatProvider {
  if (process.env.CHAT_PROVIDER?.toLowerCase() === "ollama") {
    return new FallbackChatProvider(
      new OllamaChatProvider(),
      new RulesChatProvider(),
    );
  }
  return new RulesChatProvider();
}
