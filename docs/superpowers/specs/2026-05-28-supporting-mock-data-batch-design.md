# Supporting Mock Data Batch Design

**Status:** Approved for direct implementation through the user's continuing roadmap instruction on 2026-05-28.

## Goal
Complete roadmap item 15 by adding and wiring supporting mock data so active student and teacher pages feel richer, consistent, and easier to maintain without adding backend behavior.

## Data Contract
- `studentLearningFlow` describes the child-facing learning path from `Kuis Awal` to `Cerita Belajarku`, with route, status, and short helper text.
- `quizFeedback` centralizes correct and incorrect EcoMaster messages so the quiz does not hardcode generic feedback copy.
- `teacherQuickFeedbackTemplates` centralizes teacher monitoring quick feedback messages and keeps at least five actionable templates.
- `ecoExhibitionItems` summarizes exhibition candidates with student name, work type, review status, and badge candidate.

## UX Direction
Keep the interface light. Use new data as small supporting context inside existing surfaces:
- Dashboard quick actions show a compact learning-flow reminder.
- EcoMaster uses reusable feedback phrases alongside question-specific explanations.
- Monitoring Guru uses the shared quick-feedback templates.
- Galeri Guru shows exhibition candidate metadata beside the selected work.

## Scope
- Frontend and mock data only.
- No backend, admin role, new routes, or architecture changes.
- Preserve existing local storage keys and route paths.

## Verification
- RED/GREEN contract for data exports and active-page wiring.
- Existing relevant contract tests.
- Typecheck, production build, and browser smoke check.
