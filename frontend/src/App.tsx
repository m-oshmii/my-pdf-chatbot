import { useState } from "react";

import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import type { Message } from "./types";

function App() {
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello. Upload a PDF on the left, then ask a question about it.",
    },
  ]);

  return (
    <div className="flex min-h-dvh flex-col bg-slate-950 text-slate-100">
      <Header />

      <main className="mx-auto grid w-full max-w-7xl min-h-0 flex-1 grid-cols-1 gap-4 p-4 sm:p-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <UploadSection
          pdfName={pdfName}
          onUploaded={(filename) => {
            setPdfName(filename);
            setMessages([
              {
                sender: "ai",
                text: `"${filename}" is ready. Ask me anything about it.`,
              },
            ]);
          }}
        />

        <section className="flex min-h-[28rem] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 lg:min-h-0">
          <div className="border-b border-slate-800 px-5 py-3">
            <h2 className="text-sm font-semibold text-white">Chat</h2>
            <p className="text-xs text-slate-500">
              Answers are based only on the uploaded document
            </p>
          </div>

          <ChatWindow messages={messages} loading={loading} />

          <ChatInput
            hasPdf={Boolean(pdfName)}
            loading={loading}
            setLoading={setLoading}
            setMessages={setMessages}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
