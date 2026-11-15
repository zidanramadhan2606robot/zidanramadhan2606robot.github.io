import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playSfx } from '../lib/sfx';
import { setTheme } from '../lib/themeController';

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

function formatJakartaTime(): string {
  try {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: PERSONAL_INFO.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return `${PERSONAL_INFO.timezoneLabel} - ${fmt.format(new Date())}`;
  } catch {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    return `${PERSONAL_INFO.timezoneLabel} - ${hh}:${mm}:${ss}`;
  }
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [clockText, setClockText] = useState<string>(() => formatJakartaTime());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClockText(formatJakartaTime());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      // Theme revert to theme-1 when footer enters viewport
      ScrollTrigger.create({
        trigger: footer,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setTheme('theme-1'),
        onEnterBack: () => setTheme('theme-1'),
      });

      // Footer top split-text entrance
      const topEl = footer.querySelector('.footer-top');
      if (topEl) {
        const heading = topEl.querySelector('h2');
        const info = topEl.querySelector('.footer-top-info');
        const cta = topEl.querySelector('.btn-primary');

        let hSplit: SplitText | null = null;
        let iSplit: SplitText | null = null;
        if (heading) {
          hSplit = new SplitText(heading, { type: 'lines', linesClass: 'split-line', mask: 'lines' });
          splits.push(hSplit);
        }
        if (info) {
          iSplit = new SplitText(info, { type: 'lines', linesClass: 'split-line', mask: 'lines' });
          splits.push(iSplit);
        }

        if (hSplit?.lines.length) gsap.set(hSplit.lines, { yPercent: 110, autoAlpha: 0 });
        if (iSplit?.lines.length) gsap.set(iSplit.lines, { yPercent: 110, autoAlpha: 0 });
        if (cta) gsap.set(cta, { autoAlpha: 0, y: 20 });

        ScrollTrigger.create({
          trigger: topEl,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            if (hSplit?.lines.length) {
              const hMasks = heading?.querySelectorAll('.split-line-mask');
              tl.to(hSplit.lines, {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                onComplete: () => {
                  if (hMasks?.length) gsap.set(hMasks, { overflow: 'visible' });
                },
              });
            }
            if (iSplit?.lines.length) {
              const iMasks = info?.querySelectorAll('.split-line-mask');
              tl.to(
                iSplit.lines,
                {
                  yPercent: 0,
                  autoAlpha: 1,
                  duration: 0.8,
                  stagger: 0.05,
                  ease: 'power3.out',
                  onComplete: () => {
                    if (iMasks?.length) gsap.set(iMasks, { overflow: 'visible' });
                  },
                },
                hSplit?.lines.length ? '-=0.5' : 0,
              );
            }
            if (cta) {
              tl.to(
                cta,
                { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'transform,opacity,visibility' },
                '-=0.6',
              );
            }
          },
        });
      }

      // Footer middle stroke-to-fill scroll pin animation
      const pageNameEl = footer.querySelector('.footer-page-name');
      if (pageNameEl) {
        const fillTl = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: 'bottom bottom',
            end: '+=700',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        fillTl.fromTo(pageNameEl, { '--fill-progress': '0%' }, { '--fill-progress': '100%', ease: 'none', duration: 1 }, 0);
      }
    }, footer);

    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  const handleToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playSfx('click');
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, opts?: object) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} id="contact" className="footer" data-theme-change="theme-1">
      <div className="container">
        <div className="footer-top main-grid-8">
          <div className="footer-top-left">
            <h2 data-split="">
              Let&apos;s work
              <br />
              <em>together</em>
            </h2>
          </div>
          <div className="footer-top-right">
            <p className="footer-top-info" data-split="">
              {PERSONAL_INFO.footerInfo}
            </p>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="btn-primary"
              onClick={() => playSfx('click')}
            >
              Contact me
            </a>
          </div>
        </div>

        <div className="footer-middle">
          <div className="footer-page-name" aria-label={PERSONAL_INFO.fullName}>
            <span className="text-stroke" aria-hidden="true">
              Z<em>i</em>d<em>a</em>n R<em>a</em>m<em>a</em>dh<em>a</em>n
            </span>
            <span className="text-fill" aria-hidden="true">
              Z<em>i</em>d<em>a</em>n R<em>a</em>m<em>a</em>dh<em>a</em>n
            </span>
            <span className="footer-horizon-line" aria-hidden="true" />
          </div>
          <div className="footer-boxes main-grid-8">
            {Array.from({ length: 30 }).map((_, idx) => (
              <div key={`footer-box-${idx}`} className="grid-box" />
            ))}
          </div>
        </div>

        <div className="footer-bottom main-grid-8">
          <div className="footer-bottom-left">
            <p className="copyright">© 2026 All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-socials">
              <a href={`mailto:${PERSONAL_INFO.email}`} onClick={() => playSfx('click')}>
                Email
              </a>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSfx('click')}
              >
                LinkedIn
              </a>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSfx('click')}
              >
                GitHub
              </a>
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSfx('click')}
              >
                WhatsApp
              </a>
            </div>
            <div className="footer-info">
              <a href="#top" onClick={handleToTop} className="btn-to-top">
                To top
              </a>
              <p className="time footer-live-clock">
                <span className="time-dot" aria-hidden="true" />
                <span>{clockText}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
