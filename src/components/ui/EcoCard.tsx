import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type EcoCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: "white" | "soft" | "cream" | "dark";
};

const tones = {
  white: "border-gardenBorder/80 bg-white/[0.88]",
  soft: "border-leaf-500/20 bg-leaf-100/70",
  cream: "border-sun/35 bg-cream/[0.82]",
  dark: "border-white/15 bg-[#062A16] text-white",
};

export function EcoCard({
  children,
  className,
  tone = "white",
  ...props
}: EcoCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[1.35rem] border p-5 shadow-cardStroke backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-eco",
        "before:pointer-events-none before:absolute before:inset-x-5 before:top-0 before:h-px before:bg-white/80",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
