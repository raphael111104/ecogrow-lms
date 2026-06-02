"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, PlayCircle, Sprout } from "lucide-react";
import { FriendlyAlert } from "@/components/shared/FriendlyAlert";
import { PageHeader } from "@/components/shared/PageHeader";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { EcoProgress } from "@/components/ui/EcoProgress";
import { projects, projectWizardTemplates, studentJourneySteps } from "@/data";
import { cn } from "@/lib/utils";

export function TeacherProjectPage() {
  const project = projects[0];
  const [activated, setActivated] = useState(false);
  const activeIndex = studentJourneySteps.findIndex((step) => step.stage === project.currentStage);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Proyek"
        title="Kelola Proyek Kelas"
        description="Atur tahap aktif, pantau kelompok, dan lanjutkan misi yang muncul pada ruang siswa."
        badge="1 proyek aktif"
        actions={
          <EcoButton onClick={() => setActivated(true)} icon={<PlayCircle className="size-4" />}>
            Aktifkan Tahap Berikutnya
          </EcoButton>
        }
      />

      {activated ? (
        <FriendlyAlert
          tone="success"
          title="Tahap Refleksi siap dibuka."
          description="Siswa akan melihat ajakan menulis Cerita Belajarku pada sesi berikutnya."
        />
      ) : null}

      <EcoCard tone="soft">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Sprout className="size-8 text-leaf-700" aria-hidden="true" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Sedang Berjalan</p>
                <h2 className="font-heading text-3xl font-black text-leaf-700">{project.title}</h2>
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold leading-7 text-mutedText">{project.description}</p>
          </div>
          <div className="rounded-2xl bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-mutedText">
              <CalendarDays className="size-4" aria-hidden="true" />
              {project.startDate} sampai {project.endDate}
            </div>
            <EcoProgress value={project.progress} label="Kemajuan proyek" className="mt-4" />
          </div>
        </div>
      </EcoCard>

      <EcoCard>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Alur Tahap</p>
        <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Perjalanan proyek siswa</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {studentJourneySteps.map((step, index) => (
            <div
              key={step.stage}
              className={cn(
                "rounded-2xl border p-4",
                index < activeIndex ? "border-leaf-700 bg-leaf-700 text-white" : index === activeIndex ? "border-sun bg-cream text-leaf-700" : "border-gardenBorder bg-white text-mutedText",
              )}
            >
              <p className="text-xs font-black uppercase">{index < activeIndex ? "Selesai" : index === activeIndex ? "Aktif" : "Berikutnya"}</p>
              <h3 className="mt-3 font-heading text-lg font-black">{step.label}</h3>
              <p className="mt-1 text-xs font-bold">{step.localTerm}</p>
            </div>
          ))}
        </div>
      </EcoCard>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.7fr]">
        <EcoCard>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Template Berikutnya</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {projectWizardTemplates.map((template) => (
              <div key={template.id} className="rounded-2xl border border-gardenBorder p-4">
                <h3 className="font-heading text-lg font-black text-leaf-700">{template.title}</h3>
                <p className="mt-2 text-sm font-semibold text-mutedText">{template.recommendedDurationDays} hari</p>
                <EcoBadge className="mt-3 bg-leaf-50 text-leaf-700">{template.plantOptions[0]}</EcoBadge>
              </div>
            ))}
          </div>
        </EcoCard>
        <EcoCard tone="cream">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Tindakan Lanjutan</p>
          <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Lihat bukti siswa</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-mutedText">Buka jurnal terbaru untuk menentukan apakah tahap berikutnya sudah siap.</p>
          <EcoButton href="/guru/monitoring" variant="secondary" fullWidth className="mt-5" icon={<ArrowRight className="size-4" />}>
            Buka Monitoring
          </EcoButton>
        </EcoCard>
      </section>
    </div>
  );
}
