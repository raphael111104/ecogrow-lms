"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Leaf, Loader2, Send, Sparkles, X } from "lucide-react";
import { MarkdownDocument } from "@/components/ui/MarkdownDocument";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Halo, aku EcoGrow Assistant. Aku membantu topik EcoGrow, Sintaks EcoGrow Learning, Pancaniti sebagai akar kearifan lokal, ekologi, tanaman, SDGs, dan pendidikan lingkungan.",
  },
];

const suggestedPrompts = [
  "Apa itu Sintaks EcoGrow?",
  "Bagaimana guru membuat proyek EcoMission?",
  "Apa fungsi EcoChallenge?",
  "Apa hubungan EcoGrow dengan SDGs?",
];

export function EcoGrowAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  async function sendMessage(content: string) {
    const trimmedContent = content.trim();

    if (!trimmedContent || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedContent,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ecogrow-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            data.reply ||
            data.error ||
            "Maaf, EcoGrow Assistant belum bisa menjawab saat ini.",
        },
      ]);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Koneksi ke EcoGrow Assistant sedang bermasalah. Coba lagi sebentar lagi.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <details
      className="group/assistant fixed bottom-5 right-5 z-[80] flex flex-col-reverse items-end gap-3 sm:bottom-6 sm:right-6"
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary
        className="relative grid size-16 cursor-pointer list-none place-items-center rounded-full bg-leaf-700 text-white shadow-[0_18px_46px_rgba(11,79,42,0.32)] ring-4 ring-white/70 transition hover:-translate-y-1 hover:bg-leaf-500 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-sun [&::-webkit-details-marker]:hidden"
        aria-label="Buka atau tutup EcoGrow Assistant"
      >
        <span className="absolute -left-1 -top-1 grid size-7 place-items-center rounded-full bg-sun text-leaf-700 shadow-soft">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        <Leaf className="size-7 transition group-open/assistant:hidden" aria-hidden="true" />
        <X className="hidden size-7 transition group-open/assistant:block" aria-hidden="true" />
      </summary>

      <div
        className="mb-3 w-[calc(100vw-2.5rem)] max-w-[23rem] origin-bottom-right overflow-hidden rounded-2xl border border-leaf-500/20 bg-white/95 shadow-[0_24px_70px_rgba(11,79,42,0.22)] backdrop-blur-xl transition duration-300"
      >
        <div className="flex items-center justify-between gap-3 bg-leaf-700 px-4 py-3 text-white">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15 ring-1 ring-white/20">
              <Bot className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-sm font-extrabold">EcoGrow Assistant</p>
              <p className="truncate text-xs font-semibold text-white/75">
                EcoGrow, alam, tanaman, pendidikan
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.currentTarget.closest("details")?.removeAttribute("open");
              setIsOpen(false);
            }}
            className="grid size-9 shrink-0 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
            aria-label="Tutup EcoGrow Assistant"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[24rem] space-y-3 overflow-y-auto bg-gradient-to-b from-leaf-50 to-cream/70 px-4 py-4">
          {messages.length === 1 ? (
            <div className="rounded-2xl border border-dashed border-leaf-500/25 bg-white/70 p-4 text-sm font-semibold leading-6 text-mutedText">
              Mulai dari prompt cepat di bawah, atau tanyakan cara menghubungkan kebun sekolah dengan EcoLearn, EcoMission, asesmen, dan portofolio.
            </div>
          ) : null}
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 shadow-soft",
                  message.role === "user"
                    ? "rounded-br-md bg-leaf-700 text-white"
                    : "rounded-bl-md border border-gardenBorder/80 bg-white text-slateText",
                )}
              >
                {message.role === "assistant" ? (
                  <MarkdownDocument content={message.content} />
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-gardenBorder/80 bg-white px-3.5 py-2.5 text-sm font-semibold text-mutedText shadow-soft">
                <Loader2 className="size-4 animate-spin text-leaf-500" aria-hidden="true" />
                Menyemai jawaban...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gardenBorder/70 bg-white px-4 py-3">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void sendMessage(prompt)}
                disabled={isLoading}
                className="shrink-0 rounded-full border border-leaf-500/20 bg-leaf-50 px-3 py-1.5 text-xs font-extrabold text-leaf-700 transition hover:border-leaf-500/40 hover:bg-leaf-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              rows={1}
              placeholder="Tanya EcoGrow atau ekologi..."
              className="min-h-11 flex-1 resize-none rounded-xl border border-gardenBorder bg-leaf-50/70 px-3 py-2.5 text-sm font-semibold text-slateText outline-none transition placeholder:text-mutedText/70 focus:border-leaf-500/45 focus:bg-white focus:ring-4 focus:ring-sun/20"
            />
            <button
              type="submit"
              disabled={isLoading || input.trim().length === 0}
              className="grid size-11 shrink-0 place-items-center rounded-xl bg-sun text-leaf-700 shadow-soft transition hover:-translate-y-0.5 hover:bg-harvest hover:text-white disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
              aria-label="Kirim pertanyaan"
            >
              <Send className="size-5" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </details>
  );
}
