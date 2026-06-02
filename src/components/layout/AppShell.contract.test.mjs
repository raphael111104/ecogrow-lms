import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const shellSource = await readFile(new URL("./AppShell.tsx", import.meta.url), "utf8");
const globalStyles = await readFile(new URL("../../app/globals.css", import.meta.url), "utf8");

test("teacher navigation uses a restrained themed scrollbar", () => {
  assert.match(shellSource, /isTeacher \? "teacher-sidebar-scroll" : "student-sidebar-scroll"/);
  assert.match(globalStyles, /\.teacher-sidebar-scroll\s*\{/);
  assert.match(globalStyles, /\.teacher-sidebar-scroll::\-webkit\-scrollbar-thumb\s*\{/);
  assert.match(globalStyles, /scrollbar-color:\s*rgba\(134, 198, 94,/);
  assert.match(globalStyles, /width:\s*0\.45rem/);
});
