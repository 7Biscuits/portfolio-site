"use client";

import { Mail, ArrowRight, Github, Linkedin, FileText } from "lucide-react";
import ScrollMarquee from "../ui/ScrollMarquee";
import { GITHUB_USERNAME, LINKEDIN_URL, RESUME_PATH, MARQUEE_ITEMS } from "@/lib/data";

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
              {/* Refined clean tagline */}
              <span className="inline-block font-mono text-sm font-semibold tracking-widest text-neutral-600 dark:text-neutral-300 uppercase mb-4 select-none">
                HI, I AM
              </span>

              {/* Massive Modern Header */}
              <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-[var(--text-primary)] leading-[0.9] select-none space-y-1">
                <span className="block">
                  RUDRANSH
                </span>
                <span className="block">
                  SRIVASTAVA<span className="text-neutral-400 font-black">;</span>
                </span>
              </h1>
            </div>

            {/* Subheadline marker */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 py-1">
                <span className="font-mono text-sm sm:text-base font-bold tracking-widest text-[var(--text-primary)] uppercase select-none">
                  // FULL-STACK DEVELOPER &amp; IOT ENGINEER
                </span>
              </div>
              <p className="font-mono text-sm tracking-wide text-[var(--text-muted)] max-w-2xl leading-relaxed">
                Specializing in building hardware-software integrations, applied machine learning systems, and high-performance backend servers.
              </p>
            </div>

            {/* Tactical Actions row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 relative z-10">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="font-mono text-xs font-bold tracking-widest uppercase bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100 px-6 py-3.5 rounded-md flex items-center gap-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="font-mono text-xs font-bold tracking-widest uppercase border border-[var(--border)] bg-[var(--card)] text-[var(--text-primary)] hover:bg-neutral-50 dark:hover:bg-neutral-900 px-6 py-3.5 rounded-md flex items-center gap-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </a>

              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs font-bold tracking-widest uppercase border border-[var(--border)] bg-[var(--card)] text-[var(--text-primary)] hover:bg-neutral-50 dark:hover:bg-neutral-900 px-6 py-3.5 rounded-md flex items-center gap-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
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
                  className="p-3 border border-[var(--border)] bg-[var(--card)] text-neutral-500 hover:text-[var(--text-primary)] hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-md transition-colors duration-150"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-[var(--border)] bg-[var(--card)] text-neutral-500 hover:text-[var(--text-primary)] hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-md transition-colors duration-150"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Premium Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] h-[370px] sm:max-w-[380px] sm:h-[435px] border border-[var(--border)] bg-[var(--card)] p-4 rounded-xl shadow-lg flex flex-col justify-between hover:scale-[1.01] hover:shadow-xl transition-all duration-300 select-none">
              
              {/* Image panel: developer avatar (full color) */}
              <div className="relative w-full h-[280px] sm:h-[340px] bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden border border-[var(--border)] flex flex-col items-center justify-center">
                <img
                  src="/avatar.jpeg"
                  alt="Rudransh Srivastava"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-0.5 font-mono text-[9px] uppercase font-bold tracking-wider rounded">
                  7Biscuits // dev
                </div>

                {/* Tech grid overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/5 pointer-events-none" />
              </div>

              {/* Monospace signature caption */}
              <div className="text-center pt-2">
                <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-neutral-600 dark:text-neutral-300 uppercase block">
                  RUDRANSH // IMG.2026
                </span>
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
