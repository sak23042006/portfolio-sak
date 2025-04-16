import { useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  name: string;
  percentage: number;
  color?: string;
  delay?: number;
  className?: string;
}

const SkillBar = ({
  name,
  percentage,
  color = 'bg-primary',
  delay = 300,
  className
}: SkillBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  
  useEffect(() => {
    if (isInView && barRef.current) {
      barRef.current.style.width = `${percentage}%`;
      barRef.current.style.opacity = '1';
    }
  }, [isInView, percentage]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("mb-6", className)}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{name}</span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={cn("h-full rounded-full transition-all duration-1000 ease-out opacity-0", color)}
          style={{ width: '0%', transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
