import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'motion/react';

const LOGO_SIZE = 240;

// Each blade's real position within the original logo square, as a % of the
// logo box — these come from the actual watershed-segmented crop bounding
// boxes, NOT a naive 4-way quadrant split. This is what makes the pieces
// snap back into the exact original artwork instead of leaving seams.
const BLADE_LAYOUT = {
  blade1: { left: 0.9375,  top: 39.0625, width: 66.25,   height: 58.75   },
  blade2: { left: 0,       top: 0,       width: 57.96875,height: 68.75   },
  blade3: { left: 35.78125,top: 28.28125,width: 64.21875,height: 71.71875},
  blade4: { left: 35.15625,top: 1.875,   width: 64.84375,height: 47.8125},
};

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true);

  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const blade1Ref = useRef<HTMLImageElement>(null); // enters from top
  const blade2Ref = useRef<HTMLImageElement>(null); // enters from right
  const blade3Ref = useRef<HTMLImageElement>(null); // enters from bottom
  const blade4Ref = useRef<HTMLImageElement>(null); // enters from left

  useEffect(() => {
    let cancelled = false;

    const runAnimation = async () => {
      const overlay = overlayRef.current;
      const logo = logoRef.current;
      const glow = glowRef.current;
      const blade1 = blade1Ref.current;
      const blade2 = blade2Ref.current;
      const blade3 = blade3Ref.current;
      const blade4 = blade4Ref.current;

      if (!overlay || !logo || !glow || !blade1 || !blade2 || !blade3 || !blade4) {
        return;
      }

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        await animate(overlay, { opacity: 0 }, { duration: 0.2 }).finished;
        document.body.style.overflow = previousOverflow;
        if (!cancelled) setVisible(false);
        return;
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      /*
       * Stage 1: four blades tumble in from genuinely different directions,
       * each with its own curved path (start -> overshoot -> settle) rather
       * than a straight-line slide.
       */
      await Promise.all([
        animate(blade1, {
          x: [-0.60 * vw, -0.08 * vw, 0],
          y: [-0.70 * vh, -0.08 * vh, 0],
          rotate: [-260, -40, 0],
          opacity: [0, 1, 1],
          filter: ['blur(8px)', 'blur(2px)', 'blur(0px)'],
        }, { duration: 1.15, delay: 0, ease: [0.22, 1, 0.36, 1], times: [0, 0.7, 1] }).finished,

        animate(blade2, {
          x: [0.75 * vw, 0.09 * vw, 0],
          y: [-0.40 * vh, -0.06 * vh, 0],
          rotate: [230, 35, 0],
          opacity: [0, 1, 1],
          filter: ['blur(8px)', 'blur(2px)', 'blur(0px)'],
        }, { duration: 1.15, delay: 0.1, ease: [0.22, 1, 0.36, 1], times: [0, 0.7, 1] }).finished,

        animate(blade3, {
          x: [0.65 * vw, 0.07 * vw, 0],
          y: [0.65 * vh, 0.09 * vh, 0],
          rotate: [-210, -30, 0],
          opacity: [0, 1, 1],
          filter: ['blur(8px)', 'blur(2px)', 'blur(0px)'],
        }, { duration: 1.15, delay: 0.2, ease: [0.22, 1, 0.36, 1], times: [0, 0.7, 1] }).finished,

        animate(blade4, {
          x: [-0.70 * vw, -0.09 * vw, 0],
          y: [0.55 * vh, 0.07 * vh, 0],
          rotate: [200, 30, 0],
          opacity: [0, 1, 1],
          filter: ['blur(8px)', 'blur(2px)', 'blur(0px)'],
        }, { duration: 1.15, delay: 0.3, ease: [0.22, 1, 0.36, 1], times: [0, 0.7, 1] }).finished,
      ]);

      /*
       * Stage 2: snap + glow pulse the instant all 4 land.
       */
      await Promise.all([
        animate(logo, { scale: [1, 1.08, 0.98, 1] }, {
          duration: 0.5, ease: [0.22, 1, 0.36, 1],
        }).finished,
        animate(glow, { opacity: [0, 1, 0], scale: [0.6, 1.05, 1.3] }, {
          duration: 0.9, ease: 'easeOut',
        }).finished,
      ]);

      /*
       * Stage 3: rotate the assembled logo.
       */
      await animate(logo, {
        rotate: [0, 360],
        scale: [1, 1.06, 1],
      }, { duration: 0.9, ease: [0.4, 0, 0.2, 1] }).finished;

      /*
       * Stage 4: find the real navbar logo position and fly/shrink into it.
       */
      const navbarLogo = document.getElementById('trade360-navbar-logo');

      if (navbarLogo) {
        const target = navbarLogo.getBoundingClientRect();
        const targetCenterX = target.left + target.width / 2;
        const targetCenterY = target.top + target.height / 2;
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;
        const destinationX = targetCenterX - screenCenterX;
        const destinationY = targetCenterY - screenCenterY;
        const responsiveLogoSize = Math.min(LOGO_SIZE, window.innerWidth * 0.52);
        const destinationScale = target.width / responsiveLogoSize;

        await animate(logo, {
          x: destinationX,
          y: destinationY,
          scale: destinationScale,
          rotate: 360,
          filter: ['blur(0px)', 'blur(5px)', 'blur(0px)'],
        }, {
          duration: 0.95,
          ease: [0.76, 0, 0.24, 1],
          times: [0, 0.45, 1],
        }).finished;
      }

      /*
       * Stage 5: fade the white intro away, revealing the real navbar logo.
       */
      await animate(overlay, { opacity: [1, 0] }, {
        duration: 0.45, ease: [0.22, 1, 0.36, 1],
      }).finished;

      document.body.style.overflow = previousOverflow;
      if (!cancelled) setVisible(false);
    };

    const frame = window.requestAnimationFrame(() => { void runAnimation(); });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = '';
    };
  }, []);

  if (!visible) return null;

  const bladeStyle = (key: keyof typeof BLADE_LAYOUT): React.CSSProperties => {
    const b = BLADE_LAYOUT[key];
    return {
      position: 'absolute',
      left: `${b.left}%`,
      top: `${b.top}%`,
      width: `${b.width}%`,
      height: `${b.height}%`,
      opacity: 0,
      willChange: 'transform, opacity, filter',
    };
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-2xl bg-white/10 dark:bg-black/10"
      aria-hidden="true"
    >
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: `min(${LOGO_SIZE * 1.6}px, 80vw)`,
          height: `min(${LOGO_SIZE * 1.6}px, 80vw)`,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(63,158,111,0.35) 0%, rgba(63,158,111,0.12) 45%, rgba(63,158,111,0) 70%)',
          opacity: 0,
        }}
      />

      <div
        ref={logoRef}
        className="relative"
        style={{
          width: `min(${LOGO_SIZE}px, 52vw)`,
          height: `min(${LOGO_SIZE}px, 52vw)`,
          willChange: 'transform',
        }}
      >
        <img ref={blade1Ref} src="/trade360/blade-1.png" alt="" draggable={false} style={bladeStyle('blade1')} />
        <img ref={blade2Ref} src="/trade360/blade-2.png" alt="" draggable={false} style={bladeStyle('blade2')} />
        <img ref={blade3Ref} src="/trade360/blade-3.png" alt="" draggable={false} style={bladeStyle('blade3')} />
        <img ref={blade4Ref} src="/trade360/blade-4.png" alt="" draggable={false} style={bladeStyle('blade4')} />
      </div>
    </div>
  );
}
