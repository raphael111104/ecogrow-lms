import Image from "next/image";
import { cn } from "@/lib/utils";

const ECOGROW_LOGO_ICON_SRC = "/assets/images/ecogrow-official-logo.png";

type EcoGrowLogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  subtitle?: string;
  inverted?: boolean;
  markOnly?: boolean;
  priority?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
};

const markSizes = {
  xs: "size-7 rounded-full",
  sm: "size-10 rounded-full",
  md: "size-12 rounded-full",
  lg: "size-14 rounded-full",
};

const textSizes = {
  xs: "text-base",
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

export function EcoGrowLogo({
  className,
  markClassName,
  textClassName,
  subtitle,
  inverted = false,
  markOnly = false,
  priority = false,
  size = "md",
}: EcoGrowLogoProps) {
  const textColor = inverted ? "text-white" : "text-leaf-700";
  const subtitleColor = inverted ? "text-white/75" : "text-mutedText";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative grid shrink-0 place-items-center overflow-hidden bg-white shadow-soft ring-1 ring-black/5",
          markSizes[size],
          markClassName,
        )}
      >
        <Image
          src={ECOGROW_LOGO_ICON_SRC}
          alt={markOnly ? "Logo EcoGrow Learning" : ""}
          fill
          sizes={size === "lg" ? "56px" : size === "md" ? "48px" : size === "sm" ? "40px" : "28px"}
          className="rounded-full object-cover"
          priority={priority}
        />
      </span>
      {!markOnly && (
        <span className="min-w-0">
          <span
            className={cn(
              "block truncate font-heading font-black leading-none",
              textSizes[size],
              textColor,
              textClassName,
            )}
          >
            EcoGrow
          </span>
          {subtitle && (
            <span className={cn("mt-1 block truncate text-xs font-bold leading-none", subtitleColor)}>
              {subtitle}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
