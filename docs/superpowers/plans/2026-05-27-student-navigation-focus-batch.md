# Student Navigation And Focus Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menyederhanakan navigasi ruang siswa melalui kelompok `Lainnya` dan memastikan `Misi Hari Ini` menjadi fokus aksi utama pada dashboard.

**Architecture:** Semua route siswa tetap berada pada data navigasi, dengan ekspor baru yang membedakan item utama, tambahan, dan bottom navigation mobile. `AppShell` memakai kelompok tersebut hanya untuk role siswa, sedangkan teacher shell tetap menggunakan alur operasional yang sudah ada. Dashboard hanya memperoleh penguatan hierarki pada kartu misi agar lingkup batch tetap kecil.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, lucide-react, Node built-in test runner.

---

## File Structure

- Create: `src/components/layout/StudentNavigation.contract.test.mjs` untuk mengunci pembagian menu dan kontrol `Lainnya`.
- Modify: `src/data/navigation.ts` sebagai satu sumber konfigurasi route siswa utama/tambahan/mobile.
- Modify: `src/components/layout/AppShell.tsx` untuk sidebar siswa berkelompok dan bottom navigation mobile lima item.
- Modify: `src/components/student/TodayMissionCard.tsx` untuk menegaskan CTA primer misi hari ini.

### Task 1: Student Navigation Contract

**Files:**
- Create: `src/components/layout/StudentNavigation.contract.test.mjs`

- [x] **Step 1: Write failing source/data contract tests**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const navigationSource = await readFile(new URL("../../data/navigation.ts", import.meta.url), "utf8");
const shellSource = await readFile(new URL("./AppShell.tsx", import.meta.url), "utf8");
const missionSource = await readFile(new URL("../student/TodayMissionCard.tsx", import.meta.url), "utf8");

test("student menu separates primary routes from secondary routes", () => {
  assert.match(navigationSource, /siswaPrimaryNavigation/);
  assert.match(navigationSource, /siswaSecondaryNavigation/);
  assert.match(navigationSource, /siswaMobileNavigation/);
  assert.match(navigationSource, /label:\s*"Lainnya"/);
});

test("student shell renders an accessible more menu and five mobile targets", () => {
  assert.match(shellSource, /studentMoreOpen/);
  assert.match(shellSource, /aria-label="Lainnya"/);
  assert.match(shellSource, /grid-cols-5/);
  assert.match(shellSource, /siswaSecondaryNavigation/);
});

test("student mission keeps a visibly dominant continue action", () => {
  assert.match(missionSource, /Lanjutkan Misi/);
  assert.match(missionSource, /variant="reward"/);
  assert.match(missionSource, /fullWidth/);
});
```

- [x] **Step 2: Run tests to confirm the old navigation fails**

Run: `node --test src/components/layout/StudentNavigation.contract.test.mjs`

Expected: `FAIL` because the current code has one flat student navigation array, no `Lainnya` item, and a four-column mobile bar.

### Task 2: Navigation Data Groups

**Files:**
- Modify: `src/data/navigation.ts`

- [x] **Step 1: Add student navigation groups while retaining the complete route list**

```ts
import { MoreHorizontal } from "lucide-react";

export const siswaPrimaryNavigation = [
  { label: "Beranda", href: "/siswa", icon: Home },
  { label: "Misi", href: "/siswa/ecomission", icon: Sprout },
  { label: "Belajar", href: "/siswa/ecolearn", icon: BookOpen },
  { label: "Bermain", href: "/siswa/ecoplay", icon: Gamepad2 },
  { label: "Cerita", href: "/siswa/cerita-belajarku", icon: Leaf },
  { label: "Portofolio", href: "/siswa/portofolio", icon: ClipboardList },
];

export const siswaSecondaryNavigation = [
  { label: "Galeri", href: "/siswa/galeri", icon: Camera },
  { label: "Kuis Akhir", href: "/siswa/ecomaster-quiz", icon: Trophy },
  { label: "Tantangan Rumah", href: "/siswa/ecochallenge", icon: Users },
  { label: "Panen", href: "/siswa/ecomart", icon: ShoppingBasket },
];

export const siswaNavigation = [...siswaPrimaryNavigation, ...siswaSecondaryNavigation];
export const siswaMobileNavigation = [
  ...siswaPrimaryNavigation.slice(0, 4),
  { label: "Lainnya", href: "#siswa-lainnya", icon: MoreHorizontal },
];
```

- [x] **Step 2: Run typecheck after configuring data**

Run: `npm run typecheck`

Expected: exits with code `0`.

### Task 3: Role-Aware `Lainnya` Navigation

**Files:**
- Modify: `src/components/layout/AppShell.tsx`

- [x] **Step 1: Import student group data and track the additional-menu state**

```tsx
import { siswaMobileNavigation, siswaPrimaryNavigation, siswaSecondaryNavigation } from "@/data/navigation";

const [studentMoreOpen, setStudentMoreOpen] = useState(false);
const isStudentSecondaryActive = !isTeacher && siswaSecondaryNavigation.some((item) => pathname === item.href);
const desktopNavItems = isTeacher ? navItems : siswaPrimaryNavigation;
const mobileNavItems = isTeacher ? /* existing teacher links */ : siswaMobileNavigation;
```

- [x] **Step 2: Render primary desktop links plus an accessible student secondary disclosure**

For students, render the primary six links, then a button labelled `Lainnya` with `aria-expanded={studentMoreOpen || isStudentSecondaryActive}`. When expanded or on a secondary route, show the four `siswaSecondaryNavigation` links and preserve active highlighting. Teacher rendering stays flat.

- [x] **Step 3: Render five student bottom navigation targets**

Use `grid-cols-5` for the student bottom bar only. The `Lainnya` target is a button, opens a mobile menu containing `Cerita`, `Portofolio`, `Galeri`, `Kuis Akhir`, `Tantangan Rumah`, and `Panen`, and exposes `aria-label="Lainnya"`.

- [x] **Step 4: Run the navigation contract test**

Run: `node --test src/components/layout/StudentNavigation.contract.test.mjs`

Expected: the navigation tests proceed to the dashboard CTA expectation or pass if Task 4 is already applied.

### Task 4: Strengthen Today's Mission CTA

**Files:**
- Modify: `src/components/student/TodayMissionCard.tsx`

- [x] **Step 1: Make mission continuation visually primary and full-width on small screens**

```tsx
<EcoButton
  href="/siswa/ecomission"
  variant="reward"
  fullWidth
  className="sm:w-auto"
  icon={<ArrowRight className="size-4" />}
>
  Lanjutkan Misi
</EcoButton>
```

The secondary `Lihat Petunjuk` action remains available but does not compete visually with the reward-colored CTA.

- [x] **Step 2: Run contract tests and static checks**

Run: `node --test src/components/layout/StudentNavigation.contract.test.mjs src/components/layout/AppShell.contract.test.mjs src/components/landing/HeroSection.contract.test.mjs`

Expected: all tests pass.

Run: `npm run typecheck`

Expected: exits with code `0`.

### Task 5: Build And Browser Verification

**Files:**
- Verify: `src/data/navigation.ts`
- Verify: `src/components/layout/AppShell.tsx`
- Verify: `src/components/student/TodayMissionCard.tsx`

- [x] **Step 1: Run production build**

Run: `npm run build`

Expected: the Next.js production build succeeds.

- [x] **Step 2: Verify `/siswa` at desktop width**

Expected: the sidebar displays six principal links plus a `Lainnya` control; expanding it reveals the four secondary links; `Lanjutkan Misi` is the strongest CTA.

- [x] **Step 3: Verify `/siswa` at mobile width**

Expected: the bottom navigation has `Beranda`, `Misi`, `Belajar`, `Bermain`, and `Lainnya`; opening `Lainnya` exposes `Cerita`, `Portofolio`, and secondary student destinations without clipping.

## Execution Note

Plan dijalankan inline pada workspace aktif setelah persetujuan pengguna. Repository tidak memiliki baseline commit yang bersih, sehingga perubahan diverifikasi tanpa staging atau commit otomatis.
