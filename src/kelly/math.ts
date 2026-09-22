/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KELLY_CONFIG as CFG } from './config';
import type { ProbabilitySource, VerdictResult, VerdictTier, YesNoUnsure } from './types';

export function roundMoney(n: number): number {
  return Math.max(0, Math.round(n || 0));
}

function money(n: number): string {
  return `${CFG.currency} ${roundMoney(n).toLocaleString()}`;
}

// ── Module One: Betting ─────────────────────────────────────────────────

export interface BettingInputs {
  bankroll: number;
  alreadyLost: number;
  decimalOdds: number;
  estimatedProbability: number; // 0..1
  probabilitySource: ProbabilitySource;
  maxAffordableLoss: number;
  plannedStake?: number;
}

export interface BettingCalc {
  impliedProbability: number;
  claimedEdge: number;
  fullKellyPercent: number;
  quarterKellyPercent: number;
  fullKellyAmount: number;
  limitAmount: number;
  verdict: VerdictResult;
}

export function calculateBetting(i: BettingInputs): BettingCalc {
  const impliedProbability = i.decimalOdds > 0 ? 1 / i.decimalOdds : 0;
  const claimedEdge = i.estimatedProbability * i.decimalOdds - 1;
  const fullKellyPercent =
    i.decimalOdds > 1 ? (i.decimalOdds * i.estimatedProbability - 1) / (i.decimalOdds - 1) : 0;
  const quarterKellyPercent = fullKellyPercent * CFG.fractionalKelly;
  const fullKellyAmount = roundMoney(Math.max(0, fullKellyPercent) * i.bankroll);

  const reasons: string[] = [];
  let limitAmount = 0;
  let tier: VerdictTier = 'red';
  let label = 'NO BET';
  let nextAction =
    "The bookmaker's price already prices in more probability than your estimate claims. Walking away is the mathematically correct move.";

  if (fullKellyPercent <= 0) {
    reasons.push('Your estimated probability does not produce a positive mathematical edge against these odds.');
  } else {
    const capByQuarterKelly = quarterKellyPercent * i.bankroll;
    const capByBankrollLimit = CFG.maxBankrollPercent * i.bankroll;
    const capByAffordability = i.maxAffordableLoss;
    let amount = Math.max(0, Math.min(capByQuarterKelly, capByBankrollLimit, capByAffordability));

    const isUnverified = i.probabilitySource === 'personal' || i.probabilitySource === 'other';
    if (isUnverified) amount *= CFG.unverifiedSourceCautionMultiplier;
    limitAmount = roundMoney(amount);

    if (isUnverified) {
      tier = 'amber';
      label = 'EDGE UNVERIFIED';
      reasons.push(
        'Your win probability is based on personal opinion rather than a verified data source — the "edge" is a belief, not a proven statistical fact.'
      );
      nextAction = 'Treat this figure as a ceiling, not a target. A verified probability source would sharpen this number considerably.';
    } else if (i.plannedStake !== undefined && i.plannedStake > limitAmount) {
      tier = 'red';
      label = 'HIGH RISK';
      reasons.push(`Your planned stake of ${money(i.plannedStake)} is above the KELLY Edge limit of ${money(limitAmount)}.`);
      nextAction = 'Reduce your stake to the KELLY Edge limit, or below it.';
    } else {
      tier = 'green';
      label = 'LIMITED STAKE';
      reasons.push('A mathematical edge exists at your stated probability, but the outcome of any single bet remains uncertain.');
      nextAction = 'Stake no more than the KELLY Edge limit shown below, using only money set aside for betting.';
    }
  }

  if (i.alreadyLost > 0 && i.bankroll > 0 && i.alreadyLost / i.bankroll >= CFG.chasingLossesThreshold) {
    reasons.push(CFG.warningMessages.chasingLosses(CFG.currency, i.alreadyLost));
  }

  return {
    impliedProbability,
    claimedEdge,
    fullKellyPercent,
    quarterKellyPercent,
    fullKellyAmount,
    limitAmount,
    verdict: { tier, label, reasons, nextAction },
  };
}

// ── Module Two: Forex / Trading ─────────────────────────────────────────

export interface ForexInputs {
  capital: number;
  completedTrades: number;
  winRate: number; // 0..1
  avgWin: number;
  avgLoss: number; // positive magnitude
  alreadyLost: number;
  maxAcceptableLossPerTrade: number;
  proposedRisk?: number;
}

export interface ForexCalc {
  rewardToRisk: number;
  fullKellyPercent: number;
  fullKellyAmount: number;
  limitAmount: number;
  verdict: VerdictResult;
}

export function calculateForex(i: ForexInputs): ForexCalc {
  const rewardToRisk = i.avgLoss > 0 ? i.avgWin / i.avgLoss : 0;
  const fullKellyPercent = rewardToRisk > 0 ? i.winRate - (1 - i.winRate) / rewardToRisk : 0;
  const fullKellyAmount = roundMoney(Math.max(0, fullKellyPercent) * i.capital);

  const reasons: string[] = [];
  let limitAmount = 0;
  let tier: VerdictTier = 'red';
  let label = 'NO TRADE';
  let nextAction = 'There is no positive historical edge at these numbers. Trading this system would be a bet, not an investment.';

  if (i.completedTrades < CFG.minHistoricalTrades) {
    tier = 'amber';
    label = 'INSUFFICIENT DATA';
    reasons.push(
      `Only ${i.completedTrades} completed trade(s) on record. Fewer than ${CFG.minHistoricalTrades} verified trades isn't enough history to know whether this edge is real or luck.`
    );
    nextAction = `Keep a verified trade log until you reach at least ${CFG.minHistoricalTrades} completed trades before sizing positions off this data.`;
  } else if (fullKellyPercent <= 0) {
    reasons.push('Your win rate and reward-to-risk ratio combine to a negative or zero expectancy.');
  } else {
    const quarterKellyPercent = fullKellyPercent * CFG.fractionalKelly;
    const capByQuarterKelly = quarterKellyPercent * i.capital;
    const capByBankrollLimit = CFG.maxBankrollPercent * i.capital;
    const capByMaxLoss = i.maxAcceptableLossPerTrade;
    limitAmount = roundMoney(Math.max(0, Math.min(capByQuarterKelly, capByBankrollLimit, capByMaxLoss)));

    if (i.proposedRisk !== undefined && i.proposedRisk > limitAmount) {
      tier = 'red';
      label = 'OVEREXPOSED';
      reasons.push(`Your proposed risk of ${money(i.proposedRisk)} exceeds the KELLY Edge limit of ${money(limitAmount)}.`);
      nextAction = 'Cut position size to the KELLY Edge limit, or below it.';
    } else {
      tier = 'green';
      label = 'WITHIN LIMIT';
      reasons.push('This position fits your configured risk controls, but historical performance never proves future profitability.');
      nextAction = 'Keep risk at or below the KELLY Edge limit, and keep logging trades so this estimate stays honest.';
    }
  }

  if (i.alreadyLost > 0 && i.capital > 0 && i.alreadyLost / i.capital >= CFG.chasingLossesThreshold) {
    reasons.push(CFG.warningMessages.chasingLosses(CFG.currency, i.alreadyLost));
  }

  return { rewardToRisk, fullKellyPercent, fullKellyAmount, limitAmount, verdict: { tier, label, reasons, nextAction } };
}

export function stressTestProbability(p: number): number {
  return Math.max(0, p * (1 - CFG.stressTestProbabilityDropPercent));
}

// ── Module Three: Quick-Money Investment Check ──────────────────────────

export interface InvestmentInputs {
  amountRequested: number;
  guaranteedReturns: YesNoUnsure;
  regulated: YesNoUnsure;
  businessExplainable: YesNoUnsure;
  performanceVerified: YesNoUnsure;
  withdrawalsRestricted: YesNoUnsure;
  recruitmentCommissions: YesNoUnsure;
  pressuredImmediate: YesNoUnsure;
  borrowingEncouraged: YesNoUnsure;
  capitalCouldBeLost: YesNoUnsure; // 'yes' is the honest/safe answer
  canAffordFullLoss: YesNoUnsure;
  personallyVerifiedRegulator: YesNoUnsure;
}

interface FlagDef {
  key: keyof InvestmentInputs;
  weight: number;
  badValue: YesNoUnsure;
  reason: string;
}

const FLAGS: FlagDef[] = [
  { key: 'guaranteedReturns', weight: 14, badValue: 'yes', reason: 'Returns are described as guaranteed — no legitimate investment can guarantee a return.' },
  { key: 'regulated', weight: 11, badValue: 'no', reason: 'The provider is not a regulated entity.' },
  { key: 'businessExplainable', weight: 9, badValue: 'no', reason: 'The underlying business cannot be clearly explained.' },
  { key: 'performanceVerified', weight: 9, badValue: 'no', reason: 'Performance figures are not independently verified.' },
  { key: 'withdrawalsRestricted', weight: 9, badValue: 'yes', reason: 'Withdrawals are restricted or delayed.' },
  { key: 'recruitmentCommissions', weight: 12, badValue: 'yes', reason: 'Recruiting others earns commissions — a structural feature of pyramid and Ponzi schemes.' },
  { key: 'pressuredImmediate', weight: 9, badValue: 'yes', reason: "There's pressure to act immediately." },
  { key: 'borrowingEncouraged', weight: 11, badValue: 'yes', reason: 'Borrowing money to invest is being encouraged.' },
  { key: 'capitalCouldBeLost', weight: 7, badValue: 'no', reason: 'You were told capital cannot be lost — every real investment carries loss risk, so that claim is itself a warning sign.' },
  { key: 'personallyVerifiedRegulator', weight: 9, badValue: 'no', reason: "The claimed regulator or licence hasn't been personally verified." },
];

const NOT_SURE_WEIGHT_FACTOR = 0.7; // 'Not sure' must increase risk, never read as safe

export interface InvestmentCalc {
  riskScore: number; // 0-100
  warningSigns: string[];
  unverified: string[];
  maxPossibleLoss: number;
  verdict: VerdictResult;
}

export function calculateInvestmentCheck(i: InvestmentInputs): InvestmentCalc {
  const warningSigns: string[] = [];
  const unverified: string[] = [];
  let score = 0;

  for (const flag of FLAGS) {
    const value = i[flag.key] as YesNoUnsure;
    if (value === flag.badValue) {
      score += flag.weight;
      warningSigns.push(flag.reason);
    } else if (value === 'unsure') {
      score += flag.weight * NOT_SURE_WEIGHT_FACTOR;
      unverified.push(flag.reason);
    }
  }
  score = Math.min(100, Math.round(score));

  const severeFlags = i.guaranteedReturns === 'yes' || i.recruitmentCommissions === 'yes' || i.borrowingEncouraged === 'yes';

  let tier: VerdictTier;
  let label: string;
  let nextAction: string;

  if (severeFlags) {
    tier = 'darkred';
    label = 'STOP';
    nextAction = 'Do not transfer any money. One or more of the most serious fraud indicators is present.';
  } else if (score >= CFG.investmentRiskScoreThresholds.highRisk) {
    tier = 'red';
    label = 'HIGH RISK';
    nextAction = 'Major warning signs were detected. Do not proceed without independently verifying every item above.';
  } else if (score >= CFG.investmentRiskScoreThresholds.verifyFirst || unverified.length > 0) {
    tier = 'amber';
    label = 'VERIFY FIRST';
    nextAction = 'Important information is missing or unconfirmed. Verify it independently before going further.';
  } else {
    tier = 'green';
    label = 'LOWER OBSERVED RISK';
    nextAction = 'No major red flags were detected in your answers. This is not a safety guarantee — continue with independent due diligence.';
  }

  if (i.canAffordFullLoss !== 'yes' && tier === 'green') {
    tier = 'amber';
    label = 'VERIFY FIRST';
    nextAction = "You've indicated you can't comfortably afford to lose this entire amount. Even a low-flag opportunity isn't worth risking money you need.";
  }

  return {
    riskScore: score,
    warningSigns,
    unverified,
    maxPossibleLoss: roundMoney(i.amountRequested),
    verdict: { tier, label, reasons: warningSigns, nextAction },
  };
}
