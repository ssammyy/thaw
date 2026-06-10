/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { DiagnosticToolData } from '../types';

interface DiagnosticToolProps {
  tool: DiagnosticToolData;
  onClose: () => void;
}

export default function DiagnosticTool({ tool, onClose }: DiagnosticToolProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  // Close on Escape + lock background scroll while modal is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={tool.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-8 bg-void-canvas/95 backdrop-blur-md"
    >
      <div className="relative w-full max-w-4xl bg-charcoal-plate border border-ash/20 rounded-none sm:rounded-xl overflow-hidden glass-edge flex flex-col h-full max-h-full sm:h-auto sm:max-h-[90dvh]">
        {/* Header */}
        <div className="flex justify-between items-center gap-4 p-5 md:p-8 border-b border-ash/10 shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-4 h-4 bg-arterial-red rounded-full shadow-[0_0_10px_rgba(254,30,52,0.5)] shrink-0" />
            <div className="min-w-0">
              <span className="text-caption text-ash block mb-1">active diagnostic</span>
              <h2 className="text-subheading text-bone-white truncate">{tool.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Exit diagnostic"
            className="flex items-center justify-center gap-3 min-w-[44px] min-h-[44px] shrink-0 px-3 -mr-2 rounded-lg text-pebble hover:text-bone-white hover:bg-void-canvas/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-arterial-red transition-all"
          >
            <span className="hidden md:inline text-caption uppercase">Exit Protocol</span>
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto overscroll-contain">
          <div className="p-6 md:p-12 sm:min-h-[500px] min-h-full flex flex-col justify-center">
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

              <div className="grid md:grid-cols-2 gap-12 text-left max-w-4xl mx-auto mb-20">
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
                  <button
                    onClick={onClose}
                    className="p-6 bg-bone-white text-void-canvas text-caption font-bold tracking-[0.2em] rounded-lg hover:bg-arterial-red hover:text-bone-white transition-all text-center"
                  >
                    EXFILTRATE SESSION
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
