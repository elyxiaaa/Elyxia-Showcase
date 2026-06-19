# Elyxia Portfolio Redesign — Design Spec

**Date:** 2026-06-19  
**Approach:** Editorial Dark (Vercel / Stripe / Linear inspired)  
**Stack:** React 19 + TypeScript + Tailwind CSS 3 + Vite  
**Brand:** Elyxia (no real name used anywhere)

---

## 1. Design System

### Color Palette

| Token           | Hex       | Tailwind       | Usage                                    |
|-----------------|-----------|----------------|------------------------------------------|
| Background      | `#09090b` | `zinc-950`     | Page background                          |
| Surface         | `#18181b` | `zinc-900`     | Cards, raised elements, code blocks      |
| Border          | `#27272a` | `zinc-800`     | All borders and dividers                 |
| Border hover    | `#3f3f46` | `zinc-700`     | Interactive border hover states          |
| Text primary    | `#fafafa` | `zinc-50`      | Headlines, strong labels                 |
| Text secondary  | `#a1a1aa` | `zinc-400`     | Body copy, descriptions                  |
| Text muted      | `#71717a` | `zinc-500`     | Meta labels, timestamps, captions        |
| Accent          | `#ffffff` | `white`        | CTAs, active nav link, hover text        |

**No dedicated color accent beyond white.** Visual interest comes from typography hierarchy and project screenshots. No gradients, no glow effects, no glassmorphism, no blur blobs.

### Typography

- **Font family:** `Inter` (Google Fonts) — replaces Space Grotesk
- **Display / H1:** `font-bold` (700–800), `tracking-tight` (-0.03em to -0.04em), 56–80px
- **Section headings (H2):** `font-semibold` (600), 32–40px
- **Subsection (H3):** `font-semibold` (600), 20–24px
- **Body:** `font-normal` (400), 16–17px, `leading-relaxed` (1.75)
- **Labels / badges:** 11px, `uppercase`, `tracking-widest`, `font-semibold`, `text-zinc-500`
- **Project numbers:** `font-bold` (700), 72–80px, `text-zinc-800` (decorative only)
- **Mono / code:** `font-mono`, 13px, `text-zinc-400`

### Layout

- **Max container:** `max-w-screen-xl` (1280px), centered with `mx-auto`
- **Section vertical padding:** `py-24 lg:py-32`
- **Horizontal gutters:** `px-6 md:px-10 lg:px-16`
- **Section dividers:** `border-t border-zinc-800` horizontal rules
- **Grid gap:** `gap-6` (cards), `gap-16` (major sections)

### Component Language

| Component     | Style                                                                 |
|---------------|-----------------------------------------------------------------------|
| Primary CTA   | `bg-white text-zinc-950 font-semibold rounded-lg px-5 py-2.5`        |
| Secondary CTA | `border border-zinc-700 text-zinc-300 rounded-lg px-5 py-2.5 hover:border-zinc-500` |
| Tags / badges | `border border-zinc-800 text-zinc-500 text-xs uppercase tracking-widest px-2.5 py-1 rounded` |
| Cards         | `border border-zinc-800 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 transition-colors` |
| Hover states  | `border-zinc-700` upgrade, `text-white` text shift — no glow or color |
| Dividers      | `border-t border-zinc-800`                                           |

### Animations

- **Fade-in on scroll:** `opacity-0 → opacity-100`, `translateY(16px) → translateY(0)`, `duration-500 ease-out` using `IntersectionObserver`
- **Hover transitions:** `transition-colors duration-200` or `transition-all duration-300`
- **Browser mockup image hover:** `scale-[1.02] duration-500`
- **No parallax, no spinning, no entrance sequences, no stagger chains**

---

## 2. File Structure

The current single-file `App.tsx` (730 lines) is refactored into a proper component tree:

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── TrustStats.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── Process.tsx
│   │   ├── TechStack.tsx
│   │   ├── Services.tsx
│   │   ├── Testimonials.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── BrowserMockup.tsx
│       ├── ProjectCard.tsx
│       ├── SectionLabel.tsx
│       └── Tag.tsx
├── data/
│   └── projects.ts
├── hooks/
│   └── useScrollReveal.ts
├── assets/
│   └── projects/ (existing .webp files)
├── App.tsx          (thin shell — renders Navbar + sections + Footer)
├── main.tsx
└── index.css        (Inter font import + Tailwind directives)
```

---

## 3. Section Specifications

### 3.1 Navigation

**Behavior:** Sticky top, `z-50`. Background transitions from transparent to `bg-zinc-950/90 backdrop-blur-sm` after 40px scroll.

**Structure:**
```
[Elyxia]         Projects  Process  Services  About        [Contact →]
```

- **Logo:** `Elyxia` as text wordmark — `text-white font-semibold text-lg`, no icon or logo box
- **Nav links:** 5 links — `Projects`, `Process`, `Services`, `About`, `Contact` — smooth-scroll anchors
  - Default: `text-zinc-400 hover:text-white transition-colors`
  - Active (scroll-spy): `text-white`
  - No pill backgrounds, no underlines
- **CTA button:** `Contact` — outlined, right side, `border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white`
- **Mobile:** hamburger icon → full-width slide-down drawer, same link styles, stacked vertically

**Section IDs for scroll-spy:**
`#projects`, `#process`, `#services`, `#about`, `#contact`

---

### 3.2 Hero

**Layout:** Two-column grid, `lg:grid-cols-[1fr_1fr]`, full viewport height (`min-h-screen`), content vertically centered.

**Left column:**
```
FRONT-END DEVELOPER               ← 11px, uppercase, zinc-500, tracking-widest

Elyxia                            ← 72–80px, font-bold, text-white, tracking-tight

Building modern gaming             ← 18px, zinc-400, max-w-lg, leading-relaxed
platforms, e-commerce
experiences, and web
applications that users
actually enjoy using.

[View Projects →]  [Contact Me]   ← primary CTA + secondary CTA
```

**Right column — browser mockup stack:**

Three layered browser chrome frames built in pure CSS/JSX:

- **Frame 1 (front):** `z-30`, full size, `shadow-2xl shadow-black/50`
  - Chrome bar: `bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center gap-2`
  - 3 dots: `w-2.5 h-2.5 rounded-full bg-zinc-700` (×3)
  - URL text: `text-xs text-zinc-500 ml-3` showing `rfnovusrising.net`
  - Image: `NovusRising.webp`, `object-cover`, `hover:scale-[1.02] transition-transform duration-500`

- **Frame 2 (mid):** `absolute`, `z-20`, `translate-x-6 translate-y-8 scale-95`, `opacity-80`
  - Same chrome pattern, URL: `rfaegis.net`
  - Image: `Aegis.webp`

- **Frame 3 (back):** `absolute`, `z-10`, `translate-x-12 translate-y-16 scale-90`, `opacity-50`
  - Same chrome, URL: `ultimates-trading.pages.dev`
  - Image: `Ultimates.webp`

Container: `relative w-full max-w-lg` on the right column.

---

### 3.3 Trust Stats

**Layout:** Full-width strip, `border-t border-b border-zinc-800`, `py-10`.

Four equal columns separated by `border-l border-zinc-800`:

| Stat     | Label               |
|----------|---------------------|
| `3+`     | Years of Experience |
| `7+`     | Projects Completed  |
| `5`      | Technologies Used   |
| `7+`     | Websites Launched   |

- Number: `text-4xl font-bold text-white`
- Label: `text-sm text-zinc-500 mt-1`
- No icons, no cards — numbers in space

> **Note:** Update numbers when new projects ship.

---

### 3.4 Featured Projects

**Section label:** `WORK` — `text-xs uppercase tracking-widest text-zinc-500`  
**Section heading:** `Projects that shipped.` — `text-4xl font-bold`

**Two groups with a `border-t border-zinc-800` visual divider between them:**

#### Group 1 — Gaming & MMORPG

Projects: RF Novus Rising, RF Aegis, RF Phoenix, RF Apex, Ran Novus Rising (placeholder)

#### Group 2 — Other Work

Projects: Ultimates, Blog App, JJM, Origins Coffee Co. (placeholder)

**Per-project layout — editorial horizontal row:**

```
01 ─────────────────────────────────────────────────────────────────

   RF Novus Rising                                     MMORPG · 2024

   A polished RF Online web experience built to        [screenshot]
   feel immersive, branded, and easy to navigate       rounded-xl
   across desktop and mobile.                          border-zinc-800
                                                       object-cover

   Overview          Challenges
   ──────────────    ──────────────
   Branded server    Balancing game
   website for RF    aesthetics with
   Online community  clean navigation

   Solutions         Results
   ──────────────    ──────────────
   Component-first   Production-ready
   React layout      site, live now
   + Tailwind system at rfnovusrising.net

   React  ·  TypeScript  ·  Tailwind CSS  ·  Cloudflare Pages

   [View Live Site ↗]

─────────────────────────────────────────────────────────────────────
02   RF Aegis  ...
```

**Layout rules:**
- Project number: `text-7xl font-bold text-zinc-800` — decorative only, left-aligned
- Name + industry tag + year: inline on one row, name `text-2xl font-semibold text-white`, tag + year `text-xs text-zinc-500 ml-auto`
- Content split: `grid lg:grid-cols-2 gap-12` — description/details left, screenshot right
- **Alternating:** odd-numbered projects have image on right, even-numbered have image on left
- Detail 2×2 grid: `grid grid-cols-2 gap-4 mt-6` — each cell has `border-l-2 border-zinc-800 pl-3`
  - Cell label: `text-xs uppercase text-zinc-600 font-semibold`
  - Cell content: `text-sm text-zinc-400 mt-1`
- Tech stack row: `text-sm text-zinc-500` pipe-separated or dot-separated — no styled badges
- Live link: secondary CTA button
- Row separator: `border-t border-zinc-800 pt-16 mt-16`

**Placeholder projects (Ran Novus Rising, Origins Coffee Co.):**
- Same layout, `Coming Soon` tag replaces industry tag
- Screenshot area: `bg-zinc-900 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center` with `text-zinc-600 text-sm "Project in progress"`
- All detail cells show placeholder copy

**Project data** (to be defined in `src/data/projects.ts`):

```ts
type Project = {
  id: string;          // "01", "02" etc.
  title: string;
  industry: string;    // "MMORPG" | "Business" | "Web Application" | "E-Commerce"
  year: string;
  group: "gaming" | "other";
  liveUrl: string | null;
  image: string | null;    // null = placeholder
  description: string;
  overview: string;
  challenges: string;
  solutions: string;
  results: string;
  stack: string[];
  isPlaceholder?: boolean;
};
```

**Project roster:**

| # | Title                       | Group   | Industry      | Image            | URL                              |
|---|-----------------------------|---------|---------------|------------------|----------------------------------|
| 01 | RF Novus Rising            | gaming  | MMORPG        | NovusRising.webp | https://www.rfnovusrising.net    |
| 02 | RF Aegis                   | gaming  | MMORPG        | Aegis.webp       | https://www.rfaegis.net          |
| 03 | RF Phoenix                 | gaming  | MMORPG        | Phoenix.webp     | https://rfphoenix.net            |
| 04 | RF Apex                    | gaming  | MMORPG        | Apex.webp        | https://rf-apex.pages.dev/       |
| 05 | Ran Novus Rising           | gaming  | MMORPG        | null             | null (placeholder)               |
| 06 | Ultimates Construction     | other   | Business      | Ultimates.webp   | https://ultimates-trading.pages.dev |
| 07 | Blog App                   | other   | Web Application | BlogApp.webp   | https://blog-assessment-app.pages.dev/ |
| 08 | JJM                        | other   | Business      | JJM.webp         | [TO BE FILLED]                   |
| 09 | Origins Coffee Co.         | other   | E-Commerce    | null             | null (placeholder)               |

> **Note:** JJM URL and description need to be added before launch.

---

### 3.5 Development Process

**Section label:** `PROCESS`  
**Section heading:** `How I work.`

**6-step horizontal layout on desktop, vertical stack on mobile:**

| Step | Title          | Description                                                                 |
|------|----------------|-----------------------------------------------------------------------------|
| 01   | Discovery      | Understanding the project, audience, goals, and what success looks like.    |
| 02   | Wireframing    | Mapping structure and user flow before committing to any visual direction.  |
| 03   | Design         | Translating wireframes into a refined visual system and component direction.|
| 04   | Development    | Building the UI with React and Tailwind CSS. Component-first, clean code.   |
| 05   | Optimization   | Performance audits, accessibility checks, and cross-browser QA.             |
| 06   | Deployment     | Shipping to Cloudflare Pages or Vercel with zero-downtime deploys.          |

**Layout:**
- Desktop: `grid grid-cols-6 gap-6`
- Each step: step number in a small `border border-zinc-800 rounded px-2 py-0.5 text-xs font-mono text-zinc-600`, then title `text-sm font-semibold text-white mt-3`, then description `text-sm text-zinc-500 mt-2`
- Connecting rule: `border-t border-zinc-800` across the top of all steps on desktop
- Mobile: single column, left-bordered step indicator

---

### 3.6 Tech Stack

**Section label:** `STACK`  
**Section heading:** `Tools I build with.`

**Three-column layout:**

```
Frontend                 Backend & Data           Deployment
────────────────         ────────────────         ────────────────
React                    Supabase                 Cloudflare Pages
TypeScript               REST APIs                Vercel
Tailwind CSS
Vite
```

- Column header: `text-xs uppercase tracking-widest text-zinc-600 font-semibold`
- Each item: `text-sm text-zinc-300 py-2.5 border-b border-zinc-800`
- No icons, no logos, no colored badges
- Three columns with `border-l border-zinc-800` separating them

---

### 3.7 Services

**Section label:** `SERVICES`  
**Section heading:** `What I build.`

**Border-table grid — `grid grid-cols-1 md:grid-cols-2` with full border box:**

| Service                 | Description                                                                    |
|-------------------------|--------------------------------------------------------------------------------|
| Gaming Websites         | Branded, community-ready sites for gaming audiences.                           |
| MMORPG Websites         | Server landing pages, leaderboards, guild pages, and player dashboards.        |
| E-Commerce Development  | Product pages, storefront UI, and checkout experiences.                        |
| Landing Pages           | High-converting, performance-focused single-page experiences.                  |
| Frontend Development    | Translating designs into clean, responsive React code.                         |
| UI Implementation       | Figma or mockup to pixel-perfect production code.                              |
| Website Modernization   | Rebuilding outdated sites with modern stack, performance, and responsive layout.|

- Each cell: `border border-zinc-800 p-6 hover:bg-zinc-900 transition-colors`
- Service title: `text-sm font-semibold text-white`
- Description: `text-sm text-zinc-500 mt-2`
- Website Modernization spans full width on the last row (`md:col-span-2`)

---

### 3.8 Testimonials

**Section label:** `TESTIMONIALS`  
**Section heading:** `What clients say.`

**Two placeholder cards side by side:**

```
┌──────────────────────────────────┐  ┌──────────────────────────────────┐
│                                  │  │                                  │
│  "Client review will appear      │  │  "Client review will appear      │
│   here once received."           │  │   here once received."           │
│                                  │  │                                  │
│  — Name                          │  │  — Name                          │
│    Project / Server Name         │  │    Project / Server Name         │
│                                  │  │                                  │
└──────────────────────────────────┘  └──────────────────────────────────┘
```

- Card: `border border-zinc-800 rounded-xl p-8`
- Quote mark: `text-5xl text-zinc-700 leading-none select-none` (decorative `"` — no extra font needed, system default is fine at this size)
- Quote text: `text-zinc-400 mt-4 leading-relaxed`
- Attribution name: `text-white font-semibold text-sm mt-6`
- Attribution sub: `text-zinc-600 text-sm`
- Placeholder cards have `border-dashed border-zinc-800` to signal "coming soon"

---

### 3.9 About

**Section label:** `ABOUT`  
**Section heading:** `Elyxia`

**Single column, `max-w-2xl mx-auto`, centered:**

```
Front-End Developer specializing in gaming platforms, MMORPG server
websites, e-commerce experiences, and modern web applications.

I focus on performance, responsiveness, and modern UI — building
sites that feel professional whether the audience is players,
customers, or both.

React · TypeScript · Tailwind CSS · Supabase · Cloudflare
```

- First paragraph: `text-lg text-zinc-300 leading-relaxed`
- Second paragraph: `text-zinc-400 mt-4 leading-relaxed`
- Stack line: `text-zinc-600 text-sm mt-8 tracking-wide`

---

### 3.10 Contact

**Section label:** `CONTACT`  
**Section heading:** `Have a project in mind?`  
**Subheading:** `Let's build something players and customers will remember.`

Centered, `max-w-xl mx-auto`, `text-center`.

Three contact buttons in a horizontal row (`flex flex-wrap justify-center gap-4`):

| Button        | Icon         | URL / Value                          |
|---------------|--------------|--------------------------------------|
| Facebook      | FaFacebook   | https://www.facebook.com/angelo.diel |
| Discord       | FaDiscord    | elyxiaaaa                            |
| Email         | FaEnvelope   | elyxia.dev@outlook.com (add FaEnvelope to react-icons imports) |

- All three use the secondary CTA style: `border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white`

---

### 3.11 Footer

```
© 2026 Elyxia  ·  Built with React + Tailwind
```

- `border-t border-zinc-800 py-8 text-center text-sm text-zinc-600`

---

## 4. Scroll Behavior

- **Smooth scrolling:** `scroll-behavior: smooth` on `html`
- **Scroll-spy:** `IntersectionObserver` watching section IDs — updates active nav link
- **Scroll offset:** 80px header height accounted for with `scroll-mt-24` on each section
- **Scroll reveal:** `useScrollReveal` custom hook — `IntersectionObserver` adds `is-visible` class, CSS handles `opacity` + `translateY` transition

---

## 5. Responsiveness

| Breakpoint | Behavior                                                    |
|------------|-------------------------------------------------------------|
| Mobile     | Single column, hamburger nav, process steps stack vertically|
| Tablet     | 2-col grids, hero stacks (image below text)                 |
| Desktop    | Full 2-col hero, 3-col tech stack, 6-col process, full layout|

---

## 6. Performance Targets

- All project images already in `.webp` format — no conversion needed
- Images use `loading="lazy"` except hero browser mockup (eager)
- Font: Inter loaded via Google Fonts with `display=swap`
- No animation libraries — CSS transitions only
- No heavy dependencies added beyond existing stack

---

## 7. Out of Scope

- Dark/light mode toggle (dark only)
- Blog or CMS integration
- Contact form with backend (links only)
- Animations with GSAP/Framer Motion (CSS only)
- JJM URL and description (to be filled by user before launch)
- Ran Novus Rising and Origins Coffee Co. screenshots (placeholder until assets ready)
