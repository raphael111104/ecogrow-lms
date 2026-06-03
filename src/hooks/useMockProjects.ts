"use client";

import { projects } from "@/data";
import type { EcoGrowStage, EcoMission, EcoProject } from "@/types/ecogrow";
import { useMockStorage } from "./useMockStorage";

const stages: EcoGrowStage[] = ["NITI_HARTI", "NITI_SURTI", "NITI_BUKTI", "NITI_BAKTI", "NITI_SAJATI"];

const stageTitles: Record<EcoGrowStage, string> = {
  NITI_HARTI: "Ecological Recognition (Niti Harti) - Mengenal proyek",
  NITI_SURTI: "Ecological Exploration (Niti Surti) - Memaknai data",
  NITI_BUKTI: "Ecological Execution (Niti Bukti) - Aksi perawatan",
  NITI_BAKTI: "Ecological Reflection (Niti Bakti) - Refleksi ekologis",
  NITI_SAJATI: "Ecological Mastery & Exhibition (Niti Sajati) - Eco-Exhibition",
};

function buildProjectMissions(project: EcoProject): EcoMission[] {
  return stages.map((stage, index) => ({
    id: `${project.id}-misi-${index + 1}`,
    projectId: project.id,
    title: stageTitles[stage],
    stage,
    status: index === 0 ? "active" : "locked",
    points: [80, 100, 150, 120, 180][index],
    instructions: `Selesaikan bukti belajar tahap ${stageTitles[stage].split(" - ")[0]} untuk proyek ${project.title}.`,
    tasks: [
      "Baca instruksi guru",
      "Lengkapi bukti belajar",
      "Diskusikan dengan kelompok",
    ],
  }));
}

export function useMockProjects() {
  const [projectList, setProjectList] = useMockStorage<EcoProject[]>("ecogrow-teacher-projects", projects);
  const [projectMissions, setProjectMissions] = useMockStorage<Record<string, EcoMission[]>>(
    "ecogrow-teacher-project-missions",
    {},
  );

  const addProject = (project: EcoProject) => {
    setProjectList((current) => [project, ...current]);
    setProjectMissions((current) => ({
      ...current,
      [project.id]: buildProjectMissions(project),
    }));
  };

  return { projectList, addProject, projectMissions };
}
