/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function EmailSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Samuel: replace this with your Mailchimp/ConvertKit API call
    console.log('Email captured:', email);

    setStatus('success');
    setEmail('');
  };

  return (
    <section id="email" className="py-24 md:py-48 px-5 sm:px-8 bg-void-canvas scroll-mt-24 border-t border-iron/5">
      <div className="max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto flex flex-col items-center"
        >
          <span className="text-caption text-arterial-red font-bold tracking-[0.3em] mb-6">
            STAY INFORMED
          </span>
          <h2 className="text-heading-lg mb-6 leading-none lowercase">
            Get the Free Report.<br />Stay Ahead of the System.
          </h2>
          <p className="text-body text-ash/70 max-w-md mb-12 leading-relaxed">
            Download the Public Edition of the Africa Financial Predation Report 2026 — free. Plus updates when new tools, modules, and editions are released.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-charcoal-plate border border-iron/20 px-6 py-4 text-caption text-bone-white focus:outline-none focus:border-arterial-red transition-colors placeholder:text-pebble/40 rounded-lg flex-grow sm:max-w-md"
            />
            <button
              type="submit"
              className="bg-bone-white text-void-canvas px-8 py-4 rounded-lg text-caption font-bold tracking-[0.2em] hover:bg-arterial-red hover:text-bone-white transition-all uppercase cursor-pointer"
            >
              Get Free Report
            </button>
          </form>

          <p className="text-caption text-pebble/50 mt-6 min-h-[20px]">
            {status === 'success' ? (
              <span className="text-arterial-red font-bold">✓ Check your inbox — the report is on its way.</span>
            ) : (
              'No spam. Unsubscribe anytime.'
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
