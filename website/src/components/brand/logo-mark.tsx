import Image from "next/image";

import { cn } from "@/lib/utils";

// Intrinsic size of /public/brand/gajipay-logo-trimmed.png (aspect ratio 768:887).
const TRIMMED_WIDTH = 768;
const TRIMMED_HEIGHT = 887;

interface LogoMarkProps {
  className?: string;
  alt?: string;
  priority?: boolean;
}

/**
 * The official GajiPay logo (mark + wordmark), as supplied by the client.
 * This is a fixed brand asset — do not redraw, recolor, or recompose it.
 * `gajipay-logo-trimmed.png` is the same artwork with its outer whitespace
 * trimmed so it reads clearly at small sizes (nav, footer, favicon).
 */
export function LogoMark({ className, alt = "GajiPay", priority }: LogoMarkProps) {
  return (
    <Image
      src="/brand/gajipay-logo-trimmed.png"
      alt={alt}
      width={TRIMMED_WIDTH}
      height={TRIMMED_HEIGHT}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}
