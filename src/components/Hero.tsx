import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playSfx } from '../lib/sfx';
import { getLoaderDelay } from '../lib/themeController';

gsap.registerPlugin(SplitText);

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const REEL_DIGITS = [...DIGITS, ...DIGITS, ...DIGITS];
const ODOMETER_TARGETS = ['2', '0', '2', '6'];

function SmallStarSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5998 0.799805H8.3998L9.1998 7.9998L8.3998 15.1998H7.5998L6.7998 7.9998L7.5998 0.799805Z" fill="var(--color-primary)" />
      <path d="M15.2002 7.5998L15.2002 8.3998L8.0002 9.1998L0.800196 8.3998L0.800196 7.5998L8.0002 6.7998L15.2002 7.5998Z" fill="var(--color-primary)" />
    </svg>
  );
}

function StarsCluster({ typeClass }: { typeClass: string }) {
  return (
    <div className={`grid-box type-stars ${typeClass}`}>
      <div className="stars-group">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="star-box">
            <SmallStarSvg />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Monoline Architectural Vector Glyphs */
function ArchGitHubIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

function ArchLinkedInIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 11v5" />
      <path d="M8 8v.01" />
      <path d="M12 16v-5" />
      <path d="M16 16v-3a2 2 0 0 0-4 0" />
    </svg>
  );
}

function ArchWhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function ArchEmailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ArchCompassDialSvg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="24" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="2 3" opacity="0.55" />
      <circle cx="32" cy="32" r="14" stroke="var(--color-primary)" strokeWidth="1" opacity="0.4" />
      <line x1="32" y1="2" x2="32" y2="16" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.8" />
      <line x1="32" y1="48" x2="32" y2="62" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.8" />
      <line x1="2" y1="32" x2="16" y2="32" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.8" />
      <line x1="48" y1="32" x2="62" y2="32" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.8" />
      <circle cx="32" cy="32" r="2.5" fill="var(--color-accent)" />
    </svg>
  );
}

function ArchScrollCueSvg() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="4" x2="12" y2="19" />
      <polyline points="6 13 12 19 18 13" />
    </svg>
  );
}

interface ArchBadgeProps {
  index: string;
  label: string;
  href: string;
  ariaLabel: string;
  external?: boolean;
  icon: React.ReactNode;
}

function ArchBadge({ index, label, href, ariaLabel, external = true, icon }: ArchBadgeProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="social-box arch-badge"
      aria-label={ariaLabel}
      onClick={() => playSfx('click')}
    >
      <div className="arch-badge-top">
        <span className="arch-badge-index">{index}</span>
        <span className="arch-badge-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="arch-badge-icon">{icon}</div>
      <div className="arch-badge-bottom">{label}</div>
    </a>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let odoBusy = true;
    const delay = getLoaderDelay(2.15, 0.05);

    const ctx = gsap.context(() => {
      const heroTexts = section.querySelector('.hero-texts') as HTMLElement | null;
      const heroBoxes = section.querySelector('.hero-boxes') as HTMLElement | null;
      const bioEl = section.querySelector('.hero-bio [data-split]') as HTMLElement | null;
      if (!heroTexts || !heroBoxes) return;

      let bioSplit: SplitText | null = null;
      if (bioEl) {
        bioSplit = new SplitText(bioEl, { type: 'lines', linesClass: 'split-line', mask: 'lines' });
      }

      const tl = gsap.timeline({ delay, defaults: { ease: 'power3.out' } });
      tl.set(heroTexts, { visibility: 'visible' });

      const heroWords = section.querySelectorAll('.hero-h1 .hero-word, .hero-h1 .split-line');
      if (heroWords.length > 0) {
        tl.fromTo(heroWords, { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.1 });
        const masks = section.querySelectorAll('.hero-h1 .hero-word-mask');
        if (masks.length > 0) {
          tl.set(masks, { overflow: 'visible' }, '-=0.3');
        }
      }

      const bioLines = section.querySelectorAll('.hero-bio .split-line');
      if (bioLines.length > 0) {
        tl.fromTo(bioLines, { yPercent: 100 }, { yPercent: 0, duration: 0.8, stagger: 0.1 }, '-=0.5');
      }

      const visibleBoxes = Array.from(heroBoxes.querySelectorAll('.grid-box')).filter(
        (el) => window.getComputedStyle(el).display !== 'none',
      );
      const specialBoxes = visibleBoxes.filter((el) => el.className.includes('type-'));
      const plainBoxes = visibleBoxes.filter((el) => !el.className.includes('type-'));

      if (specialBoxes.length > 0) {
        tl.fromTo(
          specialBoxes,
          { autoAlpha: 0, scale: 0.4 },
          {
            autoAlpha: 1,
            scale: 1,
            ease: 'elastic.out(1, 0.75)',
            duration: 1,
            stagger: { amount: 0.5, from: 'random' },
          },
          0.6,
        );
        tl.to(heroBoxes, { '--border-opacity': 1, duration: 0.4, ease: 'power2.out' });
      }

      if (plainBoxes.length > 0) {
        tl.fromTo(
          plainBoxes,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6, ease: 'power2.out' },
          specialBoxes.length > 0 ? 1 : 0.6,
        );
      }

      // Odometer 2026 roll entrance
      const odoReels = Array.from(section.querySelectorAll('.type-odometer .odo-reel'));
      const odoDelay = delay + 0.25;
      odoReels.forEach((reel, idx) => {
        const targetDigit = parseInt(reel.getAttribute('data-target') || '0', 10);
        const stopIndex = 10 + targetDigit;
        const isLast = idx === odoReels.length - 1;
        gsap.fromTo(
          reel,
          { yPercent: 0 },
          {
            yPercent: -stopIndex * 100,
            duration: 0.95 + idx * 0.16,
            delay: odoDelay + idx * 0.05,
            ease: 'power3.out',
            onComplete: () => {
              if (isLast) odoBusy = false;
            },
          },
        );
      });

      const odoContainer = section.querySelector('.type-odometer');
      const handleOdoHover = () => {
        if (odoBusy) return;
        odoBusy = true;
        odoReels.forEach((reel, idx) => {
          const currentY = Number(gsap.getProperty(reel, 'yPercent')) || 0;
          let step = Math.round(Math.abs(currentY) / 100);
          if (step >= 20) {
            step -= 10;
            gsap.set(reel, { yPercent: -step * 100 });
          }
          const nextStep = step + 10;
          const isLast = idx === odoReels.length - 1;
          gsap.to(reel, {
            yPercent: -nextStep * 100,
            duration: 1.2 + idx * 0.2,
            delay: idx * 0.06,
            ease: 'power3.out',
            onComplete: () => {
              if (isLast) odoBusy = false;
            },
          });
        });
      };

      odoContainer?.addEventListener('mouseenter', handleOdoHover);

      return () => {
        odoContainer?.removeEventListener('mouseenter', handleOdoHover);
        bioSplit?.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleScrollDown = () => {
    playSfx('click');
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: string | number, opts?: object) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo('#projects', { duration: 1.1 });
    } else {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="hero-home-sec" data-theme-change="theme-1">
      <div className="container">
        <div className="hero-home-contain">
          <div className="hero-texts">
            <h1 className="hero-h1" aria-label={PERSONAL_INFO.fullName}>
              <span className="hero-word-mask">
                <span className="hero-word">
                  Z<em>i</em>d<em>a</em>n
                </span>
              </span>
              <span className="hero-word-mask">
                <span className="hero-word">
                  R<em>a</em>m<em>a</em>dh<em>a</em>n
                </span>
              </span>
            </h1>
            <p className="hero-bio" aria-label={PERSONAL_INFO.bio}>
              <span data-split="" aria-hidden="true">
                {PERSONAL_INFO.bio}
              </span>
            </p>
          </div>

          <div className="hero-boxes main-grid-8">
            {/* Live Palembang Telemetry Cell */}
            <div className="grid-box type-telemetry">
              <div className="telemetry-cell">
                <div className="telemetry-top">
                  <span className="telemetry-dot" aria-hidden="true" />
                  <span>PLG // ID</span>
                </div>
                <div className="telemetry-coords">
                  <span>2°59&apos;S</span>
                  <span>104°45&apos;E</span>
                </div>
              </div>
            </div>

            <div className="grid-box type-gh">
              <ArchBadge
                index="01"
                label="GITHUB"
                href={PERSONAL_INFO.githubUrl}
                ariaLabel="GitHub profile"
                icon={<ArchGitHubIcon />}
              />
            </div>

            <div className="grid-box type-linkedin">
              <ArchBadge
                index="02"
                label="LINKEDIN"
                href={PERSONAL_INFO.linkedinUrl}
                ariaLabel="LinkedIn profile"
                icon={<ArchLinkedInIcon />}
              />
            </div>

            <div className="grid-box type-wa">
              <ArchBadge
                index="03"
                label="WHATSAPP"
                href={PERSONAL_INFO.whatsappUrl}
                ariaLabel="WhatsApp contact"
                icon={<ArchWhatsAppIcon />}
              />
            </div>

            <div className="grid-box type-email">
              <ArchBadge
                index="04"
                label="EMAIL"
                href={`mailto:${PERSONAL_INFO.email}`}
                ariaLabel="Send email"
                external={false}
                icon={<ArchEmailIcon />}
              />
            </div>

            <StarsCluster typeClass="type-1" />
            <StarsCluster typeClass="type-2" />
            <StarsCluster typeClass="type-3" />
            <StarsCluster typeClass="type-4" />

            <div className="grid-box type-odometer" aria-label="2026">
              <div className="odometer-grid">
                {ODOMETER_TARGETS.map((digit, idx) => (
                  <div key={idx} className={`odo-cell d${idx + 1}`}>
                    <div className="odo-reel-contain">
                      <div className="odo-reel" data-target={digit}>
                        {REEL_DIGITS.map((num, nIdx) => (
                          <span key={nIdx}>{num}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid-box type-role">
              <span>
                Web &amp; Mobile <br />
                // Dev
              </span>
            </div>

            <div className="grid-box type-arrow">
              <button
                type="button"
                className="scroll-cue-btn"
                aria-label="Scroll to projects"
                onClick={handleScrollDown}
              >
                <ArchScrollCueSvg />
                <span>SCROLL // 01</span>
              </button>
            </div>

            <div className="grid-box type-star" aria-hidden="true">
              <ArchCompassDialSvg />
            </div>

            {/* 27 filler grid squares completing the mathematical 8x4 (32) / 10x4 (40) layout */}
            {Array.from({ length: 27 }).map((_, i) => (
              <div key={`filler-${i}`} className="grid-box" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
