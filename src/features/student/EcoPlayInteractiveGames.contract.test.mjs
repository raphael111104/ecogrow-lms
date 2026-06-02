import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const ecoPlaySource = await readFile(new URL("./ecoplay/EcoPlayPage.tsx", import.meta.url), "utf8");

test("EcoPlay provides two playable mini-game examples", () => {
  assert.match(ecoPlaySource, /miniGameById/);
  assert.match(ecoPlaySource, /photosynthesisSequence/);
  assert.match(ecoPlaySource, /compostChoices/);
  assert.match(ecoPlaySource, /Arena Latihan Mini/);
});

test("EcoPlay mini-games include child-friendly prompts and direct feedback", () => {
  assert.match(ecoPlaySource, /Cahaya matahari/);
  assert.match(ecoPlaySource, /Air diserap akar/);
  assert.match(ecoPlaySource, /Sisa daun kering/);
  assert.match(ecoPlaySource, /Cek Jawaban/);
  assert.match(ecoPlaySource, /Urutannya sudah tepat/);
  assert.match(ecoPlaySource, /Bahan komposmu sudah benar/);
});

test("EcoPlay game buttons open a playable panel instead of only showing a ready message", () => {
  assert.match(ecoPlaySource, /activeGameId/);
  assert.match(ecoPlaySource, /startGame/);
  assert.match(ecoPlaySource, /setSequencePick/);
  assert.match(ecoPlaySource, /setCompostPick/);
});
