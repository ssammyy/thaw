/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

/**
 * Persistent primary call-to-action for mobile. Keeps "enroll in the masterclass"
 * one tap away once the visitor scrolls past the hero, so the site's aim is never
 * ambiguous on a phone. Hidden on lg+ where the nav CTA stays in view.
 */
export default function MobileEnrollBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolledPastHero = window.scrollY > window.innerHeight * 0.85;
      const nearBottom =
        window.innerHeight + window.scrollY >
        document.body.scrollHeight - window.innerHeight * 0.6;
      setVisible(scrolledPastHero && !nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="lg:hidden fixed bottom-4 left-4 right-4 z-[90]"
        >
          <button
            onClick={() => document.querySelector('#masterclass')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full flex items-center justify-between gap-3 px-6 py-4 bg-bone-white text-void-canvas rounded-xl shadow-2xl cursor-pointer group"
          >
            <span className="flex flex-col items-start leading-tight">
              <span className="text-caption font-bold tracking-[0.15em] uppercase">Enroll in the Masterclass</span>
              <span className="text-[10px] tracking-widest uppercase text-iron">From KES 1,500 · First 50 students</span>
            </span>
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
