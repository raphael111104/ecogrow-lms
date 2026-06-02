# Centered Journey Hero Redesign Design

**Status:** Disetujui untuk implementasi pada 27 Mei 2026.

**Sumber kebutuhan:** Komentar browser pada hero landing `/` dan pilihan visual `B. Centered Journey`.

## Tujuan

Merombak hero landing EcoGrow menjadi komposisi tunggal yang terpusat agar pesan utama dan dua pintu masuk role terbaca lebih cepat. Panel perjalanan besar di sebelah kanan dihapus karena menambah bobot visual tanpa menjadi aksi utama.

## Arah Visual

Hero mempertahankan foto anak berkebun sebagai latar penuh dan nuansa hijau gelap EcoGrow, tetapi komposisinya dibuat lebih tenang serta simetris. Fokus visual berada pada judul `Tumbuhkan belajar dari kebun sekolah.` di tengah viewport, diikuti deskripsi dan CTA siswa/guru.

Identitas perjalanan belajar tidak dihapus. Lima tahap tetap muncul sebagai trail tipis di bawah tautan video:

`Kenali - Jelajahi - Aksi - Refleksi - Pamerkan`

Trail tersebut bersifat pendukung, bukan panel konten, sehingga hero tetap lapang.

## Amandemen Headline

Berdasarkan komentar browser lanjutan, judul utama dihias dengan tekstur warna hangat bernuansa sinar matahari dan daun. Setiap huruf memiliki animasi bounce bergelombang yang berjalan loop secara lembut, sementara mode `prefers-reduced-motion` meniadakan gerakan tanpa menghilangkan dekorasi teks.

## Struktur Komponen

Perubahan hanya menyentuh `src/components/landing/HeroSection.tsx` beserta gaya hero yang memang dibutuhkan di `src/app/globals.css`.

- Pertahankan latar gambar, modal video, navbar, dan route CTA yang sudah ada.
- Hapus grid dua kolom dan seluruh card `Perjalanan Siswa` di kanan.
- Ubah kontainer hero menjadi flex satu kolom dengan alignment tengah dan lebar teks terkontrol.
- Susun konten: eyebrow, judul, deskripsi, dua CTA, tombol video, dan trail lima tahap.
- Overlay latar dapat disesuaikan menjadi vignette terpusat agar foto tetap terasa tetapi teks berkontras baik.

Tidak ada perubahan data, route, autentikasi, atau section landing lain.

## Responsif dan Aksesibilitas

- Desktop: judul dan CTA terpusat; dua CTA sejajar.
- Tablet dan mobile: konten tetap terpusat, CTA ditumpuk penuh/lebar nyaman, trail membungkus rapi.
- Tombol video tetap memiliki label yang jelas dan modal video mempertahankan tombol tutup yang dapat diakses.
- Kontras teks putih/kuning terhadap overlay gelap dipertahankan.

## Verifikasi

- Jalankan `npm run typecheck`.
- Jalankan `npm run build`.
- Buka `/` pada viewport desktop dan mobile melalui browser lokal.
- Pastikan panel kanan tidak ada, konten terpusat, kedua CTA masih menuju `/siswa` dan `/guru`, tombol video tetap membuka modal, dan trail lima tahap terlihat tanpa memotong layout.

## Batas Ruang Lingkup

- Tidak mengubah isi section setelah hero.
- Tidak mengganti aset foto atau struktur navbar.
- Tidak menambahkan backend, data mock, atau animasi kompleks baru.
