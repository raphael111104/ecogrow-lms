import {
  activeProjectOptions,
  badges,
  challengeEvidence,
  ecoChallenges,
  galleryPosts,
  harvestDistribution,
  harvestImpactSummary,
  harvests,
  journals,
  missionStages,
  missions,
  notifications,
  portfolioEvidence,
  portfolioTimeline,
  projects,
  quizAttemptsMock,
  quizFeedbackByQuestion,
  quizzes,
  reflectionPrompts,
  reflections,
  studentDashboardRecommendations,
  studentMissionSubmissions,
  studentPortfolioSummary,
  studentProfiles,
  users,
} from "@/data";

export function getStudentDashboardMock(studentId = "siswa-1") {
  const profile = studentProfiles.find((item) => item.userId === studentId) ?? studentProfiles[0];
  const user = users.find((item) => item.id === profile.userId) ?? users[1];
  const activeProject = projects.find((item) => item.status === "active") ?? projects[0];
  const activeMission = missions.find((item) => item.stage === activeProject.currentStage) ?? missions[0];
  const studentJournals = journals.filter((item) => item.studentId === profile.userId);
  const latestJournal = studentJournals.at(-1);

  return {
    user,
    profile,
    activeProject,
    activeMission,
    activeProjectOptions,
    missionStages,
    latestJournal,
    recommendations: studentDashboardRecommendations,
    badges: badges.filter((badge) => profile.badges.includes(badge.id)),
    notifications: notifications.filter((item) => item.role === "student"),
    portfolioSummary: studentPortfolioSummary,
  };
}

export function getStudentMissionMock(studentId = "siswa-1") {
  const dashboard = getStudentDashboardMock(studentId);
  return {
    ...dashboard,
    submissions: studentMissionSubmissions.filter((item) => item.studentId === studentId),
    journals: journals.filter((item) => item.studentId === studentId),
    evidence: portfolioEvidence,
  };
}

export function getStudentPortfolioMock(studentId = "siswa-1") {
  return {
    profile: studentProfiles.find((item) => item.userId === studentId) ?? studentProfiles[0],
    timeline: portfolioTimeline,
    evidence: portfolioEvidence,
    quizAttempts: quizAttemptsMock.filter((item) => item.studentId === studentId),
    reflections: reflections.filter((item) => item.studentId === studentId),
    galleryPosts: galleryPosts.filter((item) => item.studentId === studentId),
    summary: studentPortfolioSummary,
  };
}

export function getStudentLearningMock() {
  return {
    quizzes,
    quizFeedbackByQuestion,
    ecoChallenges,
    challengeEvidence,
    harvests,
    harvestDistribution,
    harvestImpactSummary,
    reflectionPrompts,
  };
}
