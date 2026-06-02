import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function sourceAt(relativeUrl) {
  return readFile(new URL(relativeUrl, import.meta.url), "utf8").catch(() => "");
}

const effortCardSource = await sourceAt("../../components/student/EffortCheckCard.tsx");
const reflectionSource = await sourceAt("./reflection/ReflectionPage.tsx");
const missionSource = await sourceAt("./ecomission/EcoMissionPage.tsx");
const portfolioSource = await sourceAt("./portfolio/PortfolioPage.tsx");
const typesSource = await sourceAt("../../types/ecogrow.ts");

test("a reusable Cek Usahaku card gives students four simple actions", () => {
  assert.match(effortCardSource, /export function EffortCheckCard/);
  assert.match(effortCardSource, /Cek Usahaku/);
  assert.match(effortCardSource, /Mengamati tanaman dengan teliti/);
  assert.match(effortCardSource, /Membantu teman/);
  assert.match(effortCardSource, /Menjaga kebersihan/);
  assert.match(effortCardSource, /Menulis jurnal/);
});

test("reflection saves effort memory and mission reveals the check after journal completion", () => {
  assert.match(typesSource, /export interface StudentReflectionMemory/);
  assert.match(reflectionSource, /EffortCheckCard/);
  assert.match(reflectionSource, /useMockStorage/);
  assert.match(reflectionSource, /ecoGrow-reflection-memory/);
  assert.match(reflectionSource, /setReflectionMemory/);
  assert.match(missionSource, /EffortCheckCard/);
  assert.match(missionSource, /notice\?\.tone === "success"/);
});

test("portfolio presents saved story, effort and appreciation as an album memory", () => {
  assert.match(portfolioSource, /"use client"/);
  assert.match(portfolioSource, /useMockStorage/);
  assert.match(portfolioSource, /ecoGrow-reflection-memory/);
  assert.match(portfolioSource, /Cerita Belajarku/);
  assert.match(portfolioSource, /Cek Usahaku/);
  assert.match(portfolioSource, /Apresiasi untuk/);
  assert.doesNotMatch(portfolioSource, /<table/);
});
