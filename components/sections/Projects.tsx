"use client";

import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { PROJECTS, GITHUB_USERNAME } from "@/lib/data";
import ProjectCard from "../ui/ProjectCard";
import ScrollReveal from "../ui/ScrollReveal";

export default function Projects() {
  const [cacheBuster, setCacheBuster] = useState("");

  useEffect(() => {
    // Generate a client-side cache buster changing every 15 minutes to guarantee auto-updates without API rate limits
    setCacheBuster(`&v=${Math.floor(Date.now() / (1000 * 60 * 15))}`);
  }, []);

  const darkStatsUrl = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&title_color=FFFFFF&icon_color=FFFFFF&text_color=A1A1AA&bg_color=00000000&hide_border=true&cache_seconds=1800${cacheBuster}`;
  const lightStatsUrl = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&title_color=09090B&icon_color=09090B&text_color=71717A&bg_color=00000000&hide_border=true&cache_seconds=1800${cacheBuster}`;

  const darkStreakUrl = `https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=transparent&ring=FFFFFF&fire=FFFFFF&currStreakNum=FFFFFF&sideNums=FFFFFF&currStreakLabel=A1A1AA&sideLabels=A1A1AA&dates=71717A&hide_border=true&cache_seconds=1800${cacheBuster}`;
  const lightStreakUrl = `https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=transparent&ring=09090B&fire=09090B&currStreakNum=09090B&sideNums=09090B&currStreakLabel=71717A&sideLabels=71717A&dates=A1A1AA&hide_border=true&cache_seconds=1800${cacheBuster}`;

  const darkLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&title_color=FFFFFF&text_color=A1A1AA&bg_color=00000000&hide_border=true&cache_seconds=1800${cacheBuster}`;
  const lightLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&title_color=09090B&text_color=71717A&bg_color=00000000&hide_border=true&cache_seconds=1800${cacheBuster}`;

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

        {/* Projects Grid with Staggered Delays */}
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
              />
            </ScrollReveal>
          ))}
        </div>

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
    </section>
  );
}
