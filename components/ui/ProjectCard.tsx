import { Github, ExternalLink } from "lucide-react";
import SkillTag from "./SkillTag";

interface ProjectCardProps {
  title: string;
  category: string;
  pitch: string;
  stack: string[];
  githubUrl: string;
  demoUrl?: string;
}

export default function ProjectCard({
  title,
  category,
  pitch,
  stack,
  githubUrl,
  demoUrl,
}: ProjectCardProps) {
  const primaryUrl = demoUrl || githubUrl;

  return (
    <div className="relative group bg-[var(--card)] border border-[var(--border)] rounded-lg p-5 flex flex-col justify-between h-full shadow-neo hover-brutal transition-all duration-200">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="font-mono text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
            {category}
          </span>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] mb-2">
          {/* Stretched link pattern for card accessibility */}
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus:outline-none after:absolute after:inset-0"
          >
            {title}
          </a>
        </h3>
        <p className="text-sm text-[var(--text-muted)] mb-5 leading-relaxed">
          {pitch}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
          {stack.map((tag) => (
            <SkillTag key={tag} label={tag} size="sm" />
          ))}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)] relative z-10">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border)] bg-[var(--canvas)] text-xs font-mono font-semibold text-[var(--text-primary)] rounded-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-150"
            aria-label={`View ${title} source code on GitHub`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>Code</span>
          </a>
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border)] bg-[var(--canvas)] text-xs font-mono font-semibold text-[var(--text-primary)] rounded-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-150"
              aria-label={`View ${title} live demo`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
