# Portfolio Website — Implementation Plan
**Rudransh Srivastava | Full-Stack Developer Portfolio**
*Prepared for Antigravity AI Agent*

---

## 1. Project Overview

A single-page portfolio application for a full-stack developer and hackathon champion entering a CSE program. The design system is explicitly specified in the brief: dark-default, Electric Cyan accent, monospace data labels, and an engineering-hacker aesthetic. This plan translates that spec into a complete, buildable implementation.

---

## 2. Technology Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | Specified in brief; RSC for fast initial load |
| Language | TypeScript | Specified; full type safety across components |
| Styling | Tailwind CSS v3 | Specified; `darkMode: 'class'` for theme toggle |
| Icons | Lucide React | Specified |
| Fonts | Inter (body) + JetBrains Mono (data labels) | Specified; loaded via `next/font/google` |
| Animations | Native Tailwind transitions only | Specified; no Framer Motion or GSAP |
| Email (Contact Form) | Resend + React Email (or Formspree as fallback) | Serverless-compatible, no backend overhead |
| GitHub Stats | `github-readme-stats` iframe embed | No API key needed; lightweight |
| Deployment | Vercel | Native Next.js support |
| Package Manager | pnpm | Faster installs in CI |

---

## 3. Repository & Project Structure

```
rudransh-portfolio/
├── app/
│   ├── layout.tsx              # Root layout: fonts, ThemeProvider, metadata
│   ├── page.tsx                # Orchestrates all section components
│   ├── globals.css             # Tailwind base + custom CSS vars + scrollbar
│   └── api/
│       └── contact/
│           └── route.ts        # POST handler for contact form (Resend)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav, theme toggle, hamburger
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx           # Bio + tech stack tabs
│   │   ├── Projects.tsx        # Project card grid
│   │   ├── Experience.tsx      # Timeline
│   │   ├── Achievements.tsx    # Awards + publication split
│   │   ├── Education.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── MetricBadge.tsx     # Reusable pill badge
│       ├── ProjectCard.tsx     # Hoverable project card
│       ├── TimelineItem.tsx    # Single timeline entry
│       ├── SkillTag.tsx        # Tech stack tag block
│       ├── ScrollMarquee.tsx   # Auto-scrolling text banner
│       └── ThemeToggle.tsx     # Sun/moon animated toggle
├── hooks/
│   ├── useActiveSection.ts     # IntersectionObserver for nav highlight
│   └── useTheme.ts             # Dark/light mode state
├── lib/
│   └── data.ts                 # All static content (projects, timeline, etc.)
├── public/
│   ├── avatar.jpeg             # Profile photo (to be provided)
│   └── resume.pdf              # Resume PDF
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## 4. Design System Implementation

### 4.1 Tailwind Config (`tailwind.config.ts`)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: "#0B0F19",
          light: "#FAFAFA",
        },
        card: {
          dark: "#161B26",
          light: "#FFFFFF",
        },
        border: {
          dark: "#222D3F",
          light: "#E5E7EB",
        },
        accent: {
          dark: "#00F2FE",   // Electric Cyan
          light: "#0284C7",  // Sky Blue
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
```

### 4.2 CSS Variables (`globals.css`)

```css
:root {
  --accent: #0284C7;
  --canvas: #FAFAFA;
  --card: #FFFFFF;
  --border: #E5E7EB;
  --text-primary: #111827;
  --text-muted: #4B5563;
}

.dark {
  --accent: #00F2FE;
  --canvas: #0B0F19;
  --card: #161B26;
  --border: #222D3F;
  --text-primary: #F3F4F6;
  --text-muted: #9CA3AF;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--canvas); }
::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

/* Smooth scroll */
html { scroll-behavior: smooth; }
```

### 4.3 Theme Toggle Logic (`hooks/useTheme.ts`)

```typescript
// Initialize from localStorage, default to dark
const [theme, setTheme] = useState<'dark' | 'light'>(() => {
  if (typeof window === 'undefined') return 'dark';
  return (localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark';
});

useEffect(() => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
}, [theme]);
```

---

## 5. Section-by-Section Component Specifications

### 5.1 Navbar (`components/layout/Navbar.tsx`)

**Behavior:**
- Sticky top-0, backdrop-blur with border-bottom on scroll (`window.scrollY > 10`)
- Nav links: Home | About | Experience | Projects | Achievements | Contact
- Smooth scroll to section IDs on click
- Active link highlight driven by `useActiveSection` hook (IntersectionObserver)
- Right side: GitHub icon button → `https://github.com/rudransh`, LinkedIn icon button → LinkedIn URL, "Resume" CTA button (opens `public/resume.pdf` in new tab)
- Theme toggle: `<ThemeToggle />` with Sun↔Moon icon swap using Tailwind `transition-transform`
- Mobile: hamburger (`Menu` icon from Lucide) toggles a full-width slide-down menu, links close it on click

**Key classes:**
```
fixed top-0 z-50 w-full
bg-[var(--canvas)]/80 backdrop-blur-md
border-b border-[var(--border)]
transition-all duration-300
```

---

### 5.2 Hero Section (`components/sections/Hero.tsx`)

**Layout:** Two-column — left: text content; right: profile photo

**Left column content (top to bottom):**

1. **Name headline:** `Hi, I'm Rudransh.` — display text, bold, `tracking-tight`, gradient text effect using `from-[var(--accent)] to-white` (dark) or `from-[var(--accent)] to-gray-800` (light)

2. **Subheadline:** Full-Stack Developer & Tech Leader specializing in building hardware-software integrations and scalable web applications. — body size, `text-[var(--text-muted)]`

3. **Three metric badges** (`<MetricBadge>` component):
   - 🏆 Winner: Inspire Awards MANAK (Top 10 Lakh+)
   - 🚀 Co-founded City's Inaugural Hack Club (1,000+ students)
   - 💻 Best Intern Award @ Luzeblaze (Out of 200+ interns)

4. **CTA button:** "See My Work" → scrolls to `#projects`, styled with accent border + hover fill

5. **Social links row:** GitHub + LinkedIn + Email (Lucide icons)

**Right column:** Circular/rounded profile image with a subtle `ring-2 ring-[var(--accent)]/30` glow

**Below the two-column grid:** `<ScrollMarquee />` — horizontal auto-scroll banner:
- Texts: `Developing scalable backend systems` · `Full-Stack developer` · `Building Products that impact` · `3x Hackathon winner`
- Implementation: CSS `@keyframes marquee` + `animation: marquee 20s linear infinite`, duplicated content for seamless loop
- Separated by a `·` or `|` divider in accent color

---

### 5.3 About & Tech Stack (`components/sections/About.tsx`)

**Layout:** Two-column grid on desktop, single column on mobile

**Left — Bio narrative:**
> An aspiring AI/software engineer focused on full-stack development, system design, and applied ML. Incoming CSE freshman looking for opportunities to work on something cool and innovative.

**Right — Tech stack grid:**

Five category groups, each rendered as a labeled cluster of `<SkillTag>` pill components:

| Category | Skills |
|---|---|
| Languages | Python, JavaScript, TypeScript, Java, Embedded C++ |
| Backend & Frontend | Express.js, FastAPI, Node.js, REST APIs, React.js, TailwindCSS |
| Databases | MongoDB, PostgreSQL, MySQL, SQLite, Prisma ORM |
| AI/ML | LangChain, OpenAI API, Gemini API, Vertex AI, NumPy, Pandas |
| Embedded Systems | Arduino, NodeMCU, Raspberry Pi, Arduino IDE |

`<SkillTag>` design: `font-mono text-xs px-2 py-1 rounded border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-150`

---

### 5.4 Featured Projects (`components/sections/Projects.tsx`)

**Layout:** 2×2 grid (desktop), 1 column (mobile)

**`<ProjectCard>` specs:**
```
- Full card is clickable (links to GitHub/demo)
- On hover: translate-y-[-4px] + shadow-lg + bg-[var(--accent)]/5 gradient glow
- transition: all 0.2s ease-in-out
- Border: 1px solid var(--border), on hover: border-[var(--accent)]/30
```

**Four project cards:**

| # | Title | Tagline | Stack tags |
|---|---|---|---|
| 1 | Mini-Vent | Economical portable medical ventilator with real-time vitals monitoring | NodeMCU · IoT · C++ · Express.js · MongoDB · Expo · REST APIs |
| 2 | Eye-Blink | Real-time driver drowsiness detection with Raspberry Pi + ABS integration | Python · OpenCV · Raspberry Pi · Hardware Integration |
| 3 | Kala-Kriti | Intelligent exhaust monitoring system for reducing vehicle carbon emissions | NodeMCU · IoT · C++ · Express.js · MongoDB · React.js |
| 4 | TubeAI | YouTube summarization bot — transcribe and chat with video content | LangChain RAG · OpenAI Whisper · GPT-3.5 · TypeScript |

Each card includes:
- Project title (bold, `tracking-tight`)
- Category badge (e.g., "IoT & Healthcare", "Computer Vision", "AI & NLP")
- Quick pitch paragraph
- Tech stack tags (mini `<SkillTag>` variants)
- GitHub icon link + optional Live Demo link in card footer

**Below the grid:** GitHub Stats embed
```html
<img
  src="https://github-readme-stats.vercel.app/api?username=YOURUSERNAME&show_icons=true&theme=transparent&title_color=00F2FE&icon_color=00F2FE&text_color=9CA3AF&bg_color=00000000"
  alt="GitHub Stats"
/>
```
Wrap in a `dark:block hidden` / `block dark:hidden` pair to serve appropriate theme variant.

---

### 5.5 Experience & Leadership Timeline (`components/sections/Experience.tsx`)

**Layout:** Single vertical timeline with a left accent line (`border-l-2 border-[var(--accent)]/30`). Each entry is a `<TimelineItem>` positioned with a dot on the line.

**Visual differentiation:**
- Professional roles: dot filled with accent color
- Leadership/co-founder roles: dot outlined in accent color

**Five timeline entries (chronological, newest first):**

| Role | Org | Period | Type |
|---|---|---|---|
| Co-founder & President | Hack Club, SBS BGN | Jun 2022 – Feb 2025 | Leadership |
| Co-founder & CTO | Stellar Scholar, STEM Club | Mar 2024 – Feb 2025 | Leadership |
| Head Boy | Student Council | Jun 2023 – Mar 2024 | Leadership |
| Project Evaluator & Executive Intern | Youth Ideathon | Aug 2023 – Nov 2024 | Professional |
| Full-Stack Web Dev Intern | Luzeblaze | Dec 2023 – Feb 2024 | Professional |

**Each `<TimelineItem>` contains:**
- Role title + org name
- Date range in `font-mono text-xs text-[var(--text-muted)]`
- 1–2 sentence description
- Key metric badge if applicable (e.g., "Best Intern Award", "1,000+ students", "$5,000 grants")

---

### 5.6 Achievements & Publications (`components/sections/Achievements.tsx`)

**Layout:** Two-column split grid

**Left — Elite Awards (5 entries):**
Each award rendered as a card with:
- `<MetricBadge>` labeled "Winner" or "Runner-Up" in accent color
- Award name
- Context in muted text (e.g., "Selected from 10 Lakh+ nominations", "Held at IIT Delhi")

Awards list:
1. Winner — Inspire Awards MANAK (10 Lakh+ nominations)
2. Winner — Think Startup Youth Ideathon (IIT Delhi, top 90,000+)
3. Winner — HACK JKLU | Runner-Up — Unfold 2023 CoinDCX Hackathon
4. Winner — ATL Marathon (top 500 / 20,000+ entries)
5. Winner — Innovate4Impact Smart City Challenge (La Trobe University, Australia)

**Right — Publications:**
Single publication card:
- "Published Paper" badge
- Title: *Mini-Vent - An Economical Miniaturized Intensive Care Unit System*
- Publisher: International Research Journal of Engineering and Technology (IRJET)
- Link icon to paper (if URL available)

---

### 5.7 Education (`components/sections/Education.tsx`)

**Single compact card:**
- School: Sunbeam English School, Varanasi
- Board: CBSE, Class 12th
- Subjects: Physics · Chemistry · Math · Computer Science · Entrepreneurship
- Design: same card style as project cards, no hover effect needed

---

### 5.8 Contact & Footer (`components/sections/Contact.tsx`, `components/layout/Footer.tsx`)

**Contact layout:** Two-column — left: contact form; right: direct contact details

**Form fields (controlled React state, no `<form>` element issues):**
- Name (text input)
- Email (email input)
- Message (textarea, 4 rows)
- Submit button: "Send Message" → POST to `/api/contact`

**API route (`app/api/contact/route.ts`):**
```typescript
// Uses Resend SDK to send email to rudranshsrivastava2525@gmail.com
// Returns { success: true } or { error: string }
// Show toast feedback in UI on success/error
```

**Right column — direct details:**
- 📧 rudranshsrivastava2525@gmail.com
- 📞 +91 7307272671
- GitHub, LinkedIn icon links

**Footer:**
`Built by Rudransh Srivastava. © 2026.` — centered, `font-mono text-xs text-[var(--text-muted)]`

---

## 6. Reusable UI Components

### `<MetricBadge>` 
```tsx
// Props: label: string, emoji?: string
// Style: pill shape, bg-[var(--accent)]/10, text-[var(--accent)], font-mono text-xs, px-3 py-1 rounded-full
```

### `<ProjectCard>`
```tsx
// Props: title, category, pitch, stack: string[], githubUrl, demoUrl?
// Style: bg-[var(--card)] border border-[var(--border)] rounded-xl p-5
// Hover: hover:-translate-y-1 hover:shadow-xl hover:border-[var(--accent)]/30
//        hover:bg-gradient-to-br hover:from-[var(--card)] hover:to-[var(--accent)]/5
// transition: all 200ms ease-in-out
```

### `<SkillTag>`
```tsx
// Props: label: string, size?: 'sm' | 'md'
// font-mono, border, rounded, hover accent
```

### `<TimelineItem>`
```tsx
// Props: role, org, period, description, badge?, type: 'professional' | 'leadership'
```

### `<ScrollMarquee>`
```tsx
// Props: items: string[]
// CSS: overflow-hidden; inner div: flex gap-16, animation: marquee 20s linear infinite
// Duplicate items array for seamless loop
```

### `<ThemeToggle>`
```tsx
// Lucide Sun icon (light mode) ↔ Moon icon (dark mode)
// Wrap in button with rotate/scale transition on icon swap
// aria-label="Toggle theme"
```

---

## 7. Active Section Detection (`hooks/useActiveSection.ts`)

```typescript
// Uses IntersectionObserver with threshold: 0.3
// Observes: #home, #about, #experience, #projects, #achievements, #contact
// Returns activeSection: string
// Used by Navbar to apply accent color + font-medium to current link
```

---

## 8. Static Data File (`lib/data.ts`)

Centralize all content here to keep components clean:

```typescript
export const PROJECTS: Project[] = [ /* 4 items */ ];
export const TIMELINE: TimelineEntry[] = [ /* 5 items */ ];
export const AWARDS: Award[] = [ /* 5 items */ ];
export const SKILLS: Record<string, string[]> = { /* 5 categories */ };
export const MARQUEE_ITEMS: string[] = [ /* 4 items */ ];
```

---

## 9. SEO & Metadata (`app/layout.tsx`)

```typescript
export const metadata: Metadata = {
  title: "Rudransh Srivastava — Full-Stack Developer & Tech Leader",
  description: "Portfolio of Rudransh Srivastava — Full-Stack Developer, 3x Hackathon Winner, and Co-founder of Varanasi's first Hack Club.",
  openGraph: {
    title: "Rudransh Srivastava",
    description: "Building hardware-software integrations and scalable web applications.",
    images: ["/og-image.png"],
  },
  keywords: ["Full-Stack Developer", "IoT", "React", "Next.js", "Hackathon"],
};
```

---

## 10. Responsive Breakpoint Strategy

| Breakpoint | Navbar | Hero | Projects | Timeline |
|---|---|---|---|---|
| `sm` (< 640px) | Hamburger menu | Single col | Single col | Single col |
| `md` (640–1024px) | Hamburger menu | Single col | 2 col | Single col |
| `lg` (> 1024px) | Full nav links | Two col | 2×2 grid | Single col with wider item |

Key Tailwind patterns:
```
grid-cols-1 md:grid-cols-2       → Projects grid
flex-col lg:flex-row             → Hero layout
hidden lg:flex                   → Desktop nav links
lg:hidden                        → Hamburger button
```

---

## 11. Performance Checklist

- [ ] Profile photo: Use `next/image` with `priority` flag (above fold)
- [ ] GitHub stats: Load with `loading="lazy"` inside a `Suspense` boundary
- [ ] Fonts: `next/font/google` with `display: 'swap'`
- [ ] All sections below fold: wrap with `React.lazy` + `Suspense` or use Next.js dynamic imports
- [ ] Contact form: Validate client-side before API call (check empty fields, email format)
- [ ] No layout shift: set explicit `width`/`height` on the avatar image

---

## 12. Accessibility Checklist

- [ ] All interactive elements have `aria-label` or visible text
- [ ] Theme toggle: `aria-label="Switch to light mode"` / `"Switch to dark mode"`
- [ ] Hamburger button: `aria-expanded`, `aria-controls`
- [ ] All images have `alt` text
- [ ] Contact form inputs have associated `<label>` elements
- [ ] Keyboard-focusable nav links with visible focus ring (`focus-visible:ring-2 focus-visible:ring-[var(--accent)]`)
- [ ] Marquee animation: respects `prefers-reduced-motion` via `@media (prefers-reduced-motion: reduce) { .marquee { animation: none; } }`

---

## 13. Environment Variables

```env
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=rudranshsrivastava2525@gmail.com
```

---

## 14. Implementation Order (Recommended)

1. **Scaffold** — `npx create-next-app@latest` with TypeScript + Tailwind, configure `tailwind.config.ts` and `globals.css`
2. **Theme system** — `useTheme` hook, `ThemeToggle`, verify dark/light switching
3. **Layout shell** — `Navbar` (desktop + mobile), `Footer`, root `layout.tsx` with fonts
4. **Data file** — populate `lib/data.ts` with all static content
5. **UI primitives** — `MetricBadge`, `SkillTag`, `ProjectCard`, `TimelineItem`, `ScrollMarquee`
6. **Sections** (in page order): Hero → About → Projects → Experience → Achievements → Education → Contact
7. **Active section hook** — wire to Navbar
8. **Contact API route** — Resend integration + form feedback
9. **Responsive pass** — verify all breakpoints
10. **Accessibility pass** — keyboard nav, ARIA labels, reduced motion
11. **Performance pass** — `next/image`, lazy loads, font optimization
12. **Deploy** — Vercel, add env vars, verify production build

---

## 15. Key Design Decisions & Notes for the Agent

- **Profile photo** (`public/avatar.jpeg`) is expected but not provided in the brief. Use a placeholder (`next/image` with a gray bg) and add a `// TODO: replace with actual photo` comment.
- **GitHub username** needs to be filled in for the stats embed URL. Add a `GITHUB_USERNAME` constant in `lib/data.ts`.
- **GitHub/LinkedIn URLs** are not in the brief. Use `#` as href placeholders and add `// TODO` comments.
- **Resume PDF** (`public/resume.pdf`) is referenced in the Navbar CTA. Add a placeholder file or note that it needs to be uploaded.
- The `ScrollMarquee` component must duplicate its items array (`[...items, ...items]`) inside the rendered div to create a seamless loop — do not use `overflow: visible` on the outer container.
- The gradient text on the Hero headline must use `-webkit-background-clip: text` and `-webkit-text-fill-color: transparent` for cross-browser support; Tailwind's `bg-clip-text text-transparent` handles this.
- Dark mode default: ensure `document.documentElement.classList.add('dark')` runs *before* first paint to avoid flash of light mode. Place this in a `<script>` tag in `app/layout.tsx` before the `<body>` using `dangerouslySetInnerHTML` to inline it synchronously.

```tsx
// In app/layout.tsx, before </head>:
<script
  dangerouslySetInnerHTML={{
    __html: `
      const t = localStorage.getItem('theme') ?? 'dark';
      document.documentElement.classList.toggle('dark', t === 'dark');
    `,
  }}
/>
```

---

*End of implementation plan. All section content, component APIs, styling tokens, and build order are fully specified above.*
