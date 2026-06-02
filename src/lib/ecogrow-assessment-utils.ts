import type { EcoGrowQuestion } from "@/types/ecogrow";

export function calculateSingleChoiceScore(
  questions: EcoGrowQuestion[],
  answers: Record<string, string>,
) {
  const scorable = questions.filter((question) => question.format === "single_choice" && typeof question.answer === "string");
  const correct = scorable.filter((question) => answers[question.id] === question.answer).length;
  const totalPoints = scorable.reduce((sum, question) => sum + question.points, 0);
  const earnedPoints = scorable.reduce(
    (sum, question) => (answers[question.id] === question.answer ? sum + question.points : sum),
    0,
  );

  return {
    correct,
    total: scorable.length,
    earnedPoints,
    totalPoints,
    score: totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0,
  };
}

export function getRecommendationByScore(score: number) {
  if (score < 70) {
    return {
      type: "remedial" as const,
      title: "Yuk Latihan Ulang",
      description: "Pelajari lagi cara tanaman membutuhkan cahaya dan air, lalu coba kembali Kuis Awal.",
    };
  }
  if (score >= 85) {
    return {
      type: "enrichment" as const,
      title: "Siap Tantangan Lanjutan",
      description: "Buat poster atau ide agar tanaman terus dirawat, lalu pamerkan karyamu.",
    };
  }
  return {
    type: "standard" as const,
    title: "Lanjutkan Misi",
    description: "Pemahamanmu sudah baik. Lengkapi jurnal dan ceritamu agar album belajarmu semakin lengkap.",
  };
}

export function countHotsQuestions(questions: EcoGrowQuestion[]) {
  return questions.filter((question) => ["C4", "C5", "C6"].includes(question.bloomLevel ?? "")).length;
}

export function countSoloDeepQuestions(questions: EcoGrowQuestion[]) {
  return questions.filter((question) => ["Relational", "Extended Abstract"].includes(question.soloLevel ?? "")).length;
}
