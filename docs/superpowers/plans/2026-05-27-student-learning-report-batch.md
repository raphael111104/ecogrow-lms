# Student Learning Report Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the student learning report into a child-friendly closing page with progress storytelling, document actions, and a recommended next step.

**Architecture:** Keep the existing report route and shared card system. Enrich the small report mock-data contract, compose the journey and action state inside `StudentLearningReportPage`, and expose the route through existing secondary student navigation.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Node test runner.

---

### Task 1: Contract First

**Files:**
- Create: `src/features/student/StudentLearningReportJourney.contract.test.mjs`

- [x] Assert the six child-friendly report sections, journey strip, mock document actions, recommendation card, and navigation entry.
- [x] Run `node --test src/features/student/StudentLearningReportJourney.contract.test.mjs` and confirm it fails against the pre-batch report.

### Task 2: Report Data And Page

**Files:**
- Modify: `src/types/ecogrow.ts`
- Modify: `src/data/layout-ux.ts`
- Modify: `src/data/navigation.ts`
- Modify: `src/features/student/report/StudentLearningReportPage.tsx`

- [x] Replace the report score emphasis with celebration copy and journey progress data.
- [x] Render the requested report labels, five-stage progress strip, mock `Cetak Laporan` and `Unduh Laporan` confirmations, and `NextSuggestedActionCard`.
- [x] Add `Laporan Belajar` to secondary navigation so the completed journey remains discoverable.
- [x] Run the new contract and `npm run typecheck` to confirm GREEN.

### Task 3: Verification

**Files:**
- Modify: `docs/superpowers/plans/2026-05-27-student-learning-report-batch.md`

- [x] Run all relevant contract tests, layout tests, `npm run typecheck`, `npm run build`, and `git diff --check`.
- [x] Inspect `/siswa/laporan-belajar` in the browser at desktop and mobile widths, including both mock actions and page overflow.
- [x] Record the verification result in this plan.

**Verification result (2026-05-27):**
- The Batch 10 contract failed first for the old report labels and absent document actions, then passed after implementation.
- `42/42` relevant contract and layout tests passed; `npm run typecheck` and `npm run build` passed, generating `29/29` static routes.
- Browser review confirmed the requested report sections, five-step journey, accessible secondary navigation entry, mock confirmations for `Cetak Laporan` and `Unduh Laporan`, and the recommended next action.
- Mobile review at `390 x 844` found no horizontal page overflow; viewport sizing was restored after inspection.
