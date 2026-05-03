let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    try {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new Ctor();
    } catch {
      return null;
    }
  }
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  return ctx;
}

function blip(opts: {
  freq: number;
  endFreq?: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  muted: boolean;
}) {
  if (opts.muted) return;
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = opts.type ?? "square";
  osc.frequency.setValueAtTime(opts.freq, ac.currentTime);
  if (opts.endFreq != null) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(40, opts.endFreq),
      ac.currentTime + opts.duration
    );
  }
  const vol = opts.volume ?? 0.08;
  gain.gain.setValueAtTime(vol, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + opts.duration);
  osc.connect(gain).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + opts.duration);
}

export const sfx = {
  shoot(muted: boolean) {
    blip({ freq: 880, endFreq: 220, duration: 0.08, type: "square", volume: 0.05, muted });
  },
  hit(muted: boolean) {
    blip({ freq: 220, endFreq: 110, duration: 0.07, type: "triangle", volume: 0.06, muted });
  },
  convert(muted: boolean) {
    blip({ freq: 440, endFreq: 880, duration: 0.12, type: "square", volume: 0.07, muted });
    setTimeout(() => blip({ freq: 660, endFreq: 1320, duration: 0.14, type: "triangle", volume: 0.07, muted }), 60);
  },
  enemyShoot(muted: boolean) {
    blip({ freq: 180, endFreq: 90, duration: 0.1, type: "sawtooth", volume: 0.04, muted });
  },
  hurt(muted: boolean) {
    blip({ freq: 160, endFreq: 60, duration: 0.25, type: "sawtooth", volume: 0.09, muted });
  },
  wave(muted: boolean) {
    blip({ freq: 330, endFreq: 660, duration: 0.18, type: "square", volume: 0.07, muted });
    setTimeout(() => blip({ freq: 440, endFreq: 880, duration: 0.18, type: "square", volume: 0.07, muted }), 100);
  },
  gameOver(muted: boolean) {
    blip({ freq: 330, endFreq: 110, duration: 0.4, type: "sawtooth", volume: 0.1, muted });
    setTimeout(() => blip({ freq: 220, endFreq: 70, duration: 0.6, type: "sawtooth", volume: 0.1, muted }), 200);
  },
  tick(muted: boolean, low: boolean) {
    blip({ freq: low ? 90 : 130, duration: 0.05, type: "sine", volume: 0.04, muted });
  },
};
