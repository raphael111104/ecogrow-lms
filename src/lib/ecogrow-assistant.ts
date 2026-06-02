export type IncomingAssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

export type GeminiPart = {
  text?: string;
};

export type GeminiContent = {
  role?: "user" | "model";
  parts?: GeminiPart[];
};

export type GeminiCandidate = {
  finishReason?: string;
  content?: {
    parts?: GeminiPart[];
  };
};

export type GeminiResponse = {
  candidates?: GeminiCandidate[];
  error?: {
    message?: string;
  };
};

export type AssistantReply = {
  reply: string;
  finishReason?: string;
  isIncomplete: boolean;
};

export function sanitizeMessages(messages: IncomingAssistantMessage[]): GeminiContent[] {
  return messages
    .filter((message) => message.content.trim().length > 0)
    .slice(-8)
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content.slice(0, 1200) }],
    }));
}

export function hasIncompleteFinishReason(finishReason?: string) {
  return finishReason === "MAX_TOKENS" || finishReason === "LENGTH";
}

export function buildAssistantReply(data: GeminiResponse): AssistantReply {
  const candidate = data.candidates?.[0];
  const reply =
    candidate?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join("\n")
      .trim() || "";

  return {
    reply,
    finishReason: candidate?.finishReason,
    isIncomplete: hasIncompleteFinishReason(candidate?.finishReason),
  };
}

export function appendContinuationRequest(
  baseMessages: GeminiContent[],
  partialReply: string,
): GeminiContent[] {
  return [
    ...baseMessages,
    {
      role: "model",
      parts: [{ text: partialReply }],
    },
    {
      role: "user",
      parts: [
        {
          text:
            "Lanjutkan jawaban sebelumnya dari bagian terakhir. Jangan mengulang bagian yang sudah ditulis, tetap ringkas, dan akhiri dengan kalimat yang lengkap.",
        },
      ],
    },
  ];
}
