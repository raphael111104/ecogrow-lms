"use client";

import { ArrowRight, Lightbulb } from "lucide-react";
import { landingProblemSolutions } from "@/data";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

export function ProblemSolutionSection() {
  return (
    <section id="mengapa" className="relative scroll-mt-28 overflow-hidden bg-white/80 py-20">
      <div className="eco-container">
        <AnimatedSection>
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-leaf-500">Mengapa EcoGrow</p>
            <h2 className="mt-4 font-heading text-4xl font-black leading-tight text-leaf-700 md:text-5xl">
              Belajar hijau harus terlihat dan dapat ditindaklanjuti.
            </h2>
          </div>
        </AnimatedSection>
        <StaggerContainer className="mt-10 grid gap-4 lg:grid-cols-3">
          {landingProblemSolutions.map((item) => (
            <StaggerItem key={item.id}>
              <article className="h-full rounded-[1.35rem] border border-gardenBorder bg-white p-6 shadow-soft">
                <p className="text-sm font-bold leading-7 text-mutedText">{item.challenge}</p>
                <ArrowRight className="my-4 size-5 text-leaf-500" aria-hidden="true" />
                <div className="flex items-start gap-3">
                  <Lightbulb className="mt-1 size-5 shrink-0 text-harvest" aria-hidden="true" />
                  <div>
                    <h3 className="font-heading text-xl font-black text-leaf-700">{item.response}</h3>
                    <p className="mt-3 text-sm font-semibold leading-7 text-mutedText">{item.detail}</p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
