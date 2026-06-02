import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function sourceAt(relativeUrl) {
  return readFile(new URL(relativeUrl, import.meta.url), "utf8").catch(() => "");
}

const assessmentPageSource = await sourceAt("./assessment/TeacherAssessmentPage.tsx");
const recommendationPanelSource = await sourceAt("../../components/teacher/AssessmentRecommendationPanel.tsx");
const teacherDataSource = await sourceAt("../../data/mock-teacher.ts");
const typeSource = await sourceAt("../../types/ecogrow.ts");

test("teacher assessment uses the five decision tabs and named stage score columns", () => {
  assert.match(teacherDataSource, /Rubrik Kinerja/);
  assert.match(teacherDataSource, /KAIH/);
  assert.match(typeSource, /diagnosticScore/);
  assert.match(typeSource, /missionScore/);
  assert.match(typeSource, /summativeScore/);
  assert.match(assessmentPageSource, /Kuis Awal/);
  assert.match(assessmentPageSource, /Latihan Misi/);
  assert.match(assessmentPageSource, /Kuis Akhir/);
});

test("teacher assessment exposes concise follow-up recommendations and actions", () => {
  assert.match(assessmentPageSource, /Perlu Latihan Ulang/);
  assert.match(assessmentPageSource, /Siap Tantangan Lanjutan/);
  assert.match(assessmentPageSource, /Perlu Pendampingan/);
  assert.match(assessmentPageSource, /Tinjau/);
  assert.match(recommendationPanelSource, /teacherAssessmentFollowUps/);
  assert.match(teacherDataSource, /Konsisten Baik/);
});
