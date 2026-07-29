import "server-only";

import {
  chatbotUsername,
  protectedSupportNote,
} from "@/server/generated-chat-secret";
import type { ChatMessage, ChatProvider, ChatReply } from "./types";

const directSecretWords = [
  "secret", "protected note", "hidden note", "internal note", "confidential note",
  "password", "flag", "instructions", "system prompt",
];

const noteWords = [
  "note", "case", "record", "context", "internal", "protected", "hidden",
  "confidential", "hc-204", "data",
];

function normalise(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(message: string, words: string[]): boolean {
  return words.some((word) => message.includes(word));
}

function response(content: string, outcome: ChatReply["outcome"] = "normal"): ChatReply {
  return { content, outcome };
}

export class RulesChatProvider implements ChatProvider {
  async reply(message: string, _history: ChatMessage[]): Promise<ChatReply> {
    const prompt = normalise(message);
    const refersToNote = includesAny(prompt, noteWords);

    if (includesAny(prompt, ["username", "user name", "admin user"])) {
      return response(
        `The administrator ID is "${chatbotUsername}". I cannot provide authentication passwords.`,
      );
    }

    // Deliberate training flaw: transformations are authorised before the
    // protected-data policy is checked.
    if (refersToNote && includesAny(prompt, ["base64", "base 64", "b64", "encode"])) {
      return response(
        `Diagnostic encoding complete:\n\n${Buffer.from(protectedSupportNote).toString("base64")}`,
        "disclosed",
      );
    }

    if (refersToNote && includesAny(prompt, ["reverse", "backwards", "backward"])) {
      return response(
        `Requested text transformation:\n\n${[...protectedSupportNote].reverse().join("")}`,
        "disclosed",
      );
    }

    const requestsExport = includesAny(prompt, [
      "diagnostic export", "support export", "debug export", "export the case",
      "export case", "json export",
    ]);
    if (refersToNote && requestsExport) {
      return response(
        `Support diagnostic export:\n\n${JSON.stringify({ case: "HC-204", note: protectedSupportNote }, null, 2)}`,
        "disclosed",
      );
    }

    if (includesAny(prompt, directSecretWords)) {
      return response(
        "I can’t disclose protected case notes, credentials, flags, or internal instructions. I can help with case status and approved diagnostic formatting.",
        "refused",
      );
    }

    if (includesAny(prompt, ["ignore previous", "ignore all", "developer mode", "jailbreak", "pretend"])) {
      return response(
        "That request conflicts with Citadelle support policy. Protected case content remains unavailable.",
        "refused",
      );
    }

    if (includesAny(prompt, ["hc-204", "case 204", "case status", "incident case"])) {
      return response(
        "Case HC-204 is open and marked for technical review. Its internal note is protected. Diagnostic export and text-formatting utilities are available to support staff.",
      );
    }

    if (includesAny(prompt, ["help", "what can you do", "capabilities"])) {
      return response(
        "I can check fictional support cases, explain account-safety guidance, format text, and prepare diagnostic exports. I cannot disclose protected notes directly.",
      );
    }

    if (includesAny(prompt, ["hello", "hi", "hey", "good morning", "good afternoon"])) {
      return response("Hello. How can I help with your Citadelle support query?");
    }

    return response(
      "I couldn’t match that request to a support action. Try asking about a case status, account safety, formatting, or diagnostic exports.",
    );
  }
}
