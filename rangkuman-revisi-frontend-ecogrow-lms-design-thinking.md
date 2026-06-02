# Rangkuman Revisi Frontend LMS EcoGrow Learning Berdasarkan Analisis Deployment Vercel

## 1. Konteks Revisi

Project EcoGrow Learning telah dideploy di Vercel dan sudah dapat digunakan sebagai **high-fidelity frontend prototype** berbasis mock data. Secara umum, struktur fitur utama sudah tersedia, terutama untuk dua role utama yang saat ini diprioritaskan:

1. **Siswa**
2. **Guru**

Pengembangan tahap ini **tidak perlu menambahkan role Admin terlebih dahulu**. Fokus revisi harus diarahkan pada penyempurnaan kebutuhan fitur yang sudah ada, penyederhanaan alur penggunaan, dan peningkatan kemudahan penggunaan LMS untuk siswa dan guru sekolah dasar.

Prioritas utama revisi bukan menambah banyak fitur baru, tetapi membuat LMS:

- lebih mudah dipahami,
- lebih ringan secara tampilan,
- lebih jelas alur penggunaannya,
- lebih ramah untuk siswa SD,
- lebih praktis untuk guru SD,
- lebih konsisten dengan konsep EcoGrow Learning,
- tetap berbasis frontend dan mock data.

---

## 2. Kesimpulan Umum Hasil Analisis

LMS EcoGrow Learning yang telah dideploy sudah cukup kuat sebagai prototype frontend. Fitur utama sudah tersedia, termasuk:

- Landing page.
- Login dan register.
- Dashboard siswa.
- EcoReadiness.
- EcoMission.
- EcoLearn.
- EcoPlay.
- EcoMaster Quiz.
- Cerita Belajarku.
- EcoChallenge.
- Ecomart/Panen.
- Portofolio.
- Galeri.
- Dashboard guru.
- Modul ajar.
- Proyek.
- Monitoring.
- Asesmen.
- Analitik.
- Laporan.

Secara konseptual, LMS juga sudah menggunakan struktur khas EcoGrow Learning, yaitu:

1. **Ecological Recognition**
2. **Ecological Exploration**
3. **Ecological Execution**
4. **Ecological Reflection**
5. **Ecological Mastery & Exhibition**

Namun, masih terdapat beberapa aspek yang perlu direvisi dari sisi fitur dan design thinking, khususnya terkait **kemudahan penggunaan untuk siswa dan guru SD**.

---

## 3. Fokus Utama Revisi

Fokus revisi selanjutnya adalah:

1. Menyederhanakan navigasi siswa.
2. Membuat EcoReadiness lebih ramah anak.
3. Memperkuat feedback langsung pada EcoMaster Quiz.
4. Memperjelas hubungan antarfitur siswa.
5. Memperkuat modul ajar guru.
6. Memperkuat self-assessment dan peer-assessment.
7. Memperjelas Eco-Exhibition sebagai puncak pembelajaran.
8. Menyederhanakan istilah teknis pada halaman siswa.
9. Mempertahankan dashboard guru sebagai pusat keputusan harian.
10. Menjaga seluruh implementasi tetap berbasis frontend dan mock data.

---

## 4. Revisi Umum Berdasarkan Design Thinking

### 4.1 Empathize: Kebutuhan Siswa SD

Siswa SD membutuhkan UI yang:

- sederhana,
- visual,
- tidak terlalu banyak teks,
- tidak terlalu banyak menu,
- memiliki tombol aksi yang jelas,
- memberi instruksi langsung,
- menggunakan bahasa ramah anak,
- memberi umpan balik positif,
- terasa seperti petualangan belajar.

Masalah yang masih terlihat:

- Menu siswa masih cukup banyak.
- Beberapa istilah masih terlalu akademik.
- EcoReadiness masih terasa seperti lembar asesmen.
- Hubungan antarfitur belum sepenuhnya terasa sebagai satu alur belajar.
- Eco-Exhibition belum terasa sebagai puncak petualangan.

### 4.2 Empathize: Kebutuhan Guru SD

Guru membutuhkan UI yang:

- ringkas,
- praktis,
- berbasis tindakan,
- menampilkan prioritas harian,
- menampilkan siswa yang perlu perhatian,
- memudahkan pemberian umpan balik,
- memudahkan melihat laporan kelas,
- tidak terlalu dekoratif,
- tidak menyembunyikan informasi penting.

Kondisi saat ini sudah cukup baik, terutama pada dashboard guru, monitoring, asesmen, dan laporan. Revisi guru lebih diarahkan pada **penguatan detail fitur**, bukan perubahan total.

### 4.3 Define: Masalah Utama UX Saat Ini

Masalah utama yang perlu didefinisikan:

1. **Navigasi siswa terlalu banyak untuk target anak SD.**
2. **EcoReadiness belum cukup ramah anak karena tampil seperti daftar pertanyaan formal.**
3. **EcoMaster Quiz belum cukup kuat dalam memberikan feedback belajar langsung.**
4. **Alur siswa dari kesiapan belajar sampai portofolio belum sepenuhnya menyatu.**
5. **Eco-Exhibition belum muncul sebagai event akhir yang kuat.**
6. **Beberapa istilah teknis masih muncul di ruang siswa.**
7. **Modul ajar guru perlu lebih lengkap dan lebih mudah dipindai.**
8. **Self-assessment dan peer-assessment perlu dibuat lebih eksplisit.**

---

## 5. Revisi Navigasi Siswa

### 5.1 Masalah

Navigasi siswa saat ini masih memuat banyak menu utama. Untuk siswa sekolah dasar, terlalu banyak pilihan dapat menyebabkan kebingungan.

Menu yang terlalu banyak membuat siswa sulit membedakan mana aktivitas utama dan mana aktivitas tambahan.

### 5.2 Rekomendasi

Sederhanakan navigasi siswa menjadi menu utama dan menu sekunder.

#### Menu utama siswa

| Menu Utama | Fungsi |
|---|---|
| Beranda | Ringkasan harian siswa |
| Misi | Aktivitas EcoMission utama |
| Belajar | Materi EcoLearn |
| Bermain | EcoPlay |
| Cerita | Refleksi belajar |
| Portofolio | Rekam jejak capaian siswa |

#### Menu sekunder dalam “Lainnya”

| Menu Sekunder | Fungsi |
|---|---|
| Galeri | Melihat karya dan apresiasi |
| Kuis Akhir | EcoMaster Quiz |
| Tantangan Rumah | EcoChallenge |
| Panen | Ecomart atau hasil panen |

### 5.3 Instruksi Implementasi

- Buat menu **Lainnya** pada sidebar atau bottom navigation siswa.
- Pada mobile, gunakan bottom navigation maksimal 5 item:
  - Beranda
  - Misi
  - Belajar
  - Bermain
  - Lainnya
- Masukkan Cerita, Portofolio, Galeri, Kuis Akhir, Tantangan Rumah, dan Panen ke drawer/menu “Lainnya” jika ruang terbatas.
- Pastikan menu aktif terlihat jelas.
- Gunakan ikon yang mudah dipahami anak.

### 5.4 Acceptance Criteria

- Siswa dapat menemukan “Misi Hari Ini” dari Beranda dalam kurang dari 5 detik.
- Jumlah menu utama siswa tidak lebih dari 6 pada desktop.
- Jumlah menu utama pada mobile tidak lebih dari 5.
- Tidak ada istilah teknis pada label navigasi siswa.

---

## 6. Revisi Dashboard Siswa

### 6.1 Status Saat Ini

Dashboard siswa sudah cukup baik karena menampilkan:

- sapaan siswa,
- kelas dan tim,
- EcoPoint,
- badge aktif,
- misi hari ini,
- tanaman,
- perjalanan EcoGrow,
- aksi cepat,
- pesan guru.

Namun, masih perlu penyederhanaan prioritas visual agar siswa langsung tahu hal pertama yang harus dilakukan.

### 6.2 Rekomendasi Layout

Gunakan struktur berikut:

```text
StudentDashboard
├── GreetingCard
├── TodayMissionCard
├── MainActionButtons
├── MyPlantCard
├── EcoGrowJourney
├── TeacherMessage
└── BadgePreview
```

### 6.3 Prioritas Visual

Urutan prioritas di layar:

1. **Misi Hari Ini**
2. **Isi Jurnal / Lanjutkan Misi**
3. **Tanamanku**
4. **Perjalanan EcoGrow**
5. **Pesan Guru**
6. **Badge Terbaru**

### 6.4 Rekomendasi Copywriting

Gunakan kalimat pendek:

- “Halo, Adit. Siap merawat bumi hari ini?”
- “Misi Hari Ini”
- “Rawat Tanaman Kangkungmu”
- “Ayo cek tinggi tanaman dan unggah foto hari ini.”
- “Lanjutkan Misi”
- “Catat Perkembangan”
- “Lihat Badge”

### 6.5 Acceptance Criteria

- Tidak ada lebih dari 4 kartu besar di layar pertama.
- Tombol “Lanjutkan Misi” harus menjadi CTA paling dominan.
- Badge tidak perlu ditampilkan terlalu banyak, cukup 3 badge terbaru.
- Informasi statistik tidak boleh terlalu mendominasi halaman siswa.

---

## 7. Revisi EcoReadiness

### 7.1 Masalah

EcoReadiness sudah ada dan memuat asesmen awal. Namun tampilannya masih terasa seperti daftar soal formal. Untuk siswa SD, ini berpotensi terasa seperti ujian, bukan bagian dari petualangan belajar.

### 7.2 Rekomendasi

Ubah EcoReadiness menjadi **wizard bertahap**.

#### Struktur baru

```text
EcoReadinessPage
├── IntroCard
├── StepWizard
│   ├── Step 1: Apa yang sudah kamu tahu?
│   ├── Step 2: Kamu suka belajar dengan cara apa?
│   ├── Step 3: Bagaimana kamu menjaga alam?
│   └── Step 4: Profil Belajarku
└── ResultCard
```

### 7.3 Format Pertanyaan

Tampilkan maksimal 1 sampai 2 pertanyaan per layar.

Gunakan format visual:

- pilihan bergambar,
- emoji,
- kartu pilihan besar,
- progress step,
- tombol “Lanjut”.

### 7.4 Contoh Copywriting

Ganti bahasa formal dengan bahasa ramah anak.

| Lama | Baru |
|---|---|
| Asesmen Diagnostik | Kuis Awal |
| Kesiapan Belajar | Profil Belajarku |
| Pilih gaya belajar | Aku paling suka belajar dengan cara... |
| Kesadaran ekologis | Caraku menjaga alam |

### 7.5 Result Card

Setelah selesai, tampilkan ringkasan sederhana:

```text
Profil Belajarmu

Kamu suka belajar dengan gambar dan praktik langsung.
Kamu sudah tahu bahwa tanaman membutuhkan air dan cahaya.
Ayo mulai dari materi “Mengapa tanaman butuh cahaya?”
```

CTA:

- “Mulai Belajar”
- “Lanjut ke Misi”

### 7.6 Acceptance Criteria

- EcoReadiness tidak terasa seperti ujian panjang.
- Setiap step maksimal 2 pertanyaan.
- Siswa mendapat hasil yang mudah dipahami.
- Hasil EcoReadiness mengarahkan ke EcoLearn atau EcoMission.

---

## 8. Revisi EcoMission

### 8.1 Status Saat Ini

EcoMission sudah cukup baik karena misi harian, tahap aktif, instruksi, progress, dan form bukti sudah jelas.

### 8.2 Revisi Yang Diperlukan

Perkuat EcoMission sebagai alur bertahap, bukan sekadar halaman form.

### 8.3 Rekomendasi

Gunakan struktur:

```text
EcoMissionPage
├── MissionHero
├── CurrentEcoGrowStage
├── StepInstructionCard
├── EvidenceForm
├── SaveSuccessFeedback
└── NextSuggestedAction
```

### 8.4 CurrentEcoGrowStage

Tampilkan tahap aktif dengan label ramah siswa:

| Istilah EcoGrow | Label Untuk Siswa |
|---|---|
| Ecological Recognition | Kenali Alam |
| Ecological Exploration | Jelajahi Masalah |
| Ecological Execution | Lakukan Aksi |
| Ecological Reflection | Ceritakan dan Renungkan |
| Ecological Mastery & Exhibition | Pamerkan Karya |

Istilah Niti Harti sampai Niti Sajati boleh ditampilkan kecil sebagai pendamping, bukan label utama.

### 8.5 Evidence Form

Pertahankan form ringkas:

- Tinggi tanaman.
- Kondisi daun.
- Catatan singkat.
- Foto tanaman.

Tambahkan:

- preview foto lokal berbasis mock,
- pesan sukses setelah submit,
- rekomendasi aksi berikutnya.

### 8.6 Next Suggested Action

Setelah jurnal tersimpan:

```text
Jurnalmu sudah tersimpan.
Sekarang kamu bisa menulis Cerita Belajarku.
```

CTA:

- “Tulis Cerita”
- “Kembali ke Beranda”

### 8.7 Acceptance Criteria

- Form bukti tidak terlalu panjang.
- Setelah submit, siswa mendapat feedback positif.
- EcoMission mengarahkan siswa ke Cerita Belajarku atau Portofolio.
- Tahap EcoGrow mudah dipahami oleh siswa.

---

## 9. Revisi EcoLearn

### 9.1 Status Saat Ini

EcoLearn sudah cukup sesuai sebagai microlearning. Materi sudah ringkas dan terkait dengan misi tanaman.

### 9.2 Revisi Yang Diperlukan

Perkuat hubungan EcoLearn dengan EcoMission dan EcoReadiness.

### 9.3 Rekomendasi

Tambahkan komponen:

```text
RecommendedFromReadinessCard
RelatedMissionCard
MiniQuizFeedbackCard
```

### 9.4 RecommendedFromReadinessCard

Contoh:

```text
Berdasarkan Kuis Awal, kamu disarankan belajar topik ini:
Mengapa tanaman butuh cahaya?
```

### 9.5 RelatedMissionCard

Contoh:

```text
Setelah belajar ini, lanjutkan misi:
Rawat Tanaman Kangkungmu
```

CTA:

- “Lanjut ke Misi”

### 9.6 Acceptance Criteria

- Setiap materi EcoLearn memiliki hubungan dengan minimal satu misi.
- Setelah membaca materi, siswa dapat langsung menuju EcoMission.
- Materi tidak berupa paragraf panjang.
- Satu topik memuat maksimal:
  - video,
  - bacaan ringkas,
  - gambar/infografik,
  - kuis mini.

---

## 10. Revisi EcoMaster Quiz

### 10.1 Masalah

EcoMaster Quiz sudah memakai pola satu soal per layar. Namun, feedback langsung perlu diperkuat agar kuis menjadi pengalaman belajar, bukan hanya evaluasi akhir.

### 10.2 Rekomendasi

Tambahkan feedback setelah siswa menjawab.

#### Jika benar

```text
Benar!
Tanaman membutuhkan cahaya untuk membantu membuat makanan.
Kamu mendapat 10 EcoPoint.
```

#### Jika salah

```text
Belum tepat.
Coba ingat kembali: cahaya membantu daun membuat makanan.
```

### 10.3 Result Summary

Hasil akhir harus memuat:

- skor,
- badge yang diperoleh,
- area yang sudah dikuasai,
- area yang perlu latihan,
- rekomendasi remedial,
- rekomendasi pengayaan,
- CTA ke laporan belajar.

### 10.4 Struktur

```text
EcoMasterQuizPage
├── QuizIntro
├── QuestionCard
├── AnswerFeedback
├── ProgressIndicator
├── ResultSummary
└── NextAction
```

### 10.5 Acceptance Criteria

- Siswa mendapat feedback setiap selesai menjawab.
- Hasil akhir tidak hanya menampilkan skor.
- Ada rekomendasi “Latihan Ulang” atau “Tantangan Lanjutan”.
- Tombol berikutnya jelas setelah kuis selesai.

---

## 11. Revisi Cerita Belajarku

### 11.1 Masalah

Fitur refleksi penting untuk EcoGrow, tetapi perlu dipastikan tampil sebagai pengalaman yang aman dan sederhana untuk anak.

### 11.2 Rekomendasi Layout

```text
CeritaBelajarkuPage
├── MoodPicker
├── GuidedReflection
├── EcoPromise
├── PeerAppreciation
└── ReflectionHistory
```

### 11.3 MoodPicker

Gunakan pilihan:

- Senang
- Bangga
- Bingung
- Ingin mencoba lagi
- Butuh bantuan

### 11.4 Guided Reflection

Pertanyaan:

1. Bagaimana perasaanmu saat merawat tanaman hari ini?
2. Apa hal baru yang kamu pelajari?
3. Bagian mana yang paling kamu sukai?
4. Apa yang ingin kamu coba besok?

### 11.5 EcoPromise

Tambahkan janji kecil:

- “Aku akan menyiram tanaman.”
- “Aku akan menghemat air.”
- “Aku akan membuang sampah pada tempatnya.”
- “Aku akan membantu teman satu tim.”

### 11.6 Peer Appreciation

Tambahkan fitur mock sederhana:

```text
Apresiasi Teman

Pilih teman yang membantumu hari ini.
Tulis satu kalimat apresiasi.
```

### 11.7 Acceptance Criteria

- Siswa dapat menulis refleksi tanpa istilah akademik.
- Ada pilihan mood visual.
- Ada janji aksi ekologis.
- Ada peer appreciation sederhana.
- Riwayat cerita tampil sebagai timeline.

---

## 12. Revisi Self-Assessment dan Peer-Assessment

### 12.1 Masalah

Self-assessment dan peer-assessment merupakan bagian penting dari assessment as learning, tetapi belum terlihat kuat dalam UX.

### 12.2 Rekomendasi

Tambahkan fitur ini di halaman:

- Cerita Belajarku.
- Portofolio.
- EcoMission setelah submit jurnal.

### 12.3 Self-Assessment Sederhana

Gunakan pertanyaan rating visual:

```text
Bagaimana usahaku hari ini?

[⭐] Aku sudah mencoba
[⭐⭐] Aku bekerja sama
[⭐⭐⭐] Aku menyelesaikan tugas
```

Atau:

```text
Hari ini aku:
- Mengamati tanaman dengan teliti.
- Membantu teman.
- Menjaga kebersihan.
- Menulis jurnal.
```

### 12.4 Peer-Assessment Sederhana

Gunakan format apresiasi, bukan penilaian formal:

```text
Teman yang membantuku hari ini:
[Dropdown nama teman]

Aku ingin mengucapkan:
[Terima kasih karena...]
```

### 12.5 Acceptance Criteria

- Tidak menggunakan istilah “peer assessment” pada UI siswa.
- Gunakan istilah “Apresiasi Teman”.
- Self-assessment tampil sebagai “Cek Usahaku”.
- Hasilnya masuk ke Portofolio mock.

---

## 13. Revisi Portofolio Siswa

### 13.1 Status Saat Ini

Portofolio sudah tersedia, tetapi perlu diperkuat sebagai album perkembangan siswa.

### 13.2 Rekomendasi Layout

```text
PortfolioPage
├── StudentProfileCard
├── LearningJourneyTimeline
├── MyPlantAlbum
├── MyStories
├── MyBadges
├── MyBestWorks
└── TeacherFeedback
```

### 13.3 Fokus Portofolio

Portofolio untuk siswa SD harus terasa seperti album, bukan dashboard skor.

Tampilkan:

- foto tanaman,
- jurnal terbaik,
- cerita belajar,
- badge,
- karya galeri,
- pesan guru.

### 13.4 Acceptance Criteria

- Portofolio tidak menggunakan tabel kompleks.
- Portofolio menampilkan perjalanan belajar secara kronologis.
- Siswa dapat melihat karya terbaiknya.
- Feedback guru terlihat mudah ditemukan.

---

## 14. Revisi Eco-Exhibition

### 14.1 Masalah

Tahap **Ecological Mastery & Exhibition** sudah muncul sebagai bagian dari alur EcoGrow, tetapi belum terasa sebagai event puncak pembelajaran.

### 14.2 Rekomendasi

Tambahkan section atau halaman khusus:

```text
/siswa/eco-exhibition
/guru/eco-exhibition
```

Jika belum ingin menambah route, tempatkan sebagai section khusus di Galeri dan Portofolio.

### 14.3 Isi Eco-Exhibition Siswa

- Karya terbaikku.
- Foto panen.
- Poster proyek.
- Cerita praktik baik.
- Badge kelulusan ekologis.
- Pesan guru.

### 14.4 Isi Eco-Exhibition Guru

- Karya siswa yang masuk.
- Karya menunggu review.
- Rubrik pameran.
- Pilihan karya unggulan.
- Rekap badge kelulusan ekologis.
- Tombol mock “Publikasikan ke Galeri”.

### 14.5 Acceptance Criteria

- Tahap Exhibit terasa sebagai pencapaian akhir.
- Siswa tahu bahwa karya akhirnya akan dipamerkan.
- Guru dapat memilih karya unggulan.
- Ada badge atau status “Lulus Misi Ekologis”.

---

## 15. Revisi Dashboard Guru

### 15.1 Status Saat Ini

Dashboard guru sudah baik karena menampilkan:

- kelas aktif,
- jurnal masuk,
- feedback pending,
- siswa perlu dukungan,
- proyek aktif,
- submission terbaru,
- aksi cepat.

### 15.2 Revisi Yang Diperlukan

Pertahankan struktur saat ini, tetapi pastikan prioritas visual sebagai berikut:

1. **Yang harus ditangani hari ini**
2. **Proyek aktif**
3. **Jurnal/submission terbaru**
4. **Siswa perlu dukungan**
5. **Aksi cepat**

### 15.3 Action Needed Panel

Komponen ini harus paling jelas.

Contoh isi:

```text
Yang Perlu Ditangani Hari Ini

- 5 jurnal belum diberi umpan balik.
- 3 siswa direkomendasikan latihan ulang.
- 2 karya galeri menunggu review.
- 1 proyek mendekati tenggat.
```

CTA:

- “Tinjau Jurnal”
- “Lihat Asesmen”
- “Moderasi Galeri”

### 15.4 Acceptance Criteria

- Guru langsung melihat prioritas harian.
- Tidak lebih dari 4 kartu statistik utama.
- Aksi cepat terlihat jelas.
- Dashboard tidak terlalu dekoratif.

---

## 16. Revisi Monitoring Guru

### 16.1 Status Saat Ini

Monitoring guru sudah cukup matang. Halaman ini sudah menampilkan submission, detail, dan form feedback.

### 16.2 Revisi Yang Diperlukan

Perkuat alur review agar lebih cepat.

### 16.3 Rekomendasi

Tambahkan filter ringkas:

- Semua
- Menunggu Review
- Perlu Revisi
- Selesai

Tambahkan quick feedback:

```text
Template Umpan Balik Cepat:
- Pengamatanmu sudah baik.
- Coba tambahkan foto yang lebih jelas.
- Ukur tinggi tanaman dengan satuan cm.
- Ceritakan juga perubahan warna daun.
```

### 16.4 Acceptance Criteria

- Guru dapat memberi feedback dalam kurang dari 3 klik.
- Ada template feedback cepat.
- Status submission terlihat jelas.
- Siswa yang perlu revisi mudah ditemukan.

---

## 17. Revisi Asesmen Guru

### 17.1 Status Saat Ini

Asesmen guru sudah cukup baik secara konsep, tetapi perlu dibuat lebih mudah dibaca.

### 17.2 Rekomendasi

Gunakan tab:

```text
Diagnostik
Formatif
Sumatif
Rubrik Kinerja
KAIH
```

### 17.3 Tabel Ringkas

Kolom tabel cukup:

- Nama siswa.
- Kuis Awal.
- Latihan Misi.
- Kuis Akhir.
- KAIH.
- Rekomendasi.
- Aksi.

### 17.4 Rekomendasi Tindak Lanjut

Gunakan label:

- Perlu Latihan Ulang.
- Siap Tantangan Lanjutan.
- Perlu Pendampingan.
- Konsisten Baik.

### 17.5 Acceptance Criteria

- Guru dapat memahami status siswa tanpa membaca banyak teks.
- Rekomendasi terlihat jelas.
- Istilah siswa pada laporan tetap ramah.
- Istilah guru boleh lebih profesional, tetapi tetap ringkas.

---

## 18. Revisi Modul Ajar Guru

### 18.1 Masalah

Halaman modul ajar perlu dipastikan memuat struktur perangkat ajar yang berasal dari dokumen muatan pembelajaran.

### 18.2 Struktur Minimal Modul Ajar

Modul ajar harus memiliki section:

1. Identitas modul.
2. Kompetensi awal.
3. Dimensi profil lulusan.
4. Jati diri PLH.
5. Target peserta didik.
6. Sarana dan prasarana.
7. Praktik pedagogis.
8. Mitra pembelajaran.
9. Lingkungan pembelajaran.
10. Pemanfaatan digital.
11. Capaian pembelajaran.
12. Tujuan pembelajaran.
13. Pemahaman bermakna.
14. Pertanyaan pemantik.
15. Langkah pembelajaran berbasis Sintaks EcoGrow.
16. LKPD digital.
17. Asesmen diagnostik, formatif, sumatif.
18. Rubrik.
19. Refleksi guru.
20. Refleksi siswa.
21. Remedial dan pengayaan.

### 18.3 Rekomendasi UI

Gunakan accordion agar tidak terlalu panjang:

```text
Informasi Umum
Komponen Inti
Langkah Pembelajaran
LKPD Digital
Asesmen
Refleksi dan Tindak Lanjut
```

Tambahkan checklist kelengkapan modul:

```text
Kelengkapan Modul
[✓] Identitas
[✓] CP dan TP
[✓] Sintaks EcoGrow
[✓] LKPD
[✓] Asesmen
[ ] Refleksi Guru
[ ] Remedial/Pengayaan
```

### 18.4 Acceptance Criteria

- Guru dapat melihat kelengkapan modul secara cepat.
- Modul tidak tampil sebagai teks panjang tanpa struktur.
- Ada preview modul.
- Ada tombol mock:
  - “Gunakan Modul”
  - “Edit Modul”
  - “Cetak Modul”

---

## 19. Revisi Laporan Guru dan Laporan Siswa

### 19.1 Status Saat Ini

Laporan guru sudah cukup baik. Namun, laporan siswa perlu dipastikan tersedia dan ramah anak.

### 19.2 Laporan Guru

Pertahankan isi:

- ringkasan kelas,
- kemajuan proyek,
- bukti terkumpul,
- kekuatan kelas,
- siswa yang perlu dukungan,
- aksi guru berikutnya.

Tambahkan jika belum ada:

- export/cetak mock,
- filter kelas/proyek,
- ringkasan per tahap EcoGrow.

### 19.3 Laporan Siswa

Buat atau perkuat halaman:

```text
/siswa/laporan-belajar
```

Isi:

- “Capaian Belajarku”
- “Misi yang Sudah Selesai”
- “Badge yang Kudapat”
- “Hal yang Sudah Kupahami”
- “Hal yang Perlu Kulatih Lagi”
- “Pesan Guru”

Gunakan bahasa ramah anak.

### 19.4 Acceptance Criteria

- Laporan siswa tidak berisi istilah teknis.
- Laporan guru dapat digunakan sebagai ringkasan kelas.
- Ada tombol mock cetak/unduh.
- Ada rekomendasi tindak lanjut.

---

## 20. Revisi Hubungan Antarfitur

### 20.1 Masalah

Fitur sudah lengkap, tetapi alur antarfitur perlu dibuat lebih terasa.

### 20.2 Alur Siswa Yang Disarankan

```text
EcoReadiness
→ EcoLearn
→ EcoMission
→ Cerita Belajarku
→ Portofolio
→ EcoMaster Quiz
→ Eco-Exhibition
→ Laporan Belajar
```

### 20.3 Implementasi Frontend

Tambahkan `NextSuggestedActionCard` pada setiap halaman utama.

Contoh:

#### Setelah EcoReadiness selesai

```text
Langkah berikutnya:
Belajar materi “Mengapa tanaman butuh cahaya?”
[Mulai Belajar]
```

#### Setelah EcoLearn selesai

```text
Sekarang waktunya mencoba di kebun.
[Lanjut ke Misi]
```

#### Setelah EcoMission selesai

```text
Kamu sudah menyelesaikan jurnal hari ini.
[Tulis Cerita Belajarku]
```

#### Setelah Cerita selesai

```text
Cerita kamu sudah masuk portofolio.
[Lihat Portofolio]
```

#### Setelah Kuis selesai

```text
Lihat hasil belajarmu.
[Buka Laporan Belajar]
```

### 20.4 Acceptance Criteria

- Setiap halaman utama siswa memiliki arah langkah berikutnya.
- Siswa tidak dibiarkan bingung setelah menyelesaikan aktivitas.
- Alur EcoGrow terasa sebagai perjalanan belajar yang utuh.

---

## 21. Revisi Terminologi Siswa

### 21.1 Masalah

Sebagian istilah teknis masih terlalu berat untuk siswa SD.

### 21.2 Rekomendasi Penggantian Istilah

| Istilah Teknis | Istilah Siswa |
|---|---|
| Assessment Diagnostik | Kuis Awal |
| Assessment Formatif | Latihan Misi |
| Assessment Sumatif | Kuis Akhir |
| Remedial | Latihan Ulang |
| Pengayaan | Tantangan Lanjutan |
| Submit Evidence | Kirim Bukti |
| Feedback | Pesan Guru |
| Portofolio Digital | Album Belajarku |
| Ecological Recognition | Kenali Alam |
| Ecological Exploration | Jelajahi Masalah |
| Ecological Execution | Lakukan Aksi |
| Ecological Reflection | Cerita dan Renungan |
| Ecological Mastery & Exhibition | Pamerkan Karya |
| Peer Assessment | Apresiasi Teman |
| Self Assessment | Cek Usahaku |

### 21.3 Ketentuan

- Istilah akademik boleh tetap ada pada halaman guru.
- Pada halaman siswa, istilah akademik hanya boleh tampil sebagai teks pendamping kecil.
- Label tombol harus menggunakan bahasa aksi.

---

## 22. Revisi Landing Page

### 22.1 Status Saat Ini

Landing page sudah informatif dan cukup kuat. Namun, tetap perlu dijaga agar tidak terlalu panjang dan tidak terlalu padat.

### 22.2 Rekomendasi

Pertahankan section:

- Hero.
- Masalah dan solusi.
- Apa itu EcoGrow.
- Alur belajar EcoGrow.
- Fitur siswa.
- Fitur guru.
- Muatan pembelajaran.
- Dampak pembelajaran.
- SDGs dan kearifan lokal.
- CTA login.

### 22.3 Revisi Yang Diperlukan

- Pastikan CTA “Masuk sebagai Siswa” dan “Masuk sebagai Guru” selalu mudah ditemukan.
- Kurangi paragraf panjang.
- Gunakan card visual untuk fitur.
- Pada bagian Sintaks EcoGrow, tampilkan label siswa:
  - Kenali Alam
  - Jelajahi Masalah
  - Lakukan Aksi
  - Cerita dan Renungan
  - Pamerkan Karya
- Istilah Ecological Recognition dan lainnya tetap boleh ditampilkan sebagai subtitle.

### 22.4 Acceptance Criteria

- Pengunjung memahami fungsi LMS dalam 10 detik.
- CTA login terlihat pada hero dan bagian akhir halaman.
- Landing page tidak terasa seperti dokumen akademik.
- Fitur siswa dan guru mudah dibedakan.

---

## 23. Mock Data Yang Perlu Disiapkan

Tambahkan atau rapikan mock data berikut.

### 23.1 Student Learning Flow

```ts
export const studentLearningFlow = [
  {
    id: "readiness",
    title: "Kuis Awal",
    description: "Cari tahu cara belajar yang paling cocok untukmu.",
    href: "/siswa/ecoreadiness",
    status: "completed"
  },
  {
    id: "learn",
    title: "Belajar Fotosintesis",
    description: "Pelajari mengapa tanaman membutuhkan cahaya.",
    href: "/siswa/ecolearn",
    status: "in_progress"
  },
  {
    id: "mission",
    title: "Rawat Tanaman Kangkungmu",
    description: "Catat tinggi dan kondisi tanaman hari ini.",
    href: "/siswa/ecomission",
    status: "pending"
  },
  {
    id: "reflection",
    title: "Cerita Belajarku",
    description: "Tulis pengalamanmu setelah merawat tanaman.",
    href: "/siswa/cerita-belajarku",
    status: "locked"
  }
];
```

### 23.2 Quiz Feedback

```ts
export const quizFeedback = {
  correct: [
    "Benar. Kamu memahami peran cahaya bagi tanaman.",
    "Hebat. Jawabanmu tepat.",
    "Bagus. Kamu mendapat EcoPoint."
  ],
  incorrect: [
    "Belum tepat. Coba ingat kembali materi di EcoLearn.",
    "Hampir benar. Perhatikan kembali fungsi daun.",
    "Coba lagi. Kamu bisa membaca petunjuk kecilnya."
  ]
};
```

### 23.3 Teacher Quick Feedback

```ts
export const teacherQuickFeedbackTemplates = [
  "Pengamatanmu sudah baik. Lanjutkan besok.",
  "Coba tambahkan foto tanaman yang lebih jelas.",
  "Jangan lupa tulis tinggi tanaman dalam satuan cm.",
  "Ceritakan juga perubahan warna daun.",
  "Kerja samamu dengan tim sudah terlihat baik."
];
```

### 23.4 Eco-Exhibition Mock

```ts
export const ecoExhibitionItems = [
  {
    id: "exhibit-1",
    studentName: "Adit",
    title: "Poster Siklus Hidup Kangkung",
    type: "poster",
    status: "waiting_review",
    badgeCandidate: "Eco Exhibitor"
  },
  {
    id: "exhibit-2",
    studentName: "Siti",
    title: "Cerita Panen Pertamaku",
    type: "story",
    status: "approved",
    badgeCandidate: "Young Eco Steward"
  }
];
```

---

## 24. Prioritas Revisi

### Prioritas Tinggi

1. Sederhanakan navigasi siswa.
2. Ubah EcoReadiness menjadi wizard ramah anak.
3. Tambahkan feedback langsung pada EcoMaster Quiz.
4. Tambahkan alur langkah berikutnya antarfitur.
5. Perkuat Cerita Belajarku dengan mood, eco promise, dan apresiasi teman.
6. Perkuat modul ajar guru dengan accordion dan checklist kelengkapan.
7. Perjelas Eco-Exhibition sebagai puncak pembelajaran.

### Prioritas Sedang

1. Tambahkan laporan belajar siswa.
2. Tambahkan template feedback cepat guru.
3. Perkuat portofolio sebagai album perkembangan.
4. Kurangi istilah teknis pada halaman siswa.
5. Tambahkan ringkasan tahap EcoGrow di laporan guru.

### Prioritas Rendah

1. Animasi tambahan.
2. Ilustrasi tambahan.
3. Badge visual tambahan.
4. Pengembangan role admin.
5. Integrasi backend.

Catatan: Role admin **tidak perlu dikembangkan pada tahap ini**.

---

## 25. Larangan Pengembangan Tahap Ini

Jangan lakukan hal berikut:

- Jangan menambahkan role Admin.
- Jangan membuat backend.
- Jangan mengganti arsitektur utama project secara ekstrem.
- Jangan menghapus fitur siswa atau guru yang sudah ada.
- Jangan membuat halaman siswa terlalu penuh.
- Jangan menggunakan istilah akademik terlalu dominan pada halaman siswa.
- Jangan menambahkan grafik kompleks pada dashboard siswa.
- Jangan membuat dashboard siswa terasa seperti dashboard guru.
- Jangan menambah fitur baru jika fitur lama belum mudah digunakan.

---

## 26. Acceptance Criteria Umum

Revisi dianggap berhasil jika:

1. Siswa SD dapat memahami halaman Beranda tanpa penjelasan panjang.
2. Siswa dapat menemukan misi hari ini dengan cepat.
3. Siswa dapat menyelesaikan EcoReadiness tanpa merasa sedang mengerjakan ujian formal.
4. Siswa mendapat feedback langsung setelah menjawab kuis.
5. Siswa selalu diarahkan ke langkah berikutnya setelah menyelesaikan aktivitas.
6. Guru dapat melihat prioritas harian di dashboard.
7. Guru dapat memberi feedback pada jurnal siswa dengan cepat.
8. Guru dapat membuka modul ajar dan memahami kelengkapannya.
9. Guru dapat melihat laporan kelas dan tindak lanjut.
10. UI tetap rapi pada desktop, tablet, dan mobile.
11. Tidak ada role Admin yang ditambahkan pada tahap ini.

---

## 27. Urutan Eksekusi Untuk Codex

Kerjakan revisi dengan urutan berikut:

1. Revisi navigasi siswa.
2. Revisi dashboard siswa agar CTA utama lebih jelas.
3. Ubah EcoReadiness menjadi wizard bertahap.
4. Tambahkan feedback langsung pada EcoMaster Quiz.
5. Tambahkan `NextSuggestedActionCard` pada EcoReadiness, EcoLearn, EcoMission, Cerita Belajarku, EcoMaster Quiz, dan Portofolio.
6. Revisi Cerita Belajarku dengan mood picker, eco promise, dan apresiasi teman.
7. Revisi Portofolio menjadi album perkembangan.
8. Tambahkan atau perkuat Eco-Exhibition pada Galeri/Portofolio.
9. Perkuat dashboard guru tanpa mengubah total struktur.
10. Tambahkan template feedback cepat di Monitoring Guru.
11. Perkuat Asesmen Guru dengan tab dan rekomendasi.
12. Perkuat Modul Ajar Guru dengan accordion dan checklist kelengkapan.
13. Tambahkan atau perkuat Laporan Belajar Siswa.
14. Rapikan istilah siswa agar lebih ramah anak.
15. Tambahkan mock data pendukung.
16. Uji responsive layout.
17. Jalankan typecheck dan build.

---

## 28. Target Akhir

Setelah revisi, LMS EcoGrow Learning harus terasa sebagai:

### Untuk siswa

Aplikasi belajar ekologis yang sederhana, menyenangkan, visual, dan berbasis perjalanan belajar.

Siswa harus merasa:

- tahu apa yang harus dilakukan,
- tahu misi hari ini,
- tahu perkembangan tanamannya,
- mendapat apresiasi,
- bisa bercerita,
- bisa melihat capaian,
- tidak bingung dengan banyak menu.

### Untuk guru

Dashboard pembelajaran yang ringkas, praktis, dan membantu keputusan harian.

Guru harus dapat:

- melihat kondisi kelas,
- meninjau jurnal,
- memberi feedback,
- melihat siswa yang perlu bantuan,
- membuka modul ajar,
- melihat asesmen,
- membaca laporan,
- menyiapkan tindak lanjut.

### Untuk LMS secara keseluruhan

Sistem harus tetap konsisten dengan EcoGrow Learning:

- berbasis misi ekologis,
- menggunakan sintaks EcoGrow,
- mendukung pembelajaran bermakna,
- mendukung refleksi,
- mendukung gamifikasi sehat,
- mendukung portofolio digital,
- mendukung guru sebagai aktivator pembelajaran.
