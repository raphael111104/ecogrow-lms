import { EcoGrowStageBadge } from "@/components/ecogrow/EcoGrowStageBadge";
import { EcoProgress } from "@/components/ui/EcoProgress";
import type { TeacherStageAnalytic } from "@/types/ecogrow-stage";

type EcoGrowStageAnalyticsProps = {
  data: TeacherStageAnalytic[];
  showSupportIndicator?: boolean;
};

export function EcoGrowStageAnalytics({ data, showSupportIndicator = true }: EcoGrowStageAnalyticsProps) {
  const dominant = data.reduce((current, item) => (item.activeStudents > current.activeStudents ? item : current), data[0]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-leaf-50 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-mutedText">Tahap dominan kelas saat ini</p>
        <div className="mt-2">
          <EcoGrowStageBadge stageId={dominant.stageId} />
        </div>
      </div>
      {data.map((item) => (
        <div key={item.stageId} className="rounded-xl border border-gardenBorder bg-white/82 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <EcoGrowStageBadge stageId={item.stageId} />
            <span className="font-heading text-2xl font-black text-leaf-700">{item.averageScore}</span>
          </div>
          <EcoProgress value={item.completionRate} label="Completion rate" className="mt-3" color={item.stageId === "execution" ? "orange" : item.stageId === "reflection" ? "blue" : "green"} />
          <div className="mt-3 grid gap-2 text-xs font-bold text-mutedText sm:grid-cols-3">
            <span>Selesai: {item.completedStudents}</span>
            <span>Aktif: {item.activeStudents}</span>
            {showSupportIndicator ? <span>Pendampingan: {item.needsSupport}</span> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
