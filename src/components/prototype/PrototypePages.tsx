"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Award,
  BookOpen,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Droplets,
  HeartHandshake,
  ImageIcon,
  Leaf,
  Plus,
  Printer,
  Recycle,
  Send,
  ShoppingBasket,
  Sparkles,
  Sprout,
  Star,
  Sun,
  Trophy,
  Users,
} from "lucide-react";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { EcoProgress } from "@/components/ui/EcoProgress";
import { EcoGrowProgressTimeline } from "@/components/ecogrow/EcoGrowProgressTimeline";
import { EcoGrowStageBadge } from "@/components/ecogrow/EcoGrowStageBadge";
import { LkpdSectionCard } from "@/components/ecogrow/LkpdSectionCard";
import { MeetingPlanTimeline } from "@/components/ecogrow/MeetingPlanTimeline";
import { SelfPeerChecklist } from "@/components/ecogrow/SelfPeerChecklist";
import { TeachingModuleSummaryCard } from "@/components/ecogrow/TeachingModuleSummaryCard";
import { EvidencePreview } from "@/components/shared/EvidencePreview";
import { MockUploadBox } from "@/components/shared/MockUploadBox";
import { PancanitiStepper } from "@/components/shared/PancanitiStepper";
import { RecommendationCard } from "@/components/shared/RecommendationCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  badges,
  ecogrowStages,
  ecoChallenges,
  ecogrowDigitalLkpd,
  ecogrowTeachingModules,
  ecoLearnChecks,
  ecoLearnContents,
  ecoPlayGames,
  galleryPosts,
  galleryCategories,
  getEcoGrowStageLabel,
  groupProgress,
  harvestImpactSummary,
  harvests,
  journals,
  learningModules,
  missions,
  projects,
  peerAssessmentChecklist,
  quizAttemptsMock,
  quizzes,
  reflections,
  studentMissionSubmissions,
  studentPortfolioSummary,
  studentProfiles,
  studentTodaySummary,
  selfAssessmentChecklist,
  users,
  legacyStageToEcoGrowStage,
} from "@/data";
import { useMockStorage } from "@/hooks/useMockStorage";
import { calculateLevel, getLevelName, getProgressToNextLevel } from "@/lib/gamification";
import { getActiveStudentMock } from "@/lib/mock-student-context";
import { getStudentDashboardMock, getStudentMissionMock, getStudentPortfolioMock } from "@/mock/repositories/studentRepository";
import type {
  EcoChallenge,
  EcoGrowLkpdSubmission,
  EcoMasterResult,
  EcoReadinessResult,
  GalleryCategory,
  GalleryPost,
  JournalEntry,
  PancanitiStage,
  QuizAttempt,
  ReflectionEntry,
} from "@/types/ecogrow";

const conditionLabel: Record<JournalEntry["condition"], string> = {
  sehat: "Sehat",
  layu: "Layu",
  kuning: "Kuning",
  perlu_perawatan: "Perlu perawatan",
};

const stageLabel = {
  NITI_HARTI: getEcoGrowStageLabel("NITI_HARTI"),
  NITI_SURTI: getEcoGrowStageLabel("NITI_SURTI"),
  NITI_BUKTI: getEcoGrowStageLabel("NITI_BUKTI"),
  NITI_BAKTI: getEcoGrowStageLabel("NITI_BAKTI"),
  NITI_SAJATI: getEcoGrowStageLabel("NITI_SAJATI"),
};

const inputClass = "eco-input";

type HeroMetric = {
  label: string;
  value: string;
  note?: string;
};

type StudentActionItem = {
  title: string;
  description: string;
  href: string;
  icon: typeof Sprout;
  label: string;
  tone?: "primary" | "soft" | "warm";
};

function ChartSkeleton({ className = "h-64" }: { className?: string }) {
  return <div className={`${className} w-full animate-pulse rounded-xl bg-leaf-50`} aria-hidden="true" />;
}

const GrowthLineChart = dynamic(
  () => import("./PrototypeCharts").then((mod) => mod.GrowthLineChart),
  { ssr: false, loading: () => <ChartSkeleton className="h-72" /> },
);

const LeafBarChart = dynamic(
  () => import("./PrototypeCharts").then((mod) => mod.LeafBarChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

const ConditionPieChart = dynamic(
  () => import("./PrototypeCharts").then((mod) => mod.ConditionPieChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

const MissionProgressChart = dynamic(
  () => import("./PrototypeCharts").then((mod) => mod.MissionProgressChart),
  { ssr: false, loading: () => <ChartSkeleton className="mt-5 h-[260px]" /> },
);

const BadgeDistributionChart = dynamic(
  () => import("./PrototypeCharts").then((mod) => mod.BadgeDistributionChart),
  { ssr: false, loading: () => <ChartSkeleton className="h-[260px]" /> },
);

function useStoredNumber(key: string, fallback: number) {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored !== null) setValue(Number(stored));
  }, [key]);

  const update = (next: number) => {
    setValue(next);
    localStorage.setItem(key, String(next));
  };

  return [value, update] as const;
}

function useStoredList<T>(key: string, fallback: T[]) {
  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;
  const [value, setValue] = useState<T[]>(fallback);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (!stored) return;
    try {
      setValue(JSON.parse(stored) as T[]);
    } catch {
      setValue(fallbackRef.current);
    }
  }, [key]);

  const update = (next: T[]) => {
    setValue(next);
    localStorage.setItem(key, JSON.stringify(next));
  };

  return [value, update] as const;
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative">
      {eyebrow ? (
        <p className="inline-flex items-center gap-2 rounded-full border border-leaf-500/15 bg-leaf-50 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.13em] text-leaf-500">
          <span className="size-1.5 rounded-full bg-sun" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-2 max-w-4xl font-heading text-2xl font-black leading-tight text-leaf-700 md:text-3xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-mutedText">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function PageHero({
  eyebrow,
  title,
  description,
  metrics,
  actions,
  icon: Icon = Leaf,
}: {
  eyebrow: string;
  title: string;
  description: string;
  metrics?: HeroMetric[];
  actions?: ReactNode;
  icon?: typeof Sprout;
}) {
  return (
    <section className="relative overflow-hidden rounded-[1.15rem] border border-white/20 bg-[#0a3b25] p-4 text-white shadow-[0_22px_60px_rgba(6,42,22,0.16)] md:p-5">
      <div
        className="absolute inset-0 opacity-24 mix-blend-screen"
        style={{
          backgroundImage: "url('/assets/images/seedling-closeup-unsplash.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 fine-noise opacity-45" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(246,195,67,0.42),transparent_18rem),linear-gradient(118deg,rgba(5,47,27,0.96),rgba(22,122,58,0.9)_52%,rgba(56,189,248,0.26))]" aria-hidden="true" />
      <div className="absolute -right-12 -top-16 size-52 rounded-full border border-white/12 bg-white/[0.04]" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 h-24 w-1/2 bg-gradient-to-l from-sun/20 to-transparent" aria-hidden="true" />
      <div className="relative grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <EcoBadge className="bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            <Icon className="size-4" aria-hidden="true" />
            {eyebrow}
          </EcoBadge>
          <h1 className="mt-4 font-heading text-2xl font-black leading-tight md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-white/82 md:text-base md:leading-7">
            {description}
          </p>
          {actions ? <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">{actions}</div> : null}
        </div>
        {metrics?.length ? (
          <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-white/12 bg-white/[0.12] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[0.16]"
              >
                <p className="text-[0.68rem] font-black uppercase tracking-[0.11em] text-white/62">
                  {metric.label}
                </p>
                <p className="mt-1.5 font-heading text-2xl font-black text-white">
                  {metric.value}
                </p>
                {metric.note ? (
                  <p className="mt-1.5 text-[0.7rem] font-bold leading-4 text-white/68">
                    {metric.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  note,
  icon: Icon,
}: {
  label: string;
  value: string;
  note: string;
  icon: typeof Sprout;
}) {
  return (
    <EcoCard className="p-4">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sun via-leaf-500 to-sky opacity-75" aria-hidden="true" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-mutedText">{label}</p>
          <p className="mt-2 font-heading text-3xl font-black leading-none text-leaf-700">{value}</p>
        </div>
        <span className="grid size-10 place-items-center rounded-lg bg-leaf-100 text-leaf-700 shadow-soft ring-1 ring-leaf-500/10 transition group-hover:scale-105 group-hover:bg-sun/35">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-xs font-semibold leading-5 text-mutedText">{note}</p>
    </EcoCard>
  );
}

function StudentActionGrid({ items }: { items: StudentActionItem[] }) {
  const toneClass = {
    primary: "border-leaf-500/25 bg-leaf-700 text-white",
    soft: "border-gardenBorder bg-white/88 text-leaf-700",
    warm: "border-sun/35 bg-cream/88 text-earth",
  };

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {items.map((item, index) => {
        const Icon = item.icon;
        const primary = item.tone === "primary";

        return (
          <a
            key={item.href}
            href={item.href}
            className={`group relative overflow-hidden rounded-[1.15rem] border p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-eco ${toneClass[item.tone ?? "soft"]}`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className={`grid size-12 place-items-center rounded-xl ${primary ? "bg-white/14 text-sun" : "bg-leaf-100 text-leaf-700"}`}>
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className={`font-heading text-4xl font-black ${primary ? "text-white/18" : "text-leaf-100"}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className={`mt-5 text-xs font-black uppercase tracking-[0.14em] ${primary ? "text-white/58" : "text-mutedText"}`}>{item.label}</p>
            <h2 className={`mt-2 font-heading text-2xl font-black leading-tight ${primary ? "text-white" : "text-leaf-700"}`}>{item.title}</h2>
            <p className={`mt-2 text-sm font-semibold leading-6 ${primary ? "text-white/76" : "text-mutedText"}`}>{item.description}</p>
            <span className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-black ${primary ? "bg-sun text-leaf-700" : "bg-white text-leaf-700"}`}>
              Buka <ArrowRight className="size-4" />
            </span>
          </a>
        );
      })}
    </section>
  );
}

function StudentSteps({ title = "Cara pakai halaman ini", steps }: { title?: string; steps: string[] }) {
  return (
    <EcoCard tone="cream" className="p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-earth">{title}</p>
      <div className="mt-3 grid gap-2 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step} className="flex items-start gap-3 rounded-xl bg-white/82 p-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-leaf-700 font-heading text-sm font-black text-white">
              {index + 1}
            </span>
            <p className="text-sm font-bold leading-6 text-slateText">{step}</p>
          </div>
        ))}
      </div>
    </EcoCard>
  );
}

function StudentStageStrip({ activeStage = "NITI_BUKTI" as PancanitiStage }: { activeStage?: PancanitiStage }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ecogrowStages.map((stage) => (
        <EcoGrowStageBadge
          key={stage.id}
          stageId={stage.id}
          showShortLabel
          variant={legacyStageToEcoGrowStage[activeStage] === stage.id ? "solid" : "soft"}
        />
      ))}
    </div>
  );
}

function StudentFocusCard({
  title,
  description,
  actionHref,
  actionLabel,
  icon: Icon = Sparkles,
}: {
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
  icon?: typeof Sprout;
}) {
  return (
    <EcoCard className="p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-sun/25 text-earth">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-heading text-2xl font-black text-leaf-700">{title}</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-mutedText">{description}</p>
          </div>
        </div>
        <EcoButton href={actionHref} variant="reward" icon={<ArrowRight className="size-4" />}>
          {actionLabel}
        </EcoButton>
      </div>
    </EcoCard>
  );
}

function PancanitiTimeline() {
  return (
    <div className="relative grid gap-3 md:grid-cols-5">
      <div className="absolute left-8 right-8 top-8 hidden border-t-2 border-dashed border-leaf-500/18 md:block" />
      {missions.map((mission, index) => (
        <div
          key={mission.id}
          className="relative rounded-xl border border-gardenBorder/80 bg-white/[0.88] p-4 shadow-soft transition hover:-translate-y-1 hover:border-leaf-500/30"
        >
          <span className="grid size-9 place-items-center rounded-lg bg-leaf-100 font-heading font-black text-leaf-700 shadow-[0_8px_18px_rgba(22,122,58,0.12)]">
            {index + 1}
          </span>
          <p className="mt-4 text-sm font-extrabold text-leaf-500">{stageLabel[mission.stage]}</p>
          <h3 className="mt-2 font-heading text-lg font-black leading-6 text-leaf-700">{mission.title.split(" - ")[1]}</h3>
          <EcoBadge className="mt-3 bg-sun/25 text-earth">{mission.points} poin</EcoBadge>
        </div>
      ))}
    </div>
  );
}

function GuruDashboardMock() {
  const today = "2026-05-07";
  const todaysJournals = journals.filter((journal) => journal.date === today).length;

  return (
    <div className="living-page mx-auto max-w-7xl space-y-5">
      <PageHero
        eyebrow="Dashboard guru"
        title="Selamat datang, Bu Rani Aktivator"
        description="Pantau perkembangan Eco Explorer hari ini. Proyek kangkung hidroponik berjalan 68%."
        icon={Users}
        actions={
          <>
            <EcoButton href="/guru/modul-ajar" variant="reward">Buat Modul Ajar</EcoButton>
            <EcoButton href="/guru/monitoring" variant="secondary">Lihat Monitoring</EcoButton>
          </>
        }
        metrics={[
          { label: "Progress kelas", value: "68%", note: "Rata-rata Sintaks EcoGrow" },
          { label: "Jurnal aktif", value: `${todaysJournals}`, note: "Masuk hari ini" },
          { label: "Misi berjalan", value: "74%", note: "Sampai Ecological Execution" },
        ]}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total siswa" value="25" note="8 siswa mock tampil dalam prototype" icon={Users} />
        <MetricCard label="Proyek aktif" value="1" note="Misi Kangkung Hidroponik" icon={Sprout} />
        <MetricCard label="Jurnal hari ini" value={String(todaysJournals)} note="3 kelompok sudah mengirim jurnal tanaman." icon={BookOpen} />
        <MetricCard label="Progress kelas" value="68%" note="Ada 2 siswa yang disarankan penguatan konsep." icon={Trophy} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <EcoCard>
          <SectionTitle eyebrow="Analitik tanaman" title="Pertumbuhan kangkung kelompok" />
          <GrowthLineChart />
        </EcoCard>
        <EcoCard tone="cream">
          <SectionTitle eyebrow="Aktivitas terbaru" title="Jejak belajar hari ini" />
          <div className="mt-5 space-y-3">
            {[
              "Adit mengirim jurnal tinggi tanaman kangkung.",
              "Tim Tunas Hijau mengunggah foto galeri.",
              "Naya mendapat badge Ahli Fotosintesis.",
              "Raka menyelesaikan 8/10 soal EcoMaster Quiz.",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white/70 bg-white/[0.78] p-4 text-sm font-bold text-slateText shadow-soft">{item}</div>
            ))}
          </div>
        </EcoCard>
      </section>

      <EcoCard>
        <SectionTitle eyebrow="Progress Sintaks EcoGrow" title="Progress misi kelas" />
        <MissionProgressChart />
      </EcoCard>
    </div>
  );
}

function GuruModulePage() {
  const [generated, setGenerated] = useState(false);
  const [moduleStatus, setModuleStatus] = useState<"idle" | "edit" | "published">("idle");
  const module = learningModules[0];

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <SectionTitle
        eyebrow="Modul ajar"
        title="Fotosintesis dan Siklus Energi"
        description="Generator ini masih simulasi. Guru bisa melihat preview modul dari mock data lokal."
      />
      <section className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
        <EcoCard tone="cream">
          <h2 className="font-heading text-2xl font-black text-leaf-700">Generate Modul Ajar</h2>
          <div className="mt-5 space-y-4">
            {["Mata pelajaran: IPAS", "Fase/Kelas: B/4", "Konteks: kangkung hidroponik", "Alokasi: 4 pertemuan x 2x35 menit"].map((item) => (
              <div key={item} className="rounded-xl border border-white/70 bg-white/80 p-4 text-sm font-bold text-slateText shadow-soft transition hover:-translate-y-0.5">{item}</div>
            ))}
          </div>
          <EcoButton className="mt-5" icon={<Sparkles className="size-4" />} onClick={() => setGenerated(true)}>
            Generate Modul Ajar
          </EcoButton>
        </EcoCard>
        <EcoCard>
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <EcoBadge className="bg-leaf-100 text-leaf-700">{module.subject} Fase {module.phase}</EcoBadge>
              <h2 className="mt-4 font-heading text-3xl font-black text-leaf-700">{module.title}</h2>
              <p className="mt-3 leading-7 text-mutedText">{module.description}</p>
            </div>
            <div className="flex gap-2">
              <EcoButton variant="secondary" size="sm" onClick={() => setModuleStatus("edit")}>Edit Modul</EcoButton>
              <EcoButton variant="reward" size="sm" onClick={() => setModuleStatus("published")}>Publikasikan</EcoButton>
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div>
              <h3 className="font-heading text-xl font-black text-leaf-700">CP/TP</h3>
              <ul className="mt-3 space-y-3">
                {module.learningOutcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 rounded-xl bg-leaf-50/70 p-3 text-sm leading-6 text-slateText">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-leaf-500" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-xl font-black text-leaf-700">Pertanyaan pemantik</h3>
              <div className="mt-3 space-y-3">
                {["Mengapa daun bisa membuat makanan?", "Apa yang terjadi jika tanaman kekurangan cahaya?", "Bagaimana cara merawat pangan sehat di sekolah?"].map((question) => (
                  <p key={question} className="rounded-xl border border-gardenBorder/80 bg-leaf-50 p-4 text-sm font-bold text-slateText">{question}</p>
                ))}
              </div>
            </div>
          </div>
          {generated ? (
            <div className="mt-6 rounded-xl border border-leaf-500/25 bg-leaf-50 p-4 text-sm font-bold text-leaf-700">
              Preview modul berhasil dibuat dari mock data. Siap dipublikasikan ke siswa.
            </div>
          ) : null}
          {moduleStatus === "edit" ? (
            <div className="mt-4 rounded-xl border border-sky/30 bg-sky/10 p-4 text-sm font-bold text-slateText">
              Mode edit modul aktif. Guru dapat meninjau CP/TP dan pertanyaan pemantik sebelum publikasi.
            </div>
          ) : null}
          {moduleStatus === "published" ? (
            <div className="mt-4 rounded-xl border border-leaf-500/25 bg-leaf-100 p-4 text-sm font-bold text-leaf-700">
              Modul berhasil dipublikasikan ke siswa.
            </div>
          ) : null}
        </EcoCard>
      </section>
    </div>
  );
}

function GuruProjectPage() {
  const [projectList, setProjectList] = useState(projects);

  const addProject = () => {
    setProjectList((current) => [
      ...current,
      {
        ...projects[0],
        id: `project-${current.length + 1}`,
        title: "Observasi Bayam Sekolah",
        plantType: "Bayam",
        progress: 12,
        status: "planned",
      },
    ]);
  };

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle eyebrow="Proyek pembelajaran" title="Kelola kebun dan hidroponik kelas" />
        <EcoButton icon={<Plus className="size-4" />} onClick={addProject}>Tambah Proyek</EcoButton>
      </div>
      <EcoCard tone="cream">
        <div className="grid gap-4 md:grid-cols-[1fr_0.75fr_0.75fr_auto] md:items-end">
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Nama proyek
            <input className={inputClass} defaultValue="Observasi Bayam Sekolah" />
          </label>
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Tanaman
            <input className={inputClass} defaultValue="Bayam" />
          </label>
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Metode
            <select className={inputClass} defaultValue="observation"><option value="observation">Observasi</option><option value="hydroponic">Hidroponik</option><option value="soil">Tanah</option></select>
          </label>
          <EcoButton icon={<Plus className="size-4" />} onClick={addProject}>Tambah mock</EcoButton>
        </div>
      </EcoCard>
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          {projectList.map((project) => (
            <EcoCard key={project.id} tone={project.status === "planned" ? "cream" : "white"}>
              <EcoBadge className="bg-sun/25 text-earth">{project.status}</EcoBadge>
              <h2 className="mt-4 font-heading text-3xl font-black text-leaf-700">{project.title}</h2>
              <p className="mt-3 leading-7 text-mutedText">{project.description}</p>
              <EcoProgress value={project.progress} label="Progress proyek" color="orange" className="mt-5" />
            </EcoCard>
          ))}
        </div>
        <EcoCard>
          <SectionTitle eyebrow="Timeline Sintaks EcoGrow" title="Alur misi proyek" />
          <div className="mt-5">
            <PancanitiTimeline />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {groupProgress.map((group) => (
              <div key={group.group} className="rounded-xl border border-gardenBorder/80 bg-leaf-50/85 p-4 shadow-soft transition hover:-translate-y-0.5 hover:bg-white">
                <h3 className="font-heading text-xl font-black text-leaf-700">{group.group}</h3>
                <EcoProgress value={group.progress} label={`${group.journals} jurnal terkumpul`} className="mt-4" />
                <p className="mt-3 text-sm font-semibold leading-6 text-mutedText">{group.feedback}</p>
              </div>
            ))}
          </div>
        </EcoCard>
      </section>
    </div>
  );
}

function GuruMonitoringPage() {
  const [groupFilter, setGroupFilter] = useState("Semua");
  const [conditionFilter, setConditionFilter] = useState("Semua");
  const [dateFilter, setDateFilter] = useState("");
  const [feedback, setFeedback] = useState("");

  const filtered = journals.filter((journal) => {
    const profile = studentProfiles.find((item) => item.userId === journal.studentId);
    const matchGroup = groupFilter === "Semua" || profile?.groupName === groupFilter;
    const matchCondition = conditionFilter === "Semua" || journal.condition === conditionFilter;
    const matchDate = !dateFilter || journal.date === dateFilter;
    return matchGroup && matchCondition && matchDate;
  });
  const selected = filtered[0] ?? journals[0];

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <SectionTitle eyebrow="Monitoring jurnal" title="Pantau catatan ekologis siswa" />
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <EcoCard>
          <div className="mb-5 grid gap-3 md:grid-cols-3">
            <select className={inputClass} value={groupFilter} onChange={(event) => setGroupFilter(event.target.value)}>
              <option>Semua</option>
              <option>Tim Tunas Hijau</option>
              <option>Tim Sahabat Tanah</option>
            </select>
            <select className={inputClass} value={conditionFilter} onChange={(event) => setConditionFilter(event.target.value)}>
              <option>Semua</option>
              <option value="sehat">Sehat</option>
              <option value="layu">Layu</option>
              <option value="kuning">Kuning</option>
              <option value="perlu_perawatan">Perlu perawatan</option>
            </select>
            <input className={inputClass} type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-left text-sm">
              <thead className="text-mutedText">
                <tr>
                  <th className="px-3 py-2">Tanggal</th>
                  <th className="px-3 py-2">Siswa</th>
                  <th className="px-3 py-2">Kelompok</th>
                  <th className="px-3 py-2">Tinggi</th>
                  <th className="px-3 py-2">Kondisi</th>
                  <th className="px-3 py-2">Air</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 12).map((journal) => {
                  const user = users.find((item) => item.id === journal.studentId);
                  const profile = studentProfiles.find((item) => item.userId === journal.studentId);
                  return (
                    <tr key={journal.id} className="eco-table-row text-slateText">
                      <td className="rounded-l-xl px-3 py-3 font-bold">{journal.date}</td>
                      <td className="px-3 py-3">{user?.name}</td>
                      <td className="px-3 py-3">{profile?.groupName}</td>
                      <td className="px-3 py-3">{journal.plantHeightCm} cm</td>
                      <td className="px-3 py-3">{conditionLabel[journal.condition]}</td>
                      <td className="rounded-r-xl px-3 py-3">{journal.waterMl} ml</td>
                    </tr>
                  );
                })}
                {filtered.length === 0 ? (
                  <tr>
                    <td className="rounded-xl bg-leaf-50 px-3 py-6 text-center font-bold text-mutedText" colSpan={6}>
                      Tidak ada jurnal yang cocok dengan filter.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </EcoCard>
        <EcoCard tone="cream">
          <SectionTitle eyebrow="Detail jurnal" title={`${selected.plantHeightCm} cm, ${conditionLabel[selected.condition]}`} />
          <div className="mt-5 rounded-xl bg-white/80 p-4">
            <p className="text-sm font-extrabold text-mutedText">Catatan siswa</p>
            <p className="mt-2 leading-7 text-slateText">{selected.note}</p>
          </div>
          <div className="mt-4 grid aspect-[16/9] place-items-center overflow-hidden rounded-xl border border-dashed border-leaf-500/30 bg-leaf-50 text-center text-sm font-bold text-mutedText">
            {selected.photoUrl ? (
              <img src={selected.photoUrl} alt={`Foto jurnal ${selected.id}`} className="h-full w-full object-cover" />
            ) : (
              "Belum ada foto tanaman"
            )}
          </div>
          <textarea className={`${inputClass} mt-4 min-h-28 py-3`} placeholder="Tulis umpan balik untuk siswa..." value={feedback} onChange={(event) => setFeedback(event.target.value)} />
          <EcoButton className="mt-3" icon={<Send className="size-4" />} onClick={() => setFeedback("Wah, catatanmu rapi. Lanjutkan pengamatan air besok.")}>
            Beri Umpan Balik
          </EcoButton>
        </EcoCard>
      </section>
    </div>
  );
}

function GuruAnalyticsPage() {
  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <SectionTitle eyebrow="Analitik guru" title="Pertumbuhan, badge, dan insight kelas" />
      <section className="grid gap-6 xl:grid-cols-3">
        <EcoCard className="xl:col-span-2">
          <SectionTitle eyebrow="Line chart" title="Tinggi tanaman per kelompok" />
          <GrowthLineChart />
        </EcoCard>
        <EcoCard>
          <SectionTitle eyebrow="Pie chart" title="Kondisi tanaman" />
          <ConditionPieChart />
        </EcoCard>
      </section>
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <EcoCard>
          <SectionTitle eyebrow="Bar chart" title="Jumlah daun terbaru" />
          <LeafBarChart />
        </EcoCard>
        <EcoCard tone="cream">
          <SectionTitle eyebrow="Distribusi badge" title="Badge paling sering diraih" />
          <BadgeDistributionChart />
        </EcoCard>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Remedial" value="2" note="Penguatan konsep cahaya dan air." icon={ClipboardCheck} />
        <MetricCard label="Pengayaan" value="6" note="Siap membuat poster pameran." icon={Award} />
        <MetricCard label="Kelompok aktif" value="Tunas" note="Konsisten mengisi jurnal selama 5 hari." icon={Users} />
        <MetricCard label="Insight" value="Air" note="Sahabat Tanah perlu memperhatikan volume air." icon={Droplets} />
      </section>
    </div>
  );
}

function GuruSimplePage({ kind }: { kind: "panduan" | "galeri" | "asesmen" }) {
  const content = {
    panduan: ["Pilih modul ajar.", "Buka proyek aktif.", "Pantau jurnal dan beri umpan balik.", "Gunakan analitik untuk remedial atau pengayaan."],
    galeri: galleryPosts.map((post) => `${post.title} - ${post.likes} apresiasi`),
    asesmen: quizzes[0].questions.map((question) => `${question.cognitiveLevel}: ${question.question}`),
  }[kind];

  const title = kind === "panduan" ? "Panduan EcoGrow" : kind === "galeri" ? "Galeri Project Kelas" : "Asesmen EcoMaster";

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <SectionTitle eyebrow="Guru" title={title} />
      <EcoCard>
        <div className="grid gap-4 md:grid-cols-2">
          {content.map((item) => (
            <div key={item} className="rounded-xl border border-gardenBorder bg-leaf-50 p-4 font-bold leading-7 text-slateText">
              {item}
            </div>
          ))}
        </div>
      </EcoCard>
    </div>
  );
}

const kaihLabels: Record<string, string> = {
  ekologis: "Ekologis",
  mandiri: "Mandiri",
  adaptif: "Adaptif",
  inovatif: "Inovatif",
  humanis: "Humanis",
};

const missionStatusLabels = {
  locked: "Terkunci",
  active: "Aktif",
  draft: "Draft tersimpan",
  submitted: "Dikirim",
  reviewed: "Sudah direview",
  needs_revision: "Perlu revisi",
  completed: "Selesai",
};

const challengeStatusLabels: Record<EcoChallenge["status"], string> = {
  not_started: "Belum mulai",
  active: "Berjalan",
  submitted: "Dikirim",
  approved: "Disetujui",
};

const challengeTypeLabels: Record<NonNullable<EcoChallenge["type"]>, string> = {
  remedial: "Latihan ulang",
  enrichment: "Tantangan lanjutan",
  habit: "Kebiasaan hijau",
};

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-dashed border-leaf-500/30 bg-leaf-50/70 p-5 text-center">
      <Sprout className="mx-auto size-8 text-leaf-500" aria-hidden="true" />
      <p className="mt-3 font-heading text-xl font-black text-leaf-700">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{description}</p>
    </div>
  );
}

function ToastMessage({ message }: { message: string }) {
  if (!message) return null;

  return (
    <p className="rounded-xl border border-leaf-500/25 bg-leaf-100 p-4 font-bold leading-6 text-leaf-700 shadow-soft">
      {message}
    </p>
  );
}

function KaihBars({ values }: { values: Record<string, number> }) {
  return (
    <div className="space-y-4">
      {Object.entries(values).map(([key, value]) => (
        <EcoProgress key={key} value={value} label={kaihLabels[key] ?? key} />
      ))}
    </div>
  );
}

function PlantGrowthMiniChart({ data }: { data: JournalEntry[] }) {
  const max = Math.max(...data.map((item) => item.plantHeightCm), 1);

  return (
    <div className="flex h-44 items-end justify-center gap-3 rounded-xl bg-white/80 p-4">
      {data.slice(-7).map((journal) => (
        <div key={journal.id} className="flex flex-1 flex-col items-center gap-2">
          <div
            className="w-full max-w-8 rounded-t-full bg-gradient-to-t from-earth to-leaf-500 shadow-soft"
            style={{ height: `${Math.max(18, Math.round((journal.plantHeightCm / max) * 130))}px` }}
          />
          <span className="text-[0.68rem] font-extrabold text-mutedText">{journal.plantHeightCm} cm</span>
        </div>
      ))}
    </div>
  );
}

function PancanitiJourneyMap({
  selectedStage,
  onSelect,
}: {
  selectedStage?: PancanitiStage;
  onSelect?: (stage: PancanitiStage) => void;
}) {
  return (
    <div className="relative grid gap-3 md:grid-cols-5">
      <div className="absolute left-8 right-8 top-8 hidden border-t-2 border-dashed border-leaf-500/18 md:block" />
      {missions.map((mission, index) => {
        const isSelected = selectedStage === mission.stage;
        const isActive = mission.status === "active";
        const statusClass =
          mission.status === "completed"
            ? "bg-leaf-500 text-white"
            : isActive || isSelected
              ? "bg-sun text-leaf-700"
              : mission.status === "submitted"
                ? "bg-sky/15 text-sky"
                : "bg-slate-100 text-mutedText";

        return (
          <button
            key={mission.id}
            type="button"
            onClick={() => onSelect?.(mission.stage)}
            className={`relative rounded-xl border p-4 text-left shadow-soft transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-4 focus-visible:outline-sun/60 ${
              isSelected || isActive ? "border-sun bg-cream" : "border-gardenBorder/80 bg-white/[0.88]"
            }`}
          >
            <span className={`grid size-9 place-items-center rounded-lg font-heading font-black ${statusClass}`}>
              {index + 1}
            </span>
            <p className="mt-4 text-sm font-extrabold text-leaf-500">{stageLabel[mission.stage]}</p>
            <h3 className="mt-2 font-heading text-lg font-black leading-6 text-leaf-700">
              {mission.title.split(" - ")[1]}
            </h3>
            <EcoBadge className="mt-3 bg-white text-mutedText">{missionStatusLabels[mission.status]}</EcoBadge>
          </button>
        );
      })}
    </div>
  );
}

export function SiswaDashboardMock() {
  const { user, profile, activeMission, studentBadges, studentJournals } = getActiveStudentMock();
  const [points] = useStoredNumber("ecogrow-points", profile.points);
  const [storedJournals] = useStoredList<JournalEntry>("ecogrow-journals", studentJournals);
  const [storedReflections] = useStoredList<ReflectionEntry>("ecogrow-reflections", reflections);
  const [storedGallery] = useStoredList<GalleryPost>("ecogrow-gallery", galleryPosts);
  const [storedAttempts] = useStoredList<QuizAttempt>("ecogrow-quiz-attempts", quizAttemptsMock);
  const dashboard = getStudentDashboardMock(profile.userId);
  const level = calculateLevel(points);
  const latestJournal = storedJournals.filter((journal) => journal.studentId === profile.userId).at(-1);
  const dashboardBadges = studentBadges.length ? studentBadges : badges.slice(0, 3);
  const todayCondition = conditionLabel[studentTodaySummary.latestPlant.condition as JournalEntry["condition"]];

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <PageHero
        eyebrow="Dashboard siswa"
        title={`Halo, ${user.name}! Hari ini kita lanjut 3 langkah kecil.`}
        description="Mulai dari belajar singkat, lanjutkan misi tanaman, lalu simpan bukti agar portofoliomu tumbuh."
        icon={Leaf}
        actions={
          <>
            <EcoButton href="/siswa/ecomission" variant="reward" icon={<ArrowRight className="size-4" />}>Mulai Misi</EcoButton>
            <EcoButton href="/siswa/ecolearn" variant="secondary" icon={<BookOpen className="size-4" />}>Belajar Dulu</EcoButton>
            <EcoButton href="/siswa/portofolio" variant="secondary" icon={<Trophy className="size-4" />}>Lihat Portofolio</EcoButton>
          </>
        }
        metrics={[
          { label: `Level ${level}`, value: getLevelName(level), note: `${profile.groupName} - Kelas 4B` },
          { label: "EcoPoint", value: String(points), note: `${getProgressToNextLevel(points)}% ke level berikutnya` },
          { label: "Badge aktif", value: String(dashboardBadges.length), note: "Koleksi Eco Explorer" },
        ]}
      />

      <StudentActionGrid
        items={[
          {
            label: "Langkah 1",
            title: "Belajar 5 menit",
            description: "Baca kartu EcoLearn supaya kamu tahu apa yang diamati.",
            href: "/siswa/ecolearn",
            icon: BookOpen,
            tone: "soft",
          },
          {
            label: "Langkah 2",
            title: "Kerjakan misi",
            description: "Ukur tanaman, cek air, lalu catat bukti hari ini.",
            href: "/siswa/ecomission",
            icon: Sprout,
            tone: "primary",
          },
          {
            label: "Langkah 3",
            title: "Ceritakan hasil",
            description: "Tulis refleksi pendek dan lihat jejak belajarmu.",
            href: "/siswa/cerita-belajarku",
            icon: HeartHandshake,
            tone: "warm",
          },
        ]}
      />

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <EcoCard tone="cream">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <SectionTitle
              eyebrow="Tanaman hari ini"
              title={`${studentTodaySummary.latestPlant.heightCm} cm, ${studentTodaySummary.latestPlant.leafCount} daun`}
              description={studentTodaySummary.latestPlant.message}
            />
            <EcoGrowStageBadge stageId={legacyStageToEcoGrowStage[studentTodaySummary.activeStage]} />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ["Kondisi", todayCondition, "Cek warna daun sebelum pulang."],
              ["Tugas dekat", "Isi jurnal", studentTodaySummary.nextAction],
              ["Quiz", storedAttempts[0] ? `${storedAttempts[0].score}` : "Belum", storedAttempts[0]?.recommendation ?? "Buka quiz jika sudah siap."],
            ].map(([label, value, note]) => (
              <div key={label} className="rounded-xl bg-white/80 p-4">
                <p className="text-xs font-black uppercase tracking-wide text-mutedText">{label}</p>
                <p className="mt-2 font-heading text-3xl font-black text-leaf-700">{value}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-mutedText">{note}</p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <StudentStageStrip activeStage={studentTodaySummary.activeStage} />
          </div>
        </EcoCard>

        <EcoCard>
          <SectionTitle
            eyebrow="Progress Sintaks EcoGrow"
            title="Lihat posisi belajarmu"
            description="Satu baris tahap membantu kamu tahu sudah sampai mana."
          />
          <div className="mt-5">
            <EcoGrowProgressTimeline stages={ecogrowStages} />
          </div>
        </EcoCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <EcoCard tone="dark" className="bg-[linear-gradient(135deg,#052f1b,#0b4f2a_58%,#9a6b3f)]">
          <div className="pointer-events-none absolute inset-0 fine-noise opacity-35" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-10 top-8 size-36 rounded-full border border-white/12 bg-white/[0.05]" aria-hidden="true" />
          <div className="flex items-start justify-between gap-3">
            <div>
              <EcoBadge className="bg-sun text-leaf-700">Eco Explorer Passport</EcoBadge>
              <h2 className="mt-3 font-heading text-3xl font-black text-white">{user.name}</h2>
              <p className="mt-1.5 text-sm text-white/75">{profile.groupName} - Kelas 4B</p>
            </div>
            <div className="grid size-16 place-items-center rounded-xl bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <Leaf className="size-9 text-sun" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/10 p-3">
              <p className="text-[0.68rem] font-extrabold uppercase tracking-wide text-white/60">Level</p>
              <p className="mt-1.5 font-heading text-2xl font-black">{level}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/10 p-3">
              <p className="text-[0.68rem] font-extrabold uppercase tracking-wide text-white/60">EcoPoint</p>
              <p className="mt-1.5 font-heading text-2xl font-black">{points}</p>
            </div>
          </div>
          <EcoProgress value={getProgressToNextLevel(points)} label="Menuju level berikutnya" color="yellow" className="mt-5" />
        </EcoCard>

        <EcoCard tone="cream">
          <SectionTitle eyebrow="Misi hari ini" title={activeMission.title} description={activeMission.instructions} />
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {activeMission.tasks.map((task, index) => (
              <label key={task} className="flex items-center gap-3 rounded-xl bg-white/80 p-4 font-bold text-slateText">
                <input type="checkbox" defaultChecked={index < 2} className="size-5 accent-leaf-500" />
                {task}
              </label>
            ))}
          </div>
          <EcoButton href="/siswa/ecomission" className="mt-5" icon={<ArrowRight className="size-4" />}>
            Buka EcoMission
          </EcoButton>
        </EcoCard>
      </section>

      <section>
        <SectionTitle eyebrow="Rekomendasi personal" title="Yang sebaiknya kamu lakukan berikutnya" />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {dashboard.recommendations.map((item) => (
            <RecommendationCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
        <EcoCard>
          <SectionTitle eyebrow="Tanaman kelompok" title={`${latestJournal?.plantHeightCm ?? studentTodaySummary.latestPlant.heightCm} cm dan ${latestJournal?.leafCount ?? studentTodaySummary.latestPlant.leafCount} daun`} description={studentTodaySummary.latestPlant.message} />
          <div className="mt-5">
            <PlantGrowthMiniChart data={storedJournals.filter((journal) => journal.studentId === profile.userId)} />
          </div>
        </EcoCard>
        <EcoCard>
          <SectionTitle eyebrow="KAIH" title="Karakter yang sedang tumbuh" />
          <div className="mt-5">
            <KaihBars values={profile.ecologicalCharacter} />
          </div>
        </EcoCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <EcoCard tone="cream">
          <SectionTitle eyebrow="Badge terbaru" title="Rak apresiasi" />
          <div className="mt-5 space-y-3">
            {dashboardBadges.length ? (
              dashboardBadges.slice(-3).map((badge) => (
                <div key={badge.id} className="flex items-center gap-3 rounded-xl bg-white/80 p-4">
                  <Award className="size-6 text-harvest" />
                  <div>
                    <p className="font-heading text-lg font-black text-leaf-700">{badge.name}</p>
                    <p className="text-sm leading-6 text-mutedText">{badge.requirement}</p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState title="Belum ada badge" description="Selesaikan jurnal dan quiz untuk membuka badge pertama." />
            )}
          </div>
        </EcoCard>

        <EcoCard>
          <SectionTitle eyebrow="Aktivitas terakhir" title="Jejak belajar Adit" />
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {studentTodaySummary.lastActivities.map((activity) => (
              <div key={activity.id} className="rounded-xl border border-gardenBorder bg-leaf-50/75 p-4">
                <p className="font-bold text-slateText">{activity.label}</p>
                <p className="mt-1 text-sm font-semibold text-mutedText">{activity.time}</p>
              </div>
            ))}
            <div className="rounded-xl border border-gardenBorder bg-white p-4">
              <p className="font-bold text-slateText">Refleksi tersimpan</p>
              <p className="mt-1 text-sm font-semibold text-mutedText">{storedReflections.length} cerita</p>
            </div>
            <div className="rounded-xl border border-gardenBorder bg-white p-4">
              <p className="font-bold text-slateText">Galeri pameran</p>
              <p className="mt-1 text-sm font-semibold text-mutedText">{storedGallery.length} karya</p>
            </div>
            <div className="rounded-xl border border-gardenBorder bg-white p-4">
              <p className="font-bold text-slateText">Attempt quiz</p>
              <p className="mt-1 text-sm font-semibold text-mutedText">{storedAttempts.length} rekaman</p>
            </div>
          </div>
        </EcoCard>
      </section>
    </div>
  );
}

export function EcoLearnPage() {
  const activeModule = ecogrowTeachingModules[0];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stageFilter, setStageFilter] = useState("all");
  const [reward, setReward] = useState("");
  const correct = ecoLearnChecks.filter((item) => answers[item.id] === item.answer).length;
  const filteredContents =
    stageFilter === "all"
      ? ecoLearnContents
      : ecoLearnContents.filter((content) => legacyStageToEcoGrowStage[content.relatedStage] === stageFilter);

  const finishCheck = () => {
    setReward(correct === ecoLearnChecks.length ? "Mini-check selesai. Kamu mendapat 25 EcoPoint mock!" : "Masih ada jawaban yang perlu dicoba lagi. Baca kartu konsep pelan-pelan, ya.");
  };

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <PageHero
        eyebrow="EcoLearn"
        title="Belajar singkat sebelum praktik"
        description="Pilih satu kartu, baca pelan-pelan, lalu jawab mini-check untuk memastikan kamu siap mengamati tanaman."
        icon={BookOpen}
        actions={<EcoButton href="/siswa/ecomission" variant="reward">Lanjut Misi</EcoButton>}
        metrics={[
          { label: "Durasi", value: "9 menit", note: "Materi pendek" },
          { label: "Topik", value: "6", note: "Sains dan pangan sehat" },
          { label: "Mini-check", value: `${correct}/3`, note: "Pemahaman awal" },
        ]}
      />

      <StudentSteps
        steps={[
          "Pilih tahap EcoGrow yang ingin kamu pelajari.",
          "Baca kartu konsep dan pertanyaan pentingnya.",
          "Jawab mini-check, lalu lanjutkan ke EcoMission.",
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <TeachingModuleSummaryCard module={activeModule} />
        <EcoCard>
          <SectionTitle eyebrow="Pertanyaan pemantik" title="Apa yang ingin kamu buktikan?" description="Gunakan pertanyaan ini saat membaca materi lalu tulis jawabannya pada LKPD Digital." />
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {activeModule.triggerQuestions.map((question) => (
              <p key={question} className="rounded-xl bg-leaf-50 p-4 text-sm font-bold leading-6 text-leaf-700">{question}</p>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {ecogrowDigitalLkpd.slice(0, 2).map((section) => (
              <EcoButton key={section.id} href="/siswa/ecomission" variant="secondary" size="sm">{section.title}</EcoButton>
            ))}
          </div>
        </EcoCard>
      </section>

      <section>
        <SectionTitle eyebrow="Peta belajar" title="Empat pertemuan dari observasi sampai pameran" />
        <div className="mt-5">
          <MeetingPlanTimeline meetings={activeModule.meetings} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <EcoCard tone="dark" className="min-h-80">
          <div className="grid h-full place-items-center rounded-xl border border-white/15 bg-white/10 p-6 text-center">
            <div>
              <Sun className="mx-auto size-16 text-sun" />
              <h2 className="mt-4 font-heading text-3xl font-black">Video 3 menit</h2>
              <p className="mt-3 text-white/75">Amati warna daun, arah cahaya, dan air pada kangkung.</p>
              <EcoBadge className="mt-5 bg-white/15 text-white"><Clock className="size-4" /> Tonton/Amati</EcoBadge>
            </div>
          </div>
        </EcoCard>
        <EcoCard>
          <SectionTitle eyebrow="Materi pendek" title="Pilih kartu yang paling dekat dengan misimu" />
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setStageFilter("all")}
              className={`rounded-full px-4 py-2 text-xs font-black transition ${stageFilter === "all" ? "bg-leaf-700 text-white" : "bg-leaf-50 text-leaf-700"}`}
            >
              All
            </button>
            {ecogrowStages.map((stage) => (
              <button
                key={stage.id}
                type="button"
                onClick={() => setStageFilter(stage.id)}
                className={`rounded-full px-4 py-2 text-xs font-black transition ${stageFilter === stage.id ? "bg-leaf-700 text-white" : "bg-leaf-50 text-leaf-700"}`}
              >
                {stage.title.replace("Ecological ", "").replace("Mastery & ", "")}
              </button>
            ))}
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {filteredContents.map((content) => (
              <div key={content.id} className="overflow-hidden rounded-xl border border-gardenBorder bg-white">
                {content.imageUrl ? (
                  <div className="aspect-[4/3] overflow-hidden bg-leaf-50">
                    <img src={content.imageUrl} alt={content.title} className="h-full w-full object-cover" />
                  </div>
                ) : null}
                <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  <EcoBadge className="bg-sun/25 text-earth">{content.durationMinute} menit</EcoBadge>
                  <EcoGrowStageBadge stageId={legacyStageToEcoGrowStage[content.relatedStage]} />
                </div>
                <h3 className="mt-3 font-heading text-xl font-black text-leaf-700">{content.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mutedText">{content.summary}</p>
                {content.essentialQuestion ? (
                  <p className="mt-3 rounded-lg bg-leaf-50 p-3 text-sm font-bold leading-6 text-leaf-700">
                    {content.essentialQuestion}
                  </p>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  {content.keywords.map((keyword) => <EcoBadge key={keyword} className="bg-leaf-100 text-leaf-700">{keyword}</EcoBadge>)}
                </div>
                </div>
              </div>
            ))}
          </div>
        </EcoCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <EcoCard tone="cream">
          <SectionTitle eyebrow="Glosarium anak" title="Kata penting hari ini" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Klorofil", "Zat hijau daun yang membantu menangkap cahaya."],
              ["Oksigen", "Udara baik yang dihasilkan tumbuhan."],
              ["Karbon dioksida", "Udara yang dipakai tumbuhan saat fotosintesis."],
              ["Nutrisi", "Makanan tambahan agar tanaman kuat."],
              ["Hidroponik", "Menanam dengan air bernutrisi, bukan tanah."],
            ].map(([term, note]) => (
              <div key={term} className="rounded-xl bg-white/80 p-4">
                <p className="font-heading text-lg font-black text-leaf-700">{term}</p>
                <p className="mt-1 text-sm leading-6 text-mutedText">{note}</p>
              </div>
            ))}
          </div>
        </EcoCard>
        <EcoCard>
          <SectionTitle eyebrow="Mini-check" title="Cek pemahaman ringan" />
          <div className="mt-5 space-y-4">
            {ecoLearnChecks.map((check) => (
              <div key={check.id} className="rounded-xl bg-leaf-50/75 p-4">
                <p className="font-bold text-slateText">{check.question}</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {check.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers((current) => ({ ...current, [check.id]: option }))}
                      className={`rounded-xl border p-3 text-left text-sm font-bold transition hover:-translate-y-0.5 ${
                        answers[check.id] === option ? "border-leaf-500 bg-white text-leaf-700" : "border-gardenBorder bg-white/70 text-slateText"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {answers[check.id] ? <p className="mt-3 text-sm font-semibold leading-6 text-mutedText">{answers[check.id] === check.answer ? check.feedback : "Coba lagi. Kamu boleh membaca kartu konsep dulu."}</p> : null}
              </div>
            ))}
          </div>
          <EcoButton className="mt-5" onClick={finishCheck} icon={<Sparkles className="size-4" />}>Selesai Mini-check</EcoButton>
          <div className="mt-4"><ToastMessage message={reward} /></div>
        </EcoCard>
      </section>
    </div>
  );
}

export function EcoMissionPage() {
  const { profile, activeMission, studentJournals } = getActiveStudentMock();
  const missionData = getStudentMissionMock(profile.userId);
  const [storedJournals, setStoredJournals] = useStoredList<JournalEntry>("ecogrow-journals", studentJournals);
  const [lkpdSubmissions, setLkpdSubmissions] = useStoredList<EcoGrowLkpdSubmission>("ecoGrow-lkpd-submissions", []);
  const [points, setPoints] = useStoredNumber("ecogrow-points", profile.points);
  const [selectedStage, setSelectedStage] = useState<PancanitiStage>(activeMission.stage);
  const [missionStatus, setMissionStatus] = useState(activeMission.status);
  const [toast, setToast] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState({
    date: "2026-05-08",
    plantHeightCm: "31",
    leafCount: "16",
    condition: "sehat" as JournalEntry["condition"],
    weather: "cerah" as JournalEntry["weather"],
    waterMl: "200",
    note: "Aku mengukur tanaman dan melihat daun makin lebar.",
    photoUrl: "/assets/images/hydroponic-water-spinach.jpg",
  });
  const selectedMission = missions.find((mission) => mission.stage === selectedStage) ?? activeMission;
  const personalJournals = storedJournals.filter((journal) => journal.studentId === profile.userId);
  const latestSubmission = studentMissionSubmissions.find((item) => item.studentId === profile.userId);
  const selectedStageProgress = missionData.missionStages.find((item) => item.stage === selectedStage);
  const selectedLkpd = ecogrowDigitalLkpd.find((section) => section.stageId === selectedStage) ?? ecogrowDigitalLkpd[0];
  const selectedLkpdSubmitted = lkpdSubmissions.some((submission) => submission.lkpdSectionId === selectedLkpd.id);

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitJournal = () => {
    const nextErrors = [
      !form.plantHeightCm ? "Tinggi tanaman wajib diisi." : "",
      !form.leafCount ? "Jumlah daun wajib diisi." : "",
      form.note.trim().length < 10 ? "Catatan minimal 10 karakter agar guru paham pengamatanmu." : "",
    ].filter(Boolean);

    if (nextErrors.length) {
      setErrors(nextErrors);
      setToast("");
      return;
    }

    const next: JournalEntry = {
      id: `local-${Date.now()}`,
      studentId: profile.userId,
      projectId: activeMission.projectId,
      date: form.date,
      plantHeightCm: Number(form.plantHeightCm),
      leafCount: Number(form.leafCount),
      condition: form.condition,
      weather: form.weather,
      waterMl: Number(form.waterMl),
      note: form.note.trim(),
      photoUrl: form.photoUrl,
    };
    setStoredJournals([next, ...storedJournals]);
    setPoints(points + activeMission.points);
    setMissionStatus("submitted");
    setErrors([]);
    setToast(`Jurnalmu tersimpan. Kamu mendapat ${activeMission.points} EcoPoint!`);
  };

  const saveDraft = () => {
    setMissionStatus("draft");
    setErrors([]);
    setToast("Draft jurnal tersimpan di mode simulasi. Kamu bisa kirim saat data sudah lengkap.");
  };

  const submitLkpd = (answers: Record<string, string | number | string[]>) => {
    const submission: EcoGrowLkpdSubmission = {
      id: `local-lkpd-${Date.now()}`,
      lkpdSectionId: selectedLkpd.id,
      studentId: profile.userId,
      projectId: activeMission.projectId,
      answers,
      submittedAt: "2026-05-26",
      status: "submitted",
    };
    setLkpdSubmissions([submission, ...lkpdSubmissions.filter((item) => item.lkpdSectionId !== selectedLkpd.id)]);
    setToast(`${selectedLkpd.title} tersimpan di portofolio mock.`);
  };

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <PageHero
        eyebrow="EcoMission"
        title="Kerjakan misi tanaman hari ini"
        description="Ikuti checklist, ukur tanaman, lalu kirim jurnal agar guru bisa memberi umpan balik."
        icon={Sprout}
        metrics={[
          { label: "Status", value: missionStatusLabels[missionStatus], note: "Misi aktif" },
          { label: "EcoPoint", value: String(points), note: "Bertambah setelah submit" },
          { label: "Riwayat", value: String(personalJournals.length), note: "Jurnal pribadi" },
        ]}
      />
      <StudentSteps
        steps={[
          "Lihat tahap EcoGrow yang sedang aktif.",
          "Centang tugas yang sudah kamu lakukan bersama kelompok.",
          "Isi jurnal tanaman dan kirim ke guru.",
        ]}
      />
      <StudentFocusCard
        title="Fokus hari ini: ukur, amati, ceritakan."
        description="Tidak perlu membuka semua fitur sekaligus. Selesaikan jurnal tanaman dulu, lalu lanjut ke refleksi atau portofolio."
        actionHref="#jurnal-tanaman"
        actionLabel="Isi Jurnal"
        icon={ClipboardCheck}
      />
      <EcoCard>
        <PancanitiStepper stages={missionData.missionStages} activeStage={selectedStage} onSelect={setSelectedStage} />
      </EcoCard>
      <section>
        <SectionTitle eyebrow="Progres LKPD Digital EcoGrow" title="Lima bukti dari Recognition sampai Exhibition" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {ecogrowDigitalLkpd.map((section) => (
            <div key={section.id} className="rounded-xl border border-gardenBorder bg-white p-4">
              <EcoBadge className={lkpdSubmissions.some((item) => item.lkpdSectionId === section.id) ? "bg-leaf-700 text-white" : "bg-leaf-50 text-mutedText"}>
                {lkpdSubmissions.some((item) => item.lkpdSectionId === section.id) ? "Selesai" : "Belum"}
              </EcoBadge>
              <p className="mt-3 text-sm font-black text-leaf-700">{section.title}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <EcoCard tone="cream">
          <div className="flex flex-wrap items-center gap-2">
            <EcoGrowStageBadge stageId={legacyStageToEcoGrowStage[selectedMission.stage]} />
            <StatusBadge status={selectedStageProgress?.status ?? selectedMission.status} />
          </div>
          <h2 className="mt-4 font-heading text-3xl font-black text-leaf-700">{selectedMission.title}</h2>
          <p className="mt-3 leading-7 text-mutedText">{selectedMission.instructions}</p>
          <div className="mt-5 space-y-3">
            {selectedMission.tasks.map((task) => (
              <label key={task} className="flex items-center gap-3 rounded-xl bg-white/80 p-4 font-bold text-slateText">
                <input type="checkbox" className="size-5 accent-leaf-500" />
                {task}
              </label>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-white/80 p-4 text-sm font-bold leading-6 text-mutedText">
            Bukti belajar: {selectedStageProgress?.evidence ?? "Checklist aktivitas dan jurnal ekologis."} Nilai KAIH: Ekologis, Mandiri, Humanis. Poin misi: {selectedMission.points}.
          </div>
          {selectedStageProgress?.feedback ? (
            <div className="mt-4 rounded-xl bg-white/80 p-4 text-sm font-bold leading-6 text-earth">
              Catatan tahap: {selectedStageProgress.feedback}
            </div>
          ) : null}
          {latestSubmission?.teacherFeedback ? (
            <div className="mt-4 rounded-xl bg-leaf-100 p-4 text-sm font-bold leading-6 text-leaf-700">
              Umpan balik guru: {latestSubmission.teacherFeedback}
            </div>
          ) : null}
        </EcoCard>
        <LkpdSectionCard
          section={selectedLkpd}
          mode="form"
          submitted={selectedLkpdSubmitted}
          onSubmit={submitLkpd}
        />
      </section>
      <EcoCard id="jurnal-tanaman">
          <SectionTitle eyebrow="Jurnal tanaman" title="Catat bukti hari ini" description="Isi angka yang kamu ukur. Jika belum yakin, minta teman kelompok mengecek bersama." />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-extrabold text-mutedText">
              Tanggal
              <input className={inputClass} type="date" value={form.date} onChange={(event) => updateForm("date", event.target.value)} />
            </label>
            <label className="block space-y-2 text-sm font-extrabold text-mutedText">
              Tinggi tanaman (cm)
              <input className={inputClass} type="number" value={form.plantHeightCm} onChange={(event) => updateForm("plantHeightCm", event.target.value)} />
            </label>
            <label className="block space-y-2 text-sm font-extrabold text-mutedText">
              Jumlah daun
              <input className={inputClass} type="number" value={form.leafCount} onChange={(event) => updateForm("leafCount", event.target.value)} />
            </label>
            <label className="block space-y-2 text-sm font-extrabold text-mutedText">
              Kondisi tanaman
              <select className={inputClass} value={form.condition} onChange={(event) => updateForm("condition", event.target.value)}>
                <option value="sehat">Sehat</option>
                <option value="layu">Layu</option>
                <option value="kuning">Kuning</option>
                <option value="perlu_perawatan">Perlu perawatan</option>
              </select>
            </label>
            <label className="block space-y-2 text-sm font-extrabold text-mutedText">
              Cuaca
              <select className={inputClass} value={form.weather} onChange={(event) => updateForm("weather", event.target.value)}>
                <option value="cerah">Cerah</option>
                <option value="mendung">Mendung</option>
                <option value="hujan">Hujan</option>
              </select>
            </label>
            <label className="block space-y-2 text-sm font-extrabold text-mutedText">
              Jumlah air (ml)
              <input className={inputClass} type="number" value={form.waterMl} onChange={(event) => updateForm("waterMl", event.target.value)} />
            </label>
          </div>
          <label className="mt-4 block space-y-2 text-sm font-extrabold text-mutedText">
            Catatan pengamatan
            <textarea className={`${inputClass} min-h-28 py-3`} value={form.note} onChange={(event) => updateForm("note", event.target.value)} />
          </label>
          <label className="mt-4 block space-y-2 text-sm font-extrabold text-mutedText">
            URL foto mock
            <input className={inputClass} value={form.photoUrl} onChange={(event) => updateForm("photoUrl", event.target.value)} />
          </label>
          <MockUploadBox className="mt-4" previewUrl={form.photoUrl} title="Preview foto jurnal" description="Foto ini menjadi bukti Ecological Execution (Niti Bukti) sebelum dikirim ke guru." />
          {errors.length ? (
            <div className="mt-4 space-y-2">
              {errors.map((error) => <p key={error} className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>)}
            </div>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-3">
            <EcoButton variant="secondary" icon={<ClipboardCheck className="size-4" />} onClick={saveDraft}>Simpan Draft</EcoButton>
            <EcoButton icon={<Send className="size-4" />} onClick={submitJournal}>Kirim ke Guru</EcoButton>
          </div>
          <div className="mt-4"><ToastMessage message={toast} /></div>
      </EcoCard>
      <section>
        <SectionTitle eyebrow="Evidence preview" title="Bukti belajar yang masuk portofolio" />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {missionData.evidence.map((item) => (
            <EvidencePreview key={item.id} evidence={item} />
          ))}
        </div>
      </section>
      <EcoCard>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionTitle eyebrow="Riwayat jurnal" title="3 catatan terbarumu" />
          <EcoButton href="/siswa/portofolio" variant="secondary" size="sm">Lihat semua di Portofolio</EcoButton>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {personalJournals.length ? personalJournals.slice(0, 3).map((journal) => (
            <div key={journal.id} className="rounded-xl bg-leaf-50 p-4">
              <p className="text-sm font-extrabold text-leaf-500">{journal.date}</p>
              <p className="mt-2 font-heading text-xl font-black text-leaf-700">{journal.plantHeightCm} cm, {journal.leafCount} daun</p>
              <p className="mt-2 text-sm leading-6 text-mutedText">{journal.note}</p>
            </div>
          )) : <EmptyState title="Belum ada jurnal" description="Isi pengamatan pertama untuk melihat riwayatmu." />}
        </div>
      </EcoCard>
    </div>
  );
}

export function EcoPlayPage() {
  const question = quizzes[0].questions[6];
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useStoredNumber("ecogrow-ecoplay-score", 0);
  const [sequence, setSequence] = useState(["Cahaya", "Daun", "Air", "Makanan", "Oksigen"]);
  const [toast, setToast] = useState("");
  const correctSequence = ecoPlayGames[1].correctSequence ?? ["Cahaya", "Daun", "Air", "Makanan", "Oksigen"];
  const sequenceCorrect = sequence.join("|") === correctSequence.join("|");

  const chooseAnswer = (option: string) => {
    setAnswer(option);
    if (option === question.answer) {
      setScore(score + 30);
      setToast("Benar. Kamu mendapat 30 EcoPoint mock dari quiz kilat!");
    } else {
      setToast("Coba lagi. Perhatikan air, cahaya, dan kondisi daun.");
    }
  };

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <PageHero
        eyebrow="EcoPlay"
        title="Bermain sambil mengingat konsep"
        description="Permainan dibuat pendek agar kamu bisa latihan tanpa kehilangan fokus pada misi tanaman."
        icon={Trophy}
        metrics={[
          { label: "Mode", value: String(ecoPlayGames.length), note: "Quiz, puzzle, detektif" },
          { label: "Skor", value: String(score), note: "Reward lokal" },
          { label: "HOTS", value: "C4-C5", note: "Analisis ringan" },
        ]}
      />
      <StudentSteps
        steps={[
          "Jawab quiz kilat terlebih dahulu.",
          "Mainkan detektif tanaman layu.",
          "Susun puzzle fotosintesis sampai urutannya masuk akal.",
        ]}
      />
      <section className="grid gap-6 xl:grid-cols-3">
        <EcoCard className="xl:col-span-2">
          <EcoBadge className="bg-sun/25 text-earth">{ecoPlayGames[0].rewardPoints} poin</EcoBadge>
          <h2 className="mt-4 font-heading text-2xl font-black text-leaf-700">Quiz kilat fotosintesis</h2>
          <p className="mt-4 text-lg font-bold leading-8 text-slateText">{question.question}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {question.options.map((option) => (
              <button key={option} className={`rounded-xl border p-4 text-left font-bold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-sun/60 ${answer === option ? "border-leaf-500 bg-leaf-100 text-leaf-700" : "border-gardenBorder bg-white text-slateText hover:border-leaf-500/40"}`} onClick={() => chooseAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          {answer ? <p className="mt-4 rounded-xl bg-sun/25 p-4 font-bold text-earth">{answer === question.answer ? "Benar!" : "Coba lagi."} {question.explanation}</p> : null}
          <div className="mt-4"><ToastMessage message={toast} /></div>
        </EcoCard>
        <EcoCard tone="cream">
          <h2 className="font-heading text-2xl font-black text-leaf-700">Detektif tanaman layu</h2>
          <p className="mt-3 leading-7 text-mutedText">{ecoPlayGames[2].scenario}</p>
          <div className="mt-5 space-y-3">
            {["Cek air dan cahaya", "Mencabut tanaman", "Menutup tanaman seharian"].map((choice, index) => (
              <button key={choice} onClick={() => setToast(index === 0 ? "Pilihan bijak. Amati dulu, lalu catat buktinya." : "Hmm, coba pikirkan cara yang lebih sayang tanaman.")} className="w-full rounded-xl border border-gardenBorder bg-white/80 p-3 text-left font-bold text-slateText transition hover:-translate-y-0.5">
                {choice}
              </button>
            ))}
          </div>
        </EcoCard>
      </section>
      <EcoCard>
        <SectionTitle eyebrow="Puzzle urutan" title="Susun alur fotosintesis" description="Klik chip untuk memindahkannya ke ujung barisan." />
        <div className="mt-5 flex flex-wrap gap-3">
          {sequence.map((item, index) => (
            <button
              key={`${item}-${index}`}
              className="rounded-xl bg-leaf-100 px-4 py-3 font-heading font-black text-leaf-700 transition hover:-translate-y-0.5 hover:bg-sun/35 focus-visible:outline focus-visible:outline-4 focus-visible:outline-sun/60"
              onClick={() => setSequence((current) => [...current.slice(1), current[0]])}
            >
              {index + 1}. {item}
            </button>
          ))}
        </div>
        <p className={`mt-5 rounded-xl p-4 font-bold leading-7 ${sequenceCorrect ? "bg-leaf-100 text-leaf-700" : "bg-cream text-earth"}`}>
          {sequenceCorrect ? "Urutannya tepat: cahaya, daun/klorofil, air, makanan, lalu oksigen." : "Coba susun: cahaya -> daun/klorofil -> air + CO2 -> makanan -> oksigen."}
        </p>
      </EcoCard>
    </div>
  );
}

export function EcomartPage() {
  const totalKg = harvestImpactSummary.totalVegetableKg;

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <PageHero
        eyebrow="Ecomart"
        title="Panen untuk belajar dan berbagi"
        description="Lihat hasil panen kelas sebagai bukti belajar pangan sehat. Halaman ini bukan tempat jual-beli."
        icon={ShoppingBasket}
        metrics={[
          { label: "Sayur", value: `${totalKg.toFixed(1)} kg`, note: "Kontribusi pangan sehat" },
          { label: "Kompos", value: `${harvestImpactSummary.totalCompostKg} kg`, note: "Dipakai kembali" },
          { label: "Bibit", value: String(harvestImpactSummary.totalSeedlings), note: "Proyek berikutnya" },
        ]}
      />
      <StudentSteps
        steps={[
          "Lihat hasil panen tiap kelompok.",
          "Baca manfaatnya untuk kelas dan sekolah.",
          "Tulis cerita singkat tentang panen.",
        ]}
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {harvests.map((harvest) => (
          <EcoCard key={harvest.id} tone="cream">
            {harvest.imageUrl ? (
              <div className="-mx-5 -mt-5 mb-4 aspect-[4/3] overflow-hidden bg-leaf-50">
                <img src={harvest.imageUrl} alt={harvest.productName} className="h-full w-full object-cover" />
              </div>
            ) : null}
            <ShoppingBasket className="size-8 text-harvest" />
            <h2 className="mt-4 font-heading text-2xl font-black text-leaf-700">{harvest.productName}</h2>
            <p className="mt-2 font-heading text-4xl font-black text-earth">{harvest.quantity} {harvest.unit}</p>
            <p className="mt-2 text-sm font-bold text-leaf-700">{harvest.groupName}</p>
            {harvest.harvestedAt ? <p className="mt-1 text-xs font-extrabold uppercase tracking-wide text-mutedText">Panen {harvest.harvestedAt}</p> : null}
            <p className="mt-3 text-sm leading-6 text-mutedText">{harvest.contributionNote}</p>
            {harvest.impactMetric ? <EcoBadge className="mt-4 bg-leaf-100 text-leaf-700">{harvest.impactMetric}</EcoBadge> : null}
          </EcoCard>
        ))}
      </section>
      <EcoCard>
        <SectionTitle eyebrow="Dampak pangan sehat" title="Catatan kontribusi kelas" description={harvestImpactSummary.contributionText} />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {["Apa yang kamu pelajari dari proses panen?", "Bagaimana hasil panen membantu sekolah?"].map((question) => (
            <label key={question} className="block space-y-2 text-sm font-extrabold text-mutedText">
              {question}
              <textarea className={`${inputClass} min-h-24 py-3`} placeholder="Tulis ceritamu tentang panen di sini." />
            </label>
          ))}
        </div>
      </EcoCard>
    </div>
  );
}

export function StudentGalleryPage() {
  const { profile } = getActiveStudentMock();
  const [posts, setPosts] = useStoredList<GalleryPost>("ecogrow-gallery", galleryPosts);
  const [filter, setFilter] = useState<GalleryCategory | "semua">("semua");
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({
    title: "Foto Kangkung Terbaru",
    description: "Daun kangkung kelompokku makin hijau setelah air diganti.",
    supportingData: "Tinggi 31 cm, 16 daun, air nutrisi 200 ml.",
    imageUrl: "/assets/images/hydroponic-water-spinach.jpg",
    category: "foto_tanaman" as GalleryCategory,
    stage: "NITI_SAJATI" as PancanitiStage,
  });
  const filteredPosts = filter === "semua" ? posts : posts.filter((post) => post.category === filter);

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const addPost = () => {
    const next: GalleryPost = {
      id: `local-gallery-${Date.now()}`,
      studentId: profile.userId,
      projectId: "proyek-kangkung",
      title: form.title,
      description: form.description,
      supportingData: form.supportingData,
      imageUrl: form.imageUrl,
      createdAt: "2026-05-08",
      likes: 0,
      category: form.category,
      stage: form.stage,
      moderationStatus: "pending",
    };
    setPosts([next, ...posts]);
    setToast("Karya galeri berhasil ditambahkan ke pameran mock.");
  };

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <PageHero
        eyebrow="Galeri project"
        title="EcoGrow Exhibition Gallery"
        description="Unggah evidence Ecological Mastery & Exhibition: foto tanaman, poster, panen, atau laporan proyek."
        icon={Camera}
        actions={<EcoButton icon={<Camera className="size-4" />} onClick={addPost} variant="reward">Upload karya</EcoButton>}
        metrics={[
          { label: "Karya", value: String(posts.length), note: "Tersimpan lokal" },
          { label: "Filter", value: galleryCategories.length.toString(), note: "Kategori pameran" },
          { label: "Status", value: "Moderasi", note: "Pending atau tampil" },
        ]}
      />
      <StudentSteps
        steps={[
          "Tulis judul karya dengan singkat.",
          "Pilih kategori dan tahap EcoGrow.",
          "Cek preview gambar, lalu tambah ke galeri.",
        ]}
      />
      <EcoCard tone="cream">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr_0.8fr_0.8fr]">
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Judul karya
            <input className={inputClass} value={form.title} onChange={(event) => updateForm("title", event.target.value)} />
          </label>
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Deskripsi
            <input className={inputClass} value={form.description} onChange={(event) => updateForm("description", event.target.value)} />
          </label>
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Kategori
            <select className={inputClass} value={form.category} onChange={(event) => updateForm("category", event.target.value)}>
              {galleryCategories.filter((item) => item.id !== "semua").map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <label className="block space-y-2 text-sm font-extrabold text-mutedText">
            Tahap EcoGrow
            <select className={inputClass} value={form.stage} onChange={(event) => updateForm("stage", event.target.value)}>
              {missions.map((mission) => <option key={mission.stage} value={mission.stage}>{stageLabel[mission.stage]}</option>)}
            </select>
          </label>
        </div>
        <label className="mt-4 block space-y-2 text-sm font-extrabold text-mutedText">
          Data pendukung karya
          <input className={inputClass} value={form.supportingData} onChange={(event) => updateForm("supportingData", event.target.value)} />
        </label>
        <label className="mt-4 block space-y-2 text-sm font-extrabold text-mutedText">
          URL gambar atau asset contoh
          <input className={inputClass} value={form.imageUrl} onChange={(event) => updateForm("imageUrl", event.target.value)} />
        </label>
        <div className="mt-4 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-white/80">
            <img src={form.imageUrl} alt="Preview karya" className="h-full w-full object-contain p-4" />
          </div>
          <div>
            <p className="font-heading text-2xl font-black text-leaf-700">Karya terbaik akan masuk Ecological Mastery & Exhibition (Niti Sajati).</p>
            <p className="mt-3 leading-7 text-mutedText">Tuliskan cerita karya dengan bahasa sendiri agar guru dan teman bisa memberi apresiasi.</p>
            <EcoButton className="mt-5" icon={<Plus className="size-4" />} onClick={addPost}>Tambah ke galeri</EcoButton>
          </div>
        </div>
        <div className="mt-4"><ToastMessage message={toast} /></div>
      </EcoCard>
      <div className="flex flex-wrap gap-2">
        {galleryCategories.map((category) => (
          <button key={category.id} onClick={() => setFilter(category.id)} className={`rounded-xl px-4 py-2 text-sm font-extrabold transition hover:-translate-y-0.5 ${filter === category.id ? "bg-leaf-700 text-white" : "bg-white text-leaf-700 shadow-soft"}`}>
            {category.label}
          </button>
        ))}
      </div>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredPosts.length ? filteredPosts.map((post) => {
          const owner = users.find((user) => user.id === post.studentId);
          const ownerProfile = studentProfiles.find((item) => item.userId === post.studentId);
          return (
            <EcoCard key={post.id}>
              <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-leaf-50">
                <img src={post.imageUrl} alt={post.title} className="h-full w-full object-contain p-6" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <EcoBadge className="bg-sun/25 text-earth">{post.category ?? "foto_tanaman"}</EcoBadge>
                {post.stage ? <EcoGrowStageBadge stageId={legacyStageToEcoGrowStage[post.stage]} /> : null}
                <EcoBadge className="bg-leaf-100 text-leaf-700">
                  {post.moderationStatus === "approved"
                    ? "Siap Eco-Exhibition"
                    : post.moderationStatus === "revision"
                      ? "Perlu revisi"
                      : "Menunggu validasi"}
                </EcoBadge>
              </div>
              <h2 className="mt-3 font-heading text-2xl font-black text-leaf-700">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-mutedText">{post.description}</p>
              {post.supportingData ? <p className="mt-3 rounded-xl bg-leaf-50 p-3 text-xs font-bold text-leaf-700">Evidence Niti Sajati: {post.supportingData}</p> : null}
              <p className="mt-3 text-sm font-bold text-slateText">{owner?.name ?? "Siswa"} - {ownerProfile?.groupName ?? "Kelompok"}</p>
              <EcoBadge className="mt-4 bg-sun/25 text-earth">{post.likes} apresiasi</EcoBadge>
            </EcoCard>
          );
        }) : <EmptyState title="Belum ada karya" description="Tambahkan karya pertama untuk membuka pameran EcoGrow." />}
      </section>
    </div>
  );
}

export function QuizPage() {
  const { profile } = getActiveStudentMock();
  const quiz = quizzes[0];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [attempts, setAttempts] = useStoredList<QuizAttempt>("ecogrow-quiz-attempts", quizAttemptsMock);
  const [finished, setFinished] = useState(false);
  const correctCount = quiz.questions.filter((question) => answers[question.id] === question.answer).length;
  const score = Math.round((correctCount / quiz.questions.length) * 100);
  const answeredCount = Object.keys(answers).length;
  const category = score >= 90 ? "Sangat baik" : score >= 80 ? "Baik" : "Perlu penguatan";
  const recommendation = score >= 80 ? "Lanjut EcoMission dan buat poster kecil tentang fotosintesis." : "Ulang EcoLearn, lalu coba lagi pertanyaan tentang cahaya dan air.";

  const finishQuiz = () => {
    const next: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      quizId: quiz.id,
      studentId: profile.userId,
      score,
      totalQuestions: quiz.questions.length,
      correctCount,
      completedAt: "2026-05-08T09:30:00",
      recommendation,
    };
    setAttempts([next, ...attempts]);
    setFinished(true);
  };

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <PageHero
        eyebrow="EcoMaster Quiz"
        title="Fotosintesis dan Siklus Energi"
        description="Jawab satu per satu. Setelah selesai, kamu akan melihat skor dan saran belajar berikutnya."
        icon={ClipboardCheck}
        actions={<EcoButton disabled={answeredCount < quiz.questions.length} onClick={finishQuiz} variant="reward">Selesai dan Simpan Attempt</EcoButton>}
        metrics={[
          { label: "Jenis", value: quiz.type, note: "Assessment for learning" },
          { label: "Progress", value: `${answeredCount}/${quiz.questions.length}`, note: "Soal terjawab" },
          { label: "Target", value: "80", note: "Minimal baik" },
        ]}
      />
      <StudentSteps
        steps={[
          "Baca soal sampai selesai.",
          "Pilih jawaban yang menurutmu paling tepat.",
          "Simpan hasil setelah semua soal terjawab.",
        ]}
      />
      <EcoProgress value={(answeredCount / quiz.questions.length) * 100} label={`Soal ${Math.min(answeredCount + 1, quiz.questions.length)} dari ${quiz.questions.length}`} color="yellow" />
      <section className="grid gap-4">
        {quiz.questions.map((question, index) => (
          <EcoCard key={question.id}>
            <div className="flex flex-wrap items-center gap-2">
              <EcoBadge className="bg-leaf-100 text-leaf-700">{question.cognitiveLevel}</EcoBadge>
              <EcoBadge className="bg-sun/25 text-earth">Soal {index + 1}</EcoBadge>
            </div>
            <h2 className="mt-4 font-heading text-xl font-black text-leaf-700">{question.question}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {question.options.map((option) => (
                <button key={option} className={`rounded-xl border p-4 text-left font-bold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-sun/60 ${answers[question.id] === option ? "border-leaf-500 bg-leaf-100 text-leaf-700 shadow-soft" : "border-gardenBorder bg-white text-slateText hover:border-leaf-500/40"}`} onClick={() => setAnswers({ ...answers, [question.id]: option })}>
                  {option}
                </button>
              ))}
            </div>
            {answers[question.id] ? (
              <p className={`mt-4 rounded-xl p-4 font-bold leading-6 ${answers[question.id] === question.answer ? "bg-leaf-100 text-leaf-700" : "bg-red-50 text-red-700"}`}>
                {answers[question.id] === question.answer ? "Benar. " : "Belum tepat. "} {question.explanation}
              </p>
            ) : null}
          </EcoCard>
        ))}
      </section>
      {finished ? (
        <EcoCard tone="cream">
          <SectionTitle eyebrow="Hasil akhir" title={`${score} - ${category}`} description={recommendation} />
        </EcoCard>
      ) : null}
      <EcoCard>
        <SectionTitle eyebrow="Riwayat attempt" title="Catatan quiz tersimpan" />
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {attempts.length ? attempts.slice(0, 4).map((attempt) => (
            <div key={attempt.id} className="rounded-xl bg-leaf-50 p-4">
              <p className="font-heading text-2xl font-black text-leaf-700">{attempt.score}</p>
              <p className="mt-1 text-sm font-bold text-slateText">{attempt.correctCount}/{attempt.totalQuestions} benar</p>
              <p className="mt-2 text-sm leading-6 text-mutedText">{attempt.recommendation}</p>
            </div>
          )) : <EmptyState title="Kuis belum dikerjakan" description="Selesaikan quiz untuk menyimpan attempt pertama." />}
        </div>
      </EcoCard>
    </div>
  );
}

export function ReflectionPage() {
  const { profile } = getActiveStudentMock();
  const [storedReflections, setStoredReflections] = useStoredList<ReflectionEntry>("ecogrow-reflections", reflections);
  const [storedSelfAssessments, setStoredSelfAssessments] = useStoredList<{ id: string; selected: string[] }>("ecoGrow-self-assessments", []);
  const [storedPeerAssessments, setStoredPeerAssessments] = useStoredList<{ id: string; selected: string[]; note: string }>("ecoGrow-peer-assessments", []);
  const [selfSelected, setSelfSelected] = useState<string[]>([]);
  const [peerSelected, setPeerSelected] = useState<string[]>([]);
  const [peerNote, setPeerNote] = useState("Temanku membantu mencatat data tanaman dengan teliti.");
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({
    feeling: "Lebih peduli" as ReflectionEntry["feeling"],
    lessonLearned: "Hari ini aku melihat daun kangkung semakin hijau.",
    problemSolved: "Masalah tim kami adalah air berkurang, lalu kami menambah air secukupnya.",
    teamworkNote: "Kami berbagi tugas: mengukur, mencatat, dan mengambil foto.",
    ecologicalPromise: "Aku berjanji hemat air saat merawat tanaman.",
  });

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = () => {
    const next: ReflectionEntry = {
      id: `local-reflection-${Date.now()}`,
      studentId: profile.userId,
      projectId: "proyek-kangkung",
      feeling: form.feeling,
      lessonLearned: form.lessonLearned,
      problemSolved: form.problemSolved,
      teamworkNote: form.teamworkNote,
      ecologicalPromise: form.ecologicalPromise,
      createdAt: "2026-05-08T10:00:00",
      relatedStage: "NITI_BAKTI",
      kaihFocus: ["ekologis", "adaptif", "humanis"],
    };
    setStoredReflections([next, ...storedReflections]);
    setStoredSelfAssessments([{ id: `self-${Date.now()}`, selected: selfSelected }, ...storedSelfAssessments]);
    setStoredPeerAssessments([{ id: `peer-${Date.now()}`, selected: peerSelected, note: peerNote }, ...storedPeerAssessments]);
    setToast("Refleksi tersimpan. Terima kasih sudah Berguru pada Bumi.");
  };

  return (
    <div className="living-page mx-auto max-w-6xl space-y-6">
      <PageHero
        eyebrow="Cerita Belajarku"
        title="Ecological Reflection (Niti Bakti)"
        description="Tulis cerita pendek tentang perubahan tanaman, tindakanmu, kendala, dan makna kegiatan hari ini."
        icon={HeartHandshake}
        metrics={[
          { label: "Cerita", value: String(storedReflections.length), note: "Riwayat refleksi" },
          { label: "Fokus", value: "KAIH", note: "Karakter bertumbuh" },
          { label: "Asesmen", value: "As learning", note: "Belajar menyadari proses" },
        ]}
      />
      <StudentSteps
        steps={[
          "Pilih perasaan hari ini.",
          "Jawab pertanyaan refleksi dengan kalimat sendiri.",
          "Kirim cerita agar masuk portofolio.",
        ]}
      />
      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <EcoCard>
          <SectionTitle eyebrow="Form refleksi" title="Tulis ceritamu hari ini" />
          <label className="mt-5 block space-y-2 text-sm font-extrabold text-mutedText">
            Perasaan hari ini
            <select className={inputClass} value={form.feeling} onChange={(event) => updateForm("feeling", event.target.value)}>
              {["Bangga", "Senang", "Lebih peduli", "Masih belajar", "Bingung tetapi ingin mencoba"].map((feeling) => <option key={feeling}>{feeling}</option>)}
            </select>
          </label>
          {[
            ["lessonLearned", "Hal baru apa yang kamu pahami tentang cahaya, tumbuhan, makanan, dan kehidupan manusia?"],
            ["problemSolved", "Apa kendala yang kamu temui, dan bagaimana kamu memperbaikinya?"],
            ["teamworkNote", "Bagian kegiatan mana yang paling kamu sukai dan bagaimana kelompokmu bekerja sama?"],
            ["ecologicalPromise", "Janji Aksi Ekologis apa yang akan kamu lakukan setelah pembelajaran ini?"],
          ].map(([field, label]) => (
            <label key={field} className="mt-4 block space-y-2 text-sm font-extrabold text-mutedText">
              {label}
              <textarea className={`${inputClass} min-h-24 py-3`} value={form[field as keyof typeof form]} onChange={(event) => updateForm(field as keyof typeof form, event.target.value)} />
            </label>
          ))}
          <EcoButton className="mt-5" onClick={submit} icon={<Send className="size-4" />}>Submit refleksi</EcoButton>
          <div className="mt-4"><ToastMessage message={toast} /></div>
        </EcoCard>
        <EcoCard tone="cream">
          <SectionTitle eyebrow="KAIH" title="Hubungan refleksi dengan karakter" />
          <div className="mt-5 space-y-3">
            {[
              ["Ekologis", "Janji menjaga lingkungan."],
              ["Mandiri", "Menyelesaikan tugas dengan sadar."],
              ["Adaptif", "Mencari solusi saat gagal."],
              ["Inovatif", "Mencoba cara baru."],
              ["Humanis", "Bekerja sama dengan tim."],
            ].map(([title, note]) => (
              <div key={title} className="rounded-xl bg-white/80 p-4">
                <p className="font-heading text-lg font-black text-leaf-700">{title}</p>
                <p className="mt-1 text-sm leading-6 text-mutedText">{note}</p>
              </div>
            ))}
          </div>
        </EcoCard>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <SelfPeerChecklist title="Self-assessment" items={selfAssessmentChecklist} selected={selfSelected} onChange={setSelfSelected} />
        <div className="space-y-4">
          <SelfPeerChecklist title="Peer-assessment" items={peerAssessmentChecklist} selected={peerSelected} onChange={setPeerSelected} />
          <EcoCard className="p-4">
            <label className="block space-y-2 text-sm font-extrabold text-mutedText">
              Catatan positif untuk temanmu
              <textarea className={`${inputClass} min-h-20 py-3`} value={peerNote} onChange={(event) => setPeerNote(event.target.value)} />
            </label>
          </EcoCard>
        </div>
      </section>
      <EcoCard>
        <SectionTitle eyebrow="Riwayat refleksi" title="Cerita terdahulu" />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {storedReflections.length ? storedReflections.slice(0, 4).map((reflection) => (
            <div key={reflection.id} className="rounded-xl bg-leaf-50 p-4">
              <EcoBadge className="bg-sun/25 text-earth">{reflection.feeling}</EcoBadge>
              <p className="mt-3 font-bold leading-7 text-slateText">{reflection.lessonLearned}</p>
              <p className="mt-2 text-sm leading-6 text-mutedText">{reflection.ecologicalPromise}</p>
            </div>
          )) : <EmptyState title="Belum ada refleksi" description="Tulis cerita pertamamu setelah menjalankan misi." />}
        </div>
      </EcoCard>
    </div>
  );
}

export function EcoChallengePage() {
  const [challengeList, setChallengeList] = useStoredList<EcoChallenge>("ecogrow-challenges", ecoChallenges);
  const [selectedId, setSelectedId] = useState(challengeList[0]?.id ?? ecoChallenges[0].id);
  const [toast, setToast] = useState("");
  const [proof, setProof] = useState({
    story: "Aku menyiram tanaman dengan air secukupnya bersama keluarga.",
    imageUrl: "/assets/images/gardening-activity-unsplash.jpg",
    parentNote: "Orang tua melihat Adit mencoba hemat air.",
    done: false,
  });
  const selected = challengeList.find((challenge) => challenge.id === selectedId) ?? challengeList[0];

  const submitProof = () => {
    setChallengeList(challengeList.map((challenge) => challenge.id === selected.id ? { ...challenge, status: "submitted" } : challenge));
    setToast("Tantangan dikirim. Pesan Guru akan segera datang.");
  };

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6">
      <PageHero
        eyebrow="Tantangan Rumah"
        title="Tantangan hijau di rumah"
        description="Pilih satu aksi kecil di rumah, lakukan bersama keluarga, lalu kirim bukti sederhana."
        icon={Droplets}
        metrics={[
          { label: "Tantangan", value: String(challengeList.length), note: "Pilihan aktif" },
          { label: "Status", value: challengeStatusLabels[selected.status], note: "Tantangan dipilih" },
          { label: "Poin", value: String(selected.rewardPoints), note: "Hadiah setelah disetujui" },
        ]}
      />
      <StudentSteps
        steps={[
          "Pilih tantangan yang bisa kamu lakukan.",
          "Ikuti tugasnya dan minta bantuan keluarga jika perlu.",
          "Kirim cerita dan foto bukti.",
        ]}
      />
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
          {challengeList.map((challenge) => (
            <EcoCard key={challenge.id} tone={selected.id === challenge.id ? "cream" : "white"}>
              <button type="button" onClick={() => setSelectedId(challenge.id)} className="w-full text-left">
                {challenge.imageUrl ? (
                  <div className="-mx-5 -mt-5 mb-4 aspect-[16/9] overflow-hidden bg-leaf-50">
                    <img src={challenge.imageUrl} alt={challenge.title} className="h-full w-full object-cover" />
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  <EcoBadge className="bg-leaf-100 text-leaf-700">{challengeStatusLabels[challenge.status]}</EcoBadge>
                  {challenge.type ? (
                    <EcoBadge className={challenge.type === "remedial" ? "bg-sun/25 text-earth" : challenge.type === "enrichment" ? "bg-sky/15 text-sky" : "bg-white text-mutedText"}>
                      {challengeTypeLabels[challenge.type]}
                    </EcoBadge>
                  ) : null}
                </div>
                <h2 className="mt-4 font-heading text-2xl font-black text-leaf-700">{challenge.title}</h2>
                <p className="mt-2 text-sm leading-6 text-mutedText">{challenge.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <EcoBadge className="bg-sun/25 text-earth">{challenge.durationDays} hari</EcoBadge>
                  <EcoBadge className="bg-white text-mutedText">{challenge.rewardPoints} poin</EcoBadge>
                  {challenge.kaihFocus.map((focus) => <EcoBadge key={focus} className="bg-leaf-100 text-leaf-700">{kaihLabels[focus]}</EcoBadge>)}
                </div>
              </button>
            </EcoCard>
          ))}
        </div>
        <EcoCard>
          <SectionTitle eyebrow="Detail tantangan" title={selected.title} description={selected.description} />
          {selected.imageUrl ? (
            <div className="mt-5 aspect-[16/9] overflow-hidden rounded-xl bg-leaf-50">
              <img src={selected.imageUrl} alt={selected.title} className="h-full w-full object-cover" />
            </div>
          ) : null}
          <div className="mt-5 space-y-3">
            {selected.tasks.map((task) => (
              <label key={task} className="flex items-center gap-3 rounded-xl bg-leaf-50 p-4 font-bold text-slateText">
                <input type="checkbox" className="size-5 accent-leaf-500" />
                {task}
              </label>
            ))}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-extrabold text-mutedText">
              Cerita singkat
              <textarea className={`${inputClass} min-h-28 py-3`} value={proof.story} onChange={(event) => setProof((current) => ({ ...current, story: event.target.value }))} />
            </label>
            <label className="block space-y-2 text-sm font-extrabold text-mutedText">
              Catatan orang tua
              <textarea className={`${inputClass} min-h-28 py-3`} value={proof.parentNote} onChange={(event) => setProof((current) => ({ ...current, parentNote: event.target.value }))} />
            </label>
          </div>
          <label className="mt-4 block space-y-2 text-sm font-extrabold text-mutedText">
            URL bukti gambar
            <input className={inputClass} value={proof.imageUrl} onChange={(event) => setProof((current) => ({ ...current, imageUrl: event.target.value }))} />
          </label>
          <MockUploadBox className="mt-4" previewUrl={proof.imageUrl} title="Pratinjau bukti tantangan" description="Bukti ini akan masuk ke Album Belajarku setelah disetujui guru." />
          {selected.parentPrompt ? <p className="mt-4 rounded-xl bg-cream p-4 text-sm font-bold leading-6 text-earth">{selected.parentPrompt}</p> : null}
          {selected.evidenceHint ? <p className="mt-3 rounded-xl bg-leaf-50 p-4 text-sm font-bold leading-6 text-leaf-700">{selected.evidenceHint}</p> : null}
          <label className="mt-4 flex items-center gap-3 rounded-xl bg-leaf-50 p-4 font-bold text-slateText">
            <input type="checkbox" checked={proof.done} onChange={(event) => setProof((current) => ({ ...current, done: event.target.checked }))} className="size-5 accent-leaf-500" />
            Aku sudah menyelesaikan langkah tantangan ini.
          </label>
          <EcoButton className="mt-5" onClick={submitProof} disabled={!proof.done} icon={<Send className="size-4" />}>Kirim bukti</EcoButton>
          <div className="mt-4"><ToastMessage message={toast} /></div>
        </EcoCard>
      </section>
    </div>
  );
}

export function PortfolioPage() {
  const { user, profile, studentBadges, studentJournals } = getActiveStudentMock();
  const dashboard = getStudentDashboardMock(profile.userId);
  const portfolio = getStudentPortfolioMock(profile.userId);
  const [storedJournals] = useStoredList<JournalEntry>("ecogrow-journals", studentJournals);
  const [storedReflections] = useStoredList<ReflectionEntry>("ecogrow-reflections", reflections);
  const [storedGallery] = useStoredList<GalleryPost>("ecogrow-gallery", galleryPosts);
  const [storedAttempts] = useStoredList<QuizAttempt>("ecogrow-quiz-attempts", quizAttemptsMock);
  const [storedChallenges] = useStoredList<EcoChallenge>("ecogrow-challenges", ecoChallenges);
  const [readinessResult] = useMockStorage<EcoReadinessResult | null>("ecoGrow-readiness-result", null);
  const [ecoMasterResult] = useMockStorage<EcoMasterResult | null>("ecoGrow-ecomaster-results", null);
  const [lkpdSubmissions] = useMockStorage<EcoGrowLkpdSubmission[]>("ecoGrow-lkpd-submissions", []);
  const latestJournal = storedJournals.filter((journal) => journal.studentId === profile.userId).at(-1);
  const latestAttempt = storedAttempts[0];

  return (
    <div className="living-page mx-auto max-w-7xl space-y-6 print:bg-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle eyebrow="Portofolio digital" title={`${user.name} Eco Explorer`} description="Satu tempat untuk melihat jurnal, karya, quiz, refleksi, dan badge yang sudah kamu kumpulkan." />
        <EcoButton icon={<Printer className="size-4" />} onClick={() => window.print()} variant="secondary">Cetak Ringkasan</EcoButton>
      </div>
      <StudentSteps
        steps={[
          "Lihat ringkasan poin dan karakter.",
          "Cek jejak belajar dari Recognition sampai Exhibition.",
          "Pilih bukti terbaik untuk diceritakan ke guru atau orang tua.",
        ]}
      />
      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <EcoCard tone="dark">
          <Leaf className="size-14 text-sun" />
          <h2 className="mt-4 font-heading text-4xl font-black">{user.name}</h2>
          <p className="mt-2 text-white/75">{profile.groupName} - Kelas 4B</p>
          <p className="mt-6 font-heading text-5xl font-black">{profile.points}</p>
          <p className="text-sm font-bold text-white/75">EcoPoint, Level {profile.level}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {studentBadges.map((badge) => <EcoBadge key={badge.id} className="bg-white/15 text-white">{badge.name}</EcoBadge>)}
          </div>
        </EcoCard>
        <EcoCard>
          <SectionTitle eyebrow="Karakter KAIH" title="Ringkasan perkembangan" />
          <div className="mt-5">
            <KaihBars values={profile.ecologicalCharacter} />
          </div>
        </EcoCard>
      </section>
      <EcoCard>
        <SectionTitle eyebrow="Progress Sintaks EcoGrow" title="Peta belajar portofolio" />
        <div className="mt-5">
          <PancanitiStepper stages={dashboard.missionStages} activeStage={studentPortfolioSummary.activeStage} />
        </div>
      </EcoCard>
      <section className="grid gap-4 md:grid-cols-3">
        <EcoCard tone="cream">
          <p className="text-xs font-black uppercase tracking-wide text-mutedText">EcoReadiness</p>
          <p className="mt-3 font-heading text-4xl font-black text-leaf-700">{readinessResult?.score ?? "-"}</p>
          <p className="mt-2 text-sm font-semibold text-mutedText">{readinessResult?.ecologicalReadiness ?? "Belum mengerjakan diagnostik."}</p>
        </EcoCard>
        <EcoCard tone="cream">
          <p className="text-xs font-black uppercase tracking-wide text-mutedText">LKPD Digital</p>
          <p className="mt-3 font-heading text-4xl font-black text-leaf-700">{lkpdSubmissions.length}/5</p>
          <p className="mt-2 text-sm font-semibold text-mutedText">Submission tersimpan untuk modul aktif.</p>
        </EcoCard>
        <EcoCard tone="cream">
          <p className="text-xs font-black uppercase tracking-wide text-mutedText">EcoMaster Quiz</p>
          <p className="mt-3 font-heading text-4xl font-black text-leaf-700">{ecoMasterResult?.score ?? "-"}</p>
          <p className="mt-2 text-sm font-semibold text-mutedText">{ecoMasterResult?.recommendation ?? "Belum mengerjakan sumatif."}</p>
        </EcoCard>
      </section>
      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <EcoCard tone="cream">
          <SectionTitle eyebrow="Timeline belajar" title="Jejak Belajar EcoGrow" />
          <div className="mt-5 space-y-3">
            {portfolio.timeline.map((item) => (
              <div key={`${item.date}-${item.title}`} className="rounded-xl bg-white/80 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <EcoBadge className="bg-leaf-100 text-leaf-700">{item.date}</EcoBadge>
                  {item.stage ? <EcoBadge className="bg-sun/25 text-earth">{stageLabel[item.stage]}</EcoBadge> : null}
                </div>
                <h3 className="mt-3 font-heading text-xl font-black text-leaf-700">{item.title}</h3>
                <p className="mt-1 text-sm font-bold leading-6 text-mutedText">{item.evidence}</p>
              </div>
            ))}
          </div>
        </EcoCard>
        <div className="grid gap-4 md:grid-cols-2">
          {portfolio.evidence.map((item) => (
            <EvidencePreview key={item.id} evidence={item} />
          ))}
        </div>
      </section>
      <EcoCard>
        <SectionTitle eyebrow="Evidence lintas tahap" title="Jejak Belajar EcoGrow" description="Portofolio menunjukkan perkembangan dari Recognition sampai Exhibition, bukan sekadar kumpulan tugas." />
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {ecogrowStages.map((stage) => (
            <div key={stage.id} className="rounded-xl border border-gardenBorder bg-leaf-50 p-4">
              <EcoGrowStageBadge stageId={stage.id} showShortLabel />
              <p className="mt-3 font-heading text-lg font-black text-leaf-700">Evidence {stage.title.replace("Ecological ", "").replace("Mastery & ", "")}</p>
              <p className="mt-2 text-xs font-bold leading-5 text-mutedText">{stage.evidenceExamples[0]} - Skor mock {stage.progress ?? 0}</p>
            </div>
          ))}
        </div>
      </EcoCard>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["Jurnal", storedJournals.length, BookOpen],
          ["Quiz", storedAttempts.length, ClipboardCheck],
          ["Galeri", storedGallery.length, ImageIcon],
          ["Refleksi", storedReflections.length, HeartHandshake],
          ["Challenge", storedChallenges.length, Star],
        ].map(([label, value, Icon]) => {
          const MetricIcon = Icon as typeof BookOpen;
          return (
            <EcoCard key={label as string} tone="cream">
              <MetricIcon className="size-8 text-harvest" />
              <p className="mt-4 font-heading text-4xl font-black text-leaf-700">{String(value)}</p>
              <p className="mt-1 text-sm font-extrabold text-mutedText">{label as string}</p>
            </EcoCard>
          );
        })}
      </section>
      <section className="grid gap-6 xl:grid-cols-3">
        <EcoCard>
          <h2 className="font-heading text-2xl font-black text-leaf-700">Jurnal terakhir</h2>
          <p className="mt-3 leading-7 text-mutedText">{latestJournal?.note ?? "Belum ada jurnal tersimpan."}</p>
        </EcoCard>
        <EcoCard>
          <h2 className="font-heading text-2xl font-black text-leaf-700">Skor quiz</h2>
          <p className="mt-3 font-heading text-5xl font-black text-leaf-700">{ecoMasterResult?.score ?? latestAttempt?.score ?? 0}</p>
          <p className="mt-2 text-sm leading-6 text-mutedText">{ecoMasterResult?.recommendation ?? latestAttempt?.recommendation ?? "Kerjakan EcoMaster Quiz untuk mendapat rekomendasi."}</p>
        </EcoCard>
        <EcoCard>
          <h2 className="font-heading text-2xl font-black text-leaf-700">Catatan guru</h2>
          <div className="mt-3 space-y-2">
            {studentPortfolioSummary.teacherNotes.map((note) => <p key={note} className="rounded-xl bg-leaf-50 p-3 text-sm font-bold leading-6 text-slateText">{note}</p>)}
          </div>
        </EcoCard>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <EcoCard>
          <h2 className="font-heading text-2xl font-black text-leaf-700">Galeri project</h2>
          <p className="mt-3 text-mutedText">{storedGallery[0]?.title}: {storedGallery[0]?.description}</p>
        </EcoCard>
        <EcoCard tone="cream">
          <h2 className="font-heading text-2xl font-black text-leaf-700">Refleksi</h2>
          <p className="mt-3 text-mutedText">{storedReflections[0]?.lessonLearned ?? "Belum ada refleksi tersimpan."}</p>
        </EcoCard>
      </section>
    </div>
  );
}
