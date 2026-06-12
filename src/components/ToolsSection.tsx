/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ShieldAlert, TrendingUp, RotateCcw, ArrowUpRight } from 'lucide-react';
import { ToolType } from '../types';
import { openTool } from '../useToolRoute';

function ScrollRevealWords({ text, progress, range }: { text: string, progress: any, range: [number, number] }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        const start = range[0] + (i / words.length) * (range[1] - range[0]);
        const end = range[0] + ((i + 0.5) / words.length) * (range[1] - range[0]);
        const opacity = useTransform(progress, [start, end], [0.1, 1]);
        const y = useTransform(progress, [start, end], [10, 0]);

        return (
          <motion.span
            key={i}
            style={{ opacity, y }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        );
      })}
    </>
  );
}

export default function ToolsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: revealProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "center start"]
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
    <section id="tools" ref={containerRef} className="py-32 md:py-64 px-5 sm:px-8 bg-void-canvas relative overflow-hidden scroll-mt-24">
      {/* Background decoration */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute top-0 right-0 p-32 text-charcoal-plate/10 pointer-events-none ornamental text-[600px] leading-none uppercase select-none"
      >
        Z
      </motion.div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 md:gap-16 mb-24 md:mb-48">
          <div className="max-w-3xl">
             <div className="flex items-center gap-4 mb-6">
               <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 1 }}
                className="h-[1px] bg-arterial-red"
               />
               <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-caption text-arterial-red font-bold tracking-[0.3em] uppercase"
               >
                 active diagnostics
               </motion.span>
             </div>
             <h2 className="text-display-xl leading-[0.85] lowercase">
                <ScrollRevealWords text="the intelligence" progress={revealProgress} range={[0, 0.4]} />
             </h2>
             <div className="flex items-baseline flex-wrap -mt-4 lg:-mt-8">
               <span className="serif-italic text-heading text-ash/40 mr-6">
                  <ScrollRevealWords text="interactive" progress={revealProgress} range={[0.4, 0.6]} />
               </span>
               <h2 className="text-display-xl leading-[0.85] lowercase">
                  <ScrollRevealWords text="engine" progress={revealProgress} range={[0.6, 0.8]} />
               </h2>
             </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-subheading text-pebble/60 max-w-sm mb-6 leading-tight lowercase"
          >
            Frameworks to audit your reality and model your defensive posture.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-12">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              className="p-8 md:p-14 border border-iron/10 rounded-lg bg-charcoal-plate/10 backdrop-blur-sm group hover:border-arterial-red/30 hover:bg-charcoal-plate/20 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[400px] md:min-h-[500px]"
              onClick={() => openTool(tool.id)}
            >
              <div>
                <div className="mb-14 flex justify-between items-start">
                  <motion.div variants={itemVariants} className="w-14 h-14 flex items-center justify-center border border-iron/20 rounded-lg text-ash group-hover:text-arterial-red group-hover:border-arterial-red transition-all">
                    {tool.icon}
                  </motion.div>
                  <motion.span variants={itemVariants} className="text-caption text-ash/40 tracking-widest font-medium">0{i + 1}</motion.span>
                </div>
                <motion.span variants={itemVariants} className="text-caption text-pebble block mb-3 tracking-[0.2em] uppercase font-bold">{tool.subtitle}</motion.span>
                <motion.h3 variants={itemVariants} className="text-heading text-bone-white mb-8 group-hover:text-bone-white transition-colors lowercase leading-tight">{tool.title}</motion.h3>
                <motion.p variants={itemVariants} className="text-body text-ash leading-relaxed max-w-[28ch]">
                  {tool.description}
                </motion.p>
              </div>

              <motion.div variants={itemVariants} className="mt-16 pt-10 border-t border-iron/10 flex items-center justify-between group/action">
                <span className="text-caption font-bold tracking-[0.3em] uppercase text-ash group-hover:text-bone-white transition-colors">Initialize</span>
                <div className="w-10 h-10 flex items-center justify-center rounded-full border border-iron/20 group-hover:bg-arterial-red group-hover:border-arterial-red transition-all">
                  <ArrowUpRight size={18} className="text-ash group-hover:text-bone-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
