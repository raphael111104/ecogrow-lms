"use client";

import Image from "next/image";
import { BarChart3, Camera, ClipboardCheck, Leaf } from "lucide-react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ecoAssets } from "@/data/assets";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const missionImage =
  ecoAssets.localAssets.find((asset) => asset.name === "Hydroponic farming USDA")?.url ??
  "/assets/images/hydroponic-farming-usda-public-domain.jpg";

const missionLoop = [
  { icon: ClipboardCheck, label: "Misi", value: "Hemat air 7 hari" },
  { icon: Camera, label: "Bukti", value: "Foto dan jurnal tanaman" },
  { icon: BarChart3, label: "Pantau", value: "Guru memberi umpan balik" },
  { icon: Leaf, label: "Refleksi", value: "Portofolio Eco Explorer" },
];

const metrics = [
  { label: "tahap belajar", value: 5, suffix: "" },
  { label: "fitur inti", value: 8, suffix: "" },
  { label: "mode role", value: 2, suffix: "" },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 900;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], ["-5%", "6%"]), {
    stiffness: 70,
    damping: 22,
  });

  return (
    <section ref={sectionRef} className="section-band relative overflow-hidden py-24">
      <div className="eco-container">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <AnimatedSection>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf-500">
                EcoMission
              </p>
              <h2 className="mt-4 font-heading text-4xl font-black leading-tight text-leaf-700 md:text-6xl">
                Dari tugas kelas menjadi bukti belajar.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-mutedText md:text-lg">
                Setiap misi punya konteks, aksi, bukti, dan refleksi. Guru bisa
                melihat progres tanpa kehilangan cerita belajar siswa.
              </p>
            </AnimatedSection>

            <StaggerContainer className="mt-8 grid gap-3 sm:grid-cols-2" staggerDelay={0.1}>
              {missionLoop.map((item) => (
                <StaggerItem key={item.label}>
                  <div className="group rounded-[1.15rem] border border-gardenBorder bg-white/80 p-5 shadow-soft backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white">
                    <span className="grid size-11 place-items-center rounded-full bg-leaf-50 text-leaf-700 transition group-hover:bg-leaf-700 group-hover:text-white">
                      <item.icon className="size-5" aria-hidden="true" />
                    </span>
                    <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-leaf-500">
                      {item.label}
                    </p>
                    <h3 className="mt-1 font-heading text-xl font-black text-leaf-700">
                      {item.value}
                    </h3>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <AnimatedSection delay={0.15}>
              <div className="mt-6 grid gap-3 rounded-[1.15rem] border border-gardenBorder bg-leaf-700 p-4 text-white shadow-eco sm:grid-cols-3">
                {metrics.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/[0.08] p-4">
                    <p className="font-heading text-4xl font-black">
                      <AnimatedCounter target={item.value} suffix={item.suffix} />
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/62">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection direction="right" delay={0.12}>
            <div className="relative min-h-[34rem] overflow-hidden rounded-[1.35rem] border border-gardenBorder shadow-eco">
              <motion.div className="absolute inset-[-6%] will-change-transform" style={{ y: imageY }}>
                <Image
                  src={missionImage}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,42,22,0.10),rgba(6,42,22,0.76)),linear-gradient(90deg,rgba(6,42,22,0.28),rgba(6,42,22,0))]" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-sun">
                  Live mission preview
                </p>
                <h3 className="mt-3 max-w-sm font-heading text-3xl font-black leading-tight">
                  Catatan tanaman, air, dan panen masuk ke satu progres kelas.
                </h3>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
