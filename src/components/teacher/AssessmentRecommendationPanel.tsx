import { ArrowRight, Lightbulb } from "lucide-react";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { teacherAssessmentFollowUps } from "@/data";

export function AssessmentRecommendationPanel() {
  return (
    <EcoCard tone="cream">
      <div className="flex items-center gap-3">
        <Lightbulb className="size-7 text-harvest" aria-hidden="true" />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-earth">Rekomendasi</p>
          <h2 className="font-heading text-2xl font-black text-leaf-700">Langkah Berikutnya</h2>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {teacherAssessmentFollowUps.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-black text-leaf-700">{item.label}</p>
              <span className="rounded-full bg-leaf-50 px-2.5 py-1 text-xs font-black text-leaf-700">{item.count}</span>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-mutedText">{item.note}</p>
            <EcoButton href={item.href} variant="ghost" size="sm" className="mt-2 px-0" icon={<ArrowRight className="size-3.5" />}>
              {item.actionLabel}
            </EcoButton>
          </div>
        ))}
      </div>
      <EcoButton href="/guru/laporan" variant="secondary" fullWidth className="mt-5" icon={<ArrowRight className="size-4" />}>
        Buka Laporan Lengkap
      </EcoButton>
    </EcoCard>
  );
}
