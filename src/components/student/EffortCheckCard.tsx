import { CheckCircle2 } from "lucide-react";
import { EcoCard } from "@/components/ui/EcoCard";
import { cn } from "@/lib/utils";

export const studentEffortOptions = [
  "Mengamati tanaman dengan teliti.",
  "Membantu teman.",
  "Menjaga kebersihan.",
  "Menulis jurnal.",
];

type EffortCheckCardProps = {
  selected: string[];
  onToggle: (effort: string) => void;
  className?: string;
};

export function EffortCheckCard({ selected, onToggle, className }: EffortCheckCardProps) {
  return (
    <EcoCard tone="soft" className={className}>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Cek Usahaku</p>
      <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Hari ini aku...</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-mutedText">
        Tandai hal baik yang sudah kamu coba hari ini.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {studentEffortOptions.map((effort) => {
          const active = selected.includes(effort);

          return (
            <button
              key={effort}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(effort)}
              className={cn(
                "flex min-h-16 items-center gap-3 rounded-2xl border p-3 text-left text-sm font-bold transition",
                active
                  ? "border-leaf-500 bg-white text-leaf-700 shadow-soft"
                  : "border-transparent bg-white/65 text-slateText hover:border-leaf-500/25",
              )}
            >
              <CheckCircle2 className={cn("size-5 shrink-0", active ? "text-leaf-500" : "text-leaf-200")} aria-hidden="true" />
              {effort}
            </button>
          );
        })}
      </div>
    </EcoCard>
  );
}
