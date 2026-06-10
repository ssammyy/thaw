/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

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
    };
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-5 sm:px-8 overflow-hidden flex flex-col justify-center bg-void-canvas"
    >
      {/* Scroll-scrubbed background video */}
      <video
        ref={videoRef}
        src="/mainvid-scrub.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-void-canvas/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-void-canvas/40 via-transparent to-void-canvas" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-[1400px] mx-auto w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12"
        >
          <div className="max-w-xl">
            <p className="text-body text-ash max-w-md mb-8">
              Forex, betting, quick-money systems — engineered to extract, not create.
              <span className="text-bone-white"> You think you're different. Prove it.</span>
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-iron"/>

              <span className="text-caption text-bone-white font-bold tracking-widest uppercase">
                 KOECH BONIFACE KIPRONO
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4 self-end md:self-auto">
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
