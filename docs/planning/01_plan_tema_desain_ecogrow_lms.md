# 01 — PLAN TEMA, DESAIN, DAN ARAH VISUAL ECOGROW LEARNING LMS

> File ini ditujukan untuk dieksekusi oleh Codex sebagai arahan awal pembuatan tampilan LMS EcoGrow Learning. Fokus file ini adalah identitas visual, desain UI/UX, warna, font, layout, asset visual, dan struktur halaman awal.

---

## 1. Ringkasan Konsep LMS

Bangun sebuah LMS bernama **EcoGrow Learning**, yaitu platform pembelajaran ekologis untuk siswa sekolah dasar. LMS ini mengubah pembelajaran lingkungan, fotosintesis, hidroponik, kompos, ketahanan pangan, dan aksi iklim menjadi pengalaman belajar digital yang menyenangkan, reflektif, dan berbasis misi.

EcoGrow Learning harus terasa seperti **petualangan ekologis anak SD**, bukan LMS formal yang kaku. Platform harus menggabungkan:

1. **Smart Eco-Food School**  
   Sekolah diposisikan sebagai ekosistem belajar hidup yang mandiri, produktif, dan berkelanjutan.

2. **Berguru pada Bumi**  
   Alam menjadi sumber belajar utama melalui observasi tanaman, kebun sekolah, kompos, hidroponik, dan refleksi.

3. **Pancaniti EcoGrow**  
   Alur belajar berbasis lima tahap:
   - Ecological Recognition / Niti Harti
   - Ecological Exploration / Niti Surti
   - Ecological Execution / Niti Bukti
   - Ecological Reflection / Niti Bakti
   - Ecological Mastery & Exhibition / Niti Sajati

4. **Deep Learning**
   Pembelajaran harus meaningful, mindful, dan joyful.

5. **Gamifikasi**
   Gunakan EcoMission, EcoPlay, EcoChallenge, Ecomart, badge, level, poin, progress bar, dan avatar Eco Explorer.

6. **Dua role utama**
   - Guru sebagai aktivator, pengelola modul, proyek, asesmen, dan monitoring.
   - Peserta didik sebagai Eco Explorer yang menjalankan misi ekologis.

---

## 2. Tujuan Desain

Desain harus mendukung target pengguna anak sekolah dasar dan guru. Antarmuka harus:

1. Terlihat ramah anak, hangat, segar, dan natural.
2. Menggunakan visual alam, tanaman, kebun, matahari, awan, air, tanah, dan panen.
3. Tidak terlalu ramai, tetapi tetap menggembirakan.
4. Mengutamakan keterbacaan, aksesibilitas, navigasi sederhana, dan tombol besar.
5. Menggunakan bahasa UI yang sederhana, positif, dan memotivasi.
6. Mendukung mode responsif untuk desktop, tablet, dan mobile.
7. Menampilkan data pembelajaran dalam bentuk visual seperti grafik pertumbuhan tanaman, badge, progress misi, dan kartu proyek.

---

## 3. Tema Visual Utama

Nama tema: **Eco Adventure Classroom**

Deskripsi tema:
- Perpaduan antara kebun sekolah, laboratorium alam, dan dashboard pembelajaran digital.
- Visual seperti buku petualangan ekologis, kartu misi, peta perjalanan, jurnal tanaman, dan galeri hasil panen.
- Kesan: segar, optimis, ramah anak, lokal, edukatif, dan profesional.

Kata kunci visual:
- Green school
- School garden
- Eco mission
- Plant growth
- Hydroponic learning
- Compost adventure
- Climate action for kids
- Smart eco-food school
- Tropical nature
- Local wisdom

---

## 4. Palet Warna

Gunakan warna berikut sebagai design token.

```ts
export const colors = {
  primary: "#167A3A",        // Hijau daun utama
  primaryDark: "#0B4F2A",    // Hijau hutan untuk header/sidebar
  primarySoft: "#DFF5E6",    // Hijau muda untuk background card
  secondary: "#38BDF8",      // Biru langit untuk elemen air/cuaca
  accent: "#F6C343",         // Kuning matahari untuk badge, CTA, reward
  orange: "#F59E0B",         // Panen, poin, highlight
  earth: "#9A6B3F",          // Tanah/kebun
  cream: "#FFF8E7",          // Background hangat
  white: "#FFFFFF",
  slate: "#334155",          // Teks utama
  muted: "#64748B",          // Teks sekunder
  border: "#D9E8DD",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#0EA5E9"
}
```

Rekomendasi penggunaan:
- Background utama: `#F6FFF4` atau `#FFF8E7`.
- Header/sidebar: gradasi `#0B4F2A` ke `#167A3A`.
- Tombol utama: `#167A3A`.
- Tombol reward/badge: `#F6C343`.
- Card siswa: putih dengan border hijau lembut.
- Card misi aktif: hijau muda dengan aksen kuning.
- Elemen statistik: gunakan kombinasi hijau, biru, kuning, dan earth brown.

---

## 5. Tipografi

Gunakan font dari Google Fonts.

1. **Heading**
   - Font: `Nunito` atau `Poppins`
   - Karakter: rounded, ramah anak, modern.
   - Weight: 700 atau 800.

2. **Body**
   - Font: `Plus Jakarta Sans` atau `Inter`
   - Weight: 400, 500, 600.

3. **Alternatif ramah anak**
   - Heading: `Nunito`
   - Body: `Nunito Sans`

Implementasi rekomendasi:
```css
:root {
  --font-heading: "Nunito", sans-serif;
  --font-body: "Plus Jakarta Sans", sans-serif;
}
```

---

## 6. Gaya UI Komponen

### 6.1 Umum

Gunakan gaya:
- Rounded besar: `rounded-2xl` atau `rounded-3xl`.
- Shadow lembut: `shadow-sm`, `shadow-md`.
- Border natural: `border border-green-100`.
- Spacing lega: `p-4`, `p-6`, `gap-4`, `gap-6`.
- Icon edukatif dari `lucide-react`.
- Ilustrasi atau gambar alam sebagai elemen pendukung.
- Animasi ringan menggunakan `framer-motion`.

### 6.2 Card

Gunakan card untuk:
- Misi aktif
- Modul belajar
- Statistik guru
- Badge siswa
- Proyek kebun
- Jurnal tanaman
- Galeri proyek
- EcoChallenge rumah

Contoh karakter card:
- Background putih atau hijau lembut.
- Icon bulat di kiri atas.
- Label kecil seperti “EcoMission”, “Niti Harti”, “Progress 80%”.
- CTA kecil seperti “Mulai Misi”, “Lihat Jurnal”, “Beri Umpan Balik”.

### 6.3 Tombol

Jenis tombol:
- Primary: hijau.
- Secondary: putih dengan border hijau.
- Reward: kuning/oranye.
- Danger: merah lembut untuk hapus.

Teks tombol harus aktif dan ramah:
- “Mulai Misi”
- “Lanjutkan Jurnal”
- “Kirim Refleksi”
- “Lihat Badge”
- “Tambah Proyek”
- “Beri Umpan Balik”

### 6.4 Badge dan Level

Gunakan badge berbentuk pil atau medali kecil.

Contoh badge:
- Penjaga Tunas
- Sahabat Tanah
- Ahli Fotosintesis
- Pahlawan Pengurai
- Eco Explorer
- Eco Master
- Juara Kolaborasi
- Pejuang Hemat Air

Level:
- Level 1: Benih
- Level 2: Tunas
- Level 3: Daun Muda
- Level 4: Pohon Kecil
- Level 5: Eco Master

---

## 7. Struktur Layout Aplikasi

### 7.1 Landing Page

Buat landing page dengan struktur berikut:

1. **Hero Section**
   - Headline: “EcoGrow Learning”
   - Subheadline: “Berguru pada Bumi, Tumbuh Bersama Pengetahuan”
   - CTA: “Masuk sebagai Guru” dan “Masuk sebagai Peserta Didik”
   - Background: foto/video kebun sekolah, daun bergerak, atau ilustrasi tanaman.
   - Elemen visual: kartu mini progress tanaman, badge, dan grafik pertumbuhan.

2. **Konsep Utama**
   - Smart Eco-Food School
   - Pancaniti EcoGrow
   - Meaningful, Mindful, Joyful Learning

3. **Fitur Utama**
   - EcoLearn
   - EcoMission
   - EcoPlay
   - EcoChallenge
   - Ecomart
   - Galeri Project
   - Portofolio Digital
   - Dashboard Guru

4. **SDGs Section**
   - SDG 2: Zero Hunger
   - SDG 4: Quality Education
   - SDG 13: Climate Action
   - SDG 15: Life on Land

5. **Footer**
   - Tentang EcoGrow
   - Panduan
   - Kontak sekolah
   - Catatan lisensi aset

### 7.2 Dashboard Guru

Layout:
- Sidebar kiri.
- Topbar berisi profil guru, kelas aktif, notifikasi.
- Konten utama berbasis card dan grafik.

Menu:
- Beranda
- Panduan EcoGrow
- Modul Ajar
- Proyek Pelajaran
- Monitoring Jurnal
- Analitik
- Galeri Project
- Asesmen
- Pengaturan

### 7.3 Dashboard Peserta Didik

Layout:
- Navigasi sederhana dengan icon besar.
- Card misi harian.
- Progress karakter dan badge.
- Avatar Eco Explorer.
- Grafik tanaman kelompok.

Menu:
- Beranda
- EcoLearn
- EcoMission
- EcoPlay
- Ecomart
- Galeri Project
- EcoMaster Quiz
- Cerita Belajarku
- EcoChallenge

---

## 8. Asset Visual Open Source / Bebas Pakai

Gunakan asset visual dari sumber bebas pakai atau open-license. Untuk prototype, boleh gunakan remote URL. Untuk produksi, unduh dan simpan ke folder `/public/assets` serta catat atribusi di `/public/assets/ATTRIBUTION.md`.

### 8.1 Sumber Gambar

Gunakan sumber berikut:
1. **Unsplash**
   - Cocok untuk foto tanaman, kebun, greenhouse, sawah, daun, tanah, bibit, panen.
   - Gunakan untuk hero image, card background, section SDGs.
   - Contoh query:
     - `school garden`
     - `children gardening`
     - `hydroponic vegetables`
     - `greenhouse plants`
     - `seedling soil`
     - `tropical farm`
     - `rice field indonesia`
     - `compost soil`
     - `vegetable garden`

2. **Pexels**
   - Cocok untuk foto dan video pendek.
   - Gunakan untuk video background hero jika tersedia.
   - Contoh query:
     - `kids gardening`
     - `plant growth`
     - `greenhouse`
     - `school garden`
     - `leaves sunlight`
     - `watering plants`
     - `organic farming`

3. **Pixabay**
   - Cocok untuk ilustrasi, foto, dan video sederhana.
   - Contoh query:
     - `eco education`
     - `garden`
     - `plant`
     - `school kids nature`
     - `farm`

4. **OpenMoji**
   - Cocok untuk ikon emoji open source.
   - Gunakan untuk avatar, badge, ilustrasi kecil seperti daun, matahari, air, kompos, tanaman, panen.

5. **Lucide React**
   - Gunakan sebagai ikon utama UI:
     - Leaf
     - Sprout
     - TreePine
     - Sun
     - CloudSun
     - Droplets
     - BookOpen
     - ClipboardList
     - Trophy
     - BadgeCheck
     - BarChart3
     - Users
     - Camera
     - Gamepad2
     - ShoppingBasket

### 8.2 Asset yang Direkomendasikan untuk Prototype

Gunakan daftar ini sebagai seed asset awal. Simpan sebagai array di `src/data/assets.ts`.

```ts
export const ecoAssets = {
  heroImages: [
    {
      name: "Seedling close-up",
      url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
      source: "Unsplash",
      usage: "Landing page hero"
    },
    {
      name: "Agriculture field",
      url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80",
      source: "Unsplash",
      usage: "Smart Eco-Food School section"
    },
    {
      name: "Vegetable market harvest",
      url: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1600&q=80",
      source: "Unsplash",
      usage: "Ecomart and harvest section"
    },
    {
      name: "Gardening activity",
      url: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1600&q=80",
      source: "Unsplash",
      usage: "EcoMission background"
    }
  ],
  videos: [
    {
      name: "Nature leaves video",
      provider: "Pexels",
      instruction: "Cari video background bertema leaves sunlight / garden / greenhouse. Jika gagal, gunakan gradient CSS dan gambar statis."
    },
    {
      name: "Plant watering video",
      provider: "Pexels",
      instruction: "Cari video pendek aktivitas menyiram tanaman. Gunakan hanya pada hero section dengan overlay hijau gelap 60%."
    }
  ],
  icons: [
    "lucide-react:Leaf",
    "lucide-react:Sprout",
    "lucide-react:TreePine",
    "lucide-react:Sun",
    "lucide-react:Droplets",
    "lucide-react:BookOpen",
    "lucide-react:Trophy",
    "lucide-react:BarChart3",
    "lucide-react:Users",
    "lucide-react:Camera",
    "lucide-react:Gamepad2",
    "lucide-react:ShoppingBasket"
  ]
}
```

### 8.3 Aturan Lisensi dan Atribusi

Codex harus membuat file:
- `/public/assets/ATTRIBUTION.md`

Isi minimal:
```md
# Asset Attribution

Seluruh gambar/video eksternal yang digunakan pada prototype harus berasal dari sumber bebas pakai/open-license seperti Unsplash, Pexels, Pixabay, OpenMoji, atau ikon Lucide React.

Untuk setiap asset yang diunduh, catat:
- Nama file
- Sumber
- URL asal
- Nama kreator jika tersedia
- Jenis lisensi
- Tanggal unduh
```

---

## 9. Halaman yang Harus Dibuat pada Tahap Desain Awal

Buat halaman awal berikut terlebih dahulu:

1. `/`
   - Landing page.

2. `/login`
   - Role selector Guru/Peserta Didik.
   - Tidak perlu autentikasi sungguhan untuk tahap awal.
   - Klik role mengarahkan ke dashboard masing-masing.

3. `/guru`
   - Dashboard guru ringkas.
   - Statistik kelas, progress proyek, aktivitas siswa, grafik perkembangan.

4. `/siswa`
   - Dashboard siswa ringkas.
   - Misi aktif, level, badge, progress tanaman, dan tombol lanjutkan misi.

---

## 10. Prinsip Aksesibilitas

1. Gunakan kontras teks yang cukup.
2. Jangan hanya mengandalkan warna untuk status; tambahkan icon dan label.
3. Tombol minimal tinggi 44px.
4. Font body minimal 16px.
5. Gunakan alt text pada gambar.
6. Hindari animasi berlebihan.
7. Video background harus memiliki overlay dan tidak mengganggu keterbacaan.
8. Semua form harus punya label.
9. Gunakan bahasa sederhana dan kalimat pendek untuk siswa.

---

## 11. Struktur Folder yang Diinginkan

Gunakan struktur berikut jika memakai Next.js App Router:

```txt
ecogrow-lms/
├─ public/
│  ├─ assets/
│  │  ├─ images/
│  │  ├─ videos/
│  │  └─ ATTRIBUTION.md
├─ src/
│  ├─ app/
│  │  ├─ page.tsx
│  │  ├─ login/
│  │  │  └─ page.tsx
│  │  ├─ guru/
│  │  │  └─ page.tsx
│  │  ├─ siswa/
│  │  │  └─ page.tsx
│  │  └─ layout.tsx
│  ├─ components/
│  │  ├─ layout/
│  │  ├─ landing/
│  │  ├─ guru/
│  │  ├─ siswa/
│  │  ├─ gamification/
│  │  └─ ui/
│  ├─ data/
│  │  ├─ assets.ts
│  │  ├─ theme.ts
│  │  └─ navigation.ts
│  ├─ lib/
│  │  └─ utils.ts
│  └─ styles/
```

---

## 12. Instruksi Eksekusi untuk Codex

Kerjakan sebagai berikut:

1. Buat atau gunakan project Next.js + TypeScript + Tailwind.
2. Pasang dependency:
   - `lucide-react`
   - `framer-motion`
   - `recharts`
   - `clsx`
   - `tailwind-merge`
   - `class-variance-authority`
3. Buat design token warna dan typography.
4. Buat komponen dasar:
   - `EcoButton`
   - `EcoCard`
   - `EcoBadge`
   - `EcoProgress`
   - `EcoSectionTitle`
   - `RoleLoginCard`
5. Buat landing page sesuai struktur di atas.
6. Buat halaman login role selector.
7. Buat dashboard guru dan dashboard siswa versi awal.
8. Gunakan asset open source sebagai background/ilustrasi.
9. Tambahkan file `ATTRIBUTION.md`.
10. Pastikan aplikasi berjalan tanpa error dengan `npm run dev`.
11. Pastikan tampilan responsive.
12. Jangan membangun backend pada tahap ini.
13. Semua data masih statis atau hardcoded ringan.

---

## 13. Kriteria Selesai

Tahap ini dianggap selesai jika:

1. Landing page sudah terlihat seperti LMS ekologis modern.
2. Ada navigasi role Guru dan Peserta Didik.
3. Dashboard Guru dan Siswa sudah memiliki UI awal.
4. Tema warna, font, card, badge, dan layout sudah konsisten.
5. Asset gambar/video telah digunakan secara wajar.
6. Tidak ada error TypeScript.
7. Desain siap dilanjutkan ke tahap prototype mockup data.
