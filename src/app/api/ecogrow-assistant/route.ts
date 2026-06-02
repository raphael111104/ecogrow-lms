import { NextResponse } from "next/server";
import {
  appendContinuationRequest,
  buildAssistantReply,
  sanitizeMessages,
  type GeminiContent,
  type GeminiResponse,
  type IncomingAssistantMessage,
} from "@/lib/ecogrow-assistant";

const ECOGROW_CONTEXT = `
EcoGrow Learning adalah LMS ekologis untuk sekolah dasar dengan pendekatan Smart Eco-Food School.
Fokusnya adalah pembelajaran lingkungan yang meaningful, mindful, joyful melalui kebun sekolah, kompos, hidroponik, pangan sehat, iklim, tanah, dan aksi ekologis kecil.

Sintaks EcoGrow Learning mengembangkan Pancaniti menjadi lima tahap: Ecological Recognition (Niti Harti), Ecological Exploration (Niti Surti), Ecological Execution (Niti Bukti), Ecological Reflection (Niti Bakti), dan Ecological Mastery & Exhibition (Niti Sajati).

Fitur utama:
- EcoLearn: modul singkat fotosintesis, hidroponik, tanah, kompos, dan iklim.
- EcoMission: misi harian observasi kebun sekolah dan aksi di rumah.
- EcoPlay: kuis, permainan cocok tanam, dan tantangan kolaborasi.
- EcoChallenge: tantangan hemat air, memilah sampah, dan jurnal pertumbuhan.
- Ecomart: simulasi panen, poin, dan reward belajar ramah anak.
- Galeri Project: dokumentasi foto, video, dan cerita proyek kelas.
- Portofolio Digital: badge, refleksi, jurnal, dan karya Eco Explorer.
- Dashboard Guru: monitoring progres, asesmen, aktivitas siswa, dan umpan balik proyek.

SDGs yang ditekankan: SDG 2 Zero Hunger, SDG 4 Quality Education, SDG 13 Climate Action, dan SDG 15 Life on Land.

Topik pendukung yang boleh dibahas selama jawabannya edukatif dan aman untuk siswa/guru:
- Alam dan lingkungan hidup.
- Ekologi, daur hidup, rantai makanan, habitat, air, tanah, iklim, dan konservasi.
- Tanaman, kebun sekolah, hidroponik, kompos, fotosintesis, pertumbuhan tanaman, dan pangan sehat.
- Pendidikan dasar, ide aktivitas kelas, refleksi belajar, asesmen sederhana, dan pembelajaran berbasis proyek lingkungan.
`;

const SYSTEM_PROMPT = `
Kamu adalah EcoGrow Assistant, asisten resmi untuk landing page EcoGrow Learning.
Jawab pertanyaan seputar EcoGrow Learning, fitur EcoGrow, alur siswa/guru, pembelajaran lingkungan, Sintaks EcoGrow Learning, Pancaniti sebagai akar kearifan lokal, Smart Eco-Food School, SDGs yang relevan dengan EcoGrow, serta topik pendukung yang berkaitan dengan alam, ekologi, tanaman, kebun sekolah, hidroponik, kompos, pangan sehat, dan pendidikan.

Jika pengguna bertanya di luar EcoGrow, alam, ekologi, tanaman, atau pendidikan, jangan menjawab substansi pertanyaan itu. Balas singkat: "Maaf, aku hanya bisa membantu seputar EcoGrow Learning, alam, ekologi, tanaman, dan pendidikan." Lalu tawarkan topik relevan yang bisa dibantu.
Untuk topik alam, ekologi, tanaman, dan pendidikan, jawab secara edukatif, sederhana, dan bila cocok hubungkan kembali ke contoh EcoGrow.
Jangan membuat klaim teknis, harga, kebijakan, jadwal, atau data sekolah yang tidak ada di konteks. Jika informasi EcoGrow tidak tersedia, katakan belum tersedia di landing page.
Gunakan bahasa Indonesia yang ramah, jelas, dan ringkas.
Format jawaban sebagai Markdown sederhana agar mudah dibaca: gunakan paragraf pendek, daftar bullet atau nomor bila perlu, **tebal** untuk istilah penting, dan heading pendek jika jawabannya memiliki beberapa bagian.
Jangan gunakan HTML mentah, tabel rumit, atau markdown kompleks.

Konteks EcoGrow:
${ECOGROW_CONTEXT}
`;

const MAX_OUTPUT_TOKENS = 1400;
const MAX_CONTINUATION_ATTEMPTS = 2;

async function generateAssistantReply({
  apiKey,
  model,
  messages,
}: {
  apiKey: string;
  model: string;
  messages: GeminiContent[];
}) {
  let contents = messages;
  const replyParts: string[] = [];

  for (let attempt = 0; attempt <= MAX_CONTINUATION_ATTEMPTS; attempt += 1) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents,
          generationConfig: {
            temperature: 0.35,
            maxOutputTokens: MAX_OUTPUT_TOKENS,
          },
        }),
      },
    );

    const data = (await response.json()) as GeminiResponse;

    if (!response.ok) {
      return {
        ok: false as const,
        status: response.status,
        error: data.error?.message || "Gemini belum bisa menjawab saat ini. Coba lagi beberapa saat.",
      };
    }

    const result = buildAssistantReply(data);

    if (result.reply) {
      replyParts.push(result.reply);
    }

    const combinedReply = replyParts.join("\n\n").trim();

    if (!result.isIncomplete) {
      return {
        ok: true as const,
        reply:
          combinedReply ||
          "Maaf, aku belum menemukan jawaban yang sesuai dengan EcoGrow dan topik pendukungnya.",
      };
    }

    if (!combinedReply || attempt === MAX_CONTINUATION_ATTEMPTS) {
      return {
        ok: true as const,
        reply:
          combinedReply ||
          "Maaf, jawaban EcoGrow Assistant belum lengkap. Coba kirim ulang dengan pertanyaan yang lebih singkat.",
      };
    }

    contents = appendContinuationRequest(messages, combinedReply);
  }

  return {
    ok: true as const,
    reply: "Maaf, EcoGrow Assistant belum bisa menyelesaikan jawaban saat ini.",
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  const preferredModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const fallbackModels = ["gemini-2.5-flash", "gemini-2.0-flash"];
  const models = Array.from(new Set([preferredModel, ...fallbackModels]));

  if (!apiKey) {
    return NextResponse.json(
      { error: "Konfigurasi Gemini belum tersedia di server." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as { messages?: IncomingAssistantMessage[] };
    const messages = Array.isArray(body.messages) ? sanitizeMessages(body.messages) : [];

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "Tulis pertanyaan tentang EcoGrow, alam, ekologi, tanaman, atau pendidikan terlebih dahulu." },
        { status: 400 },
      );
    }

    let lastError = "Gemini belum bisa menjawab saat ini. Coba lagi beberapa saat.";

    for (const model of models) {
      const result = await generateAssistantReply({ apiKey, model, messages });

      if (!result.ok) {
        lastError = result.error || lastError;

        if (result.status === 404 && model !== models.at(-1)) {
          continue;
        }

        return NextResponse.json({ error: lastError }, { status: result.status });
      }

      return NextResponse.json({ reply: result.reply });
    }

    return NextResponse.json({ error: lastError }, { status: 502 });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kendala saat menghubungi EcoGrow Assistant." },
      { status: 500 },
    );
  }
}
