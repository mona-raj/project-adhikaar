import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  href,
  variant = "primary",
}: ButtonProps) {
  const classes =
    variant === "primary"
      ? "bg-emerald-600 text-white hover:bg-emerald-700"
      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100";

  if (href) {
    return (
      <a
        href={href}
        className={`inline-flex items-center rounded-xl px-5 py-3 font-medium transition ${classes}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`inline-flex items-center rounded-xl px-5 py-3 font-medium transition ${classes}`}
    >
      {children}
    </button>
  );
}
