# Next Suggested Action Student Journey Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menambahkan kartu langkah berikutnya yang konsisten pada enam titik perjalanan siswa sehingga tiap penyelesaian mengarah jelas ke aktivitas berikutnya.

**Architecture:** Satu komponen presentasional `NextSuggestedActionCard` memusatkan gaya CTA dan menerima route/copy melalui props. Setiap halaman siswa mengimpor komponen dan menentukan visibility berdasarkan state lokal yang sudah ada, tanpa state lintas halaman atau API baru.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, lucide-react, Node built-in test runner, browser verification pada localhost.

---

## File Structure

- Create: `src/components/shared/NextSuggestedActionCard.tsx` untuk kartu CTA reusable.
- Create: `src/features/student/NextSuggestedAction.contract.test.mjs` untuk kontrak komponen dan enam integrasi halaman.
- Modify: `src/features/student/readiness/EcoReadinessPage.tsx` untuk langkah setelah profil.
- Modify: `src/features/student/ecolearn/EcoLearnPage.tsx` untuk langkah setelah materi.
- Modify: `src/features/student/ecomission/EcoMissionPage.tsx` untuk langkah setelah jurnal berhasil.
- Modify: `src/features/student/reflection/ReflectionPage.tsx` untuk langkah setelah cerita tersimpan.
- Modify: `src/features/student/portfolio/PortfolioPage.tsx` untuk langkah menuju kuis akhir.
- Modify: `src/features/student/quiz/EcoMasterAssessmentPage.tsx` untuk langkah menuju galeri/pameran setelah hasil.

### Task 1: Journey Card Contract

**Files:**
- Create: `src/features/student/NextSuggestedAction.contract.test.mjs`

- [x] **Step 1: Add failing source contract tests**

Create tests that read the card and six feature sources, asserting:

```js
assert.match(cardSource, /NextSuggestedActionCard/);
assert.match(cardSource, /secondaryAction/);
assert.match(readinessSource, /NextSuggestedActionCard/);
assert.match(learnSource, /NextSuggestedActionCard/);
assert.match(missionSource, /notice\?\.tone === "success"/);
assert.match(reflectionSource, /saved \?/);
assert.match(portfolioSource, /\/siswa\/ecomaster-quiz/);
assert.match(quizSource, /\/siswa\/galeri/);
```

- [x] **Step 2: Verify RED**

Run: `node --test src/features/student/NextSuggestedAction.contract.test.mjs`

Expected: tests fail because no shared action card or page integrations exist.

### Task 2: Shared Suggested Action Card

**Files:**
- Create: `src/components/shared/NextSuggestedActionCard.tsx`

- [x] **Step 1: Implement the presentational card**

Create a typed component using `EcoCard`, `EcoButton`, and `ArrowRight`/`Sparkles` icons. It renders the eyebrow, title, description, primary button, and optional secondary button while accepting `className`.

- [x] **Step 2: Keep API state-free**

The component receives route/copy props only; do not add storage reads, effects, completion detection, or data mutations.

### Task 3: Integrate The Student Journey

**Files:**
- Modify: `src/features/student/readiness/EcoReadinessPage.tsx`
- Modify: `src/features/student/ecolearn/EcoLearnPage.tsx`
- Modify: `src/features/student/ecomission/EcoMissionPage.tsx`
- Modify: `src/features/student/reflection/ReflectionPage.tsx`
- Modify: `src/features/student/portfolio/PortfolioPage.tsx`
- Modify: `src/features/student/quiz/EcoMasterAssessmentPage.tsx`

- [x] **Step 1: Add result and always-visible transitions**

Use the card on the Readiness result, EcoLearn end section, Portfolio end section, and EcoMaster result. Preserve Readiness secondary route to `/siswa/ecomission` and existing Quiz report CTA.

- [x] **Step 2: Add completion-gated transitions**

Use `notice?.tone === "success"` in EcoMission to show a card linking to `/siswa/cerita-belajarku`, and `saved ?` in Reflection to show a card linking to `/siswa/portofolio`.

- [x] **Step 3: Verify GREEN**

Run: `node --test src/features/student/NextSuggestedAction.contract.test.mjs src/features/student/StudentLearningFeedback.contract.test.mjs`

Expected: all Batch 2 and Batch 3 contract tests pass.

### Task 4: Regression And Browser Verification

**Files:**
- Verify all six modified feature components and the shared card.

- [x] **Step 1: Run regression checks**

Run: `node --test src/features/student/NextSuggestedAction.contract.test.mjs src/features/student/StudentLearningFeedback.contract.test.mjs src/components/layout/StudentNavigation.contract.test.mjs src/components/layout/AppShell.contract.test.mjs src/components/landing/HeroSection.contract.test.mjs; node --test --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON src/data/layout-ux.test.mjs`

Expected: all contract/data tests pass.

- [x] **Step 2: Typecheck and build**

Run: `npm run typecheck`

Expected: exits with code `0`.

Run: `npm run build`

Expected: the Next.js production build succeeds.

- [x] **Step 3: Browser validation**

Verify conditional cards after saving a journal and a story, result cards on Readiness/Quiz, static cards on EcoLearn/Portfolio, and check mobile layout for horizontal overflow.

## Execution Note

Pengguna secara eksplisit meminta Batch 3 langsung dieksekusi tanpa gerbang persetujuan tambahan. Repository belum memiliki baseline commit yang bersih, sehingga perubahan tetap diverifikasi tanpa staging atau commit otomatis.
