"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, ImageIcon, PlayCircle, Sparkles } from "lucide-react";
import { FriendlyAlert } from "@/components/shared/FriendlyAlert";
import { NextSuggestedActionCard } from "@/components/shared/NextSuggestedActionCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { EcoProgress } from "@/components/ui/EcoProgress";
import { ecoLearnChecks, ecoLearnContents } from "@/data";

type LearningTab = "video" | "read" | "picture" | "quiz";

const tabs: Array<{ id: LearningTab; label: string; icon: typeof PlayCircle }> = [
  { id: "video", label: "Video", icon: PlayCircle },
  { id: "read", label: "Bacaan Ringkas", icon: BookOpen },
  { id: "picture", label: "Gambar", icon: ImageIcon },
  { id: "quiz", label: "Kuis Mini", icon: Sparkles },
];

export function EcoLearnPage() {
  const topic = ecoLearnContents[0];
  const check = ecoLearnChecks[0];
  const [tab, setTab] = useState<LearningTab>("video");
  const [answer, setAnswer] = useState("");

  const feedback = answer
    ? answer === check.answer
      ? { tone: "success" as const, title: "Benar! Daun menangkap cahaya.", description: check.feedback }
      : { tone: "warning" as const, title: "Coba lagi.", description: "Perhatikan bagian hijau tanaman yang menghadap cahaya." }
    : null;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        eyebrow="Belajar"
        title="Mengapa tanaman butuh cahaya?"
        description="Belajar sebentar sebelum kamu mengamati tanaman kangkungmu."
        badge="Topik hari ini"
        actions={<EcoButton href="/siswa/ecomission">Lanjutkan Misi</EcoButton>}
      />

      <EcoCard tone="cream" className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Lanjutkan Belajar</p>
          <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">{topic.title}</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{topic.summary}</p>
          <EcoProgress value={35} label="Topik sudah dibaca" className="mt-4" />
        </div>
        <EcoButton variant="reward" icon={<ArrowRight className="size-4" />} onClick={() => setTab("video")}>
          Mulai 3 Menit
        </EcoButton>
      </EcoCard>

      <section>
        <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Isi belajar">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`flex min-h-12 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-black transition ${
                tab === id ? "bg-leaf-700 text-white shadow-soft" : "bg-white text-leaf-700 shadow-soft"
              }`}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <EcoCard className="mt-3 min-h-[22rem]">
          {tab === "video" ? (
            <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div className="grid aspect-video place-items-center rounded-2xl bg-leaf-700 text-white">
                <PlayCircle className="size-16 text-sun" aria-hidden="true" />
              </div>
              <div>
                <EcoBadge className="bg-sun/25 text-earth">3 menit</EcoBadge>
                <h2 className="mt-3 font-heading text-2xl font-black text-leaf-700">Daun dan sinar matahari</h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-mutedText">
                  Tonton bagaimana daun membantu tanaman membuat makanan menggunakan cahaya, air, dan udara.
                </p>
              </div>
            </div>
          ) : null}
          {tab === "read" ? (
            <div className="max-w-2xl">
              <EcoBadge className="bg-leaf-100 text-leaf-700">Bacaan 1 menit</EcoBadge>
              <h2 className="mt-4 font-heading text-3xl font-black text-leaf-700">Daun seperti dapur kecil</h2>
              <p className="mt-4 text-base font-semibold leading-8 text-slateText">
                Daun memakai cahaya matahari dan air untuk membantu tanaman membuat makanan. Karena itu, tanaman yang mendapat cukup cahaya biasanya terlihat lebih segar.
              </p>
              <p className="mt-4 rounded-2xl bg-cream p-4 font-bold text-earth">
                Coba lihat: apakah daun tanamanmu menghadap ke arah cahaya?
              </p>
            </div>
          ) : null}
          {tab === "picture" ? (
            <div className="grid gap-5 md:grid-cols-[1fr_0.9fr] md:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-leaf-50">
                <Image src={topic.imageUrl ?? "/assets/images/seedling-closeup-unsplash.jpg"} alt="Daun tanaman terkena cahaya" fill className="object-cover" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-black text-leaf-700">Amati daunnya</h2>
                <ul className="mt-4 space-y-3 text-sm font-bold text-slateText">
                  <li className="rounded-xl bg-leaf-50 p-3">Warna hijau menunjukkan daun yang segar.</li>
                  <li className="rounded-xl bg-leaf-50 p-3">Arah daun bisa mengikuti datangnya cahaya.</li>
                  <li className="rounded-xl bg-leaf-50 p-3">Catat perubahan yang kamu lihat hari ini.</li>
                </ul>
              </div>
            </div>
          ) : null}
          {tab === "quiz" ? (
            <div className="max-w-3xl">
              <EcoBadge className="bg-sky/15 text-sky">Kuis Mini</EcoBadge>
              <h2 className="mt-4 font-heading text-2xl font-black text-leaf-700">{check.question}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {check.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAnswer(option)}
                    className={`rounded-2xl border p-4 text-left font-bold transition ${
                      answer === option ? "border-leaf-500 bg-leaf-50 text-leaf-700" : "border-gardenBorder bg-white text-slateText"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {feedback ? (
                <FriendlyAlert
                  className="mt-5"
                  tone={feedback.tone}
                  title={feedback.title}
                  description={feedback.description}
                />
              ) : null}
            </div>
          ) : null}
        </EcoCard>
      </section>

      <NextSuggestedActionCard
        eyebrow="Misi Terkait"
        title="Sekarang waktunya mencoba di kebun"
        description="Catat cahaya dan warna daun kangkungmu setelah memahami peran daun dan sinar matahari."
        href="/siswa/ecomission"
        actionLabel="Lanjut ke Misi"
      />
    </div>
  );
}
