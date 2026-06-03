import { CTASection } from "./CTASection";
import { EcoGrowAssistant } from "./EcoGrowAssistant";
import { FiturSection } from "./FiturSection";
import { FooterSection } from "./FooterSection";
import { HeroSection } from "./HeroSection";
import { ImpactSection } from "./ImpactSection";
import { KonsepSection, PancanitiSection } from "./KonsepSection";
import { LearningContentSection } from "./LearningContentSection";
import { MissionSection } from "./MissionSection";
import { Navbar } from "./Navbar";
import { ProblemSolutionSection } from "./ProblemSolutionSection";
import { SDGsSection } from "./SDGsSection";
import { SystemEligibilitySection } from "./SystemEligibilitySection";

export function LandingPage() {
  return (
    <div className="landing-typography page-shell-bg overflow-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <KonsepSection />
        <PancanitiSection />
        <FiturSection />
        <SystemEligibilitySection />
        <MissionSection />
        <ImpactSection />
        <LearningContentSection />
        <SDGsSection />
        <CTASection />
      </main>
      <FooterSection />
      <EcoGrowAssistant />
    </div>
  );
}
