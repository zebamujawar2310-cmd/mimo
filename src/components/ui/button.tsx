import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-normal tracking-[0.18em] uppercase text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white border border-black hover:bg-white hover:text-black",
        inverse:
          "bg-white text-black border border-white hover:bg-black hover:text-white hover:border-black",
        outline:
          "bg-transparent text-black border border-black/40 hover:border-black hover:bg-black hover:text-white",
        outlineInverse:
          "bg-transparent text-white border border-white/50 hover:border-white hover:bg-white hover:text-black",
        ghost: "bg-transparent text-black hover:bg-black/5",
        link: "text-black underline underline-offset-4 hover:opacity-70 tracking-normal normal-case",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-9 px-5 text-xs",
        lg: "h-14 px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
