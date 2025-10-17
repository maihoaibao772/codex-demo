import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 28;

export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let frameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 120 + 60,
      alpha: Math.random() * 0.12 + 0.02,
      dx: Math.random() * 0.4 - 0.2,
      dy: Math.random() * 0.4 - 0.2,
      hue: 180 + Math.random() * 120,
    }));

    const draw = () => {
      const { width, height } = canvas;
      context.globalCompositeOperation = 'source-over';
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.dx + mouseOffset.current.x * 0.0015;
        particle.y += particle.dy + mouseOffset.current.y * 0.0015;

        if (particle.x - particle.radius > width) particle.x = -particle.radius;
        if (particle.x + particle.radius < 0) particle.x = width + particle.radius;
        if (particle.y - particle.radius > height) particle.y = -particle.radius;
        if (particle.y + particle.radius < 0) particle.y = height + particle.radius;

        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 90%, 65%, ${particle.alpha})`);
        gradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)');

        context.globalCompositeOperation = 'screen';
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      frameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseOffset.current = {
        x: event.clientX - innerWidth / 2,
        y: event.clientY - innerHeight / 2,
      };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,245,255,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(255,31,143,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 animate-[pulse_16s_ease-in-out_infinite] bg-gradient-hue opacity-70" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
