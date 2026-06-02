import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function sourceAt(relativeUrl) {
  return readFile(new URL(relativeUrl, import.meta.url), "utf8").catch(() => "");
}

const modulePageSource = await sourceAt("./module/TeacherModulePage.tsx");
const layoutDataSource = await sourceAt("../../data/layout-ux.ts");

test("teacher module exposes the required completeness checklist", () => {
  assert.match(layoutDataSource, /teacherModuleCompletenessChecklist/);
  for (const label of ["Identitas", "CP dan TP", "Sintaks EcoGrow", "LKPD", "Asesmen", "Refleksi Guru", "Remedial\\/Pengayaan"]) {
    assert.match(layoutDataSource, new RegExp(label));
  }
  assert.match(modulePageSource, /Kelengkapan Modul/);
  assert.match(modulePageSource, /teacherModuleCompletenessChecklist/);
});

test("teacher module folds document sections and exposes mock document actions", () => {
  for (const section of ["Informasi Umum", "Komponen Inti", "Langkah Pembelajaran", "LKPD Digital", "Asesmen", "Refleksi dan Tindak Lanjut"]) {
    assert.match(modulePageSource, new RegExp(section));
  }
  assert.match(modulePageSource, /Gunakan Modul/);
  assert.match(modulePageSource, /Edit Modul/);
  assert.match(modulePageSource, /Cetak Modul/);
  assert.match(modulePageSource, /actionNotice/);
});
