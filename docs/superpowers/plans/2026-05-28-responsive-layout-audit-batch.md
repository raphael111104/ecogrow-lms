# Responsive Layout Audit Batch Implementation Plan

**Goal:** Complete roadmap item 16 by auditing responsive behavior across active EcoGrow routes and adding a regression contract for key responsive layout patterns.

**Architecture:** No production redesign is needed unless the browser audit finds real document-level overflow or broken navigation. Preserve existing route structure and layout components.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, Browser plugin, Node test runner.

---

### Task 1: Browser Audit

**Files:**
- No source edits expected unless failures are found.

- [x] Audit public, student, and teacher routes at mobile `390 x 844`, tablet `768 x 1024`, and desktop `1280 x 720`.
- [x] Check document-level horizontal overflow, mobile bottom navigation, and desktop sidebar visibility.
- [x] Classify allowed internal scroll areas such as tabs and data tables separately from broken page overflow.

### Task 2: Regression Contract

**Files:**
- Create: `src/components/layout/ResponsiveLayout.contract.test.mjs`

- [x] Assert global horizontal clipping, mobile bottom navigation spacing, role-aware mobile navigation columns, and desktop sidebar breakpoint.
- [x] Assert known wide surfaces are wrapped in horizontal scroll containers.

### Task 3: Verification

- [x] Run responsive contract, existing contract suites, typecheck, build, and `git diff --check`.
- [x] Capture representative screenshot for mobile and complete DOM/metric audit for tablet and desktop.
- [x] Record verification results here.

**Verification result (2026-05-28):**
- Browser audit covered `72` route/breakpoint checks: `36` student, `27` teacher, and `9` public checks.
- Mobile `390 x 844`, tablet `768 x 1024`, and desktop `1280 x 720` all reported document-level `overflowX = 0`.
- Student and teacher mobile navigation appeared at mobile/tablet breakpoints; desktop sidebars appeared at desktop breakpoint.
- Allowed internal scroll surfaces were identified: EcoLearn tabs and the teacher assessment table. They did not create document-level overflow.
- One representative mobile screenshot was captured successfully. Additional tablet/desktop screenshot capture timed out through browser CDP, but the DOM and overflow metrics completed.
- `52/52` relevant contract, layout, and assessment tests passed.
- `npm run typecheck` passed.
- `npm run build` passed and generated all `29/29` static routes.
- `git diff --check` passed for the responsive audit artifacts.
