"use client";

import { useState } from "react";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { getEcoGrowStageByLegacy } from "@/data";
import type { EcoGrowLkpdSection } from "@/types/ecogrow";

type LkpdAnswers = Record<string, string | number | string[]>;

type LkpdSectionCardProps = {
  section: EcoGrowLkpdSection;
  mode?: "preview" | "form";
  submitted?: boolean;
  onSubmit?: (answers: LkpdAnswers) => void;
};

export function LkpdSectionCard({ section, mode = "preview", submitted = false, onSubmit }: LkpdSectionCardProps) {
  const [answers, setAnswers] = useState<LkpdAnswers>({});
  const stage = getEcoGrowStageByLegacy(section.stageId);

  const setAnswer = (fieldId: string, value: string | string[]) => {
    setAnswers((current) => ({ ...current, [fieldId]: value }));
  };

  return (
    <EcoCard tone={submitted ? "soft" : "white"} className="p-4">
      <div className="flex flex-wrap items-center gap-2">
        <EcoBadge className="bg-leaf-100 text-leaf-700">{stage.title} ({stage.localTerm})</EcoBadge>
        <EcoBadge className="bg-sun/25 text-earth">{section.points} poin</EcoBadge>
        {submitted ? <EcoBadge className="bg-leaf-700 text-white">Terkirim</EcoBadge> : null}
      </div>
      <h3 className="mt-4 font-heading text-xl font-black text-leaf-700">{section.title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{section.instruction}</p>
      {mode === "preview" ? (
        <div className="mt-4 space-y-2">
          {section.fields.map((field) => (
            <p key={field.id} className="rounded-lg bg-leaf-50 p-3 text-sm font-bold text-slateText">{field.label}</p>
          ))}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {section.fields.map((field) => (
            <label key={field.id} className="block space-y-2 text-sm font-extrabold text-mutedText">
              {field.label}
              {field.type === "select" ? (
                <select className="eco-input" onChange={(event) => setAnswer(field.id, event.target.value)} value={(answers[field.id] as string) ?? ""}>
                  <option value="">Pilih jawaban</option>
                  {field.options?.map((option) => <option key={option}>{option}</option>)}
                </select>
              ) : field.type === "checklist" ? (
                <div className="grid gap-2 rounded-xl border border-gardenBorder bg-white p-3">
                  {field.options?.map((option) => {
                    const values = (answers[field.id] as string[] | undefined) ?? [];
                    return (
                      <label key={option} className="flex items-center gap-2 text-slateText">
                        <input
                          type="checkbox"
                          checked={values.includes(option)}
                          onChange={(event) => setAnswer(field.id, event.target.checked ? [...values, option] : values.filter((value) => value !== option))}
                          className="size-4 accent-leaf-500"
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
              ) : field.type === "textarea" ? (
                <textarea className="eco-input min-h-20 py-3" placeholder={field.placeholder} onChange={(event) => setAnswer(field.id, event.target.value)} value={(answers[field.id] as string) ?? ""} />
              ) : (
                <input className="eco-input" type={field.type === "image_url" ? "url" : field.type} placeholder={field.placeholder} onChange={(event) => setAnswer(field.id, event.target.value)} value={(answers[field.id] as string) ?? ""} />
              )}
            </label>
          ))}
          <EcoButton onClick={() => onSubmit?.(answers)} variant="reward" size="sm">Simpan LKPD</EcoButton>
        </div>
      )}
      <p className="mt-4 text-xs font-bold leading-5 text-mutedText">Bukti: {section.evidenceRequired?.join(" - ")}</p>
    </EcoCard>
  );
}
