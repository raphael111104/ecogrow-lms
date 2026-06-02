import { BadgePreview } from "@/components/student/BadgePreview";
import { EcoGrowJourneyStepper } from "@/components/student/EcoGrowJourneyStepper";
import { MyPlantCard } from "@/components/student/MyPlantCard";
import { StudentGreetingCard } from "@/components/student/StudentGreetingCard";
import { StudentQuickActions } from "@/components/student/StudentQuickActions";
import { TodayMissionCard } from "@/components/student/TodayMissionCard";
import { EcoCard } from "@/components/ui/EcoCard";
import { getStudentDashboardMock } from "@/mock/repositories/studentRepository";

export function StudentDashboardPage() {
  const dashboard = getStudentDashboardMock();
  const activeBadge = dashboard.badges[0]?.name;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <StudentGreetingCard
        user={dashboard.user}
        profile={dashboard.profile}
        badgeName={activeBadge}
      />

      <section className="grid gap-5 lg:grid-cols-[1.22fr_0.78fr]" aria-label="Fokus hari ini">
        <TodayMissionCard mission={dashboard.activeMission} project={dashboard.activeProject} />
        <MyPlantCard journal={dashboard.latestJournal} />
      </section>

      <EcoCard className="p-5 md:p-6">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-500">Perjalanan EcoGrow</p>
        <h2 className="mt-2 font-heading text-2xl font-black text-leaf-700">Sudah sampai mana misimu?</h2>
        <div className="mt-5">
          <EcoGrowJourneyStepper activeStage={dashboard.activeMission.stage} />
        </div>
      </EcoCard>

      <StudentQuickActions />
      <BadgePreview badges={dashboard.badges} />
    </div>
  );
}
