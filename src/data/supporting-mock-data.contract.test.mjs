import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import * as layoutData from "./layout-ux.ts";
import * as mockData from "./mock.ts";
import * as teacherData from "./mock-teacher.ts";

async function sourceAt(relativeUrl) {
  return readFile(new URL(relativeUrl, import.meta.url), "utf8").catch(() => "");
}

const quickActionsSource = await sourceAt("../components/student/StudentQuickActions.tsx");
const ecoMasterSource = await sourceAt("../features/student/quiz/EcoMasterAssessmentPage.tsx");
const monitoringSource = await sourceAt("../features/teacher/monitoring/TeacherMonitoringPage.tsx");
const gallerySource = await sourceAt("../features/teacher/gallery/TeacherGalleryPage.tsx");

test("supporting mock data exports the roadmap datasets", () => {
  assert.ok(Array.isArray(layoutData.studentLearningFlow), "studentLearningFlow must exist");
  assert.deepEqual(layoutData.studentLearningFlow.map((item) => item.title), [
    "Kuis Awal",
    "Belajar Fotosintesis",
    "Rawat Tanaman Kangkungmu",
    "Cerita Belajarku",
  ]);
  assert.deepEqual(layoutData.studentLearningFlow.map((item) => item.href), [
    "/siswa/ecoreadiness",
    "/siswa/ecolearn",
    "/siswa/ecomission",
    "/siswa/cerita-belajarku",
  ]);

  assert.ok(mockData.quizFeedback.correct.length >= 3);
  assert.ok(mockData.quizFeedback.incorrect.length >= 3);
  assert.match(mockData.quizFeedback.correct.join(" "), /EcoPoint/);

  assert.ok(teacherData.teacherQuickFeedbackTemplates.length >= 5);
  assert.match(teacherData.teacherQuickFeedbackTemplates.map((item) => item.message).join(" "), /tinggi tanaman.*cm/i);

  assert.ok(mockData.ecoExhibitionItems.length >= 2);
  assert.ok(mockData.ecoExhibitionItems.some((item) => item.status === "waiting_review"));
  assert.ok(mockData.ecoExhibitionItems.some((item) => item.badgeCandidate));
});

test("active pages consume shared supporting mock data", () => {
  assert.match(quickActionsSource, /studentLearningFlow/);
  assert.match(quickActionsSource, /Alur belajarku/);

  assert.match(ecoMasterSource, /quizFeedback/);
  assert.doesNotMatch(ecoMasterSource, /Benar! Kerja bagus\./);

  assert.match(monitoringSource, /teacherQuickFeedbackTemplates/);
  assert.doesNotMatch(monitoringSource, /const feedbackTemplates = \[/);

  assert.match(gallerySource, /ecoExhibitionItems/);
  assert.match(gallerySource, /Kandidat Badge/);
});
