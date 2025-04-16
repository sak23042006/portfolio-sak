import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedMarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

const AnimatedMarquee = ({
  children,
  direction = 'left',
  speed = 50,
  pauseOnHover = true,
  className
}: AnimatedMarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!marqueeRef.current) return;
    
    // Set CSS variable for animation speed
    marqueeRef.current.style.setProperty('--marquee-speed', `${speed}s`);
    marqueeRef.current.style.setProperty('--marquee-direction', direction === 'left' ? 'normal' : 'reverse');
    
  }, [speed, direction]);
  
  return (
    <div
      ref={marqueeRef}
      className={cn(
        "relative overflow-hidden whitespace-nowrap",
        pauseOnHover && "hover:[animation-play-state:paused]",
        className
      )}
    >
      <div className="flex animate-marquee">
        <div className="flex items-center">
          {children}
        </div>
        <div className="flex items-center">
          {children}
        </div>
      </div>
      
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          
          .animate-marquee {
            animation: marquee var(--marquee-speed, 50s) linear infinite;
            animation-direction: var(--marquee-direction, normal);
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedMarquee;
