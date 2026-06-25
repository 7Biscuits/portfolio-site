"use client";

import { Mail, ArrowRight, Github, Linkedin, ExternalLink, FileText } from "lucide-react";
import ScrollMarquee from "../ui/ScrollMarquee";
import { GITHUB_USERNAME, LINKEDIN_URL, EMAIL_ADDRESS, MARQUEE_ITEMS, RESUME_PATH } from "@/lib/data";

export default function Hero() {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("projects");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", "#projects");
    }
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", "#contact");
    }
  };

  return (
    <section id="home" className="pt-28 lg:pt-36 pb-12 flex flex-col justify-between min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex items-center py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          
          {/* Left Column: Bold Copy Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div>
              {/* Boxed Coral Header tag */}
              <span className="inline-block font-mono text-2xl font-bold bg-border-dark text-black border-2 border-black dark:border-white px-3 py-1 shadow-neo-sm uppercase mb-6 select-none">
                Hi, I am
              </span>

              {/* Massive Brutalist Header */}
              <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-[var(--text-primary)] leading-[0.9] select-none space-y-1">
                <span className="block">
                  RUDRANSH<span className="text-brutal-coral font-black">*</span>
                </span>
                <span className="block">SRIVASTAVA</span>
              </h1>
            </div>

            {/* Subheadline marker */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-l-4 border-black dark:border-white pl-4 py-1">
                <span className="font-mono text-sm sm:text-base font-extrabold tracking-widest text-[var(--text-primary)] uppercase select-none">
                  // FULL-STACK DEVELOPER &amp; IOT ENGINEER
                </span>
              </div>
              <p className="font-mono text-sm tracking-wide text-[var(--text-muted)] max-w-2xl leading-relaxed">
                Specializing in building hardware-software integrations, applied machine learning systems, and high-performance server backends.
              </p>
            </div>

            {/* Tactical Actions row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 relative z-10">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="font-mono text-xs font-bold tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white px-6 py-3.5 shadow-neo hover-brutal flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brutal-cyan transition-all duration-150"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="font-mono text-xs font-bold tracking-widest uppercase bg-[var(--card)] text-[var(--text-primary)] border-2 border-black dark:border-white px-6 py-3.5 shadow-neo hover-brutal flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brutal-coral transition-all duration-150"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </a>

              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-bold tracking-widest uppercase bg-[var(--card)] text-[var(--text-primary)] border-2 border-black dark:border-white px-6 py-3.5 shadow-neo hover-brutal flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brutal-yellow transition-all duration-150"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>

              {/* Social icons row */}
              <div className="flex items-center space-x-3">
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border-2 border-black dark:border-white bg-[var(--card)] text-[var(--text-primary)] shadow-neo hover-brutal transition-all duration-150"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border-2 border-black dark:border-white bg-[var(--card)] text-[var(--text-primary)] shadow-neo hover-brutal transition-all duration-150"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Polaroid Picture Frame */}
          <div className="lg:col-span-5 flex justify-center">
            {/* Tilted picture frame wrappers */}
            <div className="relative w-80 h-[370px] sm:w-[360px] sm:h-[420px]">
              
              {/* Back Layer 1: Cyan Sheet */}
              <div className="absolute inset-0 border-2 border-black dark:border-white bg-brutal-cyan translate-x-[-12px] translate-y-[8px] rotate-[-3deg] pointer-events-none" />
              
              {/* Back Layer 2: Yellow Sheet */}
              <div className="absolute inset-0 border-2 border-black dark:border-white bg-brutal-yellow translate-x-[8px] translate-y-[-10px] rotate-[3deg] pointer-events-none" />

              {/* Back Layer 3: Coral Sheet */}
              <div className="absolute inset-0 border-2 border-black dark:border-white bg-brutal-coral translate-x-[-4px] translate-y-[-4px] rotate-[-1deg] pointer-events-none" />

              {/* Front Main Polaroid Frame: Pure white card (black borders always) */}
              <div className="absolute inset-0 border-2 border-black bg-white text-black p-4 pb-14 shadow-neo flex flex-col justify-between rotate-[1.5deg] hover:rotate-0 hover:scale-105 hover:shadow-neo-lg transition-all duration-300 select-none">
                
                {/* Image panel: developer avatar (full color) */}
                <div className="relative w-full h-[260px] sm:h-[310px] bg-[#EBEBEB] border-2 border-black flex flex-col items-center justify-center overflow-hidden">
                  <img
                    src="/avatar.jpeg"
                    alt="Rudransh Srivastava"
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute top-3 left-3 bg-black text-white px-2 py-0.5 font-mono text-[9px] uppercase font-bold tracking-wider">
                    7Biscuits // dev
                  </div>

                  {/* Tech grid overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/5 pointer-events-none" />
                </div>

                {/* Hand-written / Monospace signature caption */}
                <div className="text-center pt-3">
                  <span className="font-mono text-[10px] font-black tracking-[0.25em] text-neutral-800 uppercase block">
                    RUDRANSH // IMG.2026
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Marquee Banner */}
      <div className="w-full mt-16 relative z-10">
        <ScrollMarquee items={MARQUEE_ITEMS} />
      </div>
    </section>
  );
}
