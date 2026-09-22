/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { calculateBetting, stressTestProbability, type BettingInputs } from '../../kelly/math';
import type { ProbabilitySource } from '../../kelly/types';
import { KELLY_CONFIG as CFG } from '../../kelly/config';
import { Banner, GhostButton, NumberField, PrimaryButton, SectionLabel, SelectField, ShareButton, StatTile, VERDICT_STYLES } from './ui';

const SOURCE_OPTIONS: { value: ProbabilitySource; label: string }[] = [
  { value: 'personal', label: 'Personal opinion' },
  { value: 'tipster', label: 'A tipster' },
  { value: 'historical', label: 'My own historical data' },
  { value: 'model', label: 'A statistical model' },
  { value: 'other', label: 'Other / unsure' },
];

const money = (n: number) => `${CFG.currency} ${Math.round(n).toLocaleString()}`;

type FormState = {
  bankroll: number | '';
  alreadyLost: number | '';
  decimalOdds: number | '';
  estimatedProbabilityPct: number | '';
  probabilitySource: ProbabilitySource;
  maxAffordableLoss: number | '';
  plannedStake: number | '';
};

const EMPTY: FormState = {
  bankroll: '',
  alreadyLost: 0,
  decimalOdds: '',
  estimatedProbabilityPct: '',
  probabilitySource: 'personal',
  maxAffordableLoss: '',
  plannedStake: '',
};

export default function BettingModule({ onBack, onCalculate }: { onBack: () => void; onCalculate: () => void }) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [showResult, setShowResult] = useState(false);
  const [stressProbability, setStressProbability] = useState<number | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const isValid =
    Number(form.bankroll) > 0 &&
    Number(form.decimalOdds) > 1 &&
    form.estimatedProbabilityPct !== '' &&
    Number(form.estimatedProbabilityPct) > 0 &&
    Number(form.estimatedProbabilityPct) <= 100 &&
    form.maxAffordableLoss !== '' &&
    Number(form.maxAffordableLoss) >= 0;

  const baseInputs: BettingInputs | null = isValid
    ? {
        bankroll: Number(form.bankroll),
        alreadyLost: Number(form.alreadyLost || 0),
        decimalOdds: Number(form.decimalOdds),
        estimatedProbability: Number(form.estimatedProbabilityPct) / 100,
        probabilitySource: form.probabilitySource,
        maxAffordableLoss: Number(form.maxAffordableLoss),
        plannedStake: form.plannedStake === '' ? undefined : Number(form.plannedStake),
      }
    : null;

  const result = useMemo(() => (baseInputs ? calculateBetting(baseInputs) : null), [baseInputs]);

  const stressResult = useMemo(() => {
    if (!baseInputs) return null;
    const p = stressProbability ?? stressTestProbability(baseInputs.estimatedProbability);
    return calculateBetting({ ...baseInputs, estimatedProbability: p });
  }, [baseInputs, stressProbability]);

  const submit = () => {
    if (!isValid) return;
    setShowResult(true);
    onCalculate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const runAgain = () => {
    setForm(EMPTY);
    setShowResult(false);
    setStressProbability(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showResult && result && baseInputs) {
    const style = VERDICT_STYLES[result.verdict.tier];
    const defaultStressProb = stressTestProbability(baseInputs.estimatedProbability);
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-12">
        <div className={`rounded-xl border p-8 md:p-12 ${style.border} ${style.bg} ${style.ring}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
            <span className="text-caption text-pebble tracking-[0.3em] uppercase">Bet Risk Verdict</span>
          </div>
          <h2 className={`text-display mb-6 tracking-tighter lowercase ${style.text}`}>
            {result.limitAmount <= 0 ? 'kes 0 — no bet' : `${result.verdict.label.toLowerCase()}`}
          </h2>
          <div className="flex flex-col gap-3 mb-8">
            {result.verdict.reasons.map((r, idx) => (
              <p key={idx} className="text-body text-ash leading-relaxed">{r}</p>
            ))}
          </div>
          <p className="text-body text-bone-white font-bold leading-relaxed">{result.verdict.nextAction}</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatTile label="Bookmaker-implied probability" value={`${(result.impliedProbability * 100).toFixed(1)}%`} />
          <StatTile label="Your estimated probability" value={`${(baseInputs.estimatedProbability * 100).toFixed(1)}%`} sub={SOURCE_OPTIONS.find(s => s.value === baseInputs.probabilitySource)?.label} />
          <StatTile label="Claimed edge" value={`${(result.claimedEdge * 100).toFixed(1)}%`} />
          <StatTile label="Full-Kelly amount (educational)" value={money(result.fullKellyAmount)} sub="Never stake this much" />
        </div>

        <div className="rounded-xl border border-iron/20 bg-charcoal-plate/30 p-8 md:p-12">
          <span className="text-caption text-pebble tracking-[0.2em] uppercase">KELLY Edge maximum-risk amount</span>
          <div className={`text-display mt-4 ${style.text}`}>{money(result.limitAmount)}</div>
          <p className="text-body text-ash/70 mt-4 max-w-xl">
            The lower of Quarter Kelly, {(CFG.maxBankrollPercent * 100).toFixed(0)}% of bankroll, and your stated maximum affordable loss{form.probabilitySource === 'personal' || form.probabilitySource === 'other' ? ', further reduced because your probability is unverified' : ''}.
          </p>
        </div>

        {/* Scenario testing — section 7 */}
        <div className="rounded-xl border border-iron/20 p-8 md:p-12">
          <SectionLabel>What happens if your probability estimate is wrong?</SectionLabel>
          <p className="text-body text-ash/70 mb-8 max-w-2xl">
            Drag to test a lower success probability and see the allocation and verdict update immediately.
          </p>
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex justify-between text-caption text-pebble uppercase">
              <span>Stress-tested probability</span>
              <span className="text-bone-white">{((stressProbability ?? defaultStressProb) * 100).toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={Math.round(baseInputs.estimatedProbability * 100)}
              value={Math.round((stressProbability ?? defaultStressProb) * 100)}
              onChange={(e) => setStressProbability(Number(e.target.value) / 100)}
              className="w-full accent-arterial-red"
            />
          </div>
          {stressResult && (
            <div className={`rounded-lg border p-6 ${VERDICT_STYLES[stressResult.verdict.tier].border} ${VERDICT_STYLES[stressResult.verdict.tier].bg}`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className={`text-heading-sm lowercase ${VERDICT_STYLES[stressResult.verdict.tier].text}`}>{stressResult.limitAmount <= 0 ? 'kes 0 — no bet' : stressResult.verdict.label.toLowerCase()}</span>
                <span className="text-body text-bone-white font-bold">{money(stressResult.limitAmount)} limit</span>
              </div>
            </div>
          )}
        </div>

        <Banner tone="info">{CFG.disclaimer}</Banner>

        <div className="flex flex-col sm:flex-row gap-4">
          <GhostButton onClick={runAgain}><RefreshCw size={16} /> Run again</GhostButton>
          <ShareButton text={`KELLY Edge verdict: ${result.limitAmount <= 0 ? 'KES 0 — NO BET' : result.verdict.label}. ${result.verdict.nextAction} Checked with KELLY Edge, a free risk-assessment tool at finintel.africa.`} />
          <PrimaryButton onClick={onBack}>Back to KELLY Edge <ArrowRight size={16} /></PrimaryButton>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-10">
      <SectionLabel>Module One — Betting</SectionLabel>
      <Banner tone="warning">
        Bankroll means money you've deliberately set aside for betting — never rent, food, school fees, debt repayments or emergency savings.
      </Banner>

      <div className="grid md:grid-cols-2 gap-6">
        <NumberField label="Total betting bankroll" suffix={CFG.currency} value={form.bankroll} onChange={(v) => set('bankroll', v)} placeholder="e.g. 5000" />
        <NumberField label="Amount already lost this period" suffix={CFG.currency} value={form.alreadyLost} onChange={(v) => set('alreadyLost', v)} placeholder="0" />
        <NumberField label="Bookmaker's decimal odds" value={form.decimalOdds} onChange={(v) => set('decimalOdds', v)} placeholder="e.g. 1.85" hint="Must be greater than 1.00." />
        <NumberField label="Your estimated win probability" suffix="%" value={form.estimatedProbabilityPct} onChange={(v) => set('estimatedProbabilityPct', v)} placeholder="e.g. 55" hint="Independent of the odds — your own view of how likely this outcome is." />
        <SelectField label="Source of that probability" value={form.probabilitySource} onChange={(v) => set('probabilitySource', v)} options={SOURCE_OPTIONS} />
        <NumberField label="Maximum you can afford to lose" suffix={CFG.currency} value={form.maxAffordableLoss} onChange={(v) => set('maxAffordableLoss', v)} placeholder="e.g. 500" />
      </div>

      <NumberField
        label="Planned stake (optional)"
        hint="Enter what you're considering staking to see how it compares against the KELLY Edge limit."
        suffix={CFG.currency}
        value={form.plannedStake}
        onChange={(v) => set('plannedStake', v)}
        placeholder="Optional"
      />

      <div className="flex items-center justify-between gap-4 pt-4">
        <GhostButton onClick={onBack}><ArrowLeft size={16} /> Back</GhostButton>
        <PrimaryButton onClick={submit} disabled={!isValid}>Calculate risk <ArrowRight size={16} /></PrimaryButton>
      </div>
    </motion.div>
  );
}
