import { Award, MessageCircleMore } from "lucide-react";
import { studentTeacherMessage } from "@/data";
import { EcoCard } from "@/components/ui/EcoCard";
import type { Badge } from "@/types/ecogrow";

export function BadgePreview({ badges }: { badges: Badge[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
      <EcoCard>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Hadiah Badge</p>
        <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Capaian terbarumu</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {badges.slice(0, 3).map((badge) => (
            <div key={badge.id} className="rounded-2xl bg-cream p-4 text-center">
              <Award className="mx-auto size-7 text-harvest" aria-hidden="true" />
              <p className="mt-2 text-sm font-black text-leaf-700">{badge.name}</p>
            </div>
          ))}
        </div>
      </EcoCard>
      <EcoCard tone="soft">
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-leaf-700">
            <MessageCircleMore className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Pesan Bu Guru</p>
            <p className="mt-3 font-heading text-xl font-black leading-8 text-leaf-700">
              &ldquo;{studentTeacherMessage}&rdquo;
            </p>
          </div>
        </div>
      </EcoCard>
    </div>
  );
}
