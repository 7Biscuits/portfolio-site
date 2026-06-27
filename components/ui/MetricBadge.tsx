interface MetricBadgeProps {
  label: string;
  emoji?: string;
  className?: string;
  variant?: "coral" | "cyan" | "yellow" | "default";
}

export default function MetricBadge({
  label,
  emoji,
  className = "",
  variant = "default",
}: MetricBadgeProps) {
  const bgMap = {
    coral: "bg-neutral-900 text-white dark:bg-white dark:text-black",
    cyan: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
    yellow: "bg-neutral-50 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400",
    default: "bg-[var(--card)] text-[var(--text-primary)]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs font-semibold border border-[var(--border)] rounded-md ${bgMap[variant]} ${className}`}
    >
      {emoji && <span className="text-sm">{emoji}</span>}
      <span>{label}</span>
    </span>
  );
}
