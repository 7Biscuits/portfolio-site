interface TimelineItemProps {
  role: string;
  org: string;
  period: string;
  type: "professional" | "leadership";
  description: string;
  badge?: string;
}

export default function TimelineItem({
  role,
  org,
  period,
  type,
  description,
  badge,
}: TimelineItemProps) {
  return (
    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start relative group transition-colors duration-150 hover:bg-[var(--accent)]/5">
      {/* Date badge: Cyan for professional, yellow/coral for leadership */}
      <div className="w-full md:w-52 flex-shrink-0">
        <span className="inline-block font-mono text-xs md:text-sm font-bold text-center bg-brutal-cyan text-black border-2 border-black dark:border-white px-3 py-2 shadow-neo-sm uppercase select-none">
          {period}
        </span>
      </div>

      {/* Content block */}
      <div className="flex-grow space-y-2 text-left">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            {role}
          </h3>
          {badge && (
            <span className="font-mono text-[10px] font-bold bg-brutal-yellow text-black border-2 border-black px-1.5 py-0.5 shadow-neo-sm">
              {badge}
            </span>
          )}
        </div>
        
        <p className="text-sm font-bold text-brutal-coral uppercase tracking-wider">
          {org}
        </p>
        
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>
    </div>
  );
}
