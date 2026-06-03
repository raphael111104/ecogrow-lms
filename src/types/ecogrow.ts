export type UserRole = "teacher" | "student";

export type PancanitiStage =
  | "NITI_HARTI"
  | "NITI_SURTI"
  | "NITI_BUKTI"
  | "NITI_BAKTI"
  | "NITI_SAJATI";

export type MissionStatus = "locked" | "active" | "draft" | "submitted" | "reviewed" | "needs_revision" | "completed";

export type FriendlyStatus =
  | "not_started"
  | "in_progress"
  | "waiting_feedback"
  | "needs_revision"
  | "completed"
  | "locked";

type AssessmentType =
  | "diagnostic"
  | "formative"
  | "summative"
  | "reflection"
  | "performance";

export type KaihDimension = "ekologis" | "mandiri" | "adaptif" | "inovatif" | "humanis";

export type GalleryCategory =
  | "foto_tanaman"
  | "poster"
  | "panen"
  | "refleksi"
  | "laporan_proyek";
type GalleryModerationStatus = "pending" | "approved" | "revision";
type EcoChallengeStatus = "not_started" | "active" | "submitted" | "approved";
type MissionSubmissionStatus = "draft" | "submitted" | "reviewed" | "needs_revision";
type ReflectionFeeling =
  | "Bangga"
  | "Senang"
  | "Lebih peduli"
  | "Masih belajar"
  | "Bingung tetapi ingin mencoba";

export type FeedbackType = "apresiasi" | "perbaikan" | "pertanyaan" | "remedial";

export type ReviewStatus = "pending" | "approved" | "needs_revision";

type LearningRiskType =
  | "aman"
  | "perlu_perhatian"
  | "perlu_remedial"
  | "siap_pengayaan";

export type RecommendationType = "remedial" | "action" | "enrichment" | "info";
export type NotificationSeverity = "info" | "success" | "warning" | "danger";
export type AssessmentRecommendation = "Remedial" | "Pengayaan" | "Pendampingan";

export interface SelectOption {
  id: string;
  name: string;
  totalStudents?: number;
  title?: string;
  currentStage?: PancanitiStage;
}

export interface StudentTodayTask {
  id: string;
  title: string;
  description: string;
  status: FriendlyStatus;
  points: number;
  href: string;
}

export interface StudentLearningFlowItem {
  id: string;
  title: string;
  description: string;
  href: string;
  status: FriendlyStatus;
  helperText: string;
  stage?: PancanitiStage;
}

export interface StudentJourneyStep {
  stage: PancanitiStage;
  label: string;
  localTerm: string;
  detail: string;
}

export interface TeacherActionItem {
  id: string;
  title: string;
  type: "feedback" | "assessment" | "gallery";
  priority: "high" | "medium" | "low";
  href: string;
}

export interface TeacherQuickFeedbackTemplate {
  id: string;
  message: string;
  focus: FeedbackType | "apresiasi_tim";
}

export interface TeacherOverviewCard {
  id: string;
  label: string;
  value: string;
  note: string;
  tone: "green" | "blue" | "yellow" | "orange";
}

export interface TeacherSubmissionItem {
  id: string;
  studentName: string;
  groupName: string;
  mission: string;
  submittedAt: string;
  status: FriendlyStatus;
  priority: "high" | "medium" | "low";
  observation: string;
}

export interface TeacherModuleChecklistItem {
  id: string;
  label: string;
  complete: boolean;
}

export interface TeacherClassReport {
  className: string;
  projectTitle: string;
  overallProgress: number;
  submittedEvidence: number;
  expectedEvidence: number;
  strengths: string[];
  supportStudents: Array<{
    name: string;
    focus: string;
  }>;
  nextActions: string[];
}

export interface LandingProblemSolution {
  id: string;
  challenge: string;
  response: string;
  detail: string;
}

export interface LandingImpactMetric {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface StudentGameCard {
  id: string;
  title: string;
  duration: string;
  level: "Mudah" | "Sedang";
  points: number;
  description: string;
}

export interface StudentMoodOption {
  id: "happy" | "confused" | "proud" | "retry" | "help";
  label: string;
}

export interface StudentReflectionMemory {
  mood: StudentMoodOption["id"] | null;
  lesson: string;
  promise: string;
  appreciationFriend: string;
  appreciationMessage: string;
  efforts: string[];
  savedAt: string;
}

export interface StudentLearningReport {
  celebration: string;
  completedJourneySteps: number;
  badges: string[];
  completedMissions: string[];
  understood: string[];
  practiceNext: string[];
  teacherMessage: string;
  nextAction: {
    title: string;
    description: string;
    href: string;
    actionLabel: string;
  };
}

export interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  reason: string;
  targetHref: string;
  actionLabel?: string;
}

export interface EcoNotification {
  id: string;
  role: UserRole;
  title: string;
  href: string;
  severity: NotificationSeverity;
}

export interface Evidence {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  stage?: PancanitiStage;
  status?: ReviewStatus;
}

export interface QuizFeedbackBank {
  correct: string[];
  incorrect: string[];
}

export interface EcoExhibitionItem {
  id: string;
  studentName: string;
  title: string;
  type: "poster" | "story" | "photo" | "harvest_report";
  status: "waiting_review" | "approved" | "revision";
  badgeCandidate: string;
  sourcePostId?: string;
}

export interface MissionStageProgress {
  stage: PancanitiStage;
  status: MissionStatus;
  evidence: string;
  feedback: string | null;
}

export interface PortfolioTimelineItem {
  date: string;
  title: string;
  evidence: string;
  stage?: PancanitiStage;
}

export interface AssessmentMatrixItem {
  studentId: string;
  diagnosticScore: number;
  missionScore: number;
  summativeScore: number;
  cognitive: number;
  affective: number;
  psychomotor: number;
  kaihAverage: number;
  recommendation: AssessmentRecommendation;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface AuthSession {
  user: User;
  role: UserRole;
  status: "authenticated";
  expiresAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  classId: string;
  groupName: string;
  level: number;
  points: number;
  badges: string[];
  learningRisk?: LearningRiskType;
  ecologicalCharacter: {
    ekologis: number;
    mandiri: number;
    adaptif: number;
    inovatif: number;
    humanis: number;
  };
}

export interface ClassRoom {
  id: string;
  name: string;
  grade: string;
  phase: string;
  teacherId: string;
  totalStudents: number;
}

export interface LearningModule {
  id: string;
  title: string;
  subject: string;
  phase: string;
  grade: string;
  topic: string;
  duration: string;
  description: string;
  learningOutcomes: string[];
  pancanitiStages: PancanitiStage[];
  sdgs: string[];
}

export interface EcoProject {
  id: string;
  title: string;
  classId: string;
  moduleId: string;
  plantType: string;
  method: "hydroponic" | "soil" | "compost" | "observation";
  startDate: string;
  endDate: string;
  progress: number;
  status: "planned" | "active" | "completed";
  description: string;
  currentStage?: PancanitiStage;
  groupIds?: string[];
  riskLevel?: "low" | "medium" | "high";
}

export interface EcoMission {
  id: string;
  projectId: string;
  title: string;
  stage: PancanitiStage;
  status: MissionStatus;
  points: number;
  instructions: string;
  tasks: string[];
}

export interface JournalEntry {
  id: string;
  studentId: string;
  projectId: string;
  date: string;
  plantHeightCm: number;
  leafCount: number;
  condition: "sehat" | "layu" | "kuning" | "perlu_perawatan";
  weather: "cerah" | "mendung" | "hujan";
  waterMl: number;
  note: string;
  photoUrl?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  cognitiveLevel: "C1" | "C2" | "C3" | "C4" | "C5" | "C6";
}

export interface Quiz {
  id: string;
  title: string;
  type: AssessmentType;
  questions: QuizQuestion[];
}

export interface LearningContent {
  id: string;
  title: string;
  type: "concept" | "observation" | "meaningful" | "video";
  durationMinute: number;
  summary: string;
  keywords: string[];
  relatedStage: PancanitiStage;
  imageUrl?: string;
  essentialQuestion?: string;
}

export interface MissionSubmission {
  id: string;
  missionId: string;
  studentId: string;
  status: MissionSubmissionStatus;
  submittedAt: string;
  teacherFeedback?: string;
  earnedPoints: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  completedAt: string;
  recommendation: string;
}

export interface EcoChallenge {
  id: string;
  type?: "remedial" | "enrichment" | "habit";
  title: string;
  description: string;
  durationDays: number;
  rewardPoints: number;
  status: EcoChallengeStatus;
  kaihFocus: KaihDimension[];
  tasks: string[];
  imageUrl?: string;
  parentPrompt?: string;
  evidenceHint?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
}

export interface HarvestReport {
  id: string;
  projectId: string;
  groupName: string;
  productName: string;
  quantity: number;
  unit: string;
  contributionNote: string;
  harvestedAt?: string;
  imageUrl?: string;
  impactMetric?: string;
}

export interface GalleryPost {
  id: string;
  studentId: string;
  projectId: string;
  title: string;
  description: string;
  supportingData?: string;
  imageUrl: string;
  createdAt: string;
  likes: number;
  moderationStatus?: GalleryModerationStatus;
  isFeatured?: boolean;
  teacherComment?: string;
  category?: GalleryCategory;
  stage?: PancanitiStage;
}

export interface ReflectionEntry {
  id: string;
  studentId: string;
  projectId: string;
  feeling: ReflectionFeeling;
  lessonLearned: string;
  problemSolved: string;
  teamworkNote: string;
  ecologicalPromise: string;
  createdAt?: string;
  relatedStage?: PancanitiStage;
  kaihFocus?: KaihDimension[];
}

export interface TeacherDashboardSummary {
  teacherId: string;
  classId: string;
  activeProjectId: string;
  totalStudents: number;
  activeProjects: number;
  journalsToday: number;
  pendingFeedback: number;
  averageMissionProgress: number;
  studentsNeedAttention: number;
  studentsReadyForEnrichment: number;
  galleryPending: number;
}

export interface TeacherFeedback {
  id: string;
  journalId?: string;
  missionId?: string;
  teacherId: string;
  studentId: string;
  type: FeedbackType;
  message: string;
  createdAt: string;
  reviewStatus: ReviewStatus;
}

export interface GeneratedModuleDraft {
  id: string;
  title: string;
  subject: string;
  phase: string;
  grade: string;
  topic: string;
  duration: string;
  cp: string;
  tp: string[];
  meaningfulUnderstanding: string;
  triggerQuestions: string[];
  pancanitiPlan: Array<{
    stage: PancanitiStage;
    teacherActivity: string;
    studentActivity: string;
    assessmentEvidence: string;
  }>;
  differentiation: {
    content: string;
    process: string;
    product: string;
  };
  assessmentPlan: string[];
  status: "draft" | "review" | "published";
}

export interface PerformanceRubric {
  id: string;
  aspect: string;
  criteria: string[];
  maxScore: number;
}

export interface AssessmentResult {
  id: string;
  studentId: string;
  quizId?: string;
  score: number;
  weakestLevel?: string;
  recommendation: string;
}

interface StudentLearningRisk {
  studentId: string;
  name: string;
  riskType: LearningRiskType;
  reason: string;
  suggestedAction: string;
}

export type EcoGrowAssessmentKind = "diagnostic" | "formative" | "summative";
export type EcoGrowQuestionFormat =
  | "single_choice"
  | "multiple_choice"
  | "short_answer"
  | "reflection"
  | "performance";
export type BloomLevel = "C1" | "C2" | "C3" | "C4" | "C5" | "C6";
export type SoloLevel =
  | "Prestructural"
  | "Unistructural"
  | "Multistructural"
  | "Relational"
  | "Extended Abstract";

export interface EcoGrowStageDisplay {
  id: PancanitiStage;
  title: string;
  localTerm: string;
  shortAction: string;
  learningMode: "Memahami" | "Mengaplikasi" | "Merefleksi" | "Regulasi Diri";
  description: string;
  studentOutput: string;
}

export interface EcoGrowTeachingModule {
  id: string;
  title: string;
  subject: string;
  phase: string;
  grade: string;
  topic: string;
  duration: string;
  year: string;
  institution: string;
  initialCompetencies: string[];
  graduateProfileDimensions: string[];
  plhIdentity: string[];
  targetStudents: string[];
  studentCount: number;
  facilities: {
    learningSources: string[];
    studentTools: string[];
    teacherTools: string[];
  };
  pedagogy: {
    model: string;
    approach: string[];
    strategy: string[];
    method: string[];
    technique: string[];
    tactic: string[];
    differentiation: string[];
  };
  partners: string[];
  learningEnvironment: string;
  digitalUse: {
    planning: string[];
    implementation: string[];
    assessment: string[];
  };
  learningOutcomes: {
    understanding: string;
    processSkills: string[];
    ecogrowElement: string;
  };
  objectives: string[];
  meaningfulUnderstanding: string;
  triggerQuestions: string[];
  meetings: EcoGrowMeetingPlan[];
  assessmentSummary: string[];
  enrichment: string[];
  remedial: string[];
}

export interface EcoGrowMeetingPlan {
  meeting: number;
  title: string;
  duration: string;
  stageIds: PancanitiStage[];
  opening: string[];
  coreActivities: string[];
  closing: string[];
  evidence: string[];
}

export interface EcoGrowQuestion {
  id: string;
  kind: EcoGrowAssessmentKind;
  format: EcoGrowQuestionFormat;
  stageId?: PancanitiStage;
  topic: string;
  question: string;
  options?: string[];
  answer?: string | string[];
  explanation?: string;
  bloomLevel?: BloomLevel;
  soloLevel?: SoloLevel;
  points: number;
  kaihFocus?: KaihDimension[];
  feedbackCorrect?: string;
  feedbackIncorrect?: string;
  remedialHint?: string;
  enrichmentPrompt?: string;
}

export interface EcoGrowLkpdSection {
  id: string;
  title: string;
  stageId: PancanitiStage;
  instruction: string;
  fields: EcoGrowLkpdField[];
  evidenceRequired?: string[];
  points: number;
}

export interface EcoGrowLkpdField {
  id: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "checklist" | "image_url" | "date";
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface EcoGrowLkpdSubmission {
  id: string;
  lkpdSectionId: string;
  studentId: string;
  projectId: string;
  answers: Record<string, string | number | string[]>;
  submittedAt: string;
  status: "draft" | "submitted";
}

export interface EcoReadinessResult {
  score: number;
  correct: number;
  total: number;
  interest: string;
  learningStyle: string;
  ecologicalReadiness: string;
  recommendation: string;
  completedAt: string;
}

export interface EcoMasterResult {
  score: number;
  correct: number;
  total: number;
  answers: Record<string, string>;
  recommendation: string;
  badges: string[];
  pendingValidation: number;
  completedAt: string;
}
