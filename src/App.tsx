import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import TrustStats from './components/sections/TrustStats';
import FeaturedProjects from './components/sections/FeaturedProjects';
import Process from './components/sections/Process';
import TechStack from './components/sections/TechStack';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Navbar />
      <main>
        <Hero />
        <TrustStats />
        <FeaturedProjects />
        <Process />
        <TechStack />
        <Services />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
