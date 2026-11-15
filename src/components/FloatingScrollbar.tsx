import { useEffect, useRef } from 'react';

export function FloatingScrollbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!container || !track || !thumb) return;

    let isDragging = false;
    let startY = 0;
    let startThumbY = 0;
    let hideTimeout: number | null = null;

    const getLenis = () =>
      (window as unknown as {
        lenis?: {
          scroll: number;
          limit: number;
          scrollTo: (val: number, opts?: object) => void;
          on: (ev: string, fn: () => void) => void;
          off?: (ev: string, fn: () => void) => void;
        };
      }).lenis;

    const showScrollbar = () => {
      container.classList.add('is-visible');
      if (hideTimeout !== null) clearTimeout(hideTimeout);
      if (!isDragging) {
        hideTimeout = window.setTimeout(() => {
          container.classList.remove('is-visible');
        }, 1100);
      }
    };

    const updateThumb = () => {
      const lenis = getLenis();
      const scroll = lenis ? lenis.scroll : window.scrollY;
      const limit = lenis ? lenis.limit : document.documentElement.scrollHeight - window.innerHeight;
      if (!limit || limit <= 10) {
        container.style.display = 'none';
        return;
      }
      container.style.display = '';
      const progress = Math.max(0, Math.min(1, scroll / limit));
      const maxTravel = track.clientHeight - thumb.clientHeight;
      thumb.style.transform = `translate3d(0, ${progress * maxTravel}px, 0)`;
    };

    const handleTrackClick = (e: MouseEvent) => {
      if (e.target === thumb || isDragging) return;
      const rect = track.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const maxTravel = rect.height - thumb.clientHeight;
      const targetThumbY = Math.max(0, Math.min(maxTravel, clickY - thumb.clientHeight / 2));
      const progress = maxTravel > 0 ? targetThumbY / maxTravel : 0;
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(progress * lenis.limit, { duration: 0.9 });
      } else {
        window.scrollTo({
          top: progress * (document.documentElement.scrollHeight - window.innerHeight),
          behavior: 'smooth',
        });
      }
      showScrollbar();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const maxTravel = track.clientHeight - thumb.clientHeight;
      const deltaY = e.clientY - startY;
      const nextThumbY = Math.max(0, Math.min(maxTravel, startThumbY + deltaY));
      const progress = maxTravel > 0 ? nextThumbY / maxTravel : 0;
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(progress * lenis.limit, { immediate: true });
      } else {
        window.scrollTo(0, progress * (document.documentElement.scrollHeight - window.innerHeight));
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      document.documentElement.classList.remove('scrollbar-grabbing');
      thumb.classList.remove('is-dragging');
      try {
        thumb.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      showScrollbar();
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      isDragging = true;
      startY = e.clientY;
      const maxTravel = track.clientHeight - thumb.clientHeight;
      const lenis = getLenis();
      const scroll = lenis ? lenis.scroll : window.scrollY;
      const limit = lenis ? lenis.limit : document.documentElement.scrollHeight - window.innerHeight;
      startThumbY = (limit > 0 ? scroll / limit : 0) * maxTravel;
      document.documentElement.classList.add('scrollbar-grabbing');
      thumb.classList.add('is-dragging');
      container.classList.add('is-visible');
      thumb.setPointerCapture(e.pointerId);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
    };

    const onScroll = () => {
      updateThumb();
      showScrollbar();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (window.innerWidth - e.clientX < 100) {
        showScrollbar();
      }
    };

    track.addEventListener('click', handleTrackClick);
    thumb.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', updateThumb, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const lenis = getLenis();
    lenis?.on?.('scroll', onScroll);
    updateThumb();

    return () => {
      if (hideTimeout !== null) clearTimeout(hideTimeout);
      track.removeEventListener('click', handleTrackClick);
      thumb.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', updateThumb);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      lenis?.off?.('scroll', onScroll);
    };
  }, []);

  return (
    <div id="floating-scrollbar" ref={containerRef} className="floating-scrollbar" aria-hidden="true">
      <div className="scrollbar-track" ref={trackRef} data-track="">
        <div className="scrollbar-thumb" ref={thumbRef} data-thumb="" />
      </div>
    </div>
  );
}
