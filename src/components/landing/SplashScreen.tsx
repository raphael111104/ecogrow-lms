"use client";

import { useMemo, type CSSProperties } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { BookOpenCheck, Droplets, Leaf, LineChart, Sparkles, Sprout } from "lucide-react";
import { EcoGrowLogo } from "@/components/brand/EcoGrowLogo";

const stages = [
  { label: "Recognition", icon: Leaf, color: "text-leaf-100", delay: 0.55 },
  { label: "Exploration", icon: Droplets, color: "text-sky", delay: 0.75 },
  { label: "Execution", icon: Sprout, color: "text-sun", delay: 0.95 },
  { label: "Reflection", icon: BookOpenCheck, color: "text-cream", delay: 1.15 },
  { label: "Exhibition", icon: LineChart, color: "text-leaf-100", delay: 1.35 },
] as const;

const seedlings = [
  { left: "10%", top: "18%", size: "0.7rem", delay: 0.1 },
  { left: "19%", top: "74%", size: "0.55rem", delay: 0.8 },
  { left: "72%", top: "17%", size: "0.62rem", delay: 0.35 },
  { left: "84%", top: "68%", size: "0.8rem", delay: 1.1 },
  { left: "52%", top: "82%", size: "0.5rem", delay: 0.55 },
] as const;

type SplashScreenProps = {
  isLeaving: boolean;
};

export function SplashScreen({ isLeaving }: SplashScreenProps) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const layerX = useTransform(pointerX, [-1, 1], reduceMotion ? [0, 0] : [-16, 16]);
  const layerY = useTransform(pointerY, [-1, 1], reduceMotion ? [0, 0] : [-10, 10]);
  const reverseLayerX = useTransform(pointerX, [-1, 1], reduceMotion ? [0, 0] : [10, -10]);
  const reverseLayerY = useTransform(pointerY, [-1, 1], reduceMotion ? [0, 0] : [8, -8]);

  const stageItems = useMemo(() => stages, []);

  return (
    <motion.section
      className="fixed inset-0 z-[200] grid min-h-screen overflow-hidden bg-[#052f1b] text-white"
      role="status"
      aria-live="polite"
      aria-label="Memuat EcoGrow Learning"
      initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      animate={{
        opacity: isLeaving ? 0 : 1,
        scale: isLeaving ? 1.1 : 1,
        filter: isLeaving ? "blur(10px)" : "blur(0px)",
      }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-70"
        style={{ x: layerX, y: layerY }}
        aria-hidden="true"
      >
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-[42%_58%_48%_52%] bg-sky/18 blur-3xl" />
        <div className="absolute right-[-7rem] top-20 h-80 w-80 rounded-[58%_42%_54%_46%] bg-sun/18 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-leaf-500/24 blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute inset-0 garden-grid opacity-[0.11]"
        style={{ x: reverseLayerX, y: reverseLayerY }}
        aria-hidden="true"
      />

      {seedlings.map((seedling) => (
        <motion.span
          key={`${seedling.left}-${seedling.top}`}
          className="absolute rounded-full bg-sun shadow-[0_0_24px_rgba(246,195,67,0.36)]"
          style={
            {
              left: seedling.left,
              top: seedling.top,
              width: seedling.size,
              height: seedling.size,
            } as CSSProperties
          }
          initial={{ opacity: 0, scale: 0.3, y: 18 }}
          animate={{ opacity: [0, 1, 0.6], scale: [0.3, 1, 0.84], y: [18, -8, -16] }}
          transition={{
            duration: reduceMotion ? 0.01 : 2.4,
            delay: seedling.delay,
            ease: "easeOut",
            repeat: reduceMotion ? 0 : Infinity,
            repeatDelay: 0.4,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 mx-auto grid w-full max-w-5xl place-items-center px-5 py-8 sm:px-8">
        <div className="flex w-full flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <EcoGrowLogo
              inverted
              priority
              size="lg"
              subtitle="Learning Management System"
              markClassName="ring-4 ring-white/12 shadow-[0_18px_60px_rgba(246,195,67,0.2)]"
              textClassName="tracking-wide"
            />
          </motion.div>

          <motion.div
            className="relative mt-10 grid h-48 w-48 place-items-center sm:mt-12 sm:h-64 sm:w-64"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-white/12 bg-white/[0.035]"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-5 rounded-full border border-dashed border-sun/45"
              animate={reduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute h-28 w-20 origin-bottom rounded-b-full bg-gradient-to-t from-leaf-500/35 via-leaf-100/20 to-transparent blur-sm sm:h-36 sm:w-28"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.15, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="relative h-28 w-24 sm:h-36 sm:w-32"
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.15, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="absolute bottom-2 left-1/2 h-28 w-2 -translate-x-1/2 rounded-full bg-gradient-to-t from-leaf-100 to-sun sm:h-36"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.05, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="absolute left-1/2 top-12 h-12 w-20 origin-bottom-left rounded-[100%_0_100%_0] bg-gradient-to-br from-leaf-100 to-sky/80 shadow-[0_16px_38px_rgba(56,189,248,0.16)] sm:top-14 sm:h-16 sm:w-24"
                initial={{ opacity: 0, rotate: -30, scale: 0.3 }}
                animate={{ opacity: 1, rotate: -10, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="absolute right-1/2 top-16 h-11 w-20 origin-bottom-right rounded-[0_100%_0_100%] bg-gradient-to-bl from-sun to-leaf-100 shadow-[0_16px_38px_rgba(246,195,67,0.14)] sm:top-20 sm:h-14 sm:w-24"
                initial={{ opacity: 0, rotate: 28, scale: 0.3 }}
                animate={{ opacity: 1, rotate: 12, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.22, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="absolute left-[52%] top-2 grid h-9 w-9 place-items-center rounded-full bg-white text-leaf-700 shadow-[0_16px_44px_rgba(255,255,255,0.18)]"
                initial={{ opacity: 0, scale: 0.4, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-7 flex w-full max-w-3xl flex-wrap justify-center gap-2 sm:gap-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {stageItems.map((stage) => {
              const Icon = stage.icon;

              return (
                <motion.div
                  key={stage.label}
                  className="group flex min-h-10 items-center gap-2 rounded-full border border-white/14 bg-white/[0.08] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition hover:-translate-y-1 hover:border-sun/50 hover:bg-white/[0.13] sm:px-4"
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, delay: stage.delay, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Icon className={`h-4 w-4 ${stage.color}`} aria-hidden="true" />
                  <span>{stage.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mt-9 w-full max-w-sm">
            <div className="h-2 overflow-hidden rounded-full bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sun via-sky to-leaf-100"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <motion.p
              className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-white/62"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.55 }}
            >
              Menumbuhkan ruang belajar...
            </motion.p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
