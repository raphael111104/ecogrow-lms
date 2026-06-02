import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function sourceAt(relativeUrl) {
  return readFile(new URL(relativeUrl, import.meta.url), "utf8").catch(() => "");
}

const reportSource = await sourceAt("./report/StudentLearningReportPage.tsx");
const layoutSource = await sourceAt("../../data/layout-ux.ts");
const navigationSource = await sourceAt("../../data/navigation.ts");

test("student report uses the child-friendly roadmap sections and journey language", () => {
  for (const section of [
    "Capaian Belajarku",
    "Misi yang Sudah Selesai",
    "Badge yang Kudapat",
    "Hal yang Sudah Kupahami",
    "Hal yang Perlu Kulatih Lagi",
    "Pesan Guru",
    "Perjalanan Belajarku",
  ]) {
    assert.match(reportSource, new RegExp(section));
  }
  assert.doesNotMatch(reportSource, /studentLearningReport\.score/);
  assert.match(layoutSource, /celebration/);
  assert.match(layoutSource, /completedJourneySteps/);
});

test("student report exposes document actions and one clear follow-up", () => {
  assert.match(reportSource, /Cetak Laporan/);
  assert.match(reportSource, /Unduh Laporan/);
  assert.match(reportSource, /FriendlyAlert/);
  assert.match(reportSource, /NextSuggestedActionCard/);
  assert.match(layoutSource, /nextAction/);
  assert.match(navigationSource, /Laporan Belajar/);
  assert.match(navigationSource, /\/siswa\/laporan-belajar/);
});
