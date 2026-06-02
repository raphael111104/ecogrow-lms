"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { EcoButton } from "@/components/ui/EcoButton";
import { ecoAssets } from "@/data/assets";
import { AnimatedSection } from "./AnimatedSection";

const ctaImage =
  ecoAssets.localAssets.find((asset) => asset.name === "Aquaponics hydroponics CC0")?.url ??
  "/assets/images/aquaponics-hydroponics-cc0.jpg";

export function CTASection() {
  return (
    <section className="bg-white/[0.84] py-20">
      <div className="eco-container">
        <AnimatedSection>
          <div className="relative min-h-[32rem] overflow-hidden rounded-[1.35rem] border border-gardenBorder bg-leaf-700 shadow-eco">
            <Image
              src={ctaImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,42,22,0.94),rgba(6,42,22,0.70)_48%,rgba(6,42,22,0.18)),linear-gradient(0deg,rgba(6,42,22,0.48),rgba(6,42,22,0.12))]" />
            <div className="absolute inset-0 fine-noise opacity-40" />

            <div className="relative flex min-h-[32rem] max-w-2xl flex-col justify-end p-7 text-white md:p-12">
              <div className="mb-5 inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.10] px-4 py-1.5 backdrop-blur-xl">
                <Sparkles className="size-4 text-sun" aria-hidden="true" />
                <span className="text-xs font-bold text-white/82">Masuk ke ruang belajar</span>
              </div>

              <h2 className="font-heading text-4xl font-black leading-tight md:text-6xl">
                Mulai dari satu misi kecil hari ini.
              </h2>

              <p className="mt-5 max-w-md leading-8 text-white/74">
                Pilih role Guru atau Peserta Didik, lalu jelajahi dashboard
                EcoGrow sebagai LMS ekologis.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <EcoButton href="/siswa/ecomission" icon={<ArrowRight className="size-5" />}>
                  Masuk sebagai Siswa
                </EcoButton>
                <EcoButton href="/guru" variant="secondary" icon={<Sparkles className="size-5" />}>
                  Masuk sebagai Guru
                </EcoButton>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
