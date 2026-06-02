"use client";

import { teacherFeedbacks } from "@/data";
import type { FeedbackType, ReviewStatus, TeacherFeedback } from "@/types/ecogrow";
import { useMockStorage } from "./useMockStorage";

export function useTeacherFeedback() {
  const [feedbacks, setFeedbacks] = useMockStorage<TeacherFeedback[]>(
    "ecogrow-teacher-feedbacks",
    teacherFeedbacks,
  );

  const addFeedback = (input: {
    journalId?: string;
    teacherId: string;
    studentId: string;
    type: FeedbackType;
    message: string;
    reviewStatus?: ReviewStatus;
  }) => {
    const next: TeacherFeedback = {
      id: `feedback-local-${Date.now()}`,
      createdAt: new Date().toISOString(),
      reviewStatus: input.reviewStatus ?? "approved",
      ...input,
    };

    setFeedbacks((current) => [next, ...current.filter((item) => item.journalId !== input.journalId)]);
  };

  const updateReviewStatus = (feedbackId: string, reviewStatus: ReviewStatus) => {
    setFeedbacks((current) =>
      current.map((feedback) => (feedback.id === feedbackId ? { ...feedback, reviewStatus } : feedback)),
    );
  };

  return { feedbacks, addFeedback, updateReviewStatus };
}
