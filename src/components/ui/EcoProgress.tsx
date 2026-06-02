import { cn } from "@/lib/utils";

type EcoProgressProps = {
  value: number;
  label?: string;
  color?: "green" | "blue" | "yellow" | "orange";
  className?: string;
};

const colorMap = {
  green: "bg-leaf-500",
  blue: "bg-sky",
  yellow: "bg-sun",
  orange: "bg-harvest",
};

export function EcoProgress({
  value,
  label,
  color = "green",
  className,
}: EcoProgressProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <div className="flex items-center justify-between text-sm font-bold text-current">
          <span>{label}</span>
          <span>{safeValue}%</span>
        </div>
      ) : null}
      <div
        className="h-3 overflow-hidden rounded-full bg-slate-100 shadow-inner"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
        aria-label={label ?? `Progress ${safeValue}%`}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_18px_rgba(22,122,58,0.2)]", colorMap[color])}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
