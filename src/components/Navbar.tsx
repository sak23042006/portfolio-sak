import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
    { label: 'Resume', href: 'https://drive.google.com/file/d/1dERexgqi8eApYes54dp89-mrEO0Z7HfC/view?usp=sharing', isExternal: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Get the menu button element
      const menuButton = document.querySelector('[aria-label="Menu"]');
      
      // Don't close if clicking on the menu button itself
      if (menuButton && menuButton.contains(event.target as Node)) {
        return;
      }
      
      // Close if clicking outside both the menu and the button
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('http')) {
      return; // Let the default behavior handle external links
    }
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({
      behavior: 'smooth',
    });
    setIsOpen(false); // Close mobile menu after clicking a link
  };

  return (
    <header
      ref={navbarRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-4 sm:px-6 transition-all duration-300",
        isScrolled ? "bg-transparent dark:bg-transparent backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="text-xl sm:text-2xl font-bold text-primary dark:text-white">
          SAK
        </a>
        
        <div className="sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        <nav
          className={cn(
            "fixed sm:relative top-[60px] sm:top-0 left-0 w-full sm:w-auto h-[calc(100vh-60px)] sm:h-auto p-4 sm:p-0 transition-transform duration-300 sm:transform-none bg-white/50 dark:bg-gray-900/50 backdrop-blur-md sm:bg-transparent sm:dark:bg-transparent sm:backdrop-blur-none",
            isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
          )}
          ref={menuRef}
        >
          <ul className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-base sm:text-sm md:text-base font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white link-underline"
                  onClick={(e) => handleLinkClick(e, link.href)}
                  {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              Contact Me
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
