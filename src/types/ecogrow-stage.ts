export type EcoGrowStageId =
  | "recognition"
  | "exploration"
  | "execution"
  | "reflection"
  | "exhibition";

export type EcoGrowStageStatus =
  | "locked"
  | "active"
  | "completed"
  | "needs-review";

export type EcoGrowStage = {
  id: EcoGrowStageId;
  order: number;
  shortLabel: string;
  title: string;
  localTerm: string;
  description: string;
  studentAction: string;
  teacherAction: string;
  evidenceExamples: string[];
  status?: EcoGrowStageStatus;
  progress?: number;
  points?: number;
  icon: string;
  color: string;
};

export type TeacherStageAnalytic = {
  stageId: EcoGrowStageId;
  title: string;
  localTerm: string;
  completedStudents: number;
  activeStudents: number;
  needsSupport: number;
  averageScore: number;
  completionRate: number;
};

export type EcoGrowAssessmentRow = {
  stageId: EcoGrowStageId;
  stage: string;
  localTerm: string;
  cognitive: string;
  affective: string;
  psychomotor: string;
  evidence: string;
};
