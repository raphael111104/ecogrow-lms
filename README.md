# EcoGrow Learning LMS

EcoGrow Learning adalah LMS ekologis untuk sekolah dasar dengan pendekatan Smart Eco-Food School. Aplikasi ini membantu guru dan peserta didik menjalankan pembelajaran lingkungan melalui misi harian, modul singkat, asesmen, portofolio digital, galeri proyek, dan dashboard monitoring kelas.

## Fitur Utama

- Landing page EcoGrow dengan penjelasan konsep, alur Pancaniti, fitur, dampak, SDGs, dan EcoGrow Assistant.
- Ruang Siswa untuk misi EcoMission, EcoLearn, EcoPlay, EcoChallenge, Ecomart, galeri, laporan belajar, dan portofolio.
- Ruang Guru untuk ringkasan kelas, modul ajar, proyek, monitoring, asesmen, laporan, analitik, galeri, dan panduan.
- Auth demo berbasis browser storage untuk role Guru dan Peserta Didik.
- Mock repository dan data pembelajaran untuk prototipe frontend tanpa backend produksi.
- EcoGrow Assistant berbasis Gemini API untuk menjawab pertanyaan seputar EcoGrow, ekologi, tanaman, dan pendidikan.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Recharts

## Struktur Project

```text
src/
  app/                 Route Next.js, layout, metadata, dan API route
  components/          Komponen UI, layout, landing, auth, siswa, guru, dan ecogrow
  data/                Data navigasi, kurikulum, asesmen, LKPD, stage, dan mock
  features/            Halaman fitur siswa dan guru
  hooks/               Hook untuk mock storage, project, asesmen, dan feedback
  lib/                 Utilitas, auth demo, gamification, dan EcoGrow Assistant
  mock/repositories/   Repository mock untuk dashboard siswa, guru, dan proyek
  types/               Tipe domain EcoGrow
docs/                  Dokumentasi planning dan user flow
public/assets/         Gambar, logo, favicon, atribusi, dan media publik
```

## Prasyarat

- Node.js 18.18+ atau 20+.
- npm.
- API key Gemini jika ingin mengaktifkan EcoGrow Assistant.

## Instalasi

1. Install dependency:

```bash
npm install
```

2. Siapkan environment variable:

```bash
cp .env.example .env.local
```

3. Isi `.env.local` jika fitur EcoGrow Assistant ingin digunakan:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

Tanpa `GEMINI_API_KEY`, aplikasi tetap bisa berjalan, tetapi endpoint assistant akan mengembalikan error konfigurasi.

## Menjalankan Project

Jalankan development server:

```bash
npm run dev
```

Buka aplikasi di:

```text
http://localhost:3000
```

Build production:

```bash
npm run build
```

Jalankan hasil build:

```bash
npm run start
```

## Script

```bash
npm run dev             # Menjalankan development server Next.js
npm run build           # Membuat production build
npm run start           # Menjalankan production server
npm run typecheck       # Memeriksa TypeScript tanpa emit file
npm run test:assistant  # Menjalankan test untuk EcoGrow Assistant
```

## Akses Demo

Aplikasi memakai auth demo di sisi browser. Dari halaman `/login` atau `/register`, pengguna bisa:

- Klik tombol `Demo Siswa` untuk masuk ke `/siswa`.
- Klik tombol `Demo Guru` untuk masuk ke `/guru`.
- Mengisi form dengan email valid apa pun dan password minimal 8 karakter.

Contoh:

```text
Email: siswa@ecogrow.test
Password: password123
Role: Peserta Didik
```

```text
Email: guru@ecogrow.test
Password: password123
Role: Guru
```

## Route Utama

- `/` - Landing page EcoGrow Learning.
- `/login` - Halaman masuk.
- `/register` - Halaman daftar.
- `/siswa` - Dashboard peserta didik.
- `/siswa/ecomission` - Misi harian.
- `/siswa/ecolearn` - Materi belajar.
- `/siswa/ecoplay` - Aktivitas bermain.
- `/siswa/ecochallenge` - Tantangan rumah.
- `/siswa/ecomart` - Simulasi panen dan reward.
- `/siswa/portofolio` - Album/portofolio belajar.
- `/siswa/laporan-belajar` - Laporan belajar siswa.
- `/guru` - Dashboard guru.
- `/guru/modul-ajar` - Modul ajar.
- `/guru/proyek` - Pengelolaan proyek.
- `/guru/monitoring` - Monitoring kelas.
- `/guru/asesmen` - Asesmen.
- `/guru/laporan` - Laporan.
- `/guru/analitik` - Analitik.
- `/guru/galeri` - Galeri proyek.
- `/guru/panduan` - Panduan guru.

## Catatan Development

- Data aplikasi saat ini berbasis mock dan browser storage, belum terhubung ke backend produksi.
- Asset publik berada di `public/assets`; cek `public/assets/ATTRIBUTION.md` untuk atribusi gambar.
- API EcoGrow Assistant berada di `src/app/api/ecogrow-assistant/route.ts`.
- Kontrak dan test `.mjs` tersebar di `src/components`, `src/data`, `src/features`, dan `src/lib`.

## Dokumentasi Terkait

- `docs/ecogrow-lms-user-flow.html`
- `docs/planning/01_plan_tema_desain_ecogrow_lms.md`
- `docs/planning/02_generate_prototype_mockup_ecogrow_lms.md`
- `docs/planning/03_integrasi_backend_frontend_ecogrow_lms.md`
- `rangkuman-revisi-frontend-ecogrow-lms-design-thinking.md`

## Lisensi

Project ini dilisensikan di bawah GNU Affero General Public License v3.0. Lihat `LICENSE` untuk detail lengkap.
