import { TIMELINE } from "@/lib/data";
import TimelineItem from "../ui/TimelineItem";
import ScrollReveal from "../ui/ScrollReveal";

export default function Experience() {
  return (
    <section id="experience" className="py-20 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="block font-mono text-xs font-semibold text-neutral-600 dark:text-neutral-300 leading-none mb-2 tracking-widest uppercase">
            03 // EXPERIENCE
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight uppercase text-[var(--text-primary)]">
            Experience &amp; Extracurriculars
          </h2>
        </div>

        {/* Stacked Row Grid Container within ScrollReveal */}
        <ScrollReveal>
          <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] shadow-neo divide-y divide-[var(--border)] overflow-hidden">
            {TIMELINE.map((item, index) => (
              <TimelineItem
                key={`${item.role}-${index}`}
                role={item.role}
                org={item.org}
                period={item.period}
                type={item.type}
                description={item.description}
                badge={item.badge}
                logo={item.logo}
              />
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
