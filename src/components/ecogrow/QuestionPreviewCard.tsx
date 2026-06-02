"use client";

import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoCard } from "@/components/ui/EcoCard";
import { getEcoGrowStageByLegacy } from "@/data";
import type { EcoGrowQuestion } from "@/types/ecogrow";

type QuestionPreviewCardProps = {
  question: EcoGrowQuestion;
  showAnswer?: boolean;
  selectedAnswer?: string;
  onSelectAnswer?: (questionId: string, answer: string) => void;
};

export function QuestionPreviewCard({
  question,
  showAnswer = false,
  selectedAnswer,
  onSelectAnswer,
}: QuestionPreviewCardProps) {
  const stage = question.stageId ? getEcoGrowStageByLegacy(question.stageId) : null;
  const correct = selectedAnswer && selectedAnswer === question.answer;

  return (
    <EcoCard className="p-4">
      <div className="flex flex-wrap gap-2">
        <EcoBadge className="bg-leaf-100 text-leaf-700">{question.kind}</EcoBadge>
        {question.bloomLevel ? <EcoBadge className="bg-sun/25 text-earth">Bloom {question.bloomLevel}</EcoBadge> : null}
        {question.soloLevel ? <EcoBadge className="bg-sky/15 text-sky">{question.soloLevel}</EcoBadge> : null}
        {stage ? <EcoBadge className="bg-white text-leaf-700">{stage.title} ({stage.localTerm})</EcoBadge> : null}
      </div>
      <p className="mt-4 text-sm font-extrabold uppercase tracking-wide text-mutedText">{question.topic} - {question.points} poin</p>
      <h3 className="mt-2 font-heading text-lg font-black leading-7 text-leaf-700">{question.question}</h3>
      {question.options ? (
        <div className="mt-4 grid gap-2">
          {question.options.map((option) => (
            <button
              key={option}
              type="button"
              disabled={!onSelectAnswer}
              onClick={() => onSelectAnswer?.(question.id, option)}
              className={`rounded-xl border p-3 text-left text-sm font-bold transition ${
                selectedAnswer === option ? "border-leaf-500 bg-leaf-50 text-leaf-700" : "border-gardenBorder bg-white text-slateText"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl bg-cream p-3 text-sm font-semibold text-earth">
          {question.format === "performance" ? "Karya akan dinilai menggunakan rubrik Eco-Exhibition." : "Jawaban tertulis perlu validasi guru."}
        </p>
      )}
      {showAnswer ? (
        <div className="mt-4 rounded-xl bg-leaf-50 p-3 text-sm font-semibold leading-6 text-slateText">
          {question.answer ? <p><strong>Kunci:</strong> {Array.isArray(question.answer) ? question.answer.join(", ") : question.answer}</p> : null}
          {selectedAnswer ? <p className={correct ? "text-leaf-700" : "text-red-700"}>{correct ? question.feedbackCorrect ?? "Jawaban benar." : question.feedbackIncorrect ?? "Jawaban belum tepat."}</p> : null}
          {question.explanation ? <p>{question.explanation}</p> : null}
          {!correct && question.remedialHint ? <p><strong>Penguatan:</strong> {question.remedialHint}</p> : null}
        </div>
      ) : null}
    </EcoCard>
  );
}
