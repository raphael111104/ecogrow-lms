# Next Suggested Action Student Journey Batch Design

**Status:** Disetujui untuk implementasi langsung pada 27 Mei 2026 berdasarkan instruksi pengguna untuk melanjutkan batch berikutnya tanpa gerbang persetujuan tambahan.

## Tujuan

Batch 3 menghubungkan perjalanan siswa yang sudah ada dengan petunjuk langkah berikutnya yang konsisten, singkat, dan ramah anak. Fokusnya bukan membuat halaman baru, melainkan memberi arah setelah siswa menyelesaikan atau mencapai konteks belajar tertentu.

## Ruang Lingkup

### Termasuk

- Membuat komponen shared `NextSuggestedActionCard`.
- Menggunakan kartu tersebut pada `EcoReadiness`, `EcoLearn`, `EcoMission`, `Cerita Belajarku`, `Portofolio`, dan `EcoMaster Quiz`.
- Menggunakan route siswa yang sudah ada sebagai tujuan kartu.
- Menampilkan kartu bersyarat sesudah tindakan pada halaman yang memiliki state penyelesaian, seperti jurnal dan cerita.
- Menambahkan tes kontrak dan verifikasi browser untuk alur kartu.

### Tidak Termasuk

- Membuat route Eco-Exhibition baru; `/siswa/galeri` digunakan sebagai lokasi pamer karya yang tersedia saat ini.
- Mengubah logika nilai, badge, penyimpanan, autentikasi, backend, atau halaman guru.
- Mendesain ulang keseluruhan halaman selain penyisipan/penggantian CTA yang bertumpuk.

## Komponen

`NextSuggestedActionCard` menerima:

- `eyebrow`: label pendek, default `Langkah Berikutnya`.
- `title`: ajakan tindakan berikutnya.
- `description`: alasan sederhana bagi siswa.
- `href` dan `actionLabel`: CTA utama.
- `secondaryAction` opsional untuk rute alternatif yang memang perlu dipertahankan.
- `className` opsional agar dapat ditempatkan dalam layout halaman yang ada.

Komponen memakai `EcoCard` dan `EcoButton`, dengan ikon arah/perjalanan yang konsisten. Komponen tidak mengelola state atau membaca storage; halaman induk menentukan kapan kartu tampil.

## Alur Kartu

| Halaman | Kondisi tampil | Aksi berikutnya | Tujuan |
|---|---|---|---|
| EcoReadiness | Profil sudah tampil | Pelajari alasan tanaman membutuhkan cahaya | `/siswa/ecolearn` |
| EcoLearn | Selalu, sebagai penutup materi | Coba pengamatan di kebun | `/siswa/ecomission` |
| EcoMission | Jurnal berhasil tersimpan | Tulis pengalaman hari ini | `/siswa/cerita-belajarku` |
| Cerita Belajarku | Cerita berhasil tersimpan | Lihat album perkembangan | `/siswa/portofolio` |
| Portofolio | Selalu, karena album memuat bukti yang sudah ada | Uji pemahaman lewat kuis akhir | `/siswa/ecomaster-quiz` |
| EcoMaster Quiz | Hasil sudah tampil | Pamerkan karya di galeri | `/siswa/galeri` |

Pada hasil EcoReadiness, aksi sekunder `Lanjut ke Misi` dipertahankan dalam kartu agar pilihan yang sudah disetujui pada Batch 2 tidak hilang. Pada hasil EcoMaster, CTA laporan belajar tetap tersedia selain kartu menuju pameran.

## Keadaan Dan Perilaku

- Kartu pada EcoMission hanya muncul setelah `notice.tone === "success"` agar bantuan guru atau validasi gagal tidak dianggap penyelesaian jurnal.
- Kartu pada Cerita hanya muncul setelah state `saved` bernilai benar.
- Kartu pada EcoReadiness dan EcoMaster hanya muncul pada tampilan hasil.
- EcoLearn dan Portofolio dapat menampilkan kartu tanpa kondisi karena konteks halamannya sudah merupakan titik lanjut.

## Verifikasi

- Tes kontrak memastikan komponen reusable ada dan enam halaman menggunakannya.
- Tes kontrak memastikan route urutan perjalanan tersedia dalam penggunaan komponen.
- Suite UI/data yang telah ada, typecheck, dan build produksi tetap lulus.
- Browser memeriksa paling sedikit satu alur bersyarat (`EcoMission` atau `Cerita`), satu alur hasil (`EcoMaster`), dan tampilan mobile tanpa overflow.

## Kriteria Selesai

- Keenam halaman utama memuat `NextSuggestedActionCard` pada kondisi yang tepat.
- CTA mengikuti urutan siswa yang ditentukan roadmap.
- Tidak muncul kartu penyelesaian jurnal atau cerita sebelum siswa menyimpan.
- Hasil kuis akhir tetap menawarkan laporan belajar sambil mengarahkan ke pamer karya.
- Implementasi lolos verifikasi otomatis dan browser.
