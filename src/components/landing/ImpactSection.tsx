"use client";

import { HeartHandshake, Leaf, School } from "lucide-react";
import { landingImpactMetrics } from "@/data";
import { AnimatedSection } from "./AnimatedSection";

const icons = [Leaf, School, HeartHandshake];

export function ImpactSection() {
  return (
    <section id="dampak" className="relative scroll-mt-28 overflow-hidden bg-[#062A16] py-20 text-white">
      <div className="eco-container">
        <AnimatedSection>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sun">Dampak Pembelajaran</p>
              <h2 className="mt-4 font-heading text-4xl font-black leading-tight md:text-5xl">
                Satu perjalanan yang menghubungkan anak, guru, dan bumi.
              </h2>
              <p className="mt-5 text-base font-semibold leading-8 text-white/70">
                Dari misi kecil sampai laporan, EcoGrow menumbuhkan kebiasaan mengamati, merawat, dan bertanggung jawab.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {landingImpactMetrics.map((metric, index) => {
                const Icon = icons[index];

                return (
                  <article key={metric.id} className="rounded-2xl border border-white/12 bg-white/[0.08] p-5">
                    <Icon className="size-7 text-sun" aria-hidden="true" />
                    <p className="mt-5 font-heading text-5xl font-black">{metric.value}</p>
                    <h3 className="mt-2 font-heading text-lg font-black">{metric.label}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white/65">{metric.detail}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
