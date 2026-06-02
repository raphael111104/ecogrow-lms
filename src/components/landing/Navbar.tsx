"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { EcoGrowLogo } from "@/components/brand/EcoGrowLogo";
import { EcoButton } from "@/components/ui/EcoButton";
import { landingNav } from "@/data/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-5"
      >
        <div
          className={`pointer-events-auto mx-auto flex min-h-[3.75rem] w-full max-w-[1120px] items-center justify-between gap-3 rounded-[1.65rem] border px-3 py-2 transition-all duration-500 sm:px-4 ${
            scrolled
              ? "border-white/25 bg-[#062A16]/[0.55] shadow-[0_18px_48px_rgba(4,37,21,0.22)] backdrop-blur-2xl"
              : "border-white/[0.18] bg-white/[0.10] shadow-[0_14px_38px_rgba(4,37,21,0.14)] backdrop-blur-xl"
          }`}
        >
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <EcoGrowLogo
              inverted
              size="sm"
              markClassName={`transition-all duration-300 ${
                scrolled ? "ring-white/20" : "ring-white/[0.15]"
              } group-hover:scale-105`}
              textClassName="text-white"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 rounded-full border border-white/[0.12] bg-white/[0.08] p-1 backdrop-blur-xl md:flex"
            aria-label="Navigasi utama"
          >
            {landingNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative rounded-full px-4 py-2 text-sm font-bold text-white/[0.74] transition-all duration-200 hover:bg-white/[0.14] hover:text-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-sun/70"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <EcoButton
              href="/login"
              variant="reward"
              size="sm"
              className="hidden rounded-full px-5 shadow-[0_12px_28px_rgba(246,195,67,0.22)] sm:inline-flex"
            >
              Masuk
            </EcoButton>

            {/* Mobile menu button */}
            <button
              className="grid size-10 place-items-center rounded-full border border-white/[0.15] bg-white/10 text-white transition-colors hover:bg-white/20 md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />

            {/* Panel */}
            <motion.nav
              className="absolute left-3 right-3 top-[5.25rem] rounded-[1.65rem] border border-white/[0.18] bg-[#062A16]/[0.70] p-3 shadow-[0_22px_62px_rgba(4,37,21,0.32)] backdrop-blur-2xl"
              initial={{ y: -12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -12, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Menu mobile"
            >
              <div className="flex flex-col gap-2">
                {landingNav.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl px-5 py-3 text-base font-bold text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-3">
                <EcoButton href="/login" variant="reward" fullWidth className="rounded-2xl">
                  Masuk
                </EcoButton>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
