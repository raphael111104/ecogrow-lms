import { EcoCard } from "@/components/ui/EcoCard";
import { EcoBadge } from "@/components/ui/EcoBadge";
import type { PerformanceRubric } from "@/types/ecogrow";

export function RubricScoreCard({ rubric }: { rubric: PerformanceRubric }) {
  return (
    <EcoCard className="p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-xl font-black text-leaf-700">{rubric.aspect}</h3>
        <EcoBadge className="bg-leaf-100 text-leaf-700">Skor {rubric.maxScore}</EcoBadge>
      </div>
      <div className="mt-4 space-y-2">
        {rubric.criteria.map((criterion) => (
          <p key={criterion} className="rounded-lg bg-leaf-50 p-3 text-sm font-bold leading-5 text-slateText">
            {criterion}
          </p>
        ))}
      </div>
    </EcoCard>
  );
}
