import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-[1.1em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-white shadow-button hover:-translate-y-0.5 hover:bg-[#1c2340] active:translate-y-0",
        secondary:
          "bg-white text-ink border border-border-strong shadow-soft hover:-translate-y-0.5 hover:border-ink/20 active:translate-y-0",
        accent:
          "bg-gradient-to-r from-mint to-blue text-ink shadow-button hover:-translate-y-0.5 active:translate-y-0",
        ghost:
          "bg-transparent text-ink hover:bg-surface-alt",
        link: "bg-transparent text-blue-deep underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-14 rounded-pill px-8 text-[0.95rem]",
        sm: "h-11 rounded-pill px-6 text-sm",
        lg: "h-16 rounded-pill px-10 text-base",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
