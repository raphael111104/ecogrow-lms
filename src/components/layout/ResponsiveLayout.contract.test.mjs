import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function sourceAt(relativeUrl) {
  return readFile(new URL(relativeUrl, import.meta.url), "utf8").catch(() => "");
}

const appShellSource = await sourceAt("./AppShell.tsx");
const globalsSource = await sourceAt("../../app/globals.css");
const teacherAssessmentSource = await sourceAt("../../features/teacher/assessment/TeacherAssessmentPage.tsx");
const ecoLearnSource = await sourceAt("../../features/student/ecolearn/EcoLearnPage.tsx");
const quickActionsSource = await sourceAt("../student/StudentQuickActions.tsx");

test("role shells protect mobile content and navigation breakpoints", () => {
  assert.match(globalsSource, /overflow-x:\s*hidden/);
  assert.match(appShellSource, /fixed inset-x-3 bottom-3/);
  assert.match(appShellSource, /lg:hidden/);
  assert.match(appShellSource, /isTeacher \? "grid-cols-4" : "grid-cols-5"/);
  assert.match(appShellSource, /<main className="px-4 pb-28 pt-5 md:px-6 md:py-6">/);
  assert.match(appShellSource, /hidden w-64 .* lg:flex/);
  assert.match(appShellSource, /lg:pl-64/);
});

test("wide learning and teacher data surfaces scroll internally", () => {
  assert.match(teacherAssessmentSource, /overflow-x-auto/);
  assert.match(teacherAssessmentSource, /min-w-\[760px\]/);
  assert.match(ecoLearnSource, /role="tablist"/);
  assert.match(ecoLearnSource, /overflow-x-auto/);
  assert.match(quickActionsSource, /grid-cols-2 gap-3 lg:grid-cols-4/);
  assert.match(quickActionsSource, /md:grid-cols-4/);
});
