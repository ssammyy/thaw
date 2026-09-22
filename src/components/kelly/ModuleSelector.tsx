/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { ArrowUpRight, Dices, LineChart, ShieldQuestion } from 'lucide-react';
import type { KellyModule } from '../../kelly/types';
import { openTool, openPage } from '../../useToolRoute';
import { Banner } from './ui';

const OPTIONS: { id: KellyModule; title: string; desc: string; icon: ReactNode }[] = [
  { id: 'betting', title: 'A bet', desc: 'A single wager against bookmaker odds.', icon: <Dices size={22} strokeWidth={1.5} /> },
  { id: 'forex', title: 'A forex or trading position', desc: 'A trade sized against your own track record.', icon: <LineChart size={22} strokeWidth={1.5} /> },
  { id: 'investment', title: 'A quick-money investment', desc: 'An opportunity promising fast or guaranteed returns.', icon: <ShieldQuestion size={22} strokeWidth={1.5} /> },
];

export default function ModuleSelector({ onSelect }: { onSelect: (m: KellyModule) => void }) {
  return (
    <div className="flex flex-col gap-16">
      <div>
        <span className="text-caption text-pebble tracking-[0.3em] uppercase">KELLY Edge</span>
        <h2 className="text-display-xl leading-[0.85] mt-6 lowercase">how much can you</h2>
        <div className="flex items-baseline flex-wrap -mt-2 md:-mt-4">
          <h2 className="text-display-xl leading-[0.85] lowercase">afford to <span className="serif-italic text-arterial-red normal-case">risk?</span></h2>
        </div>
        <p className="text-heading-sm text-ash mt-10 max-w-2xl lowercase leading-snug font-normal normal-case tracking-normal">
          Before asking how much you could make, calculate how much you could lose.
        </p>
      </div>

      <div>
        <span className="text-caption text-pebble tracking-[0.2em] uppercase block mb-6">What are you considering?</span>
        <div className="grid md:grid-cols-3 gap-6">
          {OPTIONS.map((opt, i) => (
            <motion.button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col text-left p-8 rounded-xl border border-iron/20 bg-charcoal-plate/30 hover:border-arterial-red transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl border border-arterial-red/25 bg-arterial-red/10 text-arterial-red group-hover:bg-arterial-red group-hover:text-bone-white transition-all mb-8">
                {opt.icon}
              </div>
              <h3 className="text-heading-sm text-bone-white mb-3 lowercase">{opt.title}</h3>
              <p className="text-body text-ash leading-relaxed">{opt.desc}</p>
              <div className="mt-8 flex items-center gap-2 text-caption font-bold uppercase tracking-widest text-pebble group-hover:text-arterial-red transition-colors">
                Start <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Banner tone="info">
        KELLY Edge is an educational risk-assessment tool. It does not predict outcomes or guarantee profits.
      </Banner>

      <div className="rounded-xl border border-iron/15 p-8 md:p-12 bg-charcoal-plate/20">
        <span className="text-caption text-pebble tracking-[0.2em] uppercase block mb-4">The Kelly Criterion, briefly</span>
        <p className="text-body text-ash leading-relaxed max-w-3xl">
          The Kelly Criterion is a formula for sizing a bet or position from your edge and odds — the bigger your genuine
          edge, the more it says you could risk; a zero or negative edge means it says to risk nothing. KELLY Edge never
          uses the full Kelly figure directly: it applies a quarter-Kelly fraction on top of hard bankroll and
          affordability caps, because real-world estimates are rarely as precise as the math assumes.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        <button
          onClick={() => openPage('about')}
          className="flex items-center gap-3 px-6 py-4 rounded-lg border border-iron/20 text-pebble text-caption uppercase tracking-widest hover:text-bone-white hover:border-arterial-red transition-all"
        >
          Read The House Always Wins <ArrowUpRight size={14} />
        </button>
        <button
          onClick={() => openTool('vulnerability')}
          className="flex items-center gap-3 px-6 py-4 rounded-lg border border-iron/20 text-pebble text-caption uppercase tracking-widest hover:text-bone-white hover:border-arterial-red transition-all"
        >
          Vulnerability Diagnostic <ArrowUpRight size={14} />
        </button>
        <button
          onClick={() => openTool('investment')}
          className="flex items-center gap-3 px-6 py-4 rounded-lg border border-iron/20 text-pebble text-caption uppercase tracking-widest hover:text-bone-white hover:border-arterial-red transition-all"
        >
          Investment Analyzer <ArrowUpRight size={14} />
        </button>
        <button
          onClick={() => openTool('recovery')}
          className="flex items-center gap-3 px-6 py-4 rounded-lg border border-iron/20 text-pebble text-caption uppercase tracking-widest hover:text-bone-white hover:border-arterial-red transition-all"
        >
          Financial Recovery Index <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}
