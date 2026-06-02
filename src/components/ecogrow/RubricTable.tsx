import { EcoCard } from "@/components/ui/EcoCard";

type RubricItem = {
  id: string;
  aspect: string;
  excellent: string;
  good: string;
  developing: string;
  needsSupport: string;
  maxScore: number;
};

export function RubricTable({ rubrics }: { rubrics: RubricItem[] }) {
  return (
    <EcoCard>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs font-black uppercase tracking-wide text-mutedText">
            <tr>
              <th className="px-3 py-3">Aspek</th>
              <th className="px-3 py-3">Unggul</th>
              <th className="px-3 py-3">Berkembang</th>
              <th className="px-3 py-3">Skor</th>
            </tr>
          </thead>
          <tbody>
            {rubrics.map((rubric) => (
              <tr key={rubric.id} className="border-t border-gardenBorder align-top">
                <td className="px-3 py-3 font-bold text-leaf-700">{rubric.aspect}</td>
                <td className="px-3 py-3 text-slateText">{rubric.excellent}</td>
                <td className="px-3 py-3 text-mutedText">{rubric.developing}</td>
                <td className="px-3 py-3 font-black text-earth">{rubric.maxScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </EcoCard>
  );
}
