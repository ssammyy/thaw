/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { calculateInvestmentCheck, type InvestmentInputs } from '../../kelly/math';
import type { YesNoUnsure } from '../../kelly/types';
import { KELLY_CONFIG as CFG } from '../../kelly/config';
import { Banner, GhostButton, NumberField, PrimaryButton, SectionLabel, ShareButton, StatTile, VERDICT_STYLES, YesNoUnsureField } from './ui';

const money = (n: number) => `${CFG.currency} ${Math.round(n).toLocaleString()}`;

type YNUKeys = Exclude<keyof InvestmentInputs, 'amountRequested'>;

const QUESTIONS: { key: YNUKeys; label: string }[] = [
  { key: 'guaranteedReturns', label: 'Are the returns described as guaranteed?' },
  { key: 'regulated', label: 'Is the company or provider regulated?' },
  { key: 'businessExplainable', label: 'Can you clearly explain how the underlying business makes money?' },
  { key: 'performanceVerified', label: 'Is the performance independently verified?' },
  { key: 'withdrawalsRestricted', label: 'Are withdrawals restricted or delayed?' },
  { key: 'recruitmentCommissions', label: 'Does recruiting other people earn you commissions?' },
  { key: 'pressuredImmediate', label: 'Are you being pressured to act immediately?' },
  { key: 'borrowingEncouraged', label: 'Is borrowing money to invest being encouraged?' },
  { key: 'capitalCouldBeLost', label: 'Could all of your capital be lost?' },
  { key: 'canAffordFullLoss', label: 'Could you afford to lose the entire amount?' },
  { key: 'personallyVerifiedRegulator', label: "Have you personally verified the regulator or licence claimed?" },
];

type FormState = { amountRequested: number | '' } & Record<YNUKeys, YesNoUnsure | undefined>;

const EMPTY: FormState = {
  amountRequested: '',
  guaranteedReturns: undefined,
  regulated: undefined,
  businessExplainable: undefined,
  performanceVerified: undefined,
  withdrawalsRestricted: undefined,
  recruitmentCommissions: undefined,
  pressuredImmediate: undefined,
  borrowingEncouraged: undefined,
  capitalCouldBeLost: undefined,
  canAffordFullLoss: undefined,
  personallyVerifiedRegulator: undefined,
};

export default function InvestmentModule({ onBack, onCalculate }: { onBack: () => void; onCalculate: () => void }) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [showResult, setShowResult] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const isValid = Number(form.amountRequested) > 0 && QUESTIONS.every((q) => form[q.key] !== undefined);

  const inputs: InvestmentInputs | null = isValid
    ? ({
        amountRequested: Number(form.amountRequested),
        ...(Object.fromEntries(QUESTIONS.map((q) => [q.key, form[q.key]])) as Record<YNUKeys, YesNoUnsure>),
      } as InvestmentInputs)
    : null;

  const result = useMemo(() => (inputs ? calculateInvestmentCheck(inputs) : null), [inputs]);

  const submit = () => {
    if (!isValid) return;
    setShowResult(true);
    onCalculate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const runAgain = () => {
    setForm(EMPTY);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showResult && result) {
    const style = VERDICT_STYLES[result.verdict.tier];
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-12">
        <div className={`rounded-xl border p-8 md:p-12 ${style.border} ${style.bg} ${style.ring}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
            <span className="text-caption text-pebble tracking-[0.3em] uppercase">Opportunity Verdict</span>
          </div>
          <h2 className={`text-display mb-6 tracking-tighter lowercase ${style.text}`}>
            {result.verdict.tier === 'darkred' ? 'kes 0 — do not proceed' : result.verdict.label.toLowerCase()}
          </h2>
          <p className="text-body text-bone-white font-bold leading-relaxed">{result.verdict.nextAction}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <StatTile label="Opportunity risk score" value={`${result.riskScore} / 100`} />
          <StatTile label="Maximum possible loss" value={money(result.maxPossibleLoss)} sub="If this is not legitimate" />
          <StatTile label="Warning signs detected" value={String(result.warningSigns.length)} />
        </div>

        <div className="h-2 rounded-full bg-iron/20 overflow-hidden">
          <div className={`h-full ${style.dot}`} style={{ width: `${result.riskScore}%` }} />
        </div>

        {result.warningSigns.length > 0 && (
          <div className="rounded-xl border border-arterial-red/30 bg-charcoal-plate/30 p-8 md:p-12">
            <h4 className="text-caption text-arterial-red mb-6 font-bold tracking-widest uppercase">Warning signs detected</h4>
            <div className="flex flex-col gap-4">
              {result.warningSigns.map((w, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <ArrowRight size={14} className="mt-1 text-arterial-red shrink-0" />
                  <span className="text-body text-ash">{w}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {result.unverified.length > 0 && (
          <div className="rounded-xl border border-[#e0a83e]/30 bg-charcoal-plate/30 p-8 md:p-12">
            <h4 className="text-caption text-[#e0a83e] mb-6 font-bold tracking-widest uppercase">Could not be verified</h4>
            <div className="flex flex-col gap-4">
              {result.unverified.map((w, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <ArrowRight size={14} className="mt-1 text-[#e0a83e] shrink-0" />
                  <span className="text-body text-ash">{w}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Banner tone="warning">
          KELLY Edge never labels an opportunity safe or guaranteed. A low score here means fewer detected red flags, not confirmed legitimacy — the responsible allocation may still be {CFG.currency} 0 until everything above is independently verified.
        </Banner>

        <Banner tone="info">{CFG.disclaimer}</Banner>

        <div className="flex flex-col sm:flex-row gap-4">
          <GhostButton onClick={runAgain}><RefreshCw size={16} /> Check another opportunity</GhostButton>
          <ShareButton text={`KELLY Edge verdict: ${result.verdict.tier === 'darkred' ? 'KES 0 — DO NOT PROCEED' : result.verdict.label}. ${result.verdict.nextAction} Checked with KELLY Edge, a free risk-assessment tool at finintel.africa.`} />
          <PrimaryButton onClick={onBack}>Back to KELLY Edge <ArrowRight size={16} /></PrimaryButton>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-10">
      <SectionLabel>Module Three — Quick-Money Investment Check</SectionLabel>
      <Banner tone="warning">
        Answer honestly, including "Not sure" where that's true — an unconfirmed answer is treated as a risk, not as safe.
      </Banner>

      <NumberField
        label="Amount requested"
        suffix={CFG.currency}
        value={form.amountRequested}
        onChange={(v) => set('amountRequested', v)}
        placeholder="e.g. 20000"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {QUESTIONS.map((q) => (
          <div key={q.key}>
            <YesNoUnsureField label={q.label} value={form[q.key]} onChange={(v) => set(q.key, v)} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 pt-4">
        <GhostButton onClick={onBack}><ArrowLeft size={16} /> Back</GhostButton>
        <PrimaryButton onClick={submit} disabled={!isValid}>Get verdict <ArrowRight size={16} /></PrimaryButton>
      </div>
    </motion.div>
  );
}
