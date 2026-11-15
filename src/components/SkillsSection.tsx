import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICE_PANEL_2_SKILLS, SERVICE_PANEL_4_SKILLS } from '../data/portfolioData';
import { setTheme } from '../lib/themeController';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export function SkillsSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = secRef.current;
    if (!section) return;

    const act2Curtain = section.querySelector('.act-2-curtain') as HTMLElement | null;
    const act1Title = section.querySelector('.act-1-title') as HTMLElement | null;
    const act2Title = section.querySelector('.act-2-title') as HTMLElement | null;
    const act1Cards = Array.from(section.querySelectorAll('.act-1-boxes .shutter-skill-card')) as HTMLElement[];
    const act2Cards = Array.from(section.querySelectorAll('.act-2-boxes .shutter-skill-card')) as HTMLElement[];
    const act1Stage = section.querySelector('.act-1-stage') as HTMLElement | null;

    if (!act2Curtain || !act1Title || !act2Title || !act1Stage) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      gsap.set(act2Curtain, { yPercent: 100 });
      gsap.set(act2Title, { y: 40, opacity: 0 });
      gsap.set(act1Cards, { clipPath: 'inset(50% 0% 50% 0%)', opacity: 0, scale: 0.92 });
      gsap.set(act2Cards, { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0, scale: 0.92 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.6,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3.2}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          refreshPriority: 1,
          onLeaveBack: () => setTheme('theme-1'),
          onLeave: () => setTheme('theme-1'),
          onEnter: () => setTheme('theme-2'),
          onEnterBack: () => setTheme('theme-3'),
          onUpdate: (self) => {
            if (self.progress < 0.545) {
              setTheme('theme-2');
            } else {
              setTheme('theme-3');
            }
          },
        },
      });

      // 0.00 -> 0.28: Act I mechanical vertical shutter unfold (7 Web & UI cards)
      tl.to(
        act1Cards,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          scale: 1,
          duration: 0.24,
          stagger: 0.02,
          ease: 'power2.out',
        },
        0.0,
      );

      // 0.28 -> 0.44: Hold Act I (Botanical Forest) in full view
      tl.to({}, { duration: 0.16 }, 0.28);

      // 0.44 -> 0.56: Full-screen Curtain Wipe from Botanical Forest to Dark Obsidian
      tl.to(
        act2Curtain,
        {
          yPercent: 0,
          duration: 0.12,
          ease: 'power2.inOut',
        },
        0.44,
      );
      tl.to(
        act1Title,
        {
          y: -40,
          opacity: 0.2,
          duration: 0.12,
          ease: 'power2.in',
        },
        0.44,
      );

      // 0.56 -> 0.84: Reveal Act II headline & horizontal shutter unfold (7 Mobile & Systems cards)
      tl.to(
        act2Title,
        {
          y: 0,
          opacity: 1,
          duration: 0.12,
          ease: 'power2.out',
        },
        0.56,
      );
      tl.to(
        act2Cards,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          scale: 1,
          duration: 0.24,
          stagger: 0.02,
          ease: 'power2.out',
        },
        0.58,
      );

      // 0.84 -> 1.00: Hold Act II (Dark Obsidian) in full view before Footer transitions back to Warm Paper
      tl.to({}, { duration: 0.16 }, 0.84);
    });

    mm.add('(max-width: 768px)', () => {
      gsap.set(act2Curtain, { clearProps: 'transform' });
      gsap.set(act2Title, { clearProps: 'transform,opacity' });
      gsap.set(act1Cards, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1 });
      gsap.set(act2Cards, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1 });

      ScrollTrigger.create({
        trigger: act1Stage,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setTheme('theme-2'),
        onEnterBack: () => setTheme('theme-2'),
        onLeaveBack: () => setTheme('theme-1'),
      });

      ScrollTrigger.create({
        trigger: act2Curtain,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setTheme('theme-3'),
        onEnterBack: () => setTheme('theme-3'),
        onLeave: () => setTheme('theme-1'),
      });
    });

    ScrollTrigger.refresh();
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={secRef} className="services-sec services-stage">
      {/* ACT I: Botanical Forest (#E8ECE6 / #1B3B2B) */}
      <div className="act-stage act-1-stage">
        <div className="act-boxes-layer">
          <div className="container">
            <div className="service-boxes act-1-boxes main-grid-8">
              {SERVICE_PANEL_2_SKILLS.map((skill, idx) => (
                <div key={skill} className="grid-box has-skill">
                  <div className="shutter-skill-card">
                    <div className="skill-card-top">
                      <span>0{idx + 1}</span>
                      <span className="skill-dot" aria-hidden="true" />
                    </div>
                    <div className="skill-card-name">{skill}</div>
                  </div>
                </div>
              ))}
              {Array.from({ length: 17 }).map((_, idx) => (
                <div key={`act1-empty-${idx}`} className="grid-box" />
              ))}
            </div>
          </div>
        </div>

        <div className="act-center-copy">
          <h2 className="h2-tag">( ACT 01 // WEB &amp; INTERFACE )</h2>
          <div className="service-title act-1-title">
            Crafting interfaces
            <br />
            with <em>intuitive</em> and
            <br />
            <em>responsive</em> precision.
          </div>
        </div>
      </div>

      {/* ACT II CURTAIN: Dark Obsidian (#161514 / #E6DFD5 / #C86D51) */}
      <div className="act-stage act-2-curtain">
        <div className="act-boxes-layer">
          <div className="container">
            <div className="service-boxes act-2-boxes main-grid-8">
              {SERVICE_PANEL_4_SKILLS.map((skill, idx) => (
                <div key={skill} className="grid-box has-skill">
                  <div className="shutter-skill-card obsidian-card">
                    <div className="skill-card-top">
                      <span className="terracotta-idx">0{idx + 1}</span>
                      <span className="skill-dot terracotta-dot" aria-hidden="true" />
                    </div>
                    <div className="skill-card-name">{skill}</div>
                  </div>
                </div>
              ))}
              {Array.from({ length: 17 }).map((_, idx) => (
                <div key={`act2-empty-${idx}`} className="grid-box" />
              ))}
            </div>
          </div>
        </div>

        <div className="act-center-copy">
          <h2 className="h2-tag act-2-tag">( ACT 02 // MOBILE &amp; SYSTEMS )</h2>
          <div className="service-title act-2-title">
            Engineered with
            <br />
            <em>native</em> and <em>scalable</em>
            <br />
            architecture.
          </div>
        </div>
      </div>
    </section>
  );
}
