/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function TransitionMoment() {
  return (
    <section className="py-24 md:py-48 px-5 sm:px-8 bg-void-canvas overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="max-w-[1400px] mx-auto flex justify-center items-baseline"
      >
        <h2 className="text-display tracking-[-0.08em]">WE</h2>
        <motion.span 
          initial={{ rotate: -10, scale: 0.8 }}
          whileInView={{ rotate: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="ornamental text-display-xl text-arterial-red mx-4 md:mx-8 leading-none"
        >
          a
        </motion.span>
        <h2 className="text-display tracking-[-0.08em]">RE</h2>
      </motion.div>
      <div className="flex justify-center mt-12">
         <span className="serif-italic text-heading text-ash/40 lowercase">unfiltered financial intelligence</span>
      </div>
    </section>
  );
}
