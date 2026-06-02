import { ArrowRight, Sparkles } from "lucide-react";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { cn } from "@/lib/utils";

type SuggestedAction = {
  href: string;
  label: string;
};

type NextSuggestedActionCardProps = {
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  eyebrow?: string;
  secondaryAction?: SuggestedAction;
  tone?: "soft" | "cream";
  className?: string;
};

export function NextSuggestedActionCard({
  title,
  description,
  href,
  actionLabel,
  eyebrow = "Langkah Berikutnya",
  secondaryAction,
  tone = "soft",
  className,
}: NextSuggestedActionCardProps) {
  return (
    <EcoCard tone={tone} className={cn("flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6", className)}>
      <div className="max-w-2xl">
        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-leaf-500">
          <Sparkles className="size-4 text-harvest" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">{title}</h2>
        <p className="mt-2 text-sm font-semibold leading-7 text-mutedText">{description}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
        <EcoButton href={href} variant="reward" icon={<ArrowRight className="size-4" />}>
          {actionLabel}
        </EcoButton>
        {secondaryAction ? (
          <EcoButton href={secondaryAction.href} variant="secondary">
            {secondaryAction.label}
          </EcoButton>
        ) : null}
      </div>
    </EcoCard>
  );
}
