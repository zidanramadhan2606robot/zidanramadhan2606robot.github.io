import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import { PERSONAL_INFO } from '../data/portfolioData';
import { isLoaderActive } from '../lib/themeController';

gsap.registerPlugin(CustomEase, SplitText);
CustomEase.create('shutterEase', '0.65, 0.01, 0.05, 0.99');

export function Preloader() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    if (!isLoaderActive()) {
      wrap.style.display = 'none';
      document.documentElement.classList.add('skip-loader');
      return;
    }

    sessionStorage.setItem('loaderPlayed', 'true');

    const ctx = gsap.context(() => {
      const cols = Array.from(wrap.querySelectorAll('.loader-col')) as HTMLElement[];
      const brandTitle = wrap.querySelector('.loader-brand-title');
      const countEl = wrap.querySelector('.loader-count-num');
      const telemetryBar = wrap.querySelector('.loader-telemetry');
      const progressFill = wrap.querySelector('.loader-progress-line');

      const counterState = { val: 0 };

      let titleSplit: SplitText | null = null;
      if (brandTitle) {
        titleSplit = new SplitText(brandTitle, { type: 'chars', mask: 'chars' });
        gsap.set(titleSplit.chars, { yPercent: 110, autoAlpha: 0 });
      }

      // Alternating top / bottom origins on the 8 louver columns
      cols.forEach((col, i) => {
        gsap.set(col, {
          scaleY: 1,
          transformOrigin: i % 2 === 0 ? 'top center' : 'bottom center',
        });
      });

      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.add('skip-loader');
          window.dispatchEvent(new CustomEvent('loaderComplete'));
          titleSplit?.revert();
        },
      });

      tl.set(wrap, { display: 'block' });

      if (titleSplit?.chars.length) {
        tl.to(
          titleSplit.chars,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.02,
            ease: 'power3.out',
          },
          0.05,
        );
      }

      tl.to(
        counterState,
        {
          val: 100,
          duration: 1.0,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (countEl) {
              countEl.textContent = `${String(Math.round(counterState.val)).padStart(2, '0')}%`;
            }
          },
        },
        0,
      );

      if (progressFill) {
        tl.to(progressFill, { scaleX: 1, duration: 1.0, ease: 'power2.inOut' }, 0);
      }

      // Collapse branding & reveal underlying 8-column portfolio through staggered louvers
      tl.add('shutterOpen', 1.15);

      if (titleSplit?.chars.length) {
        tl.to(
          titleSplit.chars,
          {
            yPercent: -110,
            autoAlpha: 0,
            duration: 0.35,
            stagger: 0.012,
            ease: 'power2.in',
          },
          'shutterOpen-=0.15',
        );
      }

      if (telemetryBar) {
        tl.to(telemetryBar, { autoAlpha: 0, y: 12, duration: 0.3, ease: 'power2.in' }, 'shutterOpen-=0.15');
      }

      tl.to(
        cols,
        {
          scaleY: 0,
          duration: 0.85,
          stagger: { each: 0.055, from: 'center' },
          ease: 'shutterEase',
        },
        'shutterOpen',
      );

      tl.set(wrap, { display: 'none' });
    }, wrap);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapRef} className="loader loader-louver" aria-label={PERSONAL_INFO.fullName}>
      {/* 8-Column Vertical Louver Shutters aligned with 8-col grid */}
      <div className="loader-shutter-grid" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="loader-col">
            <span className="loader-col-index">0{i + 1}</span>
          </div>
        ))}
      </div>

      {/* Center Editorial Brand Mark */}
      <div className="loader-center-brand" aria-hidden="true">
        <span className="loader-eyebrow">( INDEX 2026 )</span>
        <div className="loader-brand-title">
          Z<em>i</em>d<em>a</em>n R<em>a</em>m<em>a</em>dh<em>a</em>n
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="loader-telemetry" aria-hidden="true">
        <div className="loader-progress-track">
          <div className="loader-progress-line" />
        </div>
        <div className="loader-telemetry-row">
          <span>MZR // PORTFOLIO — PALEMBANG, ID</span>
          <span className="loader-count-num">00%</span>
        </div>
      </div>
    </div>
  );
}
