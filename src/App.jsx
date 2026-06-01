import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';

import CinematicHero from './sections/CinematicHero';
import About from './sections/About';
import Skills from './sections/Skills';
import TearDowns from './sections/TearDowns';
import CinematicContact from './sections/CinematicContact';
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="noise-overlay" />
      <Navbar />
      <main className="main-content">
        <section id="hero" className="section-hero">
          <CinematicHero />
        </section>

        <section id="about" className="section-about">
          <About />
        </section>

        <section id="skills" className="section-skills">
          <Skills />
        </section>

        <section id="teardowns" className="section-teardowns">
          <TearDowns />
        </section>
        <section id="contact" className="section-contact">
          <CinematicContact />
        </section>

      </main>

    </div>
  );
}

export default App;