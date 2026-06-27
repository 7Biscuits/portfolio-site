import { BookOpen } from "lucide-react";
import SkillTag from "../ui/SkillTag";
import ScrollReveal from "../ui/ScrollReveal";

export default function Education() {
  const subjects = ["Physics", "Chemistry", "Mathematics", "English", "Computer Science", "Entrepreneurship"];

  return (
    <section id="education" className="py-20 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="block font-mono text-xs font-semibold text-neutral-600 dark:text-neutral-300 leading-none mb-2 tracking-widest uppercase">
            06 // EDUCATION
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight uppercase text-[var(--text-primary)]">
            Education
          </h2>
        </div>

        {/* Premium Education Card inside ScrollReveal */}
        <ScrollReveal>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 md:p-8 max-w-3xl shadow-neo hover-brutal transition-all duration-200 text-left">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="p-3 border border-[var(--border)] rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[var(--text-primary)] flex-shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    Sunbeam English School, Varanasi
                  </h3>
                  <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                    Central Board of Secondary Education (CBSE) // Class 12th
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 self-start sm:self-auto">
                <span className="inline-block font-mono text-xs font-medium bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] px-2.5 py-1 rounded shadow-sm uppercase select-none">
                  High School Graduation
                </span>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-5">
              <h4 className="font-mono text-xs font-bold tracking-widest text-neutral-600 dark:text-neutral-300 uppercase mb-3.5">
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
