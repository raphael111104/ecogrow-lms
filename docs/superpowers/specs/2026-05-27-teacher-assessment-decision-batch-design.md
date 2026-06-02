# Teacher Assessment Decision Batch Design

**Status:** Approved for direct execution through the user's continuing instruction to execute subsequent batches without another approval prompt.

## Goal

Make the teacher assessment page readable as a decision surface: teachers should see assessment modes, student evidence, and follow-up recommendations without parsing broad narrative content.

## Scope

Batch 8 implements roadmap item 11 from `rangkuman-revisi-frontend-ecogrow-lms-design-thinking.md`:

- Align the visible tabs to `Diagnostik`, `Formatif`, `Sumatif`, `Rubrik Kinerja`, and `KAIH`.
- Expand the summary table to show `Nama siswa`, `Kuis Awal`, `Latihan Misi`, `Kuis Akhir`, `KAIH`, `Rekomendasi`, and `Aksi`.
- Use concise recommendation labels: `Perlu Latihan Ulang`, `Siap Tantangan Lanjutan`, `Perlu Pendampingan`, and `Konsisten Baik`.
- Preserve the existing page route and teacher workflow, with mock data only.

This batch does not redesign Modul Ajar or Laporan.

## Design Direction

The interface is a calm evaluation ledger: compact, precise, and strongly scannable. The current green teacher workspace remains, but data becomes more legible through explicit stage-score columns and restrained status chips rather than paragraphs.

## Data And Components

- Extend `AssessmentMatrixItem` with explicit `diagnosticScore`, `missionScore`, and `summativeScore` values used only for the assessment decision table.
- Change `assessmentTabs` labels and ids to match the five required modes.
- Add `teacherAssessmentFollowUps` mock entries for the four visible recommendation labels, count, note, and destination.
- Update `TeacherAssessmentPage` to render the required columns and a small row action.
- Update `AssessmentRecommendationPanel` to render the labelled follow-up summary instead of two generic report sentences.

## Interaction

- Switching tabs continues to update the explanatory assessment-mode note.
- Clicking `Buat Rekomendasi` retains the current success acknowledgement.
- Each table row offers a `Tinjau` path into Monitoring for immediate follow-up.
- Each recommendation bucket offers a targeted mock action link.

## Verification

- Contract tests assert required tab labels, table fields, follow-up labels, and data support.
- Browser review confirms visible tabs, generated acknowledgement, and a follow-up CTA route.
- Desktop and narrow layouts must not introduce horizontal page overflow; the table may retain its internal horizontal scroll on narrow displays.

## Repository Note

The active repository has no clean baseline commit and contains staged prototype files. This batch is implemented and verified inline without automatic staging or committing.
