# Landing Page and Final Validation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Present EcoGrow clearly from the first viewport and validate the complete student/teacher redesign responsively.

**Architecture:** Remove the blocking landing splash, strengthen the existing section composition with explicit role entry points, a problem-solution section, and impact signals, while reusing the established visual system and educational sections.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, Node built-in test runner

---

### Task 1: Landing Content Contract

**Files:**
- Modify: `src/types/ecogrow.ts`
- Modify: `src/data/layout-ux.ts`
- Modify: `src/data/layout-ux.test.mjs`

- [x] Add failing assertions for three problem-solution cards and three impact metrics.
- [x] Run the data-contract test and observe failures for missing landing exports.
- [x] Add typed landing presentation data.
- [x] Run the data test again; expected result is all data-contract tests passing.

### Task 2: First Viewport and Narrative Sections

**Files:**
- Modify: `src/components/landing/LandingPage.tsx`
- Modify: `src/components/landing/HeroSection.tsx`
- Create: `src/components/landing/ProblemSolutionSection.tsx`
- Create: `src/components/landing/ImpactSection.tsx`
- Modify: `src/data/navigation.ts`
- Modify: `src/components/landing/FooterSection.tsx`

- [x] Remove the blocking splash so landing content and CTA are immediately available.
- [x] Make the hero communicate the ecological learning journey and expose separate student and teacher CTA paths.
- [x] Insert problem-solution and impact sections, update anchor navigation, and repair footer copy.
- [x] Run `npm run typecheck`; expected exit code is 0.

### Task 3: Final Verification

**Files:**
- Verify the complete redesign.

- [x] Run all Node tests, `npm run typecheck`, and `npm run build`; all commands must exit successfully.
- [x] Inspect the landing page at mobile, tablet, and desktop production viewports and exercise both role CTA links.
- [x] Smoke-check the core student and teacher journeys after the final build, including `/siswa/ecomission`, `/siswa/laporan-belajar`, `/guru/monitoring`, and `/guru/laporan`.

## Execution Note

Changes remain in the active redesign branch and are not committed because the repository lacks a clean initial commit boundary.
