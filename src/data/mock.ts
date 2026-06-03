import type {
  Badge,
  ClassRoom,
  EcoChallenge,
  EcoExhibitionItem,
  EcoMission,
  EcoProject,
  GalleryPost,
  HarvestReport,
  JournalEntry,
  LearningContent,
  LearningModule,
  MissionStageProgress,
  MissionSubmission,
  PortfolioTimelineItem,
  Quiz,
  QuizAttempt,
  QuizFeedbackBank,
  Recommendation,
  ReflectionEntry,
  SelectOption,
  StudentProfile,
  User,
  EcoNotification,
  Evidence,
} from "@/types/ecogrow";

const additionalStudentNames = [
  "Lina",
  "Fajar",
  "Rafi",
  "Citra",
  "Arum",
  "Gilang",
  "Putri",
  "Farhan",
  "Mei",
  "Tio",
  "Alya",
  "Bagas",
  "Dewi",
  "Niko",
  "Sekar",
  "Yoga",
  "Intan",
];

const studentGroups = [
  "Tim Tunas Hijau",
  "Tim Sahabat Tanah",
  "Tim Akar Kuat",
  "Tim Cahaya Pagi",
  "Tim Kompos Ceria",
];

const ecoImages = {
  hydroponicKangkung: "/assets/images/hydroponic-water-spinach.jpg",
  hydroponicLettuce: "/assets/images/vertical-hydroponic-lettuce.jpg",
  seedlingCloseup: "/assets/images/seedling-closeup-unsplash.jpg",
  gardeningActivity: "/assets/images/gardening-activity-unsplash.jpg",
  vegetableHarvest: "/assets/images/vegetable-harvest-unsplash.jpg",
  agricultureField: "/assets/images/agriculture-field-unsplash.jpg",
};

export const users: User[] = [
  { id: "guru-1", name: "Bu Rani Aktivator", role: "teacher" },
  { id: "siswa-1", name: "Adit", role: "student" },
  { id: "siswa-2", name: "Naya", role: "student" },
  { id: "siswa-3", name: "Bimo", role: "student" },
  { id: "siswa-4", name: "Salsa", role: "student" },
  { id: "siswa-5", name: "Raka", role: "student" },
  { id: "siswa-6", name: "Mila", role: "student" },
  { id: "siswa-7", name: "Dito", role: "student" },
  { id: "siswa-8", name: "Kirana", role: "student" },
  ...additionalStudentNames.map((name, index) => ({
    id: `siswa-${index + 9}`,
    name,
    role: "student" as const,
  })),
];

export const classRooms: ClassRoom[] = [
  {
    id: "kelas-4b",
    name: "Kelas 4B Eco Explorer",
    grade: "4",
    phase: "B",
    teacherId: "guru-1",
    totalStudents: 25,
  },
];

export const studentProfiles: StudentProfile[] = [
  {
    id: "profile-1",
    userId: "siswa-1",
    classId: "kelas-4b",
    groupName: "Tim Tunas Hijau",
    level: 3,
    points: 720,
    badges: ["badge-1", "badge-3", "badge-7"],
    ecologicalCharacter: { ekologis: 86, mandiri: 78, adaptif: 82, inovatif: 74, humanis: 88 },
  },
  {
    id: "profile-2",
    userId: "siswa-2",
    classId: "kelas-4b",
    groupName: "Tim Tunas Hijau",
    level: 3,
    points: 660,
    badges: ["badge-1", "badge-8"],
    ecologicalCharacter: { ekologis: 80, mandiri: 76, adaptif: 79, inovatif: 70, humanis: 84 },
  },
  {
    id: "profile-3",
    userId: "siswa-3",
    classId: "kelas-4b",
    groupName: "Tim Tunas Hijau",
    level: 2,
    points: 430,
    badges: ["badge-1"],
    ecologicalCharacter: { ekologis: 70, mandiri: 68, adaptif: 72, inovatif: 66, humanis: 78 },
  },
  {
    id: "profile-4",
    userId: "siswa-4",
    classId: "kelas-4b",
    groupName: "Tim Tunas Hijau",
    level: 2,
    points: 510,
    badges: ["badge-2", "badge-7"],
    ecologicalCharacter: { ekologis: 75, mandiri: 80, adaptif: 73, inovatif: 69, humanis: 85 },
  },
  {
    id: "profile-5",
    userId: "siswa-5",
    classId: "kelas-4b",
    groupName: "Tim Sahabat Tanah",
    level: 2,
    points: 390,
    badges: ["badge-2"],
    ecologicalCharacter: { ekologis: 68, mandiri: 72, adaptif: 71, inovatif: 64, humanis: 76 },
  },
  {
    id: "profile-6",
    userId: "siswa-6",
    classId: "kelas-4b",
    groupName: "Tim Sahabat Tanah",
    level: 3,
    points: 590,
    badges: ["badge-2", "badge-4"],
    ecologicalCharacter: { ekologis: 78, mandiri: 74, adaptif: 80, inovatif: 72, humanis: 82 },
  },
  {
    id: "profile-7",
    userId: "siswa-7",
    classId: "kelas-4b",
    groupName: "Tim Sahabat Tanah",
    level: 2,
    points: 340,
    badges: ["badge-8"],
    ecologicalCharacter: { ekologis: 64, mandiri: 70, adaptif: 67, inovatif: 62, humanis: 72 },
  },
  {
    id: "profile-8",
    userId: "siswa-8",
    classId: "kelas-4b",
    groupName: "Tim Sahabat Tanah",
    level: 2,
    points: 480,
    badges: ["badge-1", "badge-2"],
    ecologicalCharacter: { ekologis: 73, mandiri: 77, adaptif: 75, inovatif: 68, humanis: 80 },
  },
  ...additionalStudentNames.map((_, index) => {
    const studentNumber = index + 9;
    const groupName = studentGroups[index % studentGroups.length];
    const level = (index % 4) + 1;
    const points = 120 + ((index * 47) % 801);
    const riskCycle = ["aman", "perlu_perhatian", "perlu_remedial", "siap_pengayaan"] as const;
    const base = 62 + ((index * 5) % 28);

    return {
      id: `profile-${studentNumber}`,
      userId: `siswa-${studentNumber}`,
      classId: "kelas-4b",
      groupName,
      level,
      points,
      badges: index % 3 === 0 ? ["badge-1", "badge-7"] : index % 3 === 1 ? ["badge-2"] : ["badge-3", "badge-8"],
      learningRisk: riskCycle[index % riskCycle.length],
      ecologicalCharacter: {
        ekologis: Math.min(92, base + 5),
        mandiri: Math.min(91, base + 2),
        adaptif: Math.min(90, base + 4),
        inovatif: Math.min(88, base - 1),
        humanis: Math.min(94, base + 8),
      },
    };
  }),
];

export const learningModules: LearningModule[] = [
  {
    id: "modul-fotosintesis",
    title: "Fotosintesis dan Siklus Energi",
    subject: "IPAS",
    phase: "B",
    grade: "4",
    topic: "Fotosintesis dan Siklus Energi",
    duration: "4 pertemuan x 2x35 menit",
    description:
      "Siswa belajar peran cahaya, air, daun, dan klorofil melalui proyek kangkung hidroponik.",
    learningOutcomes: [
      "Siswa memahami peran tumbuhan dalam menghasilkan makanan dan oksigen.",
      "Siswa mengamati pertumbuhan tanaman.",
      "Siswa mencatat data tinggi tanaman dan kondisi daun.",
      "Siswa menganalisis hubungan cahaya, air, dan pertumbuhan.",
      "Siswa merefleksikan pentingnya merawat tanaman untuk pangan sehat.",
    ],
    pancanitiStages: ["NITI_HARTI", "NITI_SURTI", "NITI_BUKTI", "NITI_BAKTI", "NITI_SAJATI"],
    sdgs: ["SDG 2", "SDG 4", "SDG 13", "SDG 15"],
  },
];

export const projects: EcoProject[] = [
  {
    id: "proyek-kangkung",
    title: "Misi Kangkung Hidroponik",
    classId: "kelas-4b",
    moduleId: "modul-fotosintesis",
    plantType: "Kangkung",
    method: "hydroponic",
    startDate: "2026-05-01",
    endDate: "2026-05-28",
    progress: 68,
    status: "active",
    description:
      "Kelompok mengamati pertumbuhan kangkung, mengukur tinggi tanaman, menjaga air, dan memamerkan hasil belajar.",
    currentStage: "NITI_BUKTI",
    groupIds: studentGroups,
    riskLevel: "medium",
  },
];

export const missions: EcoMission[] = [
  {
    id: "misi-harti",
    projectId: "proyek-kangkung",
    title: "Ecological Recognition (Niti Harti) - Mengenal Rahasia Daun",
    stage: "NITI_HARTI",
    status: "completed",
    points: 100,
    instructions: "Amati warna, bentuk, dan bagian tanaman kangkung.",
    tasks: ["Gambar bagian daun", "Sebutkan warna daun", "Bandingkan daun muda dan daun tua"],
  },
  {
    id: "misi-surti",
    projectId: "proyek-kangkung",
    title: "Ecological Exploration (Niti Surti) - Mengapa Tanaman Butuh Cahaya?",
    stage: "NITI_SURTI",
    status: "completed",
    points: 120,
    instructions: "Rumuskan pertanyaan dan prediksi tentang cahaya.",
    tasks: ["Tulis pertanyaan", "Buat prediksi", "Diskusikan dengan kelompok"],
  },
  {
    id: "misi-bukti",
    projectId: "proyek-kangkung",
    title: "Ecological Execution (Niti Bukti) - Praktik Merawat Kangkung",
    stage: "NITI_BUKTI",
    status: "active",
    points: 150,
    instructions: "Isi air nutrisi secukupnya, ukur kangkung, lalu foto kondisi daun dari dekat.",
    tasks: ["Cek tinggi air nutrisi", "Ukur tinggi tanaman dengan penggaris", "Catat warna dan jumlah daun", "Lampirkan foto pengamatan"],
  },
  {
    id: "misi-bakti",
    projectId: "proyek-kangkung",
    title: "Ecological Reflection (Niti Bakti) - Cerita Belajarku",
    stage: "NITI_BAKTI",
    status: "submitted",
    points: 100,
    instructions: "Tulis refleksi keberhasilan dan kendala kelompok.",
    tasks: ["Ceritakan kendala", "Tulis solusi", "Buat janji aksi hijau"],
  },
  {
    id: "misi-sajati",
    projectId: "proyek-kangkung",
    title: "Ecological Mastery & Exhibition (Niti Sajati) - Pameran Eco Project",
    stage: "NITI_SAJATI",
    status: "locked",
    points: 200,
    instructions: "Upload poster atau foto hasil proyek.",
    tasks: ["Pilih foto terbaik", "Tulis judul karya", "Bagikan di galeri"],
  },
];

export const journals: JournalEntry[] = [
  { id: "j-1", studentId: "siswa-1", projectId: "proyek-kangkung", date: "2026-05-01", plantHeightCm: 5, leafCount: 4, condition: "sehat", weather: "cerah", waterMl: 180, note: "Benih kangkung mulai tegak. Warna daun muda hijau pucat dan akar putih terlihat di netpot.", photoUrl: ecoImages.seedlingCloseup },
  { id: "j-2", studentId: "siswa-1", projectId: "proyek-kangkung", date: "2026-05-02", plantHeightCm: 7, leafCount: 5, condition: "sehat", weather: "cerah", waterMl: 190, note: "Daun bertambah satu dan batang tidak rebah. Air nutrisi masih jernih.", photoUrl: ecoImages.seedlingCloseup },
  { id: "j-3", studentId: "siswa-1", projectId: "proyek-kangkung", date: "2026-05-03", plantHeightCm: 9, leafCount: 6, condition: "sehat", weather: "mendung", waterMl: 170, note: "Air sedikit berkurang setelah siang. Tim menandai garis air agar besok mudah dibandingkan.", photoUrl: ecoImages.hydroponicKangkung },
  { id: "j-4", studentId: "siswa-1", projectId: "proyek-kangkung", date: "2026-05-04", plantHeightCm: 12, leafCount: 7, condition: "sehat", weather: "cerah", waterMl: 200, note: "Batang lebih tegak dan daun menghadap ke arah cahaya jendela kelas.", photoUrl: ecoImages.hydroponicKangkung },
  { id: "j-5", studentId: "siswa-1", projectId: "proyek-kangkung", date: "2026-05-05", plantHeightCm: 15, leafCount: 8, condition: "sehat", weather: "hujan", waterMl: 160, note: "Cuaca hujan membuat cahaya berkurang, tetapi daun tetap segar karena air nutrisi cukup.", photoUrl: ecoImages.hydroponicKangkung },
  { id: "j-6", studentId: "siswa-1", projectId: "proyek-kangkung", date: "2026-05-06", plantHeightCm: 18, leafCount: 10, condition: "sehat", weather: "cerah", waterMl: 190, note: "Dua daun baru muncul. Kami mencatat bahwa daun yang dekat cahaya tampak lebih lebar.", photoUrl: ecoImages.hydroponicLettuce },
  { id: "j-7", studentId: "siswa-1", projectId: "proyek-kangkung", date: "2026-05-07", plantHeightCm: 21, leafCount: 11, condition: "sehat", weather: "cerah", waterMl: 200, note: "Pertumbuhan cepat setelah mendapat cahaya cukup. Akar terlihat lebih panjang di bawah netpot.", photoUrl: ecoImages.hydroponicKangkung },
  { id: "j-8", studentId: "siswa-1", projectId: "proyek-kangkung", date: "2026-05-08", plantHeightCm: 23, leafCount: 12, condition: "sehat", weather: "mendung", waterMl: 180, note: "Daun makin lebar. Kami bertanya apakah cahaya mendung membuat pertumbuhan besok lebih lambat.", photoUrl: ecoImages.hydroponicKangkung },
  { id: "j-9", studentId: "siswa-1", projectId: "proyek-kangkung", date: "2026-05-09", plantHeightCm: 26, leafCount: 14, condition: "sehat", weather: "cerah", waterMl: 200, note: "Kelompok mengganti air nutrisi dan membersihkan lumut kecil di tepi wadah.", photoUrl: ecoImages.hydroponicKangkung },
  { id: "j-10", studentId: "siswa-1", projectId: "proyek-kangkung", date: "2026-05-10", plantHeightCm: 29, leafCount: 15, condition: "sehat", weather: "cerah", waterMl: 210, note: "Tanaman siap dipilih untuk foto galeri. Kami akan membandingkan tinggi dengan Tim Sahabat Tanah.", photoUrl: ecoImages.hydroponicKangkung },
  { id: "j-11", studentId: "siswa-5", projectId: "proyek-kangkung", date: "2026-05-01", plantHeightCm: 4, leafCount: 4, condition: "sehat", weather: "cerah", waterMl: 120, note: "Tanaman masih kecil dan posisi wadah agak jauh dari cahaya pagi.", photoUrl: ecoImages.seedlingCloseup },
  { id: "j-12", studentId: "siswa-5", projectId: "proyek-kangkung", date: "2026-05-02", plantHeightCm: 6, leafCount: 4, condition: "kuning", weather: "cerah", waterMl: 110, note: "Ada satu daun mulai kuning. Kami menduga air terlalu sedikit dan cahaya terlalu panas.", photoUrl: ecoImages.seedlingCloseup },
  { id: "j-13", studentId: "siswa-5", projectId: "proyek-kangkung", date: "2026-05-03", plantHeightCm: 8, leafCount: 5, condition: "perlu_perawatan", weather: "mendung", waterMl: 100, note: "Air kurang, perlu perhatian. Tim membuat tanda batas air minimum.", photoUrl: ecoImages.hydroponicLettuce },
  { id: "j-14", studentId: "siswa-5", projectId: "proyek-kangkung", date: "2026-05-04", plantHeightCm: 10, leafCount: 6, condition: "sehat", weather: "cerah", waterMl: 170, note: "Setelah ditambah air, daun membaik. Warna kuning tidak bertambah.", photoUrl: ecoImages.hydroponicLettuce },
  { id: "j-15", studentId: "siswa-5", projectId: "proyek-kangkung", date: "2026-05-05", plantHeightCm: 12, leafCount: 7, condition: "sehat", weather: "hujan", waterMl: 150, note: "Pertumbuhan stabil. Kami memindahkan wadah agar tetap mendapat cahaya tidak langsung.", photoUrl: ecoImages.hydroponicLettuce },
  { id: "j-16", studentId: "siswa-5", projectId: "proyek-kangkung", date: "2026-05-06", plantHeightCm: 14, leafCount: 8, condition: "layu", weather: "cerah", waterMl: 90, note: "Tanaman agak layu saat siang. Kelompok mengamati air dan suhu area meja.", photoUrl: ecoImages.hydroponicLettuce },
  { id: "j-17", studentId: "siswa-5", projectId: "proyek-kangkung", date: "2026-05-07", plantHeightCm: 17, leafCount: 9, condition: "perlu_perawatan", weather: "cerah", waterMl: 130, note: "Perlu mengatur volume air. Kami sepakat mengecek pagi dan sebelum pulang.", photoUrl: ecoImages.hydroponicLettuce },
  { id: "j-18", studentId: "siswa-5", projectId: "proyek-kangkung", date: "2026-05-08", plantHeightCm: 19, leafCount: 10, condition: "sehat", weather: "mendung", waterMl: 170, note: "Daun kembali segar setelah jadwal cek air dibuat.", photoUrl: ecoImages.hydroponicLettuce },
  { id: "j-19", studentId: "siswa-5", projectId: "proyek-kangkung", date: "2026-05-09", plantHeightCm: 21, leafCount: 11, condition: "sehat", weather: "cerah", waterMl: 180, note: "Kelompok mencatat lebih rapi dan mulai membandingkan tinggi dengan data minggu pertama.", photoUrl: ecoImages.hydroponicLettuce },
  { id: "j-20", studentId: "siswa-5", projectId: "proyek-kangkung", date: "2026-05-10", plantHeightCm: 24, leafCount: 12, condition: "sehat", weather: "cerah", waterMl: 185, note: "Tanaman siap dibandingkan dengan tim lain. Perawatan air membuat pertumbuhan kembali stabil.", photoUrl: ecoImages.hydroponicLettuce },
];

export const quizzes: Quiz[] = [
  {
    id: "quiz-diagnostic",
    title: "EcoMaster Quiz Fotosintesis",
    type: "diagnostic",
    questions: [
      { id: "q1", question: "Bagian tumbuhan yang paling banyak membantu proses fotosintesis adalah...", options: ["Akar", "Daun", "Batang", "Bunga"], answer: "Daun", explanation: "Daun memiliki klorofil untuk menangkap cahaya matahari.", cognitiveLevel: "C2" },
      { id: "q2", question: "Tanaman membutuhkan cahaya matahari untuk...", options: ["Membuat makanan", "Membuat tanah", "Menghasilkan batu", "Mengurangi daun"], answer: "Membuat makanan", explanation: "Cahaya membantu tumbuhan membuat makanan melalui fotosintesis.", cognitiveLevel: "C2" },
      { id: "q3", question: "Jika air hidroponik terlalu sedikit, kemungkinan tanaman akan...", options: ["Semakin segar", "Layu", "Berbuah emas", "Tidak berubah"], answer: "Layu", explanation: "Air membantu tanaman menyerap nutrisi dan tetap segar.", cognitiveLevel: "C3" },
      { id: "q4", question: "Mengapa daun kangkung yang mendapat cahaya cukup biasanya tampak lebih hijau?", options: ["Karena klorofil bekerja baik", "Karena pot lebih berat", "Karena akar menjadi batu", "Karena air berubah warna"], answer: "Karena klorofil bekerja baik", explanation: "Klorofil menangkap cahaya dan membuat daun tampak hijau.", cognitiveLevel: "C3" },
      { id: "q5", question: "Apa hubungan tanaman dengan oksigen yang kita hirup?", options: ["Tanaman dapat menghasilkan oksigen", "Tanaman selalu menghabiskan oksigen", "Tanaman membuat plastik", "Tanaman tidak berhubungan"], answer: "Tanaman dapat menghasilkan oksigen", explanation: "Fotosintesis menghasilkan oksigen yang bermanfaat bagi makhluk hidup.", cognitiveLevel: "C3" },
      { id: "q6", question: "Sisa daun kering dapat dimanfaatkan menjadi...", options: ["Kompos", "Kaca", "Logam", "Plastik baru"], answer: "Kompos", explanation: "Sisa organik dapat diurai menjadi kompos untuk menyuburkan tanaman.", cognitiveLevel: "C2" },
      { id: "q7", question: "Kelompokmu melihat daun menguning dan air sedikit. Tindakan terbaik adalah...", options: ["Menambah air sesuai kebutuhan dan mencatat perubahan", "Mencabut semua tanaman", "Tidak perlu melakukan apa pun", "Menutup tanaman seharian"], answer: "Menambah air sesuai kebutuhan dan mencatat perubahan", explanation: "Masalah perlu diamati, diberi tindakan, lalu dicatat hasilnya.", cognitiveLevel: "C4" },
      { id: "q8", question: "Mengapa jurnal tanaman penting dalam proyek EcoGrow?", options: ["Agar data pertumbuhan dapat dibandingkan", "Agar buku terlihat penuh saja", "Agar tanaman tidak perlu dirawat", "Agar cahaya hilang"], answer: "Agar data pertumbuhan dapat dibandingkan", explanation: "Data jurnal membantu siswa menganalisis hubungan perawatan dan pertumbuhan.", cognitiveLevel: "C4" },
      { id: "q9", question: "Contoh kepedulian lingkungan di rumah adalah...", options: ["Hemat air saat menyiram", "Membuang sampah sembarang", "Membiarkan keran terbuka", "Merusak pot tanaman"], answer: "Hemat air saat menyiram", explanation: "Hemat air adalah aksi ekologis sederhana yang bisa dilakukan setiap hari.", cognitiveLevel: "C3" },
      { id: "q10", question: "Jika dua kelompok punya tinggi tanaman berbeda, kesimpulan paling bijak adalah...", options: ["Membandingkan cahaya, air, dan catatan perawatan", "Menyalahkan kelompok lain", "Membuang semua data", "Mengubah angka tanpa mengukur"], answer: "Membandingkan cahaya, air, dan catatan perawatan", explanation: "Analisis data membantu menemukan penyebab dengan adil.", cognitiveLevel: "C5" },
    ],
  },
];

export const badges: Badge[] = [
  { id: "badge-1", name: "Penjaga Tunas", description: "Rajin mengamati pertumbuhan awal tanaman.", icon: "sprout", requirement: "Submit 3 jurnal pertama." },
  { id: "badge-2", name: "Sahabat Tanah", description: "Peduli pada tanah, kompos, dan kebersihan kebun.", icon: "recycle", requirement: "Ikut aksi kompos." },
  { id: "badge-3", name: "Ahli Fotosintesis", description: "Memahami cahaya, air, dan klorofil.", icon: "sun", requirement: "Nilai quiz minimal 80." },
  { id: "badge-4", name: "Pahlawan Pengurai", description: "Membantu memilah sampah organik.", icon: "leaf", requirement: "Selesaikan tantangan kompos." },
  { id: "badge-5", name: "Eco Explorer", description: "Aktif menjelajah semua fitur EcoGrow.", icon: "compass", requirement: "Buka EcoLearn, EcoMission, dan EcoPlay." },
  { id: "badge-6", name: "Eco Master", description: "Menguasai proyek dari misi hingga pameran.", icon: "trophy", requirement: "Selesaikan 5 tahap Sintaks EcoGrow." },
  { id: "badge-7", name: "Juara Kolaborasi", description: "Bekerja sama dengan kelompok secara humanis.", icon: "users", requirement: "Dapat umpan balik kolaborasi baik." },
  { id: "badge-8", name: "Pejuang Hemat Air", description: "Menggunakan air dengan bijak saat merawat tanaman.", icon: "droplets", requirement: "Selesaikan EcoChallenge hemat air." },
];

export const harvests: HarvestReport[] = [
  { id: "panen-1", projectId: "proyek-kangkung", groupName: "Tim Tunas Hijau", productName: "Kangkung hidroponik", quantity: 2.5, unit: "kg", harvestedAt: "2026-05-28", imageUrl: ecoImages.hydroponicKangkung, impactMetric: "10 porsi sayur untuk pojok pangan sehat", contributionNote: "Dicuci, ditimbang, lalu dicatat sebagai contoh pangan sehat dari kebun kelas." },
  { id: "panen-2", projectId: "proyek-kangkung", groupName: "Tim Sahabat Tanah", productName: "Bayam sekolah", quantity: 1.8, unit: "kg", harvestedAt: "2026-05-28", imageUrl: ecoImages.vegetableHarvest, impactMetric: "Bahan diskusi gizi seimbang", contributionNote: "Dibandingkan dengan kangkung untuk melihat perbedaan bentuk daun dan masa panen." },
  { id: "panen-3", projectId: "proyek-kangkung", groupName: "Tim Kompos Ceria", productName: "Kompos daun kering", quantity: 4, unit: "kg", harvestedAt: "2026-05-27", imageUrl: ecoImages.agricultureField, impactMetric: "Media tanam ulang untuk 12 polybag", contributionNote: "Dipakai kembali untuk proyek bibit cabai agar siswa melihat siklus bahan organik." },
  { id: "panen-4", projectId: "proyek-kangkung", groupName: "Tim Cahaya Pagi", productName: "Bibit cabai", quantity: 12, unit: "polybag", harvestedAt: "2026-05-29", imageUrl: ecoImages.seedlingCloseup, impactMetric: "Proyek lanjutan setelah pameran", contributionNote: "Dirawat sebagai rencana keberlanjutan Smart Eco-Food School." },
];

export const galleryPosts: GalleryPost[] = [
  { id: "galeri-1", studentId: "siswa-1", projectId: "proyek-kangkung", title: "Akar Kangkung di Netpot", description: "Akar putih mulai panjang. Tim kami belajar bahwa akar menyerap air nutrisi agar daun tetap segar.", imageUrl: ecoImages.hydroponicKangkung, createdAt: "2026-05-07", likes: 18, moderationStatus: "approved", isFeatured: true, category: "foto_tanaman", stage: "NITI_BUKTI" },
  { id: "galeri-2", studentId: "siswa-5", projectId: "proyek-kangkung", title: "Catatan Air Nutrisi", description: "Setelah daun sempat layu, kami membuat garis batas air minimum dan jadwal cek pagi-siang.", imageUrl: ecoImages.hydroponicLettuce, createdAt: "2026-05-08", likes: 12, moderationStatus: "pending", category: "refleksi", stage: "NITI_BAKTI" },
  { id: "galeri-3", studentId: "siswa-2", projectId: "proyek-kangkung", title: "Poster Fotosintesis Tim Tunas", description: "Matahari memberi cahaya, daun menangkap energi, air membantu tanaman membuat makanan dan oksigen.", imageUrl: "/assets/images/ecogrow-concept-board.webp", createdAt: "2026-05-09", likes: 21, moderationStatus: "approved", isFeatured: true, category: "poster", stage: "NITI_SAJATI" },
  { id: "galeri-4", studentId: "siswa-12", projectId: "proyek-kangkung", title: "Panen Mini Tim Cahaya", description: "Kami menimbang hasil panen, mencatat berat, dan menulis manfaatnya untuk pangan sehat sekolah.", imageUrl: ecoImages.vegetableHarvest, createdAt: "2026-05-10", likes: 9, moderationStatus: "revision", category: "panen", stage: "NITI_SAJATI" },
];

export const ecoExhibitionItems: EcoExhibitionItem[] = [
  {
    id: "exhibit-1",
    studentName: "Adit",
    title: "Akar Kangkung di Netpot",
    type: "photo",
    status: "approved",
    badgeCandidate: "Penjaga Tunas",
    sourcePostId: "galeri-1",
  },
  {
    id: "exhibit-2",
    studentName: "Raka",
    title: "Catatan Air Nutrisi",
    type: "story",
    status: "waiting_review",
    badgeCandidate: "Pejuang Hemat Air",
    sourcePostId: "galeri-2",
  },
  {
    id: "exhibit-3",
    studentName: "Naya",
    title: "Poster Fotosintesis Tim Tunas",
    type: "poster",
    status: "approved",
    badgeCandidate: "Ahli Fotosintesis",
    sourcePostId: "galeri-3",
  },
  {
    id: "exhibit-4",
    studentName: "Gilang",
    title: "Panen Mini Tim Cahaya",
    type: "harvest_report",
    status: "revision",
    badgeCandidate: "Eco Exhibitor",
    sourcePostId: "galeri-4",
  },
];

export const reflections: ReflectionEntry[] = [
  {
    id: "refleksi-1",
    studentId: "siswa-1",
    projectId: "proyek-kangkung",
    feeling: "Bangga",
    lessonLearned: "Daun kangkung lebih hijau saat mendapat cahaya cukup.",
    problemSolved: "Kami mengganti air saat mulai keruh.",
    teamworkNote: "Adit mengukur, Naya mencatat, Bimo mengambil foto.",
    ecologicalPromise: "Aku akan hemat air saat menyiram tanaman.",
    createdAt: "2026-05-07T10:15:00",
    relatedStage: "NITI_BAKTI",
    kaihFocus: ["ekologis", "mandiri", "humanis"],
  },
];

export const studentTodaySummary = {
  studentId: "siswa-1",
  greeting: "Halo, Adit Eco Explorer!",
  todayMessage: "Hari ini kita lanjut Berguru pada Bumi melalui Ecological Execution (Niti Bukti).",
  activeStage: "NITI_BUKTI" as const,
  nextAction: "Isi jurnal tanaman setelah mengukur kangkung.",
  progressToNextLevel: 44,
  latestPlant: {
    heightCm: 29,
    leafCount: 15,
    condition: "sehat",
    message: "Tanamanmu tumbuh cepat setelah mendapat cahaya cukup.",
  },
  lastActivities: [
    { id: "act-1", type: "journal", label: "Jurnal tanaman terkirim", time: "Hari ini" },
    { id: "act-2", type: "quiz", label: "EcoMaster Quiz 8/10", time: "Kemarin" },
    { id: "act-3", type: "badge", label: "Badge Pejuang Hemat Air terbuka", time: "2 hari lalu" },
  ],
};

export const ecoLearnContents: LearningContent[] = [
  {
    id: "learn-1",
    title: "Apa itu fotosintesis?",
    type: "concept",
    durationMinute: 3,
    summary: "Fotosintesis adalah cara tumbuhan membuat makanan dengan bantuan cahaya matahari.",
    keywords: ["cahaya", "daun", "air", "klorofil", "oksigen"],
    relatedStage: "NITI_HARTI",
    imageUrl: ecoImages.seedlingCloseup,
    essentialQuestion: "Bagaimana daun kecil bisa membantu tanaman membuat makanan?",
  },
  {
    id: "learn-2",
    title: "Mengapa air penting untuk kangkung?",
    type: "observation",
    durationMinute: 2,
    summary: "Air membantu tanaman menyerap nutrisi dan tetap segar.",
    keywords: ["air", "nutrisi", "segar", "layu"],
    relatedStage: "NITI_SURTI",
    imageUrl: ecoImages.hydroponicKangkung,
    essentialQuestion: "Apa tanda tanaman mendapat air cukup atau terlalu sedikit?",
  },
  {
    id: "learn-3",
    title: "Kangkung dan pangan sehat sekolah",
    type: "meaningful",
    durationMinute: 4,
    summary: "Tanaman yang dirawat bersama dapat menjadi sumber pangan sehat dan melatih tanggung jawab.",
    keywords: ["panen", "pangan sehat", "ketahanan pangan"],
    relatedStage: "NITI_BAKTI",
    imageUrl: ecoImages.vegetableHarvest,
    essentialQuestion: "Bagaimana hasil panen kecil bisa membantu sekolah belajar pangan sehat?",
  },
];

export const ecoLearnChecks = [
  {
    id: "check-1",
    question: "Bagian tumbuhan yang banyak menangkap cahaya adalah...",
    options: ["Daun", "Batu", "Pot", "Meja"],
    answer: "Daun",
    feedback: "Benar. Daun memiliki klorofil yang membantu menangkap cahaya.",
  },
  {
    id: "check-2",
    question: "Jika air terlalu sedikit, tanaman bisa terlihat...",
    options: ["Layu", "Menjadi batu", "Tidak butuh cahaya", "Berubah jadi plastik"],
    answer: "Layu",
    feedback: "Tepat. Air membantu tanaman tetap segar dan menyerap nutrisi.",
  },
  {
    id: "check-3",
    question: "Merawat kangkung sekolah melatih kita untuk...",
    options: ["Peduli pangan sehat", "Membuang data", "Membiarkan keran terbuka", "Tidak bekerja sama"],
    answer: "Peduli pangan sehat",
    feedback: "Hebat. Proyek ini menghubungkan sains, tanggung jawab, dan ketahanan pangan.",
  },
];

export const studentMissionSubmissions: MissionSubmission[] = [
  {
    id: "submission-1",
    missionId: "misi-bukti",
    studentId: "siswa-1",
    status: "reviewed",
    submittedAt: "2026-05-07T08:30:00",
    teacherFeedback: "Catatanmu sudah rapi. Besok coba bandingkan dengan tanaman kelompok lain.",
    earnedPoints: 150,
  },
];

export const ecoPlayGames = [
  {
    id: "game-1",
    title: "Quiz Kilat Fotosintesis",
    type: "quiz_card",
    rewardPoints: 30,
    relatedConcept: "Fotosintesis",
  },
  {
    id: "game-2",
    title: "Susun Alur Fotosintesis",
    type: "sequence_puzzle",
    rewardPoints: 40,
    correctSequence: ["Cahaya", "Daun", "Air", "Makanan", "Oksigen"],
  },
  {
    id: "game-3",
    title: "Detektif Tanaman Layu",
    type: "problem_solving",
    rewardPoints: 50,
    scenario: "Tanaman tampak layu saat siang. Apa yang kamu cek terlebih dahulu?",
  },
];

export const harvestImpactSummary = {
  totalVegetableKg: 4.3,
  totalCompostKg: 4,
  totalSeedlings: 12,
  contributionText:
    "Hasil panen dicatat sebagai pojok pangan sehat dan bahan belajar ketahanan pangan sekolah.",
};

export const galleryCategories = [
  { id: "semua", label: "Semua" },
  { id: "foto_tanaman", label: "Foto Tanaman" },
  { id: "poster", label: "Poster" },
  { id: "panen", label: "Panen" },
  { id: "refleksi", label: "Refleksi" },
  { id: "laporan_proyek", label: "Laporan Proyek" },
] as const;

export const quizAttemptsMock: QuizAttempt[] = [
  {
    id: "attempt-1",
    quizId: "quiz-diagnostic",
    studentId: "siswa-1",
    score: 80,
    totalQuestions: 10,
    correctCount: 8,
    completedAt: "2026-05-06T09:10:00",
    recommendation: "Lanjutkan ke misi pengamatan tanaman dan bandingkan data air.",
  },
];

export const ecoChallenges: EcoChallenge[] = [
  {
    id: "challenge-1",
    type: "habit",
    title: "Hemat Air Saat Menyiram",
    description: "Gunakan air secukupnya saat merawat tanaman di rumah.",
    durationDays: 3,
    rewardPoints: 80,
    status: "active",
    kaihFocus: ["ekologis", "mandiri"],
    tasks: ["Siram tanaman secukupnya", "Catat kapan menyiram", "Ceritakan hasilnya"],
    imageUrl: ecoImages.gardeningActivity,
    parentPrompt: "Minta orang tua membantu melihat apakah air yang dipakai sudah cukup, tidak berlebihan.",
    evidenceHint: "Foto tanaman setelah disiram dan tulis kapan kamu menyiramnya.",
  },
  {
    id: "challenge-2",
    type: "enrichment",
    title: "Pilah Sampah Organik",
    description: "Pisahkan sisa daun atau kulit buah untuk belajar kompos.",
    durationDays: 2,
    rewardPoints: 70,
    status: "not_started",
    kaihFocus: ["ekologis", "humanis"],
    tasks: ["Cari sampah organik", "Pisahkan dari plastik", "Foto hasil pilahan"],
    imageUrl: ecoImages.agricultureField,
    parentPrompt: "Ajak keluarga memilih sisa daun atau kulit buah yang aman untuk belajar kompos.",
    evidenceHint: "Kirim foto pilahan organik dan cerita singkat tempat sampahnya.",
  },
  {
    id: "challenge-remedial-light",
    type: "remedial",
    title: "Latihan Ulang: Cahaya dan Tanaman",
    description: "Amati satu tanaman di rumah. Catat apakah tanaman mendapat cahaya cukup.",
    durationDays: 1,
    rewardPoints: 30,
    status: "not_started",
    kaihFocus: ["ekologis", "mandiri"],
    tasks: ["Foto tanaman di dekat sumber cahaya", "Catat apakah daunnya segar atau layu", "Tulis satu perbaikan yang bisa dicoba"],
    imageUrl: ecoImages.seedlingCloseup,
    parentPrompt: "Ajak keluarga melihat apakah tanaman mendapat cahaya pagi atau siang.",
    evidenceHint: "Kirim foto tanaman dan catatan lokasi cahayanya.",
  },
  {
    id: "challenge-water-saving",
    type: "habit",
    title: "Hemat Air 3 Hari",
    description: "Catat satu kebiasaan menghemat air selama tiga hari.",
    durationDays: 3,
    rewardPoints: 35,
    status: "not_started",
    kaihFocus: ["ekologis", "mandiri"],
    tasks: ["Pilih satu kebiasaan hemat air", "Catat selama tiga hari", "Tulis janji aksi hijau"],
    imageUrl: ecoImages.gardeningActivity,
    parentPrompt: "Orang tua boleh memberi paraf jika kebiasaan hemat air dilakukan.",
    evidenceHint: "Kirim catatan harian singkat dan janji aksi.",
  },
];

export const studentPortfolioSummary = {
  studentId: "siswa-1",
  completedStages: ["NITI_HARTI", "NITI_SURTI"] as const,
  activeStage: "NITI_BUKTI" as const,
  evidenceCounts: {
    journals: 10,
    reflections: 2,
    galleryPosts: 1,
    quizAttempts: 2,
    challenges: 1,
  },
  teacherNotes: [
    "Adit konsisten mencatat tinggi tanaman.",
    "Perlu memperkuat analisis penyebab daun menguning.",
  ],
};

export const missionProgress = [
  { stage: "Recognition", selesai: 24, berjalan: 1 },
  { stage: "Exploration", selesai: 22, berjalan: 3 },
  { stage: "Execution", selesai: 17, berjalan: 8 },
  { stage: "Reflection", selesai: 10, berjalan: 15 },
  { stage: "Exhibition", selesai: 4, berjalan: 21 },
];

export const badgeDistribution = badges.slice(0, 5).map((badge, index) => ({
  name: badge.name,
  value: [18, 12, 8, 7, 15][index],
}));

export const groupProgress = [
  { group: "Tim Tunas Hijau", progress: 76, journals: 10, feedback: "Konsisten mengisi jurnal selama 5 hari." },
  { group: "Tim Sahabat Tanah", progress: 61, journals: 10, feedback: "Perlu memperhatikan volume air." },
];

export const activeClassOptions: SelectOption[] = [
  { id: "kelas-4b", name: "Kelas 4B", totalStudents: 25 },
  { id: "kelas-4a", name: "Kelas 4A", totalStudents: 27 },
];

export const activeProjectOptions: SelectOption[] = [
  { id: "proyek-kangkung", name: "Hidroponik Kangkung", title: "Hidroponik Kangkung", currentStage: "NITI_BUKTI" },
  { id: "proyek-kompos", name: "Kompos Daun Sekolah", title: "Kompos Daun Sekolah", currentStage: "NITI_SURTI" },
];

export const notifications: EcoNotification[] = [
  { id: "notif-teacher-1", role: "teacher", title: "7 jurnal menunggu feedback", href: "/guru/monitoring", severity: "warning" },
  { id: "notif-teacher-2", role: "teacher", title: "3 karya galeri perlu moderasi", href: "/guru/galeri", severity: "info" },
  { id: "notif-teacher-3", role: "teacher", title: "2 siswa disarankan remedial C4", href: "/guru/analitik", severity: "danger" },
  { id: "notif-student-1", role: "student", title: "Tahap Lakukan Aksi masih berjalan", href: "/siswa/ecomission", severity: "info" },
  { id: "notif-student-2", role: "student", title: "Jurnal hari ini belum dikirim", href: "/siswa/ecomission", severity: "warning" },
  { id: "notif-student-3", role: "student", title: "Tantangan hemat air disarankan", href: "/siswa/ecochallenge", severity: "success" },
];

export const studentDashboardRecommendations: Recommendation[] = [
  {
    id: "rec-student-1",
    type: "remedial",
    title: "Perkuat konsep fotosintesis",
    reason: "Skor C4 terakhir masih perlu latihan hubungan air, cahaya, dan daun.",
    targetHref: "/siswa/ecolearn",
    actionLabel: "Ulangi EcoLearn",
  },
  {
    id: "rec-student-2",
    type: "action",
    title: "Cek volume air hari ini",
    reason: "Jurnal terakhir menunjukkan air perlu dijaga agar kangkung tetap segar.",
    targetHref: "/siswa/ecomission",
    actionLabel: "Isi jurnal",
  },
  {
    id: "rec-student-3",
    type: "enrichment",
    title: "Ambil tantangan hemat air",
    reason: "Konsistensi jurnalmu tinggi, cocok untuk pengayaan KAIH ekologis.",
    targetHref: "/siswa/ecochallenge",
    actionLabel: "Buka EcoChallenge",
  },
];

export const missionStages: MissionStageProgress[] = [
  { stage: "NITI_HARTI", status: "completed", evidence: "Catatan observasi awal", feedback: "Observasi sudah jelas. Tambahkan detail warna daun." },
  { stage: "NITI_SURTI", status: "reviewed", evidence: "Prediksi kebutuhan cahaya", feedback: "Prediksi sudah terhubung dengan kondisi tanaman." },
  { stage: "NITI_BUKTI", status: "active", evidence: "Jurnal tanaman harian", feedback: null },
  { stage: "NITI_BAKTI", status: "submitted", evidence: "Cerita Belajarku", feedback: "Tunggu komentar guru untuk refleksi." },
  { stage: "NITI_SAJATI", status: "locked", evidence: "Galeri Project dan portofolio", feedback: null },
];

export const portfolioTimeline: PortfolioTimelineItem[] = [
  { date: "2026-05-01", title: "Mulai Kenali Alam", evidence: "Mengamati tanaman", stage: "NITI_HARTI" },
  { date: "2026-05-07", title: "Selesai Lakukan Aksi awal", evidence: "Jurnal pertumbuhan", stage: "NITI_BUKTI" },
  { date: "2026-05-12", title: "Pamerkan Karya", evidence: "Poster dan presentasi", stage: "NITI_SAJATI" },
];

export const portfolioEvidence: Evidence[] = [
  {
    id: "evidence-1",
    title: "Jurnal pertumbuhan terbaik",
    description: "Data tinggi, daun, air, dan catatan penyebab perubahan tanaman.",
    imageUrl: ecoImages.hydroponicKangkung,
    stage: "NITI_BUKTI",
    status: "approved",
  },
  {
    id: "evidence-2",
    title: "Poster fotosintesis",
    description: "Karya visual yang menghubungkan cahaya, air, daun, dan oksigen.",
    imageUrl: "/assets/images/ecogrow-concept-board.webp",
    stage: "NITI_SAJATI",
    status: "pending",
  },
];

export const harvestDistribution = [
  { label: "Dikonsumsi bersama", amount: 2.5, unit: "kg" },
  { label: "Dibagikan", amount: 1.2, unit: "kg" },
  { label: "Pameran kelas", amount: 0.8, unit: "kg" },
];

export const reflectionPrompts = [
  "Apa perubahan yang kamu lihat pada tanaman hari ini?",
  "Apa tindakanmu yang paling membantu tanaman tumbuh lebih baik?",
  "Apa kegagalan atau kendala yang kamu temui, dan bagaimana kamu akan memperbaikinya?",
  "Apa makna kegiatan ini bagi lingkungan dan kehidupan sehari-harimu?",
];

export const ecoPlayResults = [
  {
    gameId: "game-rantai-makanan",
    score: 85,
    pointsEarned: 40,
    unlockedBadgeProgress: 70,
    recommendation: "Lanjutkan ke EcoMission tahap Ecological Exploration (Niti Surti).",
  },
];

export const challengeEvidence: Evidence[] = [
  {
    id: "challenge-evidence-1",
    title: "Bukti hemat air",
    description: "Saya menutup keran saat menyikat gigi dan mencatat air yang dipakai untuk tanaman.",
    imageUrl: ecoImages.gardeningActivity,
    stage: "NITI_BAKTI",
    status: "pending",
  },
];

export const quizFeedbackByQuestion = [
  {
    questionId: "q7",
    selectedAnswer: "Tidak perlu melakukan apa pun",
    correctAnswer: "Menambah air sesuai kebutuhan dan mencatat perubahan",
    isCorrect: false,
    explanation: "Masalah tanaman perlu diamati, diberi tindakan, lalu dicatat hasil perubahannya.",
    cognitiveLevel: "C4",
  },
];

export const quizFeedback: QuizFeedbackBank = {
  correct: [
    "Benar. Kamu memahami peran cahaya bagi tanaman.",
    "Hebat. Jawabanmu tepat dan EcoPoint-mu bertambah.",
    "Bagus. Kamu makin siap memamerkan hasil belajarmu.",
  ],
  incorrect: [
    "Belum tepat. Coba ingat kembali materi di EcoLearn.",
    "Hampir benar. Perhatikan lagi hubungan daun, air, dan cahaya.",
    "Coba lagi nanti. Petunjuk kecil ini akan membantumu belajar.",
  ],
};
