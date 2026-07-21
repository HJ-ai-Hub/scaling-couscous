"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import {
  G_ARC_PATH,
  G_BAR_PATH,
  LOGO_VIEEWBOX,
  P_BOWL_PATH,
  P_STEM_PATH,
  STROKE_WIDTH,
} from "./logo-paths";
import { cn } from "@/lib/utils";

interface MotionLogoProps {
  className?: string;
  showWordmark?: boolean;
  showTagline?: boolean;
}

/**
 * The GajiPay motion identity: line draws into the G, the P slides into
 * place, a matte material settles in, then GajiPay + tagline fade in.
 * Runs once, then idles (1px float, periodic reflection sweep).
 * Skips straight to the resting state for prefers-reduced-motion.
 */
export function MotionLogo({ className, showWordmark = true, showTagline = true }: MotionLogoProps) {
  const markRef = useRef<SVGSVGElement>(null);
  const gArcRef = useRef<SVGPathElement>(null);
  const gBarRef = useRef<SVGPathElement>(null);
  const pGroupRef = useRef<SVGGElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const arc = gArcRef.current;
    const bar = gBarRef.current;
    const pGroup = pGroupRef.current;
    const mark = markRef.current;
    const sweep = sweepRef.current;
    const wordmark = wordmarkRef.current;
    const tagline = taglineRef.current;
    if (!arc || !bar || !pGroup || !mark) return;

    const arcLength = arc.getTotalLength();
    const barLength = bar.getTotalLength();

    if (reduceMotion) {
      gsap.set([arc, bar], { strokeDasharray: "none", strokeDashoffset: 0 });
      gsap.set(pGroup, { opacity: 1, x: 0 });
      if (wordmark) gsap.set(wordmark, { opacity: 1, y: 0 });
      if (tagline) gsap.set(tagline, { opacity: 1 });
      return;
    }

    gsap.set(arc, { strokeDasharray: arcLength, strokeDashoffset: arcLength });
    gsap.set(bar, { strokeDasharray: barLength, strokeDashoffset: barLength });
    gsap.set(pGroup, { opacity: 0, x: 26 });
    gsap.set(mark, { filter: "drop-shadow(0 0px 0px rgba(40,49,78,0))" });
    if (wordmark) gsap.set(wordmark, { opacity: 0, y: 10 });
    if (tagline) gsap.set(tagline, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.15 });

    // 0.2 -> 1.0 : thin line grows and forms the G
    tl.to(arc, { strokeDashoffset: 0, duration: 0.85, ease: "power2.out" }, 0.05);
    tl.to(bar, { strokeDashoffset: 0, duration: 0.3, ease: "power2.out" }, 0.75);
    // 1.0 : P slides into place
    tl.to(pGroup, { opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.4)" }, 0.85);
    // 1.6 : material settles into a premium matte finish
    tl.to(
      mark,
      {
        filter: "drop-shadow(0 18px 30px rgba(40,49,78,0.18))",
        duration: 0.5,
        ease: "power2.out",
      },
      1.45,
    );
    tl.fromTo(mark, { scale: 0.98 }, { scale: 1, duration: 0.5, ease: "power2.out" }, 1.45);
    // 2.0 : soft reflection sweep
    if (sweep) {
      tl.fromTo(
        sweep,
        { xPercent: -140, opacity: 0 },
        { xPercent: 140, opacity: 1, duration: 0.7, ease: "power1.inOut" },
        1.85,
      );
    }
    // 2.4 : wordmark fades in
    if (wordmark) {
      tl.to(wordmark, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 2.25);
    }
    // 2.8 : tagline fades in
    if (tagline) {
      tl.to(tagline, { opacity: 1, duration: 0.5, ease: "power2.out" }, 2.65);
    }

    // Idle: gentle 1px float on an 8s cycle
    tl.add(() => {
      gsap.to(mark, {
        y: -1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, 2.9);

    // Idle: reflection sweep repeats every 10s
    if (sweep) {
      tl.add(() => {
        gsap.to(sweep, {
          xPercent: 140,
          opacity: 1,
          duration: 0.8,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 9.2,
          onRepeat: () => gsap.set(sweep, { xPercent: -140, opacity: 0 }),
        });
      }, 3.0);
    }

    return () => {
      tl.kill();
      gsap.killTweensOf([mark, sweep]);
    };
  }, []);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative overflow-hidden rounded-3xl">
        <svg
          ref={markRef}
          viewBox={LOGO_VIEEWBOX}
          className="h-24 w-24 sm:h-28 sm:w-28"
          fill="none"
          role="img"
          aria-label="GajiPay"
        >
          <defs>
            <linearGradient id="motion-mint-grad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#C4FFF4" />
              <stop offset="1" stopColor="#5FC8B6" />
            </linearGradient>
            <linearGradient id="motion-blue-grad" x1="55" y1="30" x2="90" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#7FA0F0" />
              <stop offset="1" stopColor="#4361C9" />
            </linearGradient>
          </defs>
          <path
            ref={gArcRef}
            d={G_ARC_PATH}
            stroke="url(#motion-mint-grad)"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
          />
          <path
            ref={gBarRef}
            d={G_BAR_PATH}
            stroke="url(#motion-mint-grad)"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
          />
          <g ref={pGroupRef}>
            <path d={P_BOWL_PATH} stroke="url(#motion-blue-grad)" strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
            <path d={P_STEM_PATH} stroke="url(#motion-blue-grad)" strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
          </g>
        </svg>
        <div
          ref={sweepRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 w-[45%] -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0"
        />
      </div>

      {showWordmark ? (
        <div ref={wordmarkRef} className="mt-5">
          <p className="font-brand text-3xl font-semibold tracking-tight text-ink sm:text-4xl">GajiPay</p>
        </div>
      ) : null}

      {showTagline ? (
        <p
          ref={taglineRef}
          className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-ink-faint"
        >
          Pay Earned &middot; Live Empowered
        </p>
      ) : null}
    </div>
  );
}
