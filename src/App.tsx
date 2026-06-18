/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import QuoteSection from './components/QuoteSection';
import BookSection from './components/BookSection';
import MasterclassSection from './components/MasterclassSection';
import ReportSection from './components/ReportSection';
import ToolsSection from './components/ToolsSection';
import TransitionMoment from './components/TransitionMoment';
import Footer from './components/Footer';
import MobileEnrollBar from './components/MobileEnrollBar';
import DiagnosticPage from './components/DiagnosticPage';
import { motion, useScroll, useSpring } from 'motion/react';
import { useToolRoute, closeTool } from './useToolRoute';
import { TOOLS_DATA } from './data/diagnosticData';

export default function App() {
  const activeTool = useToolRoute();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // A tool route renders as its own full page rather than a modal over the landing.
  if (activeTool) {
    return <DiagnosticPage tool={TOOLS_DATA[activeTool]} onExit={closeTool} />;
  }

  return (
    <main className="bg-void-canvas min-h-screen selection:bg-arterial-red selection:text-bone-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-arterial-red origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navigation />
      
      <div className="">
        <Hero />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <StatsStrip />
        </motion.div>


        <QuoteSection />

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <BookSection />
        </motion.div>

        <ToolsSection />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <MasterclassSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <ReportSection />
        </motion.div>

        <Footer />
      </div>

      <MobileEnrollBar />
    </main>
  );
}

