"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, HelpCircle, Ruler, Send, Sprout } from "lucide-react";
import { EcoGrowJourneyStepper } from "@/components/student/EcoGrowJourneyStepper";
import { EffortCheckCard } from "@/components/student/EffortCheckCard";
import { FriendlyAlert } from "@/components/shared/FriendlyAlert";
import { MockUploadBox } from "@/components/shared/MockUploadBox";
import { NextSuggestedActionCard } from "@/components/shared/NextSuggestedActionCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { EcoProgress } from "@/components/ui/EcoProgress";
import { getStudentMissionMock } from "@/mock/repositories/studentRepository";
import type { JournalEntry } from "@/types/ecogrow";

type Notice = {
  tone: "success" | "info" | "warning";
  title: string;
  description: string;
};

const inputClass = "eco-input";

export function EcoMissionPage() {
  const mission = getStudentMissionMock();
  const latestJournal = mission.journals.at(-1);
  const fileUrlRef = useRef<string | null>(null);
  const [status, setStatus] = useState<"in_progress" | "waiting_feedback">("in_progress");
  const [notice, setNotice] = useState<Notice | null>(null);
  const [efforts, setEfforts] = useState<string[]>([]);
  const [form, setForm] = useState({
    height: String(latestJournal?.plantHeightCm ?? 29),
    condition: (latestJournal?.condition ?? "sehat") as JournalEntry["condition"],
    note: "",
    photoUrl: latestJournal?.photoUrl ?? "",
  });

  useEffect(() => {
    return () => {
      if (fileUrlRef.current) {
        URL.revokeObjectURL(fileUrlRef.current);
      }
    };
  }, []);

  const handlePhotoChange = (file?: File) => {
    if (!file) return;
    if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
    fileUrlRef.current = URL.createObjectURL(file);
    setForm((current) => ({ ...current, photoUrl: fileUrlRef.current ?? "" }));
  };

  const submitJournal = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.note.trim().length < 8) {
      setNotice({
        tone: "warning",
        title: "Ceritamu masih terlalu pendek.",
        description: "Tuliskan sedikitnya satu hal yang kamu lihat pada tanamanmu.",
      });
      return;
    }

    setStatus("waiting_feedback");
    setNotice({
      tone: "success",
      title: "Hebat, jurnal hari ini sudah tersimpan.",
      description: `Tinggi ${form.height} cm sudah dicatat. Kamu mendapat ${mission.activeMission.points} EcoPoint.`,
    });
  };

  const askTeacher = () => {
    setNotice({
      tone: "info",
      title: "Pesan bantuan siap dikirim.",
      description: "Bu Guru akan melihat pertanyaanmu pada simulasi monitoring kelas.",
    });
  };
  const toggleEffort = (effort: string) => {
    setEfforts((current) => (current.includes(effort) ? current.filter((item) => item !== effort) : [...current, effort]));
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader
        eyebrow="Misi Hari Ini"
        title="Rawat Tanaman Kangkungmu"
        description="Hari ini kamu mengukur tinggi tanaman dan melihat warna daunnya. Selesaikan satu jurnal singkat untuk melanjutkan perjalananmu."
        badge={`+${mission.activeMission.points} EcoPoint`}
        actions={<EcoButton href="#jurnal-tanaman">Isi Jurnal Hari Ini</EcoButton>}
      />

      <EcoCard className="p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Jalur Misimu</p>
            <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Sekarang kamu ada di tahap Aksi</h2>
          </div>
          <StatusBadge status={status} />
        </div>
        <div className="mt-5">
          <EcoGrowJourneyStepper activeStage={mission.activeMission.stage} compact />
        </div>
      </EcoCard>

      <section className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <EcoCard tone="cream">
          <EcoBadge className="bg-leaf-700 text-white" icon={<Sprout className="size-3.5" />}>
            Lakukan Aksi
          </EcoBadge>
          <h2 className="mt-4 font-heading text-2xl font-black text-leaf-700">Yang perlu kamu lakukan</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">
            Ayo buktikan tanamanmu tumbuh dengan mengamati dan mencatatnya.
          </p>
          <ol className="mt-5 space-y-3">
            {[
              "Ukur tinggi tanaman.",
              "Perhatikan warna daunnya.",
              "Ambil foto tanaman.",
              "Simpan jurnalmu.",
            ].map((task, index) => (
              <li key={task} className="flex gap-3 rounded-2xl bg-white/80 p-3.5 text-sm font-bold text-slateText">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-leaf-100 text-leaf-700">
                  {index + 1}
                </span>
                <span className="pt-1">{task}</span>
              </li>
            ))}
          </ol>
          <EcoProgress value={68} label="Perjalanan misi" className="mt-5" />
        </EcoCard>

        <EcoCard id="jurnal-tanaman" className="scroll-mt-28">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Bukti Hari Ini</p>
              <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Isi jurnal tanaman</h2>
              <p className="mt-2 text-sm font-semibold text-mutedText">Cukup isi empat hal sederhana.</p>
            </div>
            <Camera className="size-7 text-harvest" aria-hidden="true" />
          </div>

          <form className="mt-5 space-y-4 pb-24 lg:pb-0" onSubmit={submitJournal}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-extrabold text-mutedText">
                Tinggi tanaman (cm)
                <span className="relative block">
                  <Ruler className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-leaf-500" aria-hidden="true" />
                  <input
                    className={`${inputClass} pl-10`}
                    type="number"
                    min={0}
                    required
                    value={form.height}
                    onChange={(event) => setForm((current) => ({ ...current, height: event.target.value }))}
                  />
                </span>
              </label>
              <label className="space-y-2 text-sm font-extrabold text-mutedText">
                Kondisi daun
                <select
                  className={inputClass}
                  value={form.condition}
                  onChange={(event) => setForm((current) => ({
                    ...current,
                    condition: event.target.value as JournalEntry["condition"],
                  }))}
                >
                  <option value="sehat">Hijau dan sehat</option>
                  <option value="layu">Agak layu</option>
                  <option value="kuning">Ada daun kuning</option>
                  <option value="perlu_perawatan">Butuh bantuan</option>
                </select>
              </label>
            </div>
            <label className="block space-y-2 text-sm font-extrabold text-mutedText">
              Catatan singkat
              <textarea
                className={`${inputClass} min-h-24 py-3`}
                maxLength={140}
                placeholder="Contoh: Daunnya hijau dan lebih lebar dari kemarin."
                value={form.note}
                onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
              />
              <span className="block text-right text-xs font-bold text-mutedText">{form.note.length}/140</span>
            </label>
            <label className="block space-y-2 text-sm font-extrabold text-mutedText">
              Foto tanaman
              <input
                className={`${inputClass} py-3`}
                type="file"
                accept="image/*"
                onChange={(event) => handlePhotoChange(event.target.files?.[0])}
              />
            </label>
            <MockUploadBox
              previewUrl={form.photoUrl}
              title="Foto tanamanmu"
              description="Pilih foto tanaman agar Bu Guru dapat melihat perkembangannya."
            />
            {notice ? (
              <FriendlyAlert
                tone={notice.tone}
                title={notice.title}
                description={notice.description}
              />
            ) : null}
            <div className="fixed bottom-[5.75rem] left-4 right-4 z-20 flex gap-3 rounded-2xl border border-gardenBorder bg-white/95 p-3 shadow-eco backdrop-blur lg:static lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <EcoButton type="submit" fullWidth icon={<Send className="size-4" />}>
                Simpan Jurnal
              </EcoButton>
              <EcoButton
                type="button"
                fullWidth
                variant="secondary"
                icon={<HelpCircle className="size-4" />}
                onClick={askTeacher}
              >
                Tanya Guru
              </EcoButton>
            </div>
          </form>
        </EcoCard>
      </section>
      {notice?.tone === "success" ? (
        <>
          <EffortCheckCard selected={efforts} onToggle={toggleEffort} />
          <NextSuggestedActionCard
            title="Ceritakan pengalaman merawat tanamanmu"
            description="Jurnalmu sudah tersimpan. Cerita singkatmu akan melengkapi perjalanan hari ini."
            href="/siswa/cerita-belajarku"
            actionLabel="Tulis Cerita"
          />
        </>
      ) : null}
    </div>
  );
}
