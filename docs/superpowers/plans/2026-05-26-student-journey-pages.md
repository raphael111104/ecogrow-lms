# Student Journey Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the simplified student journey with lightweight learning, play, final quiz, reflection, portfolio, and learning-report screens.

**Architecture:** Reuse the Tahap 1 student shell, header, cards, alert, and journey stepper. Add typed student-friendly content to `layout-ux.ts`, then replace prototype re-exports route by route so each page has one principal CTA and no complex student table.

**Tech Stack:** Next.js App Router, React client state, TypeScript, Tailwind CSS, Node built-in test runner

---

### Task 1: Student Journey Data Contract

**Files:**
- Modify: `src/types/ecogrow.ts`
- Modify: `src/data/layout-ux.ts`
- Modify: `src/data/layout-ux.test.mjs`

- [x] Write failing assertions for `studentGameCards` titles, `studentMoodOptions` labels, and `studentLearningReport.practiceNext`.
- [x] Run `node --test --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON src/data/layout-ux.test.mjs` and observe failures for missing exports.
- [x] Add typed exports containing five game cards with duration/level/points, five mood choices, and a report summary with completed missions, understood concepts, practice items, and teacher message.
- [x] Run the data test again; expected result is six passing data-contract tests.

### Task 2: EcoLearn Microlearning

**Files:**
- Modify: `src/features/student/ecolearn/EcoLearnPage.tsx`

- [x] Implement `EcoLearnPage` as a client screen with `PageHeader`, one continue-learning card, four tabs (`Video`, `Bacaan Ringkas`, `Gambar`, `Kuis Mini`), a three-answer mini quiz, and a `Lanjutkan Misi` CTA.
- [x] Use existing `ecoLearnContents` and `ecoLearnChecks`; hide academic metadata from primary text.
- [x] Run `npm run typecheck`; expected exit code is 0.

### Task 3: EcoPlay and Kuis Akhir

**Files:**
- Modify: `src/features/student/ecoplay/EcoPlayPage.tsx`
- Modify: `src/features/student/quiz/EcoMasterAssessmentPage.tsx`

- [x] Implement EcoPlay with one recommended-game banner, five accessible game cards from `studentGameCards`, recent-score panel, badge reward preview, and a mock play success alert.
- [x] Rebuild Kuis Akhir as one multiple-choice question per view with progress bar, immediate friendly feedback, `Lanjut` action, and final result showing score, badge, mastered area, practice area, and either `Latihan Ulang` or `Tantangan Lanjutan`.
- [x] Run `npm run typecheck`; expected exit code is 0.

### Task 4: Cerita and Portofolio

**Files:**
- Create: `src/components/student/MoodPicker.tsx`
- Modify: `src/features/student/reflection/ReflectionPage.tsx`
- Modify: `src/features/student/portfolio/PortfolioPage.tsx`

- [x] Implement `MoodPicker` from `studentMoodOptions` with visibly selected choice.
- [x] Implement Cerita as a client form containing mood choice, four short guided prompts, text/voice-mock switch, eco promise choices, success alert, and two recent reflections.
- [x] Implement Portofolio as an album-style page with student profile, `EcoGrowJourneyStepper`, plant growth album, no more than three badges, three best works, teacher notes, and CTA to laporan belajar.
- [x] Run `npm run typecheck`; expected exit code is 0.

### Task 5: Laporan Belajar Route

**Files:**
- Create: `src/features/student/report/StudentLearningReportPage.tsx`
- Create: `src/app/siswa/laporan-belajar/page.tsx`

- [x] Implement child-friendly report sections from `studentLearningReport`: capaian saya, badge, misi selesai, sudah saya pahami, perlu saya latih, and pesan guru.
- [x] Add the route wrapper returning `<StudentLearningReportPage />` and link to it from Portofolio.
- [x] Run `npm run typecheck`; expected exit code is 0.

### Task 6: Verification

**Files:**
- Verify all Tahap 2 files.

- [x] Run all Node tests, `npm run typecheck`, and `npm run build`; all commands must exit successfully.
- [x] Use production-browser checks at desktop and `390 x 844` for `/siswa/ecolearn`, `/siswa/ecoplay`, `/siswa/ecomaster-quiz`, `/siswa/cerita-belajarku`, `/siswa/portofolio`, and `/siswa/laporan-belajar`, including one Kuis Akhir interaction and one Cerita submission.

## Execution Note

Changes remain in the active redesign branch and are not committed because the repository still lacks a clean initial commit boundary.
