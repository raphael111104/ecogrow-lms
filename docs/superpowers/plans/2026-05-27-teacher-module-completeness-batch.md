# Teacher Module Completeness Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn Modul Ajar Guru into a complete, accordion-based teaching-document preview with visible readiness and document actions.

**Architecture:** Keep `/guru/modul-ajar` as the focused route page and retain existing Eco UI primitives. Add a dedicated completeness checklist in layout data, compose six semantic document groups from the existing generated module seed, and provide local action acknowledgements without backend changes.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Tailwind utilities, existing Eco UI components, Node test runner.

---

### Task 1: Contract Tests

**Files:**
- Create: `src/features/teacher/TeacherModuleCompleteness.contract.test.mjs`

- [x] Assert seven required `Kelengkapan Modul` checklist labels.
- [x] Assert six named accordion groups and the three requested module actions.
- [x] Run `node --test src/features/teacher/TeacherModuleCompleteness.contract.test.mjs`.

Expected: FAIL because the current page has only a short checklist and activity-step accordion.

### Task 2: Completeness Data

**Files:**
- Modify: `src/data/layout-ux.ts`

- [x] Add `teacherModuleCompletenessChecklist` containing `Identitas`, `CP dan TP`, `Sintaks EcoGrow`, `LKPD`, `Asesmen`, `Refleksi Guru`, and `Remedial/Pengayaan`.

### Task 3: Module Document UI

**Files:**
- Modify: `src/features/teacher/module/TeacherModulePage.tsx`

- [x] Render `Kelengkapan Modul` from the new checklist.
- [x] Render six semantic `<details>` groups covering the required document structure.
- [x] Add `Gunakan Modul`, `Edit Modul`, and `Cetak Modul` actions with friendly local confirmations.

### Task 4: Verification

- [x] Run Batch 9 tests with previous teacher, layout, and student-journey contract suites.
- [x] Run `npm run typecheck`, `npm run build`, and `git diff --check` on touched files.
- [x] Verify module actions, accordion content, and responsive behavior in the local in-app browser.

**Verification result (2026-05-27):**
- The Batch 9 contract failed first for the missing completeness dataset, accordion groups, and requested actions, then passed after implementation.
- `40/40` relevant contract and layout tests passed; `npm run typecheck` and `npm run build` passed, generating `29/29` static routes.
- Browser review confirmed seven visible checklist signals, six document groups, confirmations for `Gunakan Modul`, `Edit Modul`, and `Cetak Modul`, plus expanded `Refleksi dan Tindak Lanjut` content.
- Mobile review at `390 x 844` found no horizontal page overflow. Screenshot capture was attempted once but unavailable, so no visual artifact is attached.
