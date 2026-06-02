import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const heroSource = await readFile(new URL("./HeroSection.tsx", import.meta.url), "utf8");
const globalStyles = await readFile(new URL("../../app/globals.css", import.meta.url), "utf8");

test("hero uses the centered journey composition", () => {
  assert.match(heroSource, /const journeyTrail = \["Kenali", "Jelajahi", "Aksi", "Refleksi", "Pamerkan"\]/);
  assert.match(heroSource, /aria-label="Tahap perjalanan EcoGrow"/);
  assert.match(heroSource, /items-center text-center/);
  assert.doesNotMatch(heroSource, /Perjalanan Siswa/);
  assert.doesNotMatch(heroSource, /lg:grid-cols-\[1\.05fr_0\.7fr\]/);
});

test("headline renders a textured motion-safe bounce per letter", () => {
  const letterStyleBlock = globalStyles.match(/\.hero-headline-letter\s*\{([^}]*)\}/)?.[1] ?? "";

  assert.match(heroSource, /hero-headline-letter/);
  assert.match(heroSource, /--hero-letter-index/);
  assert.match(heroSource, /aria-hidden="true"/);
  assert.match(globalStyles, /\.hero-headline-art/);
  assert.match(letterStyleBlock, /background:/);
  assert.match(letterStyleBlock, /#fffdf6/);
  assert.match(letterStyleBlock, /#deeadc/);
  assert.doesNotMatch(letterStyleBlock, /repeating-linear-gradient/);
  assert.match(globalStyles, /@keyframes hero-letter-bloom/);
  assert.match(globalStyles, /animation:\s*hero-letter-bloom/);
  assert.match(globalStyles, /@media \(prefers-reduced-motion: reduce\)/);
});
