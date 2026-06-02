import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readinessSource = await readFile(new URL("./readiness/EcoReadinessPage.tsx", import.meta.url), "utf8");
const quizSource = await readFile(new URL("./quiz/EcoMasterAssessmentPage.tsx", import.meta.url), "utf8");

test("EcoReadiness uses a four-screen friendly quiz wizard", () => {
  assert.match(readinessSource, /readinessSteps/);
  assert.match(readinessSource, /Kuis Awal/);
  assert.match(readinessSource, /Yang sudah kutahu/);
  assert.match(readinessSource, /Profil Belajarku/);
  assert.match(readinessSource, /Lihat Profilku/);
});

test("EcoReadiness result points children to learning and mission actions", () => {
  assert.match(readinessSource, /Mulai Belajar/);
  assert.match(readinessSource, /Lanjut ke Misi/);
  assert.match(readinessSource, /currentQuestions/);
});

test("EcoMaster locks answers and rewards immediate learning feedback", () => {
  assert.match(quizSource, /lockedAnswers/);
  assert.match(quizSource, /EcoPoint/);
  assert.match(quizSource, /disabled=\{Boolean\(answer\)\}/);
});

test("EcoMaster summary links to the learning report", () => {
  assert.match(quizSource, /Lihat Laporan Belajar/);
  assert.match(quizSource, /\/siswa\/laporan-belajar/);
});
