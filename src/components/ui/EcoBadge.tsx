import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EcoBadgeProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

export function EcoBadge({ children, className, icon }: EcoBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center gap-2 rounded-full border border-current/10 px-3 py-1 text-xs font-extrabold shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]",
        className ?? "bg-leaf-100 text-leaf-700",
      )}
    >
      {icon}
      {children}
    </span>
  );
}
