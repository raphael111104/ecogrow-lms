# EcoGrow LMS Major Layout Redesign Design

**Status:** Disetujui untuk implementasi bertahap pada 26 Mei 2026.

**Sumber kebutuhan:** `codex-layout-redesign-major-ecogrow-lms.md`

## Tujuan

Redesign frontend EcoGrow Learning membuat ruang siswa terasa seperti perjalanan belajar ekologis yang sederhana dan menggembirakan, sedangkan ruang guru menjadi dashboard operasional yang ringkas dan mudah ditindaklanjuti. Perubahan menggunakan frontend dan mock data yang sudah ada tanpa backend baru.

## Arah Visual dan Pengalaman

Antarmuka mempertahankan identitas kebun EcoGrow yang sudah ada: hijau sebagai warna pertumbuhan, kuning untuk apresiasi, dan biru untuk materi atau aktivitas digital. Arah barunya adalah `garden journey`: kartu besar, ruang kosong lebih lega, tahapan belajar visual, ilustrasi tanaman, dan CTA tunggal yang mudah ditemukan.

Untuk siswa, istilah utama ditulis dalam bahasa anak: `Misi`, `Belajar`, `Bermain`, `Cerita`, dan `Kuis Akhir`. Istilah pedagogis tetap dapat hadir sebagai keterangan pendamping, bukan sebagai navigasi utama atau fokus kartu.

Untuk guru, visual lebih tenang dan padat secukupnya. Dashboard mengutamakan antrian pekerjaan, proyek aktif, siswa yang perlu bantuan, dan aksi cepat; dekorasi tidak boleh mengalahkan keterbacaan.

## Arsitektur UI

### Shell dan navigasi

`AppShell` tetap menjadi pintu layout bersama agar route dan autentikasi mock tidak berubah, tetapi renderingnya dibedakan secara jelas berdasarkan role:

- Ruang siswa memakai header yang menonjolkan EcoPoint dan avatar, sidebar desktop berlabel pendek, serta bottom navigation mobile berisi aksi perjalanan utama.
- Ruang guru memakai pencarian, pemilih kelas, quick action, sidebar operasional, dan bottom navigation mobile yang berfokus pada ringkasan, modul, monitoring, serta laporan.
- Navigasi tidak menghapus route lama. Item sekunder siswa tetap dapat diakses melalui kelompok `Lainnya` atau tautan kontekstual dari halaman utama.

### Batas komponen

Halaman baru tidak ditambahkan ke berkas monolitik `PrototypePages.tsx` atau `TeacherPages.tsx`. Halaman yang diredesign dipindahkan bertahap ke folder feature yang sudah tersedia, menggunakan komponen bersama yang kecil:

- `src/components/shared`: judul halaman, stepper, progress/status, state, action card, dan alert.
- `src/components/student`: kartu greeting, misi hari ini, perjalanan EcoGrow, tanaman, badge, dan quick action.
- `src/components/teacher`: ringkasan, kebutuhan aksi, proyek aktif, antrian submission, dan panel rekomendasi.

Ekspor route existing tetap sama sehingga migrasi dapat dilakukan halaman demi halaman tanpa memutus navigasi.

### Data mock dan state

Mock data ditambahkan pada lapisan `src/data` atau repository mock sesuai pola yang sudah ada:

- `FriendlyStatus` mendukung `not_started`, `in_progress`, `waiting_feedback`, `needs_revision`, `completed`, dan `locked`.
- `studentTodayTasks` memberi maksimal tiga prioritas harian.
- `teacherActionItems` memberi daftar keputusan yang perlu dikerjakan guru.

Interaksi seperti simpan jurnal, pilih mood, tinjau submission, atau cetak laporan tetap lokal/mock. Setiap aksi penting menunjukkan success, empty, loading, atau error state yang dapat didemonstrasikan.

## Tahapan Implementasi

### Tahap 1: Fondasi dan pengalaman siswa inti

Tujuan tahap ini adalah memastikan siswa dapat menemukan misi aktif dan mengisi bukti perkembangan dengan cepat.

- Bedakan shell siswa dan guru serta sederhanakan label navigasi siswa.
- Tambahkan tipe/status dan data tugas harian pendukung.
- Buat komponen shared/student minimum yang dipakai dashboard dan misi.
- Redesign `/siswa` menjadi greeting ringkas, misi dominan, journey stepper, empat quick action, tanaman, tiga badge, dan pesan guru.
- Redesign `/siswa/ecomission` menjadi satu tahap aktif, instruksi pendek, input bukti sederhana, umpan balik simpan mock, dan action bar mobile.

### Tahap 2: Perjalanan siswa lengkap

Redesign `/siswa/ecolearn`, `/siswa/ecoplay`, `/siswa/ecomaster-quiz`, `/siswa/cerita-belajarku`, `/siswa/portofolio`, serta menambah `/siswa/laporan-belajar`. Halaman siswa tetap bebas tabel kompleks dan mengutamakan satu aksi utama.

### Tahap 3: Operasional guru

Redesign dashboard, modul ajar, proyek, monitoring, dan asesmen guru; tambahkan `/guru/laporan`. Ringkasan dashboard dibatasi empat metrik, sedangkan detail serta feedback tersedia pada halaman khusus.

### Tahap 4: Landing dan validasi akhir

Landing page disusun ulang menjadi hero dua CTA, masalah-solusi, alur lima tahap, fitur siswa/guru, dampak, SDGs/kearifan lokal, dan CTA login. Semua alur diperiksa pada mobile, tablet, desktop, kemudian divalidasi dengan typecheck dan build.

## Responsif dan Aksesibilitas

- Mobile siswa memakai kartu satu kolom, CTA utama mudah dijangkau, bottom navigation, serta sticky action pada pengisian jurnal.
- Desktop siswa maksimal dua kolom agar fokus belajar terjaga.
- Dashboard guru dapat memakai dua sampai tiga kolom pada desktop, namun kembali satu kolom pada mobile.
- Elemen interaktif memiliki fokus keyboard, label yang jelas, kontras yang cukup, dan teks tombol yang menjelaskan aksi.

## Verifikasi

Setiap tahap diverifikasi melalui:

- `npm run typecheck`
- `npm run build`
- Pemeriksaan browser pada viewport mobile dan desktop untuk route yang berubah.
- Pengujian manual CTA, navigasi, serta state mock yang ditambahkan pada tahap terkait.

## Keputusan Ruang Lingkup

- Backend, autentikasi riil, unggahan persisten, dan pencetakan laporan nyata tidak termasuk redesign ini.
- Route dan fitur utama yang sudah tersedia tidak dihapus.
- Berkas monolitik lama hanya ditinggalkan untuk halaman yang belum masuk tahap migrasi; refactor dilakukan saat halaman tersebut diredesign.
- Tahap 1 menjadi unit implementasi pertama yang berdiri sendiri dan dapat diverifikasi sebelum halaman siswa/guru lain dikerjakan.

