"use client";

import { useState } from "react";
import { AWARDS } from "@/lib/data";
import MetricBadge from "../ui/MetricBadge";
import { FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

export default function Achievements() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="achievements" className="py-20 border-t-4 border-black dark:border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="block font-mono text-3xl font-black text-brutal-coral leading-none mb-2">
            #05
          </span>
          <h2 className="text-4xl font-black tracking-tight uppercase text-[var(--text-primary)]">
            Achievements &amp; Publications
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Awards List with Staggered ScrollReveal */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h4 className="font-mono text-xs font-black tracking-widest text-brutal-coral uppercase mb-4">
              // elite recognition &amp; honors
            </h4>
            <div className="space-y-5">
              {(isExpanded ? AWARDS : AWARDS.slice(0, 3)).map((award, index) => (
                <ScrollReveal key={`award-wrapper-${index}`} delay={index * 100}>
                  <div
                    className="bg-[var(--card)] border-2 border-black dark:border-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-neo hover-brutal transition-all duration-150"
                  >
                    <div className="space-y-1 text-left">
                      <h5 className="font-bold text-[var(--text-primary)] text-base">
                        {award.title}
                      </h5>
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
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="font-mono text-xs font-bold tracking-widest uppercase bg-[var(--card)] text-[var(--text-primary)] border-2 border-black dark:border-white px-6 py-3.5 shadow-neo hover-brutal flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brutal-coral transition-all duration-150"
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
            <h4 className="font-mono text-xs font-black tracking-widest text-brutal-coral uppercase mb-4 text-left">
              // academic publications
            </h4>
            
            <ScrollReveal delay={200}>
              <div className="bg-[var(--card)] border-2 border-black dark:border-white p-6 shadow-neo hover-brutal flex flex-col justify-between h-full min-h-[300px] transition-all duration-150 text-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brutal-coral" />
                    <span className="font-mono text-[10px] text-black font-bold uppercase tracking-wider bg-brutal-cyan border-2 border-black px-2 py-0.5 shadow-neo-sm">
                      Research Article
                    </span>
                  </div>
                  <h5 className="text-lg font-bold text-[var(--text-primary)] leading-snug">
                    Mini-Vent - An Economical Miniaturized Intensive Care Unit System
                  </h5>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Published in the <span className="font-bold text-[var(--text-primary)]">International Research Journal of Engineering and Technology (IRJET)</span>. The paper explores how our intuitive, easy-to-use system and remote monitoring system addresses the urgent need for accessible respiratory support in overwhelmed healthcare facilities. We discuss the design process, implementation challenges and the potential impact of this technology in improving patient outcomes during global health crises.
                  </p>
                </div>

                <div className="pt-6 border-t-2 border-black dark:border-white mt-6">
                  <a
                    href="https://www.irjet.net/archives/V11/i6/IRJET-V11I6107.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white bg-[var(--canvas)] text-xs font-mono font-bold text-[var(--text-primary)] shadow-neo-sm hover:bg-brutal-coral hover:text-black hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-0 active:translate-y-0 active:shadow-neo-sm transition-all duration-150"
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
