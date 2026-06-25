import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[], threshold: number = 0.3) {
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px", // focus observer in upper middle viewport area
      threshold,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
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
    };
  }, [sectionIds, threshold]);

  return activeSection;
}
