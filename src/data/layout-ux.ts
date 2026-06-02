import type {
  LandingImpactMetric,
  LandingProblemSolution,
  StudentJourneyStep,
  StudentLearningReport,
  StudentLearningFlowItem,
  StudentGameCard,
  StudentMoodOption,
  StudentTodayTask,
  TeacherActionItem,
  TeacherClassReport,
  TeacherModuleChecklistItem,
  TeacherOverviewCard,
  TeacherSubmissionItem,
} from "@/types/ecogrow";

export const studentTodayTasks: StudentTodayTask[] = [
  {
    id: "task-journal",
    title: "Isi Jurnal Tanaman",
    description: "Catat tinggi dan kondisi tanaman hari ini.",
    status: "in_progress",
    points: 20,
    href: "/siswa/ecomission",
  },
  {
    id: "task-learn",
    title: "Belajar Fotosintesis",
    description: "Tonton materi singkat tentang cara tanaman membuat makanan.",
    status: "not_started",
    points: 10,
    href: "/siswa/ecolearn",
  },
  {
    id: "task-reflect",
    title: "Ceritakan Belajarmu",
    description: "Tulis perasaanmu setelah merawat tanaman.",
    status: "locked",
    points: 15,
    href: "/siswa/cerita-belajarku",
  },
];

export const studentLearningFlow: StudentLearningFlowItem[] = [
  {
    id: "readiness",
    title: "Kuis Awal",
    description: "Cari tahu cara belajar yang paling cocok untukmu.",
    href: "/siswa/ecoreadiness",
    status: "completed",
    helperText: "Sudah mengenal kesiapan awalmu.",
    stage: "NITI_HARTI",
  },
  {
    id: "learn",
    title: "Belajar Fotosintesis",
    description: "Pelajari mengapa tanaman membutuhkan cahaya.",
    href: "/siswa/ecolearn",
    status: "in_progress",
    helperText: "Lanjutkan materi daun, air, dan cahaya.",
    stage: "NITI_SURTI",
  },
  {
    id: "mission",
    title: "Rawat Tanaman Kangkungmu",
    description: "Catat tinggi dan kondisi tanaman hari ini.",
    href: "/siswa/ecomission",
    status: "not_started",
    helperText: "Siapkan foto dan ukuran tanaman.",
    stage: "NITI_BUKTI",
  },
  {
    id: "reflection",
    title: "Cerita Belajarku",
    description: "Tulis pengalamanmu setelah merawat tanaman.",
    href: "/siswa/cerita-belajarku",
    status: "locked",
    helperText: "Terbuka setelah jurnal hari ini selesai.",
    stage: "NITI_BAKTI",
  },
];

export const studentJourneySteps: StudentJourneyStep[] = [
  {
    stage: "NITI_HARTI",
    label: "Kenali Alam",
    localTerm: "Niti Harti",
    detail: "Lihat tanaman dan lingkunganmu.",
  },
  {
    stage: "NITI_SURTI",
    label: "Jelajahi Masalah",
    localTerm: "Niti Surti",
    detail: "Cari tahu apa yang tanaman butuhkan.",
  },
  {
    stage: "NITI_BUKTI",
    label: "Lakukan Aksi",
    localTerm: "Niti Bukti",
    detail: "Rawat dan ukur tanamanmu.",
  },
  {
    stage: "NITI_BAKTI",
    label: "Cerita dan Renungan",
    localTerm: "Niti Bakti",
    detail: "Ceritakan pengalamanmu.",
  },
  {
    stage: "NITI_SAJATI",
    label: "Pamerkan Karya",
    localTerm: "Niti Sajati",
    detail: "Bagikan karya terbaikmu.",
  },
];

export const teacherActionItems: TeacherActionItem[] = [
  {
    id: "action-journal-feedback",
    title: "5 jurnal menunggu umpan balik",
    type: "feedback",
    priority: "high",
    href: "/guru/monitoring",
  },
  {
    id: "action-remedial",
    title: "3 siswa direkomendasikan remedial",
    type: "assessment",
    priority: "medium",
    href: "/guru/asesmen",
  },
  {
    id: "action-gallery",
    title: "2 karya menunggu moderasi galeri",
    type: "gallery",
    priority: "low",
    href: "/guru/galeri",
  },
];

export const teacherOverviewCards: TeacherOverviewCard[] = [
  {
    id: "overview-students",
    label: "Siswa aktif",
    value: "25",
    note: "Kelas 4B Eco Explorer",
    tone: "green",
  },
  {
    id: "overview-journals",
    label: "Jurnal hari ini",
    value: "18",
    note: "7 masih perlu ditinjau",
    tone: "blue",
  },
  {
    id: "overview-feedback",
    label: "Menunggu feedback",
    value: "7",
    note: "Prioritas sebelum pulang",
    tone: "yellow",
  },
  {
    id: "overview-support",
    label: "Perlu dukungan",
    value: "4",
    note: "Penguatan air dan cahaya",
    tone: "orange",
  },
];

export const teacherSubmissionQueue: TeacherSubmissionItem[] = [
  {
    id: "submission-raka",
    studentName: "Raka",
    groupName: "Tim Sahabat Tanah",
    mission: "Jurnal Pertumbuhan",
    submittedAt: "Hari ini, 09.10",
    status: "needs_revision",
    priority: "high",
    observation: "Daun mulai layu; volume air perlu dikonfirmasi.",
  },
  {
    id: "submission-dito",
    studentName: "Dito",
    groupName: "Tim Sahabat Tanah",
    mission: "Cerita Belajarku",
    submittedAt: "Hari ini, 08.42",
    status: "waiting_feedback",
    priority: "medium",
    observation: "Refleksi baik, tetapi bukti foto belum ditambahkan.",
  },
  {
    id: "submission-adit",
    studentName: "Adit",
    groupName: "Tim Tunas Hijau",
    mission: "Jurnal Pertumbuhan",
    submittedAt: "Kemarin, 15.20",
    status: "completed",
    priority: "low",
    observation: "Data tinggi konsisten dan foto jelas.",
  },
];

export const teacherModuleChecklist: TeacherModuleChecklistItem[] = [
  { id: "module-objective", label: "Tujuan belajar terisi", complete: true },
  { id: "module-missions", label: "Misi lima tahap siap", complete: true },
  { id: "module-rubric", label: "Rubrik proyek terhubung", complete: true },
  { id: "module-parent", label: "Pesan orang tua dijadwalkan", complete: false },
];

export const teacherModuleCompletenessChecklist: TeacherModuleChecklistItem[] = [
  { id: "module-identity", label: "Identitas", complete: true },
  { id: "module-outcome", label: "CP dan TP", complete: true },
  { id: "module-syntax", label: "Sintaks EcoGrow", complete: true },
  { id: "module-lkpd", label: "LKPD", complete: true },
  { id: "module-assessment", label: "Asesmen", complete: true },
  { id: "module-reflection", label: "Refleksi Guru", complete: false },
  { id: "module-follow-up", label: "Remedial/Pengayaan", complete: false },
];

export const teacherClassReport: TeacherClassReport = {
  className: "Kelas 4B Eco Explorer",
  projectTitle: "Misi Kangkung Hidroponik",
  overallProgress: 68,
  submittedEvidence: 18,
  expectedEvidence: 25,
  strengths: [
    "Sebagian besar siswa dapat menjelaskan kebutuhan air dan cahaya.",
    "Tim Tunas Hijau konsisten mengunggah foto pertumbuhan.",
  ],
  supportStudents: [
    { name: "Raka", focus: "Hubungan volume air dan daun layu" },
    { name: "Dito", focus: "Melengkapi foto jurnal dan refleksi" },
    { name: "Lina", focus: "Membandingkan tinggi tanaman" },
    { name: "Fajar", focus: "Mengulang konsep fotosintesis" },
  ],
  nextActions: [
    "Tinjau 7 jurnal yang menunggu feedback.",
    "Dampingi 4 siswa yang memerlukan penguatan.",
    "Bagikan laporan kelas kepada orang tua.",
  ],
};

export const landingProblemSolutions: LandingProblemSolution[] = [
  {
    id: "problem-activity",
    challenge: "Belajar ekologi terasa jauh dari keseharian.",
    response: "Misi singkat berbasis tanaman sekolah.",
    detail: "Siswa mengamati, merawat, dan merefleksikan tumbuhan yang benar-benar mereka lihat.",
  },
  {
    id: "problem-evidence",
    challenge: "Bukti proses belajar tersebar dan sulit dibaca.",
    response: "Jurnal foto dan feedback dalam satu alur.",
    detail: "Catatan pertumbuhan menjadi percakapan sederhana antara siswa dan guru.",
  },
  {
    id: "problem-follow-up",
    challenge: "Guru perlu cepat melihat siapa yang butuh bantuan.",
    response: "Laporan ringkas untuk tindak lanjut guru.",
    detail: "Antrian review, asesmen, dan rekomendasi muncul sebagai aksi yang jelas.",
  },
];

export const landingImpactMetrics: LandingImpactMetric[] = [
  {
    id: "impact-stages",
    value: "5",
    label: "Tahap belajar",
    detail: "Kenali hingga Pamerkan.",
  },
  {
    id: "impact-roles",
    value: "2",
    label: "Ruang terarah",
    detail: "Siswa dan guru.",
  },
  {
    id: "impact-story",
    value: "1",
    label: "Cerita progres",
    detail: "Misi sampai laporan.",
  },
];

export const studentTeacherMessage =
  "Jangan lupa cek warna daun tanamanmu hari ini. Ibu menunggu ceritamu.";

export const studentGameCards: StudentGameCard[] = [
  {
    id: "food-chain",
    title: "Puzzle Rantai Makanan",
    duration: "5 menit",
    level: "Mudah",
    points: 20,
    description: "Susun hubungan makhluk hidup di kebun.",
  },
  {
    id: "plant-parts",
    title: "Tebak Bagian Tumbuhan",
    duration: "4 menit",
    level: "Mudah",
    points: 15,
    description: "Cocokkan akar, batang, daun, dan bunga.",
  },
  {
    id: "photosynthesis",
    title: "Urutkan Fotosintesis",
    duration: "6 menit",
    level: "Sedang",
    points: 30,
    description: "Susun cahaya, air, dan makanan tanaman.",
  },
  {
    id: "healthy-plant",
    title: "Tanaman Sehat",
    duration: "5 menit",
    level: "Sedang",
    points: 25,
    description: "Pilih aksi terbaik saat daun berubah.",
  },
  {
    id: "sorting",
    title: "Pilah Sampah Organik",
    duration: "3 menit",
    level: "Mudah",
    points: 15,
    description: "Pisahkan bahan yang bisa menjadi kompos.",
  },
];

export const studentMoodOptions: StudentMoodOption[] = [
  { id: "happy", label: "Senang" },
  { id: "confused", label: "Bingung" },
  { id: "proud", label: "Bangga" },
  { id: "retry", label: "Mau coba lagi" },
  { id: "help", label: "Butuh bantuan" },
];

export const studentLearningReport: StudentLearningReport = {
  celebration: "Hebat! Kamu sudah merawat tanaman dan mencatat perubahannya dengan teliti.",
  completedJourneySteps: 3,
  badges: ["Penjaga Tanaman", "Pejuang Hemat Air", "Pengamat Daun"],
  completedMissions: ["Kenali tanaman", "Jelajahi kebutuhan air", "Catat pertumbuhan kangkung"],
  understood: [
    "Tanaman membutuhkan cahaya dan air untuk tumbuh.",
    "Jurnal membantu membandingkan perkembangan tanaman.",
  ],
  practiceNext: [
    "Membandingkan warna daun sehat dan daun layu.",
    "Mengulang latihan tentang kebutuhan air tanaman.",
  ],
  teacherMessage: "Adit sudah teliti mengukur tanaman. Teruskan kebiasaan baikmu saat melihat perubahan daun.",
  nextAction: {
    title: "Coba latihan daun dan air sekali lagi",
    description: "Permainan singkat akan membantumu mengenali tanaman sehat sebelum kamu memamerkan karya.",
    href: "/siswa/ecoplay",
    actionLabel: "Mulai Latihan",
  },
};
