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
