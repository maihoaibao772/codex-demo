import { useEffect, useRef } from "react";

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame: number;
    const particles = Array.from({ length: 120 }).map(() => ({
      x: random(0, window.innerWidth),
      y: random(0, window.innerHeight),
      radius: random(0.5, 1.6),
      speed: random(0.2, 0.6)
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(76, 201, 240, 0.65)";
        context.shadowBlur = 20;
        context.shadowColor = "rgba(114, 9, 183, 0.8)";
        context.fill();

        particle.y -= particle.speed;
        if (particle.y < -10) {
          particle.x = random(0, canvas.width);
          particle.y = canvas.height + 10;
        }
      });
      animationFrame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-60 mix-blend-screen"
    />
  );
};

export default Particles;
