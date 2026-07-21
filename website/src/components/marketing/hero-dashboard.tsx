"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Users, Wallet, CalendarCheck } from "lucide-react";

import { Sparkline } from "./mini-charts";

const floatTransition = {
  duration: 6,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

export function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div
        aria-hidden
        className="absolute -inset-x-10 -top-16 -bottom-10 -z-10 rounded-[3rem] bg-gradient-to-br from-mint/40 via-white to-blue/20 blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative rounded-card border border-white/60 bg-white/70 p-5 shadow-lift backdrop-blur-xl sm:p-6"
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Overview</p>
            <p className="mt-1 font-brand text-lg font-semibold text-ink">Payroll &middot; June</p>
          </div>
          <div className="flex -space-x-2">
            {["#A1FEEF", "#658AE4", "#28314E"].map((color, i) => (
              <span
                key={i}
                className="size-8 rounded-full border-2 border-white"
                style={{ background: color }}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={floatTransition}
            className="rounded-2xl border border-border bg-white p-4 shadow-soft"
          >
            <div className="flex items-center gap-2 text-ink-faint">
              <Users className="size-4" />
              <span className="text-xs font-medium">Employees</span>
            </div>
            <p className="mt-2 font-brand text-2xl font-semibold text-ink">248</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-mint-deep">
              <ArrowUpRight className="size-3.5" /> 4 this month
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ ...floatTransition, delay: 0.8 }}
            className="rounded-2xl border border-border bg-white p-4 shadow-soft"
          >
            <div className="flex items-center gap-2 text-ink-faint">
              <Wallet className="size-4" />
              <span className="text-xs font-medium">Advance Pay</span>
            </div>
            <p className="mt-2 font-brand text-2xl font-semibold text-ink">RM 18,420</p>
            <p className="mt-1 text-xs font-medium text-ink-faint">Disbursed this cycle</p>
          </motion.div>
        </div>

        <div className="mt-3 rounded-2xl border border-border bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-faint">Payroll cost trend</span>
            <span className="text-xs font-semibold text-blue-deep">+2.1%</span>
          </div>
          <Sparkline points={[62, 65, 61, 68, 70, 74, 78]} />
        </div>

        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ ...floatTransition, delay: 1.4 }}
          className="mt-3 flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-mint/30 text-[#0f5c50]">
            <CalendarCheck className="size-4.5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">Leave approved &middot; Nurul A.</p>
            <p className="text-xs text-ink-faint">2 minutes ago</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
