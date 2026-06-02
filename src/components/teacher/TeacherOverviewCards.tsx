import { BookOpenCheck, MessageSquareText, Users, UserRoundCheck } from "lucide-react";
import { EcoCard } from "@/components/ui/EcoCard";
import { teacherOverviewCards } from "@/data";

const icons = [Users, BookOpenCheck, MessageSquareText, UserRoundCheck];
const tones = ["soft", "white", "cream", "cream"] as const;

export function TeacherOverviewCards() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan operasional kelas">
      {teacherOverviewCards.map((card, index) => {
        const Icon = icons[index];

        return (
          <EcoCard key={card.id} tone={tones[index]} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.13em] text-mutedText">{card.label}</p>
                <p className="mt-2 font-heading text-4xl font-black text-leaf-700">{card.value}</p>
              </div>
              <span className="grid size-10 place-items-center rounded-xl bg-white text-leaf-700 shadow-soft">
                <Icon className="size-5" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-mutedText">{card.note}</p>
          </EcoCard>
        );
      })}
    </section>
  );
}
