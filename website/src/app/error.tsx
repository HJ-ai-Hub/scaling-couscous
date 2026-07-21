"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6 py-32">
      <div className="max-w-md text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-rose-50 text-rose-500">
          <AlertTriangle className="size-7" />
        </span>
        <h1 className="mt-6 font-brand text-2xl font-semibold text-ink">Something went wrong</h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
          An unexpected error occurred while loading this page. You can try again, or head back to
          the homepage.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="secondary">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
