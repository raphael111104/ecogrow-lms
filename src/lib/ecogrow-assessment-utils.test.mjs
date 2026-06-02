import assert from "node:assert/strict";
import test from "node:test";

let assessmentUtils = {};
let assessmentData = {};

try {
  assessmentUtils = await import("./ecogrow-assessment-utils.ts");
} catch {
  assessmentUtils = {};
}

try {
  assessmentData = await import("../data/ecogrow-assessments.ts");
} catch {
  assessmentData = {};
}

test("calculateSingleChoiceScore scores only automatically scorable questions by points", () => {
  assert.equal(typeof assessmentUtils.calculateSingleChoiceScore, "function", "assessment scoring utility must exist");

  const questions = [
    { id: "q1", format: "single_choice", answer: "A", points: 10 },
    { id: "q2", format: "single_choice", answer: "B", points: 30 },
    { id: "q3", format: "short_answer", points: 60 },
  ];

  assert.deepEqual(assessmentUtils.calculateSingleChoiceScore(questions, { q1: "A", q2: "A" }), {
    correct: 1,
    total: 2,
    earnedPoints: 10,
    totalPoints: 40,
    score: 25,
  });
});

test("getRecommendationByScore maps remedial, standard, and enrichment thresholds", () => {
  assert.equal(typeof assessmentUtils.getRecommendationByScore, "function", "assessment recommendation utility must exist");

  assert.equal(assessmentUtils.getRecommendationByScore(69).type, "remedial");
  assert.equal(assessmentUtils.getRecommendationByScore(70).type, "standard");
  assert.equal(assessmentUtils.getRecommendationByScore(85).type, "enrichment");
});

test("assessment package exposes diagnostic, formative, summative, HOTS, and deep SOLO items", () => {
  assert.ok(assessmentData.ecogrowAssessmentPackage, "assessment package data must exist");

  const { diagnostic, formative, summative } = assessmentData.ecogrowAssessmentPackage;
  assert.equal(diagnostic.questions.length, 8);
  assert.equal(formative.questions.length, 6);
  assert.equal(summative.questions.length, 8);
  assert.ok(assessmentUtils.countHotsQuestions(summative.questions) >= 6);
  assert.ok(assessmentUtils.countSoloDeepQuestions(summative.questions) >= 8);
});
