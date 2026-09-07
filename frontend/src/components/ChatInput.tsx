import { useState } from "react";
import { api } from "../api/api";
import type { Message } from "../types";

type Props = {
  hasPdf: boolean;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

function ChatInput({ hasPdf, loading, setLoading, setMessages }: Props) {
  const [message, setMessage] = useState("");

  async function handleSend() {
    const question = message.trim();
    if (!question || loading) return;

    if (!hasPdf) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Please upload a PDF before asking a question." },
      ]);
      return;
    }

    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/ask", { question });
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: res.data.answer },
      ]);
    } catch (err: unknown) {
      console.error(err);
      const detail =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "detail" in err.response.data
          ? String(err.response.data.detail)
          : "Could not get an answer. Check that the backend is running and your Gemini quota is available.";

      setMessages((prev) => [...prev, { sender: "ai", text: detail }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="border-t border-slate-800 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        void handleSend();
      }}
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          placeholder={
            hasPdf
              ? "Ask anything about your PDF..."
              : "Upload a PDF to start asking questions..."
          }
          className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-500 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </form>
  );
}

export default ChatInput;
