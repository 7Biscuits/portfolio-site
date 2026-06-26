import { Suspense } from "react";
import { PROJECTS, GITHUB_USERNAME } from "@/lib/data";
import ProjectCard from "../ui/ProjectCard";
import ScrollReveal from "../ui/ScrollReveal";

export default function Projects() {
  const darkStatsUrl = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&title_color=00F2FE&icon_color=00F2FE&text_color=9CA3AF&bg_color=00000000&hide_border=true&v=1`;
  const lightStatsUrl = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&title_color=000000&icon_color=0284C7&text_color=000000&bg_color=00000000&hide_border=true&v=1`;

  const darkStreakUrl = `https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=transparent&ring=00F2FE&fire=FF6B6B&currStreakNum=00F2FE&sideNums=FFFFFF&currStreakLabel=FF6B6B&sideLabels=9CA3AF&dates=9CA3AF&hide_border=true&v=1`;
  const lightStreakUrl = `https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=transparent&ring=FF6B6B&fire=FF6B6B&currStreakNum=000000&sideNums=000000&currStreakLabel=FF6B6B&sideLabels=2D3748&dates=2D3748&hide_border=true&v=1`;

  const darkLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&title_color=00F2FE&text_color=9CA3AF&bg_color=00000000&hide_border=true&v=1`;
  const lightLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&title_color=000000&text_color=000000&bg_color=00000000&hide_border=true&v=1`;

  return (
    <section id="projects" className="py-20 border-t-4 border-black dark:border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="block font-mono text-3xl font-black text-brutal-coral leading-none mb-2">
            #04
          </span>
          <h2 className="text-4xl font-black tracking-tight uppercase text-[var(--text-primary)]">
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

        {/* Brutalist GitHub Stats & Contributions Container wrapped in ScrollReveal */}
        <ScrollReveal>
          <div className="border-4 border-black dark:border-white bg-[var(--card)] p-6 md:p-8 max-w-7xl mx-auto shadow-neo flex flex-col items-center justify-center">
            <h4 className="font-mono text-xs font-black tracking-widest text-brutal-coral uppercase mb-6 w-full text-left">
              // github developer analytics
            </h4>
            <Suspense fallback={<div className="h-48 flex items-center justify-center font-mono text-xs text-[var(--text-muted)] animate-pulse">Retrieving repository analytics...</div>}>
              <div className="w-full flex flex-col gap-8 items-center justify-center">
                
                {/* 3 Columns Grid for Stats Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
                  
                  {/* Card 1: Stats */}
                  <div className="border-2 border-black dark:border-white bg-[var(--canvas)] p-4 flex items-center justify-center shadow-neo-sm hover:translate-y-[-2px] transition-transform duration-150 min-h-[220px]">
                    {/* Dark mode stats */}
                    <img
                      src={darkStatsUrl}
                      alt="GitHub Stats"
                      loading="lazy"
                      className="hidden dark:block max-w-full h-auto"
                    />
                    {/* Light mode stats */}
                    <img
                      src={lightStatsUrl}
                      alt="GitHub Stats"
                      loading="lazy"
                      className="block dark:hidden max-w-full h-auto"
                    />
                  </div>

                  {/* Card 2: Streak */}
                  <div className="border-2 border-black dark:border-white bg-[var(--canvas)] p-4 flex items-center justify-center shadow-neo-sm hover:translate-y-[-2px] transition-transform duration-150 min-h-[220px]">
                    {/* Dark mode streak */}
                    <img
                      src={darkStreakUrl}
                      alt="GitHub Streak"
                      loading="lazy"
                      className="hidden dark:block max-w-full h-auto"
                    />
                    {/* Light mode streak */}
                    <img
                      src={lightStreakUrl}
                      alt="GitHub Streak"
                      loading="lazy"
                      className="block dark:hidden max-w-full h-auto"
                    />
                  </div>

                  {/* Card 3: Top Languages */}
                  <div className="border-2 border-black dark:border-white bg-[var(--canvas)] p-4 flex items-center justify-center shadow-neo-sm hover:translate-y-[-2px] transition-transform duration-150 min-h-[220px]">
                    {/* Dark mode languages */}
                    <img
                      src={darkLangsUrl}
                      alt="GitHub Top Languages"
                      loading="lazy"
                      className="hidden dark:block max-w-full h-auto"
                    />
                    {/* Light mode languages */}
                    <img
                      src={lightLangsUrl}
                      alt="GitHub Top Languages"
                      loading="lazy"
                      className="block dark:hidden max-w-full h-auto"
                    />
                  </div>

                </div>
                
                {/* Divider separator */}
                <div className="w-full border-t-2 border-black dark:border-white" />
                
                {/* Contribution Calendar */}
                <div className="w-full flex flex-col items-start gap-4">
                  <span className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    // activity calendar
                  </span>
                  <div className="w-full bg-[var(--canvas)] border-2 border-black dark:border-white p-4 overflow-x-auto flex justify-center items-center">
                    {/* Dark mode calendar - Neon Cyan */}
                    <img
                      src={`https://ghchart.rshah.org/00F2FE/${GITHUB_USERNAME}?v=1`}
                      alt={`${GITHUB_USERNAME}'s GitHub contributions calendar`}
                      loading="lazy"
                      className="hidden dark:block min-w-[700px] max-w-full h-auto"
                    />
                    {/* Light mode calendar - Coral Accent */}
                    <img
                      src={`https://ghchart.rshah.org/FF6B6B/${GITHUB_USERNAME}?v=1`}
                      alt={`${GITHUB_USERNAME}'s GitHub contributions calendar`}
                      loading="lazy"
                      className="block dark:hidden min-w-[700px] max-w-full h-auto"
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
