import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoCard } from "@/components/ui/EcoCard";

type ResultCardProps = {
  title: string;
  score: number;
  detail: string;
  recommendation: { type: "remedial" | "standard" | "enrichment"; title: string; description: string };
};

export function AssessmentResultCard({ title, score, detail, recommendation }: ResultCardProps) {
  return (
    <EcoCard tone={recommendation.type === "remedial" ? "cream" : "soft"}>
      <EcoBadge className="bg-white text-earth">{recommendation.title}</EcoBadge>
      <h2 className="mt-4 font-heading text-xl font-black text-leaf-700">{title}</h2>
      <p className="mt-3 font-heading text-5xl font-black text-leaf-700">{score}</p>
      <p className="mt-2 text-sm font-bold text-slateText">{detail}</p>
      <p className="mt-4 text-sm font-semibold leading-6 text-mutedText">{recommendation.description}</p>
    </EcoCard>
  );
}
