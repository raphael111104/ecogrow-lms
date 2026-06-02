import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const reflectionSource = await readFile(new URL("./ReflectionPage.tsx", import.meta.url), "utf8");

test("reflection guides students with tomorrow-focused prompts and four green promises", () => {
  assert.match(reflectionSource, /Apa hal baru yang kamu pelajari\?/);
  assert.match(reflectionSource, /Bagian mana yang paling kamu sukai\?/);
  assert.match(reflectionSource, /Apa yang ingin kamu coba besok\?/);
  assert.match(reflectionSource, /Aku akan membuang sampah pada tempatnya\./);
  assert.match(reflectionSource, /Aku akan membantu teman satu tim\./);
});

test("reflection includes a simple peer appreciation activity", () => {
  assert.match(reflectionSource, /Apresiasi Teman/);
  assert.match(reflectionSource, /friends/);
  assert.match(reflectionSource, /appreciation/);
  assert.match(reflectionSource, /Terima kasih karena/);
});

test("reflection history is a friendly story trail and keeps the next suggested action", () => {
  assert.match(reflectionSource, /Jejak Ceritaku/);
  assert.match(reflectionSource, /border-l-2/);
  assert.match(reflectionSource, /NextSuggestedActionCard/);
});
