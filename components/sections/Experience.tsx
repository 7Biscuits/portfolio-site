import { TIMELINE } from "@/lib/data";
import TimelineItem from "../ui/TimelineItem";
import ScrollReveal from "../ui/ScrollReveal";

export default function Experience() {
  return (
    <section id="experience" className="py-20 border-t-4 border-black dark:border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="block font-mono text-3xl font-black text-brutal-coral leading-none mb-2">
            #03
          </span>
          <h2 className="text-4xl font-black tracking-tight uppercase text-[var(--text-primary)]">
            Experience &amp; Leadership
          </h2>
        </div>

        {/* Stacked Row Grid Container within ScrollReveal */}
        <ScrollReveal>
          <div className="border-4 border-black dark:border-white bg-[var(--card)] shadow-neo divide-y-4 divide-black dark:divide-white overflow-hidden">
            {TIMELINE.map((item, index) => (
              <TimelineItem
                key={`${item.role}-${index}`}
                role={item.role}
                org={item.org}
                period={item.period}
                type={item.type}
                description={item.description}
                badge={item.badge}
              />
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
