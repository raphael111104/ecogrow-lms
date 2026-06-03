import type {
  AssessmentResult,
  AssessmentMatrixItem,
  GeneratedModuleDraft,
  PerformanceRubric,
  Recommendation,
  TeacherDashboardSummary,
  TeacherFeedback,
  TeacherQuickFeedbackTemplate,
} from "@/types/ecogrow";

export const teacherDashboardSummary: TeacherDashboardSummary = {
  teacherId: "guru-1",
  classId: "kelas-4b",
  activeProjectId: "proyek-kangkung",
  totalStudents: 25,
  activeProjects: 1,
  journalsToday: 18,
  pendingFeedback: 7,
  averageMissionProgress: 68,
  studentsNeedAttention: 4,
  studentsReadyForEnrichment: 6,
  galleryPending: 3,
};

export const teacherQuickActions = [
  { id: "qa-1", label: "Validasi 7 jurnal", href: "/guru/monitoring", tone: "warning" },
  { id: "qa-2", label: "Cek 4 siswa perlu perhatian", href: "/guru/analitik", tone: "danger" },
  { id: "qa-3", label: "Moderasi 3 karya galeri", href: "/guru/galeri", tone: "info" },
  { id: "qa-4", label: "Buat rubrik Exhibition", href: "/guru/asesmen", tone: "success" },
] as const;

export const teacherQuickFeedbackTemplates: TeacherQuickFeedbackTemplate[] = [
  {
    id: "feedback-observation-good",
    message: "Pengamatanmu sudah baik. Lanjutkan besok dengan catatan yang sama rapi.",
    focus: "apresiasi",
  },
  {
    id: "feedback-clear-photo",
    message: "Coba tambahkan foto tanaman yang lebih jelas agar perubahan daun mudah dilihat.",
    focus: "perbaikan",
  },
  {
    id: "feedback-height-cm",
    message: "Jangan lupa tulis tinggi tanaman dalam satuan cm.",
    focus: "perbaikan",
  },
  {
    id: "feedback-leaf-color",
    message: "Ceritakan juga perubahan warna daun dan hubungkan dengan cahaya atau air.",
    focus: "pertanyaan",
  },
  {
    id: "feedback-teamwork",
    message: "Kerja samamu dengan tim sudah terlihat baik. Pertahankan pembagian tugasnya.",
    focus: "apresiasi_tim",
  },
  {
    id: "feedback-compare-growth",
    message: "Coba bandingkan tinggi tanaman hari ini dengan minggu lalu.",
    focus: "pertanyaan",
  },
  {
    id: "feedback-water-care",
    message: "Gunakan air secukupnya dan catat perubahan setelahnya.",
    focus: "perbaikan",
  },
];

export const teacherActionQueue = [
  { id: "queue-journal", type: "journal_review", label: "Jurnal perlu review", count: 7, href: "/guru/monitoring" },
  { id: "queue-gallery", type: "gallery_moderation", label: "Galeri perlu moderasi", count: 3, href: "/guru/galeri" },
  { id: "queue-remedial", type: "remedial", label: "Siswa perlu remedial", count: 2, href: "/guru/analitik" },
  { id: "queue-enrichment", type: "enrichment", label: "Kelompok siap pengayaan", count: 6, href: "/guru/asesmen" },
];

export const teacherInsights = [
  {
    id: "insight-1",
    title: "Volume air perlu diperhatikan",
    description: "Beberapa jurnal Tim Sahabat Tanah menunjukkan tanaman layu saat air di bawah 130 ml.",
    actionLabel: "Beri umpan balik",
    href: "/guru/monitoring",
  },
  {
    id: "insight-2",
    title: "Ecological Reflection masih rendah",
    description: "Baru 40% siswa menulis janji aksi ekologis.",
    actionLabel: "Buka refleksi",
    href: "/guru/asesmen",
  },
  {
    id: "insight-3",
    title: "Skor C4 perlu penguatan",
    description: "Soal hubungan air, cahaya, dan daun menjadi titik remedial kelas.",
    actionLabel: "Buat remedial",
    href: "/guru/analitik",
  },
];

export const analyticsInsights = [
  {
    id: "analytics-insight-1",
    severity: "warning",
    title: "Konsistensi jurnal menurun",
    description: "5 siswa belum mengisi jurnal dalam 2 hari terakhir.",
    actionHref: "/guru/monitoring",
  },
  {
    id: "analytics-insight-2",
    severity: "info",
    title: "Pengayaan siap diberikan",
    description: "Tim Tunas Hijau stabil pada Ecological Execution dan siap membandingkan data antarkelompok.",
    actionHref: "/guru/asesmen",
  },
] as const;

export const teacherRecommendations: Recommendation[] = [
  {
    id: "teacher-rec-1",
    type: "remedial",
    title: "Buat kelompok kecil C4",
    reason: "Raka dan Dito masih kesulitan menjelaskan hubungan air, cahaya, dan perubahan daun.",
    targetHref: "/guru/analitik",
    actionLabel: "Buka analitik",
  },
  {
    id: "teacher-rec-2",
    type: "enrichment",
    title: "Aktifkan poster perbandingan",
    reason: "Tim Tunas Hijau memiliki data cukup untuk pengayaan Ecological Mastery & Exhibition (Niti Sajati).",
    targetHref: "/guru/asesmen",
    actionLabel: "Buka asesmen",
  },
];

export const ecoGrowGuideSections = [
  {
    id: "guide-model",
    title: "Model EcoGrow Learning",
    summary: "Model pembelajaran ekologis berbasis Sintaks EcoGrow Learning, deep learning, dan ketahanan pangan sekolah.",
    points: ["Smart Eco-Food School", "Berguru pada Bumi", "EcoMission", "Portofolio Digital"],
  },
  {
    id: "guide-pancaniti",
    title: "Sintaks EcoGrow Learning",
    summary: "Alur belajar dari kesadaran ekologis hingga pameran karya.",
    points: ["Ecological Recognition (Niti Harti)", "Ecological Exploration (Niti Surti)", "Ecological Execution (Niti Bukti)", "Ecological Reflection (Niti Bakti)", "Ecological Mastery & Exhibition (Niti Sajati)"],
  },
  {
    id: "guide-tdba",
    title: "Kearifan Lokal dan TdBA",
    summary: "Guru menuntun siswa berguru pada bumi melalui Silih Asah, Silih Asih, dan Silih Asuh.",
    points: ["Berguru pada Bumi", "Silih Asah", "Silih Asih", "Silih Asuh"],
  },
];

export const moduleGeneratorDefaults = {
  subject: "IPAS",
  phase: "B",
  grade: "4",
  topic: "Fotosintesis dan Siklus Energi",
  duration: "4 pertemuan x 2x35 menit",
  cp: "Peserta didik mengidentifikasi hubungan antara makhluk hidup dan lingkungannya melalui pengamatan.",
  tp: "Menganalisis kebutuhan tumbuhan, mencatat data pertumbuhan, dan menyusun aksi perawatan.",
  ecologicalContext: "Budidaya kangkung hidroponik sebagai proyek ketahanan pangan sekolah.",
  plantProject: "Misi Kangkung Hidroponik",
  sdgs: ["SDG 2", "SDG 4", "SDG 13", "SDG 15"],
  kaihFocus: ["ekologis", "mandiri", "adaptif", "inovatif", "humanis"],
};

export const moduleValidationBadges = [
  { id: "val-1", label: "CP/TP selaras", status: "complete" },
  { id: "val-2", label: "Sintaks EcoGrow lengkap", status: "complete" },
  { id: "val-3", label: "Asesmen as/for/of tersedia", status: "complete" },
  { id: "val-4", label: "Diferensiasi tercantum", status: "needs_review" },
] as const;

export const generatedModuleSeed: GeneratedModuleDraft = {
  id: "draft-modul-kangkung",
  title: "Modul EcoGrow: Fotosintesis melalui Kangkung Hidroponik",
  subject: moduleGeneratorDefaults.subject,
  phase: moduleGeneratorDefaults.phase,
  grade: moduleGeneratorDefaults.grade,
  topic: moduleGeneratorDefaults.topic,
  duration: moduleGeneratorDefaults.duration,
  cp: moduleGeneratorDefaults.cp,
  tp: [
    "Mengamati kebutuhan air dan cahaya pada tanaman kangkung.",
    "Membandingkan data pertumbuhan antar kelompok.",
    "Merefleksikan aksi hemat air dalam proyek pangan sekolah.",
  ],
  meaningfulUnderstanding:
    "Tumbuhan tumbuh baik ketika air, cahaya, dan perawatan seimbang; data pengamatan membantu siswa mengambil keputusan ekologis.",
  triggerQuestions: [
    "Mengapa daun kangkung bisa tampak lebih hijau setelah mendapat cahaya cukup?",
    "Apa hubungan volume air dengan tinggi tanaman?",
    "Bagaimana proyek kebun sekolah membantu ketahanan pangan?",
  ],
  pancanitiPlan: [
    { stage: "NITI_HARTI", teacherActivity: "Mengajak siswa mengamati daun, akar, dan air nutrisi.", studentActivity: "Mencatat bagian tanaman dan pertanyaan awal.", assessmentEvidence: "Catatan observasi awal." },
    { stage: "NITI_SURTI", teacherActivity: "Memandu diskusi hubungan cahaya, air, dan daun.", studentActivity: "Membuat prediksi pertumbuhan.", assessmentEvidence: "Pertanyaan pemantik dan prediksi." },
    { stage: "NITI_BUKTI", teacherActivity: "Mengatur eksperimen perawatan harian.", studentActivity: "Mengukur tinggi, daun, air, dan kondisi tanaman.", assessmentEvidence: "Jurnal digital." },
    { stage: "NITI_BAKTI", teacherActivity: "Memantik refleksi tanggung jawab ekologis.", studentActivity: "Menulis cerita belajar dan janji aksi.", assessmentEvidence: "Refleksi Cerita Belajarku." },
    { stage: "NITI_SAJATI", teacherActivity: "Memfasilitasi Eco-Exhibition kelas.", studentActivity: "Mempresentasikan poster/foto hasil proyek.", assessmentEvidence: "Rubrik performance." },
  ],
  differentiation: {
    content: "Kartu konsep visual untuk siswa yang butuh penguatan, bacaan tantangan untuk siswa pengayaan.",
    process: "Kelompok memilih peran pengukur, pencatat, fotografer, dan pengamat kondisi.",
    product: "Siswa dapat membuat poster, foto cerita, tabel data, atau presentasi singkat.",
  },
  assessmentPlan: [
    "Diagnostik: pertanyaan awal tentang kebutuhan tumbuhan.",
    "Formatif: feedback jurnal Ecological Execution (Niti Bukti).",
    "Sumatif: quiz fotosintesis dan rubrik Eco-Exhibition.",
    "Refleksi: Cerita Belajarku pada Ecological Reflection (Niti Bakti).",
  ],
  status: "draft",
};

export const projectWizardTemplates = [
  {
    id: "template-hidroponik",
    title: "Budidaya Hidroponik Sederhana",
    plantOptions: ["Kangkung", "Bayam", "Selada"],
    method: "hydroponic",
    recommendedDurationDays: 28,
    defaultMissions: ["Ecological Recognition", "Ecological Exploration", "Ecological Execution", "Ecological Reflection", "Ecological Mastery & Exhibition"],
  },
  {
    id: "template-kompos",
    title: "Proyek Kompos Sekolah",
    plantOptions: ["Kompos daun", "Kompos sisa sayur"],
    method: "compost",
    recommendedDurationDays: 21,
    defaultMissions: ["Amati sampah organik", "Prediksi penguraian", "Buat kompos", "Refleksi manfaat", "Pamerkan hasil"],
  },
] as const;

export const teacherFeedbacks: TeacherFeedback[] = [
  {
    id: "feedback-1",
    journalId: "j-13",
    teacherId: "guru-1",
    studentId: "siswa-5",
    type: "perbaikan",
    message: "Coba cek volume air setiap pagi. Tanamanmu menunjukkan tanda perlu perawatan.",
    createdAt: "2026-05-07T10:15:00",
    reviewStatus: "needs_revision",
  },
];

export const analyticsSummary = {
  classAverageProgress: 68,
  averageQuizScore: 78,
  totalJournals: 156,
  totalReflections: 19,
  kaihAverage: {
    ekologis: 78,
    mandiri: 74,
    adaptif: 76,
    inovatif: 69,
    humanis: 82,
  },
};

export const teacherAnalyticsMock = {
  plantGrowth: [
    { day: "Hari 1", averageHeight: 6 },
    { day: "Hari 3", averageHeight: 10 },
    { day: "Hari 5", averageHeight: 16 },
    { day: "Hari 7", averageHeight: 23 },
    { day: "Hari 10", averageHeight: 29 },
  ],
  badgeDistribution: [
    { badge: "Penjaga Tanaman", count: 12 },
    { badge: "Sahabat Daun", count: 9 },
    { badge: "Eco Exhibitor", count: 5 },
    { badge: "Ahli Tanaman Muda", count: 7 },
  ],
  riskDistribution: [
    { status: "Aman", count: 16 },
    { status: "Perlu Perhatian", count: 6 },
    { status: "Perlu Pendampingan", count: 3 },
  ],
  stageProgress: [
    { stage: "Kenali", count: 25 },
    { stage: "Jelajahi", count: 24 },
    { stage: "Aksi", count: 20 },
    { stage: "Refleksi", count: 14 },
    { stage: "Pamerkan", count: 5 },
  ],
};

export const studentLearningRisks = [
  {
    studentId: "siswa-5",
    name: "Raka",
    riskType: "perlu_remedial",
    reason: "Skor C4 rendah dan jurnal menunjukkan tanaman sering layu.",
    suggestedAction: "Berikan pertanyaan pemantik tentang hubungan air dan pertumbuhan.",
  },
  {
    studentId: "siswa-1",
    name: "Adit",
    riskType: "siap_pengayaan",
    reason: "Jurnal konsisten dan skor quiz tinggi.",
    suggestedAction: "Minta membuat poster perbandingan pertumbuhan tanaman.",
  },
  {
    studentId: "siswa-7",
    name: "Dito",
    riskType: "perlu_perhatian",
    reason: "Ecological Reflection (Niti Bakti) belum lengkap dan data air belum konsisten.",
    suggestedAction: "Ajak mengecek ulang jurnal bersama kelompok.",
  },
];

export const galleryModerationActions = [
  { id: "approve", label: "Setujui", nextStatus: "approved" },
  { id: "revision", label: "Minta Revisi", nextStatus: "revision" },
  { id: "feature", label: "Jadikan Pilihan", nextStatus: "approved" },
] as const;

export const assessmentTabs = [
  { id: "diagnostic", label: "Diagnostik", description: "Memetakan kesiapan awal siswa." },
  { id: "formative", label: "Formatif", description: "Memberi umpan balik selama misi." },
  { id: "summative", label: "Sumatif", description: "Mengukur capaian akhir proyek." },
  { id: "reflection", label: "Refleksi", description: "Meninjau Cerita Belajarku, janji aksi, dan apresiasi teman." },
  { id: "character", label: "KAIH", description: "Membaca perkembangan karakter ekologis siswa." },
  { id: "performance", label: "Rubrik Kinerja", description: "Meninjau bukti praktik dan karya Eco-Exhibition." },
] as const;

export const teacherAssessmentFollowUps = [
  {
    id: "follow-up-practice",
    label: "Perlu Latihan Ulang",
    count: "2 siswa",
    note: "Penguatan hubungan air, cahaya, dan pertumbuhan.",
    href: "/guru/monitoring",
    actionLabel: "Tinjau jurnal",
  },
  {
    id: "follow-up-advanced",
    label: "Siap Tantangan Lanjutan",
    count: "6 siswa",
    note: "Siap membuat poster perbandingan hasil tanaman.",
    href: "/guru/galeri",
    actionLabel: "Siapkan karya",
  },
  {
    id: "follow-up-support",
    label: "Perlu Pendampingan",
    count: "4 siswa",
    note: "Lengkapi bukti jurnal sebelum membuat kesimpulan.",
    href: "/guru/monitoring",
    actionLabel: "Beri dukungan",
  },
  {
    id: "follow-up-consistent",
    label: "Konsisten Baik",
    count: "13 siswa",
    note: "Pertahankan ritme jurnal dan apresiasi kelas.",
    href: "/guru/laporan",
    actionLabel: "Lihat laporan",
  },
] as const;

export const performanceRubrics: PerformanceRubric[] = [
  {
    id: "rubric-journal",
    aspect: "Jurnal Digital",
    criteria: [
      "Data pengamatan lengkap",
      "Catatan sesuai kondisi tanaman",
      "Mampu menghubungkan data dengan perawatan",
      "Menunjukkan kepedulian ekologis",
    ],
    maxScore: 4,
  },
  {
    id: "rubric-collaboration",
    aspect: "Kolaborasi Silih Asah-Asih-Asuh",
    criteria: ["Berbagi tugas", "Membantu teman", "Menghargai pendapat", "Menyelesaikan konflik dengan baik"],
    maxScore: 4,
  },
  {
    id: "rubric-exhibition",
    aspect: "Eco-Exhibition/Ecological Mastery & Exhibition (Niti Sajati)",
    criteria: ["Karya jelas dan informatif", "Data proyek ditampilkan", "Pesan lingkungan kuat", "Presentasi percaya diri"],
    maxScore: 4,
  },
];

export const kaihRubrics: PerformanceRubric[] = [
  { id: "kaih-ekologis", aspect: "Ekologis", criteria: ["Peduli tanaman", "Hemat air", "Memahami dampak aksi"], maxScore: 4 },
  { id: "kaih-mandiri", aspect: "Mandiri", criteria: ["Mencatat tepat waktu", "Mengelola tugas", "Memperbaiki kesalahan"], maxScore: 4 },
  { id: "kaih-adaptif", aspect: "Adaptif", criteria: ["Menyesuaikan perawatan", "Membaca perubahan cuaca", "Mencari solusi"], maxScore: 4 },
  { id: "kaih-inovatif", aspect: "Inovatif", criteria: ["Membuat karya", "Mengolah data", "Mengusulkan ide"], maxScore: 4 },
  { id: "kaih-humanis", aspect: "Humanis", criteria: ["Membantu teman", "Menghargai kelompok", "Berbagi peran"], maxScore: 4 },
];

export const assessmentResultsMock: AssessmentResult[] = [
  {
    id: "result-1",
    studentId: "siswa-1",
    quizId: "quiz-diagnostic",
    score: 80,
    weakestLevel: "C5",
    recommendation: "Pengayaan: buat poster analisis faktor pertumbuhan.",
  },
  {
    id: "result-2",
    studentId: "siswa-5",
    quizId: "quiz-diagnostic",
    score: 60,
    weakestLevel: "C4",
    recommendation: "Remedial: diskusi ulang hubungan air, cahaya, dan daun.",
  },
  {
    id: "result-3",
    studentId: "siswa-7",
    quizId: "quiz-diagnostic",
    score: 68,
    weakestLevel: "C4",
    recommendation: "Pendampingan: lengkapi data jurnal sebelum menarik kesimpulan.",
  },
];

export const assessmentMatrix: AssessmentMatrixItem[] = [
  {
    studentId: "siswa-1",
    diagnosticScore: 80,
    missionScore: 88,
    summativeScore: 91,
    cognitive: 82,
    affective: 88,
    psychomotor: 84,
    kaihAverage: 86,
    recommendation: "Pengayaan",
  },
  {
    studentId: "siswa-5",
    diagnosticScore: 58,
    missionScore: 62,
    summativeScore: 64,
    cognitive: 62,
    affective: 71,
    psychomotor: 69,
    kaihAverage: 67,
    recommendation: "Remedial",
  },
  {
    studentId: "siswa-7",
    diagnosticScore: 65,
    missionScore: 70,
    summativeScore: 68,
    cognitive: 68,
    affective: 74,
    psychomotor: 70,
    kaihAverage: 71,
    recommendation: "Pendampingan",
  },
];
