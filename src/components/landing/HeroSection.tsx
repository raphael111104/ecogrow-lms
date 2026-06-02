"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { GraduationCap, Play, UsersRound, X } from "lucide-react";
import { EcoButton } from "@/components/ui/EcoButton";
import { ecoAssets } from "@/data/assets";

const heroPoster =
  ecoAssets.localAssets.find((asset) => asset.name === "Children gardening")?.url ??
  "/assets/images/children-gardening-pixabay.jpg";
const journeyTrail = ["Kenali", "Jelajahi", "Aksi", "Refleksi", "Pamerkan"];
const heroHeadline = "Tumbuhkan belajar dari kebun sekolah.";

function AnimatedHeadline() {
  let letterIndex = 0;

  return (
    <h1 className="hero-headline mt-6 max-w-[56rem] font-heading text-4xl font-black leading-[1.04] sm:text-6xl lg:text-[5.25rem]">
      <span className="sr-only">{heroHeadline}</span>
      <span aria-hidden="true" className="hero-headline-art">
        {heroHeadline.split(" ").map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`} className="hero-headline-word">
            {Array.from(word).map((letter) => {
              const currentIndex = letterIndex++;

              return (
                <span
                  key={`${letter}-${currentIndex}`}
                  className="hero-headline-letter"
                  style={{ "--hero-letter-index": currentIndex } as CSSProperties}
                >
                  {letter}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </h1>
  );
}

function VideoModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 sm:p-6">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[#052f1b] shadow-[0_0_40px_rgba(22,122,58,0.4)] ring-2 ring-leaf-500/40">
        <div className="flex items-center justify-between border-b border-white/10 p-4 text-white">
          <h3 className="font-heading text-lg font-black">Ilustrasi EcoGrow Learning</h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-white/10" aria-label="Tutup video">
            <X className="size-5" />
          </button>
        </div>
        <div className="aspect-video w-full bg-black/95 p-2">
          <video src="/ilustrasi.mp4" controls autoPlay playsInline className="h-full w-full rounded-2xl object-contain" />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="relative flex min-h-[min(54rem,100svh)] items-center overflow-hidden bg-leaf-700 pb-12 pt-28 text-white sm:pt-32 lg:pb-16">
      <Image src={heroPoster} alt="" fill sizes="100vw" className="absolute inset-0 object-cover object-center" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,42,22,0.5)_0%,rgba(6,42,22,0.76)_48%,rgba(6,42,22,0.94)_100%),linear-gradient(180deg,rgba(6,42,22,0.4),rgba(6,42,22,0.8))]" />
      <div className="absolute inset-0 fine-noise opacity-60" />

      <div className="eco-container relative z-10 flex justify-center">
        <div className="flex w-full max-w-4xl flex-col items-center text-center">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-sun">
            Learning Management System Ekologis
          </p>
          <AnimatedHeadline />
          <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/85 sm:text-lg">
            EcoGrow mengajak siswa mengenali tanaman, mencoba aksi nyata, menulis cerita, dan memamerkan karya. Guru mendapatkan review jurnal dan laporan kelas yang jelas.
          </p>
          <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <EcoButton href="/siswa" variant="reward" size="lg" className="w-full sm:w-auto" icon={<GraduationCap className="size-5" />}>
              Jelajahi sebagai Siswa
            </EcoButton>
            <EcoButton href="/guru" variant="secondary" size="lg" className="w-full sm:w-auto" icon={<UsersRound className="size-5" />}>
              Masuk sebagai Guru
            </EcoButton>
          </div>
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white/80 transition hover:text-white"
          >
            <Play className="size-4 text-sun" /> Tonton gambaran pengalaman belajar
          </button>
          <ol aria-label="Tahap perjalanan EcoGrow" className="mt-10 flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-3 text-[0.68rem] font-black uppercase tracking-[0.16em] text-white/65 sm:text-xs">
            {journeyTrail.map((stage, index) => (
              <li key={stage} className="inline-flex items-center gap-3">
                <span className={index === 2 ? "text-sun" : undefined}>{stage}</span>
                {index < journeyTrail.length - 1 ? <span aria-hidden="true" className="h-px w-5 bg-sun/45" /> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
      {mounted && videoOpen ? <VideoModal onClose={() => setVideoOpen(false)} /> : null}
    </section>
  );
}
