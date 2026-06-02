# 02 — GENERATE PROTOTYPE ECOGROW LMS DENGAN MOCKUP DATA

> File ini ditujukan untuk dieksekusi oleh Codex setelah desain awal selesai. Fokus file ini adalah membangun prototype LMS EcoGrow Learning yang berjalan penuh menggunakan mockup data lokal tanpa backend.

---

## 1. Tujuan Prototype

Bangun prototype LMS EcoGrow Learning yang dapat dimainkan menggunakan data dummy. Prototype harus memperlihatkan alur belajar siswa dan alur monitoring guru secara realistis, tetapi semua data masih berasal dari file lokal di folder `src/data`.

Prototype harus mendemonstrasikan:

1. Landing page dan login role.
2. Dashboard guru.
3. Dashboard siswa.
4. Modul ajar EcoGrow.
5. Proyek pembelajaran berbasis kebun/hidroponik.
6. EcoMission berbasis sintaks Pancaniti.
7. Jurnal ekologis digital.
8. EcoPlay dan quiz.
9. EcoChallenge.
10. Ecomart hasil panen.
11. Galeri project.
12. Badge, level, poin, dan progress.
13. Analitik sederhana untuk guru.
14. Portofolio digital siswa.

---

## 2. Stack Teknologi

Gunakan stack berikut:

```txt
Framework     : Next.js App Router
Language      : TypeScript
Styling       : Tailwind CSS
UI Component  : shadcn/ui atau komponen custom berbasis Tailwind
Icons         : lucide-react
Chart         : recharts
Animation     : framer-motion
State         : React state + localStorage ringan
Data          : Mock data TypeScript di src/data
Backend       : Tidak ada pada tahap ini
Database      : Tidak ada pada tahap ini
Auth          : Simulasi role menggunakan localStorage
```

Jika project belum memiliki shadcn/ui, gunakan komponen custom agar tidak menghambat pengembangan.

---

## 3. Role Pengguna

### 3.1 Guru

Guru berperan sebagai **Aktivator EcoGrow**.

Kemampuan guru:
1. Melihat statistik kelas.
2. Melihat daftar siswa.
3. Melihat progress misi siswa.
4. Membuat dan melihat modul ajar mock.
5. Mengelola proyek pembelajaran.
6. Memantau jurnal ekologis siswa.
7. Melihat hasil quiz.
8. Melihat galeri project.
9. Memberikan umpan balik mock.
10. Melihat analitik pertumbuhan tanaman, poin, dan badge.

### 3.2 Peserta Didik

Peserta didik berperan sebagai **Eco Explorer**.

Kemampuan siswa:
1. Melihat misi aktif.
2. Membuka materi EcoLearn.
3. Mengerjakan EcoMission.
4. Mengisi jurnal tanaman.
5. Memainkan EcoPlay.
6. Melihat hasil panen di Ecomart.
7. Mengunggah galeri project secara mock.
8. Mengikuti EcoMaster Quiz.
9. Menulis Cerita Belajarku.
10. Mengerjakan EcoChallenge rumah.
11. Melihat badge, poin, level, dan portofolio.

---

## 4. Route yang Harus Dibuat

Buat route berikut:

```txt
/
 /login
 /guru
 /guru/panduan
 /guru/modul-ajar
 /guru/proyek
 /guru/monitoring
 /guru/analitik
 /guru/galeri
 /guru/asesmen
 /siswa
 /siswa/ecolearn
 /siswa/ecomission
 /siswa/ecoplay
 /siswa/ecomart
 /siswa/galeri
 /siswa/ecomaster-quiz
 /siswa/cerita-belajarku
 /siswa/ecochallenge
 /siswa/portofolio
```

Jika waktu terbatas, prioritaskan:
1. `/`
2. `/login`
3. `/guru`
4. `/guru/proyek`
5. `/guru/monitoring`
6. `/guru/analitik`
7. `/siswa`
8. `/siswa/ecolearn`
9. `/siswa/ecomission`
10. `/siswa/ecoplay`
11. `/siswa/ecomart`
12. `/siswa/portofolio`

---

## 5. Struktur Folder Prototype

```txt
src/
├─ app/
│  ├─ page.tsx
│  ├─ login/page.tsx
│  ├─ guru/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ panduan/page.tsx
│  │  ├─ modul-ajar/page.tsx
│  │  ├─ proyek/page.tsx
│  │  ├─ monitoring/page.tsx
│  │  ├─ analitik/page.tsx
│  │  ├─ galeri/page.tsx
│  │  └─ asesmen/page.tsx
│  ├─ siswa/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ ecolearn/page.tsx
│  │  ├─ ecomission/page.tsx
│  │  ├─ ecoplay/page.tsx
│  │  ├─ ecomart/page.tsx
│  │  ├─ galeri/page.tsx
│  │  ├─ ecomaster-quiz/page.tsx
│  │  ├─ cerita-belajarku/page.tsx
│  │  ├─ ecochallenge/page.tsx
│  │  └─ portofolio/page.tsx
├─ components/
│  ├─ layout/
│  │  ├─ GuruShell.tsx
│  │  ├─ SiswaShell.tsx
│  │  ├─ Sidebar.tsx
│  │  └─ Topbar.tsx
│  ├─ guru/
│  │  ├─ GuruStats.tsx
│  │  ├─ ProjectManager.tsx
│  │  ├─ StudentProgressTable.tsx
│  │  ├─ JournalMonitor.tsx
│  │  └─ AnalyticsCharts.tsx
│  ├─ siswa/
│  │  ├─ StudentHero.tsx
│  │  ├─ ActiveMissionCard.tsx
│  │  ├─ PancanitiTimeline.tsx
│  │  ├─ JournalFormMock.tsx
│  │  ├─ EcoPlayCard.tsx
│  │  ├─ BadgeShelf.tsx
│  │  ├─ HarvestCard.tsx
│  │  └─ PortfolioSummary.tsx
│  ├─ gamification/
│  │  ├─ LevelProgress.tsx
│  │  ├─ EcoBadge.tsx
│  │  └─ PointsPill.tsx
│  └─ ui/
├─ data/
│  ├─ mock-users.ts
│  ├─ mock-classes.ts
│  ├─ mock-modules.ts
│  ├─ mock-projects.ts
│  ├─ mock-missions.ts
│  ├─ mock-journals.ts
│  ├─ mock-quizzes.ts
│  ├─ mock-badges.ts
│  ├─ mock-harvests.ts
│  ├─ mock-gallery.ts
│  ├─ mock-analytics.ts
│  └─ index.ts
├─ lib/
│  ├─ mock-auth.ts
│  ├─ gamification.ts
│  ├─ format.ts
│  └─ utils.ts
└─ types/
   └─ ecogrow.ts
```

---

## 6. Tipe Data Utama

Buat file `src/types/ecogrow.ts`:

```ts
export type UserRole = "teacher" | "student"

export type PancanitiStage =
  | "NITI_HARTI"
  | "NITI_SURTI"
  | "NITI_BUKTI"
  | "NITI_BAKTI"
  | "NITI_SAJATI"

export type MissionStatus = "locked" | "active" | "submitted" | "completed"

export type AssessmentType =
  | "diagnostic"
  | "formative"
  | "summative"
  | "reflection"
  | "performance"

export interface User {
  id: string
  name: string
  role: UserRole
  avatarUrl?: string
}

export interface StudentProfile {
  id: string
  userId: string
  classId: string
  groupName: string
  level: number
  points: number
  badges: string[]
  ecologicalCharacter: {
    ekologis: number
    mandiri: number
    adaptif: number
    inovatif: number
    humanis: number
  }
}

export interface ClassRoom {
  id: string
  name: string
  grade: string
  phase: string
  teacherId: string
  totalStudents: number
}

export interface LearningModule {
  id: string
  title: string
  subject: string
  phase: string
  grade: string
  topic: string
  duration: string
  description: string
  learningOutcomes: string[]
  pancanitiStages: PancanitiStage[]
  sdgs: string[]
}

export interface EcoProject {
  id: string
  title: string
  classId: string
  moduleId: string
  plantType: string
  method: "hydroponic" | "soil" | "compost" | "observation"
  startDate: string
  endDate: string
  progress: number
  status: "planned" | "active" | "completed"
  description: string
}

export interface EcoMission {
  id: string
  projectId: string
  title: string
  stage: PancanitiStage
  status: MissionStatus
  points: number
  instructions: string
  tasks: string[]
}

export interface JournalEntry {
  id: string
  studentId: string
  projectId: string
  date: string
  plantHeightCm: number
  leafCount: number
  condition: "sehat" | "layu" | "kuning" | "perlu_perawatan"
  weather: "cerah" | "mendung" | "hujan"
  waterMl: number
  note: string
  photoUrl?: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  answer: string
  explanation: string
  cognitiveLevel: "C1" | "C2" | "C3" | "C4" | "C5" | "C6"
}

export interface Quiz {
  id: string
  title: string
  type: AssessmentType
  questions: QuizQuestion[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  requirement: string
}

export interface HarvestReport {
  id: string
  projectId: string
  groupName: string
  productName: string
  quantity: number
  unit: string
  contributionNote: string
}

export interface GalleryPost {
  id: string
  studentId: string
  projectId: string
  title: string
  description: string
  imageUrl: string
  createdAt: string
  likes: number
}

export interface ReflectionEntry {
  id: string
  studentId: string
  projectId: string
  feeling: "Bangga" | "Senang" | "Lebih peduli" | "Masih belajar"
  lessonLearned: string
  problemSolved: string
  teamworkNote: string
  ecologicalPromise: string
}
```

---

## 7. Mock Data yang Harus Dibuat

### 7.1 Mock User

Buat:
- 1 guru bernama `Bu Rani Aktivator`.
- 8 siswa kelas 4 dengan nama ramah.
- Minimal 2 kelompok:
  - Tim Tunas Hijau
  - Tim Sahabat Tanah

### 7.2 Mock Kelas

```ts
{
  id: "kelas-4b",
  name: "Kelas 4B Eco Explorer",
  grade: "4",
  phase: "B",
  teacherId: "guru-1",
  totalStudents: 25
}
```

### 7.3 Mock Modul Ajar

Modul utama:
- Mata Pelajaran: IPAS
- Fase/Kelas: B/4
- Topik: Fotosintesis dan Siklus Energi
- Alokasi: 4 pertemuan x 2x35 menit
- Konteks: kangkung hidroponik
- Tujuan:
  1. Siswa memahami peran tumbuhan dalam menghasilkan makanan dan oksigen.
  2. Siswa mengamati pertumbuhan tanaman.
  3. Siswa mencatat data tinggi tanaman dan kondisi daun.
  4. Siswa menganalisis hubungan cahaya, air, dan pertumbuhan.
  5. Siswa merefleksikan pentingnya merawat tanaman untuk pangan sehat.

### 7.4 Mock Proyek

Buat proyek:
```ts
{
  title: "Misi Kangkung Hidroponik",
  plantType: "Kangkung",
  method: "hydroponic",
  status: "active",
  progress: 68
}
```

### 7.5 Mock EcoMission

Buat 5 misi sesuai Pancaniti:

1. **Niti Harti — Mengenal Rahasia Daun**
   - Mengamati warna, bentuk, dan bagian tanaman.
   - Poin: 100.

2. **Niti Surti — Mengapa Tanaman Butuh Cahaya?**
   - Merumuskan pertanyaan dan prediksi.
   - Poin: 120.

3. **Niti Bukti — Praktik Merawat Kangkung**
   - Mengisi air, mencatat tinggi tanaman, mengunggah foto.
   - Poin: 150.

4. **Niti Bakti — Cerita Belajarku**
   - Refleksi keberhasilan/kendala.
   - Poin: 100.

5. **Niti Sajati — Pameran Eco Project**
   - Upload poster/foto hasil proyek.
   - Poin: 200.

### 7.6 Mock Jurnal Tanaman

Buat data 10 hari untuk 2 kelompok, berisi:
- tanggal
- tinggi tanaman
- jumlah daun
- kondisi
- cuaca
- volume air
- catatan

Data ini digunakan untuk grafik Recharts:
- Line chart tinggi tanaman.
- Bar chart jumlah daun.
- Pie chart kondisi tanaman.

### 7.7 Mock Quiz

Buat minimal 10 soal:
- 3 soal diagnostik.
- 4 soal formatif.
- 3 soal sumatif.

Tema soal:
- Fotosintesis
- Fungsi cahaya matahari
- Air dan pertumbuhan
- Siklus energi
- Pangan sehat
- Kompos
- Kepedulian lingkungan

Gunakan level C2-C5, dengan minimal 2 soal HOTS C4/C5.

### 7.8 Mock Badge

Buat badge:
1. Penjaga Tunas
2. Sahabat Tanah
3. Ahli Fotosintesis
4. Pahlawan Pengurai
5. Eco Explorer
6. Eco Master
7. Juara Kolaborasi
8. Pejuang Hemat Air

### 7.9 Mock Ecomart

Buat laporan hasil panen:
- Kangkung 2.5 kg
- Bayam 1.8 kg
- Kompos 4 kg
- Bibit cabai 12 polybag

Ecomart bukan marketplace sungguhan. Pada prototype, Ecomart adalah fitur pencatatan hasil panen dan kontribusi pangan sehat sekolah.

---

## 8. Fitur Halaman Guru

### 8.1 Dashboard Guru `/guru`

Komponen:
1. Greeting: “Selamat datang, Bu Rani Aktivator”
2. Statistik:
   - Total siswa
   - Proyek aktif
   - Jurnal masuk hari ini
   - Rata-rata progress kelas
3. Grafik:
   - Progress misi kelas
   - Pertumbuhan tanaman
4. Aktivitas terbaru:
   - Jurnal siswa
   - Upload galeri
   - Hasil quiz
5. CTA:
   - Buat Modul Ajar
   - Tambah EcoMission
   - Lihat Monitoring

### 8.2 Modul Ajar `/guru/modul-ajar`

Tampilkan:
1. Daftar modul ajar.
2. Detail modul “Fotosintesis dan Siklus Energi”.
3. Struktur:
   - Identitas modul
   - CP/TP
   - Pertanyaan pemantik
   - Sintaks Pancaniti
   - Asesmen
4. Tombol mock:
   - “Generate Modul Ajar”
   - “Edit Modul”
   - “Publikasikan ke Siswa”

Tidak perlu membuat generator AI sungguhan. Buat simulasi form yang menghasilkan preview modul dari mock data.

### 8.3 Proyek `/guru/proyek`

Tampilkan:
1. Kartu proyek aktif.
2. Timeline Pancaniti.
3. Daftar kelompok.
4. Progress tiap kelompok.
5. Tombol “Tambah Proyek” mock.
6. Form mock tambah proyek yang hanya menambah state sementara.

### 8.4 Monitoring `/guru/monitoring`

Tampilkan:
1. Tabel jurnal siswa.
2. Filter:
   - Kelompok
   - Kondisi tanaman
   - Tanggal
3. Detail jurnal:
   - tinggi tanaman
   - kondisi
   - catatan siswa
   - foto placeholder
4. Tombol “Beri Umpan Balik” mock.

### 8.5 Analitik `/guru/analitik`

Tampilkan:
1. Grafik pertumbuhan tanaman.
2. Grafik progress misi.
3. Grafik distribusi badge.
4. Ringkasan:
   - siswa perlu remedial
   - siswa siap pengayaan
   - kelompok paling aktif
5. Insight otomatis mock:
   - “Tim Tunas Hijau konsisten mengisi jurnal selama 5 hari.”
   - “Tim Sahabat Tanah perlu memperhatikan volume air.”

---

## 9. Fitur Halaman Peserta Didik

### 9.1 Dashboard Siswa `/siswa`

Tampilkan:
1. Greeting: “Halo, Adit Eco Explorer!”
2. Level dan poin.
3. Badge terbaru.
4. Misi aktif.
5. Grafik tanaman kelompok.
6. Tombol cepat:
   - EcoLearn
   - EcoMission
   - EcoPlay
   - Cerita Belajarku

### 9.2 EcoLearn `/siswa/ecolearn`

Tampilkan materi:
1. Video edukasi placeholder.
2. Modul digital:
   - Apa itu fotosintesis?
   - Mengapa tanaman butuh cahaya?
   - Bagaimana kangkung tumbuh?
   - Mengapa pangan sehat penting?
3. Kartu istilah:
   - cahaya
   - air
   - karbon dioksida
   - oksigen
   - klorofil
4. Tombol “Saya Paham, Lanjut ke Misi”.

### 9.3 EcoMission `/siswa/ecomission`

Tampilkan:
1. Timeline 5 Pancaniti.
2. Misi aktif.
3. Instruksi misi.
4. Checklist tugas.
5. Form jurnal:
   - tanggal
   - tinggi tanaman
   - jumlah daun
   - kondisi tanaman
   - cuaca
   - jumlah air
   - catatan
   - upload foto mock
6. Setelah submit:
   - Tambah poin
   - Tampilkan toast
   - Update progress di localStorage

### 9.4 EcoPlay `/siswa/ecoplay`

Buat permainan sederhana:
1. Quiz card pilihan ganda.
2. Tebak bagian tanaman.
3. Puzzle urutan fotosintesis:
   - Matahari
   - Daun
   - Air
   - Makanan
   - Oksigen
4. Story Learning pendek:
   - “Kangkung Kecil Mencari Cahaya”

Tidak perlu game engine. Cukup interaksi UI berbasis state.

### 9.5 Ecomart `/siswa/ecomart`

Tampilkan:
1. Kartu hasil panen kelompok.
2. Total kontribusi pangan sehat.
3. Catatan:
   - “Ecomart adalah catatan hasil panen, bukan transaksi uang.”
4. Visual:
   - produk
   - jumlah
   - unit
   - kontribusi
5. Badge “Panen Pertama”.

### 9.6 Galeri Project `/siswa/galeri`

Tampilkan:
1. Grid foto project.
2. Judul karya.
3. Deskripsi.
4. Jumlah apresiasi.
5. Tombol upload mock.
6. Form upload mock:
   - judul
   - deskripsi
   - URL gambar
7. Data boleh disimpan di localStorage.

### 9.7 Cerita Belajarku `/siswa/cerita-belajarku`

Form refleksi:
1. Perasaan hari ini:
   - Bangga
   - Senang
   - Lebih peduli
   - Masih belajar
2. Temuan hebat tim.
3. Cara mengatasi masalah tanaman.
4. Cerita kerja sama tim.
5. Janji aksi ekologis.
6. Submit refleksi mock.

### 9.8 EcoChallenge `/siswa/ecochallenge`

Tampilkan tantangan rumah:
1. Menyiram tanaman di rumah selama 3 hari.
2. Mengurangi sampah plastik.
3. Membantu memilah sampah organik.
4. Mengajak keluarga hemat air.
5. Membuat foto cerita aksi hijau.

Status:
- belum mulai
- berjalan
- selesai

### 9.9 Portofolio `/siswa/portofolio`

Tampilkan:
1. Biodata siswa.
2. Level dan poin.
3. Badge.
4. Jurnal terakhir.
5. Quiz score.
6. Galeri project.
7. Refleksi.
8. Ringkasan karakter KAIH:
   - Ekologis
   - Mandiri
   - Adaptif
   - Inovatif
   - Humanis

---

## 10. Logika Gamifikasi

Buat file `src/lib/gamification.ts`:

```ts
export function calculateLevel(points: number) {
  if (points >= 1200) return 5
  if (points >= 800) return 4
  if (points >= 500) return 3
  if (points >= 250) return 2
  return 1
}

export function getLevelName(level: number) {
  const map: Record<number, string> = {
    1: "Benih",
    2: "Tunas",
    3: "Daun Muda",
    4: "Pohon Kecil",
    5: "Eco Master"
  }
  return map[level] ?? "Benih"
}

export function getProgressToNextLevel(points: number) {
  const thresholds = [0, 250, 500, 800, 1200]
  const level = calculateLevel(points)
  if (level === 5) return 100
  const current = thresholds[level - 1]
  const next = thresholds[level]
  return Math.round(((points - current) / (next - current)) * 100)
}
```

---

## 11. LocalStorage Mock Auth

Buat `src/lib/mock-auth.ts`:

```ts
export function setMockRole(role: "teacher" | "student") {
  if (typeof window !== "undefined") {
    localStorage.setItem("ecogrow-role", role)
  }
}

export function getMockRole() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("ecogrow-role")
}

export function clearMockRole() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("ecogrow-role")
  }
}
```

Gunakan ini untuk role selector saja. Jangan buat autentikasi sungguhan pada tahap prototype.

---

## 12. UX Microcopy

Gunakan kalimat ramah anak.

Contoh:
- “Ayo lanjutkan misi hijau hari ini!”
- “Tanamanmu tumbuh hebat!”
- “Wah, kamu mendapat badge Penjaga Tunas.”
- “Ceritakan apa yang kamu pelajari hari ini.”
- “Tidak apa-apa jika tanamanmu belum tumbuh optimal. Yuk cari solusinya.”
- “Berguru pada Bumi, panen pengetahuan.”

Untuk guru:
- “Pantau perkembangan Eco Explorer hari ini.”
- “3 kelompok sudah mengirim jurnal tanaman.”
- “Ada 2 siswa yang disarankan mengikuti penguatan konsep.”
- “Proyek kangkung hidroponik berjalan 68%.”

---

## 13. Kriteria Selesai Prototype

Prototype dianggap selesai jika:

1. Semua route prioritas dapat dibuka.
2. Role selector berjalan dengan localStorage.
3. Guru dapat melihat dashboard, proyek, monitoring, dan analitik.
4. Siswa dapat membuka EcoLearn, EcoMission, EcoPlay, Ecomart, dan Portofolio.
5. Jurnal tanaman dapat disubmit secara mock dan memengaruhi state/localStorage.
6. Quiz sederhana dapat dimainkan.
7. Badge, level, poin, dan progress terlihat.
8. Grafik Recharts tampil dari mock data.
9. Semua komponen responsive.
10. Tidak ada error TypeScript.
11. Tidak ada backend atau database sungguhan.
12. Mock data mudah dipindahkan ke backend pada tahap berikutnya.
