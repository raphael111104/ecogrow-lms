import Image from "next/image";
import { Ruler, Sprout } from "lucide-react";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import type { JournalEntry } from "@/types/ecogrow";

export function MyPlantCard({ journal }: { journal?: JournalEntry }) {
  return (
    <EcoCard className="flex h-full flex-col">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Tanamanku</p>
      <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-2xl bg-leaf-50">
        {journal?.photoUrl ? (
          <Image src={journal.photoUrl} alt="Tanaman kangkung milik kelompok" fill className="object-cover" />
        ) : (
          <Sprout className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-leaf-500" />
        )}
      </div>
      <h2 className="mt-4 font-heading text-2xl font-black text-leaf-700">Kangkung Hidroponik</h2>
      <div className="mt-3 flex gap-3 text-sm font-bold text-mutedText">
        <span className="rounded-xl bg-leaf-50 px-3 py-2">
          Hari ke-10
        </span>
        <span className="flex items-center gap-1 rounded-xl bg-leaf-50 px-3 py-2">
          <Ruler className="size-4" aria-hidden="true" />
          {journal?.plantHeightCm ?? 29} cm
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold text-leaf-700">Kondisi: Sehat dan segar</p>
      <EcoButton href="/siswa/ecomission" variant="secondary" fullWidth className="mt-auto">
        Catat Perkembangan
      </EcoButton>
    </EcoCard>
  );
}
