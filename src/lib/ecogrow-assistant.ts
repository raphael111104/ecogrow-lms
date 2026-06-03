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

export const assistantFallbackResponses = [
  {
    keywords: ["sintaks", "ecogrow", "pancaniti", "alur"],
    answer:
      "Sintaks EcoGrow terdiri dari **Kenali Alam**, **Jelajahi Masalah**, **Lakukan Aksi**, **Cerita dan Renungan**, serta **Pamerkan Karya**. Istilah lokal pendampingnya adalah Niti Harti, Niti Surti, Niti Bukti, Niti Bakti, dan Niti Sajati.",
  },
  {
    keywords: ["ecomission", "misi", "jurnal", "lkpd"],
    answer:
      "**EcoMission** adalah misi belajar berbasis aksi. Siswa mengamati tanaman, mengisi jurnal, mengunggah bukti, lalu mendapat feedback dari guru.",
  },
  {
    keywords: ["modul", "guru", "ajar", "kurikulum"],
    answer:
      "Guru dapat memakai **Modul Ajar** untuk menyiapkan CP, TP, pertanyaan pemantik, LKPD, asesmen, rubrik, dan kegiatan lima tahap EcoGrow.",
  },
  {
    keywords: ["sdgs", "pangan", "iklim", "lingkungan"],
    answer:
      "EcoGrow mendukung **SDG 2**, **SDG 4**, **SDG 13**, dan **SDG 15** melalui pangan sehat, pembelajaran berkualitas, aksi iklim, dan kepedulian terhadap kehidupan darat.",
  },
  {
    keywords: ["ecoplay", "bermain", "game", "kuis"],
    answer:
      "**EcoPlay** membantu siswa mengulang konsep melalui kuis cepat, susun alur fotosintesis, dan pemecahan masalah tanaman secara ramah anak.",
  },
  {
    keywords: ["portofolio", "galeri", "exhibition", "pameran"],
    answer:
      "**Portofolio Digital** menyatukan jurnal, kuis, refleksi, EcoChallenge, badge, feedback guru, dan karya Eco-Exhibition sebagai bukti belajar.",
  },
];

const outOfScopeReply =
  "Maaf, aku hanya bisa membantu seputar EcoGrow Learning, alam, ekologi, tanaman, dan pendidikan. Kamu bisa bertanya tentang EcoMission, EcoLearn, EcoPlay, SDGs, portofolio, atau modul ajar guru.";

const genericFallbackReply =
  "EcoGrow Learning adalah LMS ekologis untuk sekolah dasar. Siswa belajar melalui EcoLearn, EcoMission, EcoPlay, Cerita Belajarku, EcoChallenge, Galeri Project, EcoMaster Quiz, dan Portofolio. Guru memantau progres melalui modul ajar, monitoring, asesmen, analitik, dan galeri.";

const allowedFallbackKeywords = [
  "ecogrow",
  "alam",
  "ekologi",
  "tanaman",
  "kebun",
  "hidroponik",
  "kompos",
  "pangan",
  "lingkungan",
  "pendidikan",
  "siswa",
  "guru",
  "belajar",
  "sdgs",
  "misi",
  "modul",
  "kuis",
  "portofolio",
  "galeri",
];

export function getAssistantFallbackReply(messages: GeminiContent[] | IncomingAssistantMessage[]) {
  const lastMessage = [...messages]
    .reverse()
    .find((message) => {
      if ("content" in message) return message.role === "user" && message.content.trim().length > 0;
      return message.role === "user" && message.parts?.some((part) => part.text?.trim());
    });

  const question =
    lastMessage && "content" in lastMessage
      ? lastMessage.content
      : lastMessage?.parts?.map((part) => part.text).join(" ") ?? "";
  const normalizedQuestion = question.toLowerCase();

  const matched = assistantFallbackResponses.find((response) =>
    response.keywords.some((keyword) => normalizedQuestion.includes(keyword)),
  );

  if (matched) return matched.answer;

  const isAllowedTopic = allowedFallbackKeywords.some((keyword) =>
    normalizedQuestion.includes(keyword),
  );

  return isAllowedTopic ? genericFallbackReply : outOfScopeReply;
}

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
