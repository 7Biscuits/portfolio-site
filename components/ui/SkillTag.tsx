interface SkillTagProps {
  label: string;
  size?: "sm" | "md";
}

export default function SkillTag({ label, size = "md" }: SkillTagProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1.5 text-xs";

  return (
    <span
      className={`inline-block font-mono font-bold border-2 border-black dark:border-white bg-[var(--card)] text-[var(--text-primary)] hover:bg-brutal-yellow hover:text-black transition-all duration-150 shadow-neo-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_var(--border)] active:translate-x-0 active:translate-y-0 active:shadow-neo-sm select-none ${sizeClasses}`}
    >
      {label}
    </span>
  );
}
