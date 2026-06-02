import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function sourceAt(relativeUrl) {
  return readFile(new URL(relativeUrl, import.meta.url), "utf8").catch(() => "");
}

const cardSource = await sourceAt("../../components/shared/NextSuggestedActionCard.tsx");
const readinessSource = await sourceAt("./readiness/EcoReadinessPage.tsx");
const learnSource = await sourceAt("./ecolearn/EcoLearnPage.tsx");
const missionSource = await sourceAt("./ecomission/EcoMissionPage.tsx");
const reflectionSource = await sourceAt("./reflection/ReflectionPage.tsx");
const portfolioSource = await sourceAt("./portfolio/PortfolioPage.tsx");
const quizSource = await sourceAt("./quiz/EcoMasterAssessmentPage.tsx");

test("student journey uses a reusable next suggested action card", () => {
  assert.match(cardSource, /export function NextSuggestedActionCard/);
  assert.match(cardSource, /secondaryAction/);
  assert.match(cardSource, /Langkah Berikutnya/);
  [readinessSource, learnSource, missionSource, reflectionSource, portfolioSource, quizSource].forEach((source) => {
    assert.match(source, /NextSuggestedActionCard/);
  });
});

test("student next actions follow the intended learning journey", () => {
  assert.match(readinessSource, /\/siswa\/ecolearn/);
  assert.match(learnSource, /\/siswa\/ecomission/);
  assert.match(missionSource, /\/siswa\/cerita-belajarku/);
  assert.match(reflectionSource, /\/siswa\/portofolio/);
  assert.match(portfolioSource, /\/siswa\/ecomaster-quiz/);
  assert.match(quizSource, /\/siswa\/galeri/);
});

test("completion-only actions remain gated by saved work", () => {
  assert.match(missionSource, /notice\?\.tone === "success"/);
  assert.match(reflectionSource, /saved\s*\?/);
});
