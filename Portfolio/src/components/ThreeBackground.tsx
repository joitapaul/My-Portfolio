import { useEffect, useRef } from "react";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Particle class representing nodes
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      glow: boolean;
      angle: number;
      speed: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 20000));

    const colors = [
      "rgba(167, 139, 250, 0.35)",  // Pastel Lavender
      "rgba(139, 92, 246, 0.35)",   // Soft Violet
      "rgba(196, 181, 253, 0.25)",   // Soft Lavender Glow
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        glow: Math.random() > 0.6,
        angle: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.01,
      });
    }

    // Geometry shapes floating in space
    interface FloatingShape {
      x: number;
      y: number;
      size: number;
      sides: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      pulseSpeed: number;
      pulseTime: number;
    }

    const shapes: FloatingShape[] = [];
    const shapeColors = ["rgba(167, 139, 250, 0.06)", "rgba(196, 181, 253, 0.04)"];
    
    for (let i = 0; i < 4; i++) {
      shapes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 60 + 30,
        sides: Math.random() > 0.5 ? 3 : 6, // Triangle or Hexagon
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        color: shapeColors[i % shapeColors.length],
        pulseSpeed: 0.01 + Math.random() * 0.01,
        pulseTime: Math.random() * 100,
      });
    }

    const drawRegularPolygon = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      sides: number,
      rotation: number
    ) => {
      c.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = rotation + (i * 2 * Math.PI) / sides;
        const sx = x + Math.cos(angle) * radius;
        const sy = y + Math.sin(angle) * radius;
        if (i === 0) c.moveTo(sx, sy);
        else c.lineTo(sx, sy);
      }
      c.closePath();
    };

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse movement for super smooth inertia/parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw floating geometric shapes with depth/parallax
      shapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed;
        shape.pulseTime += shape.pulseSpeed;
        const currentSize = shape.size * (1 + Math.sin(shape.pulseTime) * 0.1);

        // Apply mouse parallax (distant shapes move slower)
        const dx = (mouse.x - width / 2) * -0.015;
        const dy = (mouse.y - height / 2) * -0.015;

        ctx.strokeStyle = shape.color;
        ctx.lineWidth = 1.5;
        
        ctx.save();
        drawRegularPolygon(ctx, shape.x + dx, shape.y + dy, currentSize, shape.sides, shape.rotation);
        ctx.stroke();
        ctx.restore();

        // Screen boundary wrapping
        if (shape.x < -100) shape.x = width + 100;
        if (shape.x > width + 100) shape.x = -100;
        if (shape.y < -100) shape.y = height + 100;
        if (shape.y > height + 100) shape.y = -100;
      });

      // Draw particle nodes and webs
      particles.forEach((p, idx) => {
        // Apply slight orbital motion
        p.angle += p.speed;
        p.x += p.vx + Math.cos(p.angle) * 0.08;
        p.y += p.vy + Math.sin(p.angle) * 0.08;

        // Interactive mouse gravity push
        const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (distToMouse < 250) {
          const force = (250 - distToMouse) / 250;
          const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
          p.x += Math.cos(angle) * force * 1.5;
          p.y += Math.sin(angle) * force * 1.5;
        }

        // Screen wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw links between close nodes (Neural Web effect)
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            const alpha = (130 - dist) / 130 * 0.15;
            ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Custom glow effect
        if (p.glow) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace("0.45", "0.08");
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="cyber-nodes-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-zinc-950 transition-colors duration-1000"
    />
  );
}
