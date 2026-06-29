import Image from "next/image";

interface TimelineItemProps {
  role: string;
  org: string;
  period: string;
  type: "professional" | "extracurricular";
  description: string;
  badge?: string;
  logo?: string;
}

export default function TimelineItem({
  role,
  org,
  period,
  type,
  description,
  badge,
  logo,
}: TimelineItemProps) {
  return (
    <article className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start relative group transition-colors duration-200 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/30">
      {/* Muted Date Column */}
      <div className="w-full md:w-48 flex-shrink-0 pt-1">
        <time className="inline-block font-mono text-xs md:text-sm font-semibold text-neutral-500 uppercase select-none">
          {period}
        </time>
      </div>

      {/* Content block */}
      <div className="flex-grow flex items-start gap-4 text-left min-w-0 w-full md:w-0 md:flex-1">
        {logo && (
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src={logo}
              alt={org}
              width={48}
              height={48}
              className={`w-full h-full object-contain ${
                org.includes("ThinkStartup") ? "p-1.5" : ""
              }`}
            />
          </div>
        )}
        
        <div className="space-y-2 flex-grow">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              {role}
            </h3>
            {badge && (
              <span className="font-mono text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-[var(--border)] px-2 py-0.5 rounded">
                {badge}
              </span>
            )}
          </div>
          
          <p className="text-sm font-semibold text-[var(--text-primary)]/80 uppercase tracking-wider">
            {org}
          </p>
          
          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
