import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-coral text-paper hover:opacity-90",
  secondary: "bg-ink text-paper hover:opacity-90",
  ghost: "bg-transparent text-ink border border-ink/20 hover:bg-ink/5",
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`font-display font-semibold rounded-card px-5 py-3 text-sm transition ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}