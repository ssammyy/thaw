/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Footer from './Footer';

interface AboutPageProps {
  onExit: () => void;
}

// Drawn from the book's own author note — kept factual to the existing copy
// rather than invented. Edit freely as Koech's bio firms up.
const FACTS = [
  { value: '10+', label: 'years inside East African finance' },
  { value: '04', label: 'systems dissected — forex · betting · crypto · MLM' },
  { value: '07', label: 'masterclass modules built from the playbook' },
];

const ROLES = ['Banker', 'Businessman', 'Author', 'Life Coach'];

export default function AboutPage({ onExit }: AboutPageProps) {
  const scrollToHomeAnchor = (anchor: string) => {
    // Leave the route first; the landing page mounts on the next render, so
    // defer the scroll a frame to give its DOM time to exist.
    onExit();
    requestAnimationFrame(() => {
      document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <main className="bg-void-canvas min-h-screen selection:bg-arterial-red selection:text-bone-white flex flex-col">
      {/* Page header — brand + the way back, matching the diagnostic pages */}
      <header className="sticky top-0 z-40 bg-void-canvas/90 backdrop-blur-md border-b border-ash/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-5 flex justify-between items-center gap-4">
          <button
            onClick={onExit}
            aria-label="Back to THAW home"
            className="flex flex-col cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-arterial-red rounded-sm"
          >
            <h1 className="text-heading-sm font-bold tracking-tighter text-bone-white leading-none">THAW</h1>
          </button>

          <button
            onClick={onExit}
            aria-label="Back to site"
            className="flex items-center gap-3 min-h-[44px] shrink-0 px-4 rounded-lg border border-ash/20 text-pebble hover:text-bone-white hover:border-arterial-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-arterial-red transition-all"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            <span className="text-caption uppercase">Back to site</span>
          </button>
        </div>
      </header>

      {/* Content sits above the sticky reveal footer, matching the landing page layering */}
      <div className="flex-grow w-full relative z-10 bg-void-canvas">
        {/* ── Intro ───────────────────────────────────────────────────────── */}
        <section className="px-5 sm:px-8 pt-20 md:pt-32 pb-24 md:pb-40">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <span className="w-8 h-px bg-arterial-red" />
              <span className="text-caption text-arterial-red font-bold tracking-[0.3em] uppercase">The Author</span>
            </div>

            <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-24 items-end">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <h2 className="text-display-xl leading-[0.85] lowercase">koech</h2>
                  <div className="flex items-baseline flex-wrap -mt-2 md:-mt-4">
                    <span className="serif-italic text-heading text-ash/60 mr-6">boniface</span>
                    <h2 className="text-display-xl leading-[0.85] lowercase">kiprono.</h2>
                  </div>
                </motion.div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {ROLES.map((role) => (
                    <span
                      key={role}
                      className="text-caption text-bone-white tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-iron/25 bg-charcoal-plate/30"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Portrait — styled monogram placeholder until a real photo is supplied.
                  TODO: swap for Koech's photo (e.g. /koech.jpg). */}
              <div className="relative w-44 h-44 md:w-60 md:h-60 shrink-0 rounded-2xl overflow-hidden border border-iron/25 bg-gradient-to-br from-charcoal-plate to-void-canvas flex items-center justify-center">
                <span className="ornamental text-[88px] md:text-[120px] leading-none text-arterial-red/80 select-none">K</span>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-void-canvas/70 backdrop-blur-sm">
                  <span className="text-[10px] text-pebble tracking-[0.3em] uppercase">Nairobi · Kenya</span>
                </div>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-subheading text-ash max-w-3xl mt-16 leading-relaxed"
            >
              A decade-long insider in East African financial markets — and the author of{' '}
              <span className="text-bone-white font-bold">The House Always Wins</span>, the structural dissection of
              how forex, betting, crypto and MLM systems are engineered to <span className="serif-italic">extract, not create</span>.
            </motion.p>
          </div>
        </section>

        {/* ── Pull quote ──────────────────────────────────────────────────── */}
        <section className="px-5 sm:px-8 py-20 md:py-32 bg-charcoal-plate/20 border-y border-iron/10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="ornamental text-arterial-red text-[80px] leading-none block mb-4">“</span>
            <p className="text-heading-lg lowercase leading-[1.1]">
              This is not a motivational book. It is a <span className="serif-italic text-arterial-red">wake-up call.</span>
            </p>
          </div>
        </section>

        {/* ── Bio ─────────────────────────────────────────────────────────── */}
        <section className="px-5 sm:px-8 py-24 md:py-40">
          <div className="max-w-[1400px] mx-auto grid md:grid-cols-[260px_1fr] gap-12 md:gap-24">
            <div className="md:sticky md:top-28 self-start">
              <span className="text-caption text-pebble tracking-[0.3em] uppercase">The Story</span>
              <div className="w-16 h-px bg-arterial-red mt-6" />
            </div>

            <div className="max-w-2xl flex flex-col gap-8 text-body text-ash leading-relaxed">
              <p>
                Koech Boniface Kiprono is a banker, businessman, author and life coach who is passionate about helping
                people achieve real results in business and personal growth. With experience across both{' '}
                <span className="text-bone-white font-bold">banking and manufacturing</span>, he brings a practical,
                real-world perspective that connects finance, strategy and execution.
              </p>
              <p>
                That insider vantage point is what makes <span className="text-bone-white font-bold">The House Always Wins</span>{' '}
                different. Rather than another motivational title, it is a sharp, honest and deeply practical breakdown
                of every quick-money system operating across Africa — and exactly what to do instead.
              </p>
              <p>
                His writing is direct and thought-provoking, pushing readers to drop the excuses, think clearly and
                build the discipline needed to grow and succeed. It challenges you to stop chasing the illusion and
                start building <span className="serif-italic text-bone-white">real, lasting financial value.</span>
              </p>
              <p>
                Today that work extends beyond the page — into the <span className="text-bone-white font-bold">masterclass</span>,
                the free diagnostic tools, and Riskily, the intelligence platform documenting how predation operates in
                emerging markets. The mission is singular:{' '}
                <span className="serif-italic text-arterial-red">the financial integrity of emerging markets.</span>
              </p>
            </div>
          </div>
        </section>

        {/* ── By the numbers ──────────────────────────────────────────────── */}
        <section className="px-5 sm:px-8 pb-24 md:pb-40">
          <div className="max-w-[1400px] mx-auto grid sm:grid-cols-3 gap-px bg-iron/15 border border-iron/15 rounded-xl overflow-hidden">
            {FACTS.map((fact) => (
              <div key={fact.label} className="bg-void-canvas p-8 md:p-12">
                <span className="ornamental text-display text-arterial-red leading-none block">{fact.value}</span>
                <p className="text-caption text-pebble mt-4 leading-relaxed normal-case tracking-normal">{fact.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="px-5 sm:px-8 pb-24 md:pb-40">
          <div className="max-w-[1400px] mx-auto rounded-xl border border-arterial-red/30 bg-charcoal-plate/30 glass-edge p-8 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div>
              <h3 className="text-heading lowercase leading-tight">go deeper into the work.</h3>
              <p className="text-body text-ash mt-4 max-w-md leading-relaxed">
                Read the book's argument, test your own exposure with the free tools, or take the full step-by-step defense.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <button
                onClick={() => scrollToHomeAnchor('#tools')}
                className="flex items-center justify-center gap-3 px-7 py-4 rounded-lg border border-ash/20 text-bone-white text-caption font-bold tracking-[0.15em] uppercase hover:border-arterial-red transition-colors"
              >
                Free tools <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => scrollToHomeAnchor('#masterclass')}
                className="flex items-center justify-center gap-3 px-7 py-4 rounded-lg bg-bone-white text-void-canvas text-caption font-bold tracking-[0.15em] uppercase hover:bg-arterial-red hover:text-bone-white transition-colors"
              >
                Enroll in the masterclass <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
