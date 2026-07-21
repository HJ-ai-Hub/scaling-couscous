import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo-mark";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6 py-32">
      <div className="text-center">
        <LogoMark className="mx-auto h-14 w-14" monochrome="dark" />
        <p className="mt-8 font-brand text-6xl font-bold text-ink">404</p>
        <h1 className="mt-3 text-balance font-brand text-2xl font-semibold text-ink">
          This page has already been paid out
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
          We couldn&apos;t find what you were looking for. It may have moved, or the link might be
          out of date.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">
              Back to home
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Contact support</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
