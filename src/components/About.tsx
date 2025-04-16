import { useRef, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import SkillBar from './SkillBar';
import AnimatedText from './AnimatedText';
import { Code, Palette, Globe, BookOpen, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const skills = [
  {
    category: "Programming Languages",
    items: ["JavaScript", "TypeScript", "Java", "Python", "C++"]
  },
  {
    category: "Frontend Technologies",
    items: ["Next.js", "Angular", "React", "HTML", "CSS", "Tailwind CSS"]
  },
  {
    category: "Backend Technologies",
    items: ["Node.js(Express.js)", "Spring Boot"]
  },
  {
    category: "App Development",
    items: ["React Native"]
  },
  {
    category: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL"]
  },
  {
    category: "Deployment Tools",
    items: [ "Docker", "AWS S3", "Vercel", "Netlify"]
  },
  {
    category: "Hosting Platforms",
    items: ["cPanel", "HostGator", "BigRock", "AWS S3", "Vercel", "Netlify"]
  },
  {
    category: "Other Skills",
    items: ["Github","Git","REST APIs", "Agile Development", "UI/UX Design"]
  }
];

const services = [
  {
    icon: <Code size={28} />,
    title: 'Web Development',
    description: 'Creating responsive, performant web applications using modern technologies.',
  },
  {
    icon: <Palette size={28} />,
    title: 'UI/UX Design',
    description: 'Designing intuitive interfaces with focus on user experience and aesthetics.',
  },
  {
    icon: <Globe size={28} />,
    title: 'Digital Solutions',
    description: 'Building comprehensive digital solutions for complex business problems.',
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Consultancy',
    description: 'Technical consulting and guidance for your digital transformation journey.',
  },
];

const workExperience = [
  {
    company: "Morgan Stanley",
    position: "SDE Intern (Remote)",
    period: "July 2024 - July 2025",
    techStack: ["Angular", "Spring Boot", "Java", "MySQL"],
    description: "Developed a web application prototype using Angular and Spring Boot",
  },
  // Add more work experience entries here
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: skillsRef, isInView: skillsInView } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: servicesRef, isInView: servicesInView } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const { ref: experienceRef, isInView: experienceInView } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm relative overflow-hidden">
      {/* <div className="absolute inset-0 bg-blue-50/30 -z-10" /> */}
      
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            About Me
          </span>
          <AnimatedText
            text="Technical Expertise"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900 dark:text-white"
            delay={30}
          />
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
            Professional Skills & Development Experience
          </p>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          I have hands-on experience building real-world web applications that solve practical problems. 
          Through developing full-stack projects and participating in hackathons, I've honed my ability to create efficient, user-friendly, and scalable solutions. 
          Always eager to learn and adapt, I thrive on tackling new challenges in web and mobile development. 🚀
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
          {/* Skills Section */}
          <div ref={skillsRef as React.RefObject<HTMLDivElement>}>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-white">Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {skills.map((skillGroup, index) => (
                <div 
                  key={skillGroup.category}
                  className={cn(
                    "transition-all duration-1000 transform",
                    skillsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <h4 className="text-base sm:text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {skillGroup.items.map((skill) => (
                      <span 
                        key={skill}
                        className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Work Experience Section */}
          <div
            ref={experienceRef as React.RefObject<HTMLDivElement>}
            className="mt-12 sm:mt-16 md:mt-20"
          >
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                Experience
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Work Experience</h3>
            </div>
            
            <div className="space-y-6 sm:space-y-8">
              {workExperience.map((job, index) => (
                <div 
                  key={index}
                  className={cn(
                    "p-4 sm:p-6 rounded-lg border border-gray-100 dark:border-gray-800 transition-all duration-500 transform hover:shadow-lg",
                    experienceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{job.company}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{job.position}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">{job.period}</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {job.techStack.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Services Section */}
          <div
            ref={servicesRef as React.RefObject<HTMLDivElement>}
            className="mt-12 sm:mt-16 md:mt-20"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-8 sm:mb-10 md:mb-12 text-center text-gray-900 dark:text-white">Services I Offer</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {services.map((service, index) => (
                <div 
                  key={service.title}
                  className={cn(
                    "p-4 sm:p-6 rounded-lg shadow-lg border border-gray-100 transition-all duration-500 transform hover:shadow-xl hover:-translate-y-1",
                    servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3 sm:mb-4">
                    {service.icon}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
