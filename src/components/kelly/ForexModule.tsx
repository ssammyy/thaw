/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { calculateForex, stressTestProbability, type ForexInputs } from '../../kelly/math';
import { KELLY_CONFIG as CFG } from '../../kelly/config';
import { Banner, GhostButton, NumberField, PrimaryButton, SectionLabel, ShareButton, StatTile, VERDICT_STYLES } from './ui';

const money = (n: number) => `${CFG.currency} ${Math.round(n).toLocaleString()}`;

type FormState = {
  capital: number | '';
  completedTrades: number | '';
  winRatePct: number | '';
  avgWin: number | '';
  avgLoss: number | '';
  alreadyLost: number | '';
  maxAcceptableLossPerTrade: number | '';
  proposedRisk: number | '';
};

const EMPTY: FormState = {
  capital: '',
  completedTrades: '',
  winRatePct: '',
  avgWin: '',
  avgLoss: '',
  alreadyLost: 0,
  maxAcceptableLossPerTrade: '',
  proposedRisk: '',
};

export default function ForexModule({ onBack, onCalculate }: { onBack: () => void; onCalculate: () => void }) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [showResult, setShowResult] = useState(false);
  const [stressWinRate, setStressWinRate] = useState<number | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const isValid =
    Number(form.capital) > 0 &&
    form.completedTrades !== '' &&
    Number(form.completedTrades) >= 0 &&
    form.winRatePct !== '' &&
    Number(form.winRatePct) > 0 &&
    Number(form.winRatePct) <= 100 &&
    Number(form.avgWin) > 0 &&
    Number(form.avgLoss) > 0 &&
    form.maxAcceptableLossPerTrade !== '' &&
    Number(form.maxAcceptableLossPerTrade) >= 0;

  const baseInputs: ForexInputs | null = isValid
    ? {
        capital: Number(form.capital),
        completedTrades: Number(form.completedTrades),
        winRate: Number(form.winRatePct) / 100,
        avgWin: Number(form.avgWin),
        avgLoss: Number(form.avgLoss),
        alreadyLost: Number(form.alreadyLost || 0),
        maxAcceptableLossPerTrade: Number(form.maxAcceptableLossPerTrade),
        proposedRisk: form.proposedRisk === '' ? undefined : Number(form.proposedRisk),
      }
    : null;

  const result = useMemo(() => (baseInputs ? calculateForex(baseInputs) : null), [baseInputs]);

  const stressResult = useMemo(() => {
    if (!baseInputs) return null;
    const w = stressWinRate ?? stressTestProbability(baseInputs.winRate);
    return calculateForex({ ...baseInputs, winRate: w });
  }, [baseInputs, stressWinRate]);

  const submit = () => {
    if (!isValid) return;
    setShowResult(true);
    onCalculate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const runAgain = () => {
    setForm(EMPTY);
    setShowResult(false);
    setStressWinRate(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showResult && result && baseInputs) {
    const style = VERDICT_STYLES[result.verdict.tier];
    const defaultStressWinRate = stressTestProbability(baseInputs.winRate);
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-12">
        <div className={`rounded-xl border p-8 md:p-12 ${style.border} ${style.bg} ${style.ring}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
            <span className="text-caption text-pebble tracking-[0.3em] uppercase">Trade Risk Verdict</span>
          </div>
          <h2 className={`text-display mb-6 tracking-tighter lowercase ${style.text}`}>
            {result.verdict.label === 'NO TRADE' ? 'kes 0 — no trade' : result.verdict.label.toLowerCase()}
          </h2>
          <div className="flex flex-col gap-3 mb-8">
            {result.verdict.reasons.map((r, idx) => (
              <p key={idx} className="text-body text-ash leading-relaxed">{r}</p>
            ))}
          </div>
          <p className="text-body text-bone-white font-bold leading-relaxed">{result.verdict.nextAction}</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatTile label="Historical win rate" value={`${(baseInputs.winRate * 100).toFixed(1)}%`} sub={`${baseInputs.completedTrades} trade(s) observed`} />
          <StatTile label="Reward-to-risk ratio" value={result.rewardToRisk.toFixed(2)} />
          <StatTile label="Full-Kelly amount (educational)" value={money(result.fullKellyAmount)} sub="Never risk this much" />
          <StatTile label="Proposed risk" value={form.proposedRisk === '' ? '—' : money(Number(form.proposedRisk))} />
        </div>

        <div className="rounded-xl border border-iron/20 bg-charcoal-plate/30 p-8 md:p-12">
          <span className="text-caption text-pebble tracking-[0.2em] uppercase">KELLY Edge maximum-risk amount</span>
          <div className={`text-display mt-4 ${style.text}`}>{money(result.limitAmount)}</div>
          <p className="text-body text-ash/70 mt-4 max-w-xl">
            The lower of Quarter Kelly, {(CFG.maxBankrollPercent * 100).toFixed(0)}% of trading capital, and your stated maximum acceptable loss per trade. Historical performance does not prove future profitability.
          </p>
        </div>

        <div className="rounded-xl border border-iron/20 p-8 md:p-12">
          <SectionLabel>What happens if your win rate is lower than you think?</SectionLabel>
          <p className="text-body text-ash/70 mb-8 max-w-2xl">
            Drag to stress-test a lower win rate and see the allocation and verdict update immediately.
          </p>
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex justify-between text-caption text-pebble uppercase">
              <span>Stress-tested win rate</span>
              <span className="text-bone-white">{((stressWinRate ?? defaultStressWinRate) * 100).toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={Math.round(baseInputs.winRate * 100)}
              value={Math.round((stressWinRate ?? defaultStressWinRate) * 100)}
              onChange={(e) => setStressWinRate(Number(e.target.value) / 100)}
              className="w-full accent-arterial-red"
            />
          </div>
          {stressResult && (
            <div className={`rounded-lg border p-6 ${VERDICT_STYLES[stressResult.verdict.tier].border} ${VERDICT_STYLES[stressResult.verdict.tier].bg}`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className={`text-heading-sm lowercase ${VERDICT_STYLES[stressResult.verdict.tier].text}`}>{stressResult.verdict.label === 'NO TRADE' ? 'kes 0 — no trade' : stressResult.verdict.label.toLowerCase()}</span>
                <span className="text-body text-bone-white font-bold">{money(stressResult.limitAmount)} limit</span>
              </div>
            </div>
          )}
        </div>

        <Banner tone="info">{CFG.disclaimer}</Banner>

        <div className="flex flex-col sm:flex-row gap-4">
          <GhostButton onClick={runAgain}><RefreshCw size={16} /> Run again</GhostButton>
          <ShareButton text={`KELLY Edge verdict: ${result.verdict.label === 'NO TRADE' ? 'KES 0 — NO TRADE' : result.verdict.label}. ${result.verdict.nextAction} Checked with KELLY Edge, a free risk-assessment tool at finintel.africa.`} />
          <PrimaryButton onClick={onBack}>Back to KELLY Edge <ArrowRight size={16} /></PrimaryButton>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-10">
      <SectionLabel>Module Two — Forex &amp; Trading</SectionLabel>
      <Banner tone="warning">
        If there's no reliable trading history behind these numbers, treat any "edge" as unknown, not proven.
      </Banner>

      <div className="grid md:grid-cols-2 gap-6">
        <NumberField label="Total trading capital" suffix={CFG.currency} value={form.capital} onChange={(v) => set('capital', v)} placeholder="e.g. 50000" />
        <NumberField label="Number of completed historical trades" value={form.completedTrades} onChange={(v) => set('completedTrades', v)} placeholder="e.g. 40" />
        <NumberField label="Verified win rate" suffix="%" value={form.winRatePct} onChange={(v) => set('winRatePct', v)} placeholder="e.g. 48" />
        <NumberField label="Amount already lost this period" suffix={CFG.currency} value={form.alreadyLost} onChange={(v) => set('alreadyLost', v)} placeholder="0" />
        <NumberField label="Average profit on winning trades" suffix={CFG.currency} value={form.avgWin} onChange={(v) => set('avgWin', v)} placeholder="e.g. 2000" />
        <NumberField label="Average loss on losing trades" suffix={CFG.currency} value={form.avgLoss} onChange={(v) => set('avgLoss', v)} placeholder="e.g. 1000" />
        <NumberField label="Maximum acceptable loss per trade" suffix={CFG.currency} value={form.maxAcceptableLossPerTrade} onChange={(v) => set('maxAcceptableLossPerTrade', v)} placeholder="e.g. 500" />
        <NumberField label="Proposed trade / risk amount (optional)" suffix={CFG.currency} value={form.proposedRisk} onChange={(v) => set('proposedRisk', v)} placeholder="Optional" />
      </div>

      <div className="flex items-center justify-between gap-4 pt-4">
        <GhostButton onClick={onBack}><ArrowLeft size={16} /> Back</GhostButton>
        <PrimaryButton onClick={submit} disabled={!isValid}>Calculate risk <ArrowRight size={16} /></PrimaryButton>
      </div>
    </motion.div>
  );
}
