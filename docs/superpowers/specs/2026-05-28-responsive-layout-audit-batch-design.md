# Responsive Layout Audit Batch Design

**Status:** Approved for direct implementation through the user's continuing roadmap instruction on 2026-05-28.

## Goal
Complete roadmap item 16 by auditing the full frontend after feature batches were added, ensuring desktop, tablet, and mobile layouts remain usable without horizontal page overflow.

## Responsive Contract
- Mobile uses one-column content flow with bottom navigation and enough page padding so fixed navigation does not cover final content.
- Tablet keeps compact page navigation and allows two-column sections where space permits.
- Desktop restores the side navigation for role shells and keeps dense teacher pages inside constrained two- or three-column layouts.
- Wide data surfaces such as assessment tables and learning tabs may scroll inside their own container, but must not create document-level horizontal overflow.

## Audit Scope
- Public: landing, login, register.
- Student: dashboard, mission, learn, play, story, album, gallery, quiz, report, challenge, harvest, readiness.
- Teacher: dashboard, module, monitoring, assessment, gallery, report, analytics, guide, project.

## Browser Breakpoints
- Mobile: `390 x 844`
- Tablet: `768 x 1024`
- Desktop: `1280 x 720`

## Verification
- Browser audit checks `documentElement.scrollWidth - clientWidth`, visible mobile navigation, and desktop sidebar visibility.
- Contract test guards the key source patterns that make the audit pass.
- Existing contract tests, typecheck, and production build remain green.
