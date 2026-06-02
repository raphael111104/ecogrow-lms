import { ArrowRight, ClipboardList, Sprout } from "lucide-react";
import { studentJourneySteps } from "@/data";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { EcoCard } from "@/components/ui/EcoCard";
import { EcoProgress } from "@/components/ui/EcoProgress";
import type { EcoMission, EcoProject } from "@/types/ecogrow";

export function TodayMissionCard({
  mission,
  project,
}: {
  mission: EcoMission;
  project: EcoProject;
}) {
  const stage = studentJourneySteps.find((step) => step.stage === mission.stage);

  return (
    <EcoCard tone="cream" className="p-6 md:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-earth">Misi Hari Ini</p>
          <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-leaf-700">
            Rawat Tanaman Kangkungmu
          </h2>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-leaf-100 text-leaf-700">
          <Sprout className="size-6" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <EcoBadge className="bg-leaf-700 text-white">
          Tahap: {stage?.label ?? "Aksi"}
        </EcoBadge>
        <EcoBadge className="bg-white text-earth">+{mission.points} EcoPoint</EcoBadge>
      </div>
      <p className="mt-4 text-sm font-semibold leading-7 text-mutedText">
        Ayo cek tinggi tanaman, lihat warna daunnya, lalu unggah foto hari ini.
      </p>
      <EcoProgress value={project.progress} label="Misi sudah berjalan" className="mt-5" color="green" />
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <EcoButton
          href="/siswa/ecomission"
          variant="reward"
          fullWidth
          className="sm:w-auto"
          icon={<ArrowRight className="size-4" />}
        >
          Lanjutkan Misi
        </EcoButton>
        <EcoButton
          href="/siswa/ecomission"
          variant="secondary"
          fullWidth
          className="sm:w-auto"
          icon={<ClipboardList className="size-4" />}
        >
          Lihat Petunjuk
        </EcoButton>
      </div>
    </EcoCard>
  );
}
