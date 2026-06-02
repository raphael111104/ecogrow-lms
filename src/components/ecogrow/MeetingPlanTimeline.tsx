import { EcoBadge } from "@/components/ui/EcoBadge";
import { EcoCard } from "@/components/ui/EcoCard";
import { getEcoGrowStageByLegacy } from "@/data";
import type { EcoGrowMeetingPlan } from "@/types/ecogrow";

export function MeetingPlanTimeline({ meetings }: { meetings: EcoGrowMeetingPlan[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {meetings.map((meeting) => (
        <EcoCard key={meeting.meeting} className="p-4">
          <EcoBadge className="bg-sun/25 text-earth">Pertemuan {meeting.meeting} - {meeting.duration}</EcoBadge>
          <h3 className="mt-3 font-heading text-xl font-black text-leaf-700">{meeting.title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {meeting.stageIds.map((stageId) => {
              const stage = getEcoGrowStageByLegacy(stageId);
              return <EcoBadge key={stageId} className="bg-leaf-100 text-leaf-700">{stage.title} ({stage.localTerm})</EcoBadge>;
            })}
          </div>
          <p className="mt-4 text-sm font-bold text-slateText">{meeting.coreActivities.join(" - ")}</p>
          <p className="mt-3 text-xs font-bold text-mutedText">Evidence: {meeting.evidence.join(", ")}</p>
        </EcoCard>
      ))}
    </div>
  );
}
