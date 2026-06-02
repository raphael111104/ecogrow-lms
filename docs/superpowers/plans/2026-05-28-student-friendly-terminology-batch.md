# Student Friendly Terminology Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace remaining technical copy on active student screens with action-oriented language specified by the EcoGrow roadmap.

**Architecture:** Keep routes, component boundaries, and internal identifiers intact. Change only rendered labels/data feeding student screens, with one contract test guarding the terminology across shared navigation and representative active pages.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Node test runner.

---

### Task 1: Student Terminology Contract

**Files:**
- Create: `src/features/student/StudentFriendlyTerminology.contract.test.mjs`

- [x] Assert journey labels, album navigation, story/missions/exhibition wording, recommendation copy, and learner-facing Tantangan/Panen UI.
- [x] Run `node --test src/features/student/StudentFriendlyTerminology.contract.test.mjs` and confirm failure for legacy copy.

### Task 2: Visible Student Copy

**Files:**
- Modify: `src/data/layout-ux.ts`
- Modify: `src/data/navigation.ts`
- Modify: `src/data/mock.ts`
- Modify: `src/lib/ecogrow-assessment-utils.ts`
- Modify: `src/components/shared/MockUploadBox.tsx`
- Modify: `src/features/student/ecomission/EcoMissionPage.tsx`
- Modify: `src/features/student/reflection/ReflectionPage.tsx`
- Modify: `src/features/student/portfolio/PortfolioPage.tsx`
- Modify: `src/features/student/gallery/StudentGalleryPage.tsx`
- Modify: `src/features/student/ecoplay/EcoPlayPage.tsx`
- Modify: `src/components/prototype/PrototypePages.tsx`
- Modify: `src/data/layout-ux.test.mjs`
- Modify: `src/features/student/reflection/ReflectionExperience.contract.test.mjs`
- Modify: `src/features/student/EcoExhibition.contract.test.mjs`

- [x] Replace visible labels using the approved child-friendly terminology while preserving internal identifiers and teacher terminology.
- [x] Update earlier tests only where the intentional language contract changes.
- [x] Run the new contract, updated affected tests, and `npm run typecheck` to confirm GREEN.

### Task 3: Full Verification

**Files:**
- Modify: `docs/superpowers/plans/2026-05-28-student-friendly-terminology-batch.md`

- [x] Run the complete relevant contract suite, layout tests, `npm run typecheck`, `npm run build`, and `git diff --check`.
- [x] Browser-check representative student pages and mobile layout for visible terminology and overflow.
- [x] Record verification results here.

**Verification result (2026-05-28):**
- The new contract failed first against legacy journey, story/album, and practice wording, then passed after implementation.
- `48/48` relevant contract, layout, and assessment utility tests passed; `npm run typecheck` passed; `npm run build` generated all `29/29` static routes.
- Browser review confirmed `Album Belajarku`, action-first journey labels, `Cerita Hari Ini`, `Pamerkan Karya`, `Mode latihan dibuka`, and the friendly Tantangan/Panen wording on active student routes.
- Mobile review at `390 x 844` found no horizontal overflow; viewport sizing was restored after inspection.
