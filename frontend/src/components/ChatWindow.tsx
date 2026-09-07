import { useEffect, useRef } from "react";
import type { Message } from "../types";

type Props = {
  messages: Message[];
  loading: boolean;
};

function ChatWindow({ messages, loading }: Props) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "rounded-br-md bg-sky-600 text-white"
                  : "rounded-bl-md bg-slate-800 text-slate-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md bg-slate-800 px-4 py-3 text-sm text-slate-400">
              Thinking...
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}

export default ChatWindow;
