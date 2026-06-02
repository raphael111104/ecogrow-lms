# EcoReadiness And EcoMaster Learning Feedback Batch Design

**Status:** Disetujui untuk implementasi pada 27 Mei 2026.

## Tujuan

Batch 2 membuat dua titik belajar prioritas tinggi terasa lebih ramah siswa:

- `EcoReadiness` menjadi kuis awal bertahap yang tidak terasa seperti ujian panjang.
- `EcoMaster Quiz` memberi feedback segera yang menjelaskan jawaban dan menunjukkan langkah belajar berikutnya.

Batch ini hanya mengubah antarmuka frontend dan perilaku mock/local storage yang sudah tersedia.

## Ruang Lingkup

### Termasuk

- Mengubah halaman `/siswa/ecoreadiness` menjadi wizard empat langkah.
- Menampilkan maksimal dua pertanyaan EcoReadiness pada satu langkah.
- Mengganti copy formal EcoReadiness dengan bahasa siswa yang ringan.
- Menyajikan hasil EcoReadiness sebagai `Profil Belajarku` dengan CTA ke EcoLearn dan EcoMission.
- Mengunci jawaban soal aktif EcoMaster setelah dipilih sampai siswa melanjutkan.
- Memperkaya feedback per jawaban EcoMaster dengan penjelasan konsep dan EcoPoint untuk jawaban benar.
- Memperkaya ringkasan akhir EcoMaster dengan rekomendasi dan tautan ke laporan belajar.
- Menambahkan tes kontrak terfokus dan verifikasi browser untuk kedua alur.

### Tidak Termasuk

- Perubahan backend, autentikasi, database, atau API penilaian.
- Pengembangan `NextSuggestedActionCard` lintas seluruh halaman siswa.
- Perubahan EcoMission, EcoLearn, refleksi, portofolio, atau tampilan guru di luar tautan yang dipakai sebagai tujuan CTA.
- Sistem hadiah baru atau kalkulasi skor baru di luar data pertanyaan yang sudah ada.

## EcoReadiness

### Alur

Halaman menggunakan empat layar pertanyaan dan satu layar hasil:

1. `Yang sudah kutahu`: `diag-1` dan `diag-2`.
2. `Hal yang ingin kujelajahi`: `diag-3` dan `diag-4`.
3. `Cara belajar dan menjaga alam`: `diag-5` dan `diag-6`.
4. `Mengamati dan bekerja bersama`: `diag-7` dan `diag-8`.
5. `Profil Belajarku`: ringkasan yang muncul setelah hasil disimpan.

Progress menunjukkan empat tahap petualangan sampai profil siap, bukan daftar delapan nomor ujian. Setiap layar pertanyaan selalu memuat tepat dua soal dari data yang sudah tersedia.

### Interaksi

- Hero memakai label `Kuis Awal` dan kalimat pengantar yang mengundang siswa mengenal cara belajarnya.
- Layar pertanyaan memuat progress, judul tema, satu atau dua kartu pertanyaan, serta tombol `Kembali` dan `Lanjut`.
- Tombol `Lanjut` tidak aktif sebelum semua jawaban pada layar saat ini dipilih.
- Pada layar terakhir, tombol berubah menjadi `Lihat Profilku` dan menyimpan hasil melalui mekanisme `useMockStorage` yang ada.
- Siswa dapat kembali ke langkah sebelumnya tanpa kehilangan jawaban sementara.

### Hasil

Hasil menampilkan:

- judul `Profil Belajarku`;
- kalimat sederhana tentang gaya atau minat belajar siswa;
- pengetahuan awal yang sudah baik atau topik yang sebaiknya dipelajari dahulu;
- rekomendasi pertama yang berasal dari skor yang sudah dihitung;
- CTA `Mulai Belajar` menuju `/siswa/ecolearn`;
- CTA `Lanjut ke Misi` menuju `/siswa/ecomission`.

Nilai tetap boleh disimpan untuk portofolio, tetapi angka skor tidak menjadi fokus visual terbesar.

## EcoMaster Quiz

### Alur Jawaban

- Pola satu soal pilihan ganda per layar tetap digunakan.
- Setelah siswa memilih jawaban, pilihan soal aktif dikunci sehingga feedback tidak dapat diubah hanya dengan mengganti opsi berulang kali.
- Feedback muncul langsung sebelum tombol lanjut:
  - jawaban benar: pesan apresiatif, penjelasan konsep, dan jumlah EcoPoint berdasarkan `question.points`;
  - jawaban belum tepat: pesan suportif dan penjelasan konsep atau arahan belajar singkat.
- Tombol lanjut tetap eksplisit: `Lanjut` untuk soal berikutnya dan `Lihat Hasil` untuk pertanyaan terakhir.

### Ringkasan Hasil

Ringkasan selesai memuat:

- skor dan badge yang sudah digunakan halaman saat ini;
- area yang telah dipahami;
- area yang perlu latihan atau tantangan lanjutan;
- CTA kontekstual menuju EcoLearn atau EcoChallenge;
- CTA `Lihat Laporan Belajar` menuju `/siswa/laporan-belajar`;
- aksi `Ulangi Kuis`.

Perhitungan skor tetap memakai `calculateSingleChoiceScore` dan data `ecoMasterSummativeQuestions` yang telah tersedia.

## Komponen Dan Data

Perubahan utama dipusatkan pada:

- `src/features/student/readiness/EcoReadinessPage.tsx` untuk state langkah, pengelompokan pertanyaan, hasil, dan copy baru.
- `src/features/student/quiz/EcoMasterAssessmentPage.tsx` untuk penguncian jawaban, feedback EcoPoint, dan CTA ringkasan.
- Tes kontrak baru di sekitar fitur siswa untuk memeriksa struktur penting tanpa memperkenalkan dependency pengujian UI baru.

Data sumber pertanyaan dan utilitas skor dipertahankan kecuali diperlukan penambahan helper kecil yang hanya mengurangi pengulangan logika tampilan.

## Keadaan Dan Kegagalan

- Jawaban EcoReadiness tersimpan dalam state selama wizard berjalan dan hasil akhir tetap tersimpan di local storage mock.
- Tombol navigasi tidak mengizinkan siswa maju dengan pertanyaan layar yang kosong.
- Refresh setelah hasil tersimpan tetap menampilkan hasil yang sudah ada, mengikuti perilaku saat ini.
- EcoMaster tidak memerlukan koneksi jaringan; semua feedback diturunkan dari data pertanyaan lokal.

## Verifikasi

### Tes Otomatis

- Tes kontrak EcoReadiness memastikan adanya label `Kuis Awal`, progress wizard, pembatasan kelompok soal, dan CTA hasil.
- Tes kontrak EcoMaster memastikan jawaban dikunci, feedback memuat EcoPoint, dan ringkasan memiliki CTA laporan belajar.
- Jalankan suite kontrak terkait, tes data yang ada, `npm run typecheck`, dan `npm run build`.

### Browser

- Desktop dan mobile `/siswa/ecoreadiness`: siswa dapat melalui langkah dengan maksimal dua pertanyaan per tampilan dan mencapai `Profil Belajarku`.
- Desktop dan mobile `/siswa/ecomaster-quiz`: pilihan memunculkan feedback segera, tombol lanjut jelas, dan ringkasan menyediakan tautan laporan belajar.

## Kriteria Selesai

- EcoReadiness tidak lagi merender delapan pertanyaan sekaligus.
- Tidak ada tampilan EcoReadiness yang memuat lebih dari dua pertanyaan.
- Hasil EcoReadiness mudah dibaca dan menawarkan rute belajar/misi.
- EcoMaster memberi feedback segera setiap jawaban dan menampilkan EcoPoint saat benar.
- Ringkasan EcoMaster menyediakan rekomendasi serta tautan laporan belajar.
- Perubahan lolos tes, pemeriksaan tipe, build, dan pemeriksaan browser yang relevan.
