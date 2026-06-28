import { useEffect, useState, useRef } from "react";

export function useActiveSection(sectionIds: string[], threshold: number = 0) {
  const [activeSection, setActiveSection] = useState<string>("home");
  const isScrollingClick = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setActiveSectionWithLock = (id: string) => {
    // Lock observer updates during smooth scrolling
    isScrollingClick.current = true;
    setActiveSection(id);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Release lock after smooth scroll settles (1000ms)
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingClick.current = false;
    }, 1000);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -65% 0px", // focus vertical intersection on upper-middle part of screen
      threshold,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      // If we are currently scrolling due to a menu click, ignore observer updates
      if (isScrollingClick.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [sectionIds, threshold]);

  return [activeSection, setActiveSectionWithLock] as const;
}
