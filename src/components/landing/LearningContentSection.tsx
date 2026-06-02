"use client";

import Image from "next/image";
import { ArrowRight, BookOpen, ClipboardCheck, FileText, FolderOpen, Medal, Sprout, Trophy } from "lucide-react";
import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoButton } from "@/components/ui/EcoButton";
import { ecogrowTeachingModules } from "@/data";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const contentItems = [
  { title: "Modul Ajar IPAS", detail: "CP, TP, empat pertemuan", icon: BookOpen },
  { title: "LKPD Digital", detail: "Lima tahap EcoGrow", icon: FileText },
  { title: "EcoReadiness", detail: "Diagnostik awal", icon: ClipboardCheck },
  { title: "EcoMission Checkpoint", detail: "Formatif berbasis aksi", icon: Sprout },
  { title: "EcoMaster Quiz", detail: "Sumatif dan HOTS", icon: Trophy },
  { title: "Eco-Exhibition Rubric", detail: "Performance karya", icon: Medal },
  { title: "Portofolio Digital", detail: "Evidence utuh", icon: FolderOpen },
];

const learningFlow = [
  "Guru menyusun Modul Ajar",
  "Siswa mengerjakan EcoReadiness",
  "Belajar melalui EcoLearn",
  "Melaksanakan EcoMission dan LKPD",
  "Mengisi jurnal ekologis",
  "Mengerjakan EcoMaster Quiz",
  "Memamerkan Eco-Exhibition",
  "Tersimpan di Portofolio Digital",
];

export function LearningContentSection() {
  const module = ecogrowTeachingModules[0];

  return (
    <section className="relative overflow-hidden bg-leaf-50/60 py-24">
      <div className="eco-container space-y-14">
        <AnimatedSection>
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf-500">Muatan pembelajaran</p>
            <h2 className="mt-4 font-heading text-4xl font-black leading-tight text-leaf-700 md:text-6xl">
              Perangkat ajar nyata, dari modul sampai karya.
            </h2>
            <p className="mt-5 text-base leading-8 text-mutedText md:text-lg">
              EcoGrow memuat asesmen, LKPD, refleksi, dan pameran yang terhubung pada proyek tanaman, bukan sekadar daftar menu.
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
          {contentItems.map((item) => (
            <StaggerItem key={item.title}>
              <article className="h-full rounded-[1.2rem] border border-gardenBorder bg-white/85 p-5 shadow-soft">
                <item.icon className="size-7 text-leaf-700" />
                <h3 className="mt-4 font-heading text-xl font-black text-leaf-700">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold text-mutedText">{item.detail}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <AnimatedSection>
            <div className="rounded-[1.35rem] border border-gardenBorder bg-white p-6 shadow-soft md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf-500">Alur belajar dari modul ke portofolio</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {learningFlow.map((step, index) => (
                  <div key={step} className="flex gap-3 rounded-xl bg-leaf-50 p-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-leaf-700 font-heading font-black text-white">{index + 1}</span>
                    <p className="text-sm font-bold leading-6 text-slateText">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.12}>
            <article className="overflow-hidden rounded-[1.35rem] border border-gardenBorder bg-white shadow-eco">
              <div className="relative aspect-[16/9]">
                <Image src="/assets/images/hydroponic-farming-usda-public-domain.jpg" alt="Tanaman hidroponik untuk modul fotosintesis EcoGrow" fill className="object-cover" sizes="(min-width: 1024px) 42vw, 100vw" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  <EcoBadge>IPAS</EcoBadge>
                  <EcoBadge className="bg-sun/25 text-earth">Fase B / Kelas 4</EcoBadge>
                  <EcoBadge className="bg-sky/15 text-sky">4 pertemuan</EcoBadge>
                </div>
                <h3 className="mt-4 font-heading text-2xl font-black text-leaf-700">{module.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-mutedText">Proyek: Kangkung Hidroponik - SDG 2, SDG 4, SDG 13, dan SDG 15.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <EcoButton href="/siswa/ecoreadiness" size="sm" icon={<ArrowRight className="size-4" />}>Lihat Demo Siswa</EcoButton>
                  <EcoButton href="/guru/modul-ajar" size="sm" variant="secondary">Lihat Demo Guru</EcoButton>
                </div>
              </div>
            </article>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
