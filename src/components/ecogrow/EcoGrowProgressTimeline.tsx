import { EcoGrowStageBadge } from "@/components/ecogrow/EcoGrowStageBadge";
import { EcoProgress } from "@/components/ui/EcoProgress";
import type { EcoGrowStage } from "@/types/ecogrow-stage";

export function EcoGrowProgressTimeline({ stages }: { stages: EcoGrowStage[] }) {
  return (
    <div className="space-y-3">
      {stages.map((stage) => (
        <div key={stage.id} className="rounded-xl border border-gardenBorder bg-white/80 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <EcoGrowStageBadge stageId={stage.id} />
            <span className="text-sm font-black text-mutedText">{stage.points ?? 0} EcoPoint</span>
          </div>
          <EcoProgress value={stage.progress ?? 0} label={stage.shortLabel} className="mt-3" color={stage.id === "execution" ? "orange" : stage.id === "reflection" ? "blue" : "green"} />
          <p className="mt-3 text-sm font-semibold leading-6 text-mutedText">{stage.studentAction}</p>
        </div>
      ))}
    </div>
  );
}
