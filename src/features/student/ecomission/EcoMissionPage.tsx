"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Check, ChevronDown, HelpCircle, Ruler, Send, Sprout } from "lucide-react";
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
import { useMockStorage } from "@/hooks/useMockStorage";
import { getStudentMissionMock } from "@/mock/repositories/studentRepository";
import type { JournalEntry } from "@/types/ecogrow";

type Notice = {
  tone: "success" | "info" | "warning";
  title: string;
  description: string;
};

const inputClass = "eco-input";
const contextualKangkungImage = "/assets/images/school-garden-kangkung-pots.png";
const leafConditionOptions: Array<{ value: JournalEntry["condition"]; label: string; helper: string }> = [
  { value: "sehat", label: "Hijau dan sehat", helper: "Daun segar, warna hijau merata." },
  { value: "layu", label: "Agak layu", helper: "Daun mulai turun atau kurang segar." },
  { value: "kuning", label: "Ada daun kuning", helper: "Ada perubahan warna yang perlu dicatat." },
  { value: "perlu_perawatan", label: "Butuh bantuan", helper: "Minta guru membantu cek tanaman." },
];

export function EcoMissionPage() {
  const mission = getStudentMissionMock();
  const [journals, setJournals] = useMockStorage<JournalEntry[]>("ecoGrow-student-journals", mission.journals);
  const latestJournal = journals.find((journal) => journal.id.startsWith("student-journal-")) ?? journals.at(-1);
  const hasSubmittedToday = journals.some((journal) => journal.id.startsWith("student-journal-"));
  const fileUrlRef = useRef<string | null>(null);
  const conditionMenuRef = useRef<HTMLDivElement | null>(null);
  const [conditionMenuOpen, setConditionMenuOpen] = useState(false);
  const [status, setStatus] = useState<"in_progress" | "waiting_feedback">(
    hasSubmittedToday ? "waiting_feedback" : "in_progress",
  );
  const [notice, setNotice] = useState<Notice | null>(null);
  const [efforts, setEfforts] = useState<string[]>([]);
  const [form, setForm] = useState({
    height: String(latestJournal?.plantHeightCm ?? 29),
    condition: (latestJournal?.condition ?? "sehat") as JournalEntry["condition"],
    note: latestJournal?.id.startsWith("student-journal-") ? latestJournal.note : "",
    photoUrl: latestJournal?.photoUrl ?? contextualKangkungImage,
  });

  useEffect(() => {
    return () => {
      if (fileUrlRef.current) {
        URL.revokeObjectURL(fileUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setStatus(hasSubmittedToday ? "waiting_feedback" : "in_progress");
  }, [hasSubmittedToday]);

  useEffect(() => {
    if (!latestJournal?.id.startsWith("student-journal-")) return;
    setForm({
      height: String(latestJournal.plantHeightCm),
      condition: latestJournal.condition,
      note: latestJournal.note,
      photoUrl: latestJournal.photoUrl ?? contextualKangkungImage,
    });
  }, [latestJournal?.id]);

  useEffect(() => {
    if (!conditionMenuOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!conditionMenuRef.current?.contains(event.target as Node)) {
        setConditionMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [conditionMenuOpen]);

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
    const submittedPhotoUrl = form.photoUrl.startsWith("blob:") ? contextualKangkungImage : form.photoUrl;
    const nextJournal: JournalEntry = {
      id: `student-journal-${Date.now()}`,
      studentId: "siswa-1",
      projectId: mission.activeProject.id,
      date: "Hari ini",
      plantHeightCm: Number(form.height) || 0,
      leafCount: latestJournal?.leafCount ?? 15,
      condition: form.condition,
      weather: latestJournal?.weather ?? "cerah",
      waterMl: latestJournal?.waterMl ?? 210,
      note: form.note.trim(),
      photoUrl: submittedPhotoUrl || contextualKangkungImage,
    };
    setJournals([nextJournal, ...journals]);
    setForm((current) => ({ ...current, photoUrl: nextJournal.photoUrl ?? contextualKangkungImage }));
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
  const selectedCondition =
    leafConditionOptions.find((option) => option.value === form.condition) ?? leafConditionOptions[0];

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
                  <span className="pointer-events-none absolute left-3.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-xl bg-leaf-50 text-leaf-600">
                    <Ruler className="size-4" aria-hidden="true" />
                  </span>
                  <input
                    className={`${inputClass} h-12 pl-14 pr-4 text-base [appearance:textfield]`}
                    type="number"
                    min={0}
                    required
                    value={form.height}
                    onChange={(event) => setForm((current) => ({ ...current, height: event.target.value }))}
                  />
                </span>
              </label>
              <div ref={conditionMenuRef} className="relative space-y-2 text-sm font-extrabold text-mutedText">
                <span>Kondisi daun</span>
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-between gap-3 rounded-2xl border border-gardenBorder bg-white/95 px-4 text-left font-extrabold text-slateText shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition hover:border-leaf-300 focus:border-leaf-500/50 focus:ring-4 focus:ring-sun/25"
                  aria-haspopup="listbox"
                  aria-expanded={conditionMenuOpen}
                  onClick={() => setConditionMenuOpen((open) => !open)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setConditionMenuOpen(false);
                  }}
                >
                  <span className="min-w-0 truncate">{selectedCondition.label}</span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-leaf-600 transition-transform ${conditionMenuOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {conditionMenuOpen ? (
                  <div
                    className="absolute left-0 right-0 top-full z-30 mt-2 rounded-2xl border border-gardenBorder bg-white p-2 shadow-[0_18px_48px_rgba(15,82,44,0.18)]"
                    role="listbox"
                    aria-label="Pilih kondisi daun"
                  >
                    {leafConditionOptions.map((option) => {
                      const selected = option.value === form.condition;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                            selected ? "bg-leaf-50 text-leaf-700" : "text-slateText hover:bg-cream"
                          }`}
                          onClick={() => {
                            setForm((current) => ({ ...current, condition: option.value }));
                            setConditionMenuOpen(false);
                          }}
                        >
                          <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${selected ? "bg-leaf-600 text-white" : "bg-leaf-100 text-leaf-500"}`}>
                            {selected ? <Check className="size-3.5" aria-hidden="true" /> : null}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-heading text-sm font-black">{option.label}</span>
                            <span className="mt-0.5 block text-xs font-semibold leading-5 text-mutedText">{option.helper}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
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
              previewUrl={form.photoUrl || contextualKangkungImage}
              title="Foto tanamanmu"
              description="Pilih foto kangkung di kebun kelasmu agar Bu Guru dapat melihat perkembangannya."
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
