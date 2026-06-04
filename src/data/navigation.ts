import {
  BarChart3,
  BookOpen,
  Camera,
  ClipboardList,
  FileText,
  Gamepad2,
  Home,
  Leaf,
  MoreHorizontal,
  ShoppingBasket,
  Sprout,
  Trophy,
  Users,
} from "lucide-react";

export const landingNav = [
  { label: "Mengapa", href: "#mengapa" },
  { label: "Alur", href: "#alur-ecogrow" },
  { label: "Fitur", href: "#fitur" },
  { label: "Dampak", href: "#dampak" },
  { label: "Muatan", href: "#muatan" },
  { label: "SDGs", href: "#sdgs" },
];

export const guruNavigation = [
  { label: "Ringkasan", href: "/guru", icon: Home },
  { label: "Modul Ajar", href: "/guru/modul-ajar", icon: BookOpen },
  { label: "Proyek", href: "/guru/proyek", icon: ClipboardList },
  { label: "Monitoring", href: "/guru/monitoring", icon: Sprout },
  { label: "Asesmen", href: "/guru/asesmen", icon: Trophy },
  { label: "Laporan", href: "/guru/laporan", icon: FileText },
  { label: "Analitik", href: "/guru/analitik", icon: BarChart3 },
  { label: "Galeri", href: "/guru/galeri", icon: Camera },
  { label: "Panduan", href: "/guru/panduan", icon: Leaf },
];

export const siswaPrimaryNavigation = [
  { label: "Beranda", href: "/siswa", icon: Home },
  { label: "Misi", href: "/siswa/ecomission", icon: Sprout },
  { label: "Belajar", href: "/siswa/ecolearn", icon: BookOpen },
  { label: "Bermain", href: "/siswa/ecoplay", icon: Gamepad2 },
  { label: "Cerita", href: "/siswa/cerita-belajarku", icon: Leaf },
  { label: "Album Belajarku", href: "/siswa/portofolio", icon: ClipboardList },
];

export const siswaSecondaryNavigation = [
  { label: "Kuis Awal", href: "/siswa/ecoreadiness", icon: ClipboardList },
  { label: "Galeri", href: "/siswa/galeri", icon: Camera },
  { label: "Kuis Akhir", href: "/siswa/ecomaster-quiz", icon: Trophy },
  { label: "Laporan Belajar", href: "/siswa/laporan-belajar", icon: FileText },
  { label: "Tantangan Rumah", href: "/siswa/ecochallenge", icon: Users },
  { label: "Panen", href: "/siswa/ecomart", icon: ShoppingBasket },
];

export const siswaNavigation = [...siswaPrimaryNavigation, ...siswaSecondaryNavigation];

export const siswaMoreNavigation = [
  ...siswaPrimaryNavigation.slice(4),
  ...siswaSecondaryNavigation,
];

export const siswaMobileNavigation = [
  ...siswaPrimaryNavigation.slice(0, 4),
  { label: "Lainnya", href: "#siswa-lainnya", icon: MoreHorizontal },
];
