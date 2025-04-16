
// Animation delay utility
export const getAnimationDelay = (index: number, base = 100): string => {
  return `${base * index}ms`;
};

// Stagger children with animation delays
export const staggerChildren = (
  selector: string, 
  container: HTMLElement,
  baseDelay = 100
): void => {
  const elements = container.querySelectorAll(selector);
  elements.forEach((el, index) => {
    if (el instanceof HTMLElement) {
      el.style.animationDelay = getAnimationDelay(index, baseDelay);
    }
  });
};

// Animation variants for framer-motion like animations
export const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1.000], // cubic-bezier
    },
  }),
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1.000],
    }
  },
};

// Parallax effect based on mouse movement
export const applyParallaxEffect = (
  container: HTMLElement,
  strength = 20,
  selector = '.parallax-item'
): (() => void) => {
  const elements = container.querySelectorAll(selector);
  
  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = container.getBoundingClientRect();
    
    // Calculate normalized mouse position (from -1 to 1)
    const x = ((clientX - left) / width) * 2 - 1;
    const y = ((clientY - top) / height) * 2 - 1;
    
    elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        const depth = parseFloat(el.dataset.depth || '1');
        const moveX = x * strength * depth;
        const moveY = y * strength * depth;
        
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }
    });
  };
  
  container.addEventListener('mousemove', handleMouseMove);
  
  // Return cleanup function
  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
  };
};

// Text splitting animation
export const splitTextAnimation = (
  element: HTMLElement,
  delay = 50
): void => {
  const text = element.textContent || '';
  element.textContent = '';
  
  const characters = text.split('');
  characters.forEach((char, index) => {
    const charSpan = document.createElement('span');
    charSpan.textContent = char;
    charSpan.style.opacity = '0';
    charSpan.style.animation = `fade-in 0.3s forwards`;
    charSpan.style.animationDelay = `${index * delay}ms`;
    element.appendChild(charSpan);
  });
};

// Continuous wave animation
export const createWaveAnimation = (
  container: HTMLElement, 
  color = 'rgba(59, 130, 246, 0.2)',
  count = 3
): (() => void) => {
  const waves: HTMLDivElement[] = [];
  
  for (let i = 0; i < count; i++) {
    const wave = document.createElement('div');
    wave.style.position = 'absolute';
    wave.style.inset = '0';
    wave.style.borderRadius = '50%';
    wave.style.background = color;
    wave.style.transform = 'scale(0)';
    wave.style.opacity = '1';
    wave.style.animation = `wave-animation 4s infinite ease-out`;
    wave.style.animationDelay = `${i * 1000}ms`;
    container.appendChild(wave);
    waves.push(wave);
  }
  
  // Add keyframes to document if they don't exist
  if (!document.querySelector('#wave-keyframes')) {
    const style = document.createElement('style');
    style.id = 'wave-keyframes';
    style.textContent = `
      @keyframes wave-animation {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(1.5);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Return cleanup function
  return () => {
    waves.forEach(wave => {
      if (wave.parentNode) {
        wave.parentNode.removeChild(wave);
      }
    });
  };
};

// Typing animation
export const typingAnimation = (
  element: HTMLElement,
  text: string,
  speed = 100,
  loop = false,
  pauseDelay = 2000
): (() => void) => {
  let i = 0;
  let isDeleting = false;
  let timeout: number;
  
  const type = () => {
    const fullText = text;
    const currentText = isDeleting 
      ? fullText.substring(0, i--)
      : fullText.substring(0, i++);
    
    element.textContent = currentText;
    
    // Typing speed logic
    let typeSpeed = isDeleting ? speed / 2 : speed;
    
    // If completed typing
    if (!isDeleting && i === fullText.length + 1) {
      if (loop) {
        // Pause at the end
        isDeleting = true;
        typeSpeed = pauseDelay;
      } else {
        return;
      }
    }
    
    // If completed deleting
    if (isDeleting && i === 0) {
      isDeleting = false;
      // Pause before typing again
      typeSpeed = pauseDelay;
    }
    
    timeout = window.setTimeout(type, typeSpeed);
  };
  
  // Start typing
  type();
  
  // Return cleanup function
  return () => {
    clearTimeout(timeout);
  };
};
