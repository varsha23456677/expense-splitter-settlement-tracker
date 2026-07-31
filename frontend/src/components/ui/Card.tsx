import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Adds a dashed top border, evoking a torn receipt edge — used for expense/group rows */
  dashed?: boolean;
}

export default function Card({ children, className = "", dashed = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-4 ${
        dashed ? "border-t-2 border-dashed border-ink/10" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}