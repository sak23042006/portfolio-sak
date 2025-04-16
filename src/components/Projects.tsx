import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AnimatedCard from "./AnimatedCard";
import AnimatedText from "./AnimatedText";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample project data
const projects = [
  {
    id: 1,
    title: "Steps",
    description: "A Training platform",
    technologies: [
      "NextJs",
      "Typescript",
      "ExpressJs",
      "PostgreSql",
      "TailwindCSS",
    ],
    image: "/steps-web.png",
    link: "https://exploresteps.com",
    github: "https://github.com/STEPS-Training-Academy",
    category: "Web Development",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description:
      "A personal portfolio showcasing my skills, projects, and experience with a sleek and responsive design.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    image: "/portfolio-web.png",
    link: "#",
    github: "https://github.com/sak23042006/portfolio-sak.git",
    category: "Web Development",
  },
  {
    id: 3,
    title: "CloudSave POC",
    description:
      "A comprehensive portal for managing insurance claims efficiently, streamlining workflows, and enhancing user experience.",
    technologies: ["React Native", "Typescript", "Backblaze"],
    image:
      "https://www.devteam.space/wp-content/uploads/2021/11/How-to-Build-a-Mobile-App-With-React-Native.jpg",
    github: "https://github.com/frugalnova-dev",
    category: "Mobile Apps",
  },
  {
    id: 4,
    title: "DevsDev",
    description:
      "An open forum for developers to share their knowledge and experiences.",
    technologies: ["React", "JavaScript", "ExpressJs", "MongoDB"],
    image: "/devsdev-web.png",
    github: "https://github.com/sak23042006/S54_Arunkumar_Capstone_DevsDev.git",
    link: "https://devsdev.vercel.app",
    category: "Web Development",
  },
];

// Categories for filtering
const categories = ["All", "Web Development", "UI/UX Design", "Mobile Apps"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { ref, isInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Filter projects based on selected category
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Portfolio
          </span>
          <AnimatedText
            text="Featured Projects"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 md:mb-6"
            delay={30}
          />
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 md:mb-12 text-sm sm:text-base">
            Explore my most recent projects showcasing my skills in web
            development, design, and creating interactive user experiences.
          </p>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm",
                  activeCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={cn(
                  "transform transition-all duration-700",
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <AnimatedCard className="h-full bg-[#EFEFEF] overflow-hidden rounded-xl">
                  <div
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="relative aspect-video overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 transform"
                      style={{
                        backgroundImage: `url(${project.image})`,
                        transform:
                          hoveredProject === project.id
                            ? "scale(1.1)"
                            : "scale(1)",
                      }}
                    />
                  </div>

                  <div className="p-2 sm:p-6 relative z-10">
                    <div className="bg-white/90 dark:bg-gray-900/90 shadow-lg p-4 sm:p-6 rounded-lg ">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">{project.description}</p>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 text-xs sm:text-sm rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 sm:gap-3">
                        {project.link && (
                          <a
                            href={project.link}
                            className="group flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                            target={project.link === "#" ? undefined : "_blank"}
                            rel={
                              project.link === "#"
                                ? undefined
                                : "noopener noreferrer"
                            }
                          >
                            <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                          </a>
                        )}
                        <a
                          href={project.github}
                          className="group flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={16} className="sm:w-5 sm:h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">Coming Soon</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-md text-sm sm:text-base">
                {activeCategory === "All" 
                  ? "More projects are coming soon. Stay tuned for updates!" 
                  : `More ${activeCategory} projects are coming soon. Check back later!`}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
