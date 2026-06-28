"use client";

import { useState } from "react";
import { AWARDS } from "@/lib/data";
import MetricBadge from "../ui/MetricBadge";
import { FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

export default function Achievements() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="achievements" className="py-20 scroll-mt-24 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="block font-mono text-xs font-semibold text-neutral-600 dark:text-neutral-300 leading-none mb-2 tracking-widest uppercase">
            05 // ACHIEVEMENTS
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight uppercase text-[var(--text-primary)]">
            Achievements &amp; Publications
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Awards List with Staggered ScrollReveal */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="font-mono text-xs font-bold tracking-widest text-neutral-600 dark:text-neutral-300 uppercase mb-4">
              {"// elite recognition & honors"}
            </h3>
            <div className="space-y-5">
              {(isExpanded ? AWARDS : AWARDS.slice(0, 3)).map((award, index) => (
                <ScrollReveal key={`award-wrapper-${index}`} delay={index * 100}>
                  <div
                    className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-neo hover-brutal transition-all duration-200"
                  >
                    <div className="space-y-1 text-left">
                      <h4 className="font-bold text-[var(--text-primary)] text-base">
                        {award.title}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {award.context}
                      </p>
                    </div>
                    <div className="flex-shrink-0 self-start sm:self-auto">
                      <MetricBadge label={award.badge} variant={award.badge == "Winner" ? "cyan" : "coral"} />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {AWARDS.length > 3 && (
              <div className="flex justify-start pt-2">
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="font-mono text-xs font-bold tracking-widest uppercase border border-[var(--border)] bg-[var(--card)] text-[var(--text-primary)] hover:bg-neutral-50 dark:hover:bg-neutral-900 px-6 py-3.5 rounded-md flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 transition-colors duration-150"
                >
                  {isExpanded ? (
                    <>
                      Show Less <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Read More <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Research Publications wrapped in ScrollReveal */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-mono text-xs font-bold tracking-widest text-neutral-600 dark:text-neutral-300 uppercase mb-4 text-left">
              {"// academic publications"}
            </h3>
            
            <ScrollReveal delay={200}>
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-neo hover-brutal flex flex-col justify-between h-full min-h-[300px] transition-all duration-200 text-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-neutral-500" />
                    <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-300 font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 border border-[var(--border)] px-2 py-0.5 rounded">
                      Research Article
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] leading-snug">
                    Mini-Vent - An Economical Miniaturized Intensive Care Unit System
                  </h4>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Published in the <span className="font-bold text-[var(--text-primary)]">International Research Journal of Engineering and Technology (IRJET)</span>. The paper explores how our intuitive, easy-to-use system and remote monitoring system addresses the urgent need for accessible respiratory support in overwhelmed healthcare facilities. We discuss the design process, implementation challenges and the potential impact of this technology in improving patient outcomes during global health crises.
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--border)] mt-6">
                  <a
                    href="https://www.irjet.net/archives/V11/i6/IRJET-V11I6107.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border)] bg-[var(--canvas)] text-xs font-mono font-semibold text-[var(--text-primary)] rounded-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-150"
                    aria-label="Read Mini-Vent research paper on IRJET"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Read Paper on IRJET</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
