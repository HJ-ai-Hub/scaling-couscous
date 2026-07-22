"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import { cn } from "@/lib/utils";

// Intrinsic size of /public/brand/gajipay-logo-full.png (aspect ratio 1253:1015).
const FULL_WIDTH = 1253;
const FULL_HEIGHT = 1015;

interface MotionLogoProps {
  className?: string;
  showTagline?: boolean;
}

/**
 * The GajiPay motion identity: the official logo settles in with a soft
 * matte entrance and a reflection sweep, then idles (1px float, periodic
 * sweep). The artwork itself is the client's fixed logo file — this
 * component only animates it, it never redraws it.
 * Skips straight to the resting state for prefers-reduced-motion.
 */
export function MotionLogo({ className, showTagline = true }: MotionLogoProps) {
  const markRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mark = markRef.current;
    const glow = glowRef.current;
    const sweep = sweepRef.current;
    const tagline = taglineRef.current;
    if (!mark) return;

    if (reduceMotion) {
      gsap.set(mark, { opacity: 1, scale: 1, y: 0 });
      if (glow) gsap.set(glow, { opacity: 0.85 });
      if (tagline) gsap.set(tagline, { opacity: 1 });
      return;
    }

    gsap.set(mark, { opacity: 0, scale: 0.94, y: 16 });
    if (glow) gsap.set(glow, { opacity: 0, scale: 0.85 });
    if (tagline) gsap.set(tagline, { opacity: 0, y: 8 });

    const tl = gsap.timeline({ delay: 0.15 });

    // Premium matte entrance
    tl.to(mark, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.1);
    tl.to(mark, { filter: "drop-shadow(0 18px 30px rgba(40,49,78,0.16))", duration: 0.5, ease: "power2.out" }, 0.35);

    // Soft reflection sweep
    if (sweep) {
      tl.fromTo(
        sweep,
        { xPercent: -140, opacity: 0 },
        { xPercent: 140, opacity: 1, duration: 0.7, ease: "power1.inOut" },
        0.75,
      );
    }

    // Tagline fades in
    if (tagline) {
      tl.to(tagline, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.1);
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
    }, 1.5);

    // Idle: ambient glow, breathing continuously behind the mark
    if (glow) {
      tl.to(glow, { opacity: 0.85, scale: 1, duration: 0.6, ease: "power2.out" }, 1.2);
      tl.add(() => {
        gsap.to(glow, {
          opacity: 1,
          scale: 1.18,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, 1.8);
    }

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
      }, 1.6);
    }

    return () => {
      tl.kill();
      gsap.killTweensOf([mark, glow, sweep]);
    };
  }, []);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative">
        <div ref={glowRef} aria-hidden className="pointer-events-none absolute -inset-12 -z-10 opacity-0 sm:-inset-16">
          {/* Outer soft halo — wide spread */}
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(161,254,239,0.85) 0%, rgba(101,138,228,0.6) 45%, transparent 72%)",
            }}
          />
          {/* Inner bright core — gives the glow a visible centre, not just haze */}
          <div
            className="absolute inset-10 rounded-full blur-lg sm:inset-14"
            style={{
              background:
                "radial-gradient(circle, rgba(94,231,255,0.9) 0%, rgba(161,254,239,0.7) 50%, transparent 75%)",
            }}
          />
        </div>
        <div ref={markRef} className="relative w-56 overflow-hidden rounded-3xl sm:w-64">
          <Image
            src="/brand/gajipay-logo-full.png"
            alt="GajiPay"
            width={FULL_WIDTH}
            height={FULL_HEIGHT}
            priority
            className="h-auto w-full object-contain"
          />
          <div
            ref={sweepRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 w-[45%] -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0"
          />
        </div>
      </div>

      {showTagline ? (
        <p ref={taglineRef} className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-ink-faint">
          Pay Earned &middot; Live Empowered
        </p>
      ) : null}
    </div>
  );
}
