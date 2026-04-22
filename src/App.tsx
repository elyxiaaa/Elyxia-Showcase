import { useEffect, useMemo, useState } from "react";
import {
  FaArrowRight,
  FaBars,
  FaBullseye,
  FaChevronRight,
  FaCode,
  FaDiscord,
  FaFacebook,
  FaGamepad,
  FaGlobe,
  FaLayerGroup,
  FaPalette,
  FaServer,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import {
  SiCloudflare,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

import NovusRising from "./assets/projects/NovusRising.webp";
import Aegis from "./assets/projects/Aegis.webp";
import Phoenix from "./assets/projects/Phoenix.webp";
import Apex from "./assets/projects/Apex.webp";
import Ultimates from "./assets/projects/Ultimates.webp";
import BlogApp from "./assets/projects/BlogApp.webp";
import ElyxiaLogo from "./assets/ElyxiaLogo.jpeg"

type NavKey =
  | "home"
  | "rf-showcase"
  | "other-projects"
  | "services"
  | "process"
  | "contact";

type ShowcaseProject = {
  title: string;
  image: string;
  live: string;
  tag: string;
  description: string;
  highlights: string[];
  stack: string[];
};

const navLinks: { label: string; key: Exclude<NavKey, "contact"> }[] = [
  { label: "Home", key: "home" },
  { label: "RF Showcase", key: "rf-showcase" },
  { label: "Other Projects", key: "other-projects" },
  { label: "Services", key: "services" },
  { label: "Process", key: "process" },
];

const rfProjects: ShowcaseProject[] = [
  {
    title: "Rising Force Novus Rising",
    image: NovusRising,
    live: "https://www.rfnovusrising.net",
    tag: "Server Website",
    description:
      "A polished RF Online web experience built to feel immersive, branded, and easy to navigate across desktop and mobile devices.",
    highlights: [
      "Strong game-themed visual direction",
      "Responsive section-based layout",
      "Modern landing page flow for player communities",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Cloudflare"],
  },
  {
    title: "Rising Force Aegis",
    image: Aegis,
    live: "https://www.rfaegis.net",
    tag: "Leaderboard UI",
    description:
      "A game platform website with leaderboard functionality, real-time player data presentation, and interactive sections designed for engagement.",
    highlights: [
      "API-powered leaderboard integration",
      "Real-time player data display",
      "Interactive front-end components",
    ],
    stack: ["React", "JavaScript", "Tailwind CSS", "Cloudflare"],
  },
  {
    title: "Rising Force Phoenix",
    image: Phoenix,
    live: "https://rfphoenix.net",
    tag: "Community Website",
    description:
      "A responsive RF Online website focused on visual hierarchy, community presentation, and a clean browsing experience for players.",
    highlights: [
      "Community-first page structure",
      "Game-focused visual storytelling",
      "Responsive experience across devices",
    ],
    stack: ["React", "JavaScript", "Tailwind CSS", "Cloudflare"],
  },
  {
    title: "Rising Force Apex",
    image: Apex,
    live: "https://rf-apex.pages.dev/",
    tag: "Feature-Rich Build",
    description:
      "A feature-heavy RF Online website with leaderboard and guild list integrations, plus a custom gear preview interface for players.",
    highlights: [
      "Leaderboard and guild list support",
      "Custom gear preview UI",
      "Interactive player-focused experience",
    ],
    stack: ["React", "JavaScript", "Tailwind CSS"],
  },
];

const otherProjects: ShowcaseProject[] = [
  {
    title: "Ultimates Construction Materials Trading",
    image: Ultimates,
    live: "https://ultimates-trading.pages.dev",
    tag: "Business Website",
    description:
      "A business-focused website built to present products and services clearly through a professional layout, responsive design, and practical browsing flow.",
    highlights: [
      "Professional company presentation",
      "Responsive business-focused layout",
      "Clean product and service browsing experience",
    ],
    stack: ["React", "JavaScript", "Tailwind CSS", "Cloudflare"],
  },
  {
    title: "Blog App",
    image: BlogApp,
    live: "https://blog-assessment-app.pages.dev/",
    tag: "Web Application",
    description:
      "A clean content-focused blog application designed for readable layouts, structured content browsing, and reusable front-end architecture.",
    highlights: [
      "Content-first interface design",
      "Responsive reading experience",
      "Reusable front-end structure",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
  },
];

const techBadgeMap: Record<string, React.ReactNode> = {
  React: <SiReact />,
  TypeScript: <SiTypescript />,
  "Tailwind CSS": <SiTailwindcss />,
  Cloudflare: <SiCloudflare />,
  Vercel: <SiVercel />,
  JavaScript: <FaCode />,
};

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">
      {children}
    </span>
  );
}

function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
      <span className="text-sm">{techBadgeMap[label] ?? <FaCode />}</span>
      {label}
    </span>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm transition duration-300 hover:border-cyan-300/20 ${className}`}
    >
      {children}
    </div>
  );
}

function ProjectGrid({
  projects,
}: {
  projects: ShowcaseProject[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
      {projects.map((project) => (
        <GlassCard
          key={project.title}
          className="group overflow-hidden hover:-translate-y-2 hover:bg-white/[0.07]"
        >
          <div className="relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent opacity-90" />
            <div className="absolute left-4 top-4">
              <SectionBadge>{project.tag}</SectionBadge>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-semibold">{project.title}</h3>
            <p className="mt-3 text-slate-300">{project.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <TechBadge key={item} label={item} />
              ))}
            </div>

            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <FaChevronRight className="mt-0.5 shrink-0 text-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition duration-300 hover:-translate-y-0.5"
              >
                <FaGlobe size={13} />
                View Live Site
              </a>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

export default function RFPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavKey>("home");

  const stats = useMemo(
    () => [
      ["4", "RF Showcases"],
      ["2", "Other Projects"],
      ["Responsive", "Production UI"],
    ],
    []
  );

  const services = [
    {
      title: "RF Server Websites",
      description:
        "Branded websites for RF Online servers with landing pages, content sections, downloads, announcements, and a modern front-end experience.",
      icon: <FaServer size={20} />,
    },
    {
      title: "Leaderboard & Player UI",
      description:
        "Front-end interfaces for rankings, guild lists, player data, and game-related sections that make websites more useful for the community.",
      icon: <FaGamepad size={20} />,
    },
    {
      title: "Community-Focused Design",
      description:
        "Layouts and visual systems built to make RF communities feel more active, immersive, and professional across all screen sizes.",
      icon: <FaUsers size={20} />,
    },
  ];

  const process = [
    {
      title: "Understand the server identity",
      text: "I start by learning the server branding, audience, feature priorities, and the kind of experience the website should deliver.",
      icon: <FaBullseye size={18} />,
    },
    {
      title: "Design the browsing flow",
      text: "I plan the layout around clarity, immersion, and how players should move through rankings, downloads, guides, and announcements.",
      icon: <FaPalette size={18} />,
    },
    {
      title: "Build and polish the front end",
      text: "I develop the UI using React and Tailwind CSS, focusing on responsiveness, visual consistency, and smooth interaction.",
      icon: <FaLayerGroup size={18} />,
    },
  ];

  const scrollTo = (id: NavKey) => {
  setMenuOpen(false);
  setActiveSection(id);

  const element = document.getElementById(id);
  if (!element) return;

  const headerOffset = 96;
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
};

useEffect(() => {
  const sectionIds: NavKey[] = [
    "home",
    "rf-showcase",
    "other-projects",
    "services",
    "process",
    "contact",
  ];

  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + 140;

    let currentSection: NavKey = "home";

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (!element) continue;

      const sectionTop = element.offsetTop;
      if (scrollPosition >= sectionTop) {
        currentSection = id;
      }
    }

    setActiveSection(currentSection);
  };

  updateActiveSection();
  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("resize", updateActiveSection);

  return () => {
    window.removeEventListener("scroll", updateActiveSection);
    window.removeEventListener("resize", updateActiveSection);
  };
}, []);

  return (
    <main
      className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-400/20"
      style={{ fontFamily: '"Space Grotesk", sans-serif' }}
    >
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-24 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_20%)]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-12">
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <img
                src={ElyxiaLogo}
                alt="Elyxia RF logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="leading-none">
              <div className="text-base font-semibold text-cyan-300 sm:text-lg">
                Elyxia Showcase
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.key;

              return (
                <button
                  key={link.key}
                  type="button"
                  onClick={() => scrollTo(link.key)}
                  className={`rounded-full px-4 py-2 text-sm transition duration-300 ${
                    isActive
                      ? "bg-cyan-400/10 text-cyan-300 shadow-[0_0_0_1px_rgba(34,211,238,0.18)]"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="hidden rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/10 md:inline-flex"
          >
            Inquire Now
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex rounded-xl border border-white/10 p-2 text-slate-200 md:hidden"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>

        <div
          className={`overflow-hidden border-t border-white/10 bg-slate-950 transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.key;

              return (
                <button
                  key={link.key}
                  type="button"
                  onClick={() => scrollTo(link.key)}
                  className={`rounded-xl px-3 py-2 text-left text-sm transition ${
                    isActive
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <section
        id="home"
        className="scroll-mt-24 relative overflow-hidden border-b border-white/10"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:px-10 lg:grid-cols-[1.12fr_0.88fr] lg:px-12 lg:py-28">
          <div className="space-y-8">
            <SectionBadge>Project Showcase</SectionBadge>

            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
                  Elyxia brand for RF Online websites and beyond
                </p>
                <h1 className="max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                  Web applications and showcase builds designed to feel immersive, polished, and production-ready.
                </h1>
              </div>

              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                This website is a dedicated showcase of my RF Online projects under the Elyxia, while also giving a broader view of the other front-end work I create outside the RF space.
              </p>

              <p className="max-w-2xl text-base leading-7 text-slate-400">
                If you came here from an RF group, you’ll first see the RF web applications. If you want to see more of my work as a front-end developer, there’s also a section for other projects below.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => scrollTo("rf-showcase")}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10"
              >
                View RF Showcase
                <FaArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={() => scrollTo("other-projects")}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                View Other Projects
              </button>
            </div>

            <div className="grid max-w-2xl grid-cols-2 gap-4 pt-2 sm:grid-cols-3">
              {stats.map(([value, label]) => (
                <GlassCard
                  key={label}
                  className="p-5 hover:-translate-y-1 hover:bg-white/[0.08]"
                >
                  <div className="text-2xl font-semibold">{value}</div>
                  <div className="mt-1 text-sm text-slate-300">{label}</div>
                </GlassCard>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <GlassCard className="w-full max-w-lg p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl hover:-translate-y-1">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-900 p-5">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
                      Elyxia
                    </p>
                    <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                      Showcase-driven front-end work
                    </h2>
                  </div>

                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/20 to-violet-500/20 p-3 shadow-lg shadow-cyan-900/20">
                    <img
                      src={ElyxiaLogo}
                      alt="Elyxia logo"
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-950 p-4 transition duration-300 hover:border-cyan-300/20">
                    <p className="text-sm text-slate-400">Focus</p>
                    <p className="mt-2 text-base font-medium text-white">
                      RF server websites, rankings, guild pages, and polished web application UI
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950 p-4 transition duration-300 hover:border-cyan-300/20">
                    <p className="text-sm text-slate-400">Core Stack</p>
                    <p className="mt-2 text-base font-medium text-white">
                      React, JavaScript, TypeScript, Tailwind CSS
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950 p-4 transition duration-300 hover:border-cyan-300/20">
                    <p className="text-sm text-slate-400">Why this site exists</p>
                    <p className="mt-2 text-base font-medium text-white">
                      To showcase RF-focused builds first, while still giving visitors a broader look at my front-end work
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section
        id="rf-showcase"
        className="scroll-mt-24 mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              RF Showcase
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              A showcase of RF Online websites built to look modern, immersive, and community-ready.
            </h2>
            </div>
            <p className="max-w-xl text-slate-300">
              These projects focus on strong visual identity, responsive front-end structure, and player-focused browsing experiences for RF Online communities.
            </p>
        </div>

        <ProjectGrid projects={rfProjects} />
      </section>

      <section
        id="other-projects"
        className="scroll-mt-24 border-y border-white/10 bg-white/5"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Other Projects
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Front-end work outside the RF Online space.
              </h2>
            </div>
            <p className="max-w-xl text-slate-300">
              This section gives a wider view of my development work beyond game-community sites, including business websites and general web applications.
            </p>
          </div>

          <ProjectGrid projects={otherProjects} />
        </div>
      </section>

      <section id="services" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Services
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                What I can build for RF communities.
              </h2>
            </div>
            <p className="max-w-xl text-slate-300">
              Front-end solutions tailored for RF Online servers that want a stronger online presence and a more polished community experience.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <GlassCard key={service.title} className="p-6 hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                  {service.icon}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {service.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="scroll-mt-24 mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Process
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              How I approach RF website projects.
            </h2>
          </div>
          <p className="max-w-xl text-slate-300">
            My goal is not only to make a site look good, but to make it feel aligned with the server and useful for the players.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {process.map((step, index) => (
            <GlassCard key={step.title} className="p-6 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                  {step.icon}
                </div>
                <span className="text-sm font-medium text-slate-500">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{step.text}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-24 mx-auto max-w-5xl px-6 py-20 text-center md:px-10"
      >
        <GlassCard className="p-8 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
            Need a website for your RF server?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            If you want a cleaner, more immersive, and more professional front-end presence for your RF Online community, let’s talk.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://www.facebook.com/angelo.diel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:-translate-y-0.5"
            >
              <FaFacebook size={14} />
              Facebook
            </a>
            <a
              href="https://discord.gg/Z4BUsgSsR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-white/10"
            >
              <FaDiscord size={14} />
              elyxiaaaa
            </a>
          </div>
        </GlassCard>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
        © 2026 Elyxia
      </footer>
    </main>
  );
}
