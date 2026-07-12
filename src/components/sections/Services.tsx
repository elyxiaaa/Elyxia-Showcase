import { useScrollReveal } from '../../hooks/useScrollReveal';

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
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
            What I build.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            From full gaming platforms to single landing pages. If it runs in
            a browser, I can build it.
          </p>
        </div>

        <div
          ref={ref}
          className="reveal-stagger grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2"
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
