import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const ecoPlaySource = await readFile(new URL("./ecoplay/EcoPlayPage.tsx", import.meta.url), "utf8");
const globalsSource = await readFile(new URL("../../app/globals.css", import.meta.url), "utf8");

test("EcoPlay hero includes a living garden arcade illustration", () => {
  assert.match(ecoPlaySource, /eco-play-hero-card/);
  assert.match(ecoPlaySource, /eco-play-orbit/);
  assert.match(ecoPlaySource, /eco-play-seedling/);
  assert.match(ecoPlaySource, /aria-hidden="true"/);
});

test("EcoPlay game cards and badges gain visual polish without changing routes", () => {
  assert.match(ecoPlaySource, /ecoPlayBadgePath/);
  assert.match(ecoPlaySource, /Badge Pemikir Hijau/);
  assert.match(ecoPlaySource, /Penjaga Siklus/);
  assert.match(ecoPlaySource, /Detektif Daun/);
  assert.match(ecoPlaySource, /eco-play-game-card/);
});

test("EcoPlay motion has scoped keyframes and respects reduced motion", () => {
  assert.match(globalsSource, /@keyframes eco-play-orbit/);
  assert.match(globalsSource, /@keyframes eco-play-leaf-bob/);
  assert.match(globalsSource, /\.eco-play-hero-card/);
  assert.match(globalsSource, /\.eco-play-game-card/);
  assert.match(globalsSource, /prefers-reduced-motion: reduce[\s\S]*eco-play-orbit/);
});
