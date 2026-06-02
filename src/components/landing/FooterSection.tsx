"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EcoGrowLogo } from "@/components/brand/EcoGrowLogo";

const footerLinks = [
  { label: "Mengapa", href: "#mengapa" },
  { label: "Alur", href: "#alur-ecogrow" },
  { label: "Fitur", href: "#fitur" },
  { label: "Dampak", href: "#dampak" },
  { label: "Masuk", href: "/login" },
];

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-t border-gardenBorder bg-[#F7FBF3]">
      <div className="eco-container py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="group inline-flex">
            <EcoGrowLogo
              size="lg"
              subtitle="Berguru pada Bumi"
              textClassName="text-leaf-700"
              markClassName="shadow-soft transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <nav className="flex flex-wrap gap-2" aria-label="Navigasi footer">
            {footerLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-gardenBorder bg-white/70 px-4 text-sm font-extrabold text-leaf-700 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
              >
                {item.label}
                <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-gardenBorder pt-6 text-xs font-semibold text-mutedText md:flex-row md:items-center md:justify-between">
          <p>(c) 2026 EcoGrow Learning. LMS ekologis untuk aksi kecil yang nyata.</p>
        </div>
      </div>
    </footer>
  );
}
