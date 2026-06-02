# Student Effort And Portfolio Memory Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `Cek Usahaku` to completed student activities and display the saved reflection memory inside the portfolio album.

**Architecture:** A controlled `EffortCheckCard` provides one reusable student-facing checklist. `ReflectionPage` persists a typed latest-reflection snapshot using the existing `useMockStorage` hook, while `PortfolioPage` consumes it to render a story and appreciation memory; `EcoMissionPage` uses the same card after successful journal submission without introducing a second save system.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Tailwind utility classes, Node test runner.

---

### Task 1: Contract Coverage

**Files:**
- Create: `src/features/student/StudentPortfolioReflection.contract.test.mjs`

- [x] Add contract checks for `EffortCheckCard`, reflection persistence, completed-mission visibility, and portfolio display.
- [x] Run `node --test src/features/student/StudentPortfolioReflection.contract.test.mjs`.

Expected: FAIL because the reusable card and local reflection memory are not yet implemented.

### Task 2: Shared Effort Card And Typed Memory

**Files:**
- Create: `src/components/student/EffortCheckCard.tsx`
- Modify: `src/types/ecogrow.ts`

- [x] Add four action statements: observing carefully, helping friends, keeping clean, and writing a journal.
- [x] Add `StudentReflectionMemory` containing `mood`, `lesson`, `promise`, `appreciationFriend`, `appreciationMessage`, `efforts`, and `savedAt`.

### Task 3: Activity Integration

**Files:**
- Modify: `src/features/student/reflection/ReflectionPage.tsx`
- Modify: `src/features/student/ecomission/EcoMissionPage.tsx`

- [x] Add controlled effort selection to reflection and persist `ecoGrow-reflection-memory` on `Simpan Cerita`.
- [x] Display `EffortCheckCard` after a successful journal submit in EcoMission.

### Task 4: Portfolio Album Memory

**Files:**
- Modify: `src/features/student/portfolio/PortfolioPage.tsx`

- [x] Read `ecoGrow-reflection-memory` in the portfolio client component.
- [x] Render `Cerita Belajarku` and `Cek Usahaku` album cards with an appreciation note when saved memory exists.
- [x] Preserve the existing photos, works, teacher feedback, and final quiz CTA.

### Task 5: Verification

- [x] Run the new contract test in GREEN state with existing student journey contracts.
- [x] Run `npm run typecheck` and `npm run build`.
- [x] Inspect `/siswa/cerita-belajarku`, `/siswa/ecomission`, and `/siswa/portofolio` in the in-app browser if local navigation is accepted by the client.

## Verification Result

- RED confirmed: the new contract suite failed on missing effort card, memory type, persistence integration, and portfolio memory UI before implementation.
- GREEN confirmed: the new suite and existing journey/reflection contracts passed after implementation.
- Full current contract and UX checks passed with 31 tests and zero failures.
- `npm run typecheck` and `npm run build` passed; build generated the student routes including Cerita, EcoMission, and Portofolio.
- Desktop browser flow confirmed that saving Cerita records a selected effort and appreciation, which Portofolio displays after local-state hydration; EcoMission reveals `Cek Usahaku` only after journal success.
- Mobile browser flow at `390 x 844` confirmed the new Cerita and Portofolio content without horizontal overflow.
- Screenshot capture was attempted twice but timed out inside the in-app browser capture service, so no visual artifact is attached for this batch.
