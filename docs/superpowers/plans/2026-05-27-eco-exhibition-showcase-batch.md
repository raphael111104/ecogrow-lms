# Eco-Exhibition Showcase Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing gallery destinations into an Eco-Exhibition climax with student celebration and teacher mock publishing.

**Architecture:** Student and teacher gallery route modules become focused page components that read one local `GalleryPost[]` exhibition collection seeded from `galleryPosts`. Teacher updates remain client-only through `useMockStorage`; the student view reads the same published state. Portofolio receives one contextual destination card and otherwise retains its album structure.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Tailwind utilities, existing Eco UI components, Node test runner.

---

### Task 1: Contract Tests

**Files:**
- Create: `src/features/student/EcoExhibition.contract.test.mjs`

- [x] Add checks that student gallery renders `Eco-Exhibition`, `Lulus Misi Ekologis`, shared mock storage, and no prototype export.
- [x] Add checks that teacher gallery renders `Publikasikan ke Galeri`, rubric/status content, shared mock storage, and no prototype export.
- [x] Add checks that Portofolio links to `/siswa/galeri` as its exhibition destination.
- [x] Run `node --test src/features/student/EcoExhibition.contract.test.mjs`.

Expected: FAIL while the existing feature files remain prototype re-exports and Portofolio has no exhibition card.

### Task 2: Student Showcase Page

**Files:**
- Modify: `src/features/student/gallery/StudentGalleryPage.tsx`

- [x] Build a client-side gallery page reading `useMockStorage<GalleryPost[]>("ecoGrow-exhibition-gallery", galleryPosts)`.
- [x] Render a celebratory header, achievement marker, own-work note, featured showcase cards, and a mock `Ajukan Karya Terbaik` acknowledgement.

### Task 3: Teacher Curation Page

**Files:**
- Modify: `src/features/teacher/gallery/TeacherGalleryPage.tsx`

- [x] Build a client-side curation page reading and updating the same `ecoGrow-exhibition-gallery` list.
- [x] Add selection controls, status cards, a `Publikasikan ke Galeri` action, a revision action, and a compact rubric panel.

### Task 4: Portfolio Destination

**Files:**
- Modify: `src/features/student/portfolio/PortfolioPage.tsx`

- [x] Add an Eco-Exhibition celebration card with `Lulus Misi Ekologis` and a link to `/siswa/galeri`.

### Task 5: Verification

- [x] Run the new contract test together with all previous student journey and layout contract suites.
- [x] Run `npm run typecheck`, `npm run build`, and `git diff --check` on touched files.
- [x] Verify student exhibition, portfolio route, and teacher publishing interaction in the local in-app browser at desktop and mobile sizes where appropriate.

**Verification result (2026-05-27):**
- The new contract first failed as expected against prototype re-exports and the old portfolio page, then passed after implementation.
- `34/34` relevant contract and layout tests passed; `npm run typecheck` and `npm run build` passed, with `29/29` static routes generated.
- Browser review passed for student gallery submission, portfolio exhibition CTA, mobile layouts at `390 x 844` without horizontal overflow, teacher publication of `Catatan Air Nutrisi`, and its appearance in the student exhibition after the role was restored.
