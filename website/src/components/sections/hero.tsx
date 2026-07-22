"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MotionLogo } from "@/components/brand/motion-logo";
import { HeroDashboard } from "@/components/marketing/hero-dashboard";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44 lg:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(80%_60%_at_50%_0%,rgba(161,254,239,0.35),rgba(101,138,228,0.12)_45%,transparent_75%)]"
      />

      <div className="container-page grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <div className="flex justify-center lg:justify-start">
            <MotionLogo />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-8 flex justify-center lg:justify-start"
          >
            <Badge variant="mint">{t("badge")}</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-6 text-balance text-center font-brand text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-left lg:text-6xl"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
            className="mx-auto mt-6 max-w-xl text-balance text-center text-lg leading-relaxed text-ink-soft lg:mx-0 lg:text-left"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button asChild size="lg">
              <Link href="/book-demo">{t("ctaBookDemo")}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">{t("ctaGetStarted")}</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="#dashboard-preview" className="group">
                <PlayCircle className="size-5 text-blue-deep transition-transform group-hover:scale-105" />
                {t("ctaWatchDemo")}
              </Link>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 text-center text-sm text-ink-faint lg:text-left"
          >
            {t("disclaimer")}
          </motion.p>
        </div>

        <div>
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
