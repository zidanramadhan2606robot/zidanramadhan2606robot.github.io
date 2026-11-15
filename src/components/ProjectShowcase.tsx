import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { FEATURED_CASES, MORE_PROJECTS, type CaseItem, type MoreProjectItem } from '../data/portfolioData';
import { playSfx } from '../lib/sfx';

gsap.registerPlugin(ScrollTrigger, SplitText);

function CaseVisualCanvas({ item, index }: { item: CaseItem; index: number }) {
  const isDarkCard = item.visualKind === 'gdgoc';
  const cardSurface = isDarkCard ? '#242320' : '#ffffff';
  const cardText = isDarkCard ? '#e6dfd5' : item.themeFg;
  const cardBorder = isDarkCard ? 'rgba(230, 223, 213, 0.14)' : 'rgba(0, 0, 0, 0.08)';
  const chipBg = isDarkCard ? '#1a1917' : item.themeBg;

  return (
    <>
      {/* Background atmospheric canvas with 120% height parallax */}
      <div
        className="case-bg-visual"
        data-parallax-img="true"
        style={{
          backgroundColor: item.themeBg,
          color: item.themeFg,
          padding: '4.75rem 2.25rem 3.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Top subtle grid + eyebrow */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            opacity: 0.72,
          }}
        >
          <span>( CASE 0{index + 1} // {item.eyebrow} )</span>
          <span>PLG // ARCHIVE</span>
        </div>

        {/* Center editorial preview composition */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: item.visualKind === 'bookin' ? '1fr 0.72fr' : '1.15fr 0.85fr',
            gap: '1.25rem',
            alignItems: 'center',
            margin: 'auto 0',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                fontWeight: 200,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: item.themeFg,
              }}
            >
              {item.title}
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                lineHeight: 1.35,
                opacity: 0.74,
                maxWidth: '28ch',
              }}
            >
              {item.summary}
            </p>
          </div>

          {/* Architectural wireframe preview block tailored per app type */}
          <div
            style={{
              aspectRatio: item.visualKind === 'bookin' ? '9 / 11' : '4 / 3',
              maxHeight: '11rem',
              justifySelf: 'end',
              width: '100%',
              backgroundColor: cardSurface,
              color: cardText,
              borderRadius: '4px',
              border: `1px solid ${cardBorder}`,
              padding: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  width: '1.5rem',
                  height: '0.375rem',
                  borderRadius: '2px',
                  backgroundColor: item.accent,
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  opacity: 0.55,
                  textTransform: 'uppercase',
                }}
              >
                {item.metrics[0]?.value}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
              {item.metrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    backgroundColor: chipBg,
                    padding: '0.4rem 0.5rem',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    lineHeight: 1.25,
                  }}
                >
                  <div style={{ opacity: 0.5, fontSize: '0.55rem' }}>{m.label}</div>
                  <div style={{ color: item.accent, marginTop: '2px' }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom hairline coordinates */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            opacity: 0.52,
            borderTop: isDarkCard ? '1px solid rgba(230,223,213,0.12)' : '1px solid rgba(0,0,0,0.08)',
            paddingTop: '0.65rem',
          }}
        >
          <span>{item.tags.join(' / ')}</span>
          <span>VIEW REPO -&gt;</span>
        </div>
      </div>

      {/* Hover Darkened Overlay + Pop-Up Detailed Preview Sheet */}
      <div className="case-overlay" />
      <div
        className="case-hover-preview"
        style={{
          backgroundColor: '#ffffff',
          color: '#030303',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            paddingBottom: '0.65rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: item.accent }}>{item.eyebrow}</span>
          <span style={{ opacity: 0.5 }}>GitHub ↗</span>
        </div>

        <div style={{ margin: 'auto 0' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '0.45rem',
            }}
          >
            {item.title}
          </div>
          <p style={{ fontSize: '0.82rem', opacity: 0.72, lineHeight: 1.35 }}>{item.summary}</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {item.metrics.map((m) => (
            <span
              key={m.label}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                padding: '0.25rem 0.5rem',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '2px',
              }}
            >
              {m.label}: {m.value}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function MoreProjectPreviewCard({ item }: { item: MoreProjectItem }) {
  return (
    <div
      className="mp-thumb-inner"
      style={{
        backgroundColor: item.tint,
        color: item.ink,
        padding: '1.125rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          opacity: 0.55,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>{item.tags[0]}</span>
        <span>{item.tags[item.tags.length - 1]}</span>
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 200,
            fontSize: '1.45rem',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            marginBottom: '0.35rem',
          }}
        >
          {item.title}
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', opacity: 0.78, lineHeight: 1.3 }}>
          {item.subtitle}
        </div>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          paddingTop: '0.5rem',
          opacity: 0.6,
        }}
      >
        {item.detail}
      </div>
    </div>
  );
}

function getPointerEdge(e: MouseEvent, el: HTMLElement): 'top' | 'bottom' {
  const rect = el.getBoundingClientRect();
  return e.clientY - rect.top < rect.height / 2 ? 'top' : 'bottom';
}

export function ProjectShowcase() {
  const casesRef = useRef<HTMLElement>(null);
  const moreRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const casesEl = casesRef.current;
    const moreEl = moreRef.current;
    const splits: SplitText[] = [];
    const cleanupFns: (() => void)[] = [];

    const ctx = gsap.context(() => {
      // 1. Cases clip-path + parallax + split reveal
      if (casesEl) {
        const cards = Array.from(casesEl.querySelectorAll('.case-card'));
        cards.forEach((card) => {
          const thumb = card.querySelector('.case-card-thumb');
          const bgParallax = card.querySelector('[data-parallax-img]');
          const title = card.querySelector('.case-card-title');
          const tags = card.querySelector('.case-card-tags');
          if (!thumb || !title) return;

          if (bgParallax) {
            gsap.fromTo(
              bgParallax,
              { yPercent: -16.66 },
              {
                yPercent: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: thumb,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          const titleSplit = new SplitText(title, { type: 'lines', linesClass: 'split-line', mask: 'lines' });
          splits.push(titleSplit);

          gsap.set(thumb, { clipPath: 'inset(14% 14% 14% 14%)' });
          if (titleSplit.lines.length) {
            gsap.set(titleSplit.lines, { yPercent: 110, autoAlpha: 0 });
          }
          if (tags) {
            gsap.set(tags, { autoAlpha: 0, y: 15 });
          }

          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              const tl = gsap.timeline();
              tl.to(thumb, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.95, ease: 'power3.out', clearProps: 'clipPath' });
              if (titleSplit.lines.length) {
                const masks = title.querySelectorAll('.split-line-mask');
                tl.to(
                  titleSplit.lines,
                  {
                    yPercent: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                    stagger: 0.08,
                    ease: 'power3.out',
                    onComplete: () => {
                      if (masks.length) gsap.set(masks, { overflow: 'visible' });
                    },
                  },
                  '-=0.35',
                );
              }
              if (tags) {
                tl.to(tags, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, '-=0.3');
              }
            },
          });
        });
      }

      // 2. More projects row reveals + directional hover + mobile focus scroll
      if (moreEl) {
        const items = Array.from(moreEl.querySelectorAll('.more-project-item')) as HTMLElement[];

        items.forEach((item) => {
          const title = item.querySelector('.mp-title');
          const tags = item.querySelector('.mp-tags');
          if (!title) return;

          const titleSplit = new SplitText(title, { type: 'lines', linesClass: 'split-line', mask: 'lines' });
          splits.push(titleSplit);

          let tagSplit: SplitText | null = null;
          if (tags) {
            tagSplit = new SplitText(tags, { type: 'lines', linesClass: 'split-line', mask: 'lines' });
            splits.push(tagSplit);
          }

          const lines = [...titleSplit.lines, ...(tagSplit ? tagSplit.lines : [])];
          if (lines.length) gsap.set(lines, { yPercent: 110, autoAlpha: 0 });

          const hasBorder = window.getComputedStyle(item, '::before').display !== 'none';
          if (hasBorder) gsap.set(item, { '--border-scale': 0 });

          ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              const tl = gsap.timeline();
              if (hasBorder) {
                tl.to(item, { '--border-scale': 1, duration: 1, ease: 'power3.inOut', clearProps: '--border-scale' });
              }
              const visibleTagLines =
                tags && window.getComputedStyle(tags).display !== 'none' && tagSplit ? tagSplit.lines : [];
              const visibleTagMasks =
                tags && window.getComputedStyle(tags).display !== 'none'
                  ? Array.from(tags.querySelectorAll('.split-line-mask'))
                  : [];
              const activeLines = [...titleSplit.lines, ...visibleTagLines];
              const activeMasks = [...Array.from(title.querySelectorAll('.split-line-mask')), ...visibleTagMasks];

              if (activeLines.length) {
                tl.to(
                  activeLines,
                  {
                    yPercent: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    onComplete: () => {
                      if (activeMasks.length) gsap.set(activeMasks, { overflow: 'visible' });
                    },
                  },
                  hasBorder ? '-=0.6' : 0,
                );
              }
            },
          });
        });

        // Directional hover & responsive scroll focus logic
        const mq = window.matchMedia('(max-width: 1280px)');
        const ac = new AbortController();
        const { signal } = ac;

        const tileStart = { top: 'translateY(-100%)', bottom: 'translateY(100%)' };
        const clipStart = { top: 'inset(0 0 60% 0)', bottom: 'inset(60% 0 0 0)' };

        items.forEach((item) => {
          const tile = item.querySelector('.mp-bg-tile') as HTMLElement | null;
          const thumb = item.querySelector('.mp-thumb') as HTMLElement | null;
          let leaveTimer: number | undefined;

          item.addEventListener(
            'mouseenter',
            (ev) => {
              if (mq.matches) return;
              if (leaveTimer) {
                clearTimeout(leaveTimer);
                leaveTimer = undefined;
              }
              item.classList.remove('is-leaving');
              item.classList.add('is-hovered');
              const edge = getPointerEdge(ev, item);
              if (tile) {
                tile.style.transition = 'none';
                tile.style.transform = tileStart[edge];
                void tile.offsetHeight;
                tile.style.transition = '';
                tile.style.transform = 'translateY(0%)';
              }
              if (thumb) {
                thumb.style.transition = 'none';
                thumb.style.clipPath = clipStart[edge];
                void thumb.offsetHeight;
                thumb.style.transition = '';
                thumb.style.clipPath = 'inset(0 0 0 0)';
              }
            },
            { signal },
          );

          item.addEventListener(
            'mouseleave',
            (ev) => {
              if (mq.matches) return;
              const edge = getPointerEdge(ev, item);
              item.classList.remove('is-hovered');
              item.classList.add('is-leaving');
              if (tile) tile.style.transform = tileStart[edge];
              if (thumb) thumb.style.clipPath = clipStart[edge];
              if (leaveTimer) clearTimeout(leaveTimer);
              leaveTimer = window.setTimeout(() => {
                item.classList.remove('is-leaving');
              }, 750);
            },
            { signal },
          );
        });

        let activeItem: HTMLElement | null = null;
        let rafId: number | null = null;
        let lastY = window.scrollY;
        let dir: 'down' | 'up' = 'down';

        const activateItem = (el: HTMLElement, d: 'down' | 'up') => {
          el.classList.add('is-active');
          const thumb = el.querySelector('.mp-thumb') as HTMLElement | null;
          if (thumb) {
            thumb.style.transition = 'none';
            thumb.style.clipPath = d === 'down' ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)';
            void thumb.offsetHeight;
            thumb.style.transition = '';
            thumb.style.clipPath = 'inset(0 0 0 0)';
          }
        };

        const deactivateItem = (el: HTMLElement, d?: 'down' | 'up') => {
          el.classList.remove('is-active');
          const thumb = el.querySelector('.mp-thumb') as HTMLElement | null;
          if (thumb) {
            thumb.style.clipPath = d ? (d === 'down' ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)') : '';
            if (!d) thumb.style.transition = '';
          }
        };

        const evaluate = () => {
          rafId = null;
          if (!mq.matches) {
            if (activeItem) {
              deactivateItem(activeItem);
              activeItem = null;
            }
            return;
          }
          const targetY = dir === 'down' ? window.innerHeight * 0.64 : window.innerHeight * 0.36;
          const secRect = moreEl.getBoundingClientRect();
          const pad = window.innerHeight * 0.12;
          if (targetY < secRect.top - pad || targetY > secRect.bottom + pad) {
            if (activeItem) {
              deactivateItem(activeItem, dir);
              activeItem = null;
            }
            return;
          }
          let closest: HTMLElement | null = null;
          let minDist = Infinity;
          for (const it of items) {
            const r = it.getBoundingClientRect();
            const dist = Math.abs(r.top + r.height / 2 - targetY);
            if (dist < minDist) {
              minDist = dist;
              closest = it;
            }
          }
          if (closest && activeItem && closest !== activeItem) {
            const ar = activeItem.getBoundingClientRect();
            const adist = Math.abs(ar.top + ar.height / 2 - targetY);
            if (minDist > adist - 80) return;
          }
          if (closest !== activeItem) {
            if (activeItem) deactivateItem(activeItem, dir);
            if (closest) activateItem(closest, dir);
            activeItem = closest;
          }
        };

        const onScroll = () => {
          const curY = window.scrollY;
          const delta = curY - lastY;
          if (Math.abs(delta) >= 1) {
            dir = delta > 0 ? 'down' : 'up';
            lastY = curY;
          }
          if (rafId === null) {
            rafId = requestAnimationFrame(evaluate);
          }
        };

        window.addEventListener('scroll', onScroll, { passive: true, signal });
        window.addEventListener('resize', onScroll, { passive: true, signal });
        evaluate();

        cleanupFns.push(() => {
          ac.abort();
          if (rafId !== null) cancelAnimationFrame(rafId);
        });
      }
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section ref={casesRef} className="cases-sec" id="projects" data-theme-change="theme-1">
        <div className="container pad-120">
          <div className="cases-contain main-grid-8">
            {FEATURED_CASES.map((item, idx) => (
              <a
                key={item.id}
                id={`case-${item.id}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="case-card"
                data-slug={item.id}
                onClick={() => playSfx('click')}
              >
                <div className="case-card-thumb">
                  <CaseVisualCanvas item={item} index={idx} />
                </div>
                <h2 className="case-card-title" data-split="">
                  {item.title}
                </h2>
                <div className="case-card-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section ref={moreRef} className="more-projects-sec" data-theme-change="theme-1">
        <div className="container pad-120">
          <div className="more-projects-contain">
            <div className="more-projects-heading">
              <h2 className="h2-tag">( More projects &amp; credentials )</h2>
            </div>

            <div className="more-projects-list">
              {MORE_PROJECTS.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="more-project-item"
                  onClick={() => playSfx('click')}
                >
                  <div className="mp-bg-wrap">
                    <div className="mp-bg-tile" />
                  </div>
                  <h3 className="mp-title" data-split="">
                    {item.title}
                  </h3>
                  <div className="mp-tags" data-split="" aria-hidden="true">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="mp-thumb-wrap">
                    <div className="mp-thumb">
                      <MoreProjectPreviewCard item={item} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
