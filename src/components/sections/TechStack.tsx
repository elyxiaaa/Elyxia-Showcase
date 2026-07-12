import { useScrollReveal } from '../../hooks/useScrollReveal';

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
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
            Tools I build with.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            A small, proven stack. Every tool here has shipped to production.
          </p>
        </div>

        <div
          ref={ref}
          className="reveal-stagger grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
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
