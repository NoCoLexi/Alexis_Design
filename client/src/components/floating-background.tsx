import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  angle: number;
  opacity: number;
  parallax: number;
  curl: number;
  spin: number;
  phase: number;
}

export default function FloatingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles(width, height);
    };

    const seedParticles = (w: number, h: number) => {
      const count = Math.max(18, Math.min(36, Math.floor((w * h) / 28000)));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        length: 90 + Math.random() * 180,
        angle: Math.random() * Math.PI * 2,
        opacity: 0.1 + Math.random() * 0.22,
        parallax: 0.4 + Math.random() * 1.6,
        curl: 1.5 + Math.random() * 3,
        spin: (Math.random() < 0.5 ? -1 : 1) * (0.6 + Math.random() * 1.2),
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current.tx = (e.clientX - cx) / rect.width;
      mouseRef.current.ty = (e.clientY - cy) / rect.height;
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.04;

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += 0.0012;
        p.phase += 0.003 * p.spin;

        if (p.x < -200) p.x = w + 200;
        if (p.x > w + 200) p.x = -200;
        if (p.y < -200) p.y = h + 200;
        if (p.y > h + 200) p.y = -200;

        const offsetX = mouseRef.current.x * 30 * p.parallax;
        const offsetY = mouseRef.current.y * 30 * p.parallax;
        const px = p.x + offsetX;
        const py = p.y + offsetY;

        const steps = 48;
        const maxRadius = p.length / 2;

        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";

        let prevX = 0;
        let prevY = 0;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const angle = p.phase + t * p.curl * Math.PI * 2 * p.spin;
          const radius = maxRadius * t;
          const x = px + Math.cos(angle) * radius;
          const y = py + Math.sin(angle) * radius;

          if (i > 0) {
            const fade = Math.sin(t * Math.PI);
            ctx.strokeStyle = `rgba(95, 197, 248, ${p.opacity * fade})`;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
          prevX = x;
          prevY = y;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
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
