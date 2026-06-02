import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import type { EcoGrowTeachingModule } from "@/types/ecogrow";

export function TeachingModuleSummaryCard({ module, compact = false }: { module: EcoGrowTeachingModule; compact?: boolean }) {
  return (
    <EcoCard tone="cream">
      <div className="flex flex-wrap gap-2">
        <EcoBadge className="bg-leaf-100 text-leaf-700">{module.subject}</EcoBadge>
        <EcoBadge className="bg-white text-earth">Fase {module.phase} / Kelas {module.grade}</EcoBadge>
        <EcoBadge className="bg-sun/25 text-earth">{module.duration}</EcoBadge>
      </div>
      <h2 className="mt-4 font-heading text-2xl font-black leading-tight text-leaf-700">{module.title}</h2>
      <p className="mt-3 text-sm font-semibold leading-7 text-mutedText">{module.meaningfulUnderstanding}</p>
      {!compact ? (
        <div className="mt-4 space-y-2">
          {module.objectives.slice(0, 3).map((objective) => (
            <p key={objective} className="rounded-xl bg-white/80 p-3 text-sm font-bold text-slateText">{objective}</p>
          ))}
        </div>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-2">
        <EcoButton href="/siswa/ecolearn" size="sm">Buka Materi</EcoButton>
        <EcoButton href="/siswa/ecomission" size="sm" variant="secondary">Buka LKPD</EcoButton>
      </div>
    </EcoCard>
  );
}
