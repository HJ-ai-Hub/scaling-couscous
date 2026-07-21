"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function AdvancePayMock() {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-blue/25 via-mint/25 to-transparent blur-2xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[2.25rem] border border-border bg-white p-3 shadow-lift"
      >
        <div className="rounded-[1.75rem] bg-gradient-to-b from-ink to-[#1b2338] p-6 text-white">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/60">Available now</p>
          <p className="mt-2 font-brand text-4xl font-bold">RM 640</p>
          <p className="mt-1 text-sm text-white/60">of RM 1,850 earned this cycle</p>

          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-mint to-cyan"
              initial={{ width: "0%" }}
              whileInView={{ width: "35%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>
          <p className="mt-2 text-xs text-white/50">Capped at 35% of wages already earned</p>
        </div>

        <div className="mt-3 space-y-2 px-2 pb-2">
          <div className="flex items-center justify-between rounded-2xl bg-surface-alt px-4 py-3">
            <span className="text-sm text-ink-soft">Processing fee</span>
            <span className="text-sm font-semibold text-ink">RM 2.00 flat</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-surface-alt px-4 py-3">
            <span className="text-sm text-ink-soft">Interest</span>
            <span className="flex items-center gap-1 text-sm font-semibold text-mint-deep">
              <CheckCircle2 className="size-4" /> None
            </span>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
            Request Advance Pay
            <ArrowRight className="size-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
