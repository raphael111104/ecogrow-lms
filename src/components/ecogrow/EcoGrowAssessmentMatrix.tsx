import { EcoGrowStageBadge } from "@/components/ecogrow/EcoGrowStageBadge";
import type { EcoGrowAssessmentRow } from "@/types/ecogrow-stage";

export function EcoGrowAssessmentMatrix({ rows }: { rows: EcoGrowAssessmentRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] border-separate border-spacing-y-2 text-left text-sm">
        <thead className="text-mutedText">
          <tr>
            <th className="px-3 py-2">Tahap EcoGrow</th>
            <th className="px-3 py-2">Kognitif</th>
            <th className="px-3 py-2">Afektif</th>
            <th className="px-3 py-2">Psikomotor</th>
            <th className="px-3 py-2">Bukti</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.stageId} className="eco-table-row text-slateText">
              <td className="rounded-l-xl px-3 py-3">
                <EcoGrowStageBadge stageId={row.stageId} />
              </td>
              <td className="px-3 py-3">{row.cognitive}</td>
              <td className="px-3 py-3">{row.affective}</td>
              <td className="px-3 py-3">{row.psychomotor}</td>
              <td className="rounded-r-xl px-3 py-3">{row.evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
