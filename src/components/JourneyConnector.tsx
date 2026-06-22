/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

type StepId = 'book' | 'tools' | 'masterclass';

const STEPS: {
  id: StepId;
  num: string;
  label: string;
  name: string;
  journeyTitle: string;
  desc: string;
  target: string;
  action: string;
}[] = [
  { id: 'tools', num: '01', label: 'FREE TOOLS', name: 'the intelligence engine', journeyTitle: 'the test', desc: 'Measure your own exposure in 60 seconds — free.', target: '#tools', action: 'Explore' },
  { id: 'book', num: '02', label: 'THE BOOK', name: 'the house always wins', journeyTitle: 'the diagnosis', desc: 'How the house is built to win — and what to do instead.', target: '#book', action: 'Read' },
  { id: 'masterclass', num: '03', label: 'THE MASTERCLASS', name: 'the masterclass', journeyTitle: 'the defense', desc: 'Turn the argument into a step-by-step playbook.', target: '#masterclass', action: 'Enroll' },
];

/**
 * Shows where the current section sits in the Book → Tools → Masterclass journey.
 * The active step is shown plainly (red label, real name); the other two link out.
 */
export default function JourneyConnector({ active }: { active: StepId }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement | HTMLButtonElement | null>(null);

  const scrollTo = (target: string) =>
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });

  // On the mobile carousel, bring this section's active card into view so each
  // section opens on its own step rather than always on step 01. (No-op on the
  // sm+ grid layout, which has no horizontal overflow.)
  useEffect(() => {
    const scroller = scrollerRef.current;
    const card = activeRef.current;
    if (!scroller || !card) return;
    if (window.matchMedia('(min-width: 640px)').matches) return;
    scroller.scrollLeft = Math.max(0, card.offsetLeft - 20);
  }, [active]);

  return (
    <div
      ref={scrollerRef}
      className="relative mt-14 flex snap-x snap-mandatory overflow-x-auto no-scrollbar gap-4 -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible max-w-4xl"
    >
      {STEPS.map((step) => {
        if (step.id === active) {
          return (
            <div key={step.id} ref={activeRef} className="snap-start shrink-0 w-[82%] sm:w-auto p-6 rounded-lg">
              <span className="text-caption text-arterial-red font-bold tracking-widest">{step.num} · {step.label}</span>
              <h4 className="text-subheading text-bone-white lowercase mt-4">{step.name}</h4>
              <p className="text-caption text-pebble mt-3 normal-case tracking-normal leading-relaxed">{step.desc}</p>
            </div>
          );
        }

        return (
          <button
            key={step.id}
            onClick={() => scrollTo(step.target)}
            className="snap-start shrink-0 w-[82%] sm:w-auto text-left p-6 rounded-lg border border-iron/25 bg-charcoal-plate/20 shadow-[0_10px_34px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_24px_60px_-12px_rgba(230,59,78,0.4)] cursor-pointer group"
          >
            <span className="text-caption text-pebble font-bold tracking-widest group-hover:text-arterial-red transition-colors">{step.num} · {step.label}</span>
            <h4 className="text-subheading text-bone-white lowercase mt-4">{step.journeyTitle}</h4>
            <p className="text-caption text-pebble mt-3 normal-case tracking-normal leading-relaxed">{step.desc}</p>
            <span className="inline-flex items-center gap-2 text-caption font-bold uppercase text-ash group-hover:text-bone-white mt-4 transition-colors">
              {step.action} <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        );
      })}
    </div>
  );
}
