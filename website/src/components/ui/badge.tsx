import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-pill px-3.5 py-1.5 text-xs font-semibold tracking-wide",
  {
    variants: {
      variant: {
        mint: "bg-mint/40 text-[#0f5c50]",
        blue: "bg-blue/15 text-blue-deep",
        ink: "bg-ink text-white",
        outline: "border border-border-strong text-ink-soft",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
