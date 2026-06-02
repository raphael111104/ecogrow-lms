"use client";

import { motion } from "framer-motion";
import { sdgs } from "@/data/ecogrow";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const sdgColors = ["#DDA63A", "#C5192D", "#3F7E44", "#56C02B"];

export function SDGsSection() {
  return (
    <section
      id="sdgs"
      className="relative overflow-hidden bg-[#062A16] py-24 text-white"
    >
      <div className="absolute inset-0 fine-noise opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />

      <div className="eco-container relative">
        <AnimatedSection>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sun">
                SDGs
              </p>
              <h2 className="mt-4 font-heading text-4xl font-black leading-tight md:text-6xl">
                Isu global dibuat dekat, kecil, dan bisa dilakukan.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-white/68 md:text-lg">
              EcoGrow menghubungkan pembelajaran pangan, pendidikan, iklim, dan
              kehidupan darat ke aktivitas yang dapat dilihat siswa di sekolah.
            </p>
          </div>
          <div className="mt-9 flex flex-col gap-3 rounded-2xl border border-white/12 bg-white/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sun">Kearifan Lokal</p>
              <p className="mt-2 font-heading text-2xl font-black">Berguru pada Bumi</p>
            </div>
            <p className="max-w-2xl text-sm font-semibold leading-7 text-white/68">
              Siswa belajar silih asah, silih asih, dan silih asuh melalui kebiasaan merawat tanaman serta saling membantu dalam kelompok.
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4" staggerDelay={0.1}>
          {sdgs.map((item, index) => (
            <StaggerItem key={item.code}>
              <article className="group relative min-h-[20rem] overflow-hidden rounded-[1.2rem] border border-white/[0.12] bg-white/[0.07] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.10]">
                <motion.div
                  className="absolute inset-x-0 top-0 h-1 origin-left"
                  style={{ backgroundColor: sdgColors[index] }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm font-black" style={{ color: sdgColors[index] }}>
                    {item.code}
                  </span>
                  <item.icon className="size-8 text-white/70 transition duration-300 group-hover:scale-110" aria-hidden="true" />
                </div>
                <h3 className="mt-12 font-heading text-2xl font-black">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/62">{item.description}</p>
                <div className="absolute bottom-5 left-6 right-6 h-px bg-white/12">
                  <span
                    className="block h-px origin-left scale-x-0 transition duration-500 group-hover:scale-x-100"
                    style={{ backgroundColor: sdgColors[index] }}
                  />
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
