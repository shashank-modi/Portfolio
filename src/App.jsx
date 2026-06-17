import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMonitor } from 'react-icons/fi';
import ReactGA from 'react-ga4';
import Navbar from './components/Navbar';
import CinematicHero from './sections/CinematicHero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    ReactGA.initialize("G-1D8XS0EFDF");
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);

    document.fonts.ready.then(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  // 3. MOBILE VIEW: Render only the blocker
  if (isMobile) {
    return (
      <div className="mobile-blocker">
        <div className="blocker-content">
          <FiMonitor className="blocker-icon" />
          <h2 className="blocker-title">Desktop Only</h2>
          <p className="blocker-text">
            This portfolio features complex WebGL and GSAP animations engineered for larger screens.
            <br /><br />
            For the intended experience, please open this link on a laptop or desktop device.
          </p>
        </div>
      </div>
    );
  }

  // 4. DESKTOP VIEW: Render the full portfolio
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

        <section id="experience" className="section-experience">
          <Experience />
        </section>

        <section id="projects" className="section-projects">
          <Projects />
        </section>

        <section id="contact" className="section-contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;