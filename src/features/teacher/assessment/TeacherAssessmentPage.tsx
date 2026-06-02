"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { AssessmentRecommendationPanel } from "@/components/teacher/AssessmentRecommendationPanel";
import { FriendlyAlert } from "@/components/shared/FriendlyAlert";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { assessmentMatrix, assessmentTabs, users } from "@/data";

const recommendationLabel = {
  Remedial: "Perlu Latihan Ulang",
  Pengayaan: "Siap Tantangan Lanjutan",
  Pendampingan: "Perlu Pendampingan",
} as const;

export function TeacherAssessmentPage() {
  const [activeTab, setActiveTab] = useState<(typeof assessmentTabs)[number]["id"]>("diagnostic");
  const [generated, setGenerated] = useState(false);
  const activeMode = assessmentTabs.find((tab) => tab.id === activeTab) ?? assessmentTabs[0];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="Asesmen"
        title="Capaian dan Tindak Lanjut"
        description="Lihat hasil penting saja, lalu tentukan penguatan atau pengayaan untuk siswa."
        badge="Kelas 4B"
        actions={<EcoButton onClick={() => setGenerated(true)} icon={<Sparkles className="size-4" />}>Buat Rekomendasi</EcoButton>}
      />

      {generated ? (
        <FriendlyAlert
          tone="success"
          title="Rekomendasi pembelajaran siap."
          description="Penguatan, pendampingan, dan tantangan lanjutan sudah disusun untuk kelas."
        />
      ) : null}

      <EcoCard>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Jenis asesmen">
          {assessmentTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`rounded-xl px-4 py-3 text-sm font-extrabold transition ${activeTab === tab.id ? "bg-leaf-700 text-white" : "border border-gardenBorder bg-white text-slateText hover:bg-leaf-50"}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p className="mt-4 rounded-2xl bg-leaf-50 p-4 text-sm font-bold leading-6 text-slateText">
          {activeMode.description}
        </p>
      </EcoCard>

      <section className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <EcoCard>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Hasil Ringkas</p>
          <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Siswa yang perlu keputusan</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-[760px] text-left text-sm">
              <thead className="text-xs font-black uppercase tracking-wide text-mutedText">
                <tr>
                  <th className="pb-3 pr-4">Siswa</th>
                  <th className="pb-3 pr-4">Kuis Awal</th>
                  <th className="pb-3 pr-4">Latihan Misi</th>
                  <th className="pb-3 pr-4">Kuis Akhir</th>
                  <th className="pb-3 pr-4">KAIH</th>
                  <th className="pb-3 pr-4">Rekomendasi</th>
                  <th className="pb-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {assessmentMatrix.map((result) => {
                  const name = users.find((user) => user.id === result.studentId)?.name ?? result.studentId;
                  const status = result.recommendation === "Remedial" ? "needs_revision" : result.recommendation === "Pengayaan" ? "completed" : "waiting_feedback";

                  return (
                    <tr key={result.studentId} className="border-t border-gardenBorder">
                      <td className="py-4 pr-4 font-bold text-leaf-700">{name}</td>
                      <td className="py-4 pr-4 font-bold text-slateText">{result.diagnosticScore}</td>
                      <td className="py-4 pr-4 font-bold text-slateText">{result.missionScore}</td>
                      <td className="py-4 pr-4 font-bold text-slateText">{result.summativeScore}</td>
                      <td className="py-4 pr-4 font-bold text-slateText">{result.kaihAverage}</td>
                      <td className="py-4 pr-4"><StatusBadge status={status} label={recommendationLabel[result.recommendation]} /></td>
                      <td className="py-4">
                        <EcoButton href="/guru/monitoring" variant="ghost" size="sm">Tinjau</EcoButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </EcoCard>
        <AssessmentRecommendationPanel />
      </section>
    </div>
  );
}
