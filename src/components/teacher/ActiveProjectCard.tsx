import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";
import { EcoProgress } from "@/components/ui/EcoProgress";
import { EcoCard } from "@/components/ui/EcoCard";
import { studentJourneySteps } from "@/data";
import type { EcoProject } from "@/types/ecogrow";
import { cn } from "@/lib/utils";

export function ActiveProjectCard({ project }: { project: EcoProject }) {
  const activeIndex = studentJourneySteps.findIndex((step) => step.stage === project.currentStage);

  return (
    <EcoCard tone="soft">
      <div className="flex items-center gap-3">
        <Sprout className="size-7 text-leaf-700" aria-hidden="true" />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Proyek Aktif</p>
          <h2 className="font-heading text-2xl font-black text-leaf-700">{project.title}</h2>
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold leading-6 text-mutedText">{project.description}</p>
      <EcoProgress value={project.progress} label="Kemajuan kelas" className="mt-5" />
      <div className="mt-5 grid grid-cols-5 gap-2" aria-label="Tahap proyek aktif">
        {studentJourneySteps.map((step, index) => (
          <div
            key={step.stage}
            className={cn(
              "rounded-xl p-2 text-center text-[0.68rem] font-black",
              index < activeIndex ? "bg-leaf-700 text-white" : index === activeIndex ? "bg-sun text-leaf-800" : "bg-white text-mutedText",
            )}
          >
            {step.label}
          </div>
        ))}
      </div>
      <Link href="/guru/proyek" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-leaf-700">
        Kelola proyek <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </EcoCard>
  );
}
