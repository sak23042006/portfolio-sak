
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxEffectProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

const ParallaxEffect = ({
  children,
  className,
  strength = 15
}: ParallaxEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const parallaxItems = container.querySelectorAll('[data-parallax]');
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      
      // Calculate normalized mouse position (from -1 to 1)
      const x = ((clientX - left) / width) * 2 - 1;
      const y = ((clientY - top) / height) * 2 - 1;
      
      parallaxItems.forEach((item) => {
        if (item instanceof HTMLElement) {
          const depth = parseFloat(item.getAttribute('data-parallax') || '1');
          const moveX = x * strength * depth;
          const moveY = y * strength * depth;
          
          item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) ${item.dataset.baseTransform || ''}`;
        }
      });
    };
    
    // Store original transforms
    parallaxItems.forEach(item => {
      if (item instanceof HTMLElement) {
        const currentTransform = window.getComputedStyle(item).transform;
        item.dataset.baseTransform = currentTransform !== 'none' ? currentTransform : '';
      }
    });
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength]);
  
  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ perspective: '1000px' }}
    >
      {children}
    </div>
  );
};

export default ParallaxEffect;
