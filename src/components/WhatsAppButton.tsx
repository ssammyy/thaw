/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

const WHATSAPP_NUMBER = '254747914349';
const WHATSAPP_MESSAGE = "Hi Thaw, I'd like to talk.";

export function whatsappLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

/** Brand-neutral WhatsApp glyph — rendered in the site's own palette rather than WhatsApp green. */
export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39c1.44.79 3.06 1.2 4.71 1.2h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.21.72-.84.92-1.13.19-.28.39-.24.65-.14.27.1 1.68.79 1.97.94.29.14.48.21.55.33.07.13.07.72-.17 1.4Z" />
    </svg>
  );
}

/**
 * Persistent WhatsApp entry point. Uses the same bone-white → arterial-red
 * treatment as the nav and mobile enroll CTAs, so it reads as one more brand
 * button rather than a bolted-on third-party badge. Sits above the mobile
 * enroll bar's footprint so the two never collide.
 */
export default function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 1, ease: [0.23, 1, 0.32, 1] }}
      whileTap={{ scale: 0.95 }}
      className="group fixed z-[85] bottom-24 right-4 sm:right-6 lg:bottom-8 lg:right-8 flex items-center h-14 bg-bone-white text-void-canvas rounded-full shadow-2xl hover:bg-arterial-red hover:text-bone-white transition-colors duration-200 cursor-pointer overflow-hidden"
    >
      <span className="w-14 h-14 flex items-center justify-center shrink-0">
        <WhatsAppIcon size={24} />
      </span>
      <span className="hidden lg:inline-block max-w-0 group-hover:max-w-[170px] pr-0 group-hover:pr-6 transition-[max-width,padding] duration-300 ease-out whitespace-nowrap text-caption font-bold tracking-[0.12em] uppercase">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
