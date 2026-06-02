import { ArrowRight, BookOpen, FileText, MessageSquareText } from "lucide-react";
import { ActiveProjectCard } from "@/components/teacher/ActiveProjectCard";
import { ActionNeededPanel } from "@/components/teacher/ActionNeededPanel";
import { SubmissionQueue } from "@/components/teacher/SubmissionQueue";
import { TeacherOverviewCards } from "@/components/teacher/TeacherOverviewCards";
import { PageHeader } from "@/components/shared/PageHeader";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { teacherSubmissionQueue } from "@/data";
import { getTeacherDashboardMock } from "@/mock/repositories/teacherRepository";

export function TeacherDashboardPage() {
  const dashboard = getTeacherDashboardMock();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Ringkasan Hari Ini"
        title="Selamat datang, Bu Rani"
        description="Kelas 4B sedang pada tahap Aksi. Tinjau jurnal yang perlu perhatian sebelum melanjutkan proyek."
        badge="Kelas 4B"
        actions={<EcoButton href="/guru/monitoring" icon={<MessageSquareText className="size-4" />}>Review Jurnal</EcoButton>}
      />

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <ActionNeededPanel />
        <ActiveProjectCard project={dashboard.activeProject} />
      </section>

      <TeacherOverviewCards />

      <section className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
        <EcoCard>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Submission Terbaru</p>
              <h2 className="font-heading text-2xl font-black text-leaf-700">Jurnal untuk direview</h2>
            </div>
            <EcoButton href="/guru/monitoring" variant="ghost" size="sm" icon={<ArrowRight className="size-4" />}>
              Semua
            </EcoButton>
          </div>
          <SubmissionQueue items={teacherSubmissionQueue.slice(0, 2)} compact />
        </EcoCard>
        <EcoCard tone="cream">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Aksi Cepat</p>
          <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Siapkan kelas</h2>
          <div className="mt-5 grid gap-3">
            <EcoButton href="/guru/modul-ajar" variant="secondary" icon={<BookOpen className="size-4" />}>Buka Modul Ajar</EcoButton>
            <EcoButton href="/guru/laporan" variant="secondary" icon={<FileText className="size-4" />}>Lihat Laporan Kelas</EcoButton>
          </div>
        </EcoCard>
      </section>
    </div>
  );
}
