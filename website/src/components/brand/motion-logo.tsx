"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import { cn } from "@/lib/utils";

// Intrinsic size shared by every /public/brand/layer-*.png asset — they're all
// full-canvas cutouts of the same original artwork, so they stack in perfect
// registration without any manual offsetting.
const CANVAS_WIDTH = 1253;
const CANVAS_HEIGHT = 1015;

interface MotionLogoProps {
  className?: string;
  showTagline?: boolean;
}

/**
 * The GajiPay motion identity, staged from the official fixed logo artwork.
 *
 * The source file (public/brand/*.png) is the client's locked design — this
 * component never redraws, recolors, or recomposes it. What it animates are
 * three exact pixel-for-pixel cutouts of that same file (the G, the P, and
 * the wordmark), which is why they recombine into a result identical to the
 * original at rest. Two details from the brief don't survive the jump from a
 * vector brand system to a flat raster file, called out inline below.
 */
export function MotionLogo({ className, showTagline = true }: MotionLogoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const gRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const wrap = wrapRef.current;
    const gLayer = gRef.current;
    const pLayer = pRef.current;
    const wordmark = wordmarkRef.current;
    const sweep = sweepRef.current;
    const tagline = taglineRef.current;
    if (!wrap || !gLayer || !pLayer || !wordmark) return;

    const setGReveal = (deg: number) => {
      const mask = `conic-gradient(from -90deg at 50% 50%, #000 ${deg}deg, transparent ${deg}deg)`;
      gLayer.style.setProperty("mask-image", mask);
      gLayer.style.setProperty("-webkit-mask-image", mask);
    };

    if (reduceMotion) {
      setGReveal(360);
      gsap.set(gLayer, { opacity: 1 });
      gsap.set(pLayer, { opacity: 1, x: 0, y: 0 });
      gsap.set(wrap, { scale: 1, filter: "drop-shadow(0 18px 30px rgba(40,49,78,0.16))" });
      gsap.set(wordmark, { opacity: 1, clipPath: "inset(0 0 0% 0)" });
      if (tagline) gsap.set(tagline, { opacity: 1 });
      return;
    }

    // Initial state: nothing visible (pure white / silence, per the brief).
    setGReveal(0);
    gsap.set(gLayer, { opacity: 0 });
    gsap.set(pLayer, { opacity: 0, x: 22, y: 16 });
    gsap.set(wrap, { scale: 0.98, filter: "drop-shadow(0 0px 0px rgba(40,49,78,0))" });
    gsap.set(wordmark, { opacity: 0, clipPath: "inset(0 0 100% 0)" });
    if (tagline) gsap.set(tagline, { opacity: 0 });

    const reveal = { deg: 0 };
    const tl = gsap.timeline({ delay: 0.1 });

    // 0.2s -> 0.9s: a thin line grows and bends into the G's outer curve.
    // A raster file has no path to hand-draw, so a conic mask sweeping around
    // the G's own centre stands in for the stroke-by-stroke line-growth —
    // same visual read (the arc traces itself into being), same fixed artwork.
    tl.to(gLayer, { opacity: 1, duration: 0.15, ease: "power1.out" }, 0.2);
    tl.to(
      reveal,
      {
        deg: 360,
        duration: 0.7,
        ease: "power2.inOut",
        onUpdate: () => setGReveal(reveal.deg),
      },
      0.2,
    );

    // 1.2s -> 1.6s: the P glides in from the lower right and locks into place.
    // Smooth ease, no overshoot — nothing bounces.
    tl.to(pLayer, { opacity: 1, x: 0, y: 0, duration: 0.4, ease: "power3.out" }, 1.2);

    // 1.6s -> 2.0s: material settles — soft ambient shadow fades in, a hair
    // of scale settle (0.98 -> 1), no rotation.
    tl.to(wrap, { scale: 1, duration: 0.4, ease: "power2.out" }, 1.6);
    tl.to(wrap, { filter: "drop-shadow(0 18px 30px rgba(40,49,78,0.16))", duration: 0.4, ease: "power2.out" }, 1.6);

    // 2.0s: soft light sweep across the top edge — subtle, no glow/flare.
    if (sweep) {
      tl.fromTo(
        sweep,
        { xPercent: -140, opacity: 0 },
        { xPercent: 140, opacity: 1, duration: 0.55, ease: "power1.inOut" },
        2.0,
      );
    }

    // 2.4s: the GajiPay wordmark fades in below the mark.
    // It's baked into the fixed artwork as pixels, not live type, so the
    // brief's letter-tracking animation (-15 -> 0) isn't something we can
    // apply to it — a soft upward wipe + fade stands in instead.
    tl.to(wordmark, { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.4, ease: "power2.out" }, 2.4);

    // 2.8s: tagline fades in — this one IS live type, so it gets the real
    // tracking animation from the brief.
    if (tagline) {
      tl.fromTo(
        tagline,
        { opacity: 0, letterSpacing: "-0.05em" },
        { opacity: 1, letterSpacing: "0.2em", duration: 0.4, ease: "power2.out" },
        2.8,
      );
    }

    // Idle: gentle 1px float on an 8s cycle.
    tl.add(() => {
      gsap.to(wrap, { y: -1, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, 3.0);

    // Idle: reflection sweep repeats every 10s.
    if (sweep) {
      tl.add(() => {
        gsap.to(sweep, {
          xPercent: 140,
          opacity: 1,
          duration: 0.6,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 9.4,
          onRepeat: () => gsap.set(sweep, { xPercent: -140, opacity: 0 }),
        });
      }, 3.1);
    }

    return () => {
      tl.kill();
      gsap.killTweensOf([wrap, sweep]);
    };
  }, []);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div ref={wrapRef} className="relative w-56 overflow-hidden rounded-3xl sm:w-64">
        <div className="relative" style={{ aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}` }}>
          <div ref={gRef} className="absolute inset-0">
            <Image src="/brand/layer-g.png" alt="" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} priority className="h-full w-full object-contain" />
          </div>
          <div ref={pRef} className="absolute inset-0">
            <Image src="/brand/layer-p.png" alt="" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} priority className="h-full w-full object-contain" />
          </div>
          <div ref={wordmarkRef} className="absolute inset-0">
            <Image src="/brand/layer-wordmark.png" alt="GajiPay" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} priority className="h-full w-full object-contain" />
          </div>
        </div>
        <div
          ref={sweepRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 w-[45%] -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0"
        />
      </div>

      {showTagline ? (
        <p ref={taglineRef} className="mt-3 text-xs font-medium uppercase text-ink-faint">
          Pay Earned &middot; Live Empowered
        </p>
      ) : null}
    </div>
  );
}
