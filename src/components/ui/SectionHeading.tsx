
export default function SectionHeading({
  eyebrow,
  title,
  className = "",
  titleClassName = "text-3xl md:text-5xl",
}: {
  eyebrow: string;
  title: React.ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">{eyebrow}</span>
      <h2 className={`font-serif font-bold text-ink leading-[1.2] tracking-tight text-balance ${titleClassName}`}>
        {title}
      </h2>
    </div>
  );
}
