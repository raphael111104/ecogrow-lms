"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { EcoGrowStageCard } from "@/components/ecogrow/EcoGrowStageCard";
import { EcoCard } from "@/components/ui/EcoCard";
import { ecogrowStages } from "@/data/ecogrow-stages";
import { concepts } from "@/data/ecogrow";
import { ecoAssets } from "@/data/assets";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const aquaponicsImage =
  ecoAssets.localAssets.find((asset) => asset.name === "Aquaponics hydroponics CC0")?.url ??
  "/assets/images/aquaponics-hydroponics-cc0.jpg";

const conceptNotes = [
  "Kebun sekolah menjadi konteks belajar",
  "Misi singkat menjaga ritme kelas",
  "Jurnal dan galeri menyimpan bukti proses",
];

export function KonsepSection() {
  return (
    <section id="konsep" className="section-band relative overflow-hidden py-24">
      <div className="eco-container relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <AnimatedSection>
            <div className="max-w-xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf-500">
                Konsep LMS
              </p>
              <h2 className="mt-4 font-heading text-4xl font-black leading-tight text-leaf-700 md:text-6xl">
                Belajar ekologi sebagai siklus yang terlihat.
              </h2>
              <p className="mt-5 text-base leading-8 text-mutedText md:text-lg">
                EcoGrow merangkum materi, misi, asesmen, dan portofolio dalam satu
                alur sederhana agar guru mudah memandu, siswa mudah bergerak.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <div className="relative min-h-[22rem] overflow-hidden rounded-[1.35rem] border border-gardenBorder bg-leaf-700 shadow-eco">
              <Image
                src={aquaponicsImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(6,42,22,0.88),rgba(6,42,22,0.38)_58%,rgba(246,195,67,0.10))]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-sun">
                  Smart Eco-Food School
                </p>
                <p className="mt-3 max-w-md text-sm font-semibold leading-7 text-white/78">
                  Dari tanaman, air, tanah, kompos, hingga panen, semuanya menjadi
                  bahan belajar yang bisa diamati langsung.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <StaggerContainer className="mt-10 grid gap-4 md:grid-cols-3" staggerDelay={0.12}>
          {concepts.map((concept, index) => (
            <StaggerItem key={concept.title}>
              <EcoCard className="min-h-[17rem] p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className={`grid size-12 place-items-center rounded-xl ${concept.accent}`}>
                    <concept.icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-5xl font-black text-leaf-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-heading text-2xl font-black text-leaf-700">
                  {concept.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-mutedText">
                  {concept.description}
                </p>
              </EcoCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.15}>
          <div className="mt-6 grid gap-3 rounded-[1.35rem] border border-gardenBorder bg-white/70 p-3 shadow-soft backdrop-blur-xl md:grid-cols-3">
            {conceptNotes.map((note) => (
              <div key={note} className="flex items-center gap-3 rounded-2xl bg-white/72 px-4 py-3">
                <CheckCircle2 className="size-5 shrink-0 text-leaf-500" aria-hidden="true" />
                <span className="text-sm font-extrabold text-leaf-700">{note}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export function PancanitiSection() {
  return (
    <section id="alur-ecogrow" className="relative scroll-mt-28 overflow-hidden py-20">
      <div className="eco-container">
        <AnimatedSection>
          <div className="border-y border-gardenBorder/80 py-14">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf-500">
                  Alur Pembelajaran EcoGrow
                </p>
                <h2 className="mt-4 max-w-3xl font-heading text-3xl font-black leading-tight text-leaf-700 md:text-5xl">
                  Recognize, Explore, Execute, Reflect, lalu Exhibit.
                </h2>
              </div>
              <div className="space-y-4">
                <p className="max-w-2xl text-base leading-8 text-mutedText">
                  EcoGrow Learning mengembangkan Pancaniti menjadi sintaks ekologis:
                  mengenali alam, mengeksplorasi makna, melakukan aksi nyata,
                  merefleksikan dampak, hingga menampilkan penguasaan melalui karya
                  dan praktik baik.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Recognize", "Explore", "Execute", "Reflect", "Exhibit"].map((label) => (
                    <span key={label} className="rounded-full border border-leaf-500/20 bg-white/80 px-3 py-1 text-xs font-black text-leaf-700 shadow-soft">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <StaggerContainer className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.09}>
              {ecogrowStages.map((stage) => (
                <StaggerItem key={stage.id}>
                  <EcoGrowStageCard stage={stage} className="min-h-[21rem]" />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
