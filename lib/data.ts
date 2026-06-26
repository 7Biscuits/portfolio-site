export interface Project {
  title: string;
  tagline: string;
  category: string;
  stack: string[];
  githubUrl: string;
  demoUrl?: string;
}

export interface TimelineEntry {
  role: string;
  org: string;
  period: string;
  type: 'professional' | 'leadership';
  description: string;
  badge?: string;
}

export interface Award {
  badge: 'Winner' | 'Runner-Up' | string;
  title: string;
  context: string;
}

export const GITHUB_USERNAME = "7Biscuits";
export const LINKEDIN_URL = "https://www.linkedin.com/in/rudransh-srivastav/";
export const RESUME_PATH = "/resume.pdf";
export const EMAIL_ADDRESS = "rudranshsrivastava2525@gmail.com";
export const PHONE_NUMBER = "+91 7307272671";

export const PROJECTS: Project[] = [
  {
    title: "Mini-ICU",
    category: "IoT & Healthcare",
    tagline: "An Economical Miniaturized Intensive Care Unit System along with a remote vital-monitoring system.",
    stack: ["NodeMCU", "IoT", "C++", "Express.js", "MongoDB", "Expo", "REST APIs"],
    githubUrl: "https://github.com/7Biscuits/Mini-ICU/",
  },
  {
    title: "Eye-Blink",
    category: "Computer Vision",
    tagline: "Real-time driver drowsiness detection with Raspberry Pi + ABS integration",
    stack: ["Python", "OpenCV", "Raspberry Pi", "Hardware Integration"],
    githubUrl: "https://github.com/7Biscuits/eye-blink",
  },
  {
    title: "Kala-Kriti",
    category: "IoT & Environment",
    tagline: "Intelligent exhaust monitoring system for reducing vehicle carbon emissions",
    stack: ["NodeMCU", "IoT", "C++", "Express.js", "MongoDB", "React.js"],
    githubUrl: "https://github.com/7Biscuits/Kala-Kriti/",
  },
  {
    title: "Tube.ai",
    category: "AI & NLP",
    tagline: "YouTube summarization bot — transcribe and chat with video content",
    stack: ["LangChain RAG", "OpenAI Whisper", "GPT-3.5", "TypeScript"],
    githubUrl: "https://github.com/7Biscuits/Tube.ai",
  }
];

export const TIMELINE: TimelineEntry[] = [
  {
    role: "Co-founder & President",
    org: "Hack Club, SBS BGN",
    period: "Jun 2022 – Feb 2025",
    type: "leadership",
    description: "Founded and led the city's inaugural Hack Club, building a vibrant coding community and guiding over 1,000 students in web dev and coding initiatives.",
    badge: "1,000+ students",
  },
  {
    role: "Co-founder & CTO",
    org: "Stellar Scholar, STEM Club",
    period: "Mar 2024 – Feb 2025",
    type: "leadership",
    description: "Organized local science expositions, hackathons, and built community platforms to foster hands-on STEM education.",
    badge: "Co-founded STEM Club",
  },
  {
    role: "Head Boy",
    org: "Student Council, SBS BGN",
    period: "Jun 2023 – Mar 2024",
    type: "leadership",
    description: "Represented the student body of over 3,000 students, coordinated major school events, and served as intermediary between administration and students.",
  },
  {
    role: "Project Evaluator & Executive Intern",
    org: "ThinkStartup, Youth Ideathon",
    period: "Aug 2023 – Nov 2024",
    type: "professional",
    description: "Evaluated high school startup pitches across India, managed community outreach, and coordinated regional bootcamps.",
    badge: "Executive Intern",
  },
  {
    role: "Full-Stack Web Dev Intern",
    org: "Luzeblaze",
    period: "Dec 2023 - Feb 2024",
    type: "professional",
    description: "Developed production web features, optimized REST APIs, and received the Best Intern Award out of a cohort of 200+ interns.",
    badge: "Best Intern Award",
  }
];

export const AWARDS: Award[] = [
  {
    badge: "Winner",
    title: "Inspire Awards MANAK",
    context: "Intel & DST, India. Selected for national honors from over 10 Lakh+ nominations across India for outstanding tech innovation.",
  },
  {
    badge: "Winner",
    title: "Think Startup Youth Ideathon 2022",
    context: "Held at IIT Delhi. Selected among 90,000+ participants.",
  },
  {
    badge: "Runner-Up",
    title: "Unfold 2023",
    context: "OKTO track - CoinDCX multi-chain Hackathon @ KTPO Bangalore with 1,000+ participants.",
  },
  {
    badge: "Winner",
    title: "HACK JKLU",
    context: "Hackathon @ JK Lakshmipat University with 1,000+ participants.",
  },
  {
    badge: "3rd Place",
    title: "TCL B-Plan Competition",
    context: "Think Startup @ Prometheus School out of 3,500+ participants.",
  },
  {
    badge: "Winner",
    title: "ATL Marathon 2023-24",
    context: "Niti Aayog, GoI. Placed in the top 500 out of over 20,000 entries.",
  },
  {
    badge: "Finalist",
    title: "Vivo Ignite 2023",
    context: "Top 200 Teams out of 19,000+ teams.",
  },
  {
    badge: "Winner",
    title: "Innovate4Impact Smart City Challenge",
    context: "La Trobe University, Australia. Awarded for developing smart urban carbon monitoring and emission control.",
  },
  {
    badge: "1st Place",
    title: "Teenovations",
    context: "Robotics model making with computer scraps @ COFAS, CMS Lucknow.",
  },
  {
    badge: "Best Intern",
    title: "Best Intern Award by Luneblaze",
    context: "Surpassed over 200 interns in full-stack web development.",
  }
];

export const SKILLS: Record<string, string[]> = {
  "Languages": ["Python", "JavaScript", "TypeScript", "Java", "Embedded C++"],
  "Backend & Frontend": ["Express.js", "FastAPI", "Node.js", "REST APIs", "React.js", "Next.js", "TailwindCSS"],
  "Databases": ["MongoDB", "PostgreSQL", "MySQL", "SQLite", "Prisma ORM"],
  "AI/ML": ["LangChain", "OpenAI API", "Gemini API", "Vertex AI", "NumPy", "Pandas"],
  "Embedded Systems": ["Arduino", "NodeMCU", "Raspberry Pi", "Arduino IDE"]
};

export const MARQUEE_ITEMS: string[] = [
  "Developing scalable backend systems",
  "Full-Stack developer",
  "Building Products that impact",
  "3x Hackathon winner"
];
