/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Every tunable the brief calls "configurable in the admin panel" lives here,
// as a single source of truth. There is no CMS/admin backend in this project
// (it's a static marketing site), so this file *is* the admin panel for now —
// point a real settings UI at these keys when one exists.
export const KELLY_CONFIG = {
  currency: 'KES',

  // Position sizing
  maxBankrollPercent: 0.01,       // hard 1% of bankroll/capital cap
  fractionalKelly: 0.25,          // Quarter Kelly
  minHistoricalTrades: 30,        // forex module: trades required before Kelly is trusted
  unverifiedSourceCautionMultiplier: 0.5, // extra haircut when a probability is opinion-based

  // Behavioural guardrails
  chasingLossesThreshold: 0.2,    // already-lost / bankroll ratio that triggers the warning
  breakReminderAfterCalculations: 3,
  stressTestProbabilityDropPercent: 0.2, // relative drop used by the "what if you're wrong" test

  // Module Three: Quick-Money Investment Check
  investmentRiskScoreThresholds: {
    highRisk: 60,
    verifyFirst: 35,
  },

  // TODO(client): replace with verified, region-appropriate services before launch.
  supportResources: [
    { label: 'Responsible gambling support', note: 'Add a verified local helpline/URL here.' },
    { label: 'Debt & financial counselling', note: 'Add a verified local service here.' },
  ],

  warningMessages: {
    chasingLosses: (currency: string, amount: number) =>
      `You've already lost ${currency} ${amount.toLocaleString()} in this period. Trying to make it back tends to push risk-taking past what's rational — consider taking a break instead.`,
    breakReminder:
      "You've run several calculations this session. That's often a sign of chasing a number rather than assessing risk. Consider stepping away before you act.",
  },

  disclaimer:
    'KELLY Edge is an educational risk-assessment tool, not financial, betting or investment advice. It does not predict outcomes and cannot guarantee profit or safety. All figures are estimates based on the inputs you provide.',
} as const;
