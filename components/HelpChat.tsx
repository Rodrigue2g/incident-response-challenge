"use client";

import { FormEvent, useRef, useState } from "react";
import type { ChatMessage, ChatOutcome, ChatReply } from "@/lib/chat/types";

const welcome: ChatMessage = {
  role: "assistant",
  content: "Welcome to Citadelle Help. I can assist with support cases, account safety, text formatting, and diagnostic requests. How can I help?",
};

export default function HelpChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [outcomes, setOutcomes] = useState<ChatOutcome[]>(["normal"]);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [complete, setComplete] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const message = input.trim();
    if (!message || waiting) return;

    const userMessage: ChatMessage = { role: "user", content: message };
    const history = [...messages, userMessage];
    setMessages(history);
    setOutcomes((current) => [...current, "normal"]);
    setInput("");
    setWaiting(true);

    try {
      const response = await fetch("/api/help-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message, history: messages.slice(-10) }),
      });
      const data = (await response.json()) as Partial<ChatReply> & { error?: string };
      const outcome: ChatOutcome =
        data.outcome === "disclosed" || data.outcome === "refused" ? data.outcome : "normal";
      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.content || data.error || "The assistant is temporarily unavailable." },
      ]);
      setOutcomes((current) => [...current, outcome]);
      if (outcome === "disclosed") setComplete(true);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "The local help service could not be reached." },
      ]);
      setOutcomes((current) => [...current, "normal"]);
    } finally {
      setWaiting(false);
      requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }));
    }
  }

  return (
    <section className={`help-chat ${complete ? "challenge-complete" : ""}`} aria-label="Citadelle Help Assistant challenge">
      <div className="chat-topbar">
        <div><i /><span>Citadelle Help Assistant</span></div>
        <span>Secure support channel</span>
      </div>
      <div className="chat-messages" aria-live="polite">
        {messages.map((message, index) => (
          <div className={`chat-message ${message.role} ${outcomes[index] === "refused" ? "refused" : ""} ${outcomes[index] === "disclosed" ? "disclosed" : ""}`} key={index}>
            <span className="chat-role">{message.role === "assistant" ? "C" : "You"}</span>
            <div>{message.content}</div>
          </div>
        ))}
        {complete && (
          <div className="chat-success" role="status">
            <span>Case information retrieved</span>
            <strong>The requested diagnostic information is shown above.</strong>
          </div>
        )}
        {waiting && (
          <div className="chat-message assistant">
            <span className="chat-role">C</span>
            <div className="typing-dots"><i /><i /><i /></div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <form className="chat-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="chat-input">Message Citadelle Help</label>
        <input
          autoComplete="off"
          id="chat-input"
          maxLength={800}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask the Help Assistant…"
          value={input}
        />
        <button disabled={!input.trim() || waiting} type="submit">Send</button>
      </form>
    </section>
  );
}
