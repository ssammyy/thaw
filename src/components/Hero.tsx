/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const scrollTo = (selector: string) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Scrub video frames in sync with scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    let targetTime = 0;

    // iOS/WebKit won't decode or render any frame until the video has
    // "played" once — prime it with a muted play() then pause immediately.
    // React doesn't always render the muted attribute, so set it directly.
    video.muted = true;
    video.defaultMuted = true;
    const prime = () => {
      video.play().then(() => video.pause()).catch(() => {});
    };
    prime();
    // Autoplay may be blocked until first user gesture (e.g. Low Power Mode)
    window.addEventListener('touchstart', prime, { once: true, passive: true });

    const onScroll = (progress: number) => {
      if (video.duration) {
        targetTime = Math.min(progress, 0.999) * video.duration;
      }
    };

    const tick = () => {
      if (video.duration && video.readyState >= 2) {
        const delta = targetTime - video.currentTime;
        // Smooth lerp toward target frame to avoid seek jitter
        if (Math.abs(delta) > 1 / 48) {
          video.currentTime += delta * 0.25;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const unsubscribe = scrollYProgress.on('change', onScroll);
    raf = requestAnimationFrame(tick);

    return () => {
      unsubscribe();
      cancelAnimationFrame(raf);
      window.removeEventListener('touchstart', prime);
    };
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-5 sm:px-8 pb-20 md:pb-0 overflow-hidden flex flex-col justify-end md:justify-center bg-void-canvas"
    >
      {/* Scroll-scrubbed background video */}
      <video
        ref={videoRef}
        src="/mainvid-scrub.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-[85%_center] md:object-center pointer-events-none"
      />

      {/* Dark overlay — lightened so the hero reads atmospheric, not grim.
         Bottom gradient kept just heavy enough to seat the text legibly. */}
      <div className="absolute inset-0 bg-void-canvas/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-void-canvas/30 via-transparent to-void-canvas/95" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-[1400px] mx-auto w-full"
      >
        {/* Audience eyebrow — answers "who is this for?" instantly, including on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex items-center gap-3 mb-5 md:mb-7"
        >
          <span className="w-8 h-px bg-arterial-red" />
          <span className="text-caption text-bone-white font-bold tracking-[0.2em] uppercase">
            Financial defense for Africa's quick-money generation
          </span>
        </motion.div>

        {/* Title — desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="hidden md:block"
        >
          <div className="flex items-baseline flex-wrap">
            <h1 className="text-display-xl">THE HOUSE</h1>

          </div>
          <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className=" text-display-xl mx-4 lowercase text-ash/60"
          >
            always
          </motion.span>
          <h1 className="text-display-xl -mt-4 lg:-mt-8">WINS</h1>
        </motion.div>

        {/* Title — mobile (compact, so phone users see the message, not just video) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="md:hidden"
        >
          <h1 className="text-display leading-[0.85]">THE HOUSE</h1>
          <div className="flex items-baseline">
            <span className="text-display lowercase text-ash/60 mr-3">always</span>
            <h1 className="text-display">WINS</h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12"
        >
          <div className="max-w-xl">
            <p className="text-body text-ash max-w-md mb-8">
              Forex, betting, crypto, quick-money systems — engineered to extract, not create.
              <span className="text-bone-white"> Learn exactly how the house wins, so it stops winning against you.</span>
            </p>

            {/* Call to action — primary: enroll in the masterclass; secondary: the book */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
              <button
                onClick={() => scrollTo('#masterclass')}
                className="flex items-center justify-center gap-3 px-7 py-4 bg-bone-white text-void-canvas rounded-lg text-caption font-bold tracking-[0.15em] uppercase hover:bg-arterial-red hover:text-bone-white transition-colors duration-200 cursor-pointer group"
              >
                Enroll in the Masterclass
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo('#tools')}
                className="flex items-center justify-center gap-2 px-2 py-2 text-caption font-bold tracking-[0.15em] uppercase text-ash hover:text-bone-white transition-colors duration-200 cursor-pointer group"
              >
                Try the free tools
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-iron"/>

              <span className="text-caption text-bone-white font-bold tracking-widest uppercase">
                 KOECH BONIFACE KIPRONO
              </span>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end gap-4 self-auto">
            <span className="text-caption text-pebble">SCROLL TO DISCOVER</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-px h-16 bg-iron"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
