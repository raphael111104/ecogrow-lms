import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const navigationSource = await readFile(new URL("../../data/navigation.ts", import.meta.url), "utf8");
const shellSource = await readFile(new URL("./AppShell.tsx", import.meta.url), "utf8");
const missionSource = await readFile(new URL("../student/TodayMissionCard.tsx", import.meta.url), "utf8");

test("student menu separates primary routes from secondary routes", () => {
  assert.match(navigationSource, /siswaPrimaryNavigation/);
  assert.match(navigationSource, /siswaSecondaryNavigation/);
  assert.match(navigationSource, /siswaMobileNavigation/);
  assert.match(navigationSource, /label:\s*"Lainnya"/);
});

test("student shell renders an accessible more menu and five mobile targets", () => {
  assert.match(shellSource, /studentMoreOpen/);
  assert.match(shellSource, /aria-label="Lainnya"/);
  assert.match(shellSource, /grid-cols-5/);
  assert.match(shellSource, /siswaSecondaryNavigation/);
});

test("student mission keeps a visibly dominant continue action", () => {
  assert.match(missionSource, /Lanjutkan Misi/);
  assert.match(missionSource, /variant="reward"/);
  assert.match(missionSource, /fullWidth/);
});
