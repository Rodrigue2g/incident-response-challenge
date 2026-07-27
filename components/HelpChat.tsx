"use client";

import { FormEvent, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/chat/types";

const welcome: ChatMessage = {
  role: "assistant",
  content: "Welcome to Citadelle Help. I can assist with support cases, account safety, text formatting, and diagnostic exports.",
};

export default function HelpChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const message = input.trim();
    if (!message || waiting) return;

    const userMessage: ChatMessage = { role: "user", content: message };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setWaiting(true);

    try {
      const response = await fetch("/api/help-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message, history: messages.slice(-10) }),
      });
      const data = await response.json();
      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.content || data.error || "The assistant is temporarily unavailable." },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "The local help service could not be reached." },
      ]);
    } finally {
      setWaiting(false);
      requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }));
    }
  }

  return (
    <section className="help-chat" aria-label="Citadelle Help Assistant">
      <div className="chat-topbar">
        <div><i /><span>Citadelle Help Assistant</span></div>
        <span>Local training service</span>
      </div>
      <div className="chat-messages" aria-live="polite">
        {messages.map((message, index) => (
          <div className={`chat-message ${message.role}`} key={index}>
            <span className="chat-role">{message.role === "assistant" ? "C" : "You"}</span>
            <div>{message.content}</div>
          </div>
        ))}
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
