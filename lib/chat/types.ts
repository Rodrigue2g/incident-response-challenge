export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatOutcome = "normal" | "refused" | "disclosed";

export type ChatReply = {
  content: string;
  outcome: ChatOutcome;
};

export interface ChatProvider {
  reply(message: string, history: ChatMessage[]): Promise<ChatReply>;
}
