import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}

export function PageHero({ eyebrow, title, description, align = "center", children, className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pb-16 pt-36 sm:pt-44", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(70%_60%_at_50%_0%,rgba(161,254,239,0.3),rgba(101,138,228,0.1)_45%,transparent_75%)]"
      />
      <div className={cn("container-page", align === "center" && "text-center")}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">{eyebrow}</p>
        <h1
          className={cn(
            "mt-4 text-balance font-brand text-4xl font-bold tracking-tight text-ink sm:text-5xl",
            align === "center" && "mx-auto max-w-3xl",
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "mt-5 text-balance text-lg leading-relaxed text-ink-soft",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}
