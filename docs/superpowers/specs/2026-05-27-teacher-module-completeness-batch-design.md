# Teacher Module Completeness Batch Design

**Status:** Approved for direct execution through the user's continuing instruction to execute subsequent roadmap batches without another approval prompt.

## Goal

Make Modul Ajar feel like a complete, readable teaching document: teachers can quickly see what is complete, open the relevant section, and perform common mock document actions.

## Scope

Batch 9 implements roadmap item 12 from `rangkuman-revisi-frontend-ecogrow-lms-design-thinking.md`:

- Replace the short readiness view with a `Kelengkapan Modul` checklist containing the required completion signals.
- Group the module preview into six expandable sections:
  - `Informasi Umum`
  - `Komponen Inti`
  - `Langkah Pembelajaran`
  - `LKPD Digital`
  - `Asesmen`
  - `Refleksi dan Tindak Lanjut`
- Surface the minimum structure required by the roadmap inside those groups, including reflections and remedial/pengayaan.
- Add mock actions `Gunakan Modul`, `Edit Modul`, and `Cetak Modul`.
- Retain the existing `/guru/modul-ajar` route, visual language, and local interaction only.

This batch does not redesign reports or student pages.

## Design Direction

The module page becomes a neatly tabbed field binder: a cream checklist at the left signals document readiness, while the right-hand preview reads like folded pages that teachers open only when needed. The presentation stays operational and restrained rather than becoming a long document wall.

## Data And Components

- Add `teacherModuleCompletenessChecklist` to the existing UX data layer so the visible checklist matches the document requirement without disturbing previous short-dashboard data.
- Keep the page as one focused route component, with a local module-section configuration built from the existing `generatedModuleSeed`.
- Use semantic `<details>`/`<summary>` accordions for keyboard-friendly section expansion.
- Preserve the existing publish acknowledgement while adding the three requested mock actions.

## Interaction

- `Gunakan Modul` stores the current mock selection through an on-page confirmation.
- `Edit Modul` shows that editing mode is prepared.
- `Cetak Modul` shows a mock print confirmation rather than invoking system print.
- Opening each accordion exposes compact content labels, not long uninterrupted text.

## Verification

- Contract tests assert the six accordion labels, seven completeness checklist items, three action labels, and acknowledgement behavior.
- Browser review clicks actions and opens a later accordion section.
- Desktop and narrow viewport checks verify no horizontal page overflow.

## Repository Note

The active repository has no clean baseline commit and contains staged prototype files. This batch is implemented and verified inline without automatic staging or committing.
