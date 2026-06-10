/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

function Word({ children, progress, range, highlightColor }: any) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(
    progress,
    [range[0], range[1]],
    ["#fcfcfc", highlightColor || "#fcfcfc"]
  );

  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.25em]">
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

  const text = "The Porsche in the forex ad was bought with recruitment commissions — not trading profits.";
  const words = text.split(" ");
  
  const highlightWords = ["porsche", "ad", "commissions", "profits"];
  
  return (
    <section ref={containerRef} className="h-[300vh] relative bg-charcoal-plate">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-5 sm:px-8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="text-display block mb-12 leading-[0.95] max-w-5xl mx-auto lowercase">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = (i + 1) / words.length;
              
              const cleanWord = word.toLowerCase().replace(/[.,—]/g, '');
              const isHighlight = highlightWords.includes(cleanWord);
              
              return (
                <Word 
                  key={i} 
                  progress={scrollYProgress} 
                  range={[start, end]}
                  highlightColor={isHighlight ? "#fe1e34" : undefined}
                >
                  {cleanWord === "recruitment" ? (
                    <span className="serif-italic lowercase opacity-60 px-2">{word}</span>
                  ) : word}
                </Word>
              );
            })}
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
