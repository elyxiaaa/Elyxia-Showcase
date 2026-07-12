import { FaArrowRight, FaEnvelope } from 'react-icons/fa';
import { BrowserMockup } from '../ui/BrowserMockup';
import RanNovusRisingImg from '../../assets/projects/RanNovusRising.webp';
import NovusRisingEcommerceImg from '../../assets/projects/NovusRisingEcommerce.webp';
import NovusRisingImg from '../../assets/projects/NovusRising.webp';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Hero() {
  return (
    <section className="border-b border-zinc-800">
      <div className="mx-auto grid max-w-screen-xl items-center gap-16 px-6 py-24 md:px-10 lg:grid-cols-2 lg:px-16 lg:py-32">
        <div className="space-y-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Front-End Developer
          </p>

          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight text-white lg:text-7xl xl:text-8xl">
              Elyxia
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-zinc-400">
              Building modern gaming platforms, e-commerce experiences, and web
              applications that users actually enjoy using.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => scrollToId('projects')}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              View Projects
              <FaArrowRight size={13} />
            </button>
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
            >
              <FaEnvelope size={13} />
              Contact Me
            </button>
          </div>

          <p className="flex items-center gap-2.5 text-sm text-zinc-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
          </p>
        </div>

        <div className="relative hidden pb-16 pr-12 lg:block">
          <div className="absolute inset-0 z-10 translate-x-10 translate-y-12 opacity-30">
            <BrowserMockup
              url="rfnovusrising.net"
              image={NovusRisingImg}
              alt="RF Novus Rising website preview"
            />
          </div>
          <div className="absolute inset-0 z-20 translate-x-5 translate-y-6 opacity-60">
            <BrowserMockup
              url="shop.novusrising.net"
              image={NovusRisingEcommerceImg}
              alt="Novus Rising Shop storefront preview"
            />
          </div>
          <div className="relative z-30 shadow-2xl shadow-black/60">
            <BrowserMockup
              url="ran.novusrising.net"
              image={RanNovusRisingImg}
              alt="Ran Novus Rising website preview"
              className="transition-transform duration-500 hover:scale-[1.02]"
              imageLoading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
