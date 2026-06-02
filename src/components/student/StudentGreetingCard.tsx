import { Award, Leaf } from "lucide-react";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoCard } from "@/components/ui/EcoCard";
import type { StudentProfile, User } from "@/types/ecogrow";

type StudentGreetingCardProps = {
  user: User;
  profile: StudentProfile;
  badgeName?: string;
};

export function StudentGreetingCard({
  user,
  profile,
  badgeName = "Penjaga Tanaman",
}: StudentGreetingCardProps) {
  return (
    <EcoCard
      tone="dark"
      className="bg-[linear-gradient(118deg,#073b21_0%,#0b4f2a_56%,#167a3a_100%)] p-6 md:p-7"
    >
      <div className="absolute -right-14 -top-20 size-52 rounded-full border border-white/10 bg-sun/10" aria-hidden="true" />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <EcoBadge className="bg-white/12 text-sun" icon={<Leaf className="size-3.5" />}>
            Petualangan hari ini
          </EcoBadge>
          <h1 className="mt-4 font-heading text-3xl font-black leading-tight text-white md:text-4xl">
            Halo, {user.name}. Siap merawat bumi hari ini?
          </h1>
          <p className="mt-2 text-sm font-semibold text-white/75">
            Kelas 4B - {profile.groupName}
          </p>
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
            <p className="text-[0.68rem] font-black uppercase tracking-wide text-white/60">EcoPoint</p>
            <p className="mt-1 font-heading text-2xl font-black text-sun">{profile.points}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
            <p className="text-[0.68rem] font-black uppercase tracking-wide text-white/60">Badge aktif</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-black text-white">
              <Award className="size-4 text-sun" aria-hidden="true" />
              {badgeName}
            </p>
          </div>
        </div>
      </div>
    </EcoCard>
  );
}
