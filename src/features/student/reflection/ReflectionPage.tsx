"use client";

import { useState } from "react";
import { Mic, PencilLine, Send } from "lucide-react";
import { EffortCheckCard } from "@/components/student/EffortCheckCard";
import { MoodPicker } from "@/components/student/MoodPicker";
import { FriendlyAlert } from "@/components/shared/FriendlyAlert";
import { NextSuggestedActionCard } from "@/components/shared/NextSuggestedActionCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { reflections } from "@/data";
import { useMockStorage } from "@/hooks/useMockStorage";
import type { StudentMoodOption, StudentReflectionMemory } from "@/types/ecogrow";

const prompts = [
  "Bagaimana perasaanmu saat merawat tanaman hari ini?",
  "Apa hal baru yang kamu pelajari?",
  "Bagian mana yang paling kamu sukai?",
  "Apa yang ingin kamu coba besok?",
];

const promises = [
  "Aku akan menyiram tanaman.",
  "Aku akan menghemat air.",
  "Aku akan membuang sampah pada tempatnya.",
  "Aku akan membantu teman satu tim.",
];

const friends = ["Nadia", "Raka", "Siti", "Bima"];

export function ReflectionPage() {
  const [mood, setMood] = useState<StudentMoodOption["id"] | null>("happy");
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [promise, setPromise] = useState(promises[0]);
  const [friend, setFriend] = useState(friends[0]);
  const [appreciation, setAppreciation] = useState("");
  const [efforts, setEfforts] = useState<string[]>([]);
  const [, setReflectionMemory] = useMockStorage<StudentReflectionMemory | null>("ecoGrow-reflection-memory", null);
  const [saved, setSaved] = useState(false);
  const appreciationSummary = appreciation.trim() || "Terima kasih sudah membantuku hari ini.";
  const toggleEffort = (effort: string) => {
    setEfforts((current) => (current.includes(effort) ? current.filter((item) => item !== effort) : [...current, effort]));
  };
  const saveReflection = () => {
    setSaved(true);
    setReflectionMemory({
      mood,
      lesson: answers[1]?.trim() || "Aku belajar memperhatikan tanaman dengan lebih teliti.",
      promise,
      appreciationFriend: friend,
      appreciationMessage: appreciationSummary,
      efforts,
      savedAt: "Hari ini",
    });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        eyebrow="Cerita"
        title="Ceritakan Belajarmu"
        description="Tidak ada jawaban salah. Ceritakan pengalamanmu dengan nyaman."
        badge="Cerita Hari Ini"
      />

      <EcoCard tone="cream">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Perasaanmu</p>
        <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Bagaimana harimu?</h2>
        <div className="mt-5">
          <MoodPicker selected={mood} onSelect={setMood} />
        </div>
      </EcoCard>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <EcoCard>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Cerita Singkat</p>
              <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Tulis dengan bahasamu</h2>
            </div>
            <div className="flex rounded-xl bg-leaf-50 p-1">
              <button
                type="button"
                onClick={() => setMode("text")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-black ${mode === "text" ? "bg-white text-leaf-700 shadow-soft" : "text-mutedText"}`}
              >
                <PencilLine className="size-4" /> Tulis
              </button>
              <button
                type="button"
                onClick={() => setMode("voice")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-black ${mode === "voice" ? "bg-white text-leaf-700 shadow-soft" : "text-mutedText"}`}
              >
                <Mic className="size-4" /> Suara
              </button>
            </div>
          </div>
          {mode === "voice" ? (
            <FriendlyAlert
              className="mt-5"
              title="Rekam suara tersedia dalam mode simulasi."
              description="Untuk sekarang, tulis satu kalimat agar ceritamu dapat disimpan."
            />
          ) : null}
          <div className="mt-5 space-y-4">
            {prompts.map((prompt, index) => (
              <label key={prompt} className="block text-sm font-extrabold text-mutedText">
                {prompt}
                <textarea
                  className="eco-input mt-2 min-h-20 py-3"
                  value={answers[index] ?? ""}
                  placeholder="Tulis ceritamu di sini..."
                  onChange={(event) => setAnswers((current) => ({ ...current, [index]: event.target.value }))}
                />
              </label>
            ))}
          </div>
        </EcoCard>

        <div className="space-y-5">
          <EcoCard tone="soft">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Janji Hijauku</p>
            <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Pilih aksi kecil</h2>
            <div className="mt-4 space-y-3">
              {promises.map((item) => (
                <label key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-bold text-slateText">
                  <input
                    type="radio"
                    name="eco-promise"
                    checked={promise === item}
                    onChange={() => setPromise(item)}
                    className="size-5 accent-leaf-500"
                  />
                  {item}
                </label>
              ))}
            </div>
          </EcoCard>

          <EffortCheckCard selected={efforts} onToggle={toggleEffort} />

          <EcoCard tone="cream">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Apresiasi Teman</p>
            <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Siapa yang membantumu hari ini?</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">
              Pilih teman yang membantumu, lalu tulis satu kalimat terima kasih.
            </p>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Pilih teman yang membantumu">
              {friends.map((name) => (
                <button
                  key={name}
                  type="button"
                  aria-pressed={friend === name}
                  onClick={() => setFriend(name)}
                  className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                    friend === name
                      ? "border-leaf-500 bg-leaf-500 text-white shadow-soft"
                      : "border-leaf-100 bg-white text-leaf-700 hover:border-leaf-300"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
            <label className="mt-4 block text-sm font-extrabold text-mutedText">
              Pesan untuk {friend}
              <textarea
                className="eco-input mt-2 min-h-24 py-3"
                value={appreciation}
                placeholder="Terima kasih karena sudah membantuku merawat tanaman."
                onChange={(event) => setAppreciation(event.target.value)}
              />
            </label>
            <EcoButton
              fullWidth
              className="mt-5"
              icon={<Send className="size-4" />}
              onClick={saveReflection}
            >
              Simpan Cerita
            </EcoButton>
            {saved ? (
              <FriendlyAlert
                className="mt-4"
                tone="success"
                title="Cerita belajarmu sudah tersimpan."
                description={`Janji hari ini: ${promise} Apresiasi untuk ${friend}: ${appreciationSummary}`}
              />
            ) : null}
          </EcoCard>

          <EcoCard>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Jejak Ceritaku</p>
            <div className="relative mt-4 space-y-4 border-l-2 border-leaf-100 pl-5">
              {reflections.slice(0, 2).map((reflection) => (
                <div key={reflection.id} className="relative rounded-2xl bg-leaf-50 p-4">
                  <span className="absolute -left-[1.7rem] top-5 size-3 rounded-full border-2 border-white bg-harvest" />
                  <EcoBadge className="bg-white text-leaf-700">{reflection.feeling}</EcoBadge>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slateText">{reflection.lessonLearned}</p>
                </div>
              ))}
            </div>
          </EcoCard>
        </div>
      </section>
      {saved ? (
        <NextSuggestedActionCard
          title="Lihat album perkembanganmu"
          description="Cerita dan janji hijaumu sudah tersimpan. Kini lihat bukti belajar yang sudah terkumpul."
          href="/siswa/portofolio"
          actionLabel="Buka Album Belajarku"
        />
      ) : null}
    </div>
  );
}
