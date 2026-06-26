import { SKILLS } from "@/lib/data";
import SkillTag from "../ui/SkillTag";
import ScrollReveal from "../ui/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="py-20 border-t-4 border-black dark:border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="block font-mono text-3xl font-black text-brutal-coral leading-none mb-2">
            #02
          </span>
          <h2 className="text-4xl font-black tracking-tight uppercase text-[var(--text-primary)]">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Boxed Bio Narrative */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="bg-[var(--card)] border-2 border-black dark:border-white p-6 shadow-neo space-y-6">
                <p className="text-base font-medium text-[var(--text-primary)] leading-relaxed">
                  An aspiring AI/software engineer focused on full-stack development, system design, and applied ML. Incoming CSE freshman looking for opportunities to work on something cool and innovative.
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  I enjoy building systems that connect the physical and digital worlds. Whether it's programming embedded controllers, integrating computer vision, or developing scalable backend services, I like working across the entire technology stack to turn ideas into reliable, real-world products.

                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Stacked Skill Categories with Staggered Delays */}
          <div className="lg:col-span-7 space-y-6">
            {Object.entries(SKILLS).map(([category, skillList], index) => (
              <ScrollReveal key={category} delay={index * 100}>
                <div
                  className="bg-[var(--card)] border-2 border-black dark:border-white p-5 shadow-neo space-y-3 text-left"
                >
                  <h4 className="font-mono text-xs font-black tracking-wider text-brutal-coral uppercase">
                    // {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <SkillTag key={skill} label={skill} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
