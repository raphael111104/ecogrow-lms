# Teacher Daily Review Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prioritize teacher daily actions on the dashboard and provide two-click quick feedback in Monitoring.

**Architecture:** Keep the existing teacher feature pages and shared components. Reorder dashboard composition around the existing `ActionNeededPanel`, extend that component with direct action links, and add local template/filter configuration to the client-side Monitoring page without introducing persistence or new routes.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Tailwind utilities, existing Eco UI components, Node test runner.

---

### Task 1: Contract Tests

**Files:**
- Create: `src/features/teacher/TeacherDailyReview.contract.test.mjs`

- [x] Add checks for dashboard priority ordering and direct daily-action CTA labels.
- [x] Add checks for four Monitoring status filters and four feedback template messages.
- [x] Run `node --test src/features/teacher/TeacherDailyReview.contract.test.mjs`.

Expected: FAIL because the current dashboard renders overview statistics before its action panel and Monitoring has no quick-template controls.

### Task 2: Dashboard Priority

**Files:**
- Modify: `src/features/teacher/dashboard/TeacherDashboardPage.tsx`
- Modify: `src/components/teacher/ActionNeededPanel.tsx`

- [x] Position the action/project section before `TeacherOverviewCards`.
- [x] Rename the panel emphasis to `Yang harus ditangani hari ini`.
- [x] Add `Tinjau Jurnal`, `Lihat Asesmen`, and `Moderasi Galeri` shortcut buttons.

### Task 3: Quick Monitoring Feedback

**Files:**
- Modify: `src/features/teacher/monitoring/TeacherMonitoringPage.tsx`

- [x] Declare four classroom-ready `feedbackTemplates` and four button-based `statusFilters`.
- [x] Render filter chips that immediately reduce the submission queue.
- [x] Render template buttons that populate the existing feedback editor before sending.

### Task 4: Verification

- [x] Run Batch 7 contract tests with the existing layout and student-journey contract suites.
- [x] Run `npm run typecheck`, `npm run build`, and `git diff --check` on touched files.
- [x] Verify the dashboard priority order and two-click Monitoring feedback in the local in-app browser, including a narrow viewport overflow check.

**Verification result (2026-05-27):**
- The Batch 7 contract failed first for the old dashboard order and missing Monitoring templates, then passed after implementation.
- `36/36` relevant contract and layout tests passed; `npm run typecheck` and `npm run build` passed, with `29/29` static routes generated.
- Browser review confirmed that daily tasks appear before metrics, `Tinjau Jurnal` leads to Monitoring, `Perlu Revisi` reveals the matching queue item, selecting `Ukur tinggi tanaman dengan satuan cm.` fills the editor, and `Kirim Feedback` displays confirmation.
- Mobile review at `390 x 844` found no horizontal overflow on Dashboard or Monitoring. Screenshot capture for the template area was attempted, but the retained image was blank and a retry timed out, so no visual artifact is attached.
