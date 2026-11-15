let audioCtx: AudioContext | null = null;
let muted = false;

if (typeof window !== 'undefined') {
  muted = localStorage.getItem('sfx_muted') === 'true';
}

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSfxMuted(): boolean {
  return muted;
}

export function setSfxMuted(nextMuted: boolean): void {
  muted = !!nextMuted;
  if (typeof window !== 'undefined') {
    localStorage.setItem('sfx_muted', String(muted));
    window.dispatchEvent(new CustomEvent('sfx:mute-change', { detail: { isMuted: muted } }));
  }
}

export function toggleSfxMute(): boolean {
  setSfxMuted(!muted);
  return muted;
}

export function playSfx(type: 'click' | 'key-press' = 'click'): void {
  if (muted) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'click') {
      osc.type = 'triangle';
      const pitchJitter = 0.96 + Math.random() * 0.08;
      osc.frequency.setValueAtTime(720 * pitchJitter, now);
      osc.frequency.exponentialRampToValueAtTime(190 * pitchJitter, now + 0.045);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.03);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    }
  } catch {
    // Ignore Web Audio errors when blocked before user gesture
  }
}
