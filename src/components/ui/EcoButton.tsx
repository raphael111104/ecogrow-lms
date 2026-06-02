import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-extrabold transition duration-300 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-sun/70 disabled:pointer-events-none disabled:opacity-55",
  {
    variants: {
      variant: {
        primary:
          "bg-leaf-700 text-white shadow-eco hover:-translate-y-0.5 hover:bg-leaf-500 hover:shadow-[0_18px_34px_rgba(22,122,58,0.22)]",
        secondary:
          "border border-leaf-500/25 bg-white/[0.92] text-leaf-700 shadow-soft backdrop-blur hover:-translate-y-0.5 hover:border-leaf-500/45 hover:bg-white",
        reward:
          "bg-sun text-leaf-700 shadow-soft hover:-translate-y-0.5 hover:bg-harvest hover:text-white hover:shadow-[0_18px_34px_rgba(246,195,67,0.28)]",
        ghost: "text-leaf-700 hover:bg-leaf-100 hover:-translate-y-0.5",
        danger: "bg-red-50 text-red-700 hover:bg-red-100",
      },
      size: {
        sm: "min-h-10 rounded-xl px-4 text-xs",
        md: "min-h-11 px-5",
        lg: "min-h-12 rounded-xl px-6 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

type EcoButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
};

export type EcoButtonProps = EcoButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export function EcoButton({
  className,
  children,
  href,
  icon,
  variant,
  size,
  fullWidth,
  type = "button",
  ...props
}: EcoButtonProps) {
  const classes = cn(buttonVariants({ variant, size, fullWidth }), className);
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
