/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VerdictTier = 'green' | 'amber' | 'red' | 'darkred';

export interface VerdictResult {
  tier: VerdictTier;
  label: string;
  reasons: string[];
  nextAction: string;
}

export type ProbabilitySource = 'personal' | 'tipster' | 'historical' | 'model' | 'other';

export type YesNoUnsure = 'yes' | 'no' | 'unsure';

export type KellyModule = 'betting' | 'forex' | 'investment';
