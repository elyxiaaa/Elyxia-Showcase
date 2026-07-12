import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const NAV_LINKS = [
  { label: 'Projects', id: 'projects' },
  { label: 'Process', id: 'process' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
] as const;

const ALL_SECTION_IDS = [...NAV_LINKS.map((l) => l.id), 'contact'];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollY = window.scrollY + 120;
      let current = '';
      for (const id of ALL_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-zinc-800 transition-colors duration-300 ${
        scrolled ? 'bg-zinc-950/90 backdrop-blur-sm' : 'bg-zinc-950'
      }`}
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-lg font-semibold text-white transition-colors hover:text-zinc-300"
        >
          Elyxia
        </button>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToId(link.id)}
              aria-current={activeSection === link.id ? 'true' : undefined}
              className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                activeSection === link.id
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => scrollToId('contact')}
          className="hidden rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white md:inline-flex"
        >
          Contact
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="-m-3 p-3 text-zinc-400 transition-colors hover:text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-zinc-800 bg-zinc-950 transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto flex max-w-screen-xl flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => { scrollToId(link.id); setMenuOpen(false); }}
              className={`rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                activeSection === link.id ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => { scrollToId('contact'); setMenuOpen(false); }}
            className="rounded-lg px-3 py-2.5 text-left text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}
