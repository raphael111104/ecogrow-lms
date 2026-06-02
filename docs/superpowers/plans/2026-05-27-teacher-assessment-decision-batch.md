# Teacher Assessment Decision Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn Asesmen Guru into a concise stage-score and follow-up decision surface.

**Architecture:** Retain the existing teacher assessment page and side-panel composition. Enrich mock assessment data with three named stage scores, align the assessment tabs with the revision document, and render explicit follow-up buckets through the existing recommendation panel.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Tailwind utilities, existing Eco UI components, Node test runner.

---

### Task 1: Contract Tests

**Files:**
- Create: `src/features/teacher/TeacherAssessmentDecision.contract.test.mjs`

- [x] Assert the five specified teacher assessment tab labels and explicit stage-score columns.
- [x] Assert the four concise recommendation labels and row action wording.
- [x] Run `node --test src/features/teacher/TeacherAssessmentDecision.contract.test.mjs`.

Expected: FAIL because the old table has generic cognitive fields and the old panel lacks the required labels.

### Task 2: Mock Assessment Data

**Files:**
- Modify: `src/types/ecogrow.ts`
- Modify: `src/data/mock-teacher.ts`

- [x] Add named diagnostic, mission, and summative scores to `AssessmentMatrixItem`.
- [x] Align `assessmentTabs` with the visible five-mode terminology.
- [x] Add four `teacherAssessmentFollowUps` entries with label, count, note, and route.

### Task 3: Assessment Decision UI

**Files:**
- Modify: `src/features/teacher/assessment/TeacherAssessmentPage.tsx`
- Modify: `src/components/teacher/AssessmentRecommendationPanel.tsx`

- [x] Render the required summary columns and a `Tinjau` action per student.
- [x] Translate raw recommendations into concise teacher-facing status labels.
- [x] Render four action-oriented follow-up buckets in the recommendation panel.

### Task 4: Verification

- [x] Run Batch 8 contract tests together with existing teacher, layout, and student-journey contract suites.
- [x] Run `npm run typecheck`, `npm run build`, and `git diff --check` on touched files.
- [x] Verify Asesmen interaction and responsive behavior in the local in-app browser.

**Verification result (2026-05-27):**
- The Batch 8 contract failed first against the old assessment tabs/table/panel, then passed after implementation.
- `38/38` relevant contract and layout tests passed; `npm run typecheck` and `npm run build` passed, generating `29/29` static routes.
- Browser review confirmed all five required tabs, the named score columns, four follow-up labels, the `KAIH` tab explanation, the recommendation acknowledgement, and row action navigation into Monitoring.
- Mobile review at `390 x 844` found no horizontal page overflow; the compact table retains internal scrolling as intended.
