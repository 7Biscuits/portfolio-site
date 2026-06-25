import { BookOpen } from "lucide-react";
import SkillTag from "../ui/SkillTag";
import ScrollReveal from "../ui/ScrollReveal";

export default function Education() {
  const subjects = ["Physics", "Chemistry", "Mathematics", "English", "Computer Science", "Entrepreneurship"];

  return (
    <section id="education" className="py-20 border-t-4 border-black dark:border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="block font-mono text-3xl font-black text-brutal-coral leading-none mb-2">
            #06
          </span>
          <h2 className="text-4xl font-black tracking-tight uppercase text-[var(--text-primary)]">
            Education
          </h2>
        </div>

        {/* Brutalist Education Card inside ScrollReveal */}
        <ScrollReveal>
          <div className="bg-[var(--card)] border-4 border-black dark:border-white p-6 md:p-8 max-w-3xl shadow-neo hover-brutal transition-all duration-150 text-left">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="p-3 border-2 border-black bg-brutal-coral text-black shadow-neo-sm flex-shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    Sunbeam English School, Varanasi
                  </h3>
                  <p className="text-sm font-bold text-brutal-coral uppercase tracking-wider">
                    Central Board of Secondary Education (CBSE) // Class 12th
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 self-start sm:self-auto">
                <span className="inline-block font-mono text-xs font-bold bg-brutal-yellow text-black border-2 border-black px-2.5 py-1 shadow-neo-sm uppercase select-none">
                  High School Graduation
                </span>
              </div>
            </div>

            <div className="border-t-2 border-black dark:border-white pt-5">
              <h4 className="font-mono text-xs font-black tracking-widest text-brutal-coral uppercase mb-3.5">
                // curriculum &amp; subjects
              </h4>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <SkillTag key={subject} label={subject} />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
