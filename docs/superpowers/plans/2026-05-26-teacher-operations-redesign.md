# Teacher Operations Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the teacher area into a concise operational workspace for reviewing journals, guiding projects, assessing students, and reading class reports.

**Architecture:** Replace redesigned teacher feature re-exports with focused pages and small teacher components. Reuse existing repositories for domain records, while adding typed presentation data in `layout-ux.ts` for predictable dashboard, workflow, and reporting content.

**Tech Stack:** Next.js App Router, React client state, TypeScript, Tailwind CSS, Node built-in test runner

---

### Task 1: Teacher Operations Data Contract

**Files:**
- Modify: `src/types/ecogrow.ts`
- Modify: `src/data/layout-ux.ts`
- Modify: `src/data/layout-ux.test.mjs`

- [x] Write failing assertions for four teacher overview cards, submission priorities, module checklist items, and report recommendations.
- [x] Run the data-contract test and observe failures for missing teacher presentation exports.
- [x] Add typed teacher presentation exports used by operational pages and the report route.
- [x] Run the data test again; expected result is all data-contract tests passing.

### Task 2: Dashboard Components and Navigation

**Files:**
- Create: `src/components/teacher/TeacherOverviewCards.tsx`
- Create: `src/components/teacher/ActionNeededPanel.tsx`
- Create: `src/components/teacher/ActiveProjectCard.tsx`
- Create: `src/components/teacher/SubmissionQueue.tsx`
- Modify: `src/features/teacher/dashboard/TeacherDashboardPage.tsx`
- Modify: `src/data/navigation.ts`
- Modify: `src/components/layout/AppShell.tsx`

- [x] Implement a focused dashboard with four metrics, action-needed panel, active project progress, recent submission queue, and clear quick actions.
- [x] Add contextual/mobile access to `Laporan` for teachers while keeping older routes available.
- [x] Run `npm run typecheck`; expected exit code is 0.

### Task 3: Modul Ajar and Proyek

**Files:**
- Modify: `src/features/teacher/module/TeacherModulePage.tsx`
- Modify: `src/features/teacher/project/TeacherProjectPage.tsx`

- [x] Implement Modul Ajar with a primary create action, short checklist, readable module preview, and expandable five-stage activity plan.
- [x] Implement Proyek with an active project summary, five-stage workflow board, project cards, and a mock activation confirmation.
- [x] Run `npm run typecheck`; expected exit code is 0.

### Task 4: Monitoring and Asesmen

**Files:**
- Modify: `src/features/teacher/monitoring/TeacherMonitoringPage.tsx`
- Create: `src/components/teacher/AssessmentRecommendationPanel.tsx`
- Modify: `src/features/teacher/assessment/TeacherAssessmentPage.tsx`

- [x] Implement Monitoring with concise summary cards, filters, a readable submission queue, selected-journal details, and feedback confirmation.
- [x] Implement Asesmen with mode tabs, small result table, recommendation panel, and report CTA.
- [x] Run `npm run typecheck`; expected exit code is 0.

### Task 5: Laporan Guru Route

**Files:**
- Create: `src/features/teacher/report/TeacherReportPage.tsx`
- Create: `src/app/guru/laporan/page.tsx`

- [x] Implement class-report sections for progress, evidence completion, students needing follow-up, and next teacher actions.
- [x] Link the report from dashboard, assessment, and teacher mobile navigation.
- [x] Run `npm run typecheck`; expected exit code is 0.

### Task 6: Verification

**Files:**
- Verify all Tahap 3 files.

- [x] Run all Node tests, `npm run typecheck`, and `npm run build`; all commands must exit successfully.
- [x] Check `/guru`, `/guru/modul-ajar`, `/guru/proyek`, `/guru/monitoring`, `/guru/asesmen`, and `/guru/laporan` at desktop and mobile production viewports, including one feedback or action interaction.

## Execution Note

Changes remain in the active redesign branch and are not committed because the repository lacks a clean initial commit boundary.
