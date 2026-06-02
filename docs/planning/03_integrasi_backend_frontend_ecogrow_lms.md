# 03 — PENYESUAIAN BACKEND DENGAN FRONTEND ECOGROW LMS YANG SUDAH MENGGUNAKAN MOCKUP DATA

> File ini ditujukan untuk dieksekusi oleh Codex setelah prototype mockup data selesai. Fokus file ini adalah mengubah prototype menjadi aplikasi full-stack dengan backend, database, autentikasi, API, dan migrasi data mock menjadi seed data.

---

## 1. Tujuan Integrasi Backend

Ubah EcoGrow Learning LMS dari prototype berbasis mock data menjadi aplikasi full-stack yang memiliki:

1. Autentikasi pengguna.
2. Role-based access untuk guru dan peserta didik.
3. Database untuk kelas, siswa, modul, proyek, misi, jurnal, quiz, badge, panen, galeri, refleksi, dan portofolio.
4. API atau server actions untuk menggantikan import mock data.
5. Seed data dari mockup yang sudah ada.
6. Upload media yang aman untuk foto project.
7. Analitik berbasis data nyata.
8. Proteksi data anak dan pembatasan akses publik.
9. Struktur kode yang tetap kompatibel dengan frontend yang sudah dibuat.

---

## 2. Stack Backend yang Direkomendasikan

Gunakan pendekatan full-stack Next.js agar integrasi dengan frontend lebih sederhana.

```txt
Framework     : Next.js App Router
Backend       : Route Handlers / Server Actions
ORM           : Prisma
Database Dev  : SQLite
Database Prod : PostgreSQL atau Supabase Postgres
Auth          : Auth.js / NextAuth atau custom session sederhana
Validation    : Zod
Upload        : Local storage dev, S3/Supabase Storage production
Password      : bcrypt
API Format    : REST-like route handlers atau Server Actions
```

Untuk tahap awal, gunakan SQLite agar mudah dijalankan lokal. Pastikan desain schema mudah dipindahkan ke PostgreSQL.

---

## 3. Prinsip Migrasi dari Mock Data ke Backend

Jangan langsung menghapus mock data. Lakukan migrasi bertahap:

1. Simpan semua mock data lama di folder `src/data`.
2. Buat schema Prisma yang meniru struktur mock data.
3. Buat seed script dari mock data ke database.
4. Buat service layer di `src/services`.
5. Ganti penggunaan mock data di page/component dengan service/API.
6. Jika API gagal, gunakan fallback mock data pada development.
7. Pastikan UI tidak berubah besar agar frontend tetap stabil.

---

## 4. Struktur Folder Backend

Tambahkan struktur berikut:

```txt
prisma/
├─ schema.prisma
└─ seed.ts

src/
├─ app/
│  ├─ api/
│  │  ├─ auth/
│  │  ├─ classes/
│  │  ├─ users/
│  │  ├─ modules/
│  │  ├─ projects/
│  │  ├─ missions/
│  │  ├─ journals/
│  │  ├─ quizzes/
│  │  ├─ attempts/
│  │  ├─ badges/
│  │  ├─ harvests/
│  │  ├─ gallery/
│  │  ├─ reflections/
│  │  ├─ challenges/
│  │  ├─ portfolios/
│  │  └─ analytics/
├─ lib/
│  ├─ prisma.ts
│  ├─ auth.ts
│  ├─ password.ts
│  ├─ permissions.ts
│  ├─ upload.ts
│  └─ validators/
├─ services/
│  ├─ user-service.ts
│  ├─ class-service.ts
│  ├─ module-service.ts
│  ├─ project-service.ts
│  ├─ mission-service.ts
│  ├─ journal-service.ts
│  ├─ quiz-service.ts
│  ├─ badge-service.ts
│  ├─ harvest-service.ts
│  ├─ gallery-service.ts
│  ├─ reflection-service.ts
│  ├─ portfolio-service.ts
│  └─ analytics-service.ts
└─ hooks/
   ├─ useClasses.ts
   ├─ useProjects.ts
   ├─ useMissions.ts
   ├─ useJournals.ts
   ├─ useQuizzes.ts
   └─ usePortfolio.ts
```

---

## 5. Instalasi Dependency

Jalankan:

```bash
npm install @prisma/client prisma zod bcryptjs
npm install -D tsx
```

Jika menggunakan Auth.js/NextAuth:

```bash
npm install next-auth
```

Jika menggunakan React Query/SWR untuk fetching:

```bash
npm install @tanstack/react-query
```

React Query opsional. Jika tidak digunakan, cukup gunakan `fetch` dari server component atau client component.

---

## 6. Schema Database Prisma

Buat `prisma/schema.prisma` dengan model berikut. Silakan sesuaikan penamaan field dengan frontend yang sudah ada, tetapi jangan mengubah makna data.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

enum UserRole {
  TEACHER
  STUDENT
  ADMIN
}

enum PancanitiStage {
  NITI_HARTI
  NITI_SURTI
  NITI_BUKTI
  NITI_BAKTI
  NITI_SAJATI
}

enum MissionStatus {
  LOCKED
  ACTIVE
  SUBMITTED
  COMPLETED
}

enum ProjectStatus {
  PLANNED
  ACTIVE
  COMPLETED
}

enum PlantingMethod {
  HYDROPONIC
  SOIL
  COMPOST
  OBSERVATION
}

enum AssessmentType {
  DIAGNOSTIC
  FORMATIVE
  SUMMATIVE
  REFLECTION
  PERFORMANCE
}

enum PlantCondition {
  SEHAT
  LAYU
  KUNING
  PERLU_PERAWATAN
}

enum WeatherType {
  CERAH
  MENDUNG
  HUJAN
}

model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String?
  role         UserRole
  avatarUrl    String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  teacherClasses ClassRoom[] @relation("TeacherClasses")
  studentProfile StudentProfile?
  galleryPosts   GalleryPost[]
  reflections    ReflectionEntry[]
  quizAttempts   QuizAttempt[]
}

model StudentProfile {
  id        String @id @default(cuid())
  userId    String @unique
  classId   String
  groupName String
  level     Int    @default(1)
  points    Int    @default(0)

  ekologis  Int @default(0)
  mandiri   Int @default(0)
  adaptif   Int @default(0)
  inovatif  Int @default(0)
  humanis   Int @default(0)

  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  classRoom ClassRoom @relation(fields: [classId], references: [id], onDelete: Cascade)

  journals       JournalEntry[]
  studentBadges  StudentBadge[]
}

model ClassRoom {
  id        String   @id @default(cuid())
  name      String
  grade     String
  phase     String
  teacherId String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  teacher  User             @relation("TeacherClasses", fields: [teacherId], references: [id])
  students StudentProfile[]
  projects EcoProject[]
}

model LearningModule {
  id          String   @id @default(cuid())
  title       String
  subject     String
  phase       String
  grade       String
  topic       String
  duration    String
  description String
  outcomes    String   // JSON string untuk SQLite
  sdgs         String   // JSON string
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  projects EcoProject[]
  missions EcoMission[]
  quizzes  Quiz[]
}

model EcoProject {
  id          String         @id @default(cuid())
  title       String
  classId     String
  moduleId    String
  plantType   String
  method      PlantingMethod
  startDate   DateTime
  endDate     DateTime
  progress    Int            @default(0)
  status      ProjectStatus
  description String
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  classRoom ClassRoom      @relation(fields: [classId], references: [id], onDelete: Cascade)
  module    LearningModule @relation(fields: [moduleId], references: [id])
  missions  EcoMission[]
  journals  JournalEntry[]
  harvests  HarvestReport[]
  gallery   GalleryPost[]
  reflections ReflectionEntry[]
}

model EcoMission {
  id           String         @id @default(cuid())
  projectId    String
  moduleId     String?
  title        String
  stage        PancanitiStage
  status       MissionStatus @default(ACTIVE)
  points       Int           @default(0)
  instructions String
  tasks        String        // JSON string
  orderIndex   Int
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  project EcoProject      @relation(fields: [projectId], references: [id], onDelete: Cascade)
  module  LearningModule? @relation(fields: [moduleId], references: [id])
}

model JournalEntry {
  id            String         @id @default(cuid())
  studentId     String
  projectId     String
  date          DateTime
  plantHeightCm Float
  leafCount     Int
  condition     PlantCondition
  weather       WeatherType
  waterMl       Int
  note          String
  photoUrl      String?
  feedback      String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  student StudentProfile @relation(fields: [studentId], references: [id], onDelete: Cascade)
  project EcoProject     @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model Quiz {
  id        String         @id @default(cuid())
  moduleId  String?
  title     String
  type      AssessmentType
  createdAt DateTime       @default(now())
  updatedAt DateTime       @updatedAt

  module    LearningModule? @relation(fields: [moduleId], references: [id])
  questions QuizQuestion[]
  attempts  QuizAttempt[]
}

model QuizQuestion {
  id             String @id @default(cuid())
  quizId         String
  question       String
  options        String // JSON string
  answer         String
  explanation    String
  cognitiveLevel String

  quiz Quiz @relation(fields: [quizId], references: [id], onDelete: Cascade)
}

model QuizAttempt {
  id        String   @id @default(cuid())
  quizId    String
  userId    String
  score     Int
  answers   String   // JSON string
  createdAt DateTime @default(now())

  quiz Quiz @relation(fields: [quizId], references: [id], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Badge {
  id          String @id @default(cuid())
  name        String
  description String
  icon        String
  requirement String

  students StudentBadge[]
}

model StudentBadge {
  id        String   @id @default(cuid())
  studentId String
  badgeId   String
  awardedAt DateTime @default(now())

  student StudentProfile @relation(fields: [studentId], references: [id], onDelete: Cascade)
  badge   Badge          @relation(fields: [badgeId], references: [id], onDelete: Cascade)

  @@unique([studentId, badgeId])
}

model HarvestReport {
  id               String   @id @default(cuid())
  projectId         String
  groupName         String
  productName       String
  quantity          Float
  unit              String
  contributionNote  String
  createdAt         DateTime @default(now())

  project EcoProject @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model GalleryPost {
  id          String   @id @default(cuid())
  userId      String
  projectId   String
  title       String
  description String
  imageUrl    String
  likes       Int      @default(0)
  isPublic    Boolean  @default(false)
  createdAt   DateTime @default(now())

  user    User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  project EcoProject @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model ReflectionEntry {
  id                 String   @id @default(cuid())
  userId             String
  projectId           String
  feeling            String
  lessonLearned      String
  problemSolved      String
  teamworkNote       String
  ecologicalPromise  String
  createdAt          DateTime @default(now())

  user    User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  project EcoProject @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model EcoChallenge {
  id          String   @id @default(cuid())
  title       String
  description String
  points      Int      @default(0)
  category    String
  createdAt   DateTime @default(now())
}
```

---

## 7. Environment

Buat file `.env`:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="replace-with-secure-secret"
NEXTAUTH_URL="http://localhost:3000"
```

Untuk production PostgreSQL:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

---

## 8. Prisma Client

Buat `src/lib/prisma.ts`:

```ts
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
```

---

## 9. Seed Data

Buat `prisma/seed.ts` yang mengambil data dari mock data atau mendefinisikan ulang data minimal.

Seed minimal harus membuat:
1. Guru `Bu Rani Aktivator`.
2. 8 siswa.
3. Kelas 4B.
4. Modul “Fotosintesis dan Siklus Energi”.
5. Proyek “Misi Kangkung Hidroponik”.
6. 5 EcoMission Pancaniti.
7. 10 jurnal tanaman.
8. 10 pertanyaan quiz.
9. 8 badge.
10. 4 laporan panen.
11. 4 galeri project.
12. 4 refleksi.

Tambahkan script di `package.json`:

```json
{
  "scripts": {
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

Jalankan:
```bash
npx prisma db push
npm run db:seed
```

---

## 10. Validasi Zod

Buat folder `src/lib/validators`.

### 10.1 Journal Validator

```ts
import { z } from "zod"

export const journalCreateSchema = z.object({
  studentId: z.string().min(1),
  projectId: z.string().min(1),
  date: z.string().min(1),
  plantHeightCm: z.coerce.number().min(0).max(300),
  leafCount: z.coerce.number().int().min(0).max(200),
  condition: z.enum(["SEHAT", "LAYU", "KUNING", "PERLU_PERAWATAN"]),
  weather: z.enum(["CERAH", "MENDUNG", "HUJAN"]),
  waterMl: z.coerce.number().int().min(0).max(5000),
  note: z.string().min(3).max(500),
  photoUrl: z.string().url().optional().or(z.literal(""))
})
```

### 10.2 Reflection Validator

```ts
import { z } from "zod"

export const reflectionCreateSchema = z.object({
  userId: z.string().min(1),
  projectId: z.string().min(1),
  feeling: z.enum(["Bangga", "Senang", "Lebih peduli", "Masih belajar"]),
  lessonLearned: z.string().min(3).max(700),
  problemSolved: z.string().min(3).max(700),
  teamworkNote: z.string().min(3).max(700),
  ecologicalPromise: z.string().min(3).max(700)
})
```

### 10.3 Gallery Validator

```ts
import { z } from "zod"

export const galleryCreateSchema = z.object({
  userId: z.string().min(1),
  projectId: z.string().min(1),
  title: z.string().min(3).max(120),
  description: z.string().min(3).max(500),
  imageUrl: z.string().url(),
  isPublic: z.boolean().default(false)
})
```

---

## 11. API Routes

Buat API route dengan pola berikut.

### 11.1 Classes

`src/app/api/classes/route.ts`

Method:
- GET: ambil daftar kelas.
- POST: tambah kelas, hanya guru/admin.

Response:
```ts
{
  success: true,
  data: [...]
}
```

### 11.2 Projects

`src/app/api/projects/route.ts`

Method:
- GET: daftar proyek.
- POST: tambah proyek.

Query:
- `classId`
- `status`

### 11.3 Missions

`src/app/api/missions/route.ts`

Method:
- GET: daftar misi berdasarkan projectId.
- POST: tambah misi.

Query:
- `projectId`
- `stage`

### 11.4 Journals

`src/app/api/journals/route.ts`

Method:
- GET: daftar jurnal.
- POST: submit jurnal siswa.

Query:
- `studentId`
- `projectId`
- `date`
- `groupName`

POST harus:
1. Validasi dengan Zod.
2. Simpan jurnal.
3. Tambah poin siswa jika sesuai.
4. Recalculate level.
5. Return jurnal baru dan profil siswa terbaru.

### 11.5 Quizzes

`src/app/api/quizzes/route.ts`

Method:
- GET: daftar quiz.
- POST: buat quiz.

### 11.6 Attempts

`src/app/api/attempts/route.ts`

Method:
- POST: submit jawaban quiz.

POST harus:
1. Ambil quiz dan questions.
2. Hitung score.
3. Simpan attempt.
4. Tambah poin jika score memenuhi.
5. Return score, correct answers, explanation, dan rekomendasi remedial/pengayaan.

### 11.7 Badges

`src/app/api/badges/route.ts`

Method:
- GET: daftar badge.

`src/app/api/badges/award/route.ts`

Method:
- POST: beri badge ke siswa.

### 11.8 Harvests

`src/app/api/harvests/route.ts`

Method:
- GET: daftar hasil panen.
- POST: tambah laporan hasil panen.

### 11.9 Gallery

`src/app/api/gallery/route.ts`

Method:
- GET: daftar galeri.
- POST: tambah upload galeri.

Catatan:
- Untuk tahap awal, `imageUrl` boleh URL eksternal.
- Untuk production, gunakan upload storage.

### 11.10 Reflections

`src/app/api/reflections/route.ts`

Method:
- GET: daftar refleksi.
- POST: submit Cerita Belajarku.

### 11.11 Analytics

`src/app/api/analytics/teacher/route.ts`

Return:
```ts
{
  totalStudents: number,
  activeProjects: number,
  journalsToday: number,
  averageProgress: number,
  growthChart: [...],
  missionProgress: [...],
  badgeDistribution: [...],
  studentsNeedRemedial: [...],
  studentsReadyForEnrichment: [...],
  insights: string[]
}
```

---

## 12. Service Layer

Buat service agar page tidak langsung memanggil Prisma.

Contoh `src/services/journal-service.ts`:

```ts
import { prisma } from "@/lib/prisma"

export async function getJournals(params?: {
  studentId?: string
  projectId?: string
}) {
  return prisma.journalEntry.findMany({
    where: {
      studentId: params?.studentId,
      projectId: params?.projectId
    },
    include: {
      student: {
        include: {
          user: true
        }
      },
      project: true
    },
    orderBy: {
      date: "desc"
    }
  })
}
```

Buat service serupa untuk:
- users
- classes
- modules
- projects
- missions
- quizzes
- badges
- harvests
- gallery
- reflections
- analytics

---

## 13. Mengganti Mock Data di Frontend

Lakukan migrasi bertahap:

### 13.1 Sebelum

```ts
import { mockProjects } from "@/data/mock-projects"
```

### 13.2 Sesudah pada Server Component

```ts
import { getProjects } from "@/services/project-service"

export default async function GuruProyekPage() {
  const projects = await getProjects()
  return <ProjectManager projects={projects} />
}
```

### 13.3 Sesudah pada Client Component

```ts
const res = await fetch("/api/projects")
const json = await res.json()
setProjects(json.data)
```

Pilih pendekatan:
- Server Component untuk halaman data utama.
- Client Component untuk form submit, interaksi quiz, local state, dan upload.

---

## 14. Auth dan Role-Based Access

### 14.1 Role

Role:
- `TEACHER`
- `STUDENT`
- `ADMIN`

### 14.2 Proteksi Route

Buat middleware atau helper:
- `/guru/*` hanya TEACHER/ADMIN.
- `/siswa/*` hanya STUDENT.
- `/api/*` cek permission sesuai endpoint.

Jika Auth.js terlalu kompleks untuk tahap awal, buat session mock berbasis cookie yang membaca user dari database. Namun, struktur harus siap diganti Auth.js.

### 14.3 User Seed

Buat akun dev:
```txt
Guru:
email: guru@ecogrow.test
password: password123

Siswa:
email: adit@ecogrow.test
password: password123
```

Jangan gunakan password ini untuk production.

---

## 15. Upload Media

Tahap dev:
1. Terima URL gambar eksternal.
2. Simpan URL di database.
3. Tampilkan preview.

Tahap production:
1. Gunakan storage seperti Supabase Storage atau S3.
2. Batasi ukuran file maksimal 2MB.
3. Batasi tipe file: jpg, png, webp.
4. Rename file agar tidak memuat nama anak.
5. Jangan membuat galeri publik default.
6. Publikasi galeri harus `isPublic: false` secara default dan hanya guru yang dapat menyetujui.

---

## 16. Analitik

Analitik dihitung dari database:

1. **Progress proyek**
   - Rata-rata status misi dan jumlah jurnal.

2. **Pertumbuhan tanaman**
   - Berdasarkan `JournalEntry.plantHeightCm` per tanggal.

3. **Aktivitas siswa**
   - Jumlah jurnal, quiz attempt, refleksi, galeri.

4. **Remedial**
   - Siswa dengan score quiz < 70 atau jurnal kosong beberapa hari.

5. **Pengayaan**
   - Siswa dengan score >= 85 dan konsisten mengisi jurnal.

6. **Karakter KAIH**
   - Skor agregat dari refleksi, jurnal, dan partisipasi.

---

## 17. Rekomendasi Remedial dan Pengayaan

Buat rule sederhana:

```ts
export function getLearningRecommendation(score: number, journalCount: number) {
  if (score < 70) {
    return {
      type: "remedial",
      title: "Penguatan Konsep Fotosintesis",
      message: "Yuk ulangi materi cahaya, air, dan peran daun dalam membuat makanan."
    }
  }

  if (score >= 85 && journalCount >= 5) {
    return {
      type: "enrichment",
      title: "Tantangan Eco Scientist",
      message: "Coba bandingkan pertumbuhan tanaman di tempat terang dan teduh."
    }
  }

  return {
    type: "normal",
    title: "Lanjutkan Misi",
    message: "Teruskan jurnal tanaman dan refleksi harianmu."
  }
}
```

---

## 18. Keamanan Data Anak

Tambahkan aturan berikut:

1. Jangan menampilkan email siswa pada galeri publik.
2. Jangan menampilkan nama lengkap siswa di halaman publik.
3. Galeri project default hanya terlihat oleh kelas.
4. Foto siswa tidak boleh dipublikasikan tanpa persetujuan guru/orang tua.
5. Batasi akses guru hanya ke kelasnya sendiri.
6. Simpan hanya data yang diperlukan.
7. Gunakan validasi input untuk semua form.
8. Sanitasi teks deskripsi galeri dan refleksi.
9. Jangan menampilkan lokasi rumah siswa.
10. EcoChallenge rumah tidak boleh meminta alamat atau koordinat.

---

## 19. Testing Minimum

Tambahkan minimal test manual checklist di `TESTING.md`:

```md
# Manual Testing Checklist

## Auth
- [ ] Login guru berhasil.
- [ ] Login siswa berhasil.
- [ ] Guru tidak bisa membuka dashboard siswa jika role tidak sesuai.
- [ ] Siswa tidak bisa membuka dashboard guru jika role tidak sesuai.

## Guru
- [ ] Dashboard guru memuat statistik dari database.
- [ ] Guru dapat melihat proyek aktif.
- [ ] Guru dapat melihat jurnal siswa.
- [ ] Guru dapat memberi feedback jurnal.
- [ ] Guru dapat melihat analitik.

## Siswa
- [ ] Siswa dapat melihat misi aktif.
- [ ] Siswa dapat submit jurnal.
- [ ] Submit jurnal menambah poin.
- [ ] Level berubah sesuai poin.
- [ ] Siswa dapat mengerjakan quiz.
- [ ] Siswa dapat menulis refleksi.
- [ ] Siswa dapat melihat portofolio.

## Data
- [ ] Seed data berhasil.
- [ ] Prisma Studio dapat membuka data.
- [ ] Tidak ada error TypeScript.
- [ ] Build production berhasil.
```

---

## 20. Urutan Eksekusi Codex

Kerjakan secara bertahap:

1. Tambahkan Prisma dan konfigurasi database.
2. Buat schema Prisma.
3. Buat seed script.
4. Jalankan migration/db push.
5. Buat Prisma client.
6. Buat service layer.
7. Buat validator Zod.
8. Buat API route utama.
9. Migrasikan halaman guru dari mock data ke database.
10. Migrasikan halaman siswa dari mock data ke database.
11. Tambahkan auth dan proteksi role.
12. Tambahkan upload media minimal berbasis URL.
13. Tambahkan analitik berbasis database.
14. Tambahkan manual testing checklist.
15. Jalankan:
    - `npm run lint`
    - `npm run build`
    - `npm run dev`

---

## 21. Kriteria Selesai Backend

Integrasi backend dianggap selesai jika:

1. Database berhasil dibuat.
2. Seed data berhasil dimasukkan.
3. Dashboard guru membaca data dari database.
4. Dashboard siswa membaca data dari database.
5. Submit jurnal menyimpan ke database.
6. Submit quiz menyimpan attempt dan score.
7. Badge dan level dihitung berdasarkan data.
8. Analitik guru berasal dari database.
9. Route guru dan siswa terproteksi sesuai role.
10. Semua form memiliki validasi Zod.
11. Data mock tidak lagi menjadi sumber utama, kecuali sebagai fallback development.
12. Aplikasi dapat build tanpa error.
13. Ada catatan keamanan data anak.
14. Ada file testing manual.
