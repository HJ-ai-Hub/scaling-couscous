import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/section-reveal";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo-mark";
import { Link } from "@/i18n/navigation";

export async function FinalCta() {
  const t = await getTranslations("home.finalCta");

  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <SectionReveal className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-16 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(161,254,239,0.22),transparent_70%)]"
          />
          <div className="relative">
            <div className="mx-auto flex w-fit items-center rounded-3xl bg-white px-5 py-3 shadow-lift">
              <LogoMark className="h-10 w-auto" />
            </div>
            <h2 className="mx-auto mt-8 max-w-2xl text-balance font-brand text-3xl font-bold text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-white/70">{t("description")}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link href="/book-demo">{t("ctaBookDemo")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/15"
              >
                <Link href="/contact">{t("ctaGetStarted")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
