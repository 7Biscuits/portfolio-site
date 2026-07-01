"use client";

import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { PROJECTS, GITHUB_USERNAME, PROJECT_DETAILS } from "@/lib/data";
import { X, Github, ExternalLink, Trophy, FileText } from "lucide-react";
import ProjectCard from "../ui/ProjectCard";
import ScrollReveal from "../ui/ScrollReveal";

const getYouTubeEmbedUrl = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const id = match && match[2].length === 11 ? match[2] : null;
  return id ? `https://www.youtube.com/embed/${id}` : "";
};

export default function Projects() {
  const [cacheBuster, setCacheBuster] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    // Generate a client-side cache buster changing every 15 minutes to guarantee auto-updates without API rate limits
    setCacheBuster(`&v=${Math.floor(Date.now() / (1000 * 60 * 15))}`);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomedImage((zoomed) => {
          if (zoomed) return null;
          setSelectedProject(null);
          return null;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const darkStatsUrl = `https://github-stats-extended.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&title_color=FFFFFF&icon_color=FFFFFF&text_color=A1A1AA&bg_color=00000000&hide_border=true&cache_seconds=1800${cacheBuster}`;
  const lightStatsUrl = `https://github-stats-extended.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&title_color=09090B&icon_color=09090B&text_color=71717A&bg_color=00000000&hide_border=true&cache_seconds=1800${cacheBuster}`;

  const darkStreakUrl = `https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=transparent&ring=FFFFFF&fire=FFFFFF&currStreakNum=FFFFFF&sideNums=FFFFFF&currStreakLabel=A1A1AA&sideLabels=A1A1AA&dates=71717A&hide_border=true&cache_seconds=1800${cacheBuster}`;
  const lightStreakUrl = `https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=transparent&ring=09090B&fire=09090B&currStreakNum=09090B&sideNums=09090B&currStreakLabel=71717A&sideLabels=71717A&dates=A1A1AA&hide_border=true&cache_seconds=1800${cacheBuster}`;

  const darkLangsUrl = `https://github-stats-extended.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&title_color=FFFFFF&text_color=A1A1AA&bg_color=00000000&hide_border=true&cache_seconds=1800${cacheBuster}`;
  const lightLangsUrl = `https://github-stats-extended.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&title_color=09090B&text_color=71717A&bg_color=00000000&hide_border=true&cache_seconds=1800${cacheBuster}`;

  const project = PROJECTS.find((p) => p.title === selectedProject);
  const details = selectedProject ? PROJECT_DETAILS[selectedProject] : null;

  return (
    <section id="projects" className="py-20 scroll-mt-24 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="block font-mono text-xs font-semibold text-neutral-600 dark:text-neutral-300 leading-none mb-2 tracking-widest uppercase">
            04 // PROJECTS
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight uppercase text-[var(--text-primary)]">
            Featured Projects
          </h2>
        </div>

        {/* Detailed Expanded Panel or Normal Grid */}
        {selectedProject && project && details ? (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 md:p-8 shadow-neo text-left relative animate-in fade-in slide-in-from-bottom-4 duration-300 mb-16 space-y-8">
            
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 font-mono text-xs font-bold tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 p-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
              aria-label="Close project view"
            >
              <span>[ ESCAPE //</span>
              <X className="w-3.5 h-3.5" />
              <span>]</span>
            </button>

            {/* Header Details */}
            <div className="pr-12">
              <span className="block font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">
                {project.category} {"// PROJECT_DETAIL"}
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
                {project.title}
              </h3>
              <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-4xl">
                {project.tagline}
              </p>
            </div>

            {/* Meta Section (Tech stack & actions in a responsive row) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-b border-[var(--border)] py-6">
              {/* Tech Stack */}
              <div className="space-y-2">
                <span className="block font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  {"// TECH_STACK"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-[var(--border)] px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Actions */}
              <div className="flex items-center gap-3 self-start md:self-center flex-shrink-0">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 border border-[var(--border)] bg-[var(--canvas)] text-xs font-mono font-semibold text-[var(--text-primary)] rounded-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-150 shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>Repository</span>
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 border border-[var(--border)] bg-[var(--canvas)] text-xs font-mono font-semibold text-[var(--text-primary)] rounded-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-150 shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
                {details.paperUrl && (
                  <a
                    href={details.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 border border-[var(--border)] bg-[var(--canvas)] text-xs font-mono font-semibold text-[var(--text-primary)] rounded-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-150 shadow-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Read Paper</span>
                  </a>
                )}
              </div>
            </div>

            {/* Recognitions (Awards) - Compact horizontal cards banner */}
            {details.recognitions && details.recognitions.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-mono text-[10px] font-bold tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>{"// RECOGNITION"}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                  {details.recognitions.map((award, i) => {
                    const [badge, rest] = award.includes(" — ") ? award.split(" — ") : [null, award];
                    return (
                      <div 
                        key={i} 
                        className="bg-[var(--canvas)] border border-[var(--border)] rounded-lg p-4 flex gap-3 items-start shadow-sm"
                      >
                        {badge && (
                          <span className="font-mono text-[9px] font-extrabold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded flex-shrink-0">
                            {badge}
                          </span>
                        )}
                        <span className="text-xs font-medium text-[var(--text-primary)]/90 leading-relaxed">
                          {rest}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Project Highlights (Grid Layout) */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                {"// ENGINEERING_HIGHLIGHTS"}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {details.highlights.map((highlight, index) => (
                  <div 
                    key={index} 
                    className="bg-[var(--canvas)] border border-[var(--border)] rounded-xl p-5 flex flex-col justify-between shadow-sm space-y-4 text-left"
                  >
                    {/* Highlight Text */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-neutral-400 select-none">
                          {`0${index + 1} //`}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-primary)]/90 leading-relaxed font-medium">
                        {highlight.bullet}
                      </p>
                    </div>

                    {/* Associated Figure Image */}
                    {highlight.image && (
                      <div className="border border-[var(--border)] rounded-lg bg-[var(--card)] overflow-hidden p-1 shadow-sm mt-auto">
                        <div 
                          className="relative aspect-[16/9] w-full cursor-zoom-in group/img"
                          onClick={() => setZoomedImage(highlight.image!)}
                        >
                          <Image
                            src={highlight.image}
                            alt={`Figure ${index + 1} for ${project.title}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover rounded-md hover:scale-[1.015] transition-transform duration-200"
                          />
                        </div>
                        <div className="bg-[var(--card)] px-3 py-2 border-t border-[var(--border)] flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] select-none">
                          <span>{`[ Fig 1.${index} ]`}</span>
                          <span>
                            {project.title === "Mini-ICU"
                              ? (index === 0 
                                  ? "Hardware Assembly" 
                                  : index === 1 
                                    ? "Open Chassis Layout" 
                                    : "Telemetry Dashboard")
                              : project.title === "BuildX"
                                ? (index === 0
                                    ? "Backend Architecture"
                                    : index === 1
                                      ? "Real-Time Sync Engine"
                                      : "Operational Console")
                                : project.title === "Tube.ai"
                                  ? (index === 0
                                      ? "Workflow Engine"
                                      : "User Dashboard")
                                  : "System Architecture"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Playable Video Embed */}
                    {highlight.videoUrl && (
                      <div className="border border-[var(--border)] rounded-lg bg-[var(--card)] overflow-hidden p-1 shadow-sm mt-auto">
                        <div className="relative aspect-[16/9] w-full bg-black">
                          <iframe
                            src={getYouTubeEmbedUrl(highlight.videoUrl)}
                            title={`Demo Video for ${project.title}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full rounded-md"
                          />
                        </div>
                        <div className="bg-[var(--card)] px-3 py-2 border-t border-[var(--border)] flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] select-none">
                          <span>{`[ Video demo ]`}</span>
                          <span>Playable Walkthrough</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Projects Grid with Staggered Delays */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {PROJECTS.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 150}>
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  pitch={project.tagline}
                  stack={project.stack}
                  githubUrl={project.githubUrl}
                  demoUrl={project.demoUrl}
                  onClick={() => setSelectedProject(project.title)}
                />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Premium GitHub Stats & Contributions Container wrapped in ScrollReveal */}
        <ScrollReveal>
          <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-6 md:p-8 max-w-7xl mx-auto shadow-neo flex flex-col items-center justify-center">
            <h3 className="font-mono text-xs font-bold tracking-widest text-neutral-600 dark:text-neutral-300 uppercase mb-6 w-full text-left">
              {"// github developer analytics"}
            </h3>
            <Suspense fallback={<div className="h-48 flex items-center justify-center font-mono text-xs text-[var(--text-muted)] animate-pulse">Retrieving repository analytics...</div>}>
              <div className="w-full flex flex-col gap-8 items-center justify-center">
                
                {/* 3 Columns Grid for Stats Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
                  
                  {/* Card 1: Stats */}
                  <div className="border border-[var(--border)] rounded-lg bg-[var(--canvas)] p-4 flex items-center justify-center shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-200 min-h-[220px]">
                    {/* Dark mode stats */}
                    <Image
                      src={darkStatsUrl}
                      alt="GitHub Stats"
                      width={495}
                      height={195}
                      unoptimized
                      loading="lazy"
                      className="hidden dark:block max-w-full h-auto"
                    />
                    {/* Light mode stats */}
                    <Image
                      src={lightStatsUrl}
                      alt="GitHub Stats"
                      width={495}
                      height={195}
                      unoptimized
                      loading="lazy"
                      className="block dark:hidden max-w-full h-auto"
                    />
                  </div>

                  {/* Card 2: Streak */}
                  <div className="border border-[var(--border)] rounded-lg bg-[var(--canvas)] p-4 flex items-center justify-center shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-200 min-h-[220px]">
                    {/* Dark mode streak */}
                    <Image
                      src={darkStreakUrl}
                      alt="GitHub Streak"
                      width={495}
                      height={195}
                      unoptimized
                      loading="lazy"
                      className="hidden dark:block max-w-full h-auto"
                    />
                    {/* Light mode streak */}
                    <Image
                      src={lightStreakUrl}
                      alt="GitHub Streak"
                      width={495}
                      height={195}
                      unoptimized
                      loading="lazy"
                      className="block dark:hidden max-w-full h-auto"
                    />
                  </div>

                  {/* Card 3: Top Languages */}
                  <div className="border border-[var(--border)] rounded-lg bg-[var(--canvas)] p-4 flex items-center justify-center shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all duration-200 min-h-[220px]">
                    {/* Dark mode languages */}
                    <Image
                      src={darkLangsUrl}
                      alt="GitHub Top Languages"
                      width={495}
                      height={195}
                      unoptimized
                      loading="lazy"
                      className="hidden dark:block max-w-full h-auto"
                    />
                    {/* Light mode languages */}
                    <Image
                      src={lightLangsUrl}
                      alt="GitHub Top Languages"
                      width={495}
                      height={195}
                      unoptimized
                      loading="lazy"
                      className="block dark:hidden max-w-full h-auto"
                    />
                  </div>

                </div>
                
                {/* Divider separator */}
                <div className="w-full border-t border-[var(--border)]" />
                
                {/* Contribution Calendar */}
                <div className="w-full flex flex-col items-start gap-4">
                  <span className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    {"// activity calendar"}
                  </span>
                  <div className="w-full bg-[var(--canvas)] border border-[var(--border)] rounded-lg p-4 overflow-x-auto flex justify-start lg:justify-center items-center scrollbar-thin">
                    {/* Dark mode calendar - Inverted Zinc Contributions */}
                    <Image
                      src={`https://ghchart.rshah.org/18181b/${GITHUB_USERNAME}?v=1${cacheBuster}`}
                      alt={`${GITHUB_USERNAME}'s GitHub contributions calendar`}
                      width={700}
                      height={112}
                      unoptimized
                      loading="lazy"
                      className="hidden dark:block w-[700px] max-w-none lg:max-w-full h-auto invert"
                    />
                    {/* Light mode calendar - Zinc 900 Contributions */}
                    <Image
                      src={`https://ghchart.rshah.org/18181b/${GITHUB_USERNAME}?v=1${cacheBuster}`}
                      alt={`${GITHUB_USERNAME}'s GitHub contributions calendar`}
                      width={700}
                      height={112}
                      unoptimized
                      loading="lazy"
                      className="block dark:hidden w-[700px] max-w-none lg:max-w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </Suspense>
          </div>
        </ScrollReveal>

      </div>

      {/* Enlarged Image Lightbox Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setZoomedImage(null)}
          aria-modal="true"
          role="dialog"
        >
          <span className="font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-4 select-none animate-in fade-in slide-in-from-top-2 duration-300">
            [ CLICK ANYWHERE TO CLOSE // ESC ]
          </span>
          <div 
            className="relative max-w-[90vw] max-h-[80vh] w-full h-full flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="relative aspect-[16/9] w-full max-w-4xl max-h-[75vh] border border-neutral-800 rounded-lg overflow-hidden bg-black shadow-2xl animate-in zoom-in-95 duration-200 cursor-default"
              onClick={() => setZoomedImage(null)}
            >
              <Image
                src={zoomedImage}
                alt="Enlarged Project Figure View"
                fill
                sizes="100vw"
                className="object-contain cursor-zoom-out"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
