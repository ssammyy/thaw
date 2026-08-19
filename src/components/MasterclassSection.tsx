/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import JourneyConnector from './JourneyConnector';

// TODO: replace with the live Selar enrollment link for the masterclass.
const ENROLL_URL = 'https://selar.co/';

export default function MasterclassSection() {
  return (
    <section id="masterclass" className="py-32 md:py-64 px-5 sm:px-8 bg-void-canvas overflow-hidden scroll-mt-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col mb-16 md:mb-32">
          <div className="flex items-baseline flex-wrap">
             <div className="w-24 h-[1px] bg-iron/20" />
          </div>
          <div className="mt-12">
            <h2 className="text-display-xl leading-[0.85] lowercase">
                      the
            </h2>
            <div className="flex items-baseline flex-wrap -mt-4">
              <span className="serif-italic text-heading text-ash/60 mr-6">seven modules</span>
              <h2 className="text-display-xl leading-[0.85] lowercase">masterclass.</h2>
            </div>
          </div>
          <p className="text-body text-ash/80 max-w-xl mt-16 leading-relaxed">
            The book establishes the argument. The masterclass gives you the <span className="text-bone-white font-bold italic">frameworks, tools, and assignments</span> to apply it to your own structural financial decisions.
          </p>

          {/* Where it fits — Book → Tools → Masterclass */}
          <JourneyConnector active="masterclass" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             whileHover={{ y: -8 }}
             transition={{ type: 'spring', stiffness: 300, damping: 25 }}
             className="p-6 sm:p-12 border border-ash/10 rounded-lg bg-charcoal-plate/30 glass-edge transition-[border-color,box-shadow] duration-300 ease-out hover:shadow-[0_24px_60px_-12px_rgba(230,59,78,0.4)]"
           >
              <h3 className="text-caption text-pebble mb-12 tracking-widest uppercase">Curriculum Architecture</h3>
              <ul className="grid gap-10">
                {[
                  { id: '01', title: 'Architecture of Financial Predation', desc: 'How these systems are structuraly engineered to win.' },
                  { id: '02', title: 'Psychology of Manipulation', desc: 'How your internal reward systems are weaponized.' },
                  { id: '03', title: 'Forex, Betting, Crypto & MLM', desc: 'Deep-dive mechanical breakdowns of every system.' },
                  { id: '04', title: 'Affiliate and Influencer Economy', desc: 'The shadow PR machines driving the extraction.' },
                  { id: '05', title: 'Financial Decision Intelligence', desc: 'Frameworks to filter every opportunity you see.' },
                  { id: '06', title: 'Digital Era Risk Defense', desc: 'The 2027 threat landscape and how to stay ahead.' },
                  { id: '07', title: 'Anti-Fragile Financial Habits', desc: 'Redirecting ambition into methods that actually work.' },
                ].map((module, i) => (
                  <motion.li 
                    key={module.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex gap-4 sm:gap-8 group"
                  >
                    <span className="ornamental text-subheading text-arterial-red block w-12 sm:w-14 flex-shrink-0">0{i+1}</span>
                    <div className="border-b border-iron/10 pb-6 flex-grow">
                       <h4 className="text-subheading text-bone-white leading-tight group-hover:text-arterial-red transition-colors lowercase">{module.title}</h4>
                       <p className="text-caption text-pebble mt-2 font-medium">{module.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
             whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 25 } }}
             className="p-6 sm:p-12 border border-arterial-red/70 rounded-lg bg-charcoal-plate/40 glass-edge relative flex flex-col justify-between shadow-[0_0_60px_rgba(230,59,78,0.07)] transition-[box-shadow] duration-300 ease-out hover:shadow-[0_24px_60px_-12px_rgba(230,59,78,0.4)]"
           >
              <div className="absolute top-0 right-12 -translate-y-1/2 bg-arterial-red px-6 py-2 rounded-full text-[10px] font-bold text-bone-white tracking-widest">
                FOUNDING MEMBER OFFER
              </div>
              <div>
                <span className="text-caption text-pebble tracking-widest">ENROLLMENT ACCESS</span>
                <h3 className="text-heading mt-6 mb-12 leading-none lowercase">Individual License</h3>
                
                <div className="p-6 sm:p-10 rounded-lg mb-12 border border-iron/10 bg-charcoal-plate/30">
                   <div className="flex justify-between items-start mb-6">
                      <span className="text-caption text-arterial-red font-bold tracking-widest">LIMITED CAPACITY</span>
                      <span className="text-caption text-pebble">KES CURRENCY</span>
                   </div>
                   <div className="flex items-baseline gap-6">
                      <span className="text-display-xl text-bone-white leading-none">1,500</span>
                      <span className="text-subheading text-pebble line-through opacity-40">3,000</span>
                   </div>
                   <p className="serif-italic text-body text-ash mt-6 lowercase">First 50 students only — lifetime platform access</p>
                </div>

                <ul className="grid gap-6 mb-16">
                  {['7 High-Fidelity Video Modules', 'Student Workbook Per Module', 'Pre-Entry Audit Reference Card', 'Red Flag Checklist', 'Lifetime Platform Access'].map(i => (
                    <li key={i} className="flex items-center gap-4 text-body text-ash uppercase font-medium">
                      <div className="w-1.5 h-1.5 bg-arterial-red rounded-full" /> {i}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={ENROLL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-between items-center p-6 sm:p-8 bg-bone-white text-void-canvas rounded-lg text-caption font-bold tracking-[0.2em] hover:bg-arterial-red hover:text-bone-white transition-colors duration-200 shadow-2xl cursor-pointer group"
              >
                ENROLL ON SELAR <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
