interface SkillTagProps {
  label: string;
  size?: "sm" | "md";
}

export default function SkillTag({ label, size = "md" }: SkillTagProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1.5 text-xs";

  return (
    <span
      className={`inline-block font-mono font-medium rounded-full bg-neutral-100 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/80 dark:hover:bg-neutral-800 transition-colors select-none ${sizeClasses}`}
    >
      {label}
    </span>
  );
}
