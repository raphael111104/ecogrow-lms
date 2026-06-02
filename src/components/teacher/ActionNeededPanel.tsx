import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { teacherActionItems } from "@/data";
import { cn } from "@/lib/utils";

const priorityLabel = {
  high: "Segera",
  medium: "Hari ini",
  low: "Berikutnya",
};

export function ActionNeededPanel() {
  return (
    <EcoCard>
      <div className="flex items-center gap-3">
        <ClipboardCheck className="size-7 text-leaf-700" aria-hidden="true" />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Perlu Aksi</p>
          <h2 className="font-heading text-2xl font-black text-leaf-700">Yang harus ditangani hari ini</h2>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {teacherActionItems.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="flex items-center gap-3 rounded-2xl border border-gardenBorder bg-white p-4 transition hover:border-leaf-500/30 hover:bg-leaf-50"
          >
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[0.68rem] font-black uppercase",
                action.priority === "high" ? "bg-red-50 text-red-700" : action.priority === "medium" ? "bg-sun/25 text-earth" : "bg-leaf-100 text-leaf-700",
              )}
            >
              {priorityLabel[action.priority]}
            </span>
            <span className="min-w-0 flex-1 text-sm font-bold text-slateText">{action.title}</span>
            <ArrowRight className="size-4 shrink-0 text-leaf-700" aria-hidden="true" />
          </Link>
        ))}
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        <EcoButton href="/guru/monitoring" size="sm">Tinjau Jurnal</EcoButton>
        <EcoButton href="/guru/asesmen" variant="secondary" size="sm">Lihat Asesmen</EcoButton>
        <EcoButton href="/guru/galeri" variant="secondary" size="sm">Moderasi Galeri</EcoButton>
      </div>
    </EcoCard>
  );
}
