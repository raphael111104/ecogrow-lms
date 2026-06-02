import { classRooms, journals, missions, projects, studentProfiles, users } from "@/data";

export function getActiveTeacherMock() {
  const teacher = users.find((item) => item.role === "teacher");
  const activeClass = classRooms[0];
  const activeProject = projects[0];
  const classStudents = studentProfiles.filter((profile) => profile.classId === activeClass.id);
  const projectMissions = missions.filter((mission) => mission.projectId === activeProject.id);
  const projectJournals = journals.filter((journal) => journal.projectId === activeProject.id);

  return {
    teacher,
    activeClass,
    activeProject,
    classStudents,
    projectMissions,
    projectJournals,
  };
}
