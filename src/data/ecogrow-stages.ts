import type { EcoGrowStage as EcoGrowStageCode } from "@/types/ecogrow";
import type {
  EcoGrowAssessmentRow,
  EcoGrowStage as EcoGrowStageDefinition,
  EcoGrowStageId,
  TeacherStageAnalytic,
} from "@/types/ecogrow-stage";

export const stageIdToEcoGrowStage: Record<EcoGrowStageCode, EcoGrowStageId> = {
  NITI_HARTI: "recognition",
  NITI_SURTI: "exploration",
  NITI_BUKTI: "execution",
  NITI_BAKTI: "reflection",
  NITI_SAJATI: "exhibition",
};

export const legacyStageToEcoGrowStage = stageIdToEcoGrowStage;

export const ecogrowStages: EcoGrowStageDefinition[] = [
  {
    id: "recognition",
    order: 1,
    shortLabel: "Recognize",
    title: "Ecological Recognition",
    localTerm: "Niti Harti",
    description: "Tahap mengenali, memahami, dan mengamati realitas alam secara objektif sebagai dasar berguru pada bumi.",
    studentAction: "Mengamati lingkungan, tanaman, air, tanah, cahaya, dan komponen biotik-abiotik.",
    teacherAction: "Memfasilitasi observasi, apersepsi ekologis, dan identifikasi pengetahuan awal peserta didik.",
    evidenceExamples: ["Foto observasi", "Catatan pengamatan", "Checklist lingkungan"],
    status: "completed",
    progress: 100,
    points: 120,
    icon: "Eye",
    color: "green",
  },
  {
    id: "exploration",
    order: 2,
    shortLabel: "Explore",
    title: "Ecological Exploration",
    localTerm: "Niti Surti",
    description: "Tahap menghayati makna fenomena alam, menghubungkan konsep dengan isu nyata, dan merancang solusi ekologis.",
    studentAction: "Mengajukan pertanyaan kritis, menganalisis masalah, dan merancang solusi sederhana.",
    teacherAction: "Memandu diskusi, pertanyaan pemantik, dan eksplorasi konsep lintas mata pelajaran.",
    evidenceExamples: ["Pertanyaan kritis", "Rancangan solusi", "Peta ide"],
    status: "completed",
    progress: 100,
    points: 140,
    icon: "Compass",
    color: "emerald",
  },
  {
    id: "execution",
    order: 3,
    shortLabel: "Execute",
    title: "Ecological Execution",
    localTerm: "Niti Bukti",
    description: "Tahap pembuktian teori melalui aksi nyata ekologis dan penyelidikan lapangan.",
    studentAction: "Menanam, merawat tanaman, membuat kompos, melakukan eksperimen, atau mengelola proyek ekologis.",
    teacherAction: "Mengarahkan praktik, memantau keselamatan, dan memberi umpan balik kinerja.",
    evidenceExamples: ["Foto aksi", "Video praktik", "Data pertumbuhan tanaman"],
    status: "active",
    progress: 65,
    points: 95,
    icon: "Activity",
    color: "amber",
  },
  {
    id: "reflection",
    order: 4,
    shortLabel: "Reflect",
    title: "Ecological Reflection",
    localTerm: "Niti Bakti",
    description: "Tahap mengevaluasi proses, membaca data, merefleksikan keberhasilan atau kegagalan, dan memaknai dampak ekologis.",
    studentAction: "Menulis jurnal reflektif, mengevaluasi hasil, dan merancang perbaikan.",
    teacherAction: "Memberi umpan balik reflektif dan membantu peserta didik menyusun tindak lanjut.",
    evidenceExamples: ["Jurnal refleksi", "Analisis data", "Rencana perbaikan"],
    status: "locked",
    progress: 0,
    points: 0,
    icon: "RefreshCcw",
    color: "sky",
  },
  {
    id: "exhibition",
    order: 5,
    shortLabel: "Exhibit",
    title: "Ecological Mastery & Exhibition",
    localTerm: "Niti Sajati",
    description: "Tahap menunjukkan penguasaan, kemandirian, dan kebijaksanaan ekologis melalui karya dan publikasi praktik baik.",
    studentAction: "Mempresentasikan hasil, membuat poster, mengunggah karya ke galeri, atau membagikan praktik baik.",
    teacherAction: "Menilai karya akhir, memfasilitasi pameran, dan mendokumentasikan portofolio digital.",
    evidenceExamples: ["Poster", "Laporan akhir", "Galeri proyek", "Produk panen"],
    status: "locked",
    progress: 0,
    points: 0,
    icon: "Trophy",
    color: "indigo",
  },
];

export const teacherStageAnalytics: TeacherStageAnalytic[] = [
  { stageId: "recognition", title: "Ecological Recognition", localTerm: "Niti Harti", completedStudents: 25, activeStudents: 0, needsSupport: 0, averageScore: 88, completionRate: 100 },
  { stageId: "exploration", title: "Ecological Exploration", localTerm: "Niti Surti", completedStudents: 22, activeStudents: 3, needsSupport: 2, averageScore: 84, completionRate: 88 },
  { stageId: "execution", title: "Ecological Execution", localTerm: "Niti Bukti", completedStudents: 12, activeStudents: 10, needsSupport: 5, averageScore: 79, completionRate: 48 },
  { stageId: "reflection", title: "Ecological Reflection", localTerm: "Niti Bakti", completedStudents: 5, activeStudents: 7, needsSupport: 6, averageScore: 75, completionRate: 20 },
  { stageId: "exhibition", title: "Ecological Mastery & Exhibition", localTerm: "Niti Sajati", completedStudents: 2, activeStudents: 3, needsSupport: 4, averageScore: 82, completionRate: 8 },
];

export const ecoGrowAssessmentRows: EcoGrowAssessmentRow[] = [
  {
    stageId: "recognition",
    stage: "Ecological Recognition",
    localTerm: "Niti Harti",
    cognitive: "Mengidentifikasi komponen lingkungan",
    affective: "Rasa ingin tahu",
    psychomotor: "Observasi awal",
    evidence: "Foto/catatan observasi",
  },
  {
    stageId: "exploration",
    stage: "Ecological Exploration",
    localTerm: "Niti Surti",
    cognitive: "Merumuskan pertanyaan dan solusi",
    affective: "Kepedulian",
    psychomotor: "Perencanaan aksi",
    evidence: "Rancangan solusi",
  },
  {
    stageId: "execution",
    stage: "Ecological Execution",
    localTerm: "Niti Bukti",
    cognitive: "Menerapkan konsep",
    affective: "Tanggung jawab",
    psychomotor: "Praktik ekologis",
    evidence: "Foto/video aksi",
  },
  {
    stageId: "reflection",
    stage: "Ecological Reflection",
    localTerm: "Niti Bakti",
    cognitive: "Menganalisis data dan kendala",
    affective: "Kejujuran reflektif",
    psychomotor: "Perbaikan proses",
    evidence: "Jurnal refleksi",
  },
  {
    stageId: "exhibition",
    stage: "Ecological Mastery & Exhibition",
    localTerm: "Niti Sajati",
    cognitive: "Mengomunikasikan hasil",
    affective: "Percaya diri dan kolaborasi",
    psychomotor: "Presentasi/pameran",
    evidence: "Poster/galeri/laporan",
  },
];

export const getEcoGrowStage = (stageId: EcoGrowStageId) =>
  ecogrowStages.find((stage) => stage.id === stageId) ?? ecogrowStages[0];

export const getEcoGrowStageByCode = (stage: EcoGrowStageCode) =>
  getEcoGrowStage(stageIdToEcoGrowStage[stage]);

export const getEcoGrowStageByLegacy = getEcoGrowStageByCode;

export const getEcoGrowStageLabel = (stage: EcoGrowStageCode) => {
  const item = getEcoGrowStageByCode(stage);
  return `${item.title} (${item.localTerm})`;
};

export const getEcoGrowStageShortLabel = (stage: EcoGrowStageCode) =>
  getEcoGrowStageByCode(stage).shortLabel;
