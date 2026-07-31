import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, className = "", ...rest }: InputProps) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-semibold uppercase tracking-wide text-ink/50 mb-1.5">
        {label}
      </span>
      <input
        className={`w-full rounded-card border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-coral transition ${className}`}
        {...rest}
      />
    </label>
  );
}