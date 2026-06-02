import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function sourceAt(relativeUrl) {
  return readFile(new URL(relativeUrl, import.meta.url), "utf8").catch(() => "");
}

const dashboardSource = await sourceAt("./dashboard/TeacherDashboardPage.tsx");
const actionPanelSource = await sourceAt("../../components/teacher/ActionNeededPanel.tsx");
const monitoringSource = await sourceAt("./monitoring/TeacherMonitoringPage.tsx");
const teacherDataSource = await sourceAt("../../data/mock-teacher.ts");

test("teacher dashboard puts today's work ahead of overview metrics", () => {
  assert.ok(dashboardSource.indexOf("<ActionNeededPanel") < dashboardSource.indexOf("<TeacherOverviewCards"));
  assert.match(actionPanelSource, /Yang harus ditangani hari ini/);
  assert.match(actionPanelSource, /Tinjau Jurnal/);
  assert.match(actionPanelSource, /Lihat Asesmen/);
  assert.match(actionPanelSource, /Moderasi Galeri/);
});

test("teacher monitoring offers quick filters and ready-to-send feedback templates", () => {
  assert.match(monitoringSource, /teacherQuickFeedbackTemplates/);
  assert.match(monitoringSource, /statusFilters/);
  assert.match(monitoringSource, /Menunggu Review/);
  assert.match(monitoringSource, /Perlu Revisi/);
  assert.match(teacherDataSource, /Pengamatanmu sudah baik/);
  assert.match(teacherDataSource, /Coba tambahkan foto tanaman yang lebih jelas/);
  assert.match(teacherDataSource, /tinggi tanaman dalam satuan cm/);
  assert.match(teacherDataSource, /Ceritakan juga perubahan warna daun/);
  assert.match(monitoringSource, /setFeedback\(template\.message\)/);
});
