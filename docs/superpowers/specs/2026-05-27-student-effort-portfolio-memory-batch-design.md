# Student Effort And Portfolio Memory Batch Design

**Date:** 2026-05-27  
**Status:** Approved for direct execution through the user's instruction to continue subsequent batches without another approval prompt.

## Goal

Complete the student self-reflection loop by letting children mark simple efforts in friendly language, then see the saved story, promise, appreciation, and efforts collected inside their portfolio album.

## Design Direction

The portfolio stays an organic, warm "album perkembangan", with cream note cards and small celebratory details rather than score-heavy dashboards. `Cek Usahaku` is framed as remembering good actions, never as formal self-assessment.

## Scope

- Create a reusable `EffortCheckCard` labelled `Cek Usahaku` with four child-friendly checklist actions.
- Show the card inside `Cerita Belajarku` before saving a reflection.
- Show the card after a successful `EcoMission` journal submission so the child can pause and recognise their effort.
- Store the completed reflection snapshot in existing local mock storage when the story is saved.
- Add story and effort/apresiasi sections to `PortfolioPage`, reading the saved local snapshot when available.

## Data Flow

- A new lightweight `StudentReflectionMemory` interface describes saved local state: mood, lesson, promise, friend appreciation, selected efforts, and a saved label.
- `ReflectionPage` writes one latest snapshot to the key `ecoGrow-reflection-memory`.
- `PortfolioPage` reads that snapshot through `useMockStorage`; with no saved snapshot, it presents gentle empty-state guidance and existing album content.
- `EcoMissionPage` provides its post-submit checklist locally only; reflection remains the intentional save point for portfolio memory.

## Acceptance Criteria

- Student-facing UI uses `Cek Usahaku`, not academic assessment terminology.
- Four selectable effort statements are available in reflection and post-mission context.
- Saving a reflection records effort and appreciation data through mock storage.
- Portfolio includes a story card and effort/apresiasi card without a complex table.
- Existing album photos, best works, teacher feedback, and next quiz action remain available.

