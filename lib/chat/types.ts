export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatReply = {
  content: string;
  outcome: "normal" | "refused" | "disclosed";
};

export interface ChatProvider {
  reply(message: string, history: ChatMessage[]): Promise<ChatReply>;
}
