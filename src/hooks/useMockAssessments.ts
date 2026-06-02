"use client";

import { assessmentResultsMock } from "@/data";
import type { AssessmentResult } from "@/types/ecogrow";
import { useMockStorage } from "./useMockStorage";

export function useMockAssessments() {
  const [results, setResults] = useMockStorage<AssessmentResult[]>(
    "ecogrow-assessment-results",
    assessmentResultsMock,
  );

  const addResult = (result: AssessmentResult) => {
    setResults((current) => [result, ...current]);
  };

  return { results, addResult };
}
