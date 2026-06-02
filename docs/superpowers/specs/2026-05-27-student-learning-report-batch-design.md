# Student Learning Report Batch Design

**Status:** Approved for direct implementation through the user's continuing roadmap instruction on 2026-05-27.

## Goal

Strengthen `/siswa/laporan-belajar` into a friendly closing page where a child can see what they have completed, what they understand, encouragement from the teacher, and one clear next step.

## Design Direction

The page becomes a warm "lembar perjalanan kebun": celebratory rather than numerical, with an organic green-and-cream palette already used throughout the student experience. A simple journey strip provides orientation, while compact story cards keep the report readable on small screens.

## Required Surface

- Retain the title `Capaian Belajarku`.
- Use the requested section language: `Misi yang Sudah Selesai`, `Badge yang Kudapat`, `Hal yang Sudah Kupahami`, `Hal yang Perlu Kulatih Lagi`, and `Pesan Guru`.
- Replace the prominently displayed numeric score with child-friendly encouragement and a visible five-step learning journey.
- Add mock document actions `Cetak Laporan` and `Unduh Laporan` with friendly confirmations.
- Add a follow-up recommendation using the shared `NextSuggestedActionCard`.
- Make `Laporan Belajar` discoverable in the student secondary navigation.

## Data And Components

- Extend `StudentLearningReport` with a celebration message, completed journey count, and a recommended next-action object.
- Populate those values in `src/data/layout-ux.ts` and remove the student-facing score value from this report model.
- Keep `StudentLearningReportPage` focused on composition and local action confirmation state; reuse `FriendlyAlert`, `NextSuggestedActionCard`, and `studentJourneySteps`.

## Out Of Scope

- Teacher report changes.
- Persisted exports or real print/download handling.
- Altering quiz scoring, badges, or server data.

## Verification

- A source contract first fails for the absent child-friendly labels, actions, recommendation, navigation entry, and remaining score display; it passes after implementation.
- Existing contracts, typecheck, and production build continue to pass.
- Browser review confirms both mock actions, the recommendation, and responsive layout without horizontal overflow.
