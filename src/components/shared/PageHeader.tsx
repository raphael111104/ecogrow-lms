import type { ReactNode } from "react";
import { EcoBadge } from "@/components/ui/EcoBadge";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  actions?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  badge,
  actions,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-5 rounded-[1.75rem] border border-gardenBorder/80 bg-white/85 p-5 shadow-cardStroke backdrop-blur md:flex-row md:items-end md:justify-between md:p-7">
      <div className="max-w-2xl">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf-500">{eyebrow}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="font-heading text-3xl font-black leading-tight text-leaf-700 md:text-4xl">{title}</h1>
          {badge ? <EcoBadge className="bg-sun/25 text-earth">{badge}</EcoBadge> : null}
        </div>
        <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-mutedText md:text-base">
          {description}
        </p>
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
    </header>
  );
}
