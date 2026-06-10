/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Instagram, Twitter, Linkedin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="network" className="bg-charcoal-plate pt-24 md:pt-48 pb-16 px-5 sm:px-8 border-t border-iron/10 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-12 md:gap-16 mb-24 md:mb-48 items-start">
          <div className="sm:col-span-2 md:col-span-2">
             <h2 className="text-display-xl text-bone-white mb-10 leading-none lowercase">thaw</h2>
             <p className="text-subheading text-ash max-w-sm mb-12 lowercase leading-tight opacity-60">
                Koech Boniface Kiprono <span className="serif-italic">for the</span> financial integrity of emerging markets.
             </p>
             <div className="flex gap-4">
                {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 flex items-center justify-center border border-iron/20 rounded-lg text-ash hover:text-bone-white hover:border-arterial-red transition-all">
                    <Icon size={18} strokeWidth={1.5} />
                  </a>
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-10">
             <span className="text-caption text-bone-white font-bold tracking-[0.3em] uppercase opacity-40">Resources</span>
             <div className="flex flex-col gap-6">
                {['Whitepapers', 'The Ledger', 'Intelligence Hub', 'Risk Dictionary'].map(link => (
                  <a key={link} href="#" className="text-caption text-pebble hover:text-bone-white transition-colors tracking-widest uppercase font-medium">{link}</a>
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-10">
             <span className="text-caption text-bone-white font-bold tracking-[0.3em] uppercase opacity-40">Firm</span>
             <div className="flex flex-col gap-6">
                {['About Koech', 'Contact', 'Riskily Platform', 'Privacy Protocol'].map(link => (
                  <a key={link} href="#" className="text-caption text-pebble hover:text-bone-white transition-colors tracking-widest uppercase font-medium">{link}</a>
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-10">
             <span className="text-caption text-bone-white font-bold tracking-[0.3em] uppercase opacity-40">Join the Void</span>
             <p className="text-body text-ash/60 lowercase italic serif-italic">Strategic intelligence for the unfaltering.</p>
             <div className="flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="protocol@access.com" 
                  className="bg-void-canvas border border-iron/20 px-6 py-4 text-caption text-bone-white w-full focus:outline-none focus:border-arterial-red transition-colors placeholder:text-pebble/20 rounded-lg"
                />
                <button className="bg-bone-white text-void-canvas px-8 py-4 rounded-lg text-caption font-bold tracking-[0.2em] hover:bg-arterial-red hover:text-bone-white transition-all uppercase">
                  Authorize
                </button>
             </div>
          </div>
        </div>

        <div className="pt-16 border-t border-iron/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-4">
             <div className="w-1.5 h-1.5 bg-arterial-red rounded-full" />
             <span className="text-[10px] text-pebble tracking-[0.3em] font-medium uppercase">© 2026 The House Always Wins</span>
           </div>
           
           <button 
             onClick={scrollToTop}
             className="flex items-center gap-6 text-caption text-pebble hover:text-bone-white transition-colors group tracking-[0.3em] uppercase"
           >
             BACK TO TOP <div className="w-10 h-10 flex items-center justify-center border border-iron/20 rounded-full group-hover:border-bone-white transition-all">
                <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
             </div>
           </button>
        </div>
      </div>
    </footer>
  );
}
