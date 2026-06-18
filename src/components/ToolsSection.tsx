/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ShieldAlert, TrendingUp, RotateCcw, ArrowUpRight } from 'lucide-react';
import { ToolType } from '../types';
import { openTool } from '../useToolRoute';
import JourneyConnector from './JourneyConnector';

export default function ToolsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });


  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const tools = [
    {
      id: 'vulnerability' as ToolType,
      title: 'vulnerability diagnostic',
      subtitle: '20 point scan',
      icon: <ShieldAlert size={24} strokeWidth={1.5} />,
      description: 'Dismantle your illusion of security. Map every exit point in your financial perimeter.'
    },
    {
      id: 'investment' as ToolType,
      title: 'investment analyzer',
      subtitle: 'legitimacy verdict',
      icon: <TrendingUp size={24} strokeWidth={1.5} />,
      description: 'Audit any opportunity against the Scarcity Architecture protocols. Legitimate or Anomaly.'
    },
    {
      id: 'recovery' as ToolType,
      title: 'recovery index',
      subtitle: 'paths to rebirth',
      icon: <RotateCcw size={24} strokeWidth={1.5} />,
      description: 'Quantify your capacity for restoration. Model the trajectory of your return.'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
        staggerChildren: 0.1,
        delayChildren: i * 0.2 + 0.3
      }
    })
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section ref={containerRef} className="py-32 md:py-64 px-5 sm:px-8 bg-void-canvas relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute top-0 right-0 p-32 text-charcoal-plate/10 pointer-events-none ornamental text-[600px] leading-none uppercase select-none"
      >
        Z
      </motion.div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col mb-16 md:mb-32">
          <div className="flex items-baseline flex-wrap">
            <div className="w-24 h-[1px] bg-iron/20" />
          </div>
          <div className="mt-12">
            <h2 className="text-display-xl leading-[0.85] lowercase">the</h2>
            <div className="flex items-baseline flex-wrap -mt-4">
              <span className="serif-italic text-heading text-ash/60 mr-6">3 module</span>
              <h2 className="text-display-xl leading-[0.85] lowercase">self-test.</h2>
            </div>
          </div>
        </div>

        {/* How the tools relate to the book and the masterclass */}
        <p className="text-body text-ash/80 max-w-2xl leading-relaxed">
          The tools turn the book's frameworks into something you can act on. Run any one to see where you actually stand — then take the <span className="text-bone-white font-bold">masterclass</span> to close the gaps it exposes.
        </p>
        <JourneyConnector active="tools" />

        <div id="tools" className="mt-24 md:mt-32 grid md:grid-cols-3 gap-6 md:gap-12 scroll-mt-32">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`relative overflow-hidden p-8 md:p-12 rounded-xl bg-gradient-to-b from-charcoal-plate/80 to-charcoal-plate/20 backdrop-blur-sm group cursor-pointer flex flex-col justify-between min-h-[400px] md:min-h-[500px] transition-[border-color,box-shadow] duration-300 ease-out hover:shadow-[0_24px_60px_-12px_rgba(230,59,78,0.4)] ${
                i === 0
                  ? 'border border-arterial-red/40 shadow-[0_12px_40px_-12px_rgba(230,59,78,0.3)]'
                  : 'border border-iron/25 shadow-[0_10px_34px_rgba(0,0,0,0.45)]'
              }`}
              onClick={() => openTool(tool.id)}
            >
              {/* Ambient hover glow */}
              <span className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full bg-arterial-red/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="mb-12 flex justify-between items-start">
                  <motion.div variants={itemVariants} className="w-14 h-14 flex items-center justify-center rounded-xl border border-arterial-red/25 bg-arterial-red/10 text-arterial-red group-hover:bg-arterial-red group-hover:text-bone-white group-hover:border-arterial-red group-hover:scale-105 transition-all duration-300">
                    {tool.icon}
                  </motion.div>

                </div>
                <motion.span variants={itemVariants} className="text-caption text-pebble block mb-3 tracking-[0.2em] uppercase font-bold">{tool.subtitle}</motion.span>
                <motion.h3 variants={itemVariants} className="text-heading text-bone-white mb-8 transition-colors lowercase leading-tight">{tool.title}</motion.h3>
                <motion.p variants={itemVariants} className="text-body text-ash leading-relaxed max-w-[28ch]">
                  {tool.description}
                </motion.p>
              </div>

              {/* Rest-state click affordance — visible without hover for touch users */}
              <motion.div variants={itemVariants} className="relative mt-16 pt-8 border-t border-iron/15 flex items-center justify-between">
                <span className="text-caption font-bold tracking-[0.25em] uppercase text-bone-white">Run free tool</span>
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-bone-white text-void-canvas group-hover:bg-arterial-red group-hover:text-bone-white transition-colors duration-300">
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
