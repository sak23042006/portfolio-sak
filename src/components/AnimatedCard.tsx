
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  glareIntensity?: number;
  tiltAmount?: number;
  borderRadius?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const AnimatedCard = ({
  children,
  className,
  glareIntensity = 0.25,
  tiltAmount = 10,
  borderRadius = '16px',
  onClick,
  onMouseEnter,
  onMouseLeave,
}: AnimatedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    setPosition({ x, y });
    
    if (glareRef.current) {
      const glareX = (e.clientX - left) / width * 100;
      const glareY = (e.clientY - top) / height * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareIntensity}), rgba(255,255,255,0) 70%)`;
    }
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter();
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
    if (glareRef.current) {
      glareRef.current.style.background = 'none';
    }
    if (onMouseLeave) onMouseLeave();
  };
  
  useEffect(() => {
    if (!cardRef.current) return;
    const transitionEffect = () => {
      const rotateX = isHovered ? position.y * -tiltAmount : 0;
      const rotateY = isHovered ? position.x * tiltAmount : 0;
      const scale = isHovered ? 1.05 : 1;
      
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      }
    };
    
    transitionEffect();
  }, [position, isHovered, tiltAmount]);
  
  return (
    <div
      ref={cardRef}
      className={cn(
        "relative transition-transform duration-300 ease-out hover:shadow-xl",
        className
      )}
      style={{ borderRadius, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius, opacity: isHovered ? 1 : 0, transition: 'opacity 300ms ease' }}
      />
    </div>
  );
};

export default AnimatedCard;
