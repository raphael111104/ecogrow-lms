import { ArrowRight, ClipboardCheck, Download, TrendingUp, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { EcoProgress } from "@/components/ui/EcoProgress";
import { teacherClassReport } from "@/data";

export function TeacherReportPage() {
  const evidenceProgress = Math.round((teacherClassReport.submittedEvidence / teacherClassReport.expectedEvidence) * 100);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Laporan Kelas"
        title={teacherClassReport.className}
        description={`Ringkasan perkembangan ${teacherClassReport.projectTitle} untuk tindak lanjut guru dan komunikasi orang tua.`}
        badge="Minggu ke-4"
        actions={<EcoButton variant="secondary" icon={<Download className="size-4" />}>Cetak Ringkasan</EcoButton>}
      />

      <section className="grid gap-5 md:grid-cols-2">
        <EcoCard tone="soft">
          <TrendingUp className="size-8 text-leaf-700" aria-hidden="true" />
          <p className="mt-3 text-xs font-black uppercase tracking-[0.15em] text-leaf-500">Kemajuan Proyek</p>
          <p className="mt-2 font-heading text-5xl font-black text-leaf-700">{teacherClassReport.overallProgress}%</p>
          <EcoProgress value={teacherClassReport.overallProgress} className="mt-4" />
        </EcoCard>
        <EcoCard>
          <ClipboardCheck className="size-8 text-leaf-700" aria-hidden="true" />
          <p className="mt-3 text-xs font-black uppercase tracking-[0.15em] text-leaf-500">Bukti Terkumpul</p>
          <p className="mt-2 font-heading text-5xl font-black text-leaf-700">
            {teacherClassReport.submittedEvidence}<span className="text-2xl text-mutedText">/{teacherClassReport.expectedEvidence}</span>
          </p>
          <EcoProgress value={evidenceProgress} color="blue" className="mt-4" />
        </EcoCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <EcoCard tone="cream">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Kekuatan Kelas</p>
          <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Yang sudah berkembang</h2>
          <div className="mt-5 space-y-3">
            {teacherClassReport.strengths.map((strength) => (
              <p key={strength} className="rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-slateText">{strength}</p>
            ))}
          </div>
        </EcoCard>
        <EcoCard>
          <div className="flex items-center gap-3">
            <UsersRound className="size-7 text-leaf-700" aria-hidden="true" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Perlu Dukungan</p>
              <h2 className="font-heading text-2xl font-black text-leaf-700">4 siswa untuk ditindaklanjuti</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {teacherClassReport.supportStudents.map((student) => (
              <div key={student.name} className="rounded-2xl border border-gardenBorder bg-leaf-50 p-4">
                <p className="font-heading text-lg font-black text-leaf-700">{student.name}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{student.focus}</p>
              </div>
            ))}
          </div>
        </EcoCard>
      </section>

      <EcoCard tone="dark">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-sun">Aksi Guru Berikutnya</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {teacherClassReport.nextActions.map((action) => (
            <p key={action} className="rounded-2xl bg-white/10 p-4 text-sm font-bold leading-6 text-white">{action}</p>
          ))}
        </div>
        <EcoButton href="/guru/monitoring" variant="reward" className="mt-5" icon={<ArrowRight className="size-4" />}>
          Mulai Review Jurnal
        </EcoButton>
      </EcoCard>
    </div>
  );
}
