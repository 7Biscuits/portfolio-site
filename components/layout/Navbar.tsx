"use client";

import { useState, useEffect } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import ThemeToggle from "../ui/ThemeToggle";
import { Menu, X, Github, Linkedin, FileText } from "lucide-react";
import { GITHUB_USERNAME, LINKEDIN_URL, RESUME_PATH } from "@/lib/data";

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection(["home", ...NAV_ITEMS.map((item) => item.id)]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const element = document.getElementById(id);
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
      
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 bg-[var(--canvas)] border-b-4 border-black dark:border-white ${
        isScrolled ? "py-2.5 shadow-sm" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Boxed Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              className="inline-block border-2 border-black dark:border-white px-3 py-1 bg-[var(--card)] font-mono font-black text-sm tracking-tighter text-[var(--text-primary)] shadow-neo-sm hover-brutal select-none"
            >
              RU.DEV
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`font-mono text-xs font-bold tracking-widest transition-colors duration-150 uppercase py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brutal-coral px-2 ${
                  activeSection === item.id
                    ? "text-brutal-coral font-extrabold"
                    : "text-[var(--text-primary)] hover:text-brutal-coral"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Action Items */}
          <div className="hidden lg:flex items-center space-x-3.5">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-black dark:border-white p-2 bg-[var(--card)] text-[var(--text-primary)] shadow-neo-sm hover-brutal transition-all duration-150"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-black dark:border-white p-2 bg-[var(--card)] text-[var(--text-primary)] shadow-neo-sm hover-brutal transition-all duration-150"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <ThemeToggle />
            
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold tracking-wider uppercase border-2 border-black dark:border-white bg-[var(--card)] text-[var(--text-primary)] shadow-neo-sm hover-brutal px-4 py-2 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brutal-coral transition-all duration-150"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </a>
          </div>

          {/* Mobile Actions Container (Theme toggle & Hamburger) */}
          <div className="flex lg:hidden items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border-2 border-black dark:border-white bg-[var(--card)] text-[var(--text-primary)] shadow-neo-sm hover-brutal transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brutal-coral"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 top-[72px] bg-[var(--canvas)] border-b-4 border-black dark:border-white overflow-hidden transition-all duration-300 ease-in-out shadow-lg ${
          isOpen ? "max-h-[420px] opacity-100 py-6" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 space-y-4 flex flex-col items-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`font-mono text-sm font-bold tracking-widest uppercase transition-colors duration-150 py-1 ${
                activeSection === item.id
                  ? "text-brutal-coral"
                  : "text-[var(--text-primary)] hover:text-brutal-coral"
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* Divider */}
          <div className="w-16 h-px bg-black dark:bg-white" />

          {/* Mobile Socials */}
          <div className="flex items-center gap-4">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-black dark:border-white p-2 bg-[var(--card)] text-[var(--text-primary)] shadow-neo-sm hover-brutal"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-black dark:border-white p-2 bg-[var(--card)] text-[var(--text-primary)] shadow-neo-sm hover-brutal"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold tracking-wider uppercase border-2 border-black dark:border-white bg-[var(--card)] text-[var(--text-primary)] shadow-neo-sm hover-brutal px-4 py-2 flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
