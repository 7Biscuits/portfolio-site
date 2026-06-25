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
  variant = "coral",
}: MetricBadgeProps) {
  const bgMap = {
    coral: "bg-brutal-coral text-black",
    cyan: "bg-brutal-cyan text-black",
    yellow: "bg-brutal-yellow text-black",
    default: "bg-[var(--card)] text-[var(--text-primary)]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs font-bold border-2 border-black dark:border-white shadow-neo-sm ${bgMap[variant]} ${className}`}
    >
      {emoji && <span className="text-sm">{emoji}</span>}
      <span>{label}</span>
    </span>
  );
}
