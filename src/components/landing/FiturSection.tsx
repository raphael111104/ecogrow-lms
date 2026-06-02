"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, BookOpen, Sparkles } from "lucide-react";
import { EcoButton } from "@/components/ui/EcoButton";
import { features } from "@/data/ecogrow";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

type RoleFilter = "semua" | "siswa" | "guru";
type Feature = (typeof features)[number] & {
  role: RoleFilter | "bersama";
  label: string;
};

const featureRoles: Feature[] = features.map((feature) => {
  if (feature.title === "Dashboard Guru") return { ...feature, role: "guru", label: "Guru" };
  if (feature.title === "Galeri Project") return { ...feature, role: "bersama", label: "Bersama" };
  return { ...feature, role: "siswa", label: "Siswa" };
});

const filters: { id: RoleFilter; label: string }[] = [
  { id: "semua", label: "Semua" },
  { id: "siswa", label: "Siswa" },
  { id: "guru", label: "Guru" },
];

const workflow = [
  { icon: BookOpen, title: "Materi ringkas", detail: "EcoLearn memberi konteks sebelum misi." },
  { icon: Sparkles, title: "Aksi harian", detail: "EcoMission dan EcoChallenge menjaga praktik." },
  { icon: BarChart3, title: "Bukti progres", detail: "Portofolio dan dashboard membantu refleksi." },
];

export function FiturSection() {
  const [activeFilter, setActiveFilter] = useState<RoleFilter>("semua");

  const visibleFeatures = useMemo(
    () =>
      featureRoles.filter((feature) => {
        if (activeFilter === "semua") return true;
        if (feature.role === "bersama") return true;
        return feature.role === activeFilter;
      }),
    [activeFilter],
  );

  return (
    <section
      id="fitur"
      className="relative overflow-hidden border-y border-gardenBorder/70 bg-white/[0.78] py-24"
    >
      <div className="eco-container relative">
        <AnimatedSection>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf-500">
                Fitur LMS
              </p>
              <h2 className="mt-4 font-heading text-4xl font-black leading-tight text-leaf-700 md:text-6xl">
                Satu ruang kerja untuk misi, bukti, dan bimbingan.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-mutedText md:text-lg">
              EcoGrow tidak menumpuk menu. Setiap fitur ditempatkan sebagai
              langkah belajar: membaca, mencoba, bermain, mencatat, lalu dinilai.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex w-full rounded-full border border-gardenBorder bg-white/80 p-1 shadow-soft backdrop-blur-xl sm:w-auto">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative min-h-10 flex-1 rounded-full px-5 text-sm font-black transition sm:flex-none ${
                    activeFilter === filter.id ? "text-white" : "text-leaf-700 hover:bg-leaf-50"
                  }`}
                  aria-pressed={activeFilter === filter.id}
                >
                  {activeFilter === filter.id && (
                    <motion.span
                      layoutId="feature-filter-pill"
                      className="absolute inset-0 rounded-full bg-leaf-700"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{filter.label}</span>
                </button>
              ))}
            </div>

            <EcoButton href="/login" variant="secondary" size="sm" className="rounded-full">
              Coba Role Selector
            </EcoButton>
          </div>
        </AnimatedSection>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.68fr_1.32fr]">
          <StaggerContainer className="grid self-start gap-3" staggerDelay={0.1}>
            {workflow.map((item, index) => (
              <StaggerItem key={item.title}>
                <div className="group rounded-[1.15rem] border border-gardenBorder bg-leaf-50/78 p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 place-items-center rounded-full bg-white text-leaf-700 shadow-soft">
                      <item.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">
                        Alur {index + 1}
                      </span>
                      <h3 className="mt-1 font-heading text-xl font-black text-leaf-700">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-mutedText">{item.detail}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="min-h-[32rem]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeFilter}
                className="grid gap-4 md:grid-cols-2"
                initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                {visibleFeatures.map((feature, index) => (
                  <motion.article
                    key={feature.title}
                    layout
                    className="group relative min-h-48 overflow-hidden rounded-[1.2rem] border border-gardenBorder bg-white/86 p-5 shadow-soft backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-leaf-500/30"
                  >
                    <span className="absolute right-4 top-4 font-heading text-5xl font-black text-leaf-50 transition group-hover:text-sun/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-leaf-50 px-3 py-1 text-xs font-black text-leaf-700">
                      {feature.label}
                    </span>
                    <div className="mt-8 grid size-12 place-items-center rounded-xl bg-white shadow-soft">
                      <feature.icon className={`size-7 ${feature.color}`} aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-heading text-2xl font-black text-leaf-700">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-mutedText">{feature.description}</p>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
