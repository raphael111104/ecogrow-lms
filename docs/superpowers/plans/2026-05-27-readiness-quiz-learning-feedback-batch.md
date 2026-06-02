# Readiness And Quiz Learning Feedback Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengubah EcoReadiness menjadi wizard ramah siswa dan memperkuat feedback langsung serta langkah lanjut pada EcoMaster Quiz.

**Architecture:** `EcoReadinessPage` mengelompokkan delapan pertanyaan data yang sudah ada menjadi empat layar lokal, menyimpan jawaban dalam state, lalu memakai penyimpanan hasil yang sudah tersedia. `EcoMasterAssessmentPage` mempertahankan alur satu-soal-per-layar, menambahkan state penguncian jawaban per soal dan ringkasan tujuan lanjut tanpa mengubah sumber data maupun utilitas skor.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Tailwind CSS, lucide-react, Node built-in test runner, browser verification pada localhost.

---

## File Structure

- Create: `src/features/student/StudentLearningFeedback.contract.test.mjs` untuk mengunci kontrak wizard, feedback, dan CTA langkah lanjut.
- Modify: `src/features/student/readiness/EcoReadinessPage.tsx` untuk wizard empat layar dan profil hasil yang ramah siswa.
- Modify: `src/features/student/quiz/EcoMasterAssessmentPage.tsx` untuk penguncian jawaban, EcoPoint feedback, dan CTA laporan.
- Verify: `src/data/ecogrow-assessments.ts` dan `src/lib/ecogrow-assessment-utils.ts` tetap menjadi sumber data/perhitungan tanpa perubahan API.

### Task 1: Contract Tests For Batch 2

**Files:**
- Create: `src/features/student/StudentLearningFeedback.contract.test.mjs`

- [x] **Step 1: Write failing contract tests**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readinessSource = await readFile(new URL("./readiness/EcoReadinessPage.tsx", import.meta.url), "utf8");
const quizSource = await readFile(new URL("./quiz/EcoMasterAssessmentPage.tsx", import.meta.url), "utf8");

test("EcoReadiness uses a four-screen friendly quiz wizard", () => {
  assert.match(readinessSource, /readinessSteps/);
  assert.match(readinessSource, /Kuis Awal/);
  assert.match(readinessSource, /Yang sudah kutahu/);
  assert.match(readinessSource, /Profil Belajarku/);
  assert.match(readinessSource, /Lihat Profilku/);
});

test("EcoReadiness result points children to learning and mission actions", () => {
  assert.match(readinessSource, /Mulai Belajar/);
  assert.match(readinessSource, /Lanjut ke Misi/);
  assert.match(readinessSource, /currentQuestions/);
});

test("EcoMaster locks answers and rewards immediate learning feedback", () => {
  assert.match(quizSource, /lockedAnswers/);
  assert.match(quizSource, /EcoPoint/);
  assert.match(quizSource, /disabled=\{Boolean\\(answer\\)\\}/);
});

test("EcoMaster summary links to the learning report", () => {
  assert.match(quizSource, /Lihat Laporan Belajar/);
  assert.match(quizSource, /\\/siswa\\/laporan-belajar/);
});
```

- [x] **Step 2: Run contract tests and confirm RED**

Run: `node --test src/features/student/StudentLearningFeedback.contract.test.mjs`

Expected: `FAIL` because the readiness page still renders its full grid, and quiz feedback has no locked-answer state, EcoPoint copy, or learning-report CTA.

### Task 2: EcoReadiness Friendly Wizard

**Files:**
- Modify: `src/features/student/readiness/EcoReadinessPage.tsx`
- Test: `src/features/student/StudentLearningFeedback.contract.test.mjs`

- [x] **Step 1: Define the four-screen wizard and step state**

Add a local step model with explicit question ids:

```tsx
const readinessSteps: Array<{ title: string; description: string; questionIds: string[] }> = [
  { title: "Yang sudah kutahu", description: "Ceritakan hal yang sudah kamu kenal tentang tanaman.", questionIds: ["diag-1", "diag-2"] },
  { title: "Hal yang ingin kujelajahi", description: "Pilih hal yang membuatmu penasaran dalam petualangan ini.", questionIds: ["diag-3", "diag-4"] },
  { title: "Cara belajar dan menjaga alam", description: "Temukan cara belajar dan sikap merawat yang cocok untukmu.", questionIds: ["diag-5", "diag-6"] },
  { title: "Mengamati dan bekerja bersama", description: "Siapkan dirimu mencatat perubahan dan bekerja dalam tim.", questionIds: ["diag-7", "diag-8"] },
];

const [step, setStep] = useState(0);
const currentStep = readinessSteps[step];
const currentQuestions = ecoReadinessQuestions.filter((question) =>
  currentStep.questionIds.includes(question.id),
);
const stepComplete = currentQuestions.every((question) => Boolean(answers[question.id]));
```

- [x] **Step 2: Replace the formal full-grid view with the wizard UI**

Render `Kuis Awal`, progress `Langkah {step + 1} dari {readinessSteps.length}`, only `currentQuestions`, a back action when `step > 0`, and a primary action:

```tsx
<EcoButton
  variant="reward"
  disabled={!stepComplete}
  onClick={step === readinessSteps.length - 1 ? submit : () => setStep((current) => current + 1)}
>
  {step === readinessSteps.length - 1 ? "Lihat Profilku" : "Lanjut"}
</EcoButton>
```

- [x] **Step 3: Present the saved result as a friendly profile**

When `result` exists, replace the question UI with a profile card containing `Profil Belajarku`, a sentence using `result.learningStyle` and `result.interest`, recommendation text, and these CTAs:

```tsx
<EcoButton href="/siswa/ecolearn" icon={<ArrowRight className="size-4" />}>Mulai Belajar</EcoButton>
<EcoButton href="/siswa/ecomission" variant="secondary">Lanjut ke Misi</EcoButton>
```

- [x] **Step 4: Run the contract test for readiness progress**

Run: `node --test src/features/student/StudentLearningFeedback.contract.test.mjs`

Expected: readiness assertions pass; EcoMaster assertions remain failing until Task 3 is implemented.

### Task 3: EcoMaster Immediate Feedback And Next Action

**Files:**
- Modify: `src/features/student/quiz/EcoMasterAssessmentPage.tsx`
- Test: `src/features/student/StudentLearningFeedback.contract.test.mjs`

- [x] **Step 1: Introduce locked answers without changing scoring**

Track locked choices separately, clear it on restart, and prevent reselection after the first answer:

```tsx
const [lockedAnswers, setLockedAnswers] = useState<Record<string, boolean>>({});

const chooseAnswer = (option: string) => {
  if (answer || lockedAnswers[question.id]) return;
  setAnswers((current) => ({ ...current, [question.id]: option }));
  setLockedAnswers((current) => ({ ...current, [question.id]: true }));
};
```

Each option uses `onClick={() => chooseAnswer(option)}` and `disabled={Boolean(answer)}`.

- [x] **Step 2: Expand per-answer feedback**

For a correct selection, render a success alert whose description includes the question explanation and `+{question.points} EcoPoint`. For an incorrect selection, render a supportive warning alert using `question.explanation` and `question.remedialHint` when present.

- [x] **Step 3: Add learning-report navigation to result actions**

Keep the conditional learning/challenge CTA and restart action, and add:

```tsx
<EcoButton href="/siswa/laporan-belajar" variant="secondary">
  Lihat Laporan Belajar
</EcoButton>
```

- [x] **Step 4: Run Batch 2 contract tests**

Run: `node --test src/features/student/StudentLearningFeedback.contract.test.mjs`

Expected: all four Batch 2 contract tests pass.

### Task 4: Regression And Production Verification

**Files:**
- Verify: `src/features/student/readiness/EcoReadinessPage.tsx`
- Verify: `src/features/student/quiz/EcoMasterAssessmentPage.tsx`
- Verify: `src/features/student/StudentLearningFeedback.contract.test.mjs`

- [x] **Step 1: Run relevant automated tests**

Run: `node --test src/features/student/StudentLearningFeedback.contract.test.mjs src/components/layout/StudentNavigation.contract.test.mjs src/components/layout/AppShell.contract.test.mjs src/components/landing/HeroSection.contract.test.mjs && node --test --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON src/data/layout-ux.test.mjs`

Expected: all Batch 2 and existing UI contract tests pass with zero failures.

- [x] **Step 2: Run typecheck and build**

Run: `npm run typecheck`

Expected: exits with code `0`.

Run: `npm run build`

Expected: Next.js completes a production build including `/siswa/ecoreadiness` and `/siswa/ecomaster-quiz`.

- [x] **Step 3: Verify EcoReadiness in the browser**

At desktop and mobile widths, open `/siswa/ecoreadiness`, confirm only two question cards appear on each screen, navigate through all four screens, and verify `Profil Belajarku` exposes `Mulai Belajar` and `Lanjut ke Misi`.

- [x] **Step 4: Verify EcoMaster Quiz in the browser**

At desktop and mobile widths, open `/siswa/ecomaster-quiz`, select an answer, confirm immediate feedback and disabled answer choices, complete the visible quiz flow, and confirm `Lihat Laporan Belajar` is present on the result view.

## Execution Note

Plan dijalankan inline pada workspace aktif sesuai permintaan eksekusi bertahap pengguna. Repository belum memiliki baseline commit yang bersih dan berisi file staged dari pekerjaan awal, sehingga Batch 2 diverifikasi tanpa staging atau commit otomatis.
