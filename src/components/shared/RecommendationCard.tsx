import Link from "next/link";
import { ArrowRight, Lightbulb, Sparkles, Wrench } from "lucide-react";
import { EcoCard } from "@/components/ui/EcoCard";
import { cn } from "@/lib/utils";
import type { Recommendation } from "@/types/ecogrow";

const recommendationTone: Record<Recommendation["type"], string> = {
  remedial: "bg-red-50 text-red-700",
  action: "bg-sun/25 text-earth",
  enrichment: "bg-leaf-100 text-leaf-700",
  info: "bg-sky/15 text-sky",
};

const recommendationIcon = {
  remedial: Wrench,
  action: ArrowRight,
  enrichment: Sparkles,
  info: Lightbulb,
};

export function RecommendationCard({ item, className }: { item: Recommendation; className?: string }) {
  const Icon = recommendationIcon[item.type];

  return (
    <EcoCard className={cn("p-4", className)}>
      <div className="flex items-start gap-3">
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-lg", recommendationTone[item.type])}>
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-heading text-xl font-black text-leaf-700">{item.title}</p>
          <p className="mt-1.5 text-sm font-semibold leading-6 text-mutedText">{item.reason}</p>
          <Link href={item.targetHref} className="mt-3 inline-flex items-center gap-2 text-sm font-black text-leaf-700 hover:text-leaf-500">
            {item.actionLabel ?? "Buka tindak lanjut"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </EcoCard>
  );
}
