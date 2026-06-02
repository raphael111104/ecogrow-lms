# Teacher Daily Review Batch Design

**Status:** Approved for direct execution through the user's continuing instruction to execute subsequent batches without another approval prompt.

## Goal

Turn the teacher landing-to-review flow into a faster daily work path: urgent tasks are immediately visible on the dashboard and journal feedback can be sent using concise classroom-ready templates.

## Scope

Batch 7 covers roadmap items 9 and 10 from `rangkuman-revisi-frontend-ecogrow-lms-design-thinking.md`:

- Strengthen `/guru` without replacing its current structure.
- Make `Yang harus ditangani hari ini` the first operational content beneath the header.
- Expose clear shortcuts for journal review, assessment follow-up, and gallery moderation.
- Add compact status filters and quick feedback templates to `/guru/monitoring`.
- Keep this a frontend mock interaction using existing submission data and route structure.

This batch does not alter Asesmen or Modul Ajar content; those remain separate next batches.

## Design Direction

The teacher experience is an orderly morning workbench: quieter than the student celebration pages, dense enough to scan, and driven by decisions rather than decoration. The existing green-and-cream system remains, with the urgent review panel placed above descriptive metrics.

## Interaction Design

### Dashboard

`ActionNeededPanel` appears directly after the page header, paired with the existing active project card. It states `Yang harus ditangani hari ini`, retains the concise priority list, and adds explicit CTAs:

- `Tinjau Jurnal`
- `Lihat Asesmen`
- `Moderasi Galeri`

The four overview metrics remain available immediately below, preserving context while preventing them from competing with urgent actions.

### Monitoring

The current review/detail layout stays intact. The filter select becomes a scannable set of four buttons:

- `Semua`
- `Menunggu Review`
- `Perlu Revisi`
- `Selesai`

Within the selected detail panel, `Template Umpan Balik Cepat` shows four short message buttons. Clicking one fills the feedback textarea; clicking `Kirim Feedback` confirms delivery. This lets a teacher send a useful response in two clicks after a journal is selected.

## Verification

- A contract test verifies dashboard hierarchy and named action shortcuts.
- A contract test verifies status filter labels and the four quick feedback template messages.
- Browser review exercises `/guru`, template selection and feedback submission on `/guru/monitoring`, plus a narrow viewport overflow check.
- TypeScript and production build must continue to pass.

## Repository Note

The active repository has no clean baseline commit and contains staged files from the broader prototype work. This batch is implemented and verified inline without automatic staging or committing.
