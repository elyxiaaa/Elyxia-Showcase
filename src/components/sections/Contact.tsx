import { FaDiscord, FaEnvelope, FaFacebook } from 'react-icons/fa';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const LINKS = [
  {
    label: 'Discord · elyxiaaaa',
    href: 'https://discord.gg/Z4BUsgSsR',
    icon: FaDiscord,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/angelo.diel',
    icon: FaFacebook,
  },
] as const;

export default function Contact() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="scroll-mt-20 border-b border-zinc-800">
      <div className="mx-auto max-w-screen-xl px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div ref={ref} className="reveal max-w-xl">
          <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
            Have a project in mind?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            Let's build something players and customers will remember. Email
            is the fastest way to reach me.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:oquinianoa@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              <FaEnvelope size={14} />
              oquinianoa@gmail.com
            </a>
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
              >
                <link.icon size={14} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
