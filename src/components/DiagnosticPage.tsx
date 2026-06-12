/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { DiagnosticToolData } from '../types';
import Footer from './Footer';

interface DiagnosticPageProps {
  tool: DiagnosticToolData;
  onExit: () => void;
}

export default function DiagnosticPage({ tool, onExit }: DiagnosticPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  // Land at the top of the page whenever a different diagnostic is opened, and
  // reset progress so each tool route starts clean.
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  }, [tool.id]);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);

    if (currentStep < tool.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = showResult ? tool.calculateResult(answers) : null;
  const outcome = result ? tool.outcomes.find(o => o.id === result.outcomeId) : null;

  return (
    <main className="bg-void-canvas min-h-screen selection:bg-arterial-red selection:text-bone-white flex flex-col">
      {/* Page header — doubles as the site brand and the way back */}
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
              <span className="text-caption text-ash block mb-1">active diagnostic</span>
              <span className="text-subheading text-bone-white truncate block">{tool.title}</span>
            </div>
            <button
              onClick={onExit}
              aria-label="Exit diagnostic"
              className="flex items-center gap-3 min-h-[44px] shrink-0 px-4 rounded-lg border border-ash/20 text-pebble hover:text-bone-white hover:border-arterial-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-arterial-red transition-all"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              <span className="text-caption uppercase">Back to site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Diagnostic body */}
      <div className="flex-grow w-full">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 md:py-28 min-h-[70vh] flex flex-col justify-center">
          {!showResult ? (
            <>
              {/* Progress */}
              <div className="mb-16">
                <div className="flex justify-between text-caption text-ash mb-4">
                  <span>Perimeter Scan</span>
                  <span>{currentStep + 1} / {tool.questions.length}</span>
                </div>
                <div className="h-[1px] bg-iron/30 w-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / tool.questions.length) * 100}%` }}
                    className="h-full bg-arterial-red"
                  />
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-grow flex flex-col justify-center"
                >
                  {tool.questions[currentStep].section && (
                    <div className="mb-6 flex items-center gap-4">
                      <span className="text-caption text-arterial-red border border-arterial-red/30 rounded-sm px-3 py-1">
                        {tool.questions[currentStep].section}
                      </span>
                      {tool.questions[currentStep].sectionDesc && (
                        <span className="serif-italic text-body text-pebble">
                          {tool.questions[currentStep].sectionDesc}
                        </span>
                      )}
                    </div>
                  )}

                  <h3 className="text-heading-lg mb-10 max-w-3xl leading-[1.05] lowercase">
                    {tool.questions[currentStep].text}
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    {tool.questions[currentStep].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(option.value)}
                        className="group relative flex items-center gap-6 px-6 py-4 border border-iron/20 rounded-lg bg-void-canvas hover:border-arterial-red transition-all text-left overflow-hidden"
                      >
                        <span className="text-caption text-pebble opacity-50 group-hover:opacity-100 group-hover:text-arterial-red shrink-0">
                          0{idx + 1}
                        </span>
                        <span className="text-body text-bone-white transition-colors leading-tight uppercase font-bold flex-grow">
                          {option.label}
                        </span>
                        <ArrowRight
                          size={16}
                          className="text-arterial-red shrink-0 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="mb-12 inline-block">
                <div className="w-24 h-[1px] bg-arterial-red mx-auto mb-8" />
                <h3 className="text-caption text-pebble tracking-[0.5em]">Verdict Protocol</h3>
              </div>

              <h2 className="text-display mb-8 tracking-tighter text-bone-white lowercase">{outcome?.title}</h2>
              <div className="w-full h-[1px] bg-iron/10 mb-12" />

              <p className="serif-italic text-heading text-ash mb-8 max-w-2xl mx-auto leading-relaxed">
                "{outcome?.description}"
              </p>

              {outcome?.detail && (
                <p className="text-body text-pebble mb-16 max-w-2xl mx-auto leading-relaxed text-left">
                  {outcome.detail}
                </p>
              )}

              <div className="grid md:grid-cols-2 gap-12 text-left max-w-4xl mx-auto mb-12">
                <div className="border border-arterial-red/30 p-10 rounded-lg bg-charcoal-plate/30 glass-edge">
                  <h4 className="text-caption text-arterial-red mb-8 border-b border-arterial-red/10 pb-4 font-bold">Priority Remediation</h4>
                  <div className="grid gap-6">
                    {outcome?.nextSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <ArrowRight size={14} className="mt-1 text-arterial-red group-hover:translate-x-1 transition-transform" />
                        <span className="text-body text-ash font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-caption text-pebble">Risk Coefficient</span>
                    <div className="flex items-baseline gap-4">
                       <span className="text-display text-bone-white">{Math.round((result?.score || 0) / (result?.maxScore || 1) * 100)}%</span>
                       <span className="text-caption text-ash">structural integrity</span>
                    </div>
                  </div>
                  {result?.dimensionScores && (
                    <div className="flex flex-col gap-4">
                      {Object.entries(result.dimensionScores).map(([dim, score]) => (
                        <div key={dim} className="flex flex-col gap-2">
                          <div className="flex justify-between text-caption">
                            <span className="text-pebble">{dim}</span>
                            <span className="text-ash">{Math.round((score / 25) * 100)}%</span>
                          </div>
                          <div className="h-[1px] bg-iron/30 w-full">
                            <div
                              className="h-full bg-arterial-red"
                              style={{ width: `${(score / 25) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="h-[1px] bg-iron/10" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                <button
                  onClick={reset}
                  className="flex-1 p-6 border border-ash/20 text-bone-white text-caption font-bold tracking-[0.2em] rounded-lg hover:border-arterial-red transition-all text-center uppercase"
                >
                  Run Again
                </button>
                <button
                  onClick={onExit}
                  className="flex-1 p-6 bg-bone-white text-void-canvas text-caption font-bold tracking-[0.2em] rounded-lg hover:bg-arterial-red hover:text-bone-white transition-all text-center"
                >
                  EXFILTRATE SESSION
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
