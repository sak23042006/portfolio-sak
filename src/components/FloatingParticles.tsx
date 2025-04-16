
import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

interface FloatingParticlesProps {
  count?: number;
  size?: number;
  speed?: number;
  colors?: string[];
  className?: string;
}

const FloatingParticles = ({
  count = 20,
  size = 5,
  speed = 1,
  colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'],
  className = ''
}: FloatingParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationRef = useRef<number | null>(null);
  const { theme } = useTheme();

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to full window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Initialize particles
    function initParticles() {
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * size + 2,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, size, speed, colors, theme]); // Include theme to re-initialize on theme change

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

export default FloatingParticles;
