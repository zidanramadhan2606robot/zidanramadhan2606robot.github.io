import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { Footer } from './components/Footer';
import { FloatingScrollbar } from './components/FloatingScrollbar';
import { playSfx } from './lib/sfx';
import { setTheme } from './lib/themeController';

gsap.registerPlugin(ScrollTrigger);

const FAVICON_STAR = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="8" fill="black"/><path d="M47 14H53V86H47V14ZM14 47H86V53H14V47ZM58 34H66V42H58V34ZM50 42H58V50H50V42ZM42 50H50V58H42V50ZM34 58H42V66H34V58ZM26 66H34V74H26V66ZM26 26H34V34H26V26ZM34 34H42V42H34V34ZM42 42H50V50H42V42ZM50 50H58V58H50V50ZM58 58H66V66H58V58ZM66 66H74V74H66V66ZM66 26H74V34H66V26Z" fill="white"/></svg>',
)}`;

const FAVICON_CODE = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="8" fill="black"/><path d="M84 50H92V58H84V50ZM76 58H84V66H76V58ZM68 66H76V74H68V66ZM60 74H68V82H60V74ZM60 18H68V26H60V18ZM68 26H76V34H68V26ZM76 34H84V42H76V34ZM84 42H92V50H84V42ZM16 34H24V42H16V34ZM44 50H52V58H44V50ZM8 42H16V50H8V42ZM40 58H48V66H40V58ZM32 74H40V82H32V74ZM32 18H40V26H32V18ZM52 34H60V42H52V34ZM8 50H16V58H8V50ZM16 58H24V66H16V58ZM24 66H32V74H24V66ZM24 26H32V34H24V26ZM48 42H56V50H48V42Z" fill="white"/></svg>',
)}`;

export default function App() {
  useEffect(() => {
    setTheme('theme-1');

    // Initialize global Lenis smooth scroll bridged with GSAP Ticker & ScrollTrigger
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Ensure ScrollTrigger priority order & refresh once mounted
    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    const onWindowLoad = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', onWindowLoad);

    // Keyboard interaction sfx on interactive links/buttons
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || ['Meta', 'Shift', 'Control', 'Alt', 'Tab'].includes(e.key)) return;
      const active = document.activeElement;
      if (!active || ['INPUT', 'TEXTAREA'].includes(active.tagName)) return;
      if (active.closest('a, button, [role="button"]')) {
        playSfx('key-press');
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Dynamic favicon toggle (* <-> </>) while tab is visible
    let favToggle = false;
    let favInterval: number | null = null;
    const swapFavicon = () => {
      if (document.hidden) return;
      const link = document.querySelector("link[type='image/svg+xml']") as HTMLLinkElement | null;
      if (link) {
        favToggle = !favToggle;
        link.href = favToggle ? FAVICON_CODE : FAVICON_STAR;
      }
    };
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      favInterval = window.setInterval(swapFavicon, 1500);
    }

    return () => {
      cancelAnimationFrame(refreshId);
      window.removeEventListener('load', onWindowLoad);
      window.removeEventListener('keydown', onKeyDown);
      if (favInterval !== null) clearInterval(favInterval);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Preloader />
      <FloatingScrollbar />
      <Navbar />
      <main id="top">
        <Hero />
        <ProjectShowcase />
        <ExperienceSection />
        <SkillsSection />
      </main>
      <Footer />
    </>
  );
}
