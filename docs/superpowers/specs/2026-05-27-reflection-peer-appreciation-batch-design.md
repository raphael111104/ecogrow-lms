# Reflection Peer Appreciation Batch Design

**Date:** 2026-05-27  
**Status:** Approved for direct execution through the user's instruction to continue subsequent batches without another approval prompt.

## Goal

Refine `Cerita Belajarku` into a warm garden-journal reflection experience where a student can express a feeling, tell a short story, choose a small ecological promise, and appreciate a classmate before continuing to their portfolio.

## Design Direction

Keep the established EcoGrow visual language: soft leaf colors, cream paper-like cards, rounded controls, and reassuring child-friendly wording. This batch should feel like adding a meaningful page to a garden diary, not introducing a separate assessment workflow.

## Scope

- Retain the existing visual `MoodPicker`.
- Align guided questions to the four prompts in the revision summary.
- Expand `Janji Hijauku` to the four recommended everyday actions.
- Add a simple `Apresiasi Teman` interaction with friend selection and a one-sentence thank-you message.
- Present previous stories as a small vertical timeline.
- Preserve the completion-gated `NextSuggestedActionCard` that sends the student to the portfolio.

## Interaction Notes

- The appreciation interaction remains front-end mock state; this batch introduces no persistence or backend schema.
- The save action remains easy and non-judgmental. Appreciation is encouraged through the UI without turning reflection into a blocking assessment.
- Saved feedback mentions the selected promise and selected friend so the child can see their appreciation was included.

## Acceptance Criteria

- Reflection prompts use simple, forward-looking language.
- Mood selection remains visual.
- Four ecological promise choices are visible.
- A student can select a friend and type one appreciation sentence.
- Story history reads visually as a timeline.
- The portfolio next action remains available after saving.

