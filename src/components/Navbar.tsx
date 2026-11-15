import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FEATURED_CASES } from '../data/portfolioData';
import { isSfxMuted, playSfx, toggleSfxMute } from '../lib/sfx';
import { getLoaderDelay } from '../lib/themeController';

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={muted ? 'is-muted' : undefined}
    >
      <rect x="2" y="6" width="1.33333" height="4" fill="var(--color-primary)" />
      <rect x="4.66797" y="4.6665" width="1.33333" height="1.33333" fill="var(--color-primary)" />
      <rect x="3.33203" y="5.3335" width="1.33333" height="1.33333" fill="var(--color-primary)" />
      <rect x="4.66797" y="10" width="1.33333" height="1.33333" fill="var(--color-primary)" />
      <rect x="3.33203" y="9.3335" width="1.33333" height="1.33333" fill="var(--color-primary)" />
      <rect x="6" y="11.3335" width="1.33333" height="1.33333" fill="var(--color-primary)" />
      <rect x="7.33203" y="12.6665" width="1.33333" height="1.33333" fill="var(--color-primary)" />
      <rect x="6" y="3.3335" width="1.33333" height="1.33333" fill="var(--color-primary)" />
      <rect x="7.33203" y="2" width="1.33333" height="1.33333" fill="var(--color-primary)" />
      <rect x="11.332" y="4.6665" width="1.33333" height="1.33333" fill="var(--color-primary)" />
      <rect x="11.332" y="10" width="1.33333" height="1.33333" fill="var(--color-primary)" />
      <rect x="12.668" y="6" width="1.33333" height="4" fill="var(--color-primary)" />
      <rect x="8.66797" y="2.6665" width="1.33333" height="10.6667" fill="var(--color-primary)" />
      <path
        className="mute-line"
        d="M2 14L14 2"
        stroke="var(--color-primary)"
        strokeWidth="1.33333"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Navbar() {
  const [muted, setMuted] = useState<boolean>(() => isSfxMuted());
  const [activeNav, setActiveNav] = useState<'top' | 'projects' | 'about' | 'contact'>('top');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navDesktopRef = useRef<HTMLDivElement>(null);
  const mobilePillRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const connectorOffsetRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const pillHiddenRef = useRef(false);

  useEffect(() => {
    const syncMute = () => setMuted(isSfxMuted());
    window.addEventListener('sfx:mute-change', syncMute);
    return () => window.removeEventListener('sfx:mute-change', syncMute);
  }, []);

  useEffect(() => {
    const delay = getLoaderDelay(2.15, 0.05);
    const ctx = gsap.context(() => {
      const desktopLinks = Array.from(
        document.querySelectorAll('.navbar .nav-desktop .nav-link, .navbar .nav-desktop .btn-volume'),
      );
      if (desktopLinks.length && desktopLinks[0].closest('.nav-desktop')) {
        if (delay > 0.1) {
          gsap.fromTo(
            desktopLinks,
            { y: -30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay },
          );
        } else {
          gsap.set(desktopLinks, { autoAlpha: 1, y: 0 });
        }
      }

      const pill = mobilePillRef.current;
      if (pill && window.getComputedStyle(pill).display !== 'none') {
        if (delay > 0.1) {
          gsap.fromTo(
            pill,
            { y: 50, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.65, ease: 'power3.out', delay },
          );
        } else {
          gsap.set(pill, { autoAlpha: 1, y: 0 });
        }
      }
    });

    // Track active section in viewport
    const onScroll = () => {
      const scrollY = window.scrollY;
      const projectsEl = document.getElementById('projects');
      const aboutEl = document.getElementById('about');
      const contactEl = document.getElementById('contact');
      const mid = window.innerHeight * 0.45;

      if (contactEl && contactEl.getBoundingClientRect().top <= mid) {
        setActiveNav('contact');
      } else if (aboutEl && aboutEl.getBoundingClientRect().top <= mid) {
        setActiveNav('about');
      } else if (projectsEl && projectsEl.getBoundingClientRect().top <= mid) {
        setActiveNav('projects');
      } else {
        setActiveNav('top');
      }

      // Auto-hide mobile pill when scrolling down fast
      const pill = mobilePillRef.current;
      if (pill && window.innerWidth <= 768 && !mobileMenuOpen) {
        const diff = scrollY - lastScrollYRef.current;
        const nearTop = scrollY < 50;
        const nearBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60;
        if ((nearTop || nearBottom || diff < -10) && pillHiddenRef.current) {
          pillHiddenRef.current = false;
          pill.style.pointerEvents = 'auto';
          gsap.to(pill, { y: 0, duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
        } else if (diff > 10 && scrollY > 70 && !pillHiddenRef.current) {
          pillHiddenRef.current = true;
          pill.style.pointerEvents = 'none';
          gsap.to(pill, { y: 90, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        }
        lastScrollYRef.current = Math.max(0, scrollY);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      ctx.revert();
      window.removeEventListener('scroll', onScroll);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    playSfx('click');
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: string | number, opts?: object) => void } }).lenis;
    if (targetId === 'top') {
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      if (lenis) lenis.scrollTo(`#${targetId}`, { duration: 1.2 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const nextMuted = toggleSfxMute();
    setMuted(nextMuted);
    if (!nextMuted) playSfx('click');
  };

  const positionPopover = () => {
    const trigger = document.getElementById('navProjectsTrigger');
    const popover = popoverRef.current;
    const connector = popover?.querySelector('.nav-dropdown-connector') as HTMLElement | null;
    if (!trigger || !popover) return;
    const rect = trigger.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const width = popover.offsetWidth || 180;
    const minX = width / 2 + 16;
    const maxX = window.innerWidth - width / 2 - 16;
    const clampedX = Math.max(minX, Math.min(maxX, cx));
    popover.style.left = `${clampedX}px`;
    popover.style.transform = 'translateX(-50%)';
    connectorOffsetRef.current = cx - clampedX;
    if (connector) {
      gsap.set(connector, { x: connectorOffsetRef.current });
    }
  };

  const openMobileDropdown = () => {
    if (mobileMenuOpen) {
      closeMobileDropdown();
      return;
    }
    setMobileMenuOpen(true);
    playSfx('click');
    const backdrop = backdropRef.current;
    const popover = popoverRef.current;
    if (!backdrop || !popover) return;

    const card = popover.querySelector('.nav-dropdown-card');
    const bg = popover.querySelector('.nav-dropdown-bg');
    const connector = popover.querySelector('.nav-dropdown-connector');
    const links = popover.querySelectorAll('.nav-dropdown-link');
    const closeBtn = popover.querySelector('.btn-dropdown-close');

    gsap.set(backdrop, { display: 'block' });
    gsap.set(popover, { display: 'flex', autoAlpha: 1 });
    if (card) gsap.set(card, { autoAlpha: 1, y: 0, scale: 1 });
    positionPopover();

    const tl = gsap.timeline();
    tl.fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power3.out' }, 0)
      .fromTo(
        connector,
        { scaleY: 0, x: connectorOffsetRef.current },
        { scaleY: 1, x: connectorOffsetRef.current, duration: 0.4, transformOrigin: 'bottom center', ease: 'power3.out' },
        0.05,
      )
      .fromTo(bg, { height: 0 }, { height: '100%', duration: 0.4, ease: 'power3.out' }, '-=0.3')
      .fromTo(
        links,
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 0.85, duration: 0.35, stagger: 0.06, ease: 'power3.out' },
        '-=0.4',
      )
      .fromTo(closeBtn, { autoAlpha: 0, scale: 0.7, rotate: -45 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.35, ease: 'back.out(1.7)' }, '-=0.2');
  };

  const closeMobileDropdown = () => {
    if (!mobileMenuOpen) return;
    setMobileMenuOpen(false);
    const backdrop = backdropRef.current;
    const popover = popoverRef.current;
    if (!backdrop || !popover) return;
    const card = popover.querySelector('.nav-dropdown-card');
    const bg = popover.querySelector('.nav-dropdown-bg');
    const connector = popover.querySelector('.nav-dropdown-connector');
    const links = popover.querySelectorAll('.nav-dropdown-link');
    const closeBtn = popover.querySelector('.btn-dropdown-close');

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(backdrop, { display: 'none' });
          gsap.set(popover, { display: 'none' });
        },
      })
      .to(links, { autoAlpha: 0, y: 8, duration: 0.15, ease: 'power2.in' }, 0)
      .to(bg, { height: 0, duration: 0.2, ease: 'power2.in' }, 0)
      .to(card, { y: 16, scale: 0.95, autoAlpha: 0, duration: 0.22, ease: 'power2.in' }, 0)
      .to(closeBtn, { autoAlpha: 0, scale: 0.7, rotate: -45, duration: 0.18, ease: 'power2.in' }, 0)
      .to(connector, { scaleY: 0, x: connectorOffsetRef.current, duration: 0.2, transformOrigin: 'bottom center' }, 0)
      .to(backdrop, { autoAlpha: 0, duration: 0.24, ease: 'power2.in' }, 0.05);
  };

  return (
    <>
      <nav className="navbar">
        <div ref={navDesktopRef} className="container nav-desktop">
          <div className="nav-contain main-grid-8">
            <div className="nav-left">
              <a
                href="#top"
                onClick={(e) => handleNavClick(e, 'top')}
                className={`nav-link ${activeNav === 'top' ? 'active' : ''}`}
                aria-label="Home"
              >
                <span className="num" />
                <span className="name">Home</span>
              </a>
            </div>
            <div className="nav-middle">
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, 'projects')}
                className={`nav-link ${activeNav === 'projects' ? 'active' : ''}`}
                aria-label="Projects"
              >
                <span className="num" />
                <span className="name">Projects</span>
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className={`nav-link ${activeNav === 'about' ? 'active' : ''}`}
                aria-label="About"
              >
                <span className="num" />
                <span className="name">About</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className={`nav-link ${activeNav === 'contact' ? 'active' : ''}`}
                aria-label="Contact me"
              >
                <span className="num" />
                <span className="name">Contact me</span>
              </a>
            </div>
            <div className="nav-right">
              <button
                type="button"
                className="btn-volume"
                data-sfx="none"
                aria-label={muted ? 'Unmute sound' : 'Mute sound'}
                onClick={handleToggleSound}
              >
                <SpeakerIcon muted={muted} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Floating Navigation Wrapper */}
      <div className="nav-mobile-wrapper">
        <div
          ref={backdropRef}
          className="nav-dropdown-backdrop"
          aria-hidden={!mobileMenuOpen}
          onClick={closeMobileDropdown}
        />

        <div
          ref={popoverRef}
          className="nav-dropdown-popover"
          role="dialog"
          aria-label="Projects Menu"
          aria-hidden={!mobileMenuOpen}
        >
          <button
            type="button"
            className="btn-dropdown-close"
            aria-label="Close projects menu"
            onClick={() => {
              playSfx('click');
              closeMobileDropdown();
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g fill="var(--color-primary)">
                <rect x="3" y="19" width="2" height="2" />
                <rect x="5" y="17" width="2" height="2" />
                <rect x="7" y="15" width="2" height="2" />
                <rect x="9" y="13" width="2" height="2" />
                <rect x="11" y="11" width="2" height="2" />
                <rect x="13" y="9" width="2" height="2" />
                <rect x="15" y="7" width="2" height="2" />
                <rect x="17" y="5" width="2" height="2" />
                <rect x="19" y="3" width="2" height="2" />
                <rect x="5" y="3" width="2" height="2" transform="rotate(90 5 3)" />
                <rect x="7" y="5" width="2" height="2" transform="rotate(90 7 5)" />
                <rect x="9" y="7" width="2" height="2" transform="rotate(90 9 7)" />
                <rect x="11" y="9" width="2" height="2" transform="rotate(90 11 9)" />
                <rect x="13" y="11" width="2" height="2" transform="rotate(90 13 11)" />
                <rect x="15" y="13" width="2" height="2" transform="rotate(90 15 13)" />
                <rect x="17" y="15" width="2" height="2" transform="rotate(90 17 15)" />
                <rect x="19" y="17" width="2" height="2" transform="rotate(90 19 17)" />
                <rect x="21" y="19" width="2" height="2" transform="rotate(90 21 19)" />
              </g>
            </svg>
          </button>

          <div className="nav-dropdown-card">
            <div className="nav-dropdown-bg" />
            <nav className="nav-dropdown-links" aria-label="Projects list">
              {FEATURED_CASES.map((item) => (
                <a
                  key={item.id}
                  href={`#case-${item.id}`}
                  className="nav-dropdown-link"
                  onClick={(e) => {
                    closeMobileDropdown();
                    handleNavClick(e, `case-${item.id}`);
                  }}
                >
                  <span>{item.title}</span>
                </a>
              ))}
              <a
                href="#projects"
                className="nav-dropdown-link"
                onClick={(e) => {
                  closeMobileDropdown();
                  handleNavClick(e, 'projects');
                }}
              >
                <span>All projects</span>
              </a>
            </nav>
          </div>
          <div className="nav-dropdown-connector" />
        </div>

        <div ref={mobilePillRef} className="nav-mobile" id="navMobilePill">
          <div className="nav-mobile-main">
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, 'top')}
              className={`nav-mobile-link ${activeNav === 'top' ? 'active' : ''}`}
              aria-label="Home"
            >
              <span className="nav-mobile-link-text">Home</span>
            </a>
            <button
              type="button"
              id="navProjectsTrigger"
              className={`nav-mobile-link ${activeNav === 'projects' ? 'active' : ''}`}
              aria-label="Projects"
              aria-haspopup="dialog"
              aria-expanded={mobileMenuOpen}
              onClick={openMobileDropdown}
            >
              <span className="nav-mobile-link-text">Projects</span>
            </button>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className={`nav-mobile-link ${activeNav === 'about' ? 'active' : ''}`}
              aria-label="About"
            >
              <span className="nav-mobile-link-text">About</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`nav-mobile-link ${activeNav === 'contact' ? 'active' : ''}`}
              aria-label="Contact"
            >
              <span className="nav-mobile-link-text">Contact</span>
            </a>
          </div>
          <div className="nav-mobile-vol">
            <button
              type="button"
              className="btn-volume"
              data-sfx="none"
              aria-label={muted ? 'Unmute sound' : 'Mute sound'}
              onClick={handleToggleSound}
            >
              <SpeakerIcon muted={muted} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
