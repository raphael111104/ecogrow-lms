import { CircleHelp, HandHelping, RefreshCw, Smile, Star } from "lucide-react";
import { studentMoodOptions } from "@/data";
import { cn } from "@/lib/utils";
import type { StudentMoodOption } from "@/types/ecogrow";

type MoodPickerProps = {
  selected: StudentMoodOption["id"] | null;
  onSelect: (mood: StudentMoodOption["id"]) => void;
};

const icons = {
  happy: Smile,
  confused: CircleHelp,
  proud: Star,
  retry: RefreshCw,
  help: HandHelping,
};

export function MoodPicker({ selected, onSelect }: MoodPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5" role="group" aria-label="Pilih perasaanmu">
      {studentMoodOptions.map((mood) => {
        const Icon = icons[mood.id];
        const active = mood.id === selected;

        return (
          <button
            key={mood.id}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(mood.id)}
            className={cn(
              "flex min-h-24 flex-col items-center justify-center rounded-2xl border px-2 py-3 text-center font-bold transition",
              active
                ? "border-sun bg-cream text-leaf-700 shadow-soft"
                : "border-gardenBorder bg-white text-mutedText hover:border-leaf-500/25",
            )}
          >
            <Icon className={cn("size-7", active ? "text-harvest" : "text-leaf-500")} aria-hidden="true" />
            <span className="mt-2 text-sm">{mood.label}</span>
          </button>
        );
      })}
    </div>
  );
}
