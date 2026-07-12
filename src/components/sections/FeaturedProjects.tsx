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
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-zinc-500">
            {project.industry}
          </span>
          <span className="text-xs text-zinc-500">{project.year}</span>
        </div>
      </div>

      <p className="leading-relaxed text-zinc-400">{project.description}</p>

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {DETAILS.map(({ key, label }) => (
          <div key={key} className="border-t border-zinc-800 pt-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              {label}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
              {project[key as DetailKey]}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-zinc-500">{project.stack.join(' · ')}</p>

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
            alt={`${project.title} website screenshot`}
            className="aspect-[16/10] w-full object-cover object-top"
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
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
            Projects that shipped.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            Nine projects across gaming, e-commerce, and business. Most are
            live in production right now.
          </p>
        </div>

        <div className="mb-8">
          <SectionLabel>Gaming &amp; MMORPG</SectionLabel>
        </div>
        {gamingProjects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}

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
    </section>
  );
}
