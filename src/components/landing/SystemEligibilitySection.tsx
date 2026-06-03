"use client";

import { BarChart3, BookOpenCheck, GalleryHorizontal, GraduationCap, ShieldCheck, Sprout, UserRound } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const supportedFlows = [
  { label: "Role Siswa", icon: Sprout },
  { label: "Role Guru", icon: GraduationCap },
  { label: "EcoLearn", icon: BookOpenCheck },
  { label: "EcoMission", icon: Sprout },
  { label: "EcoPlay", icon: UserRound },
  { label: "Galeri Project", icon: GalleryHorizontal },
  { label: "EcoChallenge", icon: ShieldCheck },
  { label: "Ecomart", icon: Sprout },
  { label: "EcoMaster Quiz", icon: BookOpenCheck },
  { label: "Cerita Belajarku", icon: UserRound },
  { label: "Portofolio", icon: GalleryHorizontal },
  { label: "Dashboard Guru", icon: BarChart3 },
];

export function SystemEligibilitySection() {
  return (
    <section className="relative overflow-hidden bg-white/86 py-20">
      <div className="eco-container">
        <AnimatedSection>
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf-500">
                Kelayakan Sistem
              </p>
              <h2 className="mt-4 font-heading text-4xl font-black leading-tight text-leaf-700 md:text-5xl">
                Prototype siap dinilai sebagai LMS dua peran.
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-base leading-8 text-mutedText md:text-lg">
                EcoGrow Learning versi ini berfokus pada simulasi frontend berbasis mock data untuk Guru dan Peserta Didik. Alur Admin belum dikembangkan agar penilaian hak akses tetap jelas.
              </p>
              <div className="rounded-2xl border border-sun/35 bg-sun/12 px-4 py-3 text-sm font-extrabold leading-6 text-earth">
                Role yang tersedia: Guru dan Peserta Didik. Tidak ada role Admin pada versi prototype ini.
              </div>
            </div>
          </div>
        </AnimatedSection>

        <StaggerContainer className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.05}>
          {supportedFlows.map((item) => (
            <StaggerItem key={item.label}>
              <div className="flex min-h-16 items-center gap-3 rounded-2xl border border-gardenBorder bg-leaf-50/70 px-4 py-3 shadow-soft">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-leaf-700 shadow-soft">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-black text-leaf-700">{item.label}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
