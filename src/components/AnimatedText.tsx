
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  delay?: number;
  once?: boolean;
}

const AnimatedText = ({
  text,
  className,
  tag: Tag = 'p',
  delay = 50,
  once = true
}: AnimatedTextProps) => {
  // Use the correct type for containerRef based on the tag
  const containerRef = useRef<HTMLElement>(null);
  const charactersRef = useRef<HTMLSpanElement[]>([]);
  const hasAnimated = useRef(false);
  
  // Split text into characters with individual spans
  const characters = text.split('').map((char, index) => (
    <span
      key={`${char}-${index}`}
      ref={el => {
        if (el) charactersRef.current[index] = el;
      }}
      className="inline-block opacity-0 transform translate-y-4"
      style={{ transitionDelay: `${index * delay}ms` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && (!once || !hasAnimated.current)) {
            hasAnimated.current = true;
            charactersRef.current.forEach((char, index) => {
              setTimeout(() => {
                if (char) {
                  char.style.opacity = '1';
                  char.style.transform = 'translateY(0)';
                }
              }, index * delay);
            });
          } else if (!once && !entry.isIntersecting) {
            charactersRef.current.forEach(char => {
              if (char) {
                char.style.opacity = '0';
                char.style.transform = 'translateY(4px)';
              }
            });
            hasAnimated.current = false;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [delay, once, text]);

  // Create the appropriate element based on the tag prop
  return (
    <Tag
      ref={containerRef as React.RefObject<any>}
      className={cn(className)}
    >
      {characters}
      <style>
        {`
          span {
            transition: opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                      transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
        `}
      </style>
    </Tag>
  );
};

export default AnimatedText;
