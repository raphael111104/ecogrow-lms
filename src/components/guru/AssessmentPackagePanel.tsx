"use client";

import { useMemo, useState } from "react";
import { QuestionPreviewCard } from "@/components/ecogrow/QuestionPreviewCard";
import { RubricTable } from "@/components/ecogrow/RubricTable";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoCard } from "@/components/ui/EcoCard";
import {
  ecoExhibitionRubric,
  ecoMasterSummativeQuestions,
  ecoMissionFormativeQuestions,
  ecoReadinessQuestions,
  peerAssessmentChecklist,
  selfAssessmentChecklist,
} from "@/data";
import { countHotsQuestions, countSoloDeepQuestions } from "@/lib/ecogrow-assessment-utils";
import type { EcoGrowQuestion } from "@/types/ecogrow";

const tabs = ["EcoReadiness Diagnostik", "EcoMission Formatif", "EcoMaster Sumatif", "Rubrik Eco-Exhibition", "Self & Peer Assessment", "Remedial & Pengayaan"] as const;

export function AssessmentPackagePanel() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(tabs[0]);
  const [selectedQuestion, setSelectedQuestion] = useState<EcoGrowQuestion>(ecoReadinessQuestions[0]);
  const activeQuestions = useMemo(() => {
    if (activeTab === tabs[0]) return ecoReadinessQuestions;
    if (activeTab === tabs[1]) return ecoMissionFormativeQuestions;
    if (activeTab === tabs[2]) return ecoMasterSummativeQuestions;
    return [];
  }, [activeTab]);
  const allQuestions = [...ecoReadinessQuestions, ...ecoMissionFormativeQuestions, ...ecoMasterSummativeQuestions];

  return (
    <section className="space-y-5">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {[
          ["Diagnostik", ecoReadinessQuestions.length],
          ["Formatif", ecoMissionFormativeQuestions.length],
          ["Sumatif", ecoMasterSummativeQuestions.length],
          ["HOTS", countHotsQuestions(allQuestions)],
          ["SOLO mendalam", countSoloDeepQuestions(allQuestions)],
          ["Rubrik", ecoExhibitionRubric.length],
        ].map(([label, value]) => (
          <EcoCard key={label as string} className="p-4">
            <p className="text-xs font-black uppercase text-mutedText">{label}</p>
            <p className="mt-2 font-heading text-3xl font-black text-leaf-700">{value}</p>
          </EcoCard>
        ))}
      </section>
      <EcoCard>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`rounded-xl px-4 py-3 text-sm font-extrabold ${activeTab === tab ? "bg-leaf-700 text-white" : "border border-gardenBorder bg-white text-slateText"}`}>
              {tab}
            </button>
          ))}
        </div>
      </EcoCard>
      {activeQuestions.length ? (
        <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <EcoCard>
            <h3 className="font-heading text-xl font-black text-leaf-700">Bank soal terstruktur</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-xs font-black uppercase text-mutedText">
                  <tr><th className="p-3">Kode</th><th className="p-3">Pertanyaan</th><th className="p-3">Bloom</th><th className="p-3">SOLO</th><th className="p-3">Poin</th></tr>
                </thead>
                <tbody>
                  {activeQuestions.map((question) => (
                    <tr key={question.id} className="border-t border-gardenBorder">
                      <td className="p-3"><button className="font-black text-leaf-700" onClick={() => setSelectedQuestion(question)}>{question.id}</button></td>
                      <td className="p-3 text-slateText">{question.question}</td>
                      <td className="p-3">{question.bloomLevel ?? "-"}</td>
                      <td className="p-3">{question.soloLevel ?? "-"}</td>
                      <td className="p-3">{question.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </EcoCard>
          <QuestionPreviewCard question={selectedQuestion} showAnswer />
        </section>
      ) : null}
      {activeTab === tabs[3] ? <RubricTable rubrics={ecoExhibitionRubric} /> : null}
      {activeTab === tabs[4] ? (
        <section className="grid gap-4 lg:grid-cols-2">
          {[["Self-assessment", selfAssessmentChecklist], ["Peer-assessment", peerAssessmentChecklist]].map(([title, items]) => (
            <EcoCard key={title as string}>
              <h3 className="font-heading text-xl font-black text-leaf-700">{title as string}</h3>
              {(items as string[]).map((item) => <p key={item} className="mt-3 rounded-xl bg-leaf-50 p-3 text-sm font-bold text-slateText">{item}</p>)}
            </EcoCard>
          ))}
        </section>
      ) : null}
      {activeTab === tabs[5] ? (
        <section className="grid gap-4 lg:grid-cols-2">
          <EcoCard tone="cream">
            <EcoBadge className="bg-red-50 text-red-700">Remedial</EcoBadge>
            <p className="mt-4 text-sm font-bold leading-7 text-slateText">Skor di bawah 70: ulangi EcoLearn fotosintesis, gunakan petunjuk visual, dan lengkapi LKPD yang belum selesai.</p>
          </EcoCard>
          <EcoCard tone="soft">
            <EcoBadge>Pengayaan</EcoBadge>
            <p className="mt-4 text-sm font-bold leading-7 text-slateText">Skor mulai 85: rancang poster ketahanan pangan atau solusi hidroponik hemat air untuk Eco-Exhibition.</p>
          </EcoCard>
        </section>
      ) : null}
    </section>
  );
}
