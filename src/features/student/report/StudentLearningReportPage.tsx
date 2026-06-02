"use client";

import { useState } from "react";
import { Award, BookOpenCheck, CheckCircle2, Download, MessageCircleMore, Printer, RefreshCw, Trophy } from "lucide-react";
import { FriendlyAlert } from "@/components/shared/FriendlyAlert";
import { NextSuggestedActionCard } from "@/components/shared/NextSuggestedActionCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { studentJourneySteps, studentLearningReport } from "@/data";

export function StudentLearningReportPage() {
  const [documentNotice, setDocumentNotice] = useState<{ title: string; description: string } | null>(null);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        eyebrow="Laporan Belajar"
        title="Capaian Belajarku"
        description="Ini adalah cerita singkat tentang hal baik yang sudah kamu lakukan dan latihan berikutnya."
        badge="Kelas 4B"
        actions={(
          <div className="flex flex-wrap gap-2">
            <EcoButton
              variant="secondary"
              icon={<Printer className="size-4" />}
              onClick={() => setDocumentNotice({
                title: "Laporan siap dicetak.",
                description: "Tampilan cetak ini adalah simulasi untuk melihat rangkuman belajarmu.",
              })}
            >
              Cetak Laporan
            </EcoButton>
            <EcoButton
              variant="secondary"
              icon={<Download className="size-4" />}
              onClick={() => setDocumentNotice({
                title: "Laporan siap diunduh.",
                description: "File unduhan akan tersedia saat fitur penyimpanan diaktifkan.",
              })}
            >
              Unduh Laporan
            </EcoButton>
          </div>
        )}
      />

      {documentNotice ? (
        <FriendlyAlert tone="success" title={documentNotice.title} description={documentNotice.description} />
      ) : null}

      <EcoCard tone="cream" className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-sun/25 text-harvest">
          <Trophy className="size-9" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Capaian Belajarku</p>
          <h2 className="mt-2 font-heading text-2xl font-black leading-8 text-leaf-700">
            {studentLearningReport.celebration}
          </h2>
          <EcoBadge className="mt-4 bg-white text-leaf-700">
            {studentLearningReport.completedJourneySteps} langkah sudah selesai
          </EcoBadge>
        </div>
      </EcoCard>

      <EcoCard>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Perjalanan Belajarku</p>
        <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Dari mengenal sampai memamerkan tanaman</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-5">
          {studentJourneySteps.map((step, index) => {
            const completed = index < studentLearningReport.completedJourneySteps;
            return (
              <div
                key={step.stage}
                className={completed ? "rounded-2xl bg-leaf-50 p-3" : "rounded-2xl border border-dashed border-gardenBorder bg-white p-3"}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={completed ? "size-5 text-leaf-500" : "size-5 text-mutedText/40"} aria-hidden="true" />
                  <p className="font-heading text-base font-black text-leaf-700">{step.label}</p>
                </div>
                <p className="mt-2 text-xs font-semibold leading-5 text-mutedText">
                  {completed ? "Sudah dilakukan" : "Akan datang"}
                </p>
              </div>
            );
          })}
        </div>
      </EcoCard>

      <section className="grid gap-5 md:grid-cols-2">
        <EcoCard tone="soft">
          <div className="flex items-center gap-3">
            <Award className="size-7 text-harvest" aria-hidden="true" />
            <h2 className="font-heading text-2xl font-black text-leaf-700">Badge yang Kudapat</h2>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {studentLearningReport.badges.map((badge) => (
              <EcoBadge key={badge} className="bg-white text-leaf-700">{badge}</EcoBadge>
            ))}
          </div>
        </EcoCard>
        <EcoCard>
          <h2 className="font-heading text-2xl font-black text-leaf-700">Misi yang Sudah Selesai</h2>
          <div className="mt-4 space-y-2">
            {studentLearningReport.completedMissions.map((mission) => (
              <p key={mission} className="rounded-xl bg-leaf-50 p-3 text-sm font-bold text-slateText">{mission}</p>
            ))}
          </div>
        </EcoCard>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <EcoCard tone="soft">
          <BookOpenCheck className="size-8 text-leaf-700" aria-hidden="true" />
          <h2 className="mt-3 font-heading text-2xl font-black text-leaf-700">Hal yang Sudah Kupahami</h2>
          <div className="mt-4 space-y-3">
            {studentLearningReport.understood.map((item) => (
              <p key={item} className="rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-slateText">{item}</p>
            ))}
          </div>
        </EcoCard>
        <EcoCard tone="cream">
          <RefreshCw className="size-8 text-earth" aria-hidden="true" />
          <h2 className="mt-3 font-heading text-2xl font-black text-leaf-700">Hal yang Perlu Kulatih Lagi</h2>
          <div className="mt-4 space-y-3">
            {studentLearningReport.practiceNext.map((item) => (
              <p key={item} className="rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-slateText">{item}</p>
            ))}
          </div>
        </EcoCard>
      </section>

      <EcoCard tone="dark">
        <MessageCircleMore className="size-8 text-sun" aria-hidden="true" />
        <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-sun">Pesan Guru</p>
        <p className="mt-3 font-heading text-2xl font-black leading-9 text-white">
          &ldquo;{studentLearningReport.teacherMessage}&rdquo;
        </p>
      </EcoCard>

      <NextSuggestedActionCard
        title={studentLearningReport.nextAction.title}
        description={studentLearningReport.nextAction.description}
        href={studentLearningReport.nextAction.href}
        actionLabel={studentLearningReport.nextAction.actionLabel}
        secondaryAction={{ href: "/siswa/portofolio", label: "Kembali ke Album" }}
        tone="cream"
      />
    </div>
  );
}
