import NovusRisingImg from '../assets/projects/NovusRising.webp';
import AegisImg from '../assets/projects/Aegis.webp';
import PhoenixImg from '../assets/projects/Phoenix.webp';
import ApexImg from '../assets/projects/Apex.webp';
import UltimatesImg from '../assets/projects/Ultimates.webp';
import BlogAppImg from '../assets/projects/BlogApp.webp';
import JJMImg from '../assets/projects/JJM.webp';
import RanNovusRisingImg from '../assets/projects/RanNovusRising.webp';
import NovusRisingEcommerceImg from '../assets/projects/NovusRisingEcommerce.webp';

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
    title: 'Ran Novus Rising',
    industry: 'MMORPG',
    year: '2026',
    group: 'gaming',
    liveUrl: 'https://ran.novusrising.net',
    image: RanNovusRisingImg,
    description:
      'A branded Ran Online server website built for the Novus Rising community. Immersive, responsive, and designed to match the identity of a new server launch.',
    overview:
      'Full server website for Ran Novus Rising, covering landing page, server information, and community sections.',
    challenges:
      'Launching a Ran Online site that feels fresh and on-brand for the Novus Rising name, while meeting the expectations of a competitive private server community.',
    solutions:
      'Component-first React architecture with a Tailwind CSS design system tuned to the server branding. Responsive breakpoints and clear section hierarchy throughout.',
    results:
      'Live production site at ran.novusrising.net serving the Ran Novus Rising community across desktop and mobile.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages'],
  },
  {
    id: '02',
    title: 'RF Novus Rising',
    industry: 'MMORPG',
    year: '2026',
    group: 'gaming',
    liveUrl: 'https://www.rfnovusrising.net',
    image: NovusRisingImg,
    description:
      'A branded RF Online server website powered by a live API, surfacing real-time server status, total online players, and a real-time player kill feed straight from the game database.',
    overview:
      'Full server website with a live data layer covering server status, total player count, and real-time player kills, alongside the landing page, server information, downloads, and community sections.',
    challenges:
      'Pulling live server status, player counts, and kill data from the game database and presenting it in real time, without the UI feeling slow or cluttered as numbers update.',
    solutions:
      'Connected the front end to an API-backed database and built React components that poll and render live server status, total players, and the player kill feed, all tuned to the server branding with Tailwind CSS.',
    results:
      'Live production site serving the RF Novus Rising community with real-time server and player data across desktop and mobile.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'REST API', 'Cloudflare Pages'],
  },
  {
    id: '03',
    title: 'RF Aegis',
    industry: 'MMORPG',
    year: '2025',
    group: 'gaming',
    liveUrl: 'https://www.rfaegis.net',
    image: AegisImg,
    description:
      'A game platform website with real-time leaderboard and player data, designed to make community rankings feel engaging and easy to navigate.',
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
    id: '04',
    title: 'RF Phoenix',
    industry: 'MMORPG',
    year: '2026',
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
    id: '05',
    title: 'RF Apex',
    industry: 'MMORPG',
    year: '2024',
    group: 'gaming',
    liveUrl: 'https://rf-apex.pages.dev/',
    image: ApexImg,
    description:
      'A feature-rich RF Online server site with integrated leaderboard, guild list, and a custom gear preview interface for players.',
    overview:
      'Full-featured server website including leaderboard, guild list, and a dedicated gear preview UI, all in one cohesive front end.',
    challenges:
      'Implementing multiple interactive features in a single UI that stays cohesive and easy to navigate.',
    solutions:
      'Structured the site around clear tab-based navigation for each feature, with dedicated components for player data and gear preview.',
    results:
      'Fully featured game website live at rf-apex.pages.dev with leaderboard, guild list, and gear preview all in production.',
    stack: ['React', 'JavaScript', 'Tailwind CSS'],
  },
  {
    id: '06',
    title: 'Novus Rising Shop',
    industry: 'E-Commerce',
    year: '2026',
    group: 'other',
    liveUrl: 'https://shop.novusrising.net',
    image: NovusRisingEcommerceImg,
    description:
      'A Shopify-powered e-commerce storefront for the Novus Rising gaming community, built with a GraphQL data layer and a fully custom React front end.',
    overview:
      "Custom-built e-commerce experience for Novus Rising, connecting a React + TypeScript front end to Shopify's Storefront API via GraphQL for real-time product and checkout data.",
    challenges:
      "Building a storefront that feels native to the gaming brand while integrating Shopify's headless checkout flow, without relying on generic Shopify templates.",
    solutions:
      "Used Shopify's Storefront API with GraphQL to query products, carts, and checkout. Built a fully custom React UI with Tailwind CSS, keeping the brand identity consistent throughout.",
    results:
      'Live production storefront at shop.novusrising.net, serving the Novus Rising community with a seamless, on-brand purchase experience.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Shopify Checkout', 'Cloudflare Pages'],
  },
  {
    id: '07',
    title: 'Ultimates Construction Materials Trading',
    industry: 'Business',
    year: '2024',
    group: 'other',
    liveUrl: 'https://ultimates-trading.pages.dev',
    image: UltimatesImg,
    description:
      'A professional business website for Ultimates Construction Materials Trading, built to present products and services clearly to potential clients.',
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
    id: '08',
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
      'Blog UIs need to balance content density with readability. Getting typography, spacing, and structure right for long-form reading.',
    solutions:
      'Built with a content-first design system: clean type scale, appropriate line lengths, logical content hierarchy, and reusable layout components.',
    results:
      'Deployed, fully functional blog application with a readable, responsive reading experience.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  },
  {
    id: '09',
    title: 'JJM',
    industry: 'Business',
    year: '2024',
    group: 'other',
    liveUrl: null,
    image: JJMImg,
    description:
      'A private client website built to serve a specific business audience with a professional, branded online presence.',
    overview:
      "Business website delivered for a private client. Responsive, performant, and tailored to the client's brand requirements.",
    challenges:
      "Translating the client's brand requirements into a web experience that feels appropriate for their audience while remaining fast and responsive.",
    solutions:
      'Delivered a focused front end with React and Tailwind CSS, prioritising performance, clean code, and cross-device compatibility.',
    results:
      'Successfully delivered and live in production. Client details are confidential.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages'],
  },
];

export const gamingProjects = projects.filter((p) => p.group === 'gaming');
export const otherProjects = projects.filter((p) => p.group === 'other');
