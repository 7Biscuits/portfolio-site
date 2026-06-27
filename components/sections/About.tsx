"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SKILLS } from "@/lib/data";
import SkillTag from "../ui/SkillTag";
import ScrollReveal from "../ui/ScrollReveal";

const FOCUS_ITEMS = [
  "Developing and architecting the full-stack infrastructure for COBIT Labs’ BuildX platform. Actively implementing secure multi-role auth, a real-time Socket.io quiz engine, automated payment verification pipelines, and scalable & layered REST API.",
  "Refining core computer science fundamentals, advanced data structures, and algorithmic efficiency utilizing Java to optimize system-level problem-solving.",
  "Exploring LangChain to understand how autonomous AI agents and multi-agent systems work under the hood."
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % FOCUS_ITEMS.length);
        setIsFading(false);
      }, 300);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + FOCUS_ITEMS.length) % FOCUS_ITEMS.length);
      setIsFading(false);
    }, 300);
  };

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % FOCUS_ITEMS.length);
      setIsFading(false);
    }, 300);
  };

  return (
    <section id="about" className="py-20 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="block font-mono text-xs font-semibold text-neutral-600 dark:text-neutral-300 leading-none mb-2 tracking-widest uppercase">
            02 // ABOUT
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight uppercase text-[var(--text-primary)]">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Premium Bio Narrative & Mini-Ticker */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <ScrollReveal className="flex-shrink-0">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-neo space-y-6 text-left">
                <p className="text-base font-medium text-[var(--text-primary)] leading-relaxed">
                  An aspiring AI/software engineer focused on full-stack development, system design, and applied ML. Incoming CSE freshman looking for opportunities to work on something cool and innovative.
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  I enjoy building systems that connect the physical and digital worlds. Whether it's programming embedded controllers, integrating computer vision, or developing scalable backend services, I like working across the entire technology stack to turn ideas into reliable, real-world products.
                </p>
              </div>
            </ScrollReveal>

            {/* Currently Building Mini-Ticker Card */}
            <ScrollReveal delay={150} className="flex-grow flex flex-col mt-6">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-neo flex flex-col justify-between flex-grow text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-widest text-neutral-600 dark:text-neutral-300 uppercase">
                      // CURRENT_FOCUS
                    </span>
                    <div className="flex items-center gap-1">
                      {FOCUS_ITEMS.map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            activeIndex === i
                              ? "bg-black dark:bg-white w-3"
                              : "bg-neutral-300 dark:bg-neutral-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className={`transition-all duration-300 ease-in-out text-sm text-[var(--text-muted)] leading-relaxed min-h-[96px] ${isFading ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"}`}>
                    {FOCUS_ITEMS[activeIndex]}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[var(--border)] mt-2">
                  <span className="font-mono text-[10px] text-neutral-500 select-none">
                    0{activeIndex + 1} / 0{FOCUS_ITEMS.length}
                  </span>
                  <div className="flex items-center gap-2 select-none">
                    <button
                      onClick={handlePrev}
                      className="p-1 rounded border border-[var(--border)] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[var(--text-primary)] transition-colors"
                      aria-label="Previous focus item"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-1 rounded border border-[var(--border)] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[var(--text-primary)] transition-colors"
                      aria-label="Next focus item"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Stacked Skill Categories */}
          <div className="lg:col-span-7 space-y-6">
            {Object.entries(SKILLS).map(([category, skillList], index) => (
              <ScrollReveal key={category} delay={index * 100}>
                <div
                  className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 shadow-neo space-y-3 text-left"
                >
                  <h4 className="font-mono text-xs font-bold tracking-wider text-neutral-600 dark:text-neutral-300 uppercase">
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
