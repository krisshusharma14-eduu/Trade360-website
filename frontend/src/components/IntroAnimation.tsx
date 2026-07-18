import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'motion/react';

const LOGO_SIZE = 240;

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true);

  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const topLeftRef = useRef<HTMLImageElement>(null);
  const topRightRef = useRef<HTMLImageElement>(null);
  const bottomRightRef = useRef<HTMLImageElement>(null);
  const bottomLeftRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let cancelled = false;

    const runAnimation = async () => {
      const overlay = overlayRef.current;
      const logo = logoRef.current;

      const topLeft = topLeftRef.current;
      const topRight = topRightRef.current;
      const bottomRight = bottomRightRef.current;
      const bottomLeft = bottomLeftRef.current;

      if (
        !overlay ||
        !logo ||
        !topLeft ||
        !topRight ||
        !bottomRight ||
        !bottomLeft
      ) {
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

        if (!cancelled) {
          setVisible(false);
        }

        return;
      }

      /*
       * Stage 1:
       * Four blades enter from different directions and align.
       */
      await Promise.all([
        animate(
          topLeft,
          {
            x: [-(window.innerWidth * 0.55), 0],
            y: [-(window.innerHeight * 0.55), 0],
            rotate: [-135, 0],
            opacity: [0, 1],
            filter: ['blur(8px)', 'blur(0px)'],
          },
          {
            duration: 1,
            delay: 0,
            ease: [0.22, 1, 0.36, 1],
          },
        ).finished,

        animate(
          topRight,
          {
            x: [window.innerWidth * 0.55, 0],
            y: [-(window.innerHeight * 0.55), 0],
            rotate: [135, 0],
            opacity: [0, 1],
            filter: ['blur(8px)', 'blur(0px)'],
          },
          {
            duration: 1,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          },
        ).finished,

        animate(
          bottomRight,
          {
            x: [window.innerWidth * 0.55, 0],
            y: [window.innerHeight * 0.55, 0],
            rotate: [-135, 0],
            opacity: [0, 1],
            filter: ['blur(8px)', 'blur(0px)'],
          },
          {
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          },
        ).finished,

        animate(
          bottomLeft,
          {
            x: [-(window.innerWidth * 0.55), 0],
            y: [window.innerHeight * 0.55, 0],
            rotate: [135, 0],
            opacity: [0, 1],
            filter: ['blur(8px)', 'blur(0px)'],
          },
          {
            duration: 1,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          },
        ).finished,
      ]);

      /*
       * Stage 2:
       * Small magnetic snap after assembly.
       */
      await animate(
        logo,
        {
          scale: [1, 1.08, 0.98, 1],
        },
        {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        },
      ).finished;

      /*
       * Stage 3:
       * Rotate the assembled logo.
       */
      await animate(
        logo,
        {
          rotate: [0, 360],
          scale: [1, 1.03, 1],
        },
        {
          duration: 1.15,
          ease: [0.22, 1, 0.36, 1],
        },
      ).finished;

      /*
       * Stage 4:
       * Find the real navbar logo position.
       */
      const navbarLogo = document.getElementById(
        'trade360-navbar-logo',
      );

      if (navbarLogo) {
        const target = navbarLogo.getBoundingClientRect();

        const targetCenterX = target.left + target.width / 2;
        const targetCenterY = target.top + target.height / 2;

        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        const destinationX = targetCenterX - screenCenterX;
        const destinationY = targetCenterY - screenCenterY;

        const responsiveLogoSize = Math.min(
          LOGO_SIZE,
          window.innerWidth * 0.52,
        );

        const destinationScale =
          target.width / responsiveLogoSize;

        /*
         * Stage 5:
         * Shrink and fly into the real navbar position.
         */
        await animate(
          logo,
          {
            x: destinationX,
            y: destinationY,
            scale: destinationScale,
            rotate: 360,
          },
          {
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
          },
        ).finished;
      }

      /*
       * Stage 6:
       * Fade the white intro away and reveal the website.
       */
      await animate(
        overlay,
        {
          opacity: [1, 0],
        },
        {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        },
      ).finished;

      document.body.style.overflow = previousOverflow;

      if (!cancelled) {
        setVisible(false);
      }
    };

    const frame = window.requestAnimationFrame(() => {
      void runAnimation();
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = '';
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      aria-hidden="true"
    >
      <div
        ref={logoRef}
        className="relative"
        style={{
          width: `min(${LOGO_SIZE}px, 52vw)`,
          height: `min(${LOGO_SIZE}px, 52vw)`,
          willChange: 'transform',
        }}
      >
        <img
          ref={topLeftRef}
          src="/trade360/blade-top-left.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
          style={{
            opacity: 0,
            willChange: 'transform, opacity, filter',
          }}
          draggable={false}
        />

        <img
          ref={topRightRef}
          src="/trade360/blade-top-right.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
          style={{
            opacity: 0,
            willChange: 'transform, opacity, filter',
          }}
          draggable={false}
        />

        <img
          ref={bottomRightRef}
          src="/trade360/blade-bottom-right.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
          style={{
            opacity: 0,
            willChange: 'transform, opacity, filter',
          }}
          draggable={false}
        />

        <img
          ref={bottomLeftRef}
          src="/trade360/blade-bottom-left.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
          style={{
            opacity: 0,
            willChange: 'transform, opacity, filter',
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}
