"use client";

import { useState } from "react";
import { BookCheck, CheckCircle2, ChevronDown, FilePenLine, PlayCircle, Printer } from "lucide-react";
import { FriendlyAlert } from "@/components/shared/FriendlyAlert";
import { PageHeader } from "@/components/shared/PageHeader";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { generatedModuleSeed, studentJourneySteps, teacherModuleCompletenessChecklist } from "@/data";

const moduleSections = [
  {
    title: "Informasi Umum",
    entries: [
      { label: "Identitas modul", value: `${generatedModuleSeed.subject} - Fase ${generatedModuleSeed.phase} - Kelas ${generatedModuleSeed.grade}` },
      { label: "Kompetensi awal", value: "Mengenali kebutuhan dasar tumbuhan di lingkungan sekolah." },
      { label: "Dimensi profil lulusan", value: "Bernalar kritis, bergotong royong, dan peduli lingkungan." },
      { label: "Jati diri PLH", value: "Berguru pada Bumi melalui perawatan kebun sekolah." },
      { label: "Target peserta didik", value: "Siswa kelas 4 dengan peran kelompok yang beragam." },
      { label: "Sarana dan prasarana", value: "Tanaman kangkung, alat ukur, kamera, dan jurnal digital." },
      { label: "Praktik pedagogis", value: "Observasi, eksperimen sederhana, diskusi, dan pameran." },
      { label: "Mitra pembelajaran", value: "Guru, teman kelompok, dan keluarga." },
      { label: "Lingkungan pembelajaran", value: "Kebun sekolah dan ruang kelas EcoGrow." },
      { label: "Pemanfaatan digital", value: "LKPD, jurnal foto, asesmen, dan portofolio." },
    ],
  },
  {
    title: "Komponen Inti",
    entries: [
      { label: "Capaian pembelajaran", value: generatedModuleSeed.cp },
      { label: "Tujuan pembelajaran", value: generatedModuleSeed.tp.join(" ") },
      { label: "Pemahaman bermakna", value: generatedModuleSeed.meaningfulUnderstanding },
      { label: "Pertanyaan pemantik", value: generatedModuleSeed.triggerQuestions.join(" ") },
    ],
  },
  {
    title: "Langkah Pembelajaran",
    entries: generatedModuleSeed.pancanitiPlan.map((activity, index) => ({
      label: `${studentJourneySteps[index].label} - ${studentJourneySteps[index].localTerm}`,
      value: activity.studentActivity,
    })),
  },
  {
    title: "LKPD Digital",
    entries: [
      { label: "Bukti pengamatan", value: "Foto tanaman, tinggi tanaman, warna daun, dan catatan perawatan." },
      { label: "Produk siswa", value: "Jurnal digital, cerita belajar, serta karya Eco-Exhibition." },
    ],
  },
  {
    title: "Asesmen",
    entries: [
      { label: "Diagnostik, formatif, sumatif", value: generatedModuleSeed.assessmentPlan.slice(0, 3).join(" ") },
      { label: "Rubrik", value: "Jurnal digital, kolaborasi, dan karya pameran." },
    ],
  },
  {
    title: "Refleksi dan Tindak Lanjut",
    entries: [
      { label: "Refleksi guru", value: "Catat keberhasilan dukungan dan kebutuhan penyesuaian pertemuan berikutnya." },
      { label: "Refleksi siswa", value: generatedModuleSeed.assessmentPlan[3] },
      { label: "Remedial dan pengayaan", value: "Penguatan konsep air dan cahaya atau poster analisis pertumbuhan." },
    ],
  },
];

export function TeacherModulePage() {
  const [actionNotice, setActionNotice] = useState<{ title: string; description: string } | null>(null);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Modul Ajar"
        title="Rancang Pembelajaran EcoGrow"
        description="Siapkan tujuan, misi, dan asesmen yang akan terlihat oleh siswa pada proyek kangkung."
        badge="Draft siap ditinjau"
        actions={
          <EcoButton
            onClick={() => setActionNotice({ title: "Modul siap digunakan.", description: "Misi lima tahap telah dipilih untuk Kelas 4B Eco Explorer." })}
            icon={<PlayCircle className="size-4" />}
          >
            Gunakan Modul
          </EcoButton>
        }
      />

      {actionNotice ? (
        <FriendlyAlert
          tone="success"
          title={actionNotice.title}
          description={actionNotice.description}
        />
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <EcoCard tone="cream">
          <div className="flex items-center gap-3">
            <BookCheck className="size-7 text-leaf-700" aria-hidden="true" />
            <h2 className="font-heading text-2xl font-black text-leaf-700">Kelengkapan Modul</h2>
          </div>
          <div className="mt-5 space-y-3">
            {teacherModuleCompletenessChecklist.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-white p-4">
                <CheckCircle2 className={`size-5 shrink-0 ${item.complete ? "text-leaf-500" : "text-slate-300"}`} aria-hidden="true" />
                <p className="text-sm font-bold text-slateText">{item.label}</p>
              </div>
            ))}
          </div>
          <EcoButton href="/guru/proyek" variant="secondary" fullWidth className="mt-5">
            Hubungkan ke Proyek
          </EcoButton>
        </EcoCard>

        <EcoCard>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Preview Modul</p>
              <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">{generatedModuleSeed.title}</h2>
              <p className="mt-2 text-sm font-semibold text-mutedText">
                {generatedModuleSeed.subject} - Fase {generatedModuleSeed.phase} - Kelas {generatedModuleSeed.grade} - {generatedModuleSeed.duration}
              </p>
            </div>
            <EcoBadge className="bg-leaf-100 text-leaf-700">Siap</EcoBadge>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <EcoButton
              variant="secondary"
              size="sm"
              icon={<FilePenLine className="size-4" />}
              onClick={() => setActionNotice({ title: "Mode edit disiapkan.", description: "Perubahan modul masih berupa simulasi pada prototype frontend." })}
            >
              Edit Modul
            </EcoButton>
            <EcoButton
              variant="secondary"
              size="sm"
              icon={<Printer className="size-4" />}
              onClick={() => setActionNotice({ title: "Preview cetak siap.", description: "Ringkasan modul siap ditinjau sebelum dicetak." })}
            >
              Cetak Modul
            </EcoButton>
          </div>

          <h3 className="mt-6 font-heading text-xl font-black text-leaf-700">Struktur Perangkat Ajar</h3>
          <div className="mt-4 space-y-3">
            {moduleSections.map((section, index) => (
              <details key={section.title} className="rounded-2xl border border-gardenBorder bg-white p-4" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slateText">
                  <span>{section.title}</span>
                  <ChevronDown className="size-4 text-leaf-700" aria-hidden="true" />
                </summary>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {section.entries.map((entry) => (
                    <div key={entry.label} className="rounded-xl bg-leaf-50 p-3 text-sm leading-6">
                      <p className="font-black text-leaf-700">{entry.label}</p>
                      <p className="mt-1 font-semibold text-mutedText">{entry.value}</p>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </EcoCard>
      </section>
    </div>
  );
}
