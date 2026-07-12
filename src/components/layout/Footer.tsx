import { FaDiscord, FaEnvelope, FaFacebook } from 'react-icons/fa';

const NAV = [
  { label: 'Projects', id: 'projects' },
  { label: 'Process', id: 'process' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
] as const;

const SOCIALS = [
  {
    label: 'Email',
    href: 'mailto:oquinianoa@gmail.com',
    icon: FaEnvelope,
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/Z4BUsgSsR',
    icon: FaDiscord,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/angelo.diel',
    icon: FaFacebook,
  },
] as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-10 lg:px-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">Elyxia</p>
            <p className="mt-1 max-w-xs text-sm leading-relaxed text-zinc-500">
              Front-end development for gaming platforms, e-commerce, and
              modern web applications.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToId(link.id)}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={social.label}
                className="text-zinc-500 transition-colors hover:text-white"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 border-t border-zinc-800 pt-6 text-sm text-zinc-500">
          © 2026 Elyxia · Built with React + Tailwind
        </p>
      </div>
    </footer>
  );
}
