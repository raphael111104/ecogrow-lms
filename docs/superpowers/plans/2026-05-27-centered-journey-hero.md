# Centered Journey Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merombak hero landing EcoGrow menjadi susunan konten tunggal terpusat tanpa panel perjalanan kanan, dengan trail lima tahap yang ringan.

**Architecture:** Perubahan UI tetap berada di komponen hero yang sudah mengelola background dan modal video. Data trail menjadi konstanta lokal yang dirender sebagai indikator pendukung, sedangkan routing CTA dan modal video dipertahankan.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Node test runner.

---

## File Structure

- Create: `src/components/landing/HeroSection.contract.test.mjs` untuk mengunci struktur visual penting yang diminta.
- Modify: `src/components/landing/HeroSection.tsx` untuk menghapus panel kanan dan merender komposisi hero terpusat.
- Verify only: `src/app/globals.css`; tidak perlu diubah bila seluruh styling cukup diekspresikan dengan utilitas Tailwind yang sudah digunakan proyek.

### Task 1: Contract Test Untuk Susunan Hero

**Files:**
- Create: `src/components/landing/HeroSection.contract.test.mjs`

- [x] **Step 1: Write the failing test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const heroSource = await readFile(new URL("./HeroSection.tsx", import.meta.url), "utf8");

test("hero uses the centered journey composition", () => {
  assert.match(heroSource, /const journeyTrail = \["Kenali", "Jelajahi", "Aksi", "Refleksi", "Pamerkan"\]/);
  assert.match(heroSource, /aria-label="Tahap perjalanan EcoGrow"/);
  assert.match(heroSource, /items-center text-center/);
  assert.doesNotMatch(heroSource, /Perjalanan Siswa/);
  assert.doesNotMatch(heroSource, /lg:grid-cols-\[1\.05fr_0\.7fr\]/);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test src/components/landing/HeroSection.contract.test.mjs`

Expected: `FAIL` karena struktur lama masih memuat `Perjalanan Siswa` dan belum memiliki `journeyTrail`.

### Task 2: Implement Centered Journey Hero

**Files:**
- Modify: `src/components/landing/HeroSection.tsx`

- [x] **Step 1: Remove the right-side panel dependency and define compact trail content**

```tsx
import { GraduationCap, Play, UsersRound, X } from "lucide-react";

const journeyTrail = ["Kenali", "Jelajahi", "Aksi", "Refleksi", "Pamerkan"];
```

- [x] **Step 2: Replace the two-column hero body with a centered column**

```tsx
<div className="eco-container relative z-10 flex justify-center">
  <div className="flex w-full max-w-4xl flex-col items-center text-center">
    {/* eyebrow, headline, description, CTAs, and video trigger stay in order */}
    <div aria-label="Tahap perjalanan EcoGrow" className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-xs font-black uppercase tracking-[0.16em] text-white/70">
      {journeyTrail.map((stage, index) => (
        <span key={stage} className="inline-flex items-center gap-3">
          <span className={index === 2 ? "text-sun" : undefined}>{stage}</span>
          {index < journeyTrail.length - 1 ? <span aria-hidden="true" className="h-px w-5 bg-sun/45" /> : null}
        </span>
      ))}
    </div>
  </div>
</div>
```

- [x] **Step 3: Update the image overlay for centered legibility**

```tsx
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,42,22,0.5)_0%,rgba(6,42,22,0.76)_48%,rgba(6,42,22,0.94)_100%),linear-gradient(180deg,rgba(6,42,22,0.4),rgba(6,42,22,0.8))]" />
```

- [x] **Step 4: Run the contract test to verify implementation**

Run: `node --test src/components/landing/HeroSection.contract.test.mjs`

Expected: `PASS`, satu uji berhasil.

### Task 3: Compile And Browser Verification

**Files:**
- Verify: `src/components/landing/HeroSection.tsx`

- [ ] **Step 1: Run static and production checks**

Run: `npm run typecheck`

Expected: selesai tanpa error TypeScript.

Run: `npm run build`

Expected: build Next.js selesai tanpa error.

- [ ] **Step 2: Verify desktop and mobile render in the local browser**

Open: `http://localhost:3000/`

Expected: headline, deskripsi, CTA, trigger video, dan trail terpusat; panel kanan hilang; background image tetap terlihat.

- [ ] **Step 3: Verify interactions**

Expected: tombol siswa menuju `/siswa`, tombol guru menuju `/guru`, dan trigger video membuka modal yang dapat ditutup.

### Task 4: Decorate And Animate The Headline

**Files:**
- Modify: `src/components/landing/HeroSection.contract.test.mjs`
- Modify: `src/components/landing/HeroSection.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Extend the contract test for headline decoration and reduced motion**

Assert that headline letters are rendered with `hero-headline-letter`, staggered through `--hero-letter-index`, and styled through a `hero-letter-bloom` animation disabled by a `prefers-reduced-motion: reduce` media query.

- [ ] **Step 2: Run the contract test to verify it fails**

Run: `node --test src/components/landing/HeroSection.contract.test.mjs`

Expected: `FAIL` because the current headline is still plain text without letter spans or animation CSS.

- [ ] **Step 3: Implement the decorated accessible headline**

Keep one screen-reader-readable headline string, render an `aria-hidden` styled character layer grouped per word for wrapping, and add CSS gradient texture plus staggered bounce animation with a reduced-motion fallback.

- [ ] **Step 4: Run checks and visual verification**

Run: `node --test src/components/landing/HeroSection.contract.test.mjs`, `npm run typecheck`, and `npm run build`.

Expected: all pass; in browser the centered title is textured, animated per character, legible, and does not disturb CTA/trail layout.

## Execution Note

Plan dijalankan inline pada sesi yang sama setelah persetujuan pengguna. Repository belum memiliki commit dasar, sehingga perubahan ini diverifikasi tanpa membuat commit yang berisiko mencampur pekerjaan yang telah ada.
