/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState, Fragment } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';

function Word({ children, progress, range, highlightColor }: any) {
  // Starts white, shifts to red as the scroll passes this word's range, and
  // stays red afterwards (useTransform clamps at the range edges).
  const color = useTransform(
    progress,
    [range[0], range[1]],
    ["#fcfcfc", highlightColor || "#fcfcfc"]
  );

  // `layout` lets the word slide into place when the others are removed from flow.
  return (
    <motion.span layout style={{ color }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}

export default function QuoteSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const text = "The Porsche in the forex ad was bought with recruitment commission — not trading profits.";
  const words = text.split(" ");

  const highlightWords = ["porsche", "ad", "commission", "profits"];

  // Phase 2: once every red word is red, fade out the rest.
  // Phase 3: pull the surviving red words to the right.
  const [fadeOthers, setFadeOthers] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setFadeOthers(v > 0.55);
    setAlignRight(v > 0.78);
  });

  return (
    <section ref={containerRef} className="h-[180vh] relative bg-charcoal-plate">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-5 sm:px-8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className={`text-display mb-12 leading-[0.95] max-w-5xl mx-auto lowercase flex flex-wrap relative transition-[justify-content] ${alignRight ? 'justify-end' : 'justify-center'}`}>
            {(() => {
              // Only the red highlight words react to scroll; everything else is
              // static so the section reads instantly and doesn't drag out the scroll.
              const highlightTotal = words.filter(w =>
                highlightWords.includes(w.toLowerCase().replace(/[.,—]/g, ''))
              ).length;
              let highlightIndex = 0;

              return words.map((word, i) => {
                const cleanWord = word.toLowerCase().replace(/[.,—]/g, '');
                const isHighlight = highlightWords.includes(cleanWord);

                if (!isHighlight) {
                  // Fade out (phase 2), then drop out of flow (phase 3) so the
                  // red words can collapse together and align right.
                  return (
                    <motion.span
                      key={i}
                      animate={{ opacity: fadeOthers ? 0 : 1 }}
                      transition={{ duration: 0.4 }}
                      className={`mr-[0.25em] text-bone-white ${alignRight ? 'absolute opacity-0 pointer-events-none' : 'inline-block'}`}
                    >
                      {cleanWord === "recruitment" ? (
                        <span className="serif-italic lowercase opacity-60 px-2">{word}</span>
                      ) : word}
                    </motion.span>
                  );
                }

                // Redden all highlight words within the first ~half of the scroll,
                // leaving room for the fade + align phases afterwards.
                const order = highlightIndex++;
                const start = (order / highlightTotal) * 0.45;
                const end = ((order + 1) / highlightTotal) * 0.45;

                // Once collapsed right, the red words read as an equation:
                // porsche = ad + commissions profits
                const operator = cleanWord === "porsche" ? "=" : cleanWord === "ad" ? "+" : null;

                return (
                  <Fragment key={i}>
                    <Word
                      progress={scrollYProgress}
                      range={[start, end]}
                      highlightColor="#e63b4e"
                    >
                      {word}
                    </Word>
                    {operator && (
                      <motion.span
                        aria-hidden
                        animate={{ opacity: alignRight ? 1 : 0 }}
                        transition={{ duration: 0.4, delay: alignRight ? 0.25 : 0 }}
                        className={`mr-[0.25em] text-arterial-red ${alignRight ? 'inline-block' : 'absolute opacity-0 pointer-events-none'}`}
                      >
                        {operator}
                      </motion.span>
                    )}
                  </Fragment>
                );
              });
            })()}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center justify-center gap-6"
          >
            <div className="w-16 h-px bg-iron/30" />
            <span className="text-caption text-pebble tracking-[0.5em] uppercase">The House Always Wins</span>
            <div className="w-16 h-px bg-iron/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
