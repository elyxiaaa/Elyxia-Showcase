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
      "Business website delivered for a private client — responsive, performant, and tailored to the client's brand requirements.",
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
