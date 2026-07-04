import { useState, useEffect } from "react";
import { Menu, X, Github } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "HOMEPAGE", href: "#home" },
    { label: "ABOUT ME", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "ACHIEVEMENTS", href: "#achievements" },
    { label: "GOALS", href: "#goals" },
    { label: "HOBBIES", href: "#hobbies" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CAPSTONE", href: "#capstone" },
    { label: "RESUME", href: "#resume" },
    { label: "REFLECTIONS", href: "#reflections" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] border-b transition-all duration-300 no-print ${
        scrolled
          ? "bg-[#1b0d09]/95 backdrop-blur-md border-amberwood-900/40 py-3 shadow-lg"
          : "bg-[#1b0d09]/80 backdrop-blur-sm border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <a
          href="#home"
          className="font-serif text-2xl tracking-wide font-medium text-amberwood-100 hover:text-amberwood-200 transition-colors"
        >
          Maison <span className="text-ochre">.</span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex flex-wrap items-center justify-center gap-x-5 xl:gap-x-6 text-[9px] xl:text-[10px] uppercase tracking-[0.2em] font-medium">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`hover:text-parchment transition-colors py-1 ${
                activeSection === item.href.slice(1)
                  ? "text-ochre font-semibold border-b border-ochre"
                  : "text-amberwood-300"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions section */}
        <div className="flex items-center gap-3">
          {/* GitHub button - visible on desktop and tablet */}
          <a
            href="https://github.com/janebaluna"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-amberwood-950/40 text-ochre text-[10px] uppercase tracking-wider font-bold rounded-full hover:bg-ochre hover:text-stone-950 transition-all duration-300 shadow-md border border-ochre/20 hover:scale-105 shrink-0"
            title="My GitHub Profile"
          >
            <Github className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-amberwood-300 hover:text-amberwood-100 p-2"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#1b0d09] border-t border-amberwood-900/40 px-6 py-6 flex flex-col space-y-4 text-[10px] uppercase tracking-[0.2em] font-medium text-amberwood-300 shadow-2xl">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`hover:text-parchment transition-colors py-1 ${
                activeSection === item.href.slice(1) ? "text-ochre font-bold" : "text-amberwood-300"
              }`}
            >
              {item.label}
            </a>
          ))}
          
          <div className="pt-4 border-t border-amberwood-900/20">
            <a
              href="https://github.com/janebaluna"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-ochre/10 hover:bg-ochre hover:text-stone-950 text-ochre text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all duration-300 border border-ochre/25 w-full"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub Profile
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
