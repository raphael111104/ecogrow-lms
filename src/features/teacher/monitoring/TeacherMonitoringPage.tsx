"use client";

import { useMemo, useState } from "react";
import { Filter, MessageSquareText, Send } from "lucide-react";
import { FriendlyAlert } from "@/components/shared/FriendlyAlert";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SubmissionQueue } from "@/components/teacher/SubmissionQueue";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { teacherQuickFeedbackTemplates, teacherSubmissionQueue } from "@/data";
import type { TeacherSubmissionItem } from "@/types/ecogrow";

const statusFilters = [
  { id: "all", label: "Semua" },
  { id: "waiting_feedback", label: "Menunggu Review" },
  { id: "needs_revision", label: "Perlu Revisi" },
  { id: "completed", label: "Selesai" },
] as const;

export function TeacherMonitoringPage() {
  const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]["id"]>("all");
  const [selected, setSelected] = useState<TeacherSubmissionItem>(teacherSubmissionQueue[0]);
  const [feedback, setFeedback] = useState(teacherQuickFeedbackTemplates[1].message);
  const [saved, setSaved] = useState(false);
  const filtered = useMemo(
    () => teacherSubmissionQueue.filter((item) => statusFilter === "all" || item.status === statusFilter),
    [statusFilter],
  );

  const selectFilter = (nextFilter: (typeof statusFilters)[number]["id"]) => {
    setStatusFilter(nextFilter);
    setSaved(false);
    const nextSelected = teacherSubmissionQueue.find((item) => nextFilter === "all" || item.status === nextFilter);
    if (nextSelected) {
      setSelected(nextSelected);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Monitoring"
        title="Review Bukti Belajar"
        description="Pilih jurnal yang perlu perhatian, lihat catatan siswa, lalu kirim feedback singkat."
        badge="7 menunggu"
        actions={<EcoButton href="/guru/laporan" variant="secondary">Buka Laporan</EcoButton>}
      />

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Masuk hari ini", value: "18" },
          { label: "Menunggu review", value: "7" },
          { label: "Perlu revisi", value: "4" },
        ].map((item) => (
          <EcoCard key={item.label} tone={item.label === "Perlu revisi" ? "cream" : "white"} className="p-4">
            <p className="text-xs font-black uppercase tracking-[0.13em] text-mutedText">{item.label}</p>
            <p className="mt-2 font-heading text-4xl font-black text-leaf-700">{item.value}</p>
          </EcoCard>
        ))}
      </section>

      <EcoCard className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-extrabold text-mutedText">Status submission</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter status submission">
            {statusFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={statusFilter === filter.id}
                onClick={() => selectFilter(filter.id)}
                className={`min-h-11 rounded-xl px-4 text-sm font-extrabold transition ${
                  statusFilter === filter.id
                    ? "bg-leaf-700 text-white shadow-soft"
                    : "border border-gardenBorder bg-white text-slateText hover:bg-leaf-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl bg-leaf-50 px-4 py-3 text-sm font-bold text-leaf-700">
          <Filter className="size-4" aria-hidden="true" />
          {filtered.length} submission tampil
        </div>
      </EcoCard>

      <section className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
        <EcoCard>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Antrian Submission</p>
          {filtered.length ? (
            <SubmissionQueue items={filtered} selectedId={selected.id} onSelect={(item) => { setSelected(item); setSaved(false); }} />
          ) : (
            <FriendlyAlert title="Tidak ada submission untuk filter ini." description="Pilih status lain untuk melanjutkan review." />
          )}
        </EcoCard>

        <EcoCard tone="soft">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Detail Terpilih</p>
              <h2 className="mt-2 font-heading text-3xl font-black text-leaf-700">{selected.studentName}</h2>
              <p className="mt-1 text-sm font-bold text-mutedText">{selected.mission} - {selected.groupName}</p>
            </div>
            <StatusBadge status={selected.status} />
          </div>
          <div className="mt-5 rounded-2xl bg-white p-4">
            <p className="text-xs font-black uppercase tracking-[0.13em] text-mutedText">Catatan Pengamatan</p>
            <p className="mt-2 text-sm font-semibold leading-7 text-slateText">{selected.observation}</p>
          </div>
          <div className="mt-5">
            <p className="text-xs font-black uppercase tracking-[0.13em] text-leaf-500">Template Umpan Balik Cepat</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {teacherQuickFeedbackTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => {
                    setFeedback(template.message);
                    setSaved(false);
                  }}
                  className="rounded-xl border border-leaf-500/20 bg-white px-3 py-2 text-left text-xs font-bold leading-5 text-leaf-700 transition hover:border-leaf-500/40 hover:bg-leaf-50"
                >
                  {template.message}
                </button>
              ))}
            </div>
          </div>
          <label className="mt-5 block text-sm font-extrabold text-mutedText">
            Feedback untuk siswa
            <textarea
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              className="mt-2 min-h-28 w-full rounded-2xl border border-gardenBorder bg-white p-4 text-sm font-semibold text-slateText"
            />
          </label>
          <EcoButton className="mt-4" onClick={() => setSaved(true)} icon={<Send className="size-4" />}>
            Kirim Feedback
          </EcoButton>
          {saved ? (
            <FriendlyAlert
              className="mt-4"
              tone="success"
              title="Feedback sudah dikirim."
              description={`${selected.studentName} akan melihat pesan Bu Guru pada halaman misinya.`}
            />
          ) : null}
        </EcoCard>
      </section>
    </div>
  );
}
