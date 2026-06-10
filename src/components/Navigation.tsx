/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  interface MenuItem {
    name: string;
    desc: string;
    target: string;
    tool?: string;
  }

  const menuData: { label: string; title: string; items: MenuItem[] }[] = [
    {
      label: 'TOOLS',
      title: 'intelligence engine',
      items: [
        { name: 'Vulnerability diagnostic', desc: 'Map every exit point in your financial perimeter.', target: '#tools', tool: 'vulnerability' },
        { name: 'Investment Analyzer', desc: 'Audit any opportunity against Scarcity Architecture.', target: '#tools', tool: 'investment' },
        { name: 'Recovery Index', desc: 'Quantify your capacity for restoration.', target: '#tools', tool: 'recovery' }
      ]
    },
    {
      label: 'CONTENT',
      title: 'educational architecture',
      items: [
        { name: 'The Book', desc: 'The foundational argument against structural predation.', target: '#book' },
        { name: 'Masterclass', desc: 'Seven modules. No illusions. Frameworks for defense.', target: '#masterclass' },
        { name: 'Quarterly Report', desc: 'The state of financial predation in Africa.', target: '#report' }
      ]
    },
    {
      label: 'PLATFORM',
      title: 'systemic network',
      items: [
        { name: 'Riskily Intelligence', desc: 'Real-time data from the shadow markets.', target: 'https://riskily.io' },
        { name: 'Data Access', desc: 'Premium case data and structural indicators.', target: '#network' },
        { name: 'Expert Network', desc: 'Connect with strategic intelligence collectives.', target: '#network' }
      ]
    },
  ];

  const handleNavigate = (item: MenuItem) => {
    setActiveCategory(null);
    setMobileMenuOpen(false);
    if (item.target.startsWith('http')) {
      window.open(item.target, '_blank', 'noopener,noreferrer');
      return;
    }
    document.querySelector(item.target)?.scrollIntoView({ behavior: 'smooth' });
    if (item.tool) {
      // Open the specific diagnostic once the scroll is underway
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent('thaw:open-tool', { detail: item.tool }));
      }, 600);
    }
  };

  return (
    <nav 
      onMouseLeave={() => setActiveCategory(null)}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-5 sm:px-8 py-5 sm:py-6 ${
        isScrolled || activeCategory ? 'bg-void-canvas border-b border-ash/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1500px] mx-auto flex justify-between items-start">
        <div className="flex flex-col gap-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <h1 className="text-heading-sm font-bold tracking-tighter text-bone-white leading-none">THAW</h1>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-16">
          {menuData.map((group) => (
            <div
              key={group.label}
              onMouseEnter={() => setActiveCategory(group.label)}
              onClick={() => setActiveCategory(activeCategory === group.label ? null : group.label)}
              className="flex flex-col gap-3 group relative cursor-pointer pt-2"
            >
              <div className="flex items-center gap-2">
                <span className={`text-caption transition-colors ${activeCategory === group.label ? 'text-arterial-red' : 'text-ash group-hover:text-bone-white'}`}>
                  {group.label}
                </span>
                <div className={`w-1 h-1 rounded-full bg-arterial-red transition-opacity ${activeCategory === group.label ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              setActiveCategory(null);
              setMobileMenuOpen(false);
              document.querySelector('#book')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:flex px-6 py-3 border border-ash/30 rounded-lg text-caption text-bone-white hover:border-arterial-red group transition-all items-center gap-2"
          >
            Get a Copy <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu" className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-bone-white"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full left-0 w-full bg-void-canvas border-b border-ash/10 py-24 px-8 overflow-hidden"
          >
            <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-16">
              <div className="col-span-4">
                <span className="text-caption text-pebble tracking-[0.3em] uppercase block mb-8">Navigation / {activeCategory}</span>
                <h2 className="text-heading-lg text-bone-white leading-none lowercase">
                  {menuData.find(m => m.label === activeCategory)?.title}
                </h2>
                <div className="mt-12 w-24 h-px bg-arterial-red/50" />
              </div>

              <div className="col-span-8 grid grid-cols-2 gap-x-16 gap-y-12">
                {menuData.find(m => m.label === activeCategory)?.items.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.target}
                    onClick={(e) => { e.preventDefault(); handleNavigate(item); }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group block cursor-pointer"
                  >
                    <div className="flex items-center gap-4 mb-2">
                       <span className="text-caption text-iron font-bold group-hover:text-arterial-red transition-colors">0{i+1}</span>
                       <h3 className="text-subheading text-bone-white group-hover:text-arterial-red transition-colors lowercase">{item.name}</h3>
                    </div>
                    <p className="text-body text-ash opacity-60 group-hover:opacity-100 transition-opacity ml-10">
                      {item.desc}
                    </p>
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Background decorative shape */}
            <div className="absolute top-0 right-0 p-8 ornamental text-[200px] text-charcoal-plate/30 pointer-events-none leading-none -translate-y-1/2 translate-x-1/4">
              {activeCategory.charAt(0)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-dvh bg-void-canvas p-6 sm:p-8 flex flex-col pt-28 sm:pt-32"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu" className="absolute top-5 right-5 min-w-[44px] min-h-[44px] flex items-center justify-center text-bone-white text-caption"
            >
              CLOSE [X]
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 overflow-y-auto pb-16">
              {menuData.map((group) => (
                <div key={group.label} className="flex flex-col gap-6">
                  <span className="text-caption text-arterial-red font-bold tracking-widest">{group.label}</span>
                  <div className="flex flex-col gap-4">
                    {group.items.map((item) => (
                      <a
                        key={item.name}
                        href={item.target}
                        onClick={(e) => { e.preventDefault(); handleNavigate(item); }}
                        className="text-heading-sm text-bone-white hover:text-arterial-red transition-colors lowercase"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
