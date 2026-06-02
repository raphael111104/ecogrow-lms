import { Activity, Compass, Eye, RefreshCcw, Trophy } from "lucide-react";
import { EcoCard } from "@/components/ui/EcoCard";
import { cn } from "@/lib/utils";
import type { EcoGrowStage, EcoGrowStageId } from "@/types/ecogrow-stage";

type EcoGrowStageCardProps = {
  stage: EcoGrowStage;
  compact?: boolean;
  className?: string;
};

const iconMap: Record<string, typeof Eye> = {
  Eye,
  Compass,
  Activity,
  RefreshCcw,
  Trophy,
};

const accentMap: Record<EcoGrowStageId, string> = {
  recognition: "bg-leaf-100 text-leaf-700",
  exploration: "bg-emerald-50 text-emerald-800",
  execution: "bg-sun/25 text-earth",
  reflection: "bg-sky/15 text-sky",
  exhibition: "bg-indigo-50 text-indigo-800",
};

export function EcoGrowStageCard({ stage, compact = false, className }: EcoGrowStageCardProps) {
  const Icon = iconMap[stage.icon] ?? Eye;

  return (
    <EcoCard className={cn("h-full p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <span className={cn("grid size-12 place-items-center rounded-xl", accentMap[stage.id])}>
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <span className="font-heading text-4xl font-black text-leaf-100">{String(stage.order).padStart(2, "0")}</span>
      </div>
      <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-mutedText">{stage.shortLabel}</p>
      <h3 className="mt-2 font-heading text-2xl font-black leading-tight text-leaf-700">{stage.title}</h3>
      <p className="mt-1 text-sm font-extrabold text-earth">{stage.localTerm}</p>
      <p className="mt-3 text-sm font-semibold leading-7 text-mutedText">{stage.description}</p>
      {!compact ? (
        <div className="mt-4 rounded-xl bg-leaf-50 p-3 text-xs font-bold leading-5 text-slateText">
          Bukti: {stage.evidenceExamples.join(", ")}
        </div>
      ) : null}
    </EcoCard>
  );
}
