# Supporting Mock Data Batch Implementation Plan

**Goal:** Add and wire roadmap supporting mock data for student learning flow, quiz feedback, teacher quick feedback, and exhibition candidates.

**Architecture:** Keep data in existing shared `@/data` exports and consume it from active pages/components. Preserve local storage keys, route paths, and internal identifiers.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Node test runner.

---

### Task 1: Contract And Baseline

**Files:**
- Create: `src/data/supporting-mock-data.contract.test.mjs`

- [x] Assert the four supporting datasets exist with expected shape and child-friendly labels.
- [x] Assert active components import and render/use those shared datasets.
- [x] Run the new contract and confirm it fails before implementation.

### Task 2: Add Supporting Mock Data

**Files:**
- Modify: `src/types/ecogrow.ts`
- Modify: `src/data/layout-ux.ts`
- Modify: `src/data/mock.ts`

- [x] Add typed student learning-flow data.
- [x] Add typed quiz feedback bank.
- [x] Add typed teacher quick-feedback templates.
- [x] Add typed exhibition candidate summaries.

### Task 3: Wire Active Pages

**Files:**
- Modify: `src/components/student/StudentQuickActions.tsx`
- Modify: `src/features/student/quiz/EcoMasterAssessmentPage.tsx`
- Modify: `src/features/teacher/monitoring/TeacherMonitoringPage.tsx`
- Modify: `src/features/teacher/gallery/TeacherGalleryPage.tsx`

- [x] Show compact learning-flow context on the student dashboard quick action area.
- [x] Use shared quiz feedback inside EcoMaster answer feedback.
- [x] Use shared teacher feedback templates on Monitoring Guru.
- [x] Show exhibition candidate badge metadata on Galeri Guru.

### Task 4: Verification

- [x] Run the new contract, affected suites, typecheck, build, and `git diff --check`.
- [x] Browser-check representative student and teacher pages.
- [x] Record verification results here.

**Verification result (2026-05-28):**
- The new contract failed first because the roadmap datasets and active-page wiring were absent, then passed after implementation.
- `50/50` relevant contract, layout, and assessment utility tests passed.
- `npm run typecheck` passed.
- `npm run build` passed and generated all `29/29` static routes.
- Browser smoke confirmed `Alur belajarku` on the student dashboard, shared EcoMaster answer feedback, shared Monitoring Guru feedback templates, and `Kandidat Badge` metadata on Galeri Guru.
- `git diff --check` passed; Git only reported normal Windows LF-to-CRLF warnings for touched files.
