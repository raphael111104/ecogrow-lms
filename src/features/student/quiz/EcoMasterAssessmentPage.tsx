"use client";

import { useState } from "react";
import { Award, ArrowRight, RefreshCw, Trophy } from "lucide-react";
import { FriendlyAlert } from "@/components/shared/FriendlyAlert";
import { NextSuggestedActionCard } from "@/components/shared/NextSuggestedActionCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { EcoProgress } from "@/components/ui/EcoProgress";
import { ecoMasterSummativeQuestions, quizFeedback } from "@/data";
import { useMockStorage } from "@/hooks/useMockStorage";
import { calculateSingleChoiceScore, getEcoMasterRecommendation } from "@/lib/ecogrow-assessment-utils";
import type { EcoMasterResult } from "@/types/ecogrow";

export function EcoMasterAssessmentPage() {
  const questions = ecoMasterSummativeQuestions.filter((question) => question.format === "single_choice");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [lockedAnswers, setLockedAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useMockStorage<EcoMasterResult | null>("ecoGrow-ecomaster-results", null);
  const question = questions[step];
  const answer = answers[question?.id];
  const isCorrect = Boolean(answer && answer === question.answer);
  const progress = result ? 100 : Math.round(((step + (answer ? 1 : 0)) / questions.length) * 100);
  const feedbackMessages = isCorrect ? quizFeedback.correct : quizFeedback.incorrect;
  const answerFeedback = answer ? feedbackMessages[step % feedbackMessages.length] : "";

  const finishQuiz = () => {
    const score = calculateSingleChoiceScore(questions, answers);
    const recommendation = getEcoMasterRecommendation(score.score);
    setResult({
      score: score.score,
      correct: score.correct,
      total: score.total,
      answers,
      recommendation: recommendation.message,
      badges: score.score >= 85 ? ["Eco Exhibitor", "Ahli Tanaman Muda"] : score.score >= 70 ? ["Ahli Tanaman Muda"] : [],
      pendingValidation: 0,
      completedAt: "2026-05-26",
    });
  };

  const nextQuestion = () => {
    if (step === questions.length - 1) {
      finishQuiz();
      return;
    }
    setStep((current) => current + 1);
  };

  const chooseAnswer = (option: string) => {
    if (answer || lockedAnswers[question.id]) return;
    setAnswers((current) => ({ ...current, [question.id]: option }));
    setLockedAnswers((current) => ({ ...current, [question.id]: true }));
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setLockedAnswers({});
    setResult(null);
  };

  if (result) {
    const nextRecommendation = getEcoMasterRecommendation(result.score);
    const needsPractice = result.score < 70;
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <PageHeader
          eyebrow="Kuis Akhir"
          title="Hasil Belajarmu"
          description="Lihat hal yang sudah kamu pahami dan latihan berikutnya."
          badge="Selesai"
        />
        <EcoCard tone="cream" className="text-center">
          <Trophy className="mx-auto size-14 text-harvest" aria-hidden="true" />
          <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-earth">Skormu</p>
          <p className="mt-2 font-heading text-7xl font-black text-leaf-700">{result.score}</p>
          {result.badges.map((badge) => (
            <EcoBadge key={badge} className="mt-4 bg-sun/25 text-earth" icon={<Award className="size-4" />}>
              Badge {badge}
            </EcoBadge>
          ))}
        </EcoCard>
        <div className="grid gap-4 md:grid-cols-2">
          <EcoCard tone="soft">
            <h2 className="font-heading text-xl font-black text-leaf-700">Sudah kamu kuasai</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slateText">
              Kamu mengenali hubungan cahaya, air, dan pertumbuhan tanaman.
            </p>
          </EcoCard>
          <EcoCard tone={needsPractice ? "cream" : "soft"}>
            <h2 className="font-heading text-xl font-black text-leaf-700">
              {nextRecommendation.label}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slateText">{result.recommendation}</p>
          </EcoCard>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <EcoButton
            variant={needsPractice ? "primary" : "secondary"}
            href={nextRecommendation.nextHref}
          >
            {nextRecommendation.actionLabel}
          </EcoButton>
          <EcoButton variant="secondary" icon={<RefreshCw className="size-4" />} onClick={restart}>
            Ulangi Kuis
          </EcoButton>
        </div>
        <NextSuggestedActionCard
          eyebrow="Pamerkan Hasilmu"
          title="Bawa karya terbaikmu ke galeri"
          description="Kuis selesai. Pilih foto, jurnal, atau cerita yang ingin kamu tampilkan dalam pamer karya."
          href="/siswa/galeri"
          actionLabel="Buka Galeri"
          secondaryAction={{ href: "/siswa/laporan-belajar", label: "Lihat Laporan Belajar" }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        eyebrow="Kuis Akhir"
        title="Buktikan Pengetahuanmu"
        description="Jawab satu soal setiap kali. Kamu bisa mencoba lagi bila belum tepat."
        badge={`${questions.length} soal`}
      />

      <EcoCard tone="soft">
        <div className="flex items-center justify-between gap-3 text-sm font-black text-leaf-700">
          <span>Soal {step + 1} dari {questions.length}</span>
          <span>{progress}%</span>
        </div>
        <EcoProgress value={progress} className="mt-3" color="yellow" />
      </EcoCard>

      <EcoCard className="p-6 md:p-8">
        <EcoBadge className="bg-leaf-100 text-leaf-700">Pilih satu jawaban</EcoBadge>
        <h2 className="mt-5 font-heading text-2xl font-black leading-9 text-leaf-700 md:text-3xl">
          {question.question}
        </h2>
        <div className="mt-6 grid gap-3">
          {question.options?.map((option) => (
            <button
              key={option}
              type="button"
              disabled={Boolean(answer)}
              aria-pressed={answer === option}
              onClick={() => chooseAnswer(option)}
              className={`min-h-14 rounded-2xl border p-4 text-left text-base font-bold transition ${
                answer === option
                  ? "border-leaf-500 bg-leaf-50 text-leaf-700 shadow-soft"
                  : "border-gardenBorder bg-white text-slateText disabled:cursor-not-allowed disabled:opacity-70"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {answer ? (
          <FriendlyAlert
            className="mt-5"
            tone={isCorrect ? "success" : "warning"}
            title={isCorrect ? "Jawaban tepat!" : "Ayo pahami petunjuknya."}
            description={
              isCorrect
                ? `${answerFeedback} ${question.explanation ?? "Jawabanmu menunjukkan pemahaman yang baik."} +${question.points} EcoPoint.`
                : `${answerFeedback} ${question.explanation ?? "Coba baca kembali materi tentang tanaman."} ${question.remedialHint ?? "Kamu dapat menguatkannya di EcoLearn."}`
            }
          />
        ) : null}
      </EcoCard>

      <div className="flex justify-end">
        <EcoButton
          disabled={!answer}
          variant="reward"
          icon={<ArrowRight className="size-4" />}
          onClick={nextQuestion}
        >
          {step === questions.length - 1 ? "Lihat Hasil" : "Lanjut"}
        </EcoButton>
      </div>
    </div>
  );
}
