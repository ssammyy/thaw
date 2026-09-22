/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import Footer from './Footer';
import ModuleSelector from './kelly/ModuleSelector';
import BettingModule from './kelly/BettingModule';
import ForexModule from './kelly/ForexModule';
import InvestmentModule from './kelly/InvestmentModule';
import { Banner, PrimaryButton } from './kelly/ui';
import type { KellyModule } from '../kelly/types';
import { KELLY_CONFIG as CFG } from '../kelly/config';

const AGE_GATE_KEY = 'kelly-edge-18-confirmed';

interface KellyEdgePageProps {
  onExit: () => void;
}

export default function KellyEdgePage({ onExit }: KellyEdgePageProps) {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [activeModule, setActiveModule] = useState<KellyModule | null>(null);
  const [calcCount, setCalcCount] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    try {
      setAgeConfirmed(sessionStorage.getItem(AGE_GATE_KEY) === 'true');
    } catch {
      // Storage can throw in private/locked-down browsing — fail open to the gate.
      setAgeConfirmed(false);
    }
  }, []);

  const confirmAge = () => {
    setAgeConfirmed(true);
    try {
      sessionStorage.setItem(AGE_GATE_KEY, 'true');
    } catch {
      // No persistence available — the gate simply reappears next session, which is safe.
    }
  };

  const goToModule = (m: KellyModule) => {
    setActiveModule(m);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToSelector = () => {
    setActiveModule(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bumpCalcCount = () => setCalcCount((c) => c + 1);

  const showBreakReminder = calcCount >= CFG.breakReminderAfterCalculations && calcCount % CFG.breakReminderAfterCalculations === 0;

  return (
    <main className="bg-void-canvas min-h-screen selection:bg-arterial-red selection:text-bone-white flex flex-col">
      {/* Page header — matches the other diagnostic/content pages */}
      <header className="sticky top-0 z-40 bg-void-canvas/90 backdrop-blur-md border-b border-ash/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-5 flex justify-between items-center gap-4">
          <button
            onClick={onExit}
            aria-label="Back to THAW home"
            className="flex flex-col cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-arterial-red rounded-sm"
          >
            <h1 className="text-heading-sm font-bold tracking-tighter text-bone-white leading-none">THAW</h1>
          </button>

          <div className="flex items-center gap-5 min-w-0">
            <div className="hidden sm:block min-w-0 text-right">
              <span className="text-caption text-ash block mb-1">active tool</span>
              <span className="text-subheading text-bone-white truncate block">KELLY Edge</span>
            </div>
            <button
              onClick={activeModule ? backToSelector : onExit}
              aria-label={activeModule ? 'Back to module selector' : 'Exit KELLY Edge'}
              className="flex items-center gap-3 min-h-[44px] shrink-0 px-4 rounded-lg border border-ash/20 text-pebble hover:text-bone-white hover:border-arterial-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-arterial-red transition-all"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              <span className="text-caption uppercase">{activeModule ? 'Change module' : 'Back to site'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-grow w-full relative z-10 bg-void-canvas">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 md:py-24">
          {!ageConfirmed ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8 max-w-xl">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl border border-arterial-red/25 bg-arterial-red/10 text-arterial-red">
                <ShieldAlert size={24} strokeWidth={1.5} />
              </div>
              <h2 className="text-heading-lg lowercase leading-tight">before we begin.</h2>
              <p className="text-body text-ash leading-relaxed">
                KELLY Edge deals with betting, trading and investment risk. It is an educational risk-assessment tool —
                it does not predict outcomes, and no result it shows implies guaranteed profit or safety.
              </p>
              <Banner tone="warning">
                You must be at least 18 years old to use this tool. By continuing, you confirm that you are.
              </Banner>
              <PrimaryButton onClick={confirmAge}>I confirm I am 18 or older</PrimaryButton>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {showBreakReminder && (
                <motion.div
                  key={`break-${calcCount}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-10 overflow-hidden"
                >
                  <Banner tone="warning">{CFG.warningMessages.breakReminder}</Banner>
                </motion.div>
              )}
              <motion.div key={activeModule ?? 'selector'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {!activeModule && <ModuleSelector onSelect={goToModule} />}
                {activeModule === 'betting' && <BettingModule onBack={backToSelector} onCalculate={bumpCalcCount} />}
                {activeModule === 'forex' && <ForexModule onBack={backToSelector} onCalculate={bumpCalcCount} />}
                {activeModule === 'investment' && <InvestmentModule onBack={backToSelector} onCalculate={bumpCalcCount} />}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
