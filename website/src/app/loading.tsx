import { LogoMark } from "@/components/brand/logo-mark";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4" role="status" aria-live="polite">
      <LogoMark className="h-16 w-auto animate-pulse" />
      <p className="text-sm font-medium text-ink-faint">Loading GajiPay&hellip;</p>
    </div>
  );
}
