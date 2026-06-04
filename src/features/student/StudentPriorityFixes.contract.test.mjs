import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const missionSource = await readFile(new URL("./ecomission/EcoMissionPage.tsx", import.meta.url), "utf8");
const ecoPlaySource = await readFile(new URL("./ecoplay/EcoPlayPage.tsx", import.meta.url), "utf8");
const gallerySource = await readFile(new URL("./gallery/StudentGalleryPage.tsx", import.meta.url), "utf8");
const shellSource = await readFile(new URL("../../components/layout/AppShell.tsx", import.meta.url), "utf8");
const prototypeSource = await readFile(new URL("../../components/prototype/PrototypePages.tsx", import.meta.url), "utf8");

test("EcoMission persists submitted journals and reuses contextual kangkung evidence", () => {
  assert.match(missionSource, /useMockStorage<JournalEntry\[\]>/);
  assert.match(missionSource, /ecoGrow-student-journals/);
  assert.match(missionSource, /school-garden-kangkung-pots\.png/);
  assert.match(missionSource, /setJournals\(\[nextJournal, \.\.\.journals\]\)/);
});

test("EcoMission journal form keeps icon spacing and uses a styled condition list", () => {
  assert.match(missionSource, /pl-14/);
  assert.match(missionSource, /conditionMenuOpen/);
  assert.match(missionSource, /role="listbox"/);
  assert.match(missionSource, /aria-selected/);
  assert.doesNotMatch(missionSource, /<select[\s\S]*Kondisi daun/);
});

test("EcoPlay exposes all five game cards as playable mini games", () => {
  assert.match(ecoPlaySource, /food-chain/);
  assert.match(ecoPlaySource, /plant-parts/);
  assert.match(ecoPlaySource, /healthy-plant/);
  assert.doesNotMatch(ecoPlaySource, /sedang disiapkan/);
});

test("student shell search and mission switch change visible state", () => {
  assert.match(shellSource, /searchQuery/);
  assert.match(shellSource, /setSearchQuery/);
  assert.match(shellSource, /selectedMissionId/);
  assert.match(shellSource, /onChange=\{\(event\) => setSelectedMissionId/);
});

test("student gallery uses a real file picker preview instead of URL mock fields", () => {
  assert.match(gallerySource, /type="file"/);
  assert.match(gallerySource, /handleImageChange/);
  assert.match(gallerySource, /URL\.createObjectURL/);
  assert.doesNotMatch(gallerySource, /URL gambar mock/);
});

test("EcoChallenge and Ecomart save evidence beyond passive prototype textareas", () => {
  assert.match(prototypeSource, /completedTasks/);
  assert.match(prototypeSource, /setChallengeEvidence/);
  assert.match(prototypeSource, /harvestReflection/);
  assert.match(prototypeSource, /setHarvestReflection/);
  assert.match(prototypeSource, /Catatan refleksi panen tersimpan/);
});
