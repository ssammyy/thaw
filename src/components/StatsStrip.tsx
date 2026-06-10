/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function StatsStrip() {
  const stats = [
    { label: 'ANNUAL EXTRACTION', value: '$4.2B' },
    { label: 'CONSISTENT LOSERS', value: '78%' },
    { label: 'PAID RECRUITERS', value: '450K+' },
    { label: 'UNREGULATED', value: '61%' },
  ];

  return (
    <div className="border-y border-ash/10 py-16 md:py-24 px-5 sm:px-8 overflow-hidden bg-void-canvas">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 gap-10 md:flex md:flex-wrap md:justify-between md:gap-16">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <span className="text-caption text-pebble tracking-widest">{stat.label}</span>
            <div className="flex items-baseline gap-2">
               <div className="w-1.5 h-1.5 bg-arterial-red rounded-full mr-2" />
               <span className="text-display text-bone-white">{stat.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
