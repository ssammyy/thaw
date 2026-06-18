/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Download, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReportSection() {
  return (
    <section id="report" className="py-24 md:py-48 px-5 sm:px-8 bg-void-canvas scroll-mt-24">
       {/* Deliberately inverted feature panel: a light card on the dark page, and
           its mirror — a dark card on the light page — so it reads as a feature in
           both themes. The void-canvas/bone-white text tokens resolve correctly
           against each background, so only the panel surface needs flipping. */}
       <div className="max-w-[1400px] mx-auto bg-linen light:bg-[#141210] rounded-xl p-6 sm:p-12 lg:p-32 flex flex-col md:flex-row items-center gap-12 md:gap-24 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-charcoal-plate/5 -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
          
          <div className="w-full md:w-5/12 flex justify-center">
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="relative group cursor-pointer"
             >
                <div className="absolute inset-0 bg-arterial-red -translate-x-6 translate-y-6 rounded-lg opacity-10 group-hover:opacity-30 transition-opacity" />
                <div className="relative w-full max-w-sm bg-absolute-black rounded-lg border border-white/5 shadow-2xl overflow-hidden">
                   <img
                     src="/mockup.png"
                     alt="The House Always Wins — book mockup"
                     className="w-full h-auto brightness-90 group-hover:brightness-100 transition-all duration-700"
                   />
                   <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-5">
                      <span className="text-caption text-pebble">QUARTERLY REPORT</span>
                      <span className="text-caption text-pebble">Q2 2026 EDITION</span>
                   </div>
                </div>
             </motion.div>
          </div>

          <div className="flex-grow">
             <span className="text-caption text-iron font-bold tracking-[0.3em]">ANNUAL INTELLIGENCE</span>
             <h2 className="text-heading-lg text-void-canvas mt-6 mb-10 leading-[0.95] lowercase">STATE OF FINANCIAL<br/>PREDATION IN AFRICA</h2>
             <p className="text-body text-void-canvas/70 max-w-xl mb-12 leading-relaxed">
                The only comprehensive intelligence report documenting forex, betting, crypto, and MLM predation across six African countries. <span className="font-bold text-void-canvas underline decoration-arterial-red">USD 4.2B in annual extraction.</span>
             </p>
             <div className="flex flex-wrap gap-6">
                <button className="w-full sm:w-auto justify-center flex items-center gap-4 px-6 py-5 sm:px-10 sm:py-6 bg-void-canvas rounded-lg text-caption text-bone-white hover:bg-absolute-black light:hover:bg-arterial-red light:hover:text-linen transition-all shadow-lg group">
                    PUBLIC EDITION (FREE) <Download size={18} className="text-arterial-red group-hover:translate-y-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto justify-center flex items-center gap-4 px-6 py-5 sm:px-10 sm:py-6 border border-void-canvas/20 rounded-lg text-caption text-void-canvas hover:border-arterial-red transition-all font-bold group">
                    PREMIUM CASE DATA (KES 3,500) <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>
       </div>
    </section>
  );
}
