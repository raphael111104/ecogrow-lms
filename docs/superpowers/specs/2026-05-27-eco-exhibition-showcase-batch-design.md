# Eco-Exhibition Showcase Batch Design

**Date:** 2026-05-27  
**Status:** Approved for direct execution through the user's instruction to continue subsequent batches without another approval prompt.

## Goal

Make Eco-Exhibition feel like the celebratory final stage of the EcoGrow journey: students can see that their work reaches a class showcase, and teachers can curate and publish featured work using a clear mock workflow.

## Design Direction

Use a "panggung panen kelas" direction: dark leafy presentation panels, harvest-gold achievement markers, framed artwork, and short affirming copy. The tone stays child-friendly on the student side and becomes concise and operational on the teacher side.

## Scope

- Replace the prototype re-export for the student gallery with a focused Eco-Exhibition showcase page.
- Replace the teacher gallery wrapper with a focused curation page that uses local mock moderation state.
- Share the existing `galleryPosts` dataset through one local exhibition storage key rather than creating a backend or new route.
- Add a compact Eco-Exhibition celebration card on Portofolio with a clear route into the gallery.

## Student Experience

- The gallery opens with a final-stage celebration and a `Lulus Misi Ekologis` achievement marker.
- Approved/featured works appear as the class showcase.
- A student's own submitted/published work is acknowledged, and a mock submission action communicates that teacher review is part of the exhibit process.

## Teacher Experience

- The teacher sees counts for incoming works, pending review, and published highlights.
- Selecting a work reveals its detail and moderation status.
- `Publikasikan ke Galeri` approves and features the selected work locally.
- Published work carries a `Lulus Misi Ekologis` status and the page includes a brief pameran rubric summary.

## Acceptance Criteria

- Eco-Exhibition reads as a final achievement, not an ordinary gallery.
- Student and teacher gallery pages use focused feature implementations rather than prototype exports.
- Teachers can perform a visible mock publish action.
- Portofolio visibly links to the Eco-Exhibition destination.
- No new route, backend, admin role, or complex reporting surface is introduced.

