import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type PortfolioTheme = 'theme-1' | 'theme-2' | 'theme-3';

const THEME_META_COLORS: Record<PortfolioTheme, string> = {
  'theme-1': '#f6f5f0',
  'theme-2': '#e8ece6',
  'theme-3': '#161514',
};

export function setTheme(theme: PortfolioTheme): void {
  if (typeof document === 'undefined' || !theme) return;
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', THEME_META_COLORS[theme] ?? '#f6f5f0');
  }
}

export function isLoaderActive(): boolean {
  if (typeof window === 'undefined') return false;
  if (document.documentElement.classList.contains('skip-loader')) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return true;
}

export function getLoaderDelay(activeDelay = 2.15, skipDelay = 0.05): number {
  return isLoaderActive() ? activeDelay : skipDelay;
}
