import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  parallax: number;
  curl: number;
  spin: number;
  phase: number;
}

export default function FloatingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let rafId = 0;
    let lastFrame = 0;
    const targetFps = 30;
    const frameInterval = 1000 / targetFps;
    let running = true;

    const seed = (w: number, h: number) => {
      const count = Math.max(12, Math.min(22, Math.floor((w * h) / 55000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        length: 100 + Math.random() * 160,
        opacity: 0.12 + Math.random() * 0.18,
        parallax: 0.4 + Math.random() * 1.4,
        curl: 1.8 + Math.random() * 2.2,
        spin: (Math.random() < 0.5 ? -1 : 1) * (0.6 + Math.random() * 0.8),
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed(width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      mouse.tx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      mouse.ty = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    };

    const handleVisibility = () => {
      running = !document.hidden;
      if (running) {
        lastFrame = 0;
        rafId = requestAnimationFrame(draw);
      }
    };

    const draw = (now: number) => {
      if (!running) return;
      rafId = requestAnimationFrame(draw);
      if (now - lastFrame < frameInterval) return;
      lastFrame = now;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";

      const steps = 28;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.004 * p.spin;

        if (p.x < -200) p.x = w + 200;
        else if (p.x > w + 200) p.x = -200;
        if (p.y < -200) p.y = h + 200;
        else if (p.y > h + 200) p.y = -200;

        const px = p.x + mouse.x * 30 * p.parallax;
        const py = p.y + mouse.y * 30 * p.parallax;
        const maxRadius = p.length / 2;
        const turns = p.curl * Math.PI * 2 * p.spin;

        ctx.strokeStyle = `rgba(95, 197, 248, ${p.opacity})`;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const a = p.phase + t * turns;
          const r = maxRadius * t;
          const x = px + Math.cos(a) * r;
          const y = py + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    resize();
    rafId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      data-testid="floating-background"
    />
  );
}
