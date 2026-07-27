import "server-only";

import type { ChatProvider } from "./types";
import { RulesChatProvider } from "./rules-provider";

/**
 * Swap this factory to return a future ModelChatProvider. The API and UI only
 * depend on the ChatProvider contract.
 */
export function createChatProvider(): ChatProvider {
  return new RulesChatProvider();
}
