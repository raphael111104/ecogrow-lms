# Student Navigation And Focus Batch Design

**Status:** Disetujui untuk implementasi pada 27 Mei 2026.

**Sumber kebutuhan:** `rangkuman-revisi-frontend-ecogrow-lms-design-thinking.md`, Batch 1 yang dipilih pengguna.

## Tujuan

Membuat ruang siswa lebih mudah dipahami oleh anak SD dengan mengurangi pilihan navigasi utama dan memperjelas bahwa misi hari ini adalah aksi pertama yang perlu dilakukan. Route dan fitur yang sudah ada tetap tersedia.

## Ruang Lingkup

Batch ini hanya mencakup:

- navigasi siswa desktop dan mobile pada shell bersama;
- pengelompokan menu sekunder siswa dalam `Lainnya`;
- penajaman prioritas visual dashboard `/siswa`;
- kontrak uji untuk label, batas jumlah menu utama, dan CTA misi.

Batch ini tidak mencakup wizard `EcoReadiness`, feedback `EcoMaster Quiz`, `Eco-Exhibition`, backend, autentikasi baru, atau role Admin.

## Navigasi Siswa

### Desktop

Sidebar siswa menampilkan enam menu utama:

1. `Beranda`
2. `Misi`
3. `Belajar`
4. `Bermain`
5. `Cerita`
6. `Portofolio`

Setelah kelompok utama, sebuah kontrol `Lainnya` membuka kelompok sekunder:

- `Galeri`
- `Kuis Akhir`
- `Tantangan Rumah`
- `Panen`

Jika siswa sedang berada pada route sekunder, `Lainnya` tetap terbaca sebagai kelompok aktif dan tautan route aktif disorot di dalam kelompoknya.

### Mobile

Bottom navigation siswa menggunakan lima item:

1. `Beranda`
2. `Misi`
3. `Belajar`
4. `Bermain`
5. `Lainnya`

Tombol `Lainnya` membuka menu halaman siswa yang memuat `Cerita`, `Portofolio`, dan empat route sekunder lainnya. Menu guru tidak berubah.

## Dashboard Siswa

Dashboard mempertahankan greeting, tanaman, perjalanan, quick actions, dan badge yang sudah ada. Hierarkinya disesuaikan:

- Kartu `Misi Hari Ini` menjadi elemen fokus pertama setelah sapaan.
- Tombol `Lanjutkan Misi` diperkuat sebagai aksi primer yang paling jelas.
- `Tanamanku` tetap berada di dekat misi sebagai konteks pendukung.
- Perjalanan, aktivitas tambahan, dan badge diletakkan setelah fokus utama.
- Copy tetap ramah anak dan tidak menambah istilah teknis.

Tidak perlu menambah kartu statistik atau menghapus fitur yang sudah tersedia.

## Struktur Implementasi

- `src/data/navigation.ts` tetap menyimpan semua route siswa, tetapi mengekspor pembagian menu utama dan menu tambahan agar shell tidak menggandakan aturan navigasi.
- `src/components/layout/AppShell.tsx` menggunakan pembagian tersebut untuk sidebar desktop, bottom navigation mobile, serta drawer/menu halaman siswa.
- `src/features/student/dashboard/StudentDashboardPage.tsx` dan/atau `src/components/student/TodayMissionCard.tsx` menerima perubahan kecil pada urutan dan penekanan CTA.
- Test kontrak berbasis source/data memastikan jumlah menu utama dan perilaku `Lainnya` tidak mundur tanpa sengaja.

## Aksesibilitas Dan Responsif

- Kontrol `Lainnya` berupa tombol dengan `aria-expanded` dan label yang jelas.
- Tautan aktif tetap terlihat melalui warna/kontras yang sudah dipakai shell.
- Mobile hanya memiliki lima target bottom navigation, dengan ukuran sentuh yang tetap nyaman.
- Route sekunder tetap dapat dijangkau tanpa bergantung pada hover.

## Verifikasi

- Jalankan test kontrak navigasi/dashboard yang baru.
- Jalankan `npm run typecheck`.
- Jalankan `npm run build`.
- Verifikasi `/siswa` pada desktop dan mobile melalui browser lokal:
  - enam menu utama desktop;
  - lima item bottom navigation mobile;
  - menu `Lainnya` membuka route sekunder;
  - route sekunder aktif dapat dikenali;
  - CTA `Lanjutkan Misi` terlihat dominan dan menuju `/siswa/ecomission`.

## Catatan Repository

Repository aktif belum memiliki commit dasar dan telah berisi banyak file staged dari pekerjaan sebelumnya. Spesifikasi dan implementasi batch ini akan dikerjakan inline serta diverifikasi tanpa membuat commit yang mencampur seluruh baseline tersebut.
