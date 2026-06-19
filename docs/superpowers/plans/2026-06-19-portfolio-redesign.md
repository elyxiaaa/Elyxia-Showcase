# Elyxia Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the monolithic glassmorphism `App.tsx` with a structured Editorial Dark portfolio composed of focused section components, a clean data layer, and a consistent zinc-950 design system.

**Architecture:** A thin `App.tsx` shell renders `Navbar` + nine `sections/` components + `Footer`. Project content lives in `src/data/projects.ts`. Scroll-reveal behaviour is encapsulated in `src/hooks/useScrollReveal.ts`. UI atoms (`SectionLabel`, `Tag`, `BrowserMockup`) live in `src/components/ui/`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 3, Vite, react-icons, Inter (Google Fonts, no install needed)

## Global Constraints

- Brand is `Elyxia` — never display a real person name anywhere on the page
- Background: `#09090b` (zinc-950) — no gradient blobs, no glassmorphism, no backdrop-blur on cards
- No color accent except white — visual interest comes from zinc neutrals + project screenshots
- Font: `Inter` — remove all Space Grotesk references from `index.css` and `App.tsx`
- Max container: `max-w-screen-xl` (`1280px`) with `mx-auto`
- Section padding: `py-24 lg:py-32`, gutters: `px-6 md:px-10 lg:px-16`
- Cards use `border border-zinc-800 bg-zinc-900` — no `backdrop-blur`, no `bg-white/5`
- All `<img>` tags use `loading="lazy"` except the Hero front mockup frame which uses `loading="eager"`
- JJM project: has `JJM.webp` screenshot, `liveUrl: null` — no live-link button rendered
- Ran Novus Rising + Origins Coffee Co.: `isPlaceholder: true`, `image: null`, `liveUrl: null`
- Contact email: `elyxia.dev@outlook.com`
- Contact Facebook: `https://www.facebook.com/angelo.diel`
- Contact Discord server: `https://discord.gg/Z4BUsgSsR`, display label `elyxiaaaa`
- Scroll-reveal: only applied to sections below the fold (from `FeaturedProjects` downward) — Hero and TrustStats render without animation

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/index.css` | Inter font import, `.reveal` / `.is-visible` CSS classes |
| Modify or create | `tailwind.config.js` | Extend `fontFamily.sans` with Inter |
| Create | `src/data/projects.ts` | `Project` type + all 9 project entries |
| Create | `src/components/ui/SectionLabel.tsx` | Small uppercase zinc-500 label |
| Create | `src/components/ui/Tag.tsx` | Small border-zinc-800 badge (reserved for future use) |
| Create | `src/hooks/useScrollReveal.ts` | IntersectionObserver scroll-reveal hook |
| Create | `src/components/ui/BrowserMockup.tsx` | CSS browser chrome frame component |
| Create | `src/components/layout/Navbar.tsx` | Sticky nav, scroll-spy, mobile drawer |
| Create | `src/components/sections/Hero.tsx` | 2-col hero, browser mockup stack |
| Create | `src/components/sections/TrustStats.tsx` | 4-stat strip |
| Create | `src/components/sections/FeaturedProjects.tsx` | 9 editorial case-study rows |
| Create | `src/components/sections/Process.tsx` | 6-step grid |
| Create | `src/components/sections/TechStack.tsx` | 3-column tech list |
| Create | `src/components/sections/Services.tsx` | 7-service border grid |
| Create | `src/components/sections/Testimonials.tsx` | 2 placeholder cards |
| Create | `src/components/sections/About.tsx` | Expertise text block |
| Create | `src/components/sections/Contact.tsx` | CTA + 3 contact buttons |
| Create | `src/components/layout/Footer.tsx` | One-line footer |
| Replace | `src/App.tsx` | Thin shell — imports + renders all sections |

---

### Task 1: Foundation — Inter font, Tailwind config, scroll-reveal CSS

**Files:**
- Modify: `src/index.css`
- Modify or create: `tailwind.config.js`

**Interfaces:**
- Produces: `font-sans` → Inter via Tailwind; `.reveal` + `.reveal.is-visible` CSS classes used by all section components from Task 8 onward

- [ ] **Step 1: Check for existing Tailwind config**

```bash
ls tailwind.config.*
```

If `tailwind.config.js` or `tailwind.config.ts` exists, open it and add the `fontFamily` extension inside `theme.extend`. If neither file exists, create `tailwind.config.js` with the full content in Step 2.

- [ ] **Step 2: Set `tailwind.config.js` content**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 3: Replace `src/index.css` entirely**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: build succeeds, no TypeScript or Vite errors. Inter loads at runtime from Google Fonts.

- [ ] **Step 5: Commit**

```bash
git add src/index.css tailwind.config.js
git commit -m "feat: swap to Inter font, add scroll reveal CSS"
```

---

### Task 2: Data layer — `src/data/projects.ts`

**Files:**
- Create: `src/data/projects.ts`

**Interfaces:**
- Produces: `Project` type, `projects` array, `gamingProjects` array, `otherProjects` array — consumed by `FeaturedProjects.tsx`

- [ ] **Step 1: Create `src/data/projects.ts`**

```ts
import NovusRisingImg from '../assets/projects/NovusRising.webp';
import AegisImg from '../assets/projects/Aegis.webp';
import PhoenixImg from '../assets/projects/Phoenix.webp';
import ApexImg from '../assets/projects/Apex.webp';
import UltimatesImg from '../assets/projects/Ultimates.webp';
import BlogAppImg from '../assets/projects/BlogApp.webp';
import JJMImg from '../assets/projects/JJM.webp';

export type Project = {
  id: string;
  title: string;
  industry: string;
  year: string;
  group: 'gaming' | 'other';
  liveUrl: string | null;
  image: string | null;
  description: string;
  overview: string;
  challenges: string;
  solutions: string;
  results: string;
  stack: string[];
  isPlaceholder?: boolean;
};

export const projects: Project[] = [
  {
    id: '01',
    title: 'RF Novus Rising',
    industry: 'MMORPG',
    year: '2024',
    group: 'gaming',
    liveUrl: 'https://www.rfnovusrising.net',
    image: NovusRisingImg,
    description:
      'A branded RF Online server website built to give the Novus Rising community a professional online presence — immersive, responsive, and production-ready.',
    overview:
      'Full server website covering landing page, server information, downloads, and community sections.',
    challenges:
      "RF server sites often rely on outdated templates disconnected from the game's visual identity. The goal was modern without looking generic.",
    solutions:
      'Component-first React architecture with a Tailwind CSS design system tuned to the server branding. Clear section hierarchy, responsive breakpoints throughout.',
    results:
      'Live production site serving the RF Novus Rising community across desktop and mobile.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages'],
  },
  {
    id: '02',
    title: 'RF Aegis',
    industry: 'MMORPG',
    year: '2024',
    group: 'gaming',
    liveUrl: 'https://www.rfaegis.net',
    image: AegisImg,
    description:
      'A game platform website with real-time leaderboard and player data — designed to make community rankings feel engaging and easy to navigate.',
    overview:
      'Server website with API-integrated leaderboard, player rankings, and interactive community sections.',
    challenges:
      'Displaying live player data in a way that is readable, performant, and visually engaging without heavy UI libraries.',
    solutions:
      'Built API-powered leaderboard components with clean data presentation and React state for live refresh and filtering.',
    results:
      'Live site with functional leaderboard serving real-time data to the RF Aegis player community.',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Cloudflare Pages'],
  },
  {
    id: '03',
    title: 'RF Phoenix',
    industry: 'MMORPG',
    year: '2024',
    group: 'gaming',
    liveUrl: 'https://rfphoenix.net',
    image: PhoenixImg,
    description:
      'A community-focused RF Online website built to showcase server highlights, news, and resources in a clean, responsive layout.',
    overview:
      'Server landing page and community hub with a focus on visual hierarchy and player-first navigation.',
    challenges:
      'Structuring a content-heavy game website so players find information quickly without the page feeling cluttered.',
    solutions:
      'Designed a clear section structure with game-focused visual storytelling, prioritising navigation clarity and responsive breakpoints.',
    results:
      'Production-ready community website for RF Phoenix with a polished experience on all screen sizes.',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Cloudflare Pages'],
  },
  {
    id: '04',
    title: 'RF Apex',
    industry: 'MMORPG',
    year: '2024',
    group: 'gaming',
    liveUrl: 'https://rf-apex.pages.dev/',
    image: ApexImg,
    description:
      'A feature-rich RF Online server site with integrated leaderboard, guild list, and a custom gear preview interface for players.',
    overview:
      'Full-featured server website including leaderboard, guild list, and a dedicated gear preview UI — all in one cohesive front end.',
    challenges:
      'Implementing multiple interactive features in a single UI that stays cohesive and easy to navigate.',
    solutions:
      'Structured the site around clear tab-based navigation for each feature, with dedicated components for player data and gear preview.',
    results:
      'Fully featured game website live at rf-apex.pages.dev with leaderboard, guild list, and gear preview all in production.',
    stack: ['React', 'JavaScript', 'Tailwind CSS'],
  },
  {
    id: '05',
    title: 'Ran Novus Rising',
    industry: 'MMORPG',
    year: '2025',
    group: 'gaming',
    liveUrl: null,
    image: null,
    description:
      'A branded Ran Online server website currently in development — designed to match the visual identity and community needs of the Novus Rising server.',
    overview: 'Full server website for Ran Novus Rising — in development.',
    challenges: 'Project in progress.',
    solutions: 'Project in progress.',
    results: 'Coming soon.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages'],
    isPlaceholder: true,
  },
  {
    id: '06',
    title: 'Ultimates Construction Materials Trading',
    industry: 'Business',
    year: '2024',
    group: 'other',
    liveUrl: 'https://ultimates-trading.pages.dev',
    image: UltimatesImg,
    description:
      'A professional business website for Ultimates Construction Materials Trading — built to present products and services clearly to potential clients.',
    overview:
      'Company website covering products, services, and contact information in a professional, client-facing layout.',
    challenges:
      'Construction businesses often have outdated web presence that fails to build credibility. The goal was a modern, trust-building site without generic templates.',
    solutions:
      'Designed a clean business layout with structured product browsing, responsive design, and a visual tone suited for B2B clients.',
    results:
      'Live production site giving Ultimates Construction a credible online presence for client acquisition.',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Cloudflare Pages'],
  },
  {
    id: '07',
    title: 'Blog App',
    industry: 'Web Application',
    year: '2024',
    group: 'other',
    liveUrl: 'https://blog-assessment-app.pages.dev/',
    image: BlogAppImg,
    description:
      'A clean content-focused blog application built for readable layouts, structured content browsing, and reusable front-end architecture.',
    overview:
      'Full-featured blog web application with content listing, reading view, and a component-first architecture.',
    challenges:
      'Blog UIs need to balance content density with readability — getting typography, spacing, and structure right for long-form reading.',
    solutions:
      'Built with a content-first design system: clean type scale, appropriate line lengths, logical content hierarchy, and reusable layout components.',
    results:
      'Deployed, fully functional blog application with a readable, responsive reading experience.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  },
  {
    id: '08',
    title: 'JJM',
    industry: 'Business',
    year: '2024',
    group: 'other',
    liveUrl: null,
    image: JJMImg,
    description:
      'A private client website built to serve a specific business audience with a professional, branded online presence.',
    overview:
      'Business website delivered for a private client — responsive, performant, and tailored to the client\'s brand requirements.',
    challenges:
      "Translating the client's brand requirements into a web experience that feels appropriate for their audience while remaining fast and responsive.",
    solutions:
      'Delivered a focused front end with React and Tailwind CSS, prioritising performance, clean code, and cross-device compatibility.',
    results:
      'Successfully delivered and live in production. Client details are confidential.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages'],
  },
  {
    id: '09',
    title: 'Origins Coffee Co.',
    industry: 'E-Commerce',
    year: '2025',
    group: 'other',
    liveUrl: null,
    image: null,
    description:
      'An e-commerce experience for Origins Coffee Co. — currently in development, focused on product presentation and a smooth purchasing flow.',
    overview: 'E-commerce storefront for Origins Coffee Co. — in development.',
    challenges: 'Project in progress.',
    solutions: 'Project in progress.',
    results: 'Coming soon.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    isPlaceholder: true,
  },
];

export const gamingProjects = projects.filter((p) => p.group === 'gaming');
export const otherProjects = projects.filter((p) => p.group === 'other');
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add project data layer with all 9 projects"
```

---

### Task 3: UI primitives and scroll-reveal hook

**Files:**
- Create: `src/components/ui/SectionLabel.tsx`
- Create: `src/components/ui/Tag.tsx`
- Create: `src/hooks/useScrollReveal.ts`

**Interfaces:**
- Produces:
  - `SectionLabel({ children: React.ReactNode })` → `<p>` with zinc-500 uppercase style
  - `Tag({ children: React.ReactNode })` → `<span>` with border-zinc-800 badge style
  - `useScrollReveal<T extends HTMLElement>()` → `React.RefObject<T | null>` — adds `.is-visible` to element's `classList` when it enters the viewport; the element must already have the `reveal` class in its JSX className

- [ ] **Step 1: Create `src/components/ui/SectionLabel.tsx`**

```tsx
type Props = { children: React.ReactNode };

export function SectionLabel({ children }: Props) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
      {children}
    </p>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/Tag.tsx`**

```tsx
type Props = { children: React.ReactNode };

export function Tag({ children }: Props) {
  return (
    <span className="border border-zinc-800 text-zinc-500 text-xs uppercase tracking-widest px-2.5 py-1 rounded">
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create `src/hooks/useScrollReveal.ts`**

```ts
import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
```

> **Usage pattern in section components:** Attach the ref to an element that also has `className="reveal ..."`. The hook adds `is-visible` when the element scrolls into view, triggering the CSS transition defined in `index.css`.

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/SectionLabel.tsx src/components/ui/Tag.tsx src/hooks/useScrollReveal.ts
git commit -m "feat: add SectionLabel, Tag primitives and useScrollReveal hook"
```

---

### Task 4: BrowserMockup component

**Files:**
- Create: `src/components/ui/BrowserMockup.tsx`

**Interfaces:**
- Produces: `BrowserMockup({ url, image, alt, className?, imageLoading? })` — consumed three times in `Hero.tsx`

- [ ] **Step 1: Create `src/components/ui/BrowserMockup.tsx`**

```tsx
type Props = {
  url: string;
  image: string;
  alt: string;
  className?: string;
  imageLoading?: 'eager' | 'lazy';
};

export function BrowserMockup({
  url,
  image,
  alt,
  className = '',
  imageLoading = 'lazy',
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 truncate text-xs text-zinc-500">{url}</span>
      </div>
      <img
        src={image}
        alt={alt}
        className="w-full object-cover"
        loading={imageLoading}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/BrowserMockup.tsx
git commit -m "feat: add BrowserMockup UI component"
```

---

### Task 5: Navbar

**Files:**
- Create: `src/components/layout/Navbar.tsx`

**Interfaces:**
- Produces: `default export Navbar` — no props; self-contained scroll-spy + mobile drawer
- Consumes: `FaBars`, `FaTimes` from `react-icons/fa`

- [ ] **Step 1: Create `src/components/layout/Navbar.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const NAV_LINKS = [
  { label: 'Projects', id: 'projects' },
  { label: 'Process', id: 'process' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
] as const;

const ALL_SECTION_IDS = [...NAV_LINKS.map((l) => l.id), 'contact'];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollY = window.scrollY + 120;
      let current = '';
      for (const id of ALL_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-zinc-800 transition-colors duration-300 ${
        scrolled ? 'bg-zinc-950/90 backdrop-blur-sm' : 'bg-zinc-950'
      }`}
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        {/* Wordmark */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-lg font-semibold text-white transition-colors hover:text-zinc-300"
        >
          Elyxia
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToId(link.id)}
              className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                activeSection === link.id
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button
          type="button"
          onClick={() => scrollToId('contact')}
          className="hidden rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white md:inline-flex"
        >
          Contact
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-zinc-400 transition-colors hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-zinc-800 bg-zinc-950 transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto flex max-w-screen-xl flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => { scrollToId(link.id); setMenuOpen(false); }}
              className={`rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                activeSection === link.id ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => { scrollToId('contact'); setMenuOpen(false); }}
            className="rounded-lg px-3 py-2.5 text-left text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add Navbar with scroll-spy and mobile drawer"
```

---

### Task 6: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `BrowserMockup` from `../ui/BrowserMockup`; direct imports of `NovusRising.webp`, `Aegis.webp`, `Ultimates.webp`; `FaArrowRight`, `FaEnvelope` from react-icons/fa
- Produces: `default export Hero` — no scroll-reveal (above the fold)

- [ ] **Step 1: Create `src/components/sections/Hero.tsx`**

```tsx
import { FaArrowRight, FaEnvelope } from 'react-icons/fa';
import { BrowserMockup } from '../ui/BrowserMockup';
import NovusRisingImg from '../../assets/projects/NovusRising.webp';
import AegisImg from '../../assets/projects/Aegis.webp';
import UltimatesImg from '../../assets/projects/Ultimates.webp';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Hero() {
  return (
    <section className="border-b border-zinc-800">
      <div className="mx-auto grid max-w-screen-xl items-center gap-16 px-6 py-24 md:px-10 lg:grid-cols-2 lg:px-16 lg:py-32">
        {/* Left — text */}
        <div className="space-y-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Front-End Developer
          </p>

          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight text-white lg:text-7xl xl:text-8xl">
              Elyxia
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-zinc-400">
              Building modern gaming platforms, e-commerce experiences, and web
              applications that users actually enjoy using.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => scrollToId('projects')}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100"
            >
              View Projects
              <FaArrowRight size={13} />
            </button>
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
            >
              <FaEnvelope size={13} />
              Contact Me
            </button>
          </div>
        </div>

        {/* Right — browser mockup stack (desktop only) */}
        <div className="relative hidden pb-16 pr-12 lg:block">
          {/* Back frame */}
          <div className="absolute inset-0 z-10 translate-x-10 translate-y-12 opacity-30">
            <BrowserMockup
              url="ultimates-trading.pages.dev"
              image={UltimatesImg}
              alt="Ultimates Construction website preview"
            />
          </div>
          {/* Mid frame */}
          <div className="absolute inset-0 z-20 translate-x-5 translate-y-6 opacity-60">
            <BrowserMockup
              url="rfaegis.net"
              image={AegisImg}
              alt="RF Aegis website preview"
            />
          </div>
          {/* Front frame */}
          <div className="relative z-30 shadow-2xl shadow-black/60">
            <BrowserMockup
              url="rfnovusrising.net"
              image={NovusRisingImg}
              alt="RF Novus Rising website preview"
              className="transition-transform duration-500 hover:scale-[1.02]"
              imageLoading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run dev server and visually verify**

```bash
npm run dev
```

Open http://localhost:5173. Confirm:
- "Front-End Developer" label above the large "Elyxia" heading
- Value proposition text and two CTA buttons below
- On desktop (≥1024px): three layered browser frames on the right; front frame shows RF Novus Rising screenshot
- On mobile: browser mockups are hidden, left column is full width

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with browser mockup stack"
```

---

### Task 7: TrustStats section

**Files:**
- Create: `src/components/sections/TrustStats.tsx`

**Interfaces:**
- Produces: `default export TrustStats` — no props; no scroll-reveal (visible on initial load)

- [ ] **Step 1: Create `src/components/sections/TrustStats.tsx`**

```tsx
const STATS = [
  { value: '3+', label: 'Years of Experience' },
  { value: '7+', label: 'Projects Completed' },
  { value: '5', label: 'Technologies Used' },
  { value: '7+', label: 'Websites Launched' },
] as const;

export default function TrustStats() {
  return (
    <div className="border-b border-zinc-800">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 divide-x divide-zinc-800 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-6 py-10 first:pl-0 md:px-10">
              <p className="text-4xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/TrustStats.tsx
git commit -m "feat: add TrustStats section"
```

---

### Task 8: FeaturedProjects section

The most complex component. Renders all 9 projects in two groups as editorial numbered case-study rows with alternating image/content position.

**Files:**
- Create: `src/components/sections/FeaturedProjects.tsx`

**Interfaces:**
- Consumes: `gamingProjects`, `otherProjects`, `Project` from `../../data/projects`; `SectionLabel` from `../ui/SectionLabel`; `useScrollReveal` from `../../hooks/useScrollReveal`; `FaExternalLinkAlt` from react-icons/fa

- [ ] **Step 1: Create `src/components/sections/FeaturedProjects.tsx`**

```tsx
import { FaExternalLinkAlt } from 'react-icons/fa';
import { gamingProjects, otherProjects, type Project } from '../../data/projects';
import { SectionLabel } from '../ui/SectionLabel';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const DETAILS = [
  { key: 'overview', label: 'Overview' },
  { key: 'challenges', label: 'Challenges' },
  { key: 'solutions', label: 'Solutions' },
  { key: 'results', label: 'Results' },
] as const;

type DetailKey = (typeof DETAILS)[number]['key'];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const imageRight = index % 2 === 0;

  const contentBlock = (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs uppercase tracking-widest text-zinc-500">
            {project.industry}
          </span>
          <span className="text-xs text-zinc-600">{project.year}</span>
        </div>
      </div>

      <p className="leading-relaxed text-zinc-400">{project.description}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {DETAILS.map(({ key, label }) => (
          <div key={key} className="border-l-2 border-zinc-800 pl-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
              {label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">
              {project[key as DetailKey]}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-zinc-600">{project.stack.join(' · ')}</p>

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
        >
          View Live Site
          <FaExternalLinkAlt size={11} />
        </a>
      )}
    </div>
  );

  const imageBlock = (
    <div>
      {project.image ? (
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <img
            src={project.image}
            alt={project.title}
            className="w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900">
          <span className="text-sm text-zinc-600">Project in progress</span>
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={ref}
      className="reveal mt-16 border-t border-zinc-800 pt-16 first:mt-0 first:border-t-0 first:pt-0"
    >
      <span className="mb-6 block select-none text-7xl font-bold leading-none text-zinc-800">
        {project.id}
      </span>

      <div className="grid items-start gap-12 lg:grid-cols-2">
        {imageRight ? (
          <>
            {contentBlock}
            {imageBlock}
          </>
        ) : (
          <>
            {imageBlock}
            {contentBlock}
          </>
        )}
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="scroll-mt-20 border-b border-zinc-800">
      <div className="mx-auto max-w-screen-xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mb-16">
          <SectionLabel>Work</SectionLabel>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
            Projects that shipped.
          </h2>
        </div>

        <div className="space-y-0">
          {/* Gaming group */}
          <div className="mb-8">
            <SectionLabel>Gaming &amp; MMORPG</SectionLabel>
          </div>
          {gamingProjects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}

          {/* Other work group */}
          <div className="mb-8 mt-24 border-t border-zinc-800 pt-24">
            <SectionLabel>Other Work</SectionLabel>
          </div>
          {otherProjects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={gamingProjects.length + i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run dev server and visually verify**

```bash
npm run dev
```

Scroll to the Projects section. Confirm:
- "Work" label, "Projects that shipped." heading
- "Gaming & MMORPG" group: 5 projects (01–05), large zinc-800 numbers, alternating image position
- Projects 01–04 show real screenshots; project 05 (Ran Novus Rising) shows "Project in progress" dashed placeholder
- "Other Work" group: 4 projects (06–09), project 08 (JJM) shows screenshot but no live link button, project 09 (Origins Coffee Co.) shows placeholder
- Detail grid (Overview / Challenges / Solutions / Results) renders for every project
- Sections fade in as you scroll to them

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/FeaturedProjects.tsx
git commit -m "feat: add FeaturedProjects with editorial numbered case studies"
```

---

### Task 9: Process + TechStack sections

**Files:**
- Create: `src/components/sections/Process.tsx`
- Create: `src/components/sections/TechStack.tsx`

**Interfaces:**
- Consumes: `SectionLabel`, `useScrollReveal`
- Produces: `default export Process`, `default export TechStack`

- [ ] **Step 1: Create `src/components/sections/Process.tsx`**

```tsx
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';

const STEPS = [
  {
    id: '01',
    title: 'Discovery',
    description:
      'Understanding the project, audience, and goals before touching a single line of code.',
  },
  {
    id: '02',
    title: 'Wireframing',
    description:
      'Mapping structure and user flow before committing to any visual direction.',
  },
  {
    id: '03',
    title: 'Design',
    description:
      'Translating wireframes into a refined visual system and component direction.',
  },
  {
    id: '04',
    title: 'Development',
    description:
      'Building the UI with React and Tailwind CSS — component-first, clean, maintainable code.',
  },
  {
    id: '05',
    title: 'Optimisation',
    description:
      'Performance audits, accessibility checks, and cross-browser quality assurance.',
  },
  {
    id: '06',
    title: 'Deployment',
    description:
      'Shipping to Cloudflare Pages or Vercel with zero-downtime deploys and proper domain setup.',
  },
] as const;

export default function Process() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="process" className="scroll-mt-20 border-b border-zinc-800">
      <div className="mx-auto max-w-screen-xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mb-16">
          <SectionLabel>Process</SectionLabel>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
            How I work.
          </h2>
        </div>

        <div
          ref={ref}
          className="reveal grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3"
        >
          {STEPS.map((step) => (
            <div
              key={step.id}
              className="bg-zinc-950 p-8 transition-colors hover:bg-zinc-900"
            >
              <span className="rounded border border-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-600">
                {step.id}
              </span>
              <h3 className="mt-4 text-sm font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/TechStack.tsx`**

```tsx
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';

const COLUMNS = [
  {
    heading: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    heading: 'Backend & Data',
    items: ['Supabase', 'REST APIs'],
  },
  {
    heading: 'Deployment',
    items: ['Cloudflare Pages', 'Vercel'],
  },
] as const;

export default function TechStack() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="border-b border-zinc-800">
      <div className="mx-auto max-w-screen-xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mb-16">
          <SectionLabel>Stack</SectionLabel>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
            Tools I build with.
          </h2>
        </div>

        <div ref={ref} className="reveal grid grid-cols-1 gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                {col.heading}
              </p>
              <ul>
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-zinc-800 py-3 text-sm text-zinc-300 last:border-b-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Process.tsx src/components/sections/TechStack.tsx
git commit -m "feat: add Process and TechStack sections"
```

---

### Task 10: Services + Testimonials sections

**Files:**
- Create: `src/components/sections/Services.tsx`
- Create: `src/components/sections/Testimonials.tsx`

**Interfaces:**
- Consumes: `SectionLabel`, `useScrollReveal`
- Produces: `default export Services`, `default export Testimonials`

- [ ] **Step 1: Create `src/components/sections/Services.tsx`**

```tsx
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';

const SERVICES = [
  {
    title: 'Gaming Websites',
    description: 'Branded, community-ready sites for gaming audiences.',
    span: false,
  },
  {
    title: 'MMORPG Websites',
    description:
      'Server landing pages, leaderboards, guild pages, and player dashboards.',
    span: false,
  },
  {
    title: 'E-Commerce Development',
    description: 'Product pages, storefront UI, and checkout experiences.',
    span: false,
  },
  {
    title: 'Landing Pages',
    description:
      'High-converting, performance-focused single-page experiences.',
    span: false,
  },
  {
    title: 'Frontend Development',
    description: 'Translating designs into clean, responsive React code.',
    span: false,
  },
  {
    title: 'UI Implementation',
    description: 'Figma or mockup to pixel-perfect production code.',
    span: false,
  },
  {
    title: 'Website Modernisation',
    description:
      'Rebuilding outdated sites with a modern stack, improved performance, and responsive layout.',
    span: true,
  },
] as const;

export default function Services() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="services" className="scroll-mt-20 border-b border-zinc-800">
      <div className="mx-auto max-w-screen-xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mb-16">
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
            What I build.
          </h2>
        </div>

        <div
          ref={ref}
          className="reveal grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2"
        >
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className={`bg-zinc-950 p-6 transition-colors hover:bg-zinc-900 ${
                service.span ? 'sm:col-span-2' : ''
              }`}
            >
              <p className="text-sm font-semibold text-white">{service.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Testimonials.tsx`**

```tsx
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';

export default function Testimonials() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="border-b border-zinc-800">
      <div className="mx-auto max-w-screen-xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mb-16">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
            What clients say.
          </h2>
        </div>

        <div ref={ref} className="reveal grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/30 p-8"
            >
              <span className="select-none text-5xl leading-none text-zinc-700">
                "
              </span>
              <p className="mt-4 text-sm italic leading-relaxed text-zinc-500">
                Client review will appear here once received.
              </p>
              <div className="mt-6">
                <p className="text-sm font-semibold text-zinc-400">Name</p>
                <p className="text-xs text-zinc-600">Project / Server Name</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Services.tsx src/components/sections/Testimonials.tsx
git commit -m "feat: add Services and Testimonials sections"
```

---

### Task 11: About + Contact + Footer

**Files:**
- Create: `src/components/sections/About.tsx`
- Create: `src/components/sections/Contact.tsx`
- Create: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `SectionLabel`, `useScrollReveal`, `FaDiscord`, `FaEnvelope`, `FaFacebook` from react-icons/fa
- Produces: `default export About`, `default export Contact`, `default export Footer`

- [ ] **Step 1: Create `src/components/sections/About.tsx`**

```tsx
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';

export default function About() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="scroll-mt-20 border-b border-zinc-800">
      <div className="mx-auto max-w-screen-xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="max-w-2xl">
          <SectionLabel>About</SectionLabel>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
            Elyxia
          </h2>

          <div ref={ref} className="reveal mt-8 space-y-4">
            <p className="text-lg leading-relaxed text-zinc-300">
              Front-End Developer specialising in gaming platforms, MMORPG
              server websites, e-commerce experiences, and modern web
              applications.
            </p>
            <p className="leading-relaxed text-zinc-400">
              I focus on performance, responsiveness, and modern UI — building
              sites that feel professional whether the audience is players,
              customers, or both.
            </p>
            <p className="pt-4 text-sm tracking-wide text-zinc-600">
              React · TypeScript · Tailwind CSS · Supabase · Cloudflare
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/Contact.tsx`**

```tsx
import { FaDiscord, FaEnvelope, FaFacebook } from 'react-icons/fa';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';

const LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/angelo.diel',
    icon: FaFacebook,
    external: true,
  },
  {
    label: 'elyxiaaaa',
    href: 'https://discord.gg/Z4BUsgSsR',
    icon: FaDiscord,
    external: true,
  },
  {
    label: 'elyxia.dev@outlook.com',
    href: 'mailto:elyxia.dev@outlook.com',
    icon: FaEnvelope,
    external: false,
  },
] as const;

export default function Contact() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="scroll-mt-20 border-b border-zinc-800">
      <div className="mx-auto max-w-screen-xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div ref={ref} className="reveal max-w-xl">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
            Have a project in mind?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            Let's build something players and customers will remember.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
              >
                <link.icon size={14} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/components/layout/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto max-w-screen-xl px-6 py-8 md:px-10 lg:px-16">
        <p className="text-sm text-zinc-600">
          © 2026 Elyxia · Built with React + Tailwind
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/About.tsx src/components/sections/Contact.tsx src/components/layout/Footer.tsx
git commit -m "feat: add About, Contact, and Footer components"
```

---

### Task 12: App.tsx wire-up + final verification

Replace the old monolithic 730-line `App.tsx` with a thin shell.

**Files:**
- Replace: `src/App.tsx`

**Interfaces:**
- Consumes: all components from `src/components/layout/` and `src/components/sections/`

- [ ] **Step 1: Replace `src/App.tsx` entirely**

```tsx
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import TrustStats from './components/sections/TrustStats';
import FeaturedProjects from './components/sections/FeaturedProjects';
import Process from './components/sections/Process';
import TechStack from './components/sections/TechStack';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Navbar />
      <main>
        <Hero />
        <TrustStats />
        <FeaturedProjects />
        <Process />
        <TechStack />
        <Services />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Full build**

```bash
npm run build
```

Expected: `dist/` created with no errors.

- [ ] **Step 3: Lint**

```bash
npm run lint
```

Expected: no errors or warnings.

- [ ] **Step 4: Dev server — full visual checklist**

```bash
npm run dev
```

Open http://localhost:5173. Walk through this checklist:

**Desktop (≥1024px):**
- [ ] Navbar: "Elyxia" wordmark left, four nav links center, "Contact" button right; becomes semi-opaque after scrolling 40px
- [ ] Hero: large "Elyxia" heading, value prop, two CTA buttons, three layered browser frames on the right
- [ ] TrustStats: 4 stats in a horizontal row divided by zinc-800 borders
- [ ] FeaturedProjects: "Work" label + "Projects that shipped." heading; Gaming group (01–05) then Other Work group (06–09); each project shows large decorative number; content and image alternate sides; detail grid visible; RF Novus Rising–RF Apex + Ultimates–JJM show real screenshots; Ran Novus Rising + Origins Coffee Co. show dashed placeholder; JJM has no live link button
- [ ] Process: 6 steps in a 3×2 gap-px grid with monospaced step IDs
- [ ] TechStack: 3 columns with list-separator rows
- [ ] Services: 7 services in 2-col gap-px grid; "Website Modernisation" spans full width
- [ ] Testimonials: 2 dashed-border placeholder cards
- [ ] About: "Elyxia" heading, two paragraphs, zinc-600 tech stack line
- [ ] Contact: heading, subheading, 3 buttons (Facebook, Discord elyxiaaaa, email)
- [ ] Footer: "© 2026 Elyxia · Built with React + Tailwind"
- [ ] Scroll reveal: FeaturedProjects and below fade in on scroll

**Mobile (≤767px):**
- [ ] Navbar: wordmark + hamburger; hamburger opens slide-down drawer with all links
- [ ] Hero: full-width text, browser mockup hidden
- [ ] TrustStats: 2×2 grid
- [ ] Projects: single column, image stacks above content
- [ ] Process: 2-col grid on sm, single col on xs

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire up App.tsx — portfolio redesign complete"
```

---

## Self-Review

### Spec coverage

| Spec requirement | Task |
|---|---|
| Editorial Dark color system (zinc-950, white accent only) | Task 1 |
| Inter font, remove Space Grotesk | Task 1 |
| `.reveal` / `.is-visible` scroll animation CSS | Task 1 |
| `SectionLabel`, `Tag` UI primitives | Task 3 |
| `useScrollReveal` hook | Task 3 |
| `BrowserMockup` component | Task 4 |
| Navbar: sticky, scroll-spy, mobile drawer | Task 5 |
| Hero: "Elyxia" display heading, value prop, 3-frame mockup stack | Task 6 |
| Trust stats: 4-column strip | Task 7 |
| Project type + all 9 project entries with full copy | Task 2 |
| JJM: screenshot shown, no live link | Task 2 + Task 8 |
| Ran Novus Rising + Origins Coffee Co.: placeholder blocks | Task 2 + Task 8 |
| FeaturedProjects: editorial numbered rows, 2 groups | Task 8 |
| Alternating image/content position | Task 8 |
| Overview / Challenges / Solutions / Results detail grid | Task 8 |
| Process: 6-step gap-px grid | Task 9 |
| TechStack: 3-column (Frontend, Backend & Data, Deployment) | Task 9 |
| Supabase listed, no Node.js or Next.js | Task 9 |
| Services: 7 services, Website Modernisation spans full width | Task 10 |
| Testimonials: 2 dashed placeholder cards | Task 10 |
| About: Elyxia heading, expertise paragraphs, tech line | Task 11 |
| Contact: 3 buttons (Facebook, Discord elyxiaaaa, email) | Task 11 |
| elyxia.dev@outlook.com email | Task 11 |
| Footer: one-line | Task 11 |
| App.tsx thin shell | Task 12 |
| Mobile responsive throughout | Every task (Tailwind responsive classes) |

### Placeholder scan
No TBD or incomplete steps. Every step contains actual code.

### Type consistency
- `Project` type defined Task 2, used in Task 8 — all properties referenced (`overview`, `challenges`, `solutions`, `results`) exist on the type as `string`
- `gamingProjects` / `otherProjects` defined Task 2, consumed Task 8
- `useScrollReveal<T>()` → `React.RefObject<T | null>` defined Task 3, used Tasks 7–11 with matching generic
- `BrowserMockup({ url, image, alt, className?, imageLoading? })` defined Task 4, called Task 6 with matching props
- `SectionLabel({ children })` defined Task 3, consumed Tasks 8–11
- `scrollToId` helper duplicated in Navbar (Task 5) and Hero (Task 6) — intentional, keeps each component self-contained with no shared utility file
