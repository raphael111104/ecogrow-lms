"use client";

import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Droplets,
  Edit3,
  Eye,
  Filter,
  Leaf,
  LineChart,
  MessageSquareText,
  Plus,
  Save,
  Send,
  Sparkles,
  Sprout,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { EcoProgress } from "@/components/ui/EcoProgress";
import { EcoGrowAssessmentMatrix } from "@/components/ecogrow/EcoGrowAssessmentMatrix";
import { EcoGrowStageAnalytics } from "@/components/ecogrow/EcoGrowStageAnalytics";
import { EcoGrowStageBadge } from "@/components/ecogrow/EcoGrowStageBadge";
import { RubricTable } from "@/components/ecogrow/RubricTable";
import { TeachingModuleSummaryCard } from "@/components/ecogrow/TeachingModuleSummaryCard";
import { AssessmentPackagePanel } from "@/components/guru/AssessmentPackagePanel";
import { ModuleDocumentPreview } from "@/components/guru/ModuleDocumentPreview";
import { EcoGrowStepper } from "@/components/shared/EcoGrowStepper";
import { RecommendationCard } from "@/components/shared/RecommendationCard";
import { RubricScoreCard } from "@/components/shared/RubricScoreCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  analyticsSummary,
  assessmentTabs,
  badges,
  ecoExhibitionRubric,
  ecoMasterSummativeQuestions,
  ecoMissionFormativeQuestions,
  ecoReadinessQuestions,
  ecoGrowAssessmentRows,
  ecogrowDigitalLkpd,
  ecogrowStages,
  ecogrowTeachingModules,
  ecoGrowGuideSections,
  galleryModerationActions,
  galleryPosts,
  generatedModuleSeed,
  getEcoGrowStageLabel,
  groupProgress,
  journals,
  kaihRubrics,
  moduleGeneratorDefaults,
  moduleValidationBadges,
  performanceRubrics,
  projectWizardTemplates,
  quizzes,
  studentLearningRisks,
  studentProfiles,
  teacherDashboardSummary,
  teacherAnalyticsMock,
  teacherInsights,
  teacherStageAnalytics,
  teacherQuickActions,
  users,
  stageIdToEcoGrowStage,
} from "@/data";
import { useMockAssessments } from "@/hooks/useMockAssessments";
import { useMockProjects } from "@/hooks/useMockProjects";
import { useMockStorage } from "@/hooks/useMockStorage";
import { useTeacherFeedback } from "@/hooks/useTeacherFeedback";
import { getActiveTeacherMock } from "@/lib/mock-teacher-context";
import { countHotsQuestions, countSoloDeepQuestions } from "@/lib/ecogrow-assessment-utils";
import {
  getTeacherAnalyticsMock,
  getTeacherAssessmentMock,
  getTeacherDashboardMock,
  getTeacherMonitoringMock,
} from "@/mock/repositories/teacherRepository";
import { getProjectOverviewMock } from "@/mock/repositories/projectRepository";
import type {
  AssessmentResult,
  EcoProject,
  FeedbackType,
  GalleryPost,
  GeneratedModuleDraft,
  JournalEntry,
  EcoGrowStage,
  ReviewStatus,
  TeacherFeedback,
} from "@/types/ecogrow";

const inputClass = "eco-input";

const stageLabel: Record<EcoGrowStage, string> = {
  NITI_HARTI: getEcoGrowStageLabel("NITI_HARTI"),
  NITI_SURTI: getEcoGrowStageLabel("NITI_SURTI"),
  NITI_BUKTI: getEcoGrowStageLabel("NITI_BUKTI"),
  NITI_BAKTI: getEcoGrowStageLabel("NITI_BAKTI"),
  NITI_SAJATI: getEcoGrowStageLabel("NITI_SAJATI"),
};

const stageTone: Record<EcoGrowStage, string> = {
  NITI_HARTI: "bg-leaf-100 text-leaf-700",
  NITI_SURTI: "bg-sky/15 text-sky",
  NITI_BUKTI: "bg-sun/25 text-earth",
  NITI_BAKTI: "bg-cream text-earth",
  NITI_SAJATI: "bg-leaf-700 text-white",
};

const conditionLabel: Record<JournalEntry["condition"], string> = {
  sehat: "Sehat",
  layu: "Layu",
  kuning: "Kuning",
  perlu_perawatan: "Perlu perawatan",
};

const reviewLabel: Record<ReviewStatus, string> = {
  pending: "Menunggu review",
  approved: "Disetujui",
  needs_revision: "Perlu perbaikan",
};

const categoryLabel: Record<NonNullable<GalleryPost["category"]>, string> = {
  foto_tanaman: "Foto tanaman",
  poster: "Poster",
  panen: "Panen",
  refleksi: "Refleksi",
  laporan_proyek: "Laporan proyek",
};

function getStudentName(studentId: string) {
  return users.find((user) => user.id === studentId)?.name ?? "Siswa";
}

function getStudentGroup(studentId: string) {
  return studentProfiles.find((profile) => profile.userId === studentId)?.groupName ?? "Belum berkelompok";
}

function SectionTitle({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative">
      {label ? (
        <p className="inline-flex items-center gap-2 rounded-full border border-leaf-500/15 bg-leaf-50 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.13em] text-leaf-500">
          <span className="size-1.5 rounded-full bg-sun" aria-hidden="true" />
          {label}
        </p>
      ) : null}
      <h1 className="mt-2 max-w-4xl font-heading text-2xl font-black leading-tight text-leaf-700 md:text-3xl">
        {title}
      </h1>
      {description ? <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-mutedText">{description}</p> : null}
    </div>
  );
}

function TeacherHero({
  title,
  description,
  metrics,
  actions,
}: {
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string; note: string }>;
  actions?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-[1.15rem] border border-white/15 bg-[#052f1b] p-4 text-white shadow-[0_22px_60px_rgba(6,42,22,0.18)] md:p-5">
      <div
        className="absolute inset-0 opacity-22 mix-blend-screen"
        style={{
          backgroundImage: "url('/assets/images/hydroponic-farming-usda-public-domain.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 fine-noise opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(5,47,27,0.98),rgba(11,79,42,0.9)_48%,rgba(56,189,248,0.18)_100%)]" aria-hidden="true" />
      <div className="absolute -right-16 top-8 size-36 rounded-full border border-white/10 bg-white/[0.04]" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 h-24 w-1/2 bg-gradient-to-l from-sun/16 to-transparent" aria-hidden="true" />

      <div className="relative grid gap-5 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.13em] text-sun backdrop-blur">
            <Leaf className="size-3.5" aria-hidden="true" />
            Teacher Command Garden
          </p>
          <h1 className="max-w-4xl font-heading text-2xl font-black leading-tight text-white md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-white/78 md:text-base md:leading-7">{description}</p>
          {actions ? <div className="mt-5 flex flex-wrap gap-2.5">{actions}</div> : null}
        </div>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-white/12 bg-white/[0.1] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.11em] text-white/58">{metric.label}</p>
              <p className="mt-1.5 font-heading text-2xl font-black text-white">{metric.value}</p>
              <p className="mt-1.5 text-[0.7rem] font-bold leading-4 text-white/68">{metric.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeacherMetricCard({
  label,
  value,
  note,
  icon: Icon,
}: {
  label: string;
  value: string;
  note: string;
  icon: typeof Users;
}) {
  return (
    <EcoCard className="p-4">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-leaf-500 via-sun to-sky opacity-70" aria-hidden="true" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-mutedText">{label}</p>
          <p className="mt-2 font-heading text-3xl font-black leading-none text-leaf-700">{value}</p>
        </div>
        <span className="grid size-10 place-items-center rounded-lg bg-leaf-100 text-leaf-700 shadow-soft ring-1 ring-leaf-500/10">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-xs font-semibold leading-5 text-mutedText">{note}</p>
    </EcoCard>
  );
}

function ClassOverviewCard() {
  const { activeClass, classStudents } = getActiveTeacherMock();
  const groups = Array.from(new Set(classStudents.map((student) => student.groupName)));
  const riskCount = classStudents.filter((student) => student.learningRisk && student.learningRisk !== "aman").length;

  return (
    <EcoCard tone="cream">
      <SectionTitle label="Kelas aktif" title={activeClass.name} description={`${groups.length} kelompok belajar dengan ${classStudents.length} siswa mock.`} />
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-white/78 p-4">
          <p className="text-sm font-bold text-mutedText">Total siswa</p>
          <p className="mt-1 font-heading text-3xl font-black text-leaf-700">{activeClass.totalStudents}</p>
        </div>
        <div className="rounded-xl bg-white/78 p-4">
          <p className="text-sm font-bold text-mutedText">Kelompok</p>
          <p className="mt-1 font-heading text-3xl font-black text-leaf-700">{groups.length}</p>
        </div>
        <div className="rounded-xl bg-white/78 p-4">
          <p className="text-sm font-bold text-mutedText">Perlu dukungan</p>
          <p className="mt-1 font-heading text-3xl font-black text-earth">{riskCount}</p>
        </div>
      </div>
    </EcoCard>
  );
}

function ProjectStatusCard() {
  const { activeProject, projectMissions } = getActiveTeacherMock();

  return (
    <EcoCard>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <EcoBadge className="bg-sun/25 text-earth">Proyek aktif</EcoBadge>
          <h2 className="mt-4 font-heading text-3xl font-black text-leaf-700">{activeProject.title}</h2>
          <p className="mt-3 leading-7 text-mutedText">{activeProject.description}</p>
        </div>
        <EcoButton href="/guru/monitoring" variant="secondary" size="sm" icon={<Eye className="size-4" />}>
          Buka monitoring
        </EcoButton>
      </div>
      <EcoProgress value={activeProject.progress} label={`Tahap saat ini: ${stageLabel[activeProject.currentStage ?? "NITI_BUKTI"]}`} color="orange" className="mt-5" />
      <div className="mt-5 grid gap-3 md:grid-cols-5">
        {projectMissions.map((mission) => (
          <div key={mission.id} className="rounded-xl border border-gardenBorder bg-leaf-50 p-3">
            <EcoGrowStageBadge stageId={stageIdToEcoGrowStage[mission.stage]} showShortLabel />
            <p className="mt-3 text-sm font-bold leading-5 text-slateText">{mission.title.split(" - ")[1]}</p>
          </div>
        ))}
      </div>
    </EcoCard>
  );
}

function PancanitiClassMap() {
  return (
    <EcoCard className="garden-grid">
      <SectionTitle label="Progress Kelas Berdasarkan Sintaks EcoGrow" title="Sebaran tahap kelas" />
      <div className="mt-5">
        <EcoGrowStageAnalytics data={teacherStageAnalytics} />
      </div>
    </EcoCard>
  );
}

function KaihClassSummary() {
  return (
    <EcoCard>
      <SectionTitle label="KAIH kelas" title="Karakter ekologis rata-rata" />
      <div className="mt-5 space-y-4">
        {Object.entries(analyticsSummary.kaihAverage).map(([dimension, value]) => (
          <EcoProgress key={dimension} value={value} label={dimension.charAt(0).toUpperCase() + dimension.slice(1)} />
        ))}
      </div>
    </EcoCard>
  );
}

function TeacherInsightCard({ insight }: { insight: (typeof teacherInsights)[number] }) {
  return (
    <EcoCard tone="cream">
      <Sparkles className="size-8 text-harvest" />
      <h3 className="mt-4 font-heading text-xl font-black text-leaf-700">{insight.title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{insight.description}</p>
      <EcoButton href={insight.href} variant="secondary" size="sm" className="mt-4" icon={<ArrowRight className="size-4" />}>
        {insight.actionLabel}
      </EcoButton>
    </EcoCard>
  );
}

export function TeacherDashboardPage() {
  const { teacher, activeClass, activeProject, classStudents } = getActiveTeacherMock();
  const dashboard = getTeacherDashboardMock(teacher?.id);
  const projectOverview = getProjectOverviewMock(activeProject.id);

  return (
    <div className="living-page mx-auto max-w-7xl space-y-5">
      <TeacherHero
        title={`${teacher?.name ?? "Guru"} memimpin EcoGrow`}
        description={`${activeClass.name} sedang menjalankan ${activeProject.title}. Dashboard ini menyorot jurnal, remedial, pengayaan, KAIH, dan keputusan aksi guru hari ini.`}
        actions={
          <>
            <EcoButton href="/guru/modul-ajar" variant="reward" icon={<BookOpen className="size-4" />}>Buat Modul Ajar</EcoButton>
            <EcoButton href="/guru/proyek" variant="secondary" icon={<Plus className="size-4" />}>Tambah Proyek</EcoButton>
            <EcoButton href="/guru/monitoring" variant="secondary" icon={<ClipboardCheck className="size-4" />}>Validasi Jurnal</EcoButton>
            <EcoButton href="/guru/analitik" variant="secondary" icon={<BarChart3 className="size-4" />}>Buka Analitik</EcoButton>
          </>
        }
        metrics={[
          { label: "Kelas aktif", value: activeClass.grade, note: activeClass.name },
          { label: "Siswa mock", value: String(classStudents.length), note: "Konsisten dengan total kelas" },
          { label: "Proyek", value: "68%", note: "Rata-rata Progress Sintaks EcoGrow" },
        ]}
      />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <TeacherMetricCard label="Total siswa" value={String(teacherDashboardSummary.totalStudents)} note="25 profil mock lintas 5 kelompok." icon={Users} />
        <TeacherMetricCard label="Proyek aktif" value={String(teacherDashboardSummary.activeProjects)} note={activeProject.title} icon={Sprout} />
        <TeacherMetricCard label="Jurnal hari ini" value={String(teacherDashboardSummary.journalsToday)} note="Masuk dari jurnal proyek." icon={BookOpen} />
        <TeacherMetricCard label="Belum feedback" value={String(teacherDashboardSummary.pendingFeedback)} note="Prioritas validasi hari ini." icon={MessageSquareText} />
        <TeacherMetricCard label="Progress misi" value={`${teacherDashboardSummary.averageMissionProgress}%`} note="Rata-rata Sintaks EcoGrow kelas." icon={Trophy} />
        <TeacherMetricCard label="Perlu perhatian" value={String(teacherDashboardSummary.studentsNeedAttention)} note="Disarankan remedial/pengayaan." icon={AlertTriangle} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <EcoCard>
          <SectionTitle label="Aksi cepat" title="Antrian keputusan guru" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {dashboard.actionQueue.map((action) => (
              <a key={action.id} href={action.href} className="flex items-center justify-between gap-3 rounded-xl border border-gardenBorder bg-leaf-50 p-4 font-bold text-slateText transition hover:-translate-y-0.5 hover:bg-white">
                <span>
                  <span className="block font-heading text-2xl font-black text-leaf-700">{action.count}</span>
                  <span className="text-sm">{action.label}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-leaf-700" />
              </a>
            ))}
          </div>
        </EcoCard>
        <ProjectStatusCard />
      </section>

      <EcoCard>
        <SectionTitle label="Progress Kelas Berdasarkan Sintaks EcoGrow" title="Status proyek aktif dan bukti belajar" description="Guru bisa melihat tahap EcoGrow yang sudah selesai, aktif, perlu review, dan terkunci sebelum memberi tindak lanjut." />
        <div className="mt-5">
          <EcoGrowStepper stages={projectOverview.stages} activeStage={activeProject.currentStage} />
        </div>
      </EcoCard>

      <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <KaihClassSummary />
        <div className="grid gap-4 md:grid-cols-3">
          {teacherInsights.map((insight) => <TeacherInsightCard key={insight.id} insight={insight} />)}
        </div>
      </section>

      <PancanitiClassMap />

      <section>
        <SectionTitle label="Tindak lanjut otomatis" title="Remedial dan pengayaan yang disarankan" />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {dashboard.recommendations.map((item) => (
            <RecommendationCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function TeacherGuidePage() {
  const checklist = [
    "Sudah memilih CP/TP",
    "Sudah menentukan proyek",
    "Sudah membagi kelompok",
    "Sudah mengaktifkan misi",
    "Sudah menyiapkan rubrik",
    "Sudah menyiapkan refleksi",
  ];
  const deepLearning = ["Mindful: siswa sadar tujuan dan data", "Meaningful: terkait pangan sekolah", "Joyful: misi petualangan kelas"];
  const assessments = ["As learning: Ecological Reflection (Niti Bakti)", "For learning: feedback jurnal", "Of learning: quiz dan Eco-Exhibition"];

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <TeacherHero
        title="Panduan cepat EcoGrow untuk guru"
        description="Rujukan implementasi Smart Eco-Food School, Sintaks EcoGrow Learning, deep learning, asesmen, dan kearifan lokal sebelum guru mengaktifkan misi siswa."
        metrics={[
          { label: "Model", value: "4", note: "Eco-Food, Bumi, Mission, Portofolio" },
          { label: "Sintaks EcoGrow", value: "5", note: "Recognize sampai Exhibit" },
          { label: "Asesmen", value: "3", note: "as, for, dan of learning" },
        ]}
      />

      <section className="grid gap-5 md:grid-cols-3">
        {ecoGrowGuideSections.map((section) => (
          <EcoCard key={section.id}>
            <h2 className="font-heading text-2xl font-black text-leaf-700">{section.title}</h2>
            <p className="mt-3 leading-7 text-mutedText">{section.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {section.points.map((point) => <EcoBadge key={point} className="bg-leaf-100 text-leaf-700">{point}</EcoBadge>)}
            </div>
          </EcoCard>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <EcoCard tone="cream">
          <SectionTitle label="Sintaks EcoGrow Learning" title="Alur belajar runtut" />
          <div className="mt-5 space-y-3">
            {Object.entries(stageLabel).map(([stage, label]) => (
              <div key={stage} className="rounded-xl bg-white/80 p-4">
                <EcoGrowStageBadge stageId={stageIdToEcoGrowStage[stage as EcoGrowStage]} />
                <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">
                  {stage === "NITI_HARTI" ? "Mengenal dan mengamati." : stage === "NITI_SURTI" ? "Memahami dan memaknai." : stage === "NITI_BUKTI" ? "Membuktikan lewat aksi." : stage === "NITI_BAKTI" ? "Merefleksi dan mengamalkan." : "Menguasai dan memamerkan."}
                </p>
              </div>
            ))}
          </div>
        </EcoCard>
        <EcoCard>
          <SectionTitle label="Deep learning" title="Mindful, meaningful, joyful" />
          <div className="mt-5 space-y-3">
            {deepLearning.map((item) => <p key={item} className="rounded-xl bg-leaf-50 p-4 text-sm font-bold leading-6 text-slateText">{item}</p>)}
          </div>
          <SectionTitle label="Asesmen" title="as, for, of learning" />
          <div className="mt-5 space-y-3">
            {assessments.map((item) => <p key={item} className="rounded-xl border border-gardenBorder bg-white p-4 text-sm font-bold leading-6 text-slateText">{item}</p>)}
          </div>
        </EcoCard>
        <EcoCard>
          <SectionTitle label="Checklist guru" title="Kesiapan implementasi" />
          <div className="mt-5 space-y-3">
            {checklist.map((item, index) => (
              <label key={item} className="flex items-center gap-3 rounded-xl bg-leaf-50 p-4 font-bold text-slateText">
                <input type="checkbox" defaultChecked={index < 4} className="size-5 accent-leaf-500" />
                {item}
              </label>
            ))}
          </div>
        </EcoCard>
      </section>
    </div>
  );
}

function ModuleGeneratorMock({
  onGenerate,
}: {
  onGenerate: (draft: GeneratedModuleDraft) => void;
}) {
  const [form, setForm] = useState(moduleGeneratorDefaults);

  const updateField = (key: keyof typeof moduleGeneratorDefaults, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const generate = () => {
    onGenerate({
      ...generatedModuleSeed,
      id: `draft-${Date.now()}`,
      title: `Modul EcoGrow: ${form.topic}`,
      subject: form.subject,
      phase: form.phase,
      grade: form.grade,
      topic: form.topic,
      duration: form.duration,
      cp: form.cp,
      tp: form.tp.split(".").map((item) => item.trim()).filter(Boolean),
      meaningfulUnderstanding: `${form.ecologicalContext} Siswa memahami bahwa data proyek tanaman membantu mengambil keputusan perawatan.`,
    });
  };

  return (
    <EcoCard tone="cream">
      <SectionTitle label="Generator mock" title="Rancang modul ajar" description="Form controlled ini membentuk preview modul secara lokal." />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {([
          ["subject", "Mata pelajaran"],
          ["phase", "Fase"],
          ["grade", "Kelas"],
          ["topic", "Topik"],
          ["duration", "Alokasi waktu"],
          ["plantProject", "Proyek tanaman"],
        ] as const).map(([key, label]) => (
          <label key={key} className="block space-y-2 text-sm font-extrabold text-mutedText">
            {label}
            <input className={inputClass} value={String(form[key])} onChange={(event) => updateField(key, event.target.value)} />
          </label>
        ))}
      </div>
      <label className="mt-4 block space-y-2 text-sm font-extrabold text-mutedText">
        CP
        <textarea className={`${inputClass} min-h-24 py-3`} value={form.cp} onChange={(event) => updateField("cp", event.target.value)} />
      </label>
      <label className="mt-4 block space-y-2 text-sm font-extrabold text-mutedText">
        TP
        <textarea className={`${inputClass} min-h-24 py-3`} value={form.tp} onChange={(event) => updateField("tp", event.target.value)} />
      </label>
      <label className="mt-4 block space-y-2 text-sm font-extrabold text-mutedText">
        Konteks ekologis
        <textarea className={`${inputClass} min-h-24 py-3`} value={form.ecologicalContext} onChange={(event) => updateField("ecologicalContext", event.target.value)} />
      </label>
      <EcoButton className="mt-5" icon={<Sparkles className="size-4" />} onClick={generate}>
        Generate mock
      </EcoButton>
    </EcoCard>
  );
}

function ModulePreview({
  draft,
  onStatusChange,
}: {
  draft: GeneratedModuleDraft;
  onStatusChange: (status: GeneratedModuleDraft["status"]) => void;
}) {
  return (
    <EcoCard>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <EcoBadge className="bg-leaf-100 text-leaf-700">{draft.subject} Fase {draft.phase} Kelas {draft.grade}</EcoBadge>
          <h2 className="mt-4 font-heading text-3xl font-black text-leaf-700">{draft.title}</h2>
          <p className="mt-3 leading-7 text-mutedText">{draft.meaningfulUnderstanding}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <EcoButton variant="secondary" size="sm" icon={<Save className="size-4" />} onClick={() => onStatusChange("draft")}>Simpan draft</EcoButton>
          <EcoButton variant="secondary" size="sm" icon={<Eye className="size-4" />} onClick={() => onStatusChange("review")}>Preview siswa</EcoButton>
          <EcoButton variant="reward" size="sm" icon={<Send className="size-4" />} onClick={() => onStatusChange("published")}>Publikasikan</EcoButton>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {moduleValidationBadges.map((badge) => (
          <EcoBadge key={badge.id} className={badge.status === "complete" ? "bg-leaf-100 text-leaf-700" : "bg-sun/25 text-earth"}>
            {badge.label}
          </EcoBadge>
        ))}
        <EcoBadge className="bg-sky/15 text-sky">Status: {draft.status === "draft" ? "Draft" : draft.status === "review" ? "Siap ditinjau" : "Dipublikasikan"}</EcoBadge>
      </div>
      <section className="mt-6 grid gap-5 xl:grid-cols-2">
        <div>
          <h3 className="font-heading text-xl font-black text-leaf-700">CP/TP dan pertanyaan pemantik</h3>
          <p className="mt-3 rounded-xl bg-leaf-50 p-4 text-sm font-semibold leading-6 text-slateText">{draft.cp}</p>
          <div className="mt-3 space-y-2">
            {draft.tp.map((item) => <p key={item} className="rounded-xl border border-gardenBorder bg-white p-3 text-sm font-bold text-slateText">{item}</p>)}
          </div>
          <div className="mt-3 space-y-2">
            {draft.triggerQuestions.map((question) => <p key={question} className="rounded-xl bg-cream p-3 text-sm font-bold text-earth">{question}</p>)}
          </div>
        </div>
        <div>
          <h3 className="font-heading text-xl font-black text-leaf-700">Sintaks EcoGrow Learning</h3>
          <div className="mt-3 space-y-3">
            {draft.pancanitiPlan.map((step) => (
              <div key={step.stage} className="rounded-xl border border-gardenBorder bg-leaf-50 p-4">
                <EcoGrowStageBadge stageId={stageIdToEcoGrowStage[step.stage]} />
                <p className="mt-3 text-sm font-semibold leading-6 text-slateText">{step.teacherActivity}</p>
                <p className="mt-2 text-xs font-bold leading-5 text-mutedText">Bukti: {step.assessmentEvidence}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-6 rounded-xl border border-leaf-500/20 bg-leaf-50 p-4">
        <h3 className="font-heading text-xl font-black text-leaf-700">Preview otomatis alur pembelajaran</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {[
            ["Pertemuan 1", "Ecological Recognition & Exploration", "Peserta didik mengamati tanaman, mengenali komponen lingkungan, dan merumuskan pertanyaan tentang fotosintesis."],
            ["Pertemuan 2", "Ecological Execution", "Peserta didik melakukan praktik hidroponik atau perawatan tanaman sebagai pembuktian konsep."],
            ["Pertemuan 3", "Ecological Reflection", "Peserta didik menganalisis data pertumbuhan dan merefleksikan keberhasilan atau kendala proyek."],
            ["Pertemuan 4", "Ecological Mastery & Exhibition", "Peserta didik menyajikan hasil proyek melalui poster, laporan, atau galeri digital."],
          ].map(([meeting, title, note]) => (
            <div key={meeting} className="rounded-xl bg-white/80 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-mutedText">{meeting}</p>
              <p className="mt-1 font-heading text-lg font-black text-leaf-700">{title}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{note}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {Object.entries(draft.differentiation).map(([key, value]) => (
          <div key={key} className="rounded-xl bg-leaf-50 p-4">
            <p className="font-heading text-lg font-black capitalize text-leaf-700">{key}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{value}</p>
          </div>
        ))}
      </section>
    </EcoCard>
  );
}

export function TeacherModulePage() {
  const [drafts, setDrafts] = useMockStorage<GeneratedModuleDraft[]>("ecogrow-generated-modules", [generatedModuleSeed]);
  const activeDraft = drafts[0];

  const updateStatus = (status: GeneratedModuleDraft["status"]) => {
    setDrafts((current) => [{ ...current[0], status }, ...current.slice(1)]);
  };

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <SectionTitle label="Modul ajar" title="Generator rancangan EcoGrow" description="Guru menyusun CP/TP, konteks ekologis, Sintaks EcoGrow Learning, diferensiasi, dan asesmen dalam satu preview mock." />
      <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <ModuleGeneratorMock onGenerate={(draft) => setDrafts((current) => [draft, ...current])} />
        <ModulePreview draft={activeDraft} onStatusChange={updateStatus} />
      </section>
      <ModuleDocumentPreview />
    </div>
  );
}

function ProjectWizardMock() {
  const { projectList, addProject, projectMissions } = useMockProjects();
  const [form, setForm] = useState({
    title: "Observasi Bayam Sekolah",
    description: "Siswa mengamati bayam sekolah, mencatat pertumbuhan, dan menyiapkan karya Ecological Mastery & Exhibition (Niti Sajati).",
    plantType: "Bayam",
    method: "observation" as EcoProject["method"],
    startDate: "2026-05-09",
    endDate: "2026-06-06",
    classId: "kelas-4b",
  });
  const latestProject = projectList[0];
  const latestMissions = projectMissions[latestProject.id] ?? [];

  const submit = () => {
    addProject({
      id: `project-local-${Date.now()}`,
      moduleId: "modul-fotosintesis",
      progress: 8,
      status: "planned",
      currentStage: "NITI_HARTI",
      groupIds: ["Tim Tunas Hijau", "Tim Sahabat Tanah", "Tim Akar Kuat", "Tim Cahaya Pagi", "Tim Kompos Ceria"],
      riskLevel: "low",
      ...form,
    });
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <EcoCard tone="cream">
        <SectionTitle label="Project wizard mock" title="Buat proyek dan misi" />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Nama proyek
            <input className={inputClass} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          </label>
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Tanaman
            <input className={inputClass} value={form.plantType} onChange={(event) => setForm({ ...form, plantType: event.target.value })} />
          </label>
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Metode
            <select className={inputClass} value={form.method} onChange={(event) => setForm({ ...form, method: event.target.value as EcoProject["method"] })}>
              <option value="hydroponic">Hidroponik</option>
              <option value="soil">Tanah</option>
              <option value="compost">Kompos</option>
              <option value="observation">Observasi</option>
            </select>
          </label>
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Kelas
            <input className={inputClass} value={form.classId} onChange={(event) => setForm({ ...form, classId: event.target.value })} />
          </label>
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Mulai
            <input className={inputClass} type="date" value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} />
          </label>
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Selesai
            <input className={inputClass} type="date" value={form.endDate} onChange={(event) => setForm({ ...form, endDate: event.target.value })} />
          </label>
        </div>
        <label className="mt-4 block space-y-2 text-sm font-extrabold text-mutedText">
          Deskripsi
          <textarea className={`${inputClass} min-h-24 py-3`} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        </label>
        <EcoButton className="mt-5" icon={<Plus className="size-4" />} onClick={submit}>
          Tambah proyek
        </EcoButton>
      </EcoCard>
      <EcoCard>
        <SectionTitle label="Template wizard" title="Step proyek EcoMission" description="Identitas, tanaman/metode, kelompok, EcoMission berdasarkan Sintaks EcoGrow, asesmen dan rubrik." />
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {["Identitas", "Tanaman", "Kelompok", "Misi", "Rubrik"].map((step, index) => (
            <div key={step} className="rounded-xl bg-leaf-50 p-4">
              <p className="font-heading text-2xl font-black text-leaf-700">{index + 1}</p>
              <p className="mt-1 text-sm font-bold text-mutedText">{step}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {projectWizardTemplates.map((template) => (
            <div key={template.id} className="rounded-xl border border-gardenBorder bg-white p-4">
              <h3 className="font-heading text-xl font-black text-leaf-700">{template.title}</h3>
              <p className="mt-2 text-sm font-semibold text-mutedText">{template.recommendedDurationDays} hari, {template.plantOptions.join(", ")}</p>
            </div>
          ))}
        </div>
        {latestMissions.length ? (
          <div className="mt-5 rounded-xl border border-leaf-500/25 bg-leaf-50 p-4">
            <p className="font-heading text-lg font-black text-leaf-700">Misi auto-generate untuk {latestProject.title}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {latestMissions.map((mission) => <EcoGrowStageBadge key={mission.id} stageId={stageIdToEcoGrowStage[mission.stage]} />)}
            </div>
          </div>
        ) : null}
      </EcoCard>
    </section>
  );
}

export function TeacherProjectPage() {
  const { projectList } = useMockProjects();
  const linkedModule = ecogrowTeachingModules[0];

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <SectionTitle label="Proyek pembelajaran" title="Kelola proyek dan EcoMission siswa" description="Proyek baru dibuat dari input guru dan EcoMission berdasarkan Sintaks EcoGrow muncul sebagai dasar alur siswa." />
      <ProjectWizardMock />
      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <TeachingModuleSummaryCard module={linkedModule} compact />
        <EcoCard>
          <SectionTitle label="Modul terkait" title="LKPD dan asesmen aktif" description="Proyek kangkung terhubung ke perangkat Modul Ajar IPAS EcoGrow." />
          <div className="mt-5 flex flex-wrap gap-2">
            {ecogrowDigitalLkpd.map((section) => <EcoBadge key={section.id}>{section.title}</EcoBadge>)}
          </div>
          <p className="mt-4 rounded-xl bg-leaf-50 p-4 text-sm font-bold text-slateText">{linkedModule.objectives.slice(0, 2).join(" ")}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <EcoButton href="/guru/modul-ajar" size="sm">Lihat Modul</EcoButton>
            <EcoButton href="/guru/modul-ajar" size="sm" variant="secondary">Lihat LKPD</EcoButton>
            <EcoButton href="/guru/asesmen" size="sm" variant="secondary">Lihat Paket Asesmen</EcoButton>
          </div>
        </EcoCard>
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projectList.map((project) => (
          <EcoCard key={project.id} tone={project.status === "planned" ? "cream" : "white"}>
            <div className="flex items-center justify-between gap-3">
              <EcoBadge className={project.status === "active" ? "bg-leaf-100 text-leaf-700" : "bg-sun/25 text-earth"}>{project.status}</EcoBadge>
              <EcoBadge className="bg-sky/15 text-sky">{project.plantType}</EcoBadge>
            </div>
            <h2 className="mt-4 font-heading text-2xl font-black text-leaf-700">{project.title}</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-mutedText">{project.description}</p>
            <EcoProgress value={project.progress} label="Progress proyek" color="orange" className="mt-5" />
            <div className="mt-5 flex flex-wrap gap-2">
              <EcoButton href="/guru/monitoring" variant="secondary" size="sm">Buka monitoring</EcoButton>
              <EcoButton href="/guru/analitik" variant="secondary" size="sm">Lihat analitik</EcoButton>
              <EcoButton href="/guru/asesmen" variant="reward" size="sm">Aktifkan Reflection</EcoButton>
            </div>
          </EcoCard>
        ))}
      </section>
    </div>
  );
}

function JournalMonitoringTable({
  entries,
  feedbacks,
  onSelect,
  selectedId,
}: {
  entries: JournalEntry[];
  feedbacks: TeacherFeedback[];
  selectedId?: string;
  onSelect: (entry: JournalEntry) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left text-xs sm:text-sm">
        <thead className="text-mutedText">
          <tr>
            <th className="px-2 py-2">Tanggal</th>
            <th className="px-2 py-2">Siswa</th>
            <th className="px-2 py-2">Kelompok</th>
            <th className="px-2 py-2">Tinggi</th>
            <th className="px-2 py-2">Daun</th>
            <th className="px-2 py-2">Kondisi</th>
            <th className="px-2 py-2">Air</th>
            <th className="px-2 py-2">Feedback</th>
            <th className="px-2 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((journal) => {
            const feedback = feedbacks.find((item) => item.journalId === journal.id);
            return (
              <tr key={journal.id} className={`eco-table-row text-slateText ${selectedId === journal.id ? "outline outline-2 outline-leaf-500/30" : ""}`}>
                <td className="rounded-l-xl px-2 py-3 font-bold">{journal.date}</td>
                <td className="px-2 py-3">{getStudentName(journal.studentId)}</td>
                <td className="px-2 py-3">{getStudentGroup(journal.studentId)}</td>
                <td className="px-2 py-3">{journal.plantHeightCm} cm</td>
                <td className="px-2 py-3">{journal.leafCount}</td>
                <td className="px-2 py-3">{conditionLabel[journal.condition]}</td>
                <td className="px-2 py-3">{journal.waterMl} ml</td>
                <td className="px-2 py-3">
                  {feedback ? <StatusBadge status={feedback.reviewStatus} /> : <StatusBadge status="pending" label="Belum diberi" />}
                </td>
                <td className="rounded-r-xl px-2 py-3">
                  <button className="inline-flex min-w-16 items-center justify-center gap-2 rounded-lg bg-white px-2.5 py-2 font-bold text-leaf-700" onClick={() => onSelect(journal)}>
                    Detail
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function JournalDetailPanel({ journal, feedbacks }: { journal: JournalEntry; feedbacks: TeacherFeedback[] }) {
  const feedback = feedbacks.find((item) => item.journalId === journal.id);
  const recommendation = journal.condition === "perlu_perawatan" || journal.condition === "layu"
    ? "Rekomendasi: minta siswa mengecek volume air pagi dan siang, lalu bandingkan perubahan daun."
    : "Rekomendasi: apresiasi konsistensi data dan dorong siswa membuat kesimpulan hubungan air-cahaya.";

  return (
    <EcoCard tone="cream">
      <SectionTitle label="Detail jurnal" title={`${getStudentName(journal.studentId)} - ${conditionLabel[journal.condition]}`} />
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl bg-white/80 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-mutedText">Tahap saat ini</p>
          <div className="mt-2">
            <EcoGrowStageBadge stageId="execution" />
          </div>
          <EcoProgress value={68} label="Progress tahap" color="orange" className="mt-3" />
        </div>
        <div className="rounded-xl bg-white/80 p-4 text-sm font-bold leading-6 text-slateText">
          <p>Misi aktif: Perawatan dan catat perubahan.</p>
          <p>Bukti terbaru: Foto jurnal tanaman.</p>
          <p>Status refleksi: Menunggu Ecological Reflection (Niti Bakti).</p>
          <p>Catatan guru: Gunakan data air untuk keputusan perawatan.</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-white/78 p-4 font-bold text-slateText">{journal.plantHeightCm} cm</div>
        <div className="rounded-xl bg-white/78 p-4 font-bold text-slateText">{journal.leafCount} daun</div>
        <div className="rounded-xl bg-white/78 p-4 font-bold text-slateText">{journal.waterMl} ml air</div>
      </div>
      <div className="mt-4 rounded-xl bg-white/80 p-4">
        <p className="text-sm font-extrabold text-mutedText">Catatan siswa</p>
        <p className="mt-2 leading-7 text-slateText">{journal.note}</p>
      </div>
      <div className="mt-4 grid aspect-[16/9] place-items-center overflow-hidden rounded-xl border border-dashed border-leaf-500/30 bg-leaf-50 text-center text-sm font-bold text-mutedText">
        {journal.photoUrl ? (
          <img src={journal.photoUrl} alt={`Foto jurnal ${journal.id}`} className="h-full w-full object-cover" />
        ) : (
          "Belum ada foto tanaman"
        )}
      </div>
      <p className="mt-4 rounded-xl bg-sun/25 p-4 text-sm font-bold leading-6 text-earth">{recommendation}</p>
      {feedback ? (
        <div className="mt-4 rounded-xl border border-leaf-500/25 bg-white p-4">
          <EcoBadge className="bg-leaf-100 text-leaf-700">{feedback.type}</EcoBadge>
          <p className="mt-3 text-sm font-semibold leading-6 text-slateText">{feedback.message}</p>
          <p className="mt-2 text-xs font-bold text-mutedText">{reviewLabel[feedback.reviewStatus]}</p>
        </div>
      ) : null}
    </EcoCard>
  );
}

function FeedbackComposer({ journal }: { journal: JournalEntry }) {
  const { addFeedback } = useTeacherFeedback();
  const [type, setType] = useState<FeedbackType>("apresiasi");
  const [message, setMessage] = useState("Wah, catatanmu rapi. Lanjutkan pengamatan air besok.");
  const [saved, setSaved] = useState(false);

  const save = () => {
    addFeedback({
      journalId: journal.id,
      teacherId: "guru-1",
      studentId: journal.studentId,
      type,
      message,
      reviewStatus: journal.condition === "perlu_perawatan" ? "needs_revision" : "approved",
    });
    setSaved(true);
  };

  return (
    <EcoCard>
      <SectionTitle label="Feedback composer" title="Beri umpan balik bermakna" />
      <label className="mt-5 block space-y-2 text-sm font-extrabold text-mutedText">
        Kategori
        <select className={inputClass} value={type} onChange={(event) => setType(event.target.value as FeedbackType)}>
          <option value="apresiasi">Apresiasi</option>
          <option value="perbaikan">Perbaikan</option>
          <option value="pertanyaan">Pertanyaan pemantik</option>
          <option value="remedial">Remedial</option>
        </select>
      </label>
      <label className="mt-4 block space-y-2 text-sm font-extrabold text-mutedText">
        Pesan feedback
        <textarea className={`${inputClass} min-h-28 py-3`} value={message} onChange={(event) => setMessage(event.target.value)} />
      </label>
      <EcoButton className="mt-4" icon={<Send className="size-4" />} onClick={save}>
        Simpan feedback
      </EcoButton>
      {saved ? <p className="mt-4 rounded-xl bg-leaf-100 p-4 text-sm font-bold text-leaf-700">Feedback tersimpan ke localStorage.</p> : null}
    </EcoCard>
  );
}

export function TeacherMonitoringPage() {
  const monitoring = getTeacherMonitoringMock();
  const { feedbacks, addFeedback } = useTeacherFeedback();
  const [groupFilter, setGroupFilter] = useState("Semua");
  const [conditionFilter, setConditionFilter] = useState("Semua");
  const [feedbackFilter, setFeedbackFilter] = useState("Semua");
  const [stageFilter, setStageFilter] = useState("Semua");
  const [dateFilter, setDateFilter] = useState("");
  const [selected, setSelected] = useState(monitoring.journals[0]);

  const filtered = monitoring.journals.filter((journal) => {
    const profile = studentProfiles.find((item) => item.userId === journal.studentId);
    const feedback = feedbacks.find((item) => item.journalId === journal.id);
    const matchGroup = groupFilter === "Semua" || profile?.groupName === groupFilter;
    const matchCondition = conditionFilter === "Semua" || journal.condition === conditionFilter;
    const matchDate = !dateFilter || journal.date === dateFilter;
    const matchFeedback =
      feedbackFilter === "Semua" ||
      (feedbackFilter === "belum" && !feedback) ||
      (feedbackFilter === "sudah" && feedback) ||
      (feedbackFilter === "revisi" && feedback?.reviewStatus === "needs_revision");
    const matchStage = stageFilter === "Semua" || stageFilter === "Semua tahap" || stageFilter === "NITI_BUKTI";
    return matchGroup && matchCondition && matchDate && matchFeedback && matchStage;
  });

  const batchFeedback = () => {
    monitoring.journals
      .filter((journal) => journal.condition === "perlu_perawatan")
      .forEach((journal) => {
        addFeedback({
          journalId: journal.id,
          teacherId: "guru-1",
          studentId: journal.studentId,
          type: "perbaikan",
          message: "Cek ulang volume air dan catat perubahan daun besok pagi.",
          reviewStatus: "needs_revision",
        });
      });
  };

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <SectionTitle label="Monitoring jurnal" title="Validasi, filter, dan feedback jurnal siswa" description="Filter berdasarkan Tahap EcoGrow membantu guru melihat posisi Recognition, Exploration, Execution, Reflection, dan Exhibition." />
      <section className="grid gap-4 md:grid-cols-3">
        <EcoCard className="p-4">
          <p className="text-xs font-black uppercase tracking-wide text-mutedText">Jurnal masuk</p>
          <p className="mt-2 font-heading text-3xl font-black text-leaf-700">{monitoring.journals.length}</p>
        </EcoCard>
        <EcoCard className="p-4">
          <p className="text-xs font-black uppercase tracking-wide text-mutedText">Feedback tersimpan</p>
          <p className="mt-2 font-heading text-3xl font-black text-leaf-700">{feedbacks.length}</p>
        </EcoCard>
        <EcoCard className="p-4">
          <p className="text-xs font-black uppercase tracking-wide text-mutedText">Galeri pending</p>
          <p className="mt-2 font-heading text-3xl font-black text-leaf-700">{monitoring.galleryPending.length}</p>
        </EcoCard>
      </section>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {ecogrowDigitalLkpd.map((section, index) => (
          <EcoCard key={section.id} className="p-4">
            <p className="text-xs font-black uppercase tracking-wide text-mutedText">{section.title}</p>
            <p className="mt-3 font-heading text-3xl font-black text-leaf-700">{[25, 22, 18, 12, 6][index]}/25</p>
            <EcoProgress value={[100, 88, 72, 48, 24][index]} className="mt-3" color={index > 2 ? "orange" : "green"} />
          </EcoCard>
        ))}
      </section>
      <EcoCard>
        <SectionTitle label="Progres asesmen" title="Status siswa per perangkat pembelajaran" />
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs font-black uppercase text-mutedText">
              <tr><th className="p-3">Siswa</th><th className="p-3">EcoReadiness</th><th className="p-3">LKPD</th><th className="p-3">Jurnal</th><th className="p-3">Refleksi</th><th className="p-3">EcoMaster</th><th className="p-3">Rekomendasi</th></tr>
            </thead>
            <tbody>
              {studentProfiles.slice(0, 4).map((profile, index) => (
                <tr key={profile.id} className="border-t border-gardenBorder">
                  <td className="p-3 font-bold text-leaf-700">{getStudentName(profile.userId)}</td>
                  <td className="p-3">{[88, 76, 62, 91][index]}</td>
                  <td className="p-3">{[5, 4, 2, 5][index]}/5</td>
                  <td className="p-3">{[8, 6, 3, 9][index]}</td>
                  <td className="p-3">{index === 2 ? "Belum" : "Terkirim"}</td>
                  <td className="p-3">{[86, 78, 58, 92][index]}</td>
                  <td className="p-3">{index === 2 ? "Remedial" : index === 3 ? "Pengayaan" : "Lanjut misi"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </EcoCard>
      <EcoCard>
        <div className="grid gap-3 md:grid-cols-5">
          <select className={inputClass} value={groupFilter} onChange={(event) => setGroupFilter(event.target.value)}>
            <option>Semua</option>
            {Array.from(new Set(studentProfiles.map((profile) => profile.groupName))).map((group) => <option key={group}>{group}</option>)}
          </select>
          <select className={inputClass} value={conditionFilter} onChange={(event) => setConditionFilter(event.target.value)}>
            <option>Semua</option>
            <option value="sehat">Sehat</option>
            <option value="layu">Layu</option>
            <option value="kuning">Kuning</option>
            <option value="perlu_perawatan">Perlu perawatan</option>
          </select>
          <input className={inputClass} type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} />
          <select className={inputClass} value={feedbackFilter} onChange={(event) => setFeedbackFilter(event.target.value)}>
            <option>Semua</option>
            <option value="belum">Belum diberi</option>
            <option value="sudah">Sudah diberi</option>
            <option value="revisi">Perlu revisi</option>
          </select>
          <select className={inputClass} value={stageFilter} onChange={(event) => setStageFilter(event.target.value)}>
            <option value="Semua">Semua tahap</option>
            {Object.entries(stageLabel).map(([stage, label]) => <option key={stage} value={stage}>{label}</option>)}
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <EcoButton variant="secondary" icon={<Filter className="size-4" />}>Hasil filter: {filtered.length}</EcoButton>
          <EcoButton variant="reward" icon={<MessageSquareText className="size-4" />} onClick={batchFeedback}>Batch feedback perlu perawatan</EcoButton>
        </div>
      </EcoCard>
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <EcoCard>
          {filtered.length ? (
            <JournalMonitoringTable entries={filtered} feedbacks={feedbacks} selectedId={selected.id} onSelect={setSelected} />
          ) : (
            <div className="rounded-xl bg-leaf-50 p-6 text-center">
              <p className="font-heading text-2xl font-black text-leaf-700">Tidak ada jurnal sesuai filter</p>
              <p className="mt-2 text-sm font-semibold text-mutedText">Ubah kelompok, kondisi, tanggal, atau status review untuk melihat data lain.</p>
            </div>
          )}
        </EcoCard>
        <div className="space-y-6">
          <JournalDetailPanel journal={selected} feedbacks={feedbacks} />
          <FeedbackComposer journal={selected} />
        </div>
      </section>
    </div>
  );
}

function RemedialEnrichmentPanel() {
  return (
    <EcoCard>
      <SectionTitle label="Tindak lanjut" title="Remedial dan pengayaan" />
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {studentLearningRisks.map((item) => (
          <div key={item.studentId} className="rounded-xl border border-gardenBorder bg-leaf-50 p-4">
            <EcoBadge className={item.riskType === "siap_pengayaan" ? "bg-leaf-100 text-leaf-700" : item.riskType === "perlu_remedial" ? "bg-red-50 text-red-700" : "bg-sun/25 text-earth"}>
              {item.riskType.replaceAll("_", " ")}
            </EcoBadge>
            <h3 className="mt-3 font-heading text-xl font-black text-leaf-700">{item.name}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{item.reason}</p>
            <p className="mt-3 rounded-lg bg-white p-3 text-xs font-bold leading-5 text-slateText">{item.suggestedAction}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <EcoButton variant="reward">Buat remedial</EcoButton>
        <EcoButton variant="secondary">Berikan pengayaan</EcoButton>
        <EcoButton variant="secondary">Kirim feedback</EcoButton>
      </div>
    </EcoCard>
  );
}

export function TeacherAnalyticsPage() {
  const analytics = getTeacherAnalyticsMock();
  const allAssessmentQuestions = [...ecoReadinessQuestions, ...ecoMissionFormativeQuestions, ...ecoMasterSummativeQuestions];

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <SectionTitle label="Analitik guru" title="Keputusan kelas, kelompok, KAIH, remedial, dan pengayaan" />
      <section className="grid gap-4 md:grid-cols-2">
        {analytics.insights.map((insight) => (
          <EcoCard key={insight.id} tone={insight.severity === "warning" ? "cream" : "white"} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <StatusBadge status={insight.severity === "warning" ? "needs_revision" : "active"} label={insight.severity === "warning" ? "Perlu aksi" : "Insight"} />
                <h2 className="mt-3 font-heading text-2xl font-black text-leaf-700">{insight.title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{insight.description}</p>
              </div>
              <EcoButton href={insight.actionHref} size="sm" variant="secondary" icon={<ArrowRight className="size-4" />}>
                Buka
              </EcoButton>
            </div>
          </EcoCard>
        ))}
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <TeacherMetricCard label="Progress misi" value={`${analyticsSummary.classAverageProgress}%`} note="Rata-rata kelas." icon={LineChart} />
        <TeacherMetricCard label="Quiz" value={String(analyticsSummary.averageQuizScore)} note="Rata-rata diagnostik." icon={ClipboardCheck} />
        <TeacherMetricCard label="Jurnal" value={String(analyticsSummary.totalJournals)} note="Total bukti Ecological Execution." icon={BookOpen} />
        <TeacherMetricCard label="Refleksi" value={String(analyticsSummary.totalReflections)} note="Cerita Belajarku." icon={Leaf} />
        <TeacherMetricCard label="Pengayaan" value="6" note="Siap tantangan Exhibition." icon={Award} />
      </section>
      <section className="grid gap-5 xl:grid-cols-2">
        <EcoCard>
          <SectionTitle label="Grafik pertumbuhan tanaman" title="Rata-rata tinggi kangkung kelas" description="Interpretasi: pertumbuhan stabil setelah jurnal air dan cahaya dicatat lebih konsisten." />
          <div className="mt-5 space-y-3">
            {teacherAnalyticsMock.plantGrowth.map((item) => (
              <div key={item.day} className="grid grid-cols-[4.5rem_1fr_3rem] items-center gap-3 text-sm font-bold text-slateText">
                <span>{item.day}</span>
                <span className="h-3 overflow-hidden rounded-full bg-leaf-50">
                  <span className="block h-full rounded-full bg-leaf-500" style={{ width: `${Math.min(100, item.averageHeight * 3)}%` }} />
                </span>
                <span className="text-right text-leaf-700">{item.averageHeight} cm</span>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl bg-leaf-50 p-3 text-sm font-bold leading-6 text-leaf-700">
            Rekomendasi: minta kelompok membandingkan tinggi tanaman dengan volume air pada jurnal minggu ini.
          </p>
        </EcoCard>
        <EcoCard>
          <SectionTitle label="Distribusi badge" title="Motivasi dan capaian siswa" description="Interpretasi: badge perawatan tanaman paling banyak, sementara Eco Exhibitor perlu dipacu lewat galeri karya." />
          <div className="mt-5 space-y-3">
            {teacherAnalyticsMock.badgeDistribution.map((item) => (
              <div key={item.badge} className="grid grid-cols-[1fr_3rem] items-center gap-3">
                <div>
                  <div className="flex justify-between gap-3 text-sm font-bold text-slateText">
                    <span>{item.badge}</span>
                    <span className="text-leaf-700">{item.count}</span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-leaf-50">
                    <div className="h-full rounded-full bg-sun" style={{ width: `${Math.min(100, item.count * 7)}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl bg-cream p-3 text-sm font-bold leading-6 text-earth">
            Rekomendasi: aktifkan pameran karya untuk menaikkan badge Eco Exhibitor.
          </p>
        </EcoCard>
        <EcoCard>
          <SectionTitle label="Risiko belajar siswa" title="Aman, perlu perhatian, perlu pendampingan" description="Interpretasi: enam siswa perlu perhatian dan tiga siswa butuh pendampingan dekat." />
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {teacherAnalyticsMock.riskDistribution.map((item) => (
              <div key={item.status} className="rounded-xl bg-leaf-50 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-mutedText">{item.status}</p>
                <p className="mt-2 font-heading text-4xl font-black text-leaf-700">{item.count}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl bg-sun/25 p-3 text-sm font-bold leading-6 text-earth">
            Rekomendasi: gunakan template feedback cepat untuk siswa yang belum lengkap jurnalnya.
          </p>
        </EcoCard>
        <EcoCard>
          <SectionTitle label="Progress tahap EcoGrow" title="Kenali sampai Pamerkan" description="Interpretasi: tahap Pamerkan masih rendah dan perlu dorongan Eco-Exhibition." />
          <div className="mt-5 space-y-3">
            {teacherAnalyticsMock.stageProgress.map((item) => (
              <div key={item.stage} className="grid grid-cols-[5rem_1fr_2.5rem] items-center gap-3 text-sm font-bold text-slateText">
                <span>{item.stage}</span>
                <span className="h-3 overflow-hidden rounded-full bg-leaf-50">
                  <span className="block h-full rounded-full bg-sky" style={{ width: `${Math.min(100, item.count * 4)}%` }} />
                </span>
                <span className="text-right text-leaf-700">{item.count}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl bg-leaf-50 p-3 text-sm font-bold leading-6 text-leaf-700">
            Rekomendasi: pilih tiga karya galeri untuk dipersiapkan sebagai pameran kelas.
          </p>
        </EcoCard>
      </section>
      <EcoCard>
        <SectionTitle label="Distribusi progres per tahap EcoGrow" title="Skor, tren, stagnasi, dan kebutuhan pendampingan" description="Mock analitik menunjukkan rata-rata skor per tahap, penyelesaian EcoMission, siswa stagnan, serta tahap dengan kebutuhan pendampingan tertinggi." />
        <div className="mt-5">
          <EcoGrowStageAnalytics data={teacherStageAnalytics} />
        </div>
      </EcoCard>
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <EcoCard>
          <SectionTitle label="Perbandingan kelompok" title="Progress, tinggi tanaman, konsistensi jurnal" />
          <div className="mt-5 space-y-4">
            {groupProgress.map((group) => (
              <div key={group.group} className="rounded-xl border border-gardenBorder bg-leaf-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-xl font-black text-leaf-700">{group.group}</h3>
                  <EcoBadge className="bg-white text-leaf-700">{group.journals} jurnal</EcoBadge>
                </div>
                <EcoProgress value={group.progress} label="Progress misi" className="mt-4" />
                <p className="mt-2 text-sm font-semibold text-mutedText">{group.feedback}</p>
              </div>
            ))}
          </div>
        </EcoCard>
        <KaihClassSummary />
      </section>
      <EcoCard>
        <SectionTitle label="Analitik asesmen" title="Level kognitif dan soal tersulit" />
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {["C2", "C3", "C4", "C5"].map((level, index) => (
            <div key={level} className="rounded-xl bg-leaf-50 p-4">
              <p className="font-heading text-3xl font-black text-leaf-700">{[84, 81, 62, 69][index]}</p>
              <p className="mt-1 text-sm font-bold text-mutedText">Skor {level}</p>
              <EcoProgress value={[84, 81, 62, 69][index]} className="mt-3" color={index === 2 ? "orange" : "green"} />
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl bg-sun/25 p-4 text-sm font-bold leading-6 text-earth">
          Soal tersulit: membandingkan cahaya, air, dan catatan perawatan sebelum menarik kesimpulan.
        </p>
      </EcoCard>
      <section className="grid gap-6 lg:grid-cols-3">
        <EcoCard>
          <SectionTitle label="Distribusi soal" title="Bloom HOTS" />
          <p className="mt-5 font-heading text-5xl font-black text-leaf-700">{countHotsQuestions(allAssessmentQuestions)}</p>
          <p className="mt-2 text-sm font-bold text-mutedText">Soal C4-C6 pada paket aktif</p>
          <EcoProgress value={Math.round((countHotsQuestions(allAssessmentQuestions) / allAssessmentQuestions.length) * 100)} className="mt-4" />
        </EcoCard>
        <EcoCard>
          <SectionTitle label="Distribusi soal" title="SOLO mendalam" />
          <p className="mt-5 font-heading text-5xl font-black text-leaf-700">{countSoloDeepQuestions(allAssessmentQuestions)}</p>
          <p className="mt-2 text-sm font-bold text-mutedText">Relational dan Extended Abstract</p>
          <EcoProgress value={Math.round((countSoloDeepQuestions(allAssessmentQuestions) / allAssessmentQuestions.length) * 100)} className="mt-4" />
        </EcoCard>
        <EcoCard tone="cream">
          <SectionTitle label="Ketuntasan" title="Diagnostik ke sumatif" />
          {[["EcoReadiness", 84], ["EcoMission", 72], ["EcoMaster", 68]].map(([label, value]) => (
            <EcoProgress key={label as string} value={value as number} label={label as string} className="mt-4" color={(value as number) < 70 ? "orange" : "green"} />
          ))}
        </EcoCard>
      </section>
      <RemedialEnrichmentPanel />
    </div>
  );
}

function GalleryModerationBoard() {
  const [posts, setPosts] = useMockStorage<GalleryPost[]>("ecogrow-gallery-moderation", galleryPosts);
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [stageFilter, setStageFilter] = useState("Semua");
  const filtered = posts.filter((post) => {
    const matchStatus = statusFilter === "Semua" || post.moderationStatus === statusFilter;
    const matchCategory = categoryFilter === "Semua" || post.category === categoryFilter;
    const matchStage = stageFilter === "Semua" || post.stage === stageFilter;
    return matchStatus && matchCategory && matchStage;
  });

  const updatePost = (postId: string, nextStatus: GalleryPost["moderationStatus"], feature = false) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === postId
          ? { ...post, moderationStatus: nextStatus, isFeatured: feature || post.isFeatured, teacherComment: nextStatus === "revision" ? "Lengkapi deskripsi data proyek sebelum dipamerkan." : post.teacherComment }
          : post,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <EcoCard>
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Status
            <select className={inputClass} value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option>Semua</option>
              <option value="pending">Menunggu validasi</option>
              <option value="approved">Siap Eco-Exhibition</option>
              <option value="revision">Perlu revisi</option>
            </select>
          </label>
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Kategori
            <select className={inputClass} value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option>Semua</option>
              {Object.entries(categoryLabel).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </label>
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Tahap EcoGrow
            <select className={inputClass} value={stageFilter} onChange={(event) => setStageFilter(event.target.value)}>
              <option>Semua</option>
              {Object.entries(stageLabel).map(([stage, label]) => <option key={stage} value={stage}>{label}</option>)}
            </select>
          </label>
          <EcoButton variant="secondary" icon={<Camera className="size-4" />}>Eco-Exhibition: {filtered.length}</EcoButton>
        </div>
      </EcoCard>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post) => (
          <EcoCard key={post.id}>
            <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-leaf-50">
              <Image src={post.imageUrl} alt="" width={520} height={390} className="h-full w-full object-contain p-5" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <EcoBadge className="bg-leaf-100 text-leaf-700">
                {post.moderationStatus === "approved"
                  ? "Siap Eco-Exhibition"
                  : post.moderationStatus === "revision"
                    ? "Perlu revisi"
                    : "Menunggu validasi"}
              </EcoBadge>
              <EcoBadge className="bg-sun/25 text-earth">{categoryLabel[post.category ?? "foto_tanaman"]}</EcoBadge>
              {post.stage ? <EcoGrowStageBadge stageId={stageIdToEcoGrowStage[post.stage]} /> : null}
              {post.isFeatured ? <EcoBadge className="bg-sky/15 text-sky">Karya pilihan</EcoBadge> : null}
            </div>
            <h2 className="mt-4 font-heading text-2xl font-black text-leaf-700">{post.title}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{post.description}</p>
            <p className="mt-2 text-sm font-bold text-slateText">{getStudentName(post.studentId)} - {getStudentGroup(post.studentId)}</p>
            {post.teacherComment ? <p className="mt-3 rounded-xl bg-cream p-3 text-xs font-bold leading-5 text-earth">{post.teacherComment}</p> : null}
            <div className="mt-4 flex flex-wrap gap-2">
              {galleryModerationActions.map((action) => (
                <EcoButton
                  key={action.id}
                  size="sm"
                  variant={action.id === "revision" ? "secondary" : "reward"}
                  onClick={() => updatePost(post.id, action.nextStatus, action.id === "feature")}
                >
                  {action.label}
                </EcoButton>
              ))}
            </div>
          </EcoCard>
        ))}
      </section>
    </div>
  );
}

export function TeacherGalleryPage() {
  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <TeacherHero
        title="Moderasi EcoGrow Exhibition Gallery"
        description="Guru memilih karya siswa dari tahap Execution, Reflection, hingga Ecological Mastery & Exhibition (Niti Sajati), meminta revisi, memberi komentar, dan menandai karya pilihan."
        metrics={[
          { label: "Karya masuk", value: "12", note: "Foto, poster, panen, refleksi" },
          { label: "Pending", value: "3", note: "Menunggu moderasi" },
          { label: "Pilihan", value: "2", note: "Siap dipamerkan" },
        ]}
      />
      <GalleryModerationBoard />
      <div>
        <SectionTitle label="Rubrik karya" title="Evidence Ecological Mastery & Exhibition" description="Karya galeri ditinjau melalui konsep, data jurnal, aksi ekologis, dan komunikasi." />
        <div className="mt-5"><RubricTable rubrics={ecoExhibitionRubric} /></div>
      </div>
    </div>
  );
}

function AssessmentMatrix({ results }: { results: AssessmentResult[] }) {
  const quiz = quizzes[0];

  return (
    <EcoCard>
      <SectionTitle label="Question bank" title="Soal, level kognitif, kunci, dan penjelasan" />
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[820px] border-separate border-spacing-y-2 text-left text-sm">
          <thead className="text-mutedText">
            <tr>
              <th className="px-3 py-2">Level</th>
              <th className="px-3 py-2">Soal</th>
              <th className="px-3 py-2">Kunci</th>
              <th className="px-3 py-2">Jenis</th>
            </tr>
          </thead>
          <tbody>
            {quiz.questions.slice(0, 8).map((question) => (
              <tr key={question.id} className="eco-table-row text-slateText">
                <td className="rounded-l-xl px-3 py-3 font-bold">{question.cognitiveLevel}</td>
                <td className="px-3 py-3">{question.question}</td>
                <td className="px-3 py-3">{question.answer}</td>
                <td className="rounded-r-xl px-3 py-3">Diagnostik/Formative</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SectionTitle label="Hasil siswa" title="Skor dan rekomendasi" />
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {results.map((result) => (
          <div key={result.id} className="rounded-xl border border-gardenBorder bg-leaf-50 p-4">
            <h3 className="font-heading text-xl font-black text-leaf-700">{getStudentName(result.studentId)}</h3>
            <p className="mt-2 font-heading text-3xl font-black text-earth">{result.score}</p>
            <p className="mt-1 text-sm font-bold text-mutedText">Lemah: {result.weakestLevel}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-slateText">{result.recommendation}</p>
          </div>
        ))}
      </div>
    </EcoCard>
  );
}

function RubricBuilderMock() {
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <EcoCard tone="cream">
        <SectionTitle label="Rubrik performance" title="Eco-Exhibition dan bukti karya" />
        <div className="mt-5 grid gap-4">
          {performanceRubrics.map((rubric) => (
            <RubricScoreCard key={rubric.id} rubric={rubric} />
          ))}
        </div>
      </EcoCard>
      <EcoCard>
        <SectionTitle label="Rubrik KAIH" title="Ekologis, Mandiri, Adaptif, Inovatif, Humanis" />
        <div className="mt-5 space-y-4">
          {kaihRubrics.map((rubric) => (
            <div key={rubric.id} className="rounded-xl border border-gardenBorder bg-leaf-50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-black text-leaf-700">{rubric.aspect}</h3>
                <EcoBadge className="bg-white text-leaf-700">Skor {rubric.maxScore}</EcoBadge>
              </div>
              <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{rubric.criteria.join(", ")}</p>
            </div>
          ))}
        </div>
      </EcoCard>
    </section>
  );
}

export function TeacherAssessmentPage() {
  const { results, addResult } = useMockAssessments();
  const assessment = getTeacherAssessmentMock();
  const [activeTab, setActiveTab] = useState<(typeof assessmentTabs)[number]["id"]>("diagnostic");
  const activeDescription = assessmentTabs.find((tab) => tab.id === activeTab)?.description;

  const generateRemedial = () => {
    addResult({
      id: `result-local-${Date.now()}`,
      studentId: "siswa-11",
      quizId: "quiz-diagnostic",
      score: 58,
      weakestLevel: "C4",
      recommendation: "Remedial mock: gunakan kartu hubungan air, cahaya, dan daun.",
    });
  };

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <SectionTitle label="Asesmen" title="Assessment as, for, dan of learning" description="Guru mengelola diagnostik, formatif, sumatif, refleksi, performance, hasil siswa, rubrik, remedial, dan pengayaan." />
      <AssessmentPackagePanel />
      <EcoCard>
        <div className="flex flex-wrap gap-2">
          {assessmentTabs.map((tab) => (
            <button
              key={tab.id}
              className={`rounded-xl px-4 py-3 text-sm font-extrabold transition ${activeTab === tab.id ? "bg-leaf-700 text-white shadow-soft" : "border border-gardenBorder bg-white text-slateText hover:bg-leaf-50"}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p className="mt-4 rounded-xl bg-leaf-50 p-4 font-bold leading-6 text-slateText">{activeDescription}</p>
        <EcoButton className="mt-4" variant="reward" icon={<Sparkles className="size-4" />} onClick={generateRemedial}>
          Generate daftar remedial mock
        </EcoButton>
      </EcoCard>
      <EcoCard>
        <SectionTitle label="Matriks penilaian" title="Kognitif, afektif, psikomotor, dan KAIH" />
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left text-sm">
            <thead className="text-mutedText">
              <tr>
                <th className="px-3 py-2">Siswa</th>
                <th className="px-3 py-2">Kognitif</th>
                <th className="px-3 py-2">Afektif</th>
                <th className="px-3 py-2">Psikomotor</th>
                <th className="px-3 py-2">KAIH</th>
                <th className="px-3 py-2">Rekomendasi</th>
              </tr>
            </thead>
            <tbody>
              {assessment.matrix.map((item) => (
                <tr key={item.studentId} className="eco-table-row text-slateText">
                  <td className="rounded-l-xl px-3 py-3 font-bold">{getStudentName(item.studentId)}</td>
                  <td className="px-3 py-3">{item.cognitive}</td>
                  <td className="px-3 py-3">{item.affective}</td>
                  <td className="px-3 py-3">{item.psychomotor}</td>
                  <td className="px-3 py-3">{item.kaihAverage}</td>
                  <td className="rounded-r-xl px-3 py-3">
                    <StatusBadge status={item.recommendation === "Remedial" ? "needs_revision" : item.recommendation === "Pengayaan" ? "reviewed" : "active"} label={item.recommendation} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </EcoCard>
      <EcoCard>
        <SectionTitle label="Rubric matrix tahap EcoGrow" title="Asesmen terhubung ke lima tahap" description="Setiap tahap memetakan kognitif, afektif, psikomotor, dan bukti yang perlu dikumpulkan." />
        <div className="mt-5">
          <EcoGrowAssessmentMatrix rows={ecoGrowAssessmentRows} />
        </div>
      </EcoCard>
      <AssessmentMatrix results={results} />
      <RubricBuilderMock />
      <RemedialEnrichmentPanel />
    </div>
  );
}
