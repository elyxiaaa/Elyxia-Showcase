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
              I focus on performance, responsiveness, and modern UI, building
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
