/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import JourneyConnector from './JourneyConnector';

export default function BookSection() {
  return (
    <section id="book" className="py-32 md:py-64 px-5 sm:px-8 bg-charcoal-plate/10 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col mb-16 md:mb-32">
          <div className="flex items-baseline flex-wrap">
            <div className="w-24 h-[1px] bg-iron/20" />
          </div>
          <div className="mt-12">
            <h2 className="text-display-xl leading-[0.85] lowercase">the</h2>
            <div className="flex items-baseline flex-wrap -mt-4">
              <span className="serif-italic text-heading text-ash/60 mr-6">insider's</span>
              <h2 className="text-display-xl leading-[0.85] lowercase">playbook.</h2>
            </div>
          </div>

          {/* How the book relates to the rest of the site */}
          <p className="text-body text-ash/80 max-w-2xl mt-12 leading-relaxed">
            The book is where it begins — the full insider dissection of how forex, betting, crypto and MLM systems are engineered to <span className="text-bone-white font-bold">extract, not create</span>. The free tools let you test that thinking against your own situation, and the masterclass turns it into a practical, step-by-step defense.
          </p>

          {/* Where it fits — Book → Tools → Masterclass */}
          <JourneyConnector active="book" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
          className="relative group overflow-hidden rounded-lg"
        >
          <img
            src="/mockup.png"
            alt="The House Always Wins — book cover mockup"
            className="w-full h-auto brightness-90 group-hover:brightness-100 transition-all duration-700"
          />
          <div className="absolute inset-0   pointer-events-none" />

        </motion.div>

        <div className="flex flex-col gap-8">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-caption text-arterial-red font-bold"
          >
            THE DEFINITIVE DISSECTION
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-heading-lg leading-none"
          >
            THE HOUSE<br/>ALWAYS WINS
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-body text-ash leading-relaxed max-w-md"
          >
            Written by a decade-long insider in East African financial markets. A structural dissection of every quick-money system operating across Africa.
            And exactly what to do instead.
          </motion.p>
          
          <div className="grid gap-6 mt-4">
            {[
              'FX Broker Profitability Mechanics',
              'The Betting House Margin Guarantee',
              'Crypto Pump-and-Dump Coordination',
              'Pre-Entry Audit Framework'
            ].map((feature, i) => (
              <motion.div 
                key={feature} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                className="flex items-center gap-4"
              >
                <div className="w-2 h-2 bg-arterial-red rounded-full" />
                <span className="text-caption text-bone-white">{feature}</span>
              </motion.div>
            ))}
          </div>

          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-8 flex items-center gap-4 group text-bone-white"
          >
            <span className="text-caption font-bold border-b border-bone-white pb-1 group-hover:border-arterial-red transition-all uppercase">SECURE YOUR COPY </span>
            <ArrowUpRight size={20} className="group-hover:text-arterial-red group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </motion.button>
        </div>
        </div>
      </div>
    </section>
  );
}
