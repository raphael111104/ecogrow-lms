import { badges, journals, missions, projects, studentProfiles, users } from "@/data";

export function getActiveStudentMock() {
  const profile = studentProfiles[0];
  const user = users.find((item) => item.id === profile.userId) ?? users[1];
  const activeProject = projects[0];
  const activeMission = missions.find((mission) => mission.status === "active") ?? missions[0];
  const studentJournals = journals.filter((journal) => journal.studentId === profile.userId);
  const studentBadges = badges.filter((badge) => profile.badges.includes(badge.id));

  return {
    user,
    profile,
    activeProject,
    activeMission,
    studentJournals,
    studentBadges,
  };
}
