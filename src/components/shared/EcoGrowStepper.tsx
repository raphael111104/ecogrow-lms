import { CheckCircle2, Circle, LockKeyhole } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { getEcoGrowStageByCode } from "@/data/ecogrow-stages";
import { cn } from "@/lib/utils";
import type { EcoGrowStage, MissionStageProgress } from "@/types/ecogrow";

const stageCopy: Record<EcoGrowStage, { label: string; hint: string }> = {
  NITI_HARTI: { label: "Recognize", hint: "Ecological Recognition" },
  NITI_SURTI: { label: "Explore", hint: "Ecological Exploration" },
  NITI_BUKTI: { label: "Execute", hint: "Ecological Execution" },
  NITI_BAKTI: { label: "Reflect", hint: "Ecological Reflection" },
  NITI_SAJATI: { label: "Exhibit", hint: "Ecological Mastery & Exhibition" },
};

type EcoGrowStepperProps = {
  stages: MissionStageProgress[];
  activeStage?: EcoGrowStage;
  onSelect?: (stage: EcoGrowStage) => void;
  compact?: boolean;
};

export function EcoGrowStepper({ stages, activeStage, onSelect, compact = false }: EcoGrowStepperProps) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className={cn("grid min-w-[760px] gap-3", compact ? "md:grid-cols-5" : "md:grid-cols-5")}>
        {stages.map((item, index) => {
          const stage = getEcoGrowStageByCode(item.stage);
          const active = item.stage === activeStage;
          const done = item.status === "completed" || item.status === "reviewed";
          const locked = item.status === "locked";
          const Icon = locked ? LockKeyhole : done ? CheckCircle2 : Circle;
          const content = (
            <div
              className={cn(
                "h-full rounded-xl border p-3 text-left transition",
                active
                  ? "border-leaf-500/45 bg-leaf-50 shadow-soft"
                  : "border-gardenBorder bg-white/80",
                onSelect && "hover:-translate-y-0.5 hover:border-leaf-500/35",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="grid size-8 place-items-center rounded-lg bg-leaf-100 font-heading text-sm font-black text-leaf-700">
                  {index + 1}
                </span>
                <Icon className={cn("size-4", locked ? "text-mutedText" : done ? "text-leaf-600" : "text-sun")} />
              </div>
              <p className="mt-3 font-heading text-lg font-black text-leaf-700">{stageCopy[item.stage].label}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-mutedText">{stageCopy[item.stage].hint}</p>
              {!compact ? <p className="mt-1 text-xs font-bold text-earth">{stage.localTerm}</p> : null}
              {!compact ? (
                <>
                  <StatusBadge status={item.status} className="mt-3" />
                  <p className="mt-3 line-clamp-2 text-xs font-semibold leading-5 text-mutedText">{item.evidence}</p>
                </>
              ) : null}
            </div>
          );

          if (!onSelect || locked) return <div key={item.stage}>{content}</div>;

          return (
            <button key={item.stage} type="button" onClick={() => onSelect(item.stage)} className="text-left">
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
