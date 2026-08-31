/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const scrollTo = (selector: string) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-5 sm:px-8 overflow-hidden flex flex-col justify-center bg-void-canvas"
    >
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-[1400px] mx-auto w-full py-20"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex items-center gap-3 mb-5 md:mb-7"
        >
          <span className="w-8 h-px bg-arterial-red" />
          <span className="text-caption text-bone-white font-bold tracking-[0.2em] uppercase">
            Financial defense for Africa's quick-money generation
          </span>
        </motion.div>

        {/* Title — desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="hidden md:block"
        >
          <div className="flex items-baseline flex-wrap">
            <h1 className="text-display-xl">THE HOUSE</h1>
          </div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-display-xl mx-4 lowercase text-ash/60"
          >
            always
          </motion.span>
          <h1 className="text-display-xl -mt-4 lg:-mt-8">WINS</h1>
        </motion.div>

        {/* Title — mobile: viewport-scaled so it fills the screen width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="md:hidden"
          style={{ lineHeight: 0.88, letterSpacing: '-0.075em', fontWeight: 700 }}
        >
          <h1 className="text-[19vw] uppercase">THE HOUSE</h1>
          <div className="flex flex-col">
            <span className="text-[19vw] uppercase  text-ash/60 leading-none">always</span>
            <h1 className="text-[19vw] uppercase leading-none -mt-[2vw]">WINS</h1>
          </div>
        </motion.div>

        {/* Description + CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12"
        >
          <div className="max-w-xl">
            <p className="text-body text-ash max-w-md mb-6">
              Forex, betting, crypto, quick-money systems — engineered to extract, not create.
              <span className="text-bone-white"> Learn exactly how the house wins, so it stops winning against you.</span>
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-7">
              <button
                onClick={() => scrollTo('#tools')}
                className="flex items-center justify-center gap-3 px-7 py-4 bg-bone-white text-void-canvas rounded-lg text-caption font-bold tracking-[0.15em] uppercase hover:bg-arterial-red hover:text-bone-white transition-colors duration-200 cursor-pointer group"
              >
                Try the free tools
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <a
                href="https://nuriakenya.com/product/the-house-always-wins-forex-betting-and-the-quick-money-illusion-and-what-to-do-instead-by-boniface-koech/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg border border-iron/25 text-caption font-bold tracking-[0.15em] uppercase text-ash hover:text-bone-white hover:border-arterial-red transition-all duration-200 cursor-pointer group"
              >
                Get the book
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-iron" />
              <span className="text-caption text-bone-white font-bold tracking-widest uppercase">
                KOECH BONIFACE KIPRONO
              </span>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end gap-4 self-auto">
            <span className="text-caption text-pebble">SCROLL TO DISCOVER</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-px h-16 bg-iron"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
