import { activeProjectOptions, missionStages, missions, projects } from "@/data";

export function getProjectOverviewMock(projectId = "proyek-kangkung") {
  const project = projects.find((item) => item.id === projectId) ?? projects[0];

  return {
    project,
    options: activeProjectOptions,
    stages: missionStages,
    missions: missions.filter((item) => item.projectId === project.id),
  };
}
