"use client";

import { useState } from "react";
import { Printer, Send } from "lucide-react";
import { LkpdSectionCard } from "@/components/ecogrow/LkpdSectionCard";
import { MeetingPlanTimeline } from "@/components/ecogrow/MeetingPlanTimeline";
import { TeachingModuleSummaryCard } from "@/components/ecogrow/TeachingModuleSummaryCard";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { ecoGrowStageDisplays, ecogrowDigitalLkpd, ecogrowTeachingModules } from "@/data";
import { useMockStorage } from "@/hooks/useMockStorage";

const tabs = [
  "Ringkasan Modul",
  "Informasi Umum",
  "CP/TP",
  "Rencana 4 Pertemuan",
  "Sintaks EcoGrow",
  "LKPD Digital",
  "Asesmen",
  "Export Preview",
] as const;

export function ModuleDocumentPreview() {
  const module = ecogrowTeachingModules[0];
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(tabs[0]);
  const [publishedModules, setPublishedModules] = useMockStorage<string[]>("ecogrow-published-modules", []);
  const published = publishedModules.includes(module.id);

  const publish = () => {
    if (!published) setPublishedModules([...publishedModules, module.id]);
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Preview Modul Ajar Dokumen</p>
          <h2 className="mt-2 font-heading text-3xl font-black text-leaf-700">Perangkat pembelajaran siap digunakan</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {published ? <EcoBadge className="bg-leaf-700 text-white">Dipublikasikan ke siswa</EcoBadge> : null}
          <EcoButton variant="reward" size="sm" icon={<Send className="size-4" />} onClick={publish}>Publikasikan ke Siswa</EcoButton>
          <EcoButton href="/siswa/ecolearn" variant="secondary" size="sm">Preview sebagai Siswa</EcoButton>
        </div>
      </div>
      <EcoCard>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-4 py-3 text-xs font-extrabold transition ${activeTab === tab ? "bg-leaf-700 text-white" : "border border-gardenBorder bg-white text-slateText"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </EcoCard>

      {activeTab === "Ringkasan Modul" ? <TeachingModuleSummaryCard module={module} /> : null}
      {activeTab === "Informasi Umum" ? (
        <section className="grid gap-4 lg:grid-cols-3">
          {[
            ["Kompetensi awal", module.initialCompetencies],
            ["Profil lulusan dan PLH", [...module.graduateProfileDimensions, ...module.plhIdentity]],
            ["Sarana dan mitra", [...module.facilities.learningSources, ...module.facilities.studentTools, ...module.partners]],
          ].map(([title, values]) => (
            <EcoCard key={title as string}>
              <h3 className="font-heading text-xl font-black text-leaf-700">{title as string}</h3>
              <div className="mt-4 space-y-2">
                {(values as string[]).map((value) => <p key={value} className="rounded-lg bg-leaf-50 p-3 text-sm font-bold text-slateText">{value}</p>)}
              </div>
            </EcoCard>
          ))}
        </section>
      ) : null}
      {activeTab === "CP/TP" ? (
        <section className="grid gap-4 lg:grid-cols-2">
          <EcoCard>
            <h3 className="font-heading text-xl font-black text-leaf-700">Capaian pembelajaran</h3>
            <p className="mt-4 text-sm font-semibold leading-7 text-mutedText">{module.learningOutcomes.understanding}</p>
            <div className="mt-4 flex flex-wrap gap-2">{module.learningOutcomes.processSkills.map((skill) => <EcoBadge key={skill}>{skill}</EcoBadge>)}</div>
          </EcoCard>
          <EcoCard tone="cream">
            <h3 className="font-heading text-xl font-black text-leaf-700">Tujuan dan pertanyaan pemantik</h3>
            {module.objectives.slice(0, 4).map((item) => <p key={item} className="mt-3 text-sm font-bold text-slateText">{item}</p>)}
            {module.triggerQuestions.map((item) => <p key={item} className="mt-3 rounded-lg bg-white p-3 text-sm font-bold text-earth">{item}</p>)}
          </EcoCard>
        </section>
      ) : null}
      {activeTab === "Rencana 4 Pertemuan" ? <MeetingPlanTimeline meetings={module.meetings} /> : null}
      {activeTab === "Sintaks EcoGrow" ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {ecoGrowStageDisplays.map((stage) => (
            <EcoCard key={stage.id} className="p-4">
              <EcoBadge>{stage.learningMode}</EcoBadge>
              <h3 className="mt-4 font-heading text-xl font-black text-leaf-700">{stage.title}</h3>
              <p className="mt-1 text-sm font-bold text-earth">{stage.localTerm}</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-mutedText">{stage.studentOutput}</p>
            </EcoCard>
          ))}
        </section>
      ) : null}
      {activeTab === "LKPD Digital" ? (
        <section className="grid gap-4 lg:grid-cols-2">
          {ecogrowDigitalLkpd.map((section) => <LkpdSectionCard key={section.id} section={section} />)}
        </section>
      ) : null}
      {activeTab === "Asesmen" ? (
        <EcoCard>
          <h3 className="font-heading text-2xl font-black text-leaf-700">Asesmen dan tindak lanjut</h3>
          {module.assessmentSummary.map((summary) => <p key={summary} className="mt-3 rounded-xl bg-leaf-50 p-4 text-sm font-bold text-slateText">{summary}</p>)}
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div><p className="font-black text-leaf-700">Remedial</p>{module.remedial.map((item) => <p key={item} className="mt-2 text-sm text-mutedText">{item}</p>)}</div>
            <div><p className="font-black text-leaf-700">Pengayaan</p>{module.enrichment.map((item) => <p key={item} className="mt-2 text-sm text-mutedText">{item}</p>)}</div>
          </div>
        </EcoCard>
      ) : null}
      {activeTab === "Export Preview" ? (
        <EcoCard tone="cream">
          <h3 className="font-heading text-2xl font-black text-leaf-700">Export preview mock</h3>
          <p className="mt-3 text-sm font-semibold text-mutedText">Cetak ringkasan modul, empat pertemuan, LKPD, dan asesmen untuk dibagikan pada tim guru.</p>
          <EcoButton className="mt-5" variant="secondary" icon={<Printer className="size-4" />} onClick={() => window.print()}>Cetak / Export Mock</EcoButton>
        </EcoCard>
      ) : null}
    </section>
  );
}
