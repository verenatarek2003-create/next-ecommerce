import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-[transform,box-shadow,background,color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(225_29_116_/0.2)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        primary:
          "bg-linear-to-r from-[#e11d74] via-[#d91a6c] to-[#aa1a5f] text-white shadow-[0_8px_28px_-6px_rgb(225_29_116_/0.55)] hover:shadow-[0_12px_36px_-6px_rgb(225_29_116_/0.45)]",
        secondary:
          "border border-[rgb(27_18_38_/0.08)] bg-[var(--surface)] text-[var(--brand)] shadow-[var(--shadow-xs)] hover:border-[rgb(27_18_38_/0.12)] hover:bg-[var(--accent-soft)]",
        ghost: "gap-2 text-[var(--brand)] hover:bg-[var(--accent-soft)]",
      },
      size: {
        sm: "h-9 gap-1.5 px-3.5 text-[13px]",
        md: "h-10 gap-2 px-5",
        lg: "h-12 rounded-2xl gap-2 px-7 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
