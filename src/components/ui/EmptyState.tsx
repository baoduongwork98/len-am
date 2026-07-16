
export default function EmptyState({
  icon,
  title,
  message,
  children,
}: {
  icon: React.ReactNode;
  title?: string;
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="text-center py-20 flex flex-col items-center justify-center">
      {icon}
      {title && <h3 className="font-serif text-lg font-bold text-ink mb-1">{title}</h3>}
      <p className="text-xs text-ink-muted max-w-xs leading-relaxed mx-auto">{message}</p>
      {children}
    </div>
  );
}
