import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { getEcoGrowStageLabel } from "@/data/ecogrow-stages";
import { cn } from "@/lib/utils";
import type { Evidence } from "@/types/ecogrow";

export function EvidencePreview({ evidence, className }: { evidence: Evidence; className?: string }) {
  return (
    <article className={cn("overflow-hidden rounded-xl border border-gardenBorder bg-white shadow-soft", className)}>
      <div className="relative grid aspect-[16/10] place-items-center bg-leaf-50">
        {evidence.imageUrl ? (
          <Image src={evidence.imageUrl} alt={evidence.title} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />
        ) : (
          <ImageIcon className="size-10 text-leaf-500" aria-hidden="true" />
        )}
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {evidence.stage ? <EcoBadge className="bg-leaf-100 text-leaf-700">{getEcoGrowStageLabel(evidence.stage)}</EcoBadge> : null}
          {evidence.status ? <StatusBadge status={evidence.status} /> : null}
        </div>
        <h3 className="mt-3 font-heading text-xl font-black text-leaf-700">{evidence.title}</h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">{evidence.description}</p>
      </div>
    </article>
  );
}
