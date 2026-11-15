import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { PERSONAL_INFO } from '../data/portfolioData';
import { setTheme } from '../lib/themeController';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function ExperienceSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = secRef.current;
    if (!section) return;

    let bioSplit: SplitText | null = null;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setTheme('theme-1'),
        onEnterBack: () => setTheme('theme-1'),
      });

      const splitEl = section.querySelector('[data-split-scroll]') as HTMLElement | null;
      if (splitEl) {
        bioSplit = new SplitText(splitEl, { type: 'lines', linesClass: 'split-line', mask: 'lines' });
        const lines = splitEl.querySelectorAll('.split-line');
        const masks = splitEl.querySelectorAll('.split-line-mask');
        if (lines.length) {
          gsap.set(lines, { yPercent: 110, autoAlpha: 0 });
          ScrollTrigger.create({
            trigger: splitEl,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(lines, {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.08,
                ease: 'power3.out',
                onComplete: () => {
                  if (masks.length) gsap.set(masks, { overflow: 'visible' });
                },
              });
            },
          });
        }
      }
    }, section);

    return () => {
      bioSplit?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={secRef} id="about" className="about-me-sec" data-theme-change="theme-1">
      <div className="container pad-120">
        <div className="about-me-contain">
          <div className="about-me-texts main-grid-8">
            <div className="about-me-left">
              <h2 className="h2-tag">( About Me )</h2>
            </div>
            <div className="about-me-right">
              <p aria-label={PERSONAL_INFO.aboutBio}>
                <span aria-hidden="true" data-split-scroll="">
                  {PERSONAL_INFO.aboutBio}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
