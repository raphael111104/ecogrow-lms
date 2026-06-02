# Student Friendly Terminology Batch Design

**Status:** Approved for direct implementation through the user's continuing roadmap instruction, continued on 2026-05-28.

## Goal

Apply the roadmap terminology guide across visible student surfaces so children encounter clear, action-oriented Indonesian language throughout their learning journey.

## Design Direction

Keep the established garden-journal interface and revise its voice: warm, active, and concrete. Technical stage terms such as `Niti Bukti` may remain only as small companion labels in the existing journey guide; headlines, buttons, alerts, and navigation should lead with the child-friendly action.

## Terminology Contract

- Journey labels become `Kenali Alam`, `Jelajahi Masalah`, `Lakukan Aksi`, `Cerita dan Renungan`, and `Pamerkan Karya`.
- Student navigation and report links refer to `Album Belajarku`, not `Portofolio`.
- The story page uses `Cerita Hari Ini` and `Jejak Ceritaku`, not `Refleksi` or `Timeline`.
- Student mission and exhibition headings lead with `Lakukan Aksi` and `Pamerkan Karya`, without a standalone technical-stage badge.
- Student recommendations use `Latihan Ulang`, `Tantangan Lanjutan`, and `Album Belajarku`.
- Visible practice UI uses Indonesian learner-facing copy: `Tantangan`, `Pesan Guru`, `Hadiah`, `Pratinjau`, and `cerita`, rather than `challenge`, `feedback`, `reward`, `preview`, `mock`, or `refleksi`.

## Scope

- Modify only active student routes, their shared visible helpers, and student mock data rendered by those pages.
- Keep teacher-facing terminology, internal type names, state keys, route paths, and domain-model identifiers unchanged.
- Preserve product feature names such as `EcoPoint`, `EcoPlay`, and `EcoChallenge` where they serve as branded names rather than instructional jargon.

## Verification

- Add a source contract that fails against the currently visible legacy terms and passes only once the child-friendly copy is present.
- Run existing student/teacher contract tests, layout tests, TypeScript checks, and a production build.
- Inspect key student routes in the in-app browser at desktop and mobile widths for visible language and layout overflow.
