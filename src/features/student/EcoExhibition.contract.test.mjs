import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function sourceAt(relativeUrl) {
  return readFile(new URL(relativeUrl, import.meta.url), "utf8").catch(() => "");
}

const studentGallerySource = await sourceAt("./gallery/StudentGalleryPage.tsx");
const teacherGallerySource = await sourceAt("../teacher/gallery/TeacherGalleryPage.tsx");
const portfolioSource = await sourceAt("./portfolio/PortfolioPage.tsx");

test("student gallery presents the work exhibition as a final achievement", () => {
  assert.match(studentGallerySource, /"use client"/);
  assert.match(studentGallerySource, /ecoGrow-exhibition-gallery/);
  assert.match(studentGallerySource, /Pameran Karya/);
  assert.match(studentGallerySource, /Pamerkan Karya/);
  assert.match(studentGallerySource, /Lulus Misi Ekologis/);
  assert.match(studentGallerySource, /Ajukan Karya Terbaik/);
  assert.doesNotMatch(studentGallerySource, /components\/prototype\/PrototypePages/);
});

test("teacher gallery can publish featured exhibition works", () => {
  assert.match(teacherGallerySource, /"use client"/);
  assert.match(teacherGallerySource, /ecoGrow-exhibition-gallery/);
  assert.match(teacherGallerySource, /Publikasikan ke Galeri/);
  assert.match(teacherGallerySource, /Lulus Misi Ekologis/);
  assert.match(teacherGallerySource, /Rubrik Pameran/);
  assert.doesNotMatch(teacherGallerySource, /components\/guru\/TeacherPages/);
});

test("portfolio leads students into the exhibition stage", () => {
  assert.match(portfolioSource, /Pamerkan Karya/);
  assert.match(portfolioSource, /Buka Pameran Karya/);
  assert.match(portfolioSource, /Lulus Misi Ekologis/);
  assert.match(portfolioSource, /\/siswa\/galeri/);
});
