import assert from "node:assert/strict";
import test from "node:test";

let ux = {};

try {
  ux = await import("./layout-ux.ts");
} catch {
  ux = {};
}

test("student priorities stay limited to three clear daily actions", () => {
  assert.ok(Array.isArray(ux.studentTodayTasks), "studentTodayTasks must exist");
  assert.ok(ux.studentTodayTasks.length > 0 && ux.studentTodayTasks.length <= 3);
  assert.deepEqual(ux.studentTodayTasks.map((task) => task.title), [
    "Isi Jurnal Tanaman",
    "Belajar Fotosintesis",
    "Ceritakan Belajarmu",
  ]);
});

test("journey steps use friendly student-facing labels", () => {
  assert.ok(Array.isArray(ux.studentJourneySteps), "studentJourneySteps must exist");
  assert.deepEqual(ux.studentJourneySteps.map((step) => step.label), [
    "Kenali Alam",
    "Jelajahi Masalah",
    "Lakukan Aksi",
    "Cerita dan Renungan",
    "Pamerkan Karya",
  ]);
});

test("teacher actions expose operational follow-up routes", () => {
  assert.ok(Array.isArray(ux.teacherActionItems), "teacherActionItems must exist");
  assert.deepEqual(ux.teacherActionItems.map((item) => item.href), [
    "/guru/monitoring",
    "/guru/asesmen",
    "/guru/galeri",
  ]);
});

test("student games offer five friendly play choices", () => {
  assert.ok(Array.isArray(ux.studentGameCards), "studentGameCards must exist");
  assert.deepEqual(ux.studentGameCards.map((game) => game.title), [
    "Puzzle Rantai Makanan",
    "Tebak Bagian Tumbuhan",
    "Urutkan Fotosintesis",
    "Tanaman Sehat",
    "Pilah Sampah Organik",
  ]);
});

test("reflection mood choices use child-friendly feelings", () => {
  assert.ok(Array.isArray(ux.studentMoodOptions), "studentMoodOptions must exist");
  assert.deepEqual(ux.studentMoodOptions.map((mood) => mood.label), [
    "Senang",
    "Bingung",
    "Bangga",
    "Mau coba lagi",
    "Butuh bantuan",
  ]);
});

test("student report gives concrete practice guidance", () => {
  assert.ok(ux.studentLearningReport, "studentLearningReport must exist");
  assert.deepEqual(ux.studentLearningReport.practiceNext, [
    "Membandingkan warna daun sehat dan daun layu.",
    "Mengulang latihan tentang kebutuhan air tanaman.",
  ]);
});

test("teacher dashboard presents only four operational overview cards", () => {
  assert.ok(Array.isArray(ux.teacherOverviewCards), "teacherOverviewCards must exist");
  assert.deepEqual(ux.teacherOverviewCards.map((card) => card.label), [
    "Siswa aktif",
    "Jurnal hari ini",
    "Menunggu feedback",
    "Perlu dukungan",
  ]);
});

test("teacher review queue makes urgent journal work visible", () => {
  assert.ok(Array.isArray(ux.teacherSubmissionQueue), "teacherSubmissionQueue must exist");
  assert.deepEqual(ux.teacherSubmissionQueue.map((item) => item.priority), ["high", "medium", "low"]);
});

test("teacher module setup has a concise readiness checklist", () => {
  assert.ok(Array.isArray(ux.teacherModuleChecklist), "teacherModuleChecklist must exist");
  assert.deepEqual(ux.teacherModuleChecklist.map((item) => item.label), [
    "Tujuan belajar terisi",
    "Misi lima tahap siap",
    "Rubrik proyek terhubung",
    "Pesan orang tua dijadwalkan",
  ]);
});

test("teacher report identifies concrete next actions", () => {
  assert.ok(ux.teacherClassReport, "teacherClassReport must exist");
  assert.deepEqual(ux.teacherClassReport.nextActions, [
    "Tinjau 7 jurnal yang menunggu feedback.",
    "Dampingi 4 siswa yang memerlukan penguatan.",
    "Bagikan laporan kelas kepada orang tua.",
  ]);
});

test("landing page explains three classroom problems and responses", () => {
  assert.ok(Array.isArray(ux.landingProblemSolutions), "landingProblemSolutions must exist");
  assert.equal(ux.landingProblemSolutions.length, 3);
  assert.deepEqual(ux.landingProblemSolutions.map((item) => item.response), [
    "Misi singkat berbasis tanaman sekolah.",
    "Jurnal foto dan feedback dalam satu alur.",
    "Laporan ringkas untuk tindak lanjut guru.",
  ]);
});

test("landing page highlights measurable learning impact", () => {
  assert.ok(Array.isArray(ux.landingImpactMetrics), "landingImpactMetrics must exist");
  assert.deepEqual(ux.landingImpactMetrics.map((item) => item.value), ["5", "2", "1"]);
});
