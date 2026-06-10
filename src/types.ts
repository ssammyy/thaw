/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ToolType = 'vulnerability' | 'investment' | 'recovery';

export interface Question {
  id: string;
  text: string;
  section?: string;
  sectionDesc?: string;
  options: {
    label: string;
    value: number;
    weight?: number;
  }[];
}

export interface Outcome {
  id: string;
  title: string;
  description: string;
  detail?: string;
  nextSteps: string[];
}

export interface DiagnosticResult {
  score: number;
  maxScore: number;
  outcomeId: string;
  dimensionScores?: Record<string, number>;
}

export interface DiagnosticToolData {
  id: ToolType;
  title: string;
  description: string;
  questions: Question[];
  outcomes: Outcome[];
  calculateResult: (scores: number[], weightedScores?: number[]) => DiagnosticResult;
}
