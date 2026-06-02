import { Activity, Compass, Eye, RefreshCcw, Trophy } from "lucide-react";
import { getEcoGrowStage } from "@/data/ecogrow-stages";
import { cn } from "@/lib/utils";
import type { EcoGrowStageId } from "@/types/ecogrow-stage";

type EcoGrowStageBadgeProps = {
  stageId: EcoGrowStageId;
  variant?: "solid" | "soft" | "outline";
  showLocalTerm?: boolean;
  showShortLabel?: boolean;
  className?: string;
};

const stageStyles: Record<EcoGrowStageId, { solid: string; soft: string; outline: string; icon: typeof Eye }> = {
  recognition: {
    solid: "bg-leaf-700 text-white",
    soft: "bg-leaf-100 text-leaf-700",
    outline: "border-leaf-500/35 bg-white text-leaf-700",
    icon: Eye,
  },
  exploration: {
    solid: "bg-emerald-700 text-white",
    soft: "bg-emerald-50 text-emerald-800",
    outline: "border-emerald-500/35 bg-white text-emerald-800",
    icon: Compass,
  },
  execution: {
    solid: "bg-harvest text-white",
    soft: "bg-sun/25 text-earth",
    outline: "border-sun/50 bg-white text-earth",
    icon: Activity,
  },
  reflection: {
    solid: "bg-sky text-white",
    soft: "bg-sky/15 text-sky",
    outline: "border-sky/35 bg-white text-sky",
    icon: RefreshCcw,
  },
  exhibition: {
    solid: "bg-slate-900 text-white",
    soft: "bg-indigo-50 text-indigo-800",
    outline: "border-indigo-500/35 bg-white text-indigo-800",
    icon: Trophy,
  },
};

export function EcoGrowStageBadge({
  stageId,
  variant = "soft",
  showLocalTerm = true,
  showShortLabel = false,
  className,
}: EcoGrowStageBadgeProps) {
  const stage = getEcoGrowStage(stageId);
  const Icon = stageStyles[stageId].icon;
  const label = showShortLabel
    ? stage.shortLabel
    : showLocalTerm
      ? `${stage.title} (${stage.localTerm})`
      : stage.title;

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border border-transparent px-3 py-1 text-xs font-black leading-5",
        stageStyles[stageId][variant],
        className,
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </span>
  );
}

export { stageStyles as ecoGrowStageStyles };
