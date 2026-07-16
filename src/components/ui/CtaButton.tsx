"use client";

import Link from "next/link";

const ICONS = {
  arrow: "M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25",
  plus: "M12 4.5v15m7.5-7.5h-15",
} as const;

export function IconCircle({
  icon = "arrow",
  className = "w-8 h-8",
  iconClassName = "w-3.5 h-3.5",
}: {
  icon?: keyof typeof ICONS;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={`${className} rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`${iconClassName} text-surface`}>
        <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[icon]} />
      </svg>
    </div>
  );
}

interface CtaButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement & HTMLButtonElement>) => void;
  color?: "accent" | "sage";
  icon?: keyof typeof ICONS;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function CtaButton({
  href,
  onClick,
  color = "accent",
  icon = "arrow",
  className = "",
  children,
  type = "button",
  disabled = false,
}: CtaButtonProps) {
  const classes = `pl-6 pr-2.5 h-12 rounded-btn text-surface flex items-center gap-4 font-semibold text-xs active:scale-[0.98] group transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none ${
    color === "accent"
      ? "bg-accent shadow-warm-md hover:bg-accent-dark"
      : "bg-accent-sage shadow-warm-sm hover:opacity-90"
  } ${className}`;

  const content = (
    <>
      <span>{children}</span>
      <IconCircle icon={icon} />
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
