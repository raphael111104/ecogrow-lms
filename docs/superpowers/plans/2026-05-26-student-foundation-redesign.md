# Student Foundation Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Tahap 1 of the EcoGrow redesign: a role-aware application shell and a simple student journey centered on today's mission and journal.

**Architecture:** Preserve App Router routes and repository mock access while replacing only the redesigned student feature exports with focused implementations. Add typed UX mock data and small reusable student/shared cards; pages not included in Tahap 1 continue using the existing prototype implementations.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, lucide-react, Node built-in test runner

---

## File Map

- Modify `src/types/ecogrow.ts` with friendly UX status and action-item interfaces.
- Create `src/data/layout-ux.ts` for daily tasks, teacher action items, student journey labels, and teacher message.
- Modify `src/data/index.ts` to export the new mock data.
- Create `src/data/layout-ux.test.mjs` to assert the daily-priority and journey-language contract.
- Modify `src/data/navigation.ts` with short student navigation labels and a reporting target for later phases.
- Modify `src/components/shared/StatusBadge.tsx` to display the friendly status vocabulary.
- Create `src/components/shared/PageHeader.tsx` and `src/components/shared/FriendlyAlert.tsx` for focused page messaging.
- Create `src/components/student/EcoGrowJourneyStepper.tsx`, `StudentGreetingCard.tsx`, `TodayMissionCard.tsx`, `StudentQuickActions.tsx`, `MyPlantCard.tsx`, and `BadgePreview.tsx`.
- Modify `src/components/layout/AppShell.tsx` to give student and teacher shells distinct mobile priorities and header content.
- Replace `src/features/student/dashboard/StudentDashboardPage.tsx` with the focused student dashboard.
- Replace `src/features/student/ecomission/EcoMissionPage.tsx` with the active-step journal workflow.

### Task 1: Typed UX Mock Contract

**Files:**
- Modify: `src/types/ecogrow.ts`
- Create: `src/data/layout-ux.ts`
- Modify: `src/data/index.ts`
- Create: `src/data/layout-ux.test.mjs`

- [x] **Step 1: Write the failing data contract test**

```js
import assert from "node:assert/strict";
import test from "node:test";

let ux = {};
try {
  ux = await import("./layout-ux.ts");
} catch {
  ux = {};
}

test("student priorities stay limited to three clear daily actions", () => {
  assert.ok(Array.isArray(ux.studentTodayTasks));
  assert.ok(ux.studentTodayTasks.length > 0 && ux.studentTodayTasks.length <= 3);
  assert.deepEqual(ux.studentTodayTasks.map((task) => task.title), [
    "Isi Jurnal Tanaman",
    "Belajar Fotosintesis",
    "Ceritakan Belajarmu",
  ]);
});

test("journey steps use friendly student-facing labels", () => {
  assert.deepEqual(ux.studentJourneySteps.map((step) => step.label), [
    "Kenali", "Jelajahi", "Aksi", "Refleksi", "Pamerkan",
  ]);
});
```

- [x] **Step 2: Run the test and confirm the missing data fails**

Run: `node --test --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON src/data/layout-ux.test.mjs`  
Expected: FAIL because `studentTodayTasks` and `studentJourneySteps` are not exported yet.

- [x] **Step 3: Implement types and data**

```ts
export type FriendlyStatus =
  | "not_started"
  | "in_progress"
  | "waiting_feedback"
  | "needs_revision"
  | "completed"
  | "locked";

export interface StudentTodayTask {
  id: string;
  title: string;
  description: string;
  status: FriendlyStatus;
  points: number;
  href: string;
}

export const studentTodayTasks: StudentTodayTask[] = [
  { id: "task-journal", title: "Isi Jurnal Tanaman", description: "Catat tinggi dan kondisi tanaman hari ini.", status: "in_progress", points: 20, href: "/siswa/ecomission" },
  { id: "task-learn", title: "Belajar Fotosintesis", description: "Tonton materi singkat tentang cara tanaman membuat makanan.", status: "not_started", points: 10, href: "/siswa/ecolearn" },
  { id: "task-reflect", title: "Ceritakan Belajarmu", description: "Tulis perasaanmu setelah merawat tanaman.", status: "locked", points: 15, href: "/siswa/cerita-belajarku" },
];
```

- [x] **Step 4: Run the data test and typecheck**

Run: `node --test --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON src/data/layout-ux.test.mjs`  
Expected: PASS with 2 passing tests.  
Run: `npm run typecheck`  
Expected: exit code 0.

### Task 2: Navigation and Student Shared Components

**Files:**
- Modify: `src/data/navigation.ts`
- Modify: `src/components/shared/StatusBadge.tsx`
- Create: `src/components/shared/PageHeader.tsx`
- Create: `src/components/shared/FriendlyAlert.tsx`
- Create: `src/components/student/EcoGrowJourneyStepper.tsx`
- Create: `src/components/student/StudentGreetingCard.tsx`
- Create: `src/components/student/TodayMissionCard.tsx`
- Create: `src/components/student/StudentQuickActions.tsx`
- Create: `src/components/student/MyPlantCard.tsx`
- Create: `src/components/student/BadgePreview.tsx`

- [x] **Step 1: Apply the student navigation vocabulary**

```ts
export const siswaNavigation = [
  { label: "Beranda", href: "/siswa", icon: Home },
  { label: "Misi", href: "/siswa/ecomission", icon: Sprout },
  { label: "Belajar", href: "/siswa/ecolearn", icon: BookOpen },
  { label: "Bermain", href: "/siswa/ecoplay", icon: Gamepad2 },
  { label: "Cerita", href: "/siswa/cerita-belajarku", icon: Leaf },
  { label: "Galeri", href: "/siswa/galeri", icon: Camera },
  { label: "Portofolio", href: "/siswa/portofolio", icon: ClipboardList },
  { label: "Kuis Akhir", href: "/siswa/ecomaster-quiz", icon: Trophy },
  { label: "Tantangan Rumah", href: "/siswa/ecochallenge", icon: Users },
  { label: "Panen", href: "/siswa/ecomart", icon: ShoppingBasket },
];
```

- [x] **Step 2: Implement the reusable visual cards**

```tsx
export function EcoGrowJourneyStepper({ activeStage }: { activeStage: PancanitiStage }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-5">
      {studentJourneySteps.map((step) => (
        <li key={step.stage} aria-current={step.stage === activeStage ? "step" : undefined}>
          <p className="font-heading font-black">{step.label}</p>
          <p className="text-xs">{step.localTerm}</p>
        </li>
      ))}
    </ol>
  );
}
```

Implement the remaining components with these exact public props and outputs:

```tsx
export function StudentGreetingCard({ user, profile }: { user: User; profile: StudentProfile }) {
  return <EcoCard><h1>Halo, {user.name}. Siap merawat bumi hari ini?</h1><p>Kelas 4B - {profile.groupName}</p><strong>{profile.points} EcoPoint</strong></EcoCard>;
}

export function TodayMissionCard({ mission, project }: { mission: EcoMission; project: EcoProject }) {
  return <EcoCard><p>Misi Hari Ini</p><h2>{project.title}</h2><EcoProgress value={project.progress} label="Perjalanan misimu" /><EcoButton href="/siswa/ecomission">Lanjutkan Misi</EcoButton></EcoCard>;
}

export function StudentQuickActions() {
  return <div>{studentTodayTasks.slice(0, 3).map((task) => <Link key={task.id} href={task.href}>{task.title}</Link>)}</div>;
}

export function MyPlantCard({ journal }: { journal?: JournalEntry }) {
  return <EcoCard><h2>Tanamanku</h2><p>{journal ? `${journal.plantHeightCm} cm` : "Belum ada catatan"}</p><EcoButton href="/siswa/ecomission">Catat Perkembangan</EcoButton></EcoCard>;
}

export function BadgePreview({ badges }: { badges: Badge[] }) {
  return <EcoCard><h2>Hadiah Badge</h2>{badges.slice(0, 3).map((badge) => <p key={badge.id}>{badge.name}</p>)}</EcoCard>;
}
```

- [x] **Step 3: Extend friendly status labels**

```ts
in_progress: { label: "Sedang dikerjakan", tone: "info", icon: <Clock className="size-3.5" /> },
not_started: { label: "Belum mulai", tone: "neutral", icon: <Circle className="size-3.5" /> },
waiting_feedback: { label: "Menunggu Bu Guru", tone: "warning", icon: <Clock className="size-3.5" /> },
```

- [x] **Step 4: Typecheck the component contract**

Run: `npm run typecheck`  
Expected: exit code 0.

### Task 3: Role-Aware Shell

**Files:**
- Modify: `src/components/layout/AppShell.tsx`

- [x] **Step 1: Update role-specific navigation priorities and labels**

```ts
const mobilePrimaryHrefs = isTeacher
  ? ["/guru", "/guru/modul-ajar", "/guru/monitoring", "/guru/asesmen"]
  : ["/siswa", "/siswa/ecomission", "/siswa/ecolearn", "/siswa/ecoplay"];
const searchPlaceholder = isTeacher
  ? "Cari modul, jurnal, proyek, atau siswa"
  : "Cari misi atau materi belajar";
```

- [x] **Step 2: Render student-specific progress in header/sidebar**

Use `studentShell.profile.points`, `studentShell.profile.level`, and `studentShell.badges.length` for the student shell. Keep teacher class selection and operational copy unchanged except for concise navigation wording.

- [x] **Step 3: Typecheck shell changes**

Run: `npm run typecheck`  
Expected: exit code 0.

### Task 4: Focused Student Dashboard

**Files:**
- Modify: `src/features/student/dashboard/StudentDashboardPage.tsx`

- [x] **Step 1: Replace the prototype re-export with page composition**

```tsx
export function StudentDashboardPage() {
  const dashboard = getStudentDashboardMock();
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <StudentGreetingCard user={dashboard.user} profile={dashboard.profile} />
      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <TodayMissionCard mission={dashboard.activeMission} project={dashboard.activeProject} />
        <MyPlantCard journal={dashboard.latestJournal} />
      </div>
      <EcoGrowJourneyStepper activeStage={dashboard.activeMission.stage} />
      <StudentQuickActions />
      <BadgePreview badges={dashboard.badges.slice(0, 3)} />
    </div>
  );
}
```

- [x] **Step 2: Confirm the dashboard compiles**

Run: `npm run typecheck`  
Expected: exit code 0.

### Task 5: Focused EcoMission Journal Flow

**Files:**
- Modify: `src/features/student/ecomission/EcoMissionPage.tsx`

- [x] **Step 1: Implement a single-active-stage client page**

```tsx
"use client";

export function EcoMissionPage() {
  const mission = getStudentMissionMock();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ height: "29", condition: "sehat", note: "", photoUrl: "" });
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader title="Rawat Tanaman Kangkungmu" actionLabel="Simpan Jurnal" />
      <EcoGrowJourneyStepper activeStage={mission.activeMission.stage} />
      <section aria-label="Tahap Aksi">{mission.activeMission.tasks.map((task) => <p key={task}>{task}</p>)}</section>
      <form onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
        <input aria-label="Tinggi tanaman" value={form.height} />
        <button type="submit">Simpan Jurnal</button>
      </form>
      {saved ? <FriendlyAlert tone="success" title="Hebat, jurnal hari ini sudah tersimpan." /> : null}
    </div>
  );
}
```

The completed form fields are `height` (`type="number"`), `condition` (`select` with `sehat`, `layu`, and `kuning`), `note` (`textarea` with maximum 140 characters), and `photoUrl` (`input` controlling `MockUploadBox`). The bottom bar contains `<EcoButton type="submit">Simpan Jurnal</EcoButton>` and `<EcoButton variant="secondary">Tanya Guru</EcoButton>`, styled `sticky bottom-20 lg:static`.

- [x] **Step 2: Confirm the mission page compiles**

Run: `npm run typecheck`  
Expected: exit code 0.

### Task 6: Stage Verification

**Files:**
- Verify all files changed in Tasks 1-5.

- [x] **Step 1: Run automated verification**

Run: `node --test --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON src/data/layout-ux.test.mjs`  
Expected: 2 tests pass, 0 fail.  
Run: `npm run typecheck`  
Expected: exit code 0.  
Run: `npm run build`  
Expected: production build exits with code 0.

- [x] **Step 2: Browser-check responsive paths**

Open `/siswa` and `/siswa/ecomission` in desktop and mobile viewports. Verify navigation labels, one dominant CTA, five-stage journey, journal success alert, and no clipped sticky controls.

## Execution Note

This repository has no baseline commit and already contains staged project files. Execute inline in the active workspace and do not create commits or stage additional changes as part of Tahap 1 unless the user explicitly requests repository preparation.
