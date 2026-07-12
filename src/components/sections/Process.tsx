import { useScrollReveal } from '../../hooks/useScrollReveal';

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
      'Building the UI with React and Tailwind CSS. Component-first, clean, and maintainable.',
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
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
            How I work.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            The same six steps on every project, whether it is a game server
            launch or a storefront.
          </p>
        </div>

        <div
          ref={ref}
          className="reveal-stagger grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3"
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
