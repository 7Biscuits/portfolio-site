import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";

// Dynamically import below-the-fold sections to optimize Largest Contentful Paint (LCP)
const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <div className="h-80 bg-[var(--card)]/20 border border-[var(--border)] rounded-xl animate-pulse my-8" />,
});

const Projects = dynamic(() => import("@/components/sections/Projects"), {
  loading: () => <div className="h-96 bg-[var(--card)]/20 border border-[var(--border)] rounded-xl animate-pulse my-8" />,
});

const Experience = dynamic(() => import("@/components/sections/Experience"), {
  loading: () => <div className="h-96 bg-[var(--card)]/20 border border-[var(--border)] rounded-xl animate-pulse my-8" />,
});

const Achievements = dynamic(() => import("@/components/sections/Achievements"), {
  loading: () => <div className="h-80 bg-[var(--card)]/20 border border-[var(--border)] rounded-xl animate-pulse my-8" />,
});

const Education = dynamic(() => import("@/components/sections/Education"), {
  loading: () => <div className="h-40 bg-[var(--card)]/20 border border-[var(--border)] rounded-xl animate-pulse my-8" />,
});

const ApiPlayground = dynamic(() => import("@/components/sections/ApiPlayground"), {
  loading: () => <div className="h-96 bg-[var(--card)]/20 border border-[var(--border)] rounded-xl animate-pulse my-8" />,
});

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <div className="h-96 bg-[var(--card)]/20 border border-[var(--border)] rounded-xl animate-pulse my-8" />,
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <About />
          <Experience />
          <Projects />
          <Achievements />
          <Education />
          <ApiPlayground />
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}
