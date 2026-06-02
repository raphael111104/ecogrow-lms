import {
  activeClassOptions,
  activeProjectOptions,
  analyticsInsights,
  analyticsSummary,
  assessmentMatrix,
  assessmentResultsMock,
  classRooms,
  galleryPosts,
  journals,
  notifications,
  performanceRubrics,
  projects,
  studentLearningRisks,
  studentProfiles,
  teacherActionQueue,
  teacherDashboardSummary,
  teacherFeedbacks,
  teacherRecommendations,
  users,
} from "@/data";

export function getTeacherDashboardMock(teacherId = "guru-1") {
  const teacher = users.find((item) => item.id === teacherId) ?? users[0];
  const activeClass = classRooms.find((item) => item.teacherId === teacher.id) ?? classRooms[0];
  const activeProject = projects.find((item) => item.id === teacherDashboardSummary.activeProjectId) ?? projects[0];

  return {
    teacher,
    activeClass,
    activeProject,
    activeClassOptions,
    activeProjectOptions,
    actionQueue: teacherActionQueue,
    recommendations: teacherRecommendations,
    notifications: notifications.filter((item) => item.role === "teacher"),
    summary: teacherDashboardSummary,
    classStudents: studentProfiles.filter((profile) => profile.classId === activeClass.id),
  };
}

export function getTeacherMonitoringMock() {
  return {
    journals,
    feedbacks: teacherFeedbacks,
    classOptions: activeClassOptions,
    projectOptions: activeProjectOptions,
    galleryPending: galleryPosts.filter((item) => item.moderationStatus === "pending"),
  };
}

export function getTeacherAnalyticsMock() {
  return {
    summary: analyticsSummary,
    insights: analyticsInsights,
    risks: studentLearningRisks,
    recommendations: teacherRecommendations,
  };
}

export function getTeacherAssessmentMock() {
  return {
    results: assessmentResultsMock,
    matrix: assessmentMatrix,
    rubrics: performanceRubrics,
  };
}
