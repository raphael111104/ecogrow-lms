"use client";

import { useState } from "react";
import { ArrowRight, ChevronLeft, ClipboardCheck, Leaf, Sparkles } from "lucide-react";
import { NextSuggestedActionCard } from "@/components/shared/NextSuggestedActionCard";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { EcoProgress } from "@/components/ui/EcoProgress";
import { ecoReadinessQuestions } from "@/data";
import { useMockStorage } from "@/hooks/useMockStorage";
import { calculateSingleChoiceScore, getRecommendationByScore } from "@/lib/ecogrow-assessment-utils";
import type { EcoReadinessResult } from "@/types/ecogrow";

const readinessSteps: Array<{ title: string; description: string; questionIds: string[] }> = [
  {
    title: "Yang sudah kutahu",
    description: "Ceritakan hal yang sudah kamu kenal tentang tanaman.",
    questionIds: ["diag-1", "diag-2"],
  },
  {
    title: "Hal yang ingin kujelajahi",
    description: "Pilih hal yang membuatmu penasaran dalam petualangan ini.",
    questionIds: ["diag-3", "diag-4"],
  },
  {
    title: "Cara belajar dan menjaga alam",
    description: "Temukan cara belajar dan sikap merawat yang cocok untukmu.",
    questionIds: ["diag-5", "diag-6"],
  },
  {
    title: "Mengamati dan bekerja bersama",
    description: "Siapkan dirimu mencatat perubahan dan bekerja dalam tim.",
    questionIds: ["diag-7", "diag-8"],
  },
];

export function EcoReadinessPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useMockStorage<EcoReadinessResult | null>("ecoGrow-readiness-result", null);
  const [step, setStep] = useState(0);
  const currentStep = readinessSteps[step];
  const currentQuestions = ecoReadinessQuestions.filter((question) => currentStep.questionIds.includes(question.id));
  const stepComplete = currentQuestions.every((question) => Boolean(answers[question.id]));
  const progress = Math.round(((step + (stepComplete ? 1 : 0)) / readinessSteps.length) * 100);

  const submit = () => {
    const score = calculateSingleChoiceScore(ecoReadinessQuestions, answers);
    const nextResult: EcoReadinessResult = {
      score: score.score,
      correct: score.correct,
      total: score.total,
      interest: answers["diag-4"],
      learningStyle: answers["diag-5"],
      ecologicalReadiness: score.score >= 70 ? "Siap memulai misi" : "Perlu penguatan konsep awal",
      recommendation: getRecommendationByScore(score.score).description,
      completedAt: "2026-05-26",
    };
    setResult(nextResult);
  };

  const restart = () => {
    setResult(null);
    setAnswers({});
    setStep(0);
  };

  return (
    <div className="living-page mx-auto max-w-6xl space-y-6">
      <EcoCard tone="dark" className="relative overflow-hidden p-6 md:p-8">
        <div className="absolute -right-12 -top-16 size-48 rounded-full bg-sun/10 blur-2xl" aria-hidden="true" />
        <EcoBadge className="bg-sun text-leaf-700">Kuis Awal</EcoBadge>
        <ClipboardCheck className="mt-5 size-11 text-sun" />
        <h1 className="mt-4 font-heading text-3xl font-black md:text-4xl">Kenali cara belajarmu</h1>
        <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/75 md:text-base">
          Sebelum memulai petualangan kebun, jawab beberapa pertanyaan ringan tentang tanaman dan caramu belajar.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <EcoBadge className="bg-white/15 text-white">4 langkah singkat</EcoBadge>
          <EcoBadge className="bg-white/15 text-white">2 pertanyaan tiap langkah</EcoBadge>
          <EcoBadge className="bg-white/15 text-white">Profilmu siap di akhir</EcoBadge>
        </div>
      </EcoCard>

      {result ? (
        <>
          <section className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <EcoCard tone="soft" className="p-6 md:p-8">
              <EcoBadge className="bg-sun/25 text-earth" icon={<Sparkles className="size-4" />}>Profilmu siap</EcoBadge>
              <h2 className="mt-4 font-heading text-3xl font-black text-leaf-700">Profil Belajarku</h2>
              <p className="mt-4 text-base font-semibold leading-8 text-slateText">
                Kamu suka belajar dengan <strong>{result.learningStyle.toLowerCase()}</strong> dan tertarik untuk{" "}
                <strong>{result.interest.toLowerCase()}</strong>.
              </p>
              <p className="mt-6 rounded-2xl bg-white p-5 text-sm font-semibold leading-7 text-slateText shadow-soft">
                {result.recommendation}
              </p>
            </EcoCard>
            <EcoCard className="p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-leaf-100 text-leaf-700">
                  <Leaf className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-mutedText">Kesiapan awal</p>
                  <p className="font-heading text-xl font-black text-leaf-700">{result.ecologicalReadiness}</p>
                </div>
              </div>
              <p className="mt-6 text-sm font-semibold leading-7 text-mutedText">
                Kamu menjawab {result.correct} dari {result.total} pertanyaan pengetahuan dengan tepat. Angka ini membantu memilih langkah belajar, bukan menentukan kemampuanmu.
              </p>
              <EcoBadge className="mt-5 bg-leaf-50 text-leaf-700">{result.score}% kesiapan konsep</EcoBadge>
              <EcoButton className="mt-6" variant="ghost" onClick={restart}>Ulangi Kuis Awal</EcoButton>
            </EcoCard>
          </section>
          <NextSuggestedActionCard
            title="Pelajari mengapa tanaman butuh cahaya"
            description="Profilmu siap. Materi pendek ini akan membantumu sebelum mulai mengamati tanaman."
            href="/siswa/ecolearn"
            actionLabel="Mulai Belajar"
            secondaryAction={{ href: "/siswa/ecomission", label: "Lanjut ke Misi" }}
          />
        </>
      ) : (
        <>
          <EcoCard tone="soft" className="p-5 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-earth">Langkah {step + 1} dari {readinessSteps.length}</p>
                <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">{currentStep.title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{currentStep.description}</p>
              </div>
              <EcoBadge className="bg-white text-leaf-700">{progress}% siap</EcoBadge>
            </div>
            <EcoProgress value={progress} className="mt-5" color="yellow" />
          </EcoCard>

          <section className="grid gap-4 lg:grid-cols-2" aria-label={`Pertanyaan ${currentStep.title}`}>
            {currentQuestions.map((question, index) => (
              <EcoCard key={question.id} className="p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-leaf-100 text-sm font-black text-leaf-700">{index + 1}</span>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-earth">{question.topic}</p>
                </div>
                <h3 className="mt-4 font-heading text-xl font-black leading-8 text-leaf-700">{question.question}</h3>
                <div className="mt-5 grid gap-2.5">
                  {question.options?.map((option) => {
                    const selected = answers[question.id] === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                        className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                          selected
                            ? "border-leaf-500 bg-leaf-50 text-leaf-700 shadow-soft"
                            : "border-gardenBorder bg-white text-slateText hover:border-leaf-500/40 hover:bg-leaf-50/40"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </EcoCard>
            ))}
          </section>

          <EcoCard tone="cream" className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
            <p className="text-sm font-bold leading-6 text-earth">
              Pilih jawaban yang paling sesuai. Tidak apa-apa jika kamu masih ingin belajar.
            </p>
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              {step > 0 ? (
                <EcoButton variant="secondary" icon={<ChevronLeft className="size-4" />} onClick={() => setStep((current) => current - 1)}>
                  Kembali
                </EcoButton>
              ) : null}
              <EcoButton
                variant="reward"
                disabled={!stepComplete}
                icon={<ArrowRight className="size-4" />}
                onClick={step === readinessSteps.length - 1 ? submit : () => setStep((current) => current + 1)}
              >
                {step === readinessSteps.length - 1 ? "Lihat Profilku" : "Lanjut"}
              </EcoButton>
            </div>
          </EcoCard>
        </>
      )}
    </div>
  );
}
