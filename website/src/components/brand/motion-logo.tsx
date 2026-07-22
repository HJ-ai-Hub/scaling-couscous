"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import { cn } from "@/lib/utils";
import { CANVAS_WIDTH, CANVAS_HEIGHT, TRACE_TRANSFORM, G_TRACED_PATH } from "./logo-paths";

interface MotionLogoProps {
  className?: string;
  showTagline?: boolean;
}

/**
 * The GajiPay motion identity.
 *
 * The client's logo file (public/brand/*.png) is the locked design — this
 * component never redraws, recolors, or recomposes it. But two beats from
 * the brief genuinely need something other than a flat raster image:
 *
 * 1. The G is drawn with a real stroke-dasharray animation along
 *    `G_TRACED_PATH`, a vector outline traced directly from the client's own
 *    artwork (see logo-paths.ts) — an actual line growing around an actual
 *    curve, not a mask trick. Once it's traced and filled flat, it
 *    cross-fades into the exact raster artwork (full matte/bevel/shadow
 *    detail) for the "material becomes premium 3D" beat — so the resting
 *    frame is still the client's exact file, pixel for pixel.
 * 2. The wordmark is live type (Gill Sans stack, #28314E), not a raster
 *    crop, so it can carry a real letter-tracking animation the way the
 *    brief describes. The tagline was already live type.
 */
export function MotionLogo({ className, showTagline = true }: MotionLogoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const gPathRef = useRef<SVGPathElement>(null);
  const gRasterRef = useRef<HTMLDivElement>(null);
  const pRasterRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const wrap = wrapRef.current;
    const gPath = gPathRef.current;
    const gRaster = gRasterRef.current;
    const pRaster = pRasterRef.current;
    const sweep = sweepRef.current;
    const wordmark = wordmarkRef.current;
    const tagline = taglineRef.current;
    if (!wrap || !gPath || !gRaster || !pRaster || !wordmark) return;

    const length = gPath.getTotalLength();

    if (reduceMotion) {
      gsap.set(gPath, { opacity: 0 });
      gsap.set(gRaster, { opacity: 1 });
      gsap.set(pRaster, { opacity: 1, x: 0, y: 0 });
      gsap.set(wrap, { scale: 1, filter: "drop-shadow(0 18px 30px rgba(40,49,78,0.16))" });
      gsap.set(wordmark, { opacity: 1, letterSpacing: "normal" });
      if (tagline) gsap.set(tagline, { opacity: 1 });
      return;
    }

    gsap.set(gPath, {
      strokeDasharray: length,
      strokeDashoffset: length,
      fillOpacity: 0,
      opacity: 1,
    });
    gsap.set(gRaster, { opacity: 0 });
    gsap.set(pRaster, { opacity: 0, x: 22, y: 16 });
    gsap.set(wrap, { scale: 0.98, filter: "drop-shadow(0 0px 0px rgba(40,49,78,0))" });
    gsap.set(wordmark, { opacity: 0, letterSpacing: "-0.02em" });
    if (tagline) gsap.set(tagline, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.1 });

    // 0.2s -> 0.75s: a thin line grows and bends, tracing the G's real
    // outline (this is an actual stroke-dasharray draw, not a mask sweep).
    tl.to(gPath, { strokeDashoffset: 0, duration: 0.55, ease: "power2.inOut" }, 0.2);
    // 0.75s -> 0.95s: the traced outline fills solid — "the G becomes complete".
    tl.to(gPath, { fillOpacity: 1, duration: 0.2, ease: "power1.out" }, 0.75);

    // 1.2s -> 1.6s: the P glides in from the lower right, no bounce.
    tl.to(pRaster, { opacity: 1, x: 0, y: 0, duration: 0.4, ease: "power3.out" }, 1.2);

    // 1.6s -> 2.0s: material change — the flat traced G cross-fades into the
    // exact raster artwork (full matte 3D + bevel + shadow), shadow fades in,
    // a hair of scale settle. No rotation.
    tl.to(gRaster, { opacity: 1, duration: 0.4, ease: "power2.out" }, 1.6);
    tl.to(gPath, { opacity: 0, duration: 0.35, ease: "power2.out" }, 1.6);
    tl.to(wrap, { scale: 1, duration: 0.4, ease: "power2.out" }, 1.6);
    tl.to(wrap, { filter: "drop-shadow(0 18px 30px rgba(40,49,78,0.16))", duration: 0.4, ease: "power2.out" }, 1.6);

    // 2.0s: soft light sweep across the top edge — no glow, no flare.
    if (sweep) {
      tl.fromTo(
        sweep,
        { xPercent: -140, opacity: 0 },
        { xPercent: 140, opacity: 1, duration: 0.55, ease: "power1.inOut" },
        2.0,
      );
    }

    // 2.4s: the GajiPay wordmark fades in — real type, real tracking animation.
    tl.to(wordmark, { opacity: 1, letterSpacing: "normal", duration: 0.45, ease: "power2.out" }, 2.4);

    // 2.8s: tagline fades in with its own tracking sweep.
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
          <svg viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`} className="absolute inset-0 h-full w-full" aria-hidden>
            <g transform={TRACE_TRANSFORM}>
              <path
                ref={gPathRef}
                d={G_TRACED_PATH}
                fill="#5FC8B6"
                stroke="#5FC8B6"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <div ref={gRasterRef} className="absolute inset-0">
            <Image src="/brand/layer-g.png" alt="" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} priority className="h-full w-full object-contain" />
          </div>
          <div ref={pRasterRef} className="absolute inset-0">
            <Image src="/brand/layer-p.png" alt="" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} priority className="h-full w-full object-contain" />
          </div>
        </div>
        <div
          ref={sweepRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 w-[45%] -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0"
        />
      </div>

      <h2 ref={wordmarkRef} className="mt-5 font-brand text-3xl font-semibold text-ink sm:text-4xl">
        GajiPay
      </h2>

      {showTagline ? (
        <p ref={taglineRef} className="mt-2 text-xs font-medium uppercase text-ink-faint">
          Pay Earned &middot; Live Empowered
        </p>
      ) : null}
    </div>
  );
}
