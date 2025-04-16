import { useEffect, useRef } from 'react';
import ParallaxEffect from './ParallaxEffect';
import AnimatedText from './AnimatedText';
import AnimatedMarquee from './AnimatedMarquee';
import FloatingParticles from './FloatingParticles';
import { ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import GlobeDemo from './ui/globe-demo';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    // Add an initial animation class to the hero
    const container = containerRef.current;
    if (container) {
      container.classList.add('animate-fade-in');
    }
  }, []);
  
  return (
    <>
      <section 
        id="home" 
        ref={containerRef}
        className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden"
      >
        <div className="absolute inset-0 -z-10" />
        <FloatingParticles count={40} />
        
        <ParallaxEffect className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h4 className="text-primary font-medium mb-2 opacity-0 animate-fade-in dark:text-blue-300 text-sm sm:text-base lg:text-lg" style={{ animationDelay: '300ms' }}>
                Hello, I'm
              </h4>
              <AnimatedText 
                text="Arun Kumar S"
                tag="h1"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 dark:text-white"
                delay={40}
              />
              <AnimatedText 
                text="Software Engineer | Web & App Dev"
                tag="h2"
                className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 lg:mb-8 leading-tight"
                delay={30}
                once={true}
              />
              <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 lg:mb-10 max-w-lg opacity-0 animate-fade-in text-sm sm:text-base lg:text-lg" style={{ animationDelay: '800ms' }}>
                I craft scalable, high-performance web applications with seamless user experiences, blending innovation with efficiency. 
                Always exploring new technologies to optimize solutions. 🚀
              </p>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-5 opacity-0 animate-fade-in" style={{ animationDelay: '1000ms' }}>
                <a 
                  href="#projects" 
                  className="bg-primary hover:bg-primary/90 text-white dark:bg-blue-600 dark:hover:bg-blue-700 px-6 sm:px-8 lg:px-10 py-2 sm:py-3 lg:py-4 rounded-full transition-all hover-lift text-sm sm:text-base lg:text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Projects
                </a>
                <a 
                  href="#contact" 
                  className="border border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-blue-500 hover:text-primary dark:hover:text-blue-400 dark:text-gray-300 px-6 sm:px-8 lg:px-10 py-2 sm:py-3 lg:py-4 rounded-full transition-all hover-lift text-sm sm:text-base lg:text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact Me
                </a>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <GlobeDemo />
            </div>
          </div>
        </ParallaxEffect>
        
        {/* Animated background shapes */}
        <div className="absolute top-10 sm:top-20 lg:top-24 left-5 sm:left-10 lg:left-16 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 rounded-full bg-blue-100 dark:bg-blue-900/40 opacity-60 animate-float" data-parallax="0.3" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-16 sm:bottom-20 lg:bottom-24 right-[5%] sm:right-[10%] lg:right-[15%] w-16 sm:w-24 lg:w-28 h-16 sm:h-24 lg:h-28 rounded-full bg-cyan-100 dark:bg-cyan-900/40 opacity-60 animate-float" data-parallax="0.2" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-5 sm:right-10 lg:right-16 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 rounded-full bg-purple-100 dark:bg-purple-900/40 opacity-60 animate-float" data-parallax="0.4" style={{ animationDelay: '2s' }}></div>
      </section>
      
      {/* Animated marquee for skills - now a separate section */}
      <section className="w-full overflow-hidden py-4 sm:py-8 md:py-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <AnimatedMarquee speed={40} direction="left" className="py-4 sm:py-6 md:py-8">
          {[ 'Next.js', 'React', 'Angular', 'TypeScript' , 'Javascript', 'Tailwind CSS', 'PostgreSQL', 'Node.js', 'MongoDB', 'UX/UI Design', 'Framer Motion', 'MySQL' , 'AWS' , 'Docker', 'Express.js', 'React Native', 'Android Studio', 'Figma'].map((skill) => (
            <Badge key={skill} variant="secondary" className="mx-1 sm:mx-2 text-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border dark:text-blue-300 font-medium">
              {skill}
            </Badge>
          ))}
        </AnimatedMarquee>
      </section>
    </>
  );
};

export default Hero;
