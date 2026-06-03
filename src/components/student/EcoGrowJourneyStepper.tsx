import { BookHeart, Compass, Eye, Sparkles, Sprout } from "lucide-react";
import { studentJourneySteps } from "@/data";
import { cn } from "@/lib/utils";
import type { EcoGrowStage } from "@/types/ecogrow";

type EcoGrowJourneyStepperProps = {
  activeStage: EcoGrowStage;
  compact?: boolean;
};

const icons = {
  NITI_HARTI: Eye,
  NITI_SURTI: Compass,
  NITI_BUKTI: Sprout,
  NITI_BAKTI: BookHeart,
  NITI_SAJATI: Sparkles,
};

export function EcoGrowJourneyStepper({
  activeStage,
  compact = false,
}: EcoGrowJourneyStepperProps) {
  const activeIndex = studentJourneySteps.findIndex((step) => step.stage === activeStage);

  return (
    <ol className="relative grid gap-3 sm:grid-cols-5" aria-label="Perjalanan belajar EcoGrow">
      <span
        className="absolute left-[10%] right-[10%] top-8 hidden border-t-2 border-dashed border-leaf-500/20 sm:block"
        aria-hidden="true"
      />
      {studentJourneySteps.map((step, index) => {
        const Icon = icons[step.stage];
        const active = step.stage === activeStage;
        const completed = index < activeIndex;

        return (
          <li
            key={step.stage}
            aria-current={active ? "step" : undefined}
            className={cn(
              "relative rounded-2xl border p-3.5 transition",
              active
                ? "border-sun bg-cream shadow-soft"
                : completed
                  ? "border-leaf-500/18 bg-leaf-50"
                  : "border-gardenBorder bg-white/80",
            )}
          >
            <span
              className={cn(
                "grid size-10 place-items-center rounded-xl",
                active
                  ? "bg-sun text-leaf-700"
                  : completed
                    ? "bg-leaf-500 text-white"
                    : "bg-slate-100 text-mutedText",
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-3 font-heading text-lg font-black text-leaf-700">{step.label}</p>
            <p className="text-xs font-bold text-earth">{step.localTerm}</p>
            {!compact ? (
              <p className="mt-2 text-xs font-semibold leading-5 text-mutedText">{step.detail}</p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
