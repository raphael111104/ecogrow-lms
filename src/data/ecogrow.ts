import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  Camera,
  CloudSun,
  Droplets,
  Gamepad2,
  ShoppingBasket,
  Sprout,
  Sun,
  TreePine,
} from "lucide-react";

export const concepts = [
  {
    title: "Smart Eco-Food School",
    description:
      "Sekolah menjadi ekosistem belajar hidup: kebun, kompos, panen, dan pangan sehat dipelajari sebagai satu siklus.",
    icon: TreePine,
    accent: "bg-leaf-100 text-leaf-700",
  },
  {
    title: "Sintaks EcoGrow Learning",
    description:
      "Pancaniti dikembangkan menjadi alur Recognize, Explore, Execute, Reflect, dan Exhibit.",
    icon: Sprout,
    accent: "bg-sky/15 text-sky",
  },
  {
    title: "Meaningful, Mindful, Joyful",
    description:
      "Setiap misi dibuat bermakna, reflektif, dan menyenangkan agar anak merasa dekat dengan bumi.",
    icon: Sun,
    accent: "bg-sun/25 text-earth",
  },
];

export const pancanitiSteps = [
  "Ecological Recognition (Niti Harti)",
  "Ecological Exploration (Niti Surti)",
  "Ecological Execution (Niti Bukti)",
  "Ecological Reflection (Niti Bakti)",
  "Ecological Mastery & Exhibition (Niti Sajati)",
];

export const features = [
  {
    title: "EcoLearn",
    description: "Modul singkat tentang fotosintesis, hidroponik, tanah, kompos, dan iklim.",
    icon: BookOpen,
    color: "text-leaf-500",
  },
  {
    title: "EcoMission",
    description: "Misi harian berbasis observasi kebun sekolah dan aksi kecil di rumah.",
    icon: Sprout,
    color: "text-leaf-700",
  },
  {
    title: "EcoPlay",
    description: "Kuis, permainan cocok tanam, dan tantangan kolaborasi kelompok.",
    icon: Gamepad2,
    color: "text-sky",
  },
  {
    title: "EcoChallenge",
    description: "Tantangan hemat air, memilah sampah, dan membuat jurnal pertumbuhan.",
    icon: Droplets,
    color: "text-sky",
  },
  {
    title: "Ecomart",
    description: "Simulasi panen, poin, dan pertukaran reward belajar ramah anak.",
    icon: ShoppingBasket,
    color: "text-harvest",
  },
  {
    title: "Galeri Project",
    description: "Ruang dokumentasi foto, video, dan cerita hasil proyek kelas.",
    icon: Camera,
    color: "text-earth",
  },
  {
    title: "Portofolio Digital",
    description: "Kumpulan badge, refleksi, jurnal, dan karya pameran Eco Explorer.",
    icon: BadgeCheck,
    color: "text-leaf-500",
  },
  {
    title: "Dashboard Guru",
    description: "Monitoring progres, asesmen, aktivitas siswa, dan umpan balik proyek.",
    icon: BarChart3,
    color: "text-leaf-700",
  },
];

export const sdgs = [
  {
    code: "SDG 2",
    title: "Zero Hunger",
    description: "Belajar pangan sehat, panen sekolah, dan ketahanan pangan sederhana.",
    icon: ShoppingBasket,
  },
  {
    code: "SDG 4",
    title: "Quality Education",
    description: "Pembelajaran ekologis yang aktif, reflektif, dan inklusif.",
    icon: BookOpen,
  },
  {
    code: "SDG 13",
    title: "Climate Action",
    description: "Aksi iklim kecil: hemat air, kompos, dan pengamatan cuaca.",
    icon: CloudSun,
  },
  {
    code: "SDG 15",
    title: "Life on Land",
    description: "Merawat tanaman, tanah, serangga baik, dan kebun sekolah.",
    icon: TreePine,
  },
];
