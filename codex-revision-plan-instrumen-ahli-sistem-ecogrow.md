# Rencana Revisi Project EcoGrow Learning LMS Berdasarkan Instrumen Ahli Sistem dan Muatan Modul

## 1. Tujuan Dokumen

Dokumen ini merupakan prompt teknis dan fungsional yang siap dieksekusi oleh Codex untuk merevisi project **EcoGrow Learning LMS** berdasarkan:

1. **Instrumen Kelayakan Ahli Sistem EcoGrow Learning**.
2. **Project terbaru EcoGrow Learning(2).zip**.
3. **Deployment Vercel terbaru** pada `https://eco-grow-learning.vercel.app/#alur-ecogrow`.
4. **Muatan Perangkat Pembelajaran EcoGrow Learning**, khususnya modul IPAS Fase B Kelas 4, LKPD Digital, asesmen diagnostik, formatif, sumatif, refleksi, portofolio, Eco-Exhibition, dan alur LMS.

Revisi ini tetap berfokus pada **frontend prototype berbasis mock data**. Jangan menambahkan backend produksi dan jangan menambahkan role Admin pada tahap ini.

Target akhir revisi adalah meningkatkan kelayakan sistem agar lebih siap dinilai oleh ahli sistem, terutama pada aspek:

- Tampilan antarmuka.
- Kemudahan penggunaan.
- Navigasi, struktur menu, dan aksesibilitas.
- Interaktivitas dan gamifikasi.
- Pengelolaan materi dan alur pembelajaran.
- Asesmen, evaluasi, dan monitoring.
- Kelayakan teknis.

---

## 2. Ringkasan Instrumen Ahli Sistem

Instrumen ahli sistem menilai LMS EcoGrow Learning menggunakan skala Likert 1 sampai 5:

| Skor | Kategori |
|---:|---|
| 5 | Sangat Layak |
| 4 | Layak |
| 3 | Cukup Layak |
| 2 | Kurang Layak |
| 1 | Tidak Layak |

Kategori kelayakan akhir:

| Persentase | Kesimpulan |
|---:|---|
| 76-100% | Dapat digunakan tanpa revisi |
| 51-75% | Dapat digunakan dengan revisi minor |
| 26-50% | Dapat digunakan dengan revisi mayor |
| 0-25% | Tidak dapat digunakan |

Agar LMS berpeluang memperoleh skor tinggi, semua revisi harus dikaitkan langsung dengan butir penilaian pada instrumen.

---

## 3. Pemetaan Instrumen Menjadi Kebutuhan Revisi

### 3.1 Tampilan Antarmuka

Butir yang dinilai:

- Warna, ikon, dan elemen visual konsisten dengan tema ekologis.
- Ukuran teks, layout, kartu, tombol, badge, dan progress bar proporsional.
- Tampilan menarik, rapi, dan tidak membingungkan siswa sekolah dasar.

Implikasi revisi:

- Pastikan halaman siswa tidak terlalu padat.
- Gunakan warna hijau, navy, dan kuning secara konsisten.
- Gunakan ikon yang mudah dikenali siswa SD.
- Hindari tabel kompleks pada halaman siswa.
- Gunakan kartu besar, tombol jelas, dan feedback visual.
- Pastikan semua halaman memiliki spacing yang konsisten.

### 3.2 Kemudahan Penggunaan

Butir yang dinilai:

- Guru dan siswa dapat mengoperasikan LMS tanpa pelatihan khusus.
- Pengguna dapat menyelesaikan tugas seperti membuat modul, mengirim jurnal, dan mengisi kuis melalui langkah efisien.
- Sistem responsif di desktop, tablet, dan mobile.

Implikasi revisi:

- Siswa harus selalu tahu aksi berikutnya.
- Guru harus dapat memberi feedback dalam sedikit klik.
- EcoReadiness, EcoMission, EcoMaster Quiz, dan Cerita Belajarku harus dibuat sebagai alur bertahap.
- Tambahkan empty state, success state, dan error state mock.
- Pastikan layout mobile memakai bottom navigation atau drawer sederhana.

### 3.3 Navigasi, Struktur Menu, dan Aksesibilitas

Butir yang dinilai:

- Menu ruang guru tersusun jelas dan logis.
- Menu ruang siswa tersusun sesuai alur belajar.
- Login dan registrasi dengan pemilihan role guru/siswa berjalan mudah.
- Pemisahan akses ruang guru dan siswa tepat.

Implikasi revisi:

- Pertahankan role hanya **guru** dan **siswa** pada tahap ini.
- Jangan menambahkan role Admin.
- Pastikan route siswa dan guru tetap terpisah.
- Jangan gunakan auto-bypass session yang membingungkan penilaian hak akses.
- Navigasi siswa harus mengutamakan alur belajar, bukan daftar fitur.

### 3.4 Interaktivitas dan Gamifikasi

Butir yang dinilai:

- Mini-check EcoLearn, jurnal EcoMission, kuis EcoPlay, unggah Galeri, dan EcoChallenge berfungsi baik.
- Fitur guru seperti generator modul AI/mock, monitoring jurnal, feedback, dan moderasi galeri efektif.
- Gamifikasi EcoPoint, level Benih sampai Eco Master, badge, dan progress bar memotivasi siswa.
- EcoGrow Assistant responsif dan relevan.

Implikasi revisi:

- Semua tombol aksi harus memberikan respon mock.
- EcoPlay perlu benar-benar interaktif, bukan hanya daftar game.
- Galeri perlu simulasi upload, preview, status moderasi, dan apresiasi.
- Monitoring guru perlu template feedback cepat.
- EcoGrow Assistant perlu fallback jawaban lokal jika API gagal.

### 3.5 Pengelolaan Materi dan Alur Pembelajaran

Butir yang dinilai:

- Konten EcoLearn tentang ekologi, hidroponik, fotosintesis, kompos, dan iklim disajikan ringkas dan sesuai usia SD.
- Materi dan misi mengikuti tahapan EcoGrow/Pancaniti secara runtut.
- Generator Modul Ajar membantu guru menyusun, mengedit, dan mempublikasikan modul Kurikulum Merdeka.
- Instruksi EcoMission mudah dipahami siswa SD tanpa bantuan tambahan.

Implikasi revisi:

- Tambahkan konten EcoLearn yang lebih lengkap tetapi tetap microlearning.
- Perkuat keterhubungan antara modul ajar guru dan misi siswa.
- Generator modul harus memiliki form, preview, checklist kelengkapan, tombol gunakan, edit, cetak, dan publish mock.
- Misi harus menampilkan instruksi 3 sampai 5 langkah sederhana.

### 3.6 Asesmen, Evaluasi, dan Monitoring

Butir yang dinilai:

- EcoMaster Quiz menyediakan diagnostik, formatif, sumatif, dan refleksi sesuai Kurikulum Merdeka.
- Guru dapat memantau dan memberi feedback terhadap jurnal, misi, dan progres siswa.
- Dashboard guru menampilkan ringkasan kelas secara informatif.
- Analitik menyajikan grafik pertumbuhan tanaman, distribusi badge, dan risiko belajar.

Implikasi revisi:

- Pisahkan konsep EcoReadiness, EcoMission Checkpoint, EcoMaster Quiz, dan Reflection sebagai bagian asesmen yang saling terhubung.
- Tambahkan soal/jawaban yang cukup untuk mock data.
- Tambahkan rekomendasi remedial dan pengayaan berdasarkan skor.
- Tambahkan chart pertumbuhan tanaman dan chart badge di analitik guru.
- Tambahkan status risiko belajar: aman, perlu perhatian, perlu pendampingan.

### 3.7 Kelayakan Teknis

Butir yang dinilai:

- Sistem stabil dan tidak mengalami error berarti.
- Portofolio digital merekam jurnal, kuis, galeri, refleksi, badge, dan EcoChallenge.
- Cerita Belajarku dan Galeri Project mendokumentasikan karya serta perkembangan karakter KAIH.
- LMS sesuai kebutuhan PBL untuk jenjang SD.

Implikasi revisi:

- Pastikan `npm run typecheck` dan `npm run build` berhasil.
- Hapus `.env.local` dari project dan ZIP.
- Jangan menyimpan API key pada repository.
- Buat fallback mock jika EcoGrow Assistant gagal.
- Pastikan portofolio menyatukan semua evidence belajar.

---

## 4. Temuan Project Terbaru EcoGrow Learning(2).zip

### 4.1 Hal yang Sudah Baik

Project terbaru sudah memiliki struktur fitur yang cukup lengkap:

```text
src/features/student/
src/features/teacher/
src/components/student/
src/components/teacher/
src/components/shared/
src/data/
src/mock/repositories/
```

Route utama sudah tersedia:

```text
/
/login
/register
/unauthorized

/siswa
/siswa/ecoreadiness
/siswa/ecomission
/siswa/ecolearn
/siswa/ecoplay
/siswa/ecomaster-quiz
/siswa/cerita-belajarku
/siswa/ecochallenge
/siswa/ecomart
/siswa/galeri
/siswa/portofolio
/siswa/laporan-belajar

/guru
/guru/modul-ajar
/guru/proyek
/guru/monitoring
/guru/asesmen
/guru/laporan
/guru/analitik
/guru/galeri
/guru/panduan
```

Fitur yang sudah terlihat cukup kuat:

- Landing page sudah menjelaskan EcoGrow, alur, fitur, dampak, muatan pembelajaran, SDGs, dan kearifan lokal.
- EcoReadiness di source sudah menjadi wizard 4 langkah.
- EcoMaster Quiz sudah memiliki feedback langsung.
- Cerita Belajarku sudah memiliki mood picker dan cek usaha.
- Portofolio dan laporan belajar siswa sudah tersedia.
- Guru memiliki dashboard, modul ajar, proyek, monitoring, asesmen, laporan, analitik, galeri, dan panduan.
- Sudah ada mock data modul ajar, soal, LKPD, rubrik, dan alur UX.

### 4.2 Hal yang Perlu Diperbaiki

Masalah utama yang masih perlu ditangani:

1. **Deployment harus dipastikan sinkron dengan source terbaru.**  
   Pada deployment, landing page sudah baik, tetapi beberapa halaman yang sebelumnya terlihat belum selalu mencerminkan source terbaru. Setelah revisi, lakukan redeploy dan cek ulang.

2. **File `.env.local` masih ikut dalam ZIP.**  
   File ini memuat `GEMINI_API_KEY` dan `GEMINI_MODEL`. Hapus dari repository/ZIP, tambahkan `.env.example`, dan rotate API key.

3. **Landing page masih memakai `next/font/google` untuk Fraunces dan Nunito Sans.**  
   Ini berpotensi membuat build gagal jika environment tidak dapat mengambil Google Fonts. Ganti dengan font lokal atau fallback CSS.

4. **Masih ada penamaan internal lama seperti `PancanitiStage` dan `PancanitiStepper`.**  
   Secara UI boleh menyebut Niti Harti sampai Niti Sajati sebagai istilah lokal, tetapi secara arsitektur frontend lebih bersih jika nama utama memakai `EcoGrowStage` dan `EcoGrowStepper`.

5. **EcoGrow Assistant perlu fallback mock.**  
   Instrumen menilai assistant berbasis Gemini. Jika API gagal, pengguna tetap harus menerima jawaban lokal yang relevan.

6. **EcoPlay perlu dipastikan benar-benar interaktif.**  
   Instrumen menilai kuis EcoPlay. Jika masih sebagian berupa card daftar game, tambahkan interaksi mini game mock.

7. **Galeri siswa dan guru perlu simulasi upload, moderasi, apresiasi, dan status.**  
   Instrumen menilai unggah Galeri dan moderasi guru.

8. **Generator modul perlu dipastikan memiliki flow lengkap.**  
   Minimal: form input, generate mock, preview, edit, publish, cetak mock, dan checklist kelengkapan.

9. **Analitik guru perlu memuat grafik yang dinilai instrumen.**  
   Minimal: grafik pertumbuhan tanaman, distribusi badge, risiko belajar, progress tahap EcoGrow.

10. **Portofolio digital harus menggabungkan evidence dari seluruh fitur.**  
    Minimal: jurnal, kuis, galeri, refleksi, badge, EcoChallenge, Eco-Exhibition, feedback guru.

---

## 5. Revisi Teknis Prioritas Tinggi

### 5.1 Hapus `.env.local` dan Amankan Konfigurasi

Instruksi untuk Codex:

1. Hapus `.env.local` dari project yang akan dikirim atau di-commit.
2. Tambahkan `.env.example`:

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-1.5-flash
```

3. Pastikan `.gitignore` memuat:

```gitignore
.env
.env.local
.env*.local
```

4. Jangan pernah menampilkan API key di UI, console, README, atau mock data.
5. Tambahkan fallback jika env tidak tersedia.

Acceptance criteria:

- `.env.local` tidak ada di ZIP final.
- `.env.example` tersedia.
- Assistant tetap berjalan dengan fallback mock jika API key tidak tersedia.

### 5.2 Ganti `next/font/google`

Masalah:

`src/components/landing/LandingPage.tsx` menggunakan:

```ts
import { Fraunces, Nunito_Sans } from "next/font/google";
```

Instruksi:

- Hapus dependency `next/font/google` dari landing page.
- Gunakan font stack lokal melalui CSS class.
- Alternatif aman:

```css
:root {
  --font-landing-body: "Nunito Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-landing-heading: "Fraunces", Georgia, "Times New Roman", serif;
}
```

- Jika tidak ada file font lokal, gunakan fallback system terlebih dahulu.

Acceptance criteria:

- `npm run build` tidak gagal karena fetch Google Fonts.
- Landing page tetap terlihat rapi.

### 5.3 Jalankan Pemeriksaan Build

Tambahkan checklist eksekusi:

```bash
npm ci
npm run typecheck
npm run build
```

Jika ada test contract, jalankan:

```bash
node --test --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON src/**/*.test.mjs
```

Acceptance criteria:

- Typecheck berhasil.
- Build berhasil.
- Contract test yang tersedia tidak gagal.

---

## 6. Revisi Landing Page

Deployment landing page sudah kuat karena menampilkan hero, masalah-solusi, konsep LMS, alur EcoGrow, fitur, dampak, muatan pembelajaran, SDGs, dan CTA. Revisi berikut tetap diperlukan untuk menutup indikator instrumen.

### 6.1 Revisi Yang Perlu Dilakukan

1. Tambahkan anchor jelas untuk semua section:
   - `#mengapa`
   - `#alur-ecogrow`
   - `#fitur`
   - `#dampak`
   - `#muatan`
   - `#sdgs`

2. Tambahkan section kecil **Kelayakan Sistem** yang menjelaskan LMS sudah mendukung:
   - role siswa dan guru,
   - EcoLearn,
   - EcoMission,
   - EcoPlay,
   - Galeri Project,
   - EcoChallenge,
   - Ecomart,
   - EcoMaster Quiz,
   - Cerita Belajarku,
   - Portofolio,
   - Dashboard Guru.

3. Perjelas bahwa role Admin belum dikembangkan pada versi frontend mock ini.

4. Pastikan CTA terlihat di hero dan bagian akhir:
   - `Jelajahi sebagai Siswa`
   - `Masuk sebagai Guru`

5. Pada section muatan pembelajaran, tampilkan alur:

```text
Modul Ajar → EcoReadiness → EcoLearn → EcoMission/LKPD → Jurnal → EcoMaster Quiz → Eco-Exhibition → Portofolio
```

Acceptance criteria:

- Pengunjung memahami fungsi LMS dalam 10 detik.
- Landing tidak terasa seperti dokumen akademik.
- CTA role siswa dan guru jelas.
- Alur EcoGrow tetap memakai istilah EcoGrow utama, sedangkan Niti Harti sampai Niti Sajati sebagai pendamping.

---

## 7. Revisi Navigasi dan Hak Akses

### 7.1 Navigasi Siswa

Pertahankan pengelompokan:

```ts
siswaPrimaryNavigation = [
  "Beranda",
  "Misi",
  "Belajar",
  "Bermain",
  "Cerita",
  "Album Belajarku"
]

siswaSecondaryNavigation = [
  "Galeri",
  "Kuis Akhir",
  "Laporan Belajar",
  "Tantangan Rumah",
  "Panen"
]
```

Revisi:

- Pada mobile, tampilkan maksimal 5 menu:
  - Beranda
  - Misi
  - Belajar
  - Bermain
  - Lainnya
- Pastikan drawer `Lainnya` menampilkan Cerita, Album, Galeri, Kuis Akhir, Laporan, Tantangan Rumah, dan Panen.

### 7.2 Navigasi Guru

Pertahankan menu:

- Ringkasan
- Modul Ajar
- Proyek
- Monitoring
- Asesmen
- Laporan
- Analitik
- Galeri
- Panduan

Revisi:

- Tambahkan badge kecil pada menu Monitoring jika ada submission menunggu.
- Tambahkan badge kecil pada Galeri jika ada karya menunggu moderasi.
- Tambahkan tooltip atau helper singkat pada mobile.

### 7.3 Hak Akses

Instruksi:

- Pastikan user dengan role siswa tidak bisa membuka `/guru/*`.
- Pastikan user dengan role guru tidak diarahkan ke `/siswa/*` kecuali logout/switch role.
- Jangan membuat auto-fallback session yang membuat halaman protected terbuka tanpa login.
- Jika masih menggunakan mock, buat role selector jelas di login.

Acceptance criteria:

- Login siswa masuk ke `/siswa`.
- Login guru masuk ke `/guru`.
- Akses role salah diarahkan ke `/unauthorized`.

---

## 8. Revisi EcoReadiness

EcoReadiness sudah menjadi wizard pada source. Pertahankan dan lengkapi agar lebih sesuai instrumen.

### 8.1 Tujuan Fitur

EcoReadiness adalah asesmen diagnostik awal untuk memetakan:

- pengetahuan awal fotosintesis,
- kesadaran ekologis,
- kebutuhan tumbuhan,
- minat belajar,
- gaya belajar,
- akhlak kepada alam,
- kemampuan membaca data sederhana,
- kesiapan kolaborasi.

### 8.2 Perbaikan UI

- Gunakan istilah `Kuis Awal`, bukan `Asesmen Diagnostik` pada UI siswa.
- Satu step maksimal 2 soal.
- Tampilkan progress bar 4 langkah.
- Tampilkan feedback setelah selesai.
- Hasil harus mengarahkan ke EcoLearn.

### 8.3 Mock Data Soal EcoReadiness

Tambahkan atau pastikan soal berikut ada di `src/data/ecogrow-assessments.ts`.

```ts
export const ecoReadinessQuestions = [
  {
    id: "diag-1",
    kind: "diagnostic",
    format: "single_choice",
    stageId: "NITI_HARTI",
    topic: "Pengetahuan awal fotosintesis",
    question: "Menurutmu, bagaimana tumbuhan mendapatkan makanan?",
    options: [
      "Dari tanah saja",
      "Dari air saja",
      "Membuat sendiri dengan bantuan cahaya matahari",
      "Tidak tahu"
    ],
    answer: "Membuat sendiri dengan bantuan cahaya matahari",
    explanation: "Tumbuhan membuat makanan melalui fotosintesis dengan bantuan cahaya matahari.",
    points: 10
  },
  {
    id: "diag-2",
    kind: "diagnostic",
    format: "single_choice",
    stageId: "NITI_HARTI",
    topic: "Kesadaran lingkungan",
    question: "Apa yang sebaiknya dilakukan ketika melihat sampah daun atau sisa makanan di sekolah?",
    options: ["Membiarkannya", "Membuang sembarangan", "Mengolahnya menjadi kompos", "Menginjaknya"],
    answer: "Mengolahnya menjadi kompos",
    explanation: "Sampah organik dapat diolah menjadi kompos yang bermanfaat bagi tanaman.",
    points: 10,
    kaihFocus: ["ekologis", "inovatif"]
  },
  {
    id: "diag-3",
    kind: "diagnostic",
    format: "single_choice",
    stageId: "NITI_HARTI",
    topic: "Kebutuhan tumbuhan",
    question: "Hal yang paling dibutuhkan tanaman agar tetap hidup adalah...",
    options: ["Air, cahaya, udara, dan media tumbuh", "Plastik dan kaca", "Cat dan logam", "Mainan dan kertas"],
    answer: "Air, cahaya, udara, dan media tumbuh",
    explanation: "Tanaman membutuhkan air, cahaya, udara, dan media tumbuh.",
    points: 10
  },
  {
    id: "diag-4",
    kind: "diagnostic",
    format: "single_choice",
    stageId: "NITI_HARTI",
    topic: "Minat belajar",
    question: "Kegiatan mana yang paling ingin kamu lakukan dalam proyek EcoGrow?",
    options: ["Mengamati tanaman", "Mengukur tinggi tanaman", "Membuat poster", "Menceritakan hasil belajar"],
    points: 0
  },
  {
    id: "diag-5",
    kind: "diagnostic",
    format: "single_choice",
    stageId: "NITI_HARTI",
    topic: "Gaya belajar",
    question: "Kamu paling mudah memahami materi jika belajar dengan cara...",
    options: ["Melihat gambar atau video", "Mendengar penjelasan", "Mencoba langsung", "Berdiskusi dengan teman"],
    points: 0
  },
  {
    id: "diag-6",
    kind: "diagnostic",
    format: "single_choice",
    stageId: "NITI_HARTI",
    topic: "Akhlak kepada alam",
    question: "Sikap terbaik saat merawat tanaman sekolah adalah...",
    options: ["Menyiram berlebihan", "Merawat secukupnya dan tidak merusak", "Mencabut daun tanpa alasan", "Membiarkan tanaman layu"],
    answer: "Merawat secukupnya dan tidak merusak",
    points: 10,
    kaihFocus: ["ekologis", "humanis"]
  },
  {
    id: "diag-7",
    kind: "diagnostic",
    format: "single_choice",
    stageId: "NITI_HARTI",
    topic: "Data sederhana",
    question: "Agar pertumbuhan tanaman dapat dibandingkan, data yang perlu dicatat adalah...",
    options: ["Tinggi tanaman dan jumlah daun", "Warna meja", "Jumlah sepatu", "Nama permainan"],
    answer: "Tinggi tanaman dan jumlah daun",
    points: 10
  },
  {
    id: "diag-8",
    kind: "diagnostic",
    format: "single_choice",
    stageId: "NITI_HARTI",
    topic: "Kesiapan kolaborasi",
    question: "Saat bekerja dalam kelompok, sikap yang sesuai dengan EcoGrow adalah...",
    options: ["Berbagi tugas dan saling membantu", "Mengerjakan sendiri semuanya", "Menyalahkan teman", "Tidak berdiskusi"],
    answer: "Berbagi tugas dan saling membantu",
    points: 10,
    kaihFocus: ["humanis", "mandiri"]
  }
];
```

Acceptance criteria:

- Siswa melihat 4 langkah singkat.
- Hasil akhir menyebut gaya belajar, minat, dan rekomendasi materi.
- Data tersimpan di localStorage/mock repository.
- EcoReadiness mengarahkan ke EcoLearn.

---

## 9. Revisi EcoLearn

### 9.1 Tujuan

EcoLearn harus menyajikan materi ringkas sesuai usia SD tentang:

- fotosintesis,
- hidroponik,
- kompos,
- siklus tumbuhan,
- perubahan iklim,
- pangan sehat,
- kebun sekolah.

### 9.2 Revisi Fitur

Tambahkan tab atau kartu microlearning:

```text
Video Singkat
Bacaan Ringkas
Gambar/Infografik
Kuis Mini
Misi Terkait
```

### 9.3 Mock Data Materi EcoLearn

Tambahkan data berikut:

```ts
export const ecoLearnTopics = [
  {
    id: "learn-fotosintesis",
    title: "Mengapa tanaman butuh cahaya?",
    stageId: "NITI_SURTI",
    reading: "Tanaman menggunakan cahaya matahari untuk membantu membuat makanan di daun. Proses ini disebut fotosintesis. Dari proses ini, tanaman juga menghasilkan oksigen yang dibutuhkan manusia dan hewan.",
    keyPoints: [
      "Daun membantu tanaman membuat makanan.",
      "Cahaya matahari membantu proses fotosintesis.",
      "Air, udara, dan media tumbuh membantu tanaman tetap sehat."
    ],
    miniQuiz: [
      {
        question: "Bagian tumbuhan yang paling banyak membantu fotosintesis adalah...",
        options: ["Akar", "Daun", "Batang", "Bunga"],
        answer: "Daun",
        feedback: "Daun memiliki zat hijau daun yang membantu menangkap cahaya."
      }
    ],
    relatedMissionId: "mission-kangkung-hydroponic"
  },
  {
    id: "learn-kompos",
    title: "Mengapa sisa daun bisa jadi kompos?",
    stageId: "NITI_SURTI",
    reading: "Sisa daun dan sisa makanan termasuk sampah organik. Sampah ini dapat diolah menjadi kompos yang membantu menyuburkan tanaman.",
    keyPoints: [
      "Sampah organik bisa membusuk secara alami.",
      "Kompos membantu media tanam menjadi lebih subur.",
      "Mengolah kompos membantu mengurangi sampah."
    ],
    miniQuiz: [
      {
        question: "Contoh sampah organik adalah...",
        options: ["Daun kering", "Botol plastik", "Kaca", "Kaleng"],
        answer: "Daun kering",
        feedback: "Daun kering dapat diolah menjadi kompos."
      }
    ],
    relatedMissionId: "mission-kompos-mini"
  },
  {
    id: "learn-hidroponik",
    title: "Apa itu hidroponik sederhana?",
    stageId: "NITI_BUKTI",
    reading: "Hidroponik adalah cara menanam menggunakan air bernutrisi tanpa tanah. Siswa dapat mengamati akar, air, cahaya, dan pertumbuhan tanaman secara langsung.",
    keyPoints: [
      "Hidroponik menggunakan air bernutrisi.",
      "Tanaman tetap membutuhkan cahaya.",
      "Air perlu dicek agar tanaman tidak layu."
    ],
    miniQuiz: [
      {
        question: "Dalam hidroponik, tanaman tumbuh terutama dengan bantuan...",
        options: ["Air bernutrisi", "Cat", "Pasir mainan", "Kertas warna"],
        answer: "Air bernutrisi",
        feedback: "Air bernutrisi membantu tanaman mendapatkan kebutuhan tumbuh."
      }
    ],
    relatedMissionId: "mission-kangkung-hydroponic"
  }
];
```

Acceptance criteria:

- Materi ringkas dan tidak berupa paragraf panjang.
- Ada kuis mini pada tiap topik.
- Setiap topik mengarah ke EcoMission terkait.
- Ada feedback kuis mini.

---

## 10. Revisi EcoMission dan LKPD Digital

### 10.1 Tujuan

EcoMission adalah asesmen formatif dan LKPD digital interaktif. Instrumen menilai apakah instruksi dan daftar tugas pada misi mudah dipahami siswa SD.

### 10.2 Revisi Fitur

Pastikan EcoMission memiliki:

- mission hero,
- tahap EcoGrow aktif,
- instruksi singkat,
- checklist tugas,
- form bukti,
- upload mock dengan preview,
- feedback sukses,
- rekomendasi langkah berikutnya,
- integrasi ke monitoring guru.

### 10.3 LKPD Digital Mock Data

Gunakan atau tambahkan LKPD berikut:

```ts
export const ecogrowDigitalLkpd = [
  {
    id: "lkpd-recognition",
    title: "LKPD 1: Mengamati Bagian Tumbuhan",
    stageId: "NITI_HARTI",
    instruction: "Amati tanaman kangkung atau tanaman lain di sekitar sekolah. Catat bagian yang terlihat.",
    fields: [
      { id: "plantName", label: "Nama tanaman", type: "text", placeholder: "Contoh: Kangkung", required: true },
      { id: "leafColor", label: "Warna daun", type: "text", placeholder: "Contoh: Hijau muda", required: true },
      { id: "plantParts", label: "Bagian tumbuhan yang terlihat", type: "checklist", options: ["Akar", "Batang", "Daun", "Bunga", "Buah"], required: true },
      { id: "bioticAbiotic", label: "Komponen biotik dan abiotik", type: "textarea", required: true },
      { id: "question", label: "Pertanyaan awalmu", type: "textarea", required: true }
    ],
    evidenceRequired: ["Catatan observasi", "Foto tanaman"],
    points: 100
  },
  {
    id: "lkpd-exploration",
    title: "LKPD 2: Prediksi Cahaya, Air, dan Pertumbuhan",
    stageId: "NITI_SURTI",
    instruction: "Hubungkan hasil pengamatan dengan dugaanmu tentang kebutuhan tanaman.",
    fields: [
      { id: "sunlightPrediction", label: "Apa yang terjadi jika tanaman kurang cahaya?", type: "textarea", required: true },
      { id: "waterPrediction", label: "Apa yang terjadi jika tanaman kekurangan air?", type: "textarea", required: true },
      { id: "solutionIdea", label: "Solusi agar tanaman tetap sehat", type: "textarea", required: true },
      { id: "groupDiscussion", label: "Hasil diskusi kelompok", type: "textarea" }
    ],
    evidenceRequired: ["Prediksi kelompok", "Catatan diskusi"],
    points: 120
  },
  {
    id: "lkpd-execution",
    title: "LKPD 3: Jurnal Ekologis Tanaman",
    stageId: "NITI_BUKTI",
    instruction: "Isi data pengamatan tanaman setiap selesai melakukan perawatan.",
    fields: [
      { id: "date", label: "Tanggal pengamatan", type: "date", required: true },
      { id: "height", label: "Tinggi tanaman dalam cm", type: "number", required: true },
      { id: "leafCount", label: "Jumlah daun", type: "number", required: true },
      { id: "condition", label: "Kondisi tanaman", type: "select", options: ["Sehat", "Layu", "Menguning", "Perlu perawatan"], required: true },
      { id: "water", label: "Volume air atau nutrisi dalam ml", type: "number" },
      { id: "note", label: "Catatan pengamatan", type: "textarea", required: true },
      { id: "photoUrl", label: "Foto bukti", type: "image_url" }
    ],
    evidenceRequired: ["Data tinggi", "Jumlah daun", "Catatan kondisi", "Foto bukti"],
    points: 150
  },
  {
    id: "lkpd-reflection",
    title: "LKPD 4: Cerita Belajarku dan Janji Aksi Ekologis",
    stageId: "NITI_BAKTI",
    instruction: "Tuliskan perasaan, pelajaran, kendala, solusi, dan janji aksi ekologismu.",
    fields: [
      { id: "feeling", label: "Bagaimana perasaanmu selama kegiatan?", type: "textarea", required: true },
      { id: "favoriteActivity", label: "Bagian kegiatan yang paling disukai", type: "textarea", required: true },
      { id: "newUnderstanding", label: "Hal baru yang kamu pahami", type: "textarea", required: true },
      { id: "simpleAction", label: "Tindakan sederhana setelah pembelajaran", type: "textarea", required: true },
      { id: "ecologicalPromise", label: "Janji Aksi Ekologis", type: "textarea", required: true }
    ],
    evidenceRequired: ["Refleksi", "Janji aksi"],
    points: 100
  },
  {
    id: "lkpd-exhibition",
    title: "LKPD 5: Eco-Exhibition",
    stageId: "NITI_SAJATI",
    instruction: "Siapkan karya akhir untuk pameran EcoGrow kelas.",
    fields: [
      { id: "productTitle", label: "Judul karya", type: "text", required: true },
      { id: "productType", label: "Jenis karya", type: "select", options: ["Poster", "Foto cerita", "Laporan proyek", "Video singkat", "Produk panen"], required: true },
      { id: "mainMessage", label: "Pesan utama karya", type: "textarea", required: true },
      { id: "dataUsed", label: "Data atau bukti yang digunakan", type: "textarea", required: true },
      { id: "galleryImageUrl", label: "Gambar atau video karya", type: "image_url" }
    ],
    evidenceRequired: ["Poster/foto/laporan", "Presentasi", "Data pendukung"],
    points: 200
  }
];
```

Acceptance criteria:

- Misi siswa menampilkan instruksi sederhana.
- Field LKPD tidak terlalu panjang pada satu layar; gunakan stepper per tahap.
- Evidence yang dikirim siswa muncul di monitoring guru secara mock.
- Setelah submit, siswa diarahkan ke Cerita Belajarku atau Portofolio.

---

## 11. Revisi EcoPlay

### 11.1 Masalah

EcoPlay harus dinilai sebagai fitur interaktif. Jika hanya berupa daftar game, skor instrumen dapat rendah.

### 11.2 Fitur Yang Harus Ditambahkan

Tambahkan minimal 3 mini game mock interaktif:

1. **Urutkan Proses Fotosintesis**
2. **Tebak Bagian Tumbuhan**
3. **Jika-Maka Tanaman Sehat**

### 11.3 Mock Data EcoPlay

```ts
export const ecoPlayGames = [
  {
    id: "game-fotosintesis-order",
    title: "Urutkan Proses Fotosintesis",
    type: "sequence",
    instruction: "Susun langkah sederhana bagaimana tanaman membuat makanan.",
    items: ["Cahaya matahari mengenai daun", "Akar menyerap air", "Daun membuat makanan", "Tanaman tumbuh sehat"],
    correctOrder: ["Cahaya matahari mengenai daun", "Akar menyerap air", "Daun membuat makanan", "Tanaman tumbuh sehat"],
    points: 30,
    badge: "Penyusun Proses"
  },
  {
    id: "game-plant-part",
    title: "Tebak Bagian Tumbuhan",
    type: "single_choice",
    instruction: "Pilih bagian tumbuhan yang membantu fotosintesis.",
    question: "Bagian tumbuhan yang menangkap cahaya adalah...",
    options: ["Daun", "Akar", "Pot", "Kerikil"],
    answer: "Daun",
    points: 20,
    badge: "Sahabat Daun"
  },
  {
    id: "game-if-then-plant",
    title: "Jika-Maka Tanaman Sehat",
    type: "decision",
    instruction: "Pilih tindakan terbaik berdasarkan kondisi tanaman.",
    scenarios: [
      {
        if: "Daun menguning dan air tinggal sedikit",
        options: ["Tambah air secukupnya dan catat perubahan", "Cabut tanaman", "Biarkan saja"],
        answer: "Tambah air secukupnya dan catat perubahan"
      },
      {
        if: "Media tanam berbau busuk",
        options: ["Laporkan ke guru dan cek kebersihan wadah", "Tambahkan sampah", "Tutup dengan plastik"],
        answer: "Laporkan ke guru dan cek kebersihan wadah"
      }
    ],
    points: 30,
    badge: "Pemecah Masalah Hijau"
  }
];
```

Acceptance criteria:

- Setiap game dapat diklik dan dimainkan secara mock.
- Setelah selesai, tampilkan skor, EcoPoint, dan badge.
- Hasil EcoPlay masuk ke Portofolio.

---

## 12. Revisi EcoMaster Quiz

### 12.1 Tujuan

EcoMaster Quiz adalah asesmen sumatif. Berdasarkan muatan modul, quiz harus menilai penguasaan konsep secara menyeluruh, kemampuan mengaitkan konsep dengan kehidupan nyata, HOTS, dan memberi umpan balik instan.

### 12.2 Perbaikan Fitur

- Tampilkan satu soal per layar.
- Setelah jawab, tampilkan feedback langsung.
- Tampilkan skor akhir, badge, rekomendasi remedial/pengayaan.
- Hubungkan hasil ke Laporan Belajar dan Portofolio.

### 12.3 Mock Data Soal Sumatif

Tambahkan minimal 10 soal agar lebih kuat untuk instrumen.

```ts
export const ecoMasterSummativeQuestions = [
  {
    id: "sum-1",
    kind: "summative",
    format: "single_choice",
    topic: "Fotosintesis",
    question: "Mengapa fotosintesis penting bagi kehidupan manusia?",
    options: ["Menghasilkan makanan tumbuhan dan oksigen", "Membuat tanah menjadi plastik", "Menghilangkan semua air", "Membuat tanaman tidak perlu cahaya"],
    answer: "Menghasilkan makanan tumbuhan dan oksigen",
    explanation: "Fotosintesis menghasilkan makanan bagi tumbuhan dan oksigen bagi makhluk hidup.",
    bloomLevel: "C4",
    soloLevel: "Relational",
    points: 10
  },
  {
    id: "sum-2",
    kind: "summative",
    format: "single_choice",
    topic: "Analisis data pertumbuhan",
    question: "Kelompok A mendapat cahaya dan air stabil, sedangkan kelompok B sering kekurangan air. Tanaman A lebih tinggi. Kesimpulan tepat adalah...",
    options: ["Cahaya dan air stabil kemungkinan mendukung pertumbuhan", "Kelompok B pasti malas", "Tanaman tidak membutuhkan air", "Data tidak perlu dibandingkan"],
    answer: "Cahaya dan air stabil kemungkinan mendukung pertumbuhan",
    explanation: "Kesimpulan dibuat berdasarkan data perawatan dan pertumbuhan.",
    bloomLevel: "C4",
    soloLevel: "Relational",
    points: 15
  },
  {
    id: "sum-3",
    kind: "summative",
    format: "single_choice",
    topic: "Evaluasi tindakan ekologis",
    question: "Jika air nutrisi keruh dan tanaman mulai layu, keputusan paling tepat adalah...",
    options: ["Mengganti air sesuai arahan, mencatat kondisi, dan mengamati perubahan", "Menghapus catatan", "Menambah air tanpa mengukur", "Membiarkan tanaman"],
    answer: "Mengganti air sesuai arahan, mencatat kondisi, dan mengamati perubahan",
    explanation: "Tindakan ekologis perlu dicatat agar dapat dievaluasi.",
    bloomLevel: "C5",
    soloLevel: "Relational",
    points: 15,
    kaihFocus: ["adaptif", "mandiri"]
  },
  {
    id: "sum-4",
    kind: "summative",
    format: "single_choice",
    topic: "Ketahanan pangan",
    question: "Bagaimana proyek kebun sekolah berhubungan dengan ketahanan pangan?",
    options: ["Siswa belajar menghasilkan dan menghargai pangan sehat", "Siswa tidak perlu belajar sains", "Tanaman hanya hiasan", "Pangan tidak terkait lingkungan"],
    answer: "Siswa belajar menghasilkan dan menghargai pangan sehat",
    explanation: "Kebun sekolah mengajarkan produksi pangan sehat dan keberlanjutan.",
    bloomLevel: "C4",
    soloLevel: "Relational",
    points: 15
  },
  {
    id: "sum-5",
    kind: "summative",
    format: "single_choice",
    topic: "Kompos",
    question: "Mengapa daun kering lebih baik diolah menjadi kompos?",
    options: ["Menyuburkan media tanam dan mengurangi sampah", "Menjadi logam", "Membuat tanaman tidak perlu air", "Menghilangkan cahaya"],
    answer: "Menyuburkan media tanam dan mengurangi sampah",
    explanation: "Kompos membantu menyuburkan tanaman dan mengurangi sampah organik.",
    bloomLevel: "C4",
    soloLevel: "Relational",
    points: 10
  },
  {
    id: "sum-6",
    kind: "summative",
    format: "single_choice",
    topic: "Hidroponik",
    question: "Mengapa air pada tanaman hidroponik perlu diperiksa secara rutin?",
    options: ["Agar kebutuhan tanaman tetap terpantau", "Agar tanaman tidak tumbuh", "Agar data tidak diperlukan", "Agar daun dicabut"],
    answer: "Agar kebutuhan tanaman tetap terpantau",
    explanation: "Air dan nutrisi dalam hidroponik perlu dijaga agar tanaman tumbuh sehat.",
    bloomLevel: "C4",
    soloLevel: "Relational",
    points: 10
  },
  {
    id: "sum-7",
    kind: "summative",
    format: "single_choice",
    topic: "KAIH",
    question: "Contoh sikap humanis dalam proyek EcoGrow adalah...",
    options: ["Membantu teman satu tim yang kesulitan", "Menyembunyikan alat kelompok", "Menyalahkan teman", "Merusak tanaman"],
    answer: "Membantu teman satu tim yang kesulitan",
    explanation: "Humanis berarti memiliki empati, membantu, dan menjaga hubungan baik.",
    bloomLevel: "C3",
    soloLevel: "Relational",
    points: 10,
    kaihFocus: ["humanis"]
  },
  {
    id: "sum-8",
    kind: "summative",
    format: "single_choice",
    topic: "Hemat sumber daya",
    question: "Saat menyiram tanaman, sikap hemat yang tepat adalah...",
    options: ["Menggunakan air secukupnya sesuai kebutuhan", "Membiarkan keran terbuka", "Menyiram sampai air terbuang", "Tidak pernah menyiram"],
    answer: "Menggunakan air secukupnya sesuai kebutuhan",
    explanation: "Hemat air adalah bagian dari tanggung jawab ekologis.",
    bloomLevel: "C3",
    soloLevel: "Relational",
    points: 10,
    kaihFocus: ["ekologis", "mandiri"]
  },
  {
    id: "sum-9",
    kind: "summative",
    format: "single_choice",
    topic: "Eco-Exhibition",
    question: "Karya yang paling tepat untuk Eco-Exhibition adalah...",
    options: ["Poster berisi data pertumbuhan dan cerita perawatan tanaman", "Kertas kosong", "Foto tanpa penjelasan", "Mainan yang tidak terkait proyek"],
    answer: "Poster berisi data pertumbuhan dan cerita perawatan tanaman",
    explanation: "Eco-Exhibition menampilkan karya dan bukti penguasaan belajar.",
    bloomLevel: "C5",
    soloLevel: "Extended Abstract",
    points: 15
  },
  {
    id: "sum-10",
    kind: "summative",
    format: "single_choice",
    topic: "Refleksi",
    question: "Mengapa refleksi penting setelah misi EcoGrow?",
    options: ["Agar siswa memahami pengalaman, kendala, dan rencana perbaikan", "Agar misi cepat dilupakan", "Agar tidak perlu bekerja sama", "Agar data tidak dipakai"],
    answer: "Agar siswa memahami pengalaman, kendala, dan rencana perbaikan",
    explanation: "Refleksi membantu siswa menyadari proses belajar dan memperbaiki tindakan.",
    bloomLevel: "C4",
    soloLevel: "Relational",
    points: 10
  }
];
```

### 12.4 Rekomendasi Skor

```ts
export function getEcoMasterRecommendation(score: number) {
  if (score >= 85) return {
    label: "Tantangan Lanjutan",
    message: "Kamu siap membuat karya Eco-Exhibition dengan data pertumbuhan tanaman.",
    nextHref: "/siswa/galeri"
  };
  if (score >= 70) return {
    label: "Lanjutkan Misi",
    message: "Kamu sudah paham dasar EcoGrow. Lanjutkan refleksi dan portofolio.",
    nextHref: "/siswa/portofolio"
  };
  return {
    label: "Latihan Ulang",
    message: "Coba ulangi materi cahaya, air, dan fotosintesis di EcoLearn.",
    nextHref: "/siswa/ecolearn"
  };
}
```

Acceptance criteria:

- Kuis memakai minimal 10 soal.
- Feedback muncul setelah siswa menjawab.
- Hasil kuis masuk ke laporan belajar dan portofolio.
- Ada rekomendasi remedial/pengayaan.

---

## 13. Revisi Cerita Belajarku, Self-Assessment, dan Peer-Assessment

### 13.1 Revisi Fitur

Pastikan halaman Cerita Belajarku memiliki:

- mood picker,
- guided reflection,
- cek usahaku,
- apresiasi teman,
- janji aksi ekologis,
- riwayat refleksi.

### 13.2 Mock Data

```ts
export const reflectionPrompts = [
  "Bagaimana perasaanmu saat merawat tanaman hari ini?",
  "Apa hal baru yang kamu pelajari?",
  "Bagian mana yang paling kamu sukai?",
  "Apa kendala yang kamu alami?",
  "Apa yang ingin kamu coba besok?"
];

export const ecoPromiseOptions = [
  "Aku akan menyiram tanaman secukupnya.",
  "Aku akan menghemat air.",
  "Aku akan memilah sampah organik.",
  "Aku akan membantu teman satu tim.",
  "Aku akan menjaga kebersihan kebun sekolah."
];

export const peerAppreciationTemplates = [
  "Terima kasih karena membantu mengukur tanaman.",
  "Terima kasih karena mengingatkan jadwal menyiram.",
  "Terima kasih karena bekerja sama dengan baik.",
  "Terima kasih karena membantu menulis jurnal."
];
```

Acceptance criteria:

- Tidak ada istilah `peer assessment` pada UI siswa; gunakan `Apresiasi Teman`.
- Tidak ada istilah `self assessment`; gunakan `Cek Usahaku`.
- Refleksi masuk ke Portofolio.
- KAIH tercatat sebagai mock metadata.

---

## 14. Revisi Galeri Project dan Eco-Exhibition

### 14.1 Tujuan

Galeri dan Eco-Exhibition harus mendokumentasikan karya, perkembangan karakter ekologis, dan bukti PBL.

### 14.2 Fitur Siswa

Tambahkan atau pastikan:

- submit karya akhir,
- upload mock dengan preview,
- pilih jenis karya,
- tulis pesan utama,
- status karya: draft, menunggu review, disetujui, perlu revisi,
- badge kandidat.

### 14.3 Fitur Guru

Tambahkan atau pastikan:

- daftar karya masuk,
- filter status,
- preview karya,
- moderasi karya,
- pilih karya unggulan,
- beri feedback,
- beri badge.

### 14.4 Mock Data Eco-Exhibition

```ts
export const ecoExhibitionItems = [
  {
    id: "exhibit-1",
    studentName: "Adit",
    groupName: "Tim Tunas Hijau",
    title: "Poster Siklus Hidup Kangkung",
    type: "poster",
    stageId: "NITI_SAJATI",
    status: "waiting_review",
    mainMessage: "Tanaman tumbuh sehat jika mendapat air, cahaya, dan perawatan.",
    evidence: ["Data tinggi tanaman", "Foto hari ke-1 sampai ke-10", "Cerita refleksi"],
    badgeCandidate: "Eco Exhibitor"
  },
  {
    id: "exhibit-2",
    studentName: "Siti",
    groupName: "Tim Sahabat Tanah",
    title: "Cerita Panen Pertamaku",
    type: "story",
    stageId: "NITI_SAJATI",
    status: "approved",
    mainMessage: "Merawat tanaman membutuhkan kerja sama dan kesabaran.",
    evidence: ["Foto panen", "Jurnal refleksi", "Apresiasi teman"],
    badgeCandidate: "Young Eco Steward"
  },
  {
    id: "exhibit-3",
    studentName: "Raka",
    groupName: "Tim Air Bersih",
    title: "Laporan Perubahan Tinggi Tanaman",
    type: "report",
    stageId: "NITI_SAJATI",
    status: "needs_revision",
    mainMessage: "Data tinggi tanaman membantu melihat pengaruh perawatan.",
    evidence: ["Grafik pertumbuhan", "Catatan volume air"],
    badgeCandidate: "Data Eco Explorer"
  }
];
```

Acceptance criteria:

- Siswa melihat Eco-Exhibition sebagai puncak pembelajaran.
- Guru dapat memoderasi karya secara mock.
- Status karya jelas.
- Karya disetujui masuk ke portofolio.

---

## 15. Revisi Portofolio Digital

### 15.1 Tujuan

Portofolio harus menjadi rekam jejak belajar lengkap, bukan hanya kumpulan badge.

### 15.2 Data Yang Harus Muncul

Portofolio siswa harus memuat:

- profil siswa,
- timeline belajar,
- jurnal tanaman,
- hasil EcoReadiness,
- hasil EcoMission,
- hasil EcoPlay,
- hasil EcoMaster Quiz,
- Cerita Belajarku,
- Apresiasi Teman,
- EcoChallenge,
- Galeri/Eco-Exhibition,
- Badge,
- Feedback guru,
- KAIH summary.

### 15.3 Layout

```text
PortfolioPage
├── StudentProfileSummary
├── LearningJourneyTimeline
├── EvidenceSummaryCards
├── PlantGrowthAlbum
├── ReflectionCollection
├── EcoExhibitionWorks
├── BadgesEarned
├── KAIHSummary
└── TeacherFeedbackHistory
```

Acceptance criteria:

- Portofolio komprehensif sesuai instrumen.
- Tidak menggunakan tabel kompleks pada UI siswa.
- Ada timeline kronologis.
- Ada integrasi KAIH.

---

## 16. Revisi Guru: Generator Modul Ajar

### 16.1 Tujuan

Generator Modul Ajar harus memudahkan guru menyusun, mengedit, dan mempublikasikan modul Kurikulum Merdeka berbasis EcoGrow.

### 16.2 Struktur Modul

Pastikan modul memuat:

- Identitas modul.
- Kompetensi awal.
- Dimensi profil lulusan.
- Jati diri PLH.
- Target peserta didik.
- Sarana prasarana.
- Praktik pedagogis.
- Mitra pembelajaran.
- Lingkungan pembelajaran.
- Pemanfaatan digital.
- CP dan TP.
- Pemahaman bermakna.
- Pertanyaan pemantik.
- Sintaks EcoGrow 5 tahap.
- LKPD digital.
- Asesmen diagnostik, formatif, sumatif.
- Rubrik.
- Refleksi guru dan siswa.
- Remedial dan pengayaan.

### 16.3 Revisi UI

Gunakan:

```text
TeacherModulePage
├── ModuleGeneratorForm
├── ModuleCompletenessChecklist
├── ModulePreviewTabs
│   ├── Ringkasan Modul
│   ├── Informasi Umum
│   ├── Komponen Inti
│   ├── Rencana 4 Pertemuan
│   ├── LKPD Digital
│   ├── Asesmen dan Rubrik
│   └── Refleksi & Tindak Lanjut
└── ModuleActionBar
```

Tombol mock:

- `Generate Modul`
- `Edit Modul`
- `Gunakan Modul`
- `Publikasikan ke Siswa`
- `Cetak Modul`

Acceptance criteria:

- Guru dapat menghasilkan preview modul dari mock data.
- Checklist kelengkapan terlihat jelas.
- Modul dapat dipublikasikan secara mock ke proyek/misi siswa.

---

## 17. Revisi Guru: Monitoring dan Feedback

### 17.1 Tujuan

Monitoring guru harus memudahkan guru memantau jurnal harian, misi, dan progres siswa.

### 17.2 Tambahkan Template Feedback Cepat

```ts
export const teacherQuickFeedbackTemplates = [
  "Pengamatanmu sudah baik. Lanjutkan besok.",
  "Coba tambahkan foto tanaman yang lebih jelas.",
  "Jangan lupa tulis tinggi tanaman dalam satuan cm.",
  "Ceritakan juga perubahan warna daun.",
  "Kerja samamu dengan tim sudah terlihat baik.",
  "Coba bandingkan tinggi tanaman hari ini dengan minggu lalu.",
  "Gunakan air secukupnya dan catat perubahan setelahnya."
];
```

### 17.3 Status Monitoring

Gunakan status:

```ts
type SubmissionStatus =
  | "waiting_feedback"
  | "needs_revision"
  | "completed"
  | "excellent"
  | "draft";
```

Acceptance criteria:

- Guru dapat memilih submission.
- Guru dapat memakai template feedback.
- Guru dapat memberi status diterima/perlu revisi.
- Feedback muncul di sisi siswa secara mock.

---

## 18. Revisi Guru: Asesmen dan Analitik

### 18.1 Asesmen

Pastikan halaman asesmen memiliki tab:

- Diagnostik
- Formatif
- Sumatif
- Refleksi
- KAIH
- Rubrik Kinerja

Tabel guru cukup memuat:

- Nama siswa.
- Kuis Awal.
- Latihan Misi.
- Kuis Akhir.
- Refleksi.
- KAIH.
- Rekomendasi.
- Aksi.

### 18.2 Analitik

Tambahkan grafik:

1. **Grafik pertumbuhan tanaman**
   - X: hari pengamatan.
   - Y: tinggi tanaman.

2. **Distribusi badge**
   - jumlah badge per kategori.

3. **Risiko belajar siswa**
   - aman,
   - perlu perhatian,
   - perlu pendampingan.

4. **Progress tahap EcoGrow**
   - Kenali,
   - Jelajahi,
   - Aksi,
   - Refleksi,
   - Pamerkan.

### 18.3 Mock Data Analitik

```ts
export const teacherAnalyticsMock = {
  plantGrowth: [
    { day: "Hari 1", averageHeight: 6 },
    { day: "Hari 3", averageHeight: 10 },
    { day: "Hari 5", averageHeight: 16 },
    { day: "Hari 7", averageHeight: 23 },
    { day: "Hari 10", averageHeight: 29 }
  ],
  badgeDistribution: [
    { badge: "Penjaga Tanaman", count: 12 },
    { badge: "Sahabat Daun", count: 9 },
    { badge: "Eco Exhibitor", count: 5 },
    { badge: "Ahli Tanaman Muda", count: 7 }
  ],
  riskDistribution: [
    { status: "Aman", count: 16 },
    { status: "Perlu Perhatian", count: 6 },
    { status: "Perlu Pendampingan", count: 3 }
  ],
  stageProgress: [
    { stage: "Kenali", count: 25 },
    { stage: "Jelajahi", count: 24 },
    { stage: "Aksi", count: 20 },
    { stage: "Refleksi", count: 14 },
    { stage: "Pamerkan", count: 5 }
  ]
};
```

Acceptance criteria:

- Guru dapat melihat grafik pertumbuhan tanaman.
- Guru dapat melihat distribusi badge.
- Guru dapat melihat risiko belajar.
- Guru dapat melihat progres tahap EcoGrow.
- Setiap grafik memiliki interpretasi singkat dan rekomendasi aksi.

---

## 19. Revisi EcoGrow Assistant

### 19.1 Masalah

Instrumen menilai EcoGrow Assistant sebagai fitur interaktif. Jika API Gemini gagal atau key tidak tersedia, fitur tetap harus terlihat berfungsi.

### 19.2 Revisi

Tambahkan fallback local response.

```ts
export const assistantFallbackResponses = [
  {
    keywords: ["sintaks", "ecogrow", "pancaniti"],
    answer: "Sintaks EcoGrow terdiri dari Kenali Alam, Jelajahi Masalah, Lakukan Aksi, Cerita dan Renungan, serta Pamerkan Karya. Istilah lokalnya adalah Niti Harti, Niti Surti, Niti Bukti, Niti Bakti, dan Niti Sajati."
  },
  {
    keywords: ["ecomission", "misi"],
    answer: "EcoMission adalah misi belajar berbasis aksi. Siswa mengamati tanaman, mengisi jurnal, mengunggah bukti, lalu mendapat feedback dari guru."
  },
  {
    keywords: ["modul", "guru"],
    answer: "Guru dapat menggunakan Modul Ajar untuk menyiapkan CP, TP, pertanyaan pemantik, LKPD, asesmen, dan kegiatan lima tahap EcoGrow."
  },
  {
    keywords: ["sdgs", "pangan", "iklim"],
    answer: "EcoGrow mendukung SDG 2, SDG 4, SDG 13, dan SDG 15 melalui kegiatan pangan sehat, pembelajaran berkualitas, aksi iklim, dan kepedulian terhadap kehidupan darat."
  }
];
```

Acceptance criteria:

- Assistant memberi jawaban meskipun API gagal.
- Assistant tidak menampilkan error teknis ke pengguna.
- Ada quick prompt yang relevan.

---

## 20. Revisi Ecomart dan EcoChallenge

### 20.1 Ecomart

Tambahkan fungsi mock:

- catat hasil panen,
- jumlah panen,
- satuan,
- tujuan penggunaan panen,
- EcoPoint panen,
- kontribusi pangan sehat.

Mock data:

```ts
export const harvestRecords = [
  {
    id: "harvest-1",
    groupName: "Tim Tunas Hijau",
    cropName: "Kangkung",
    amount: 1.2,
    unit: "kg",
    usage: "Dibagikan untuk demo pangan sehat kelas",
    points: 80,
    date: "2026-05-27"
  },
  {
    id: "harvest-2",
    groupName: "Tim Sahabat Tanah",
    cropName: "Bayam",
    amount: 0.8,
    unit: "kg",
    usage: "Dibawa ke kantin sehat sekolah",
    points: 60,
    date: "2026-05-29"
  }
];
```

### 20.2 EcoChallenge

Tambahkan challenge remedial dan pengayaan.

```ts
export const ecoChallenges = [
  {
    id: "challenge-remedial-light",
    type: "remedial",
    title: "Latihan Ulang: Cahaya dan Tanaman",
    description: "Amati satu tanaman di rumah. Catat apakah tanaman mendapat cahaya cukup.",
    evidence: ["Foto tanaman", "Catatan lokasi cahaya"],
    points: 30
  },
  {
    id: "challenge-enrichment-compost",
    type: "enrichment",
    title: "Tantangan Lanjutan: Sampah Organik",
    description: "Cari contoh sampah organik di rumah dan tuliskan bagaimana bisa diolah menjadi kompos.",
    evidence: ["Foto sampah organik", "Ide pengolahan"],
    points: 40
  },
  {
    id: "challenge-water-saving",
    type: "habit",
    title: "Hemat Air 3 Hari",
    description: "Catat satu kebiasaan menghemat air selama tiga hari.",
    evidence: ["Catatan harian", "Janji aksi"],
    points: 35
  }
];
```

Acceptance criteria:

- Ecomart tidak hanya berupa simulasi reward, tetapi mencatat panen.
- EcoChallenge menampilkan remedial dan pengayaan.
- Hasil challenge masuk ke Portofolio.

---

## 21. Revisi Terminologi Internal

### 21.1 Masalah

Masih ada penamaan seperti:

```text
PancanitiStage
PancanitiStepper
pancanitiStages
legacyStageToEcoGrowStage
```

Ini tidak harus segera dihapus jika berisiko besar, tetapi perlu dibersihkan bertahap.

### 21.2 Revisi Bertahap

Prioritas rename:

| Lama | Baru |
|---|---|
| `PancanitiStage` | `EcoGrowStage` |
| `PancanitiStepper` | `EcoGrowStepper` |
| `pancanitiStages` | `ecoGrowStages` |
| `legacyStageToEcoGrowStage` | `stageIdToEcoGrowStage` |

Ketentuan:

- UI tetap menampilkan Niti Harti sampai Niti Sajati sebagai `localTerm`.
- Jangan menghilangkan akar kearifan lokal.
- Nama utama di UI siswa: Kenali, Jelajahi, Aksi, Refleksi, Pamerkan.
- Nama utama di UI guru: Ecological Recognition sampai Ecological Mastery & Exhibition.

Acceptance criteria:

- Tidak ada label utama UI siswa yang hanya menggunakan Niti Harti tanpa penjelasan ramah anak.
- Type baru tidak merusak import.
- Contract test diperbarui jika ada rename.

---

## 22. Revisi Responsivitas dan Aksesibilitas

### 22.1 Desktop

- Guru boleh memakai layout 2 sampai 3 kolom.
- Siswa maksimal 2 kolom.
- Jangan tampilkan terlalu banyak kartu pada viewport awal.

### 22.2 Tablet

- Sidebar collapsible.
- Stepper dapat menjadi horizontal scroll.
- Form jangan terlalu sempit.

### 22.3 Mobile

- Siswa memakai bottom navigation.
- CTA utama sticky jika sedang mengisi misi/kuis.
- Semua tombol minimal 44px tinggi.
- Form satu kolom.

### 22.4 Aksesibilitas

- Semua gambar memiliki alt text.
- Semua tombol memiliki label jelas.
- Gunakan `aria-current` untuk step aktif.
- Gunakan `aria-pressed` pada pilihan interaktif.
- Warna teks harus kontras.
- Jangan hanya mengandalkan warna untuk status; tambahkan label status.

Acceptance criteria:

- Halaman dapat digunakan di mobile.
- Navigasi keyboard tidak rusak.
- Label form jelas.
- Status memiliki teks dan warna.

---

## 23. Prioritas Eksekusi Untuk Codex

Kerjakan secara bertahap agar tidak merusak project.

### Tahap 1: Stabilitas Teknis

1. Hapus `.env.local`.
2. Tambahkan `.env.example`.
3. Pastikan `.gitignore` aman.
4. Ganti `next/font/google` dengan fallback lokal/CSS.
5. Jalankan typecheck dan build.

### Tahap 2: Interaksi Siswa

1. Perkuat EcoReadiness wizard.
2. Tambahkan/rapikan materi EcoLearn.
3. Perkuat EcoMission dan LKPD stepper.
4. Tambahkan mini game EcoPlay.
5. Perluas EcoMaster Quiz menjadi minimal 10 soal.
6. Hubungkan hasil ke Portofolio dan Laporan Belajar.

### Tahap 3: Refleksi dan Portofolio

1. Lengkapi Cerita Belajarku.
2. Tambahkan Cek Usahaku.
3. Tambahkan Apresiasi Teman.
4. Perkuat Portofolio Digital sebagai evidence hub.
5. Tambahkan Eco-Exhibition.

### Tahap 4: Fitur Guru

1. Perkuat Generator Modul Ajar.
2. Tambahkan template feedback cepat.
3. Perkuat Monitoring Guru.
4. Perkuat Asesmen Guru.
5. Perkuat Analitik Guru.
6. Perkuat Galeri Guru.

### Tahap 5: Sinkronisasi Deployment

1. Pastikan source terbaru terdeploy.
2. Cek landing page.
3. Cek dashboard siswa.
4. Cek EcoReadiness.
5. Cek EcoMission.
6. Cek EcoPlay.
7. Cek EcoMaster Quiz.
8. Cek modul ajar guru.
9. Cek monitoring guru.
10. Cek analitik guru.

---

## 24. Larangan Pada Tahap Ini

Jangan lakukan hal berikut:

- Jangan menambahkan role Admin.
- Jangan membuat backend produksi.
- Jangan menyimpan API key di repository.
- Jangan membuat UI siswa terlalu padat.
- Jangan menampilkan istilah teknis berlebihan pada halaman siswa.
- Jangan menghapus fitur yang sudah ada.
- Jangan mengganti konsep EcoGrow Learning.
- Jangan menghilangkan istilah lokal Niti Harti sampai Niti Sajati.
- Jangan menghapus mock data asesmen yang sudah ada.
- Jangan membuat LMS bergantung pada API eksternal agar demo bisa berjalan.

---

## 25. Acceptance Criteria Akhir Berdasarkan Instrumen

### Tampilan Antarmuka

- Warna, ikon, dan elemen visual konsisten ekologis.
- Teks terbaca jelas.
- Layout tidak membingungkan siswa SD.

### Usability

- Siswa dapat mengisi jurnal tanpa instruksi tambahan.
- Guru dapat membuat/meninjau modul dengan flow jelas.
- Guru dapat memberi feedback cepat.
- Sistem nyaman di mobile, tablet, dan desktop.

### Navigasi dan Aksesibilitas

- Menu siswa tersusun sesuai alur belajar.
- Menu guru tersusun sesuai tugas guru.
- Role siswa dan guru terpisah jelas.
- Tidak ada role Admin pada tahap ini.

### Interaktivitas dan Gamifikasi

- EcoLearn memiliki mini-check.
- EcoMission memiliki form jurnal.
- EcoPlay memiliki mini game interaktif.
- Galeri memiliki upload dan status mock.
- EcoChallenge memiliki tantangan remedial/pengayaan.
- EcoPoint, level, badge, dan progress bar berfungsi secara mock.
- EcoGrow Assistant memiliki fallback.

### Pengelolaan Materi dan Alur

- Materi EcoLearn ringkas dan sesuai usia SD.
- Misi disusun sesuai 5 tahap EcoGrow.
- Modul ajar guru lengkap dan dapat dipreview.
- Instruksi misi mudah dipahami siswa.

### Asesmen dan Monitoring

- EcoReadiness, EcoMission, EcoMaster Quiz, dan Refleksi saling terhubung.
- Guru dapat memantau jurnal dan memberi feedback.
- Dashboard guru menampilkan ringkasan kelas.
- Analitik menampilkan pertumbuhan tanaman, badge, risiko belajar, dan progres tahap.

### Kelayakan Teknis

- Typecheck berhasil.
- Build berhasil.
- `.env.local` tidak ikut project.
- Assistant tetap berfungsi meski API gagal.
- Portofolio menyimpan rekam jejak belajar lengkap secara mock.

---

## 26. Kesimpulan Revisi

Project EcoGrow Learning(2).zip sudah memiliki fondasi frontend yang baik dan sudah mendekati kebutuhan instrumen ahli sistem. Namun, agar kelayakan meningkat, revisi harus diarahkan pada penyempurnaan fungsi yang dinilai langsung oleh instrumen, terutama:

1. Stabilitas teknis dan keamanan konfigurasi.
2. EcoGrow Assistant fallback.
3. EcoPlay interaktif.
4. Galeri dan Eco-Exhibition yang benar-benar berjalan secara mock.
5. Generator Modul Ajar yang terasa fungsional.
6. Analitik guru sesuai indikator instrumen.
7. Portofolio digital sebagai rekam jejak komprehensif.
8. Keterhubungan asesmen diagnostik, formatif, sumatif, refleksi, remedial, dan pengayaan.

Target realistis setelah revisi adalah LMS berada pada kategori **dapat digunakan dengan revisi minor** atau mendekati **dapat digunakan tanpa revisi** untuk penilaian ahli sistem, dengan catatan bahwa versi ini masih frontend prototype berbasis mock data.
