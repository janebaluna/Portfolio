import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code,
  Paintbrush,
  Palette,
  Layout,
  FileText,
  Database,
  Server,
  Cpu,
  Smartphone,
  Settings,
  Heart,
  Lightbulb,
  CheckSquare,
  Activity,
  Compass,
  Users,
  Clock,
  MessageSquare,
  Layers,
  Award,
  Mail,
  MapPin,
  Phone,
  GraduationCap,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Trophy,
  Sparkles
} from "lucide-react";

import Navbar from "./components/Navbar";
import ProjectModal from "./components/ProjectModal";
import InteractiveResume from "./components/InteractiveResume";
import CapstoneBlog from "./components/CapstoneBlog";
import janePortrait from "./assets/images/jane_custom_photo.png";
import {
  projects,
  skills,
  softSkills,
  achievements,
  goals,
  hobbies,
  contactInfo,
  education,
  technicalCompetencies,
  softCompetencies
} from "./data";
import { Project } from "./types";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);

  // Contact form submission state
  const [formSubmitted, setFormFeedback] = useState(false);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  // Custom Cursor tracking & smooth lerp using refs (prevents re-render lag)
  useEffect(() => {
    const mouse = { x: -100, y: -100 };
    const dot = { x: -100, y: -100 };
    const glow = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Global listener to detect hover over any interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = 
        target.closest("a") || 
        target.closest("button") || 
        target.closest("input") || 
        target.closest("textarea") || 
        target.closest('[role="button"]') ||
        target.classList.contains("interactive") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    let animId: number;
    const updateCoords = () => {
      // Lerp dot (very fast and tactile)
      dot.x += (mouse.x - dot.x) * 0.25;
      dot.y += (mouse.y - dot.y) * 0.25;

      // Lerp glow (trailing smoothly behind)
      glow.x += (mouse.x - glow.x) * 0.12;
      glow.y += (mouse.y - glow.y) * 0.12;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${dot.x}px`;
        cursorDotRef.current.style.top = `${dot.y}px`;
      }
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${glow.x}px`;
        cursorGlowRef.current.style.top = `${glow.y}px`;
      }

      animId = requestAnimationFrame(updateCoords);
    };

    animId = requestAnimationFrame(updateCoords);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Section visibility tracking for Navbar highlight
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const handleScroll = () => {
      let current = "home";
      const scrollPos = window.scrollY + 200;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Icon mapping resolver
  const getIcon = (name: string) => {
    const map: Record<string, React.ComponentType<any>> = {
      Code,
      Paintbrush,
      Palette,
      Layout,
      FileText,
      Database,
      Server,
      Cpu,
      Smartphone,
      Settings,
      Heart,
      Lightbulb,
      CheckSquare,
      Activity,
      Compass,
      Users,
      Clock,
      MessageSquare,
      Layers,
      Award,
    };
    const Comp = map[name];
    return Comp ? <Comp className="w-5 h-5 text-ochre" /> : <Code className="w-5 h-5 text-ochre" />;
  };

  // Achievement custom icon resolver to match visual aesthetics
  const getAchievementIcon = (num: number) => {
    switch (num) {
      case 1:
        return <Award className="w-5 h-5 text-ochre" />;
      case 2:
        return <Heart className="w-5 h-5 text-rose-400/90" />;
      case 3:
        return <Activity className="w-5 h-5 text-amber-400/90" />;
      case 4:
        return <GraduationCap className="w-5 h-5 text-emerald-400/90" />;
      case 5:
        return <Code className="w-5 h-5 text-sky-400/90" />;
      case 6:
        return <Layout className="w-5 h-5 text-orange-400/90" />;
      case 7:
        return <Database className="w-5 h-5 text-indigo-400/90" />;
      case 8:
        return <Paintbrush className="w-5 h-5 text-purple-400/90" />;
      case 9:
        return <Settings className="w-5 h-5 text-teal-400/90" />;
      case 10:
        return <Cpu className="w-5 h-5 text-pink-400/90" />;
      case 11:
        return <Trophy className="w-5 h-5 text-yellow-400/90 animate-bounce" style={{ animationDuration: '3s' }} />;
      case 12:
        return <Sparkles className="w-5 h-5 text-cyan-400/90" />;
      default:
        return <Award className="w-5 h-5 text-ochre" />;
    }
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setFormFeedback(true);
    setTimeout(() => setFormFeedback(false), 5000);
  };

  const hoverHandlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return (
    <div className="bg-[#180b07] text-[#f3e8da] font-sans antialiased relative selection:bg-amberwood-300 selection:text-amberwood-950 grid-bg min-h-screen">
      {/* Dynamic Cursor Elements */}
      <div
        ref={cursorDotRef}
        className="hidden lg:block custom-cursor-dot"
        style={{
          left: "-100px",
          top: "-100px",
          width: isHovered ? "12px" : "6px",
          height: isHovered ? "12px" : "6px",
          backgroundColor: isHovered ? "#f3e8da" : "#c48f65",
        }}
      />
      <div
        ref={cursorGlowRef}
        className="hidden lg:block custom-cursor-glow"
        style={{
          left: "-100px",
          top: "-100px",
          width: isHovered ? "48px" : "32px",
          height: isHovered ? "48px" : "32px",
          border: isHovered ? "1px solid rgba(243, 232, 218, 0.6)" : "1px solid rgba(196, 143, 101, 0.4)",
          backgroundColor: isHovered ? "rgba(196, 143, 101, 0.12)" : "transparent",
        }}
      />

      {/* Decorative ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 no-print">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] ambient-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] ambient-glow" />
        <div className="absolute top-[40%] left-[30%] w-[50%] h-[50%] ambient-glow opacity-60" />
      </div>

      {/* Navigation Header */}
      <Navbar activeSection={activeSection} />

      <main className="relative z-10 pt-36 md:pt-24 space-y-32 md:space-y-40 pb-20">
        
        {/* HOMEPAGE HERO */}
        <section
          id="home"
          className="relative min-h-[90vh] flex flex-col justify-center px-4 md:px-6 lg:px-16 max-w-7xl mx-auto py-10 scroll-mt-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left intro copy */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amberwood-950/60 border border-amberwood-800/40"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-ochre animate-pulse"></span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-amberwood-300 font-semibold font-sans">
                  CREATIVE CURATOR & DESIGNER
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-5xl md:text-6xl xl:text-7xl text-[#f3e8da] leading-[1.05] font-light"
              >
                BALUNA <br />
                <span className="italic text-ochre font-normal text-glow">JANE MARIE</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-amberwood-200 max-w-lg text-sm md:text-base leading-relaxed font-light"
              >
                A student passionate about technology, innovation, and digital creativity, exploring programming and hands-on projects through academic learning and the AI Academy. This portfolio reflects my growth, creativity, and interest in building skills for future opportunities in tech.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex items-center space-x-4 pt-4"
              >
                <a
                  href="#projects"
                  {...hoverHandlers}
                  className="px-6 py-3 rounded-full bg-amberwood-800 text-parchment text-[11px] uppercase tracking-widest font-semibold hover:bg-[#834626] transition-all duration-300 shadow-xl hover:shadow-amberwood-950/50"
                >
                  EXPLORE WORKS
                </a>
                <a
                  href="#contact"
                  {...hoverHandlers}
                  className="px-6 py-3 rounded-full border border-amberwood-800/60 text-amberwood-200 text-[11px] uppercase tracking-widest font-semibold hover:border-amberwood-400 hover:text-parchment transition-all duration-300"
                >
                  SAY HELLO
                </a>
              </motion.div>
            </div>

            {/* Right side portrait frame */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-main-img botanical-card w-full max-w-[340px] md:max-w-[380px]"
              >
                <div 
                  className="overflow-hidden rounded-xl aspect-[3/4] cursor-crosshair"
                  onMouseEnter={() => setIsPortraitHovered(true)}
                  onMouseLeave={() => setIsPortraitHovered(false)}
                >
                  <img
                    src={janePortrait}
                    alt="Jane Marie Baluna - Homepage Portrait"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{
                      transform: isPortraitHovered ? "scale(1.45)" : "scale(1.35)",
                      objectPosition: "center 38%",
                    }}
                  />
                </div>
              </motion.div>
              <div className="flex justify-between items-center mt-5 px-2 w-full max-w-[340px] md:max-w-[380px] text-[10px] tracking-widest text-amberwood-400 font-medium">
                <span>VOLUME I / PORTRAIT</span>
                <span>PROFESSIONAL EDITION</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT ME */}
        <section id="about" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 scroll-mt-28">
          <div className="text-center space-y-4 mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-ochre font-semibold block">
              CURATED PERSONA
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#f3e8da] font-light">The Narrative</h2>
            <div className="w-16 h-[1px] bg-amberwood-600 mx-auto" />
          </div>

          {/* Core Personas with exact original images */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16 md:mb-20">
            {[
              {
                title: "CHILDLIKE PERSON",
                img: "https://res.cloudinary.com/dkzomhqe0/image/upload/v1782301741/girl_hdixik.jpg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                title: "AESTHETIC PERSON",
                img: "https://res.cloudinary.com/dkzomhqe0/image/upload/v1782302254/th_tncg0s.jpg?auto=compress&cs=tinysrgb&w=400",
                isHighlight: true
              },
              {
                title: "JOYFUL PERSON",
                img: "https://res.cloudinary.com/dkzomhqe0/image/upload/v1782302259/trese_ujvriu.jpg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                title: "FRIENDLY PERSON",
                img: "https://res.cloudinary.com/dkzomhqe0/image/upload/v1782302234/IMG_20251217_190523_521_-1062941991_fpse4k.jpg?auto=compress&cs=tinysrgb&w=400"
              }
            ].map((pers, idx) => (
              <div key={idx} className="flex flex-col items-center group cursor-pointer" {...hoverHandlers}>
                <div className="circle-img">
                  <img
                    src={pers.img}
                    alt={pers.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={`text-[10px] uppercase tracking-[0.2em] mt-4 transition-colors ${
                    pers.isHighlight
                      ? "text-ochre font-semibold"
                      : "text-amberwood-300 group-hover:text-parchment"
                  }`}
                >
                  {pers.title}
                </span>
              </div>
            ))}
          </div>

          {/* Narrative bio block */}
          <div className="max-w-4xl mx-auto bg-amberwood-950/50 border border-amberwood-900/40 p-8 md:p-12 rounded-3xl relative overflow-hidden botanical-card">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amberwood-900/10 rounded-full blur-2xl pointer-events-none" />
            <div className="prose prose-invert max-w-none text-amberwood-200 text-sm md:text-lg leading-relaxed space-y-6 font-light text-center">
              <p className="italic text-glow leading-relaxed">
                "As a Grade 12 student at the Sisters of Mary, I am currently taking up Computer Programming and Mechatronics. My academic journey has helped me develop strong technical, problem-solving, and logical thinking skills, while also strengthening my interest in technology and innovation. Participating in the AI Academy has been a valuable and transformative experience. It introduced me to the power of Artificial Intelligence and how it can be applied beyond coding — supporting creativity, improving efficiency, and solving real-world problems in smarter ways. I am passionate about learning new technologies, especially in programming and AI-driven tools. Through continuous practice and exploration, I aim to grow my skills and prepare myself for future opportunities in the tech industry."
              </p>
              <div className="w-12 h-[1px] bg-amberwood-800 mx-auto" />
              <p className="text-xs uppercase tracking-widest text-amberwood-400">
                MAISON PORTFOLIO • CURATED ARCHIVE
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 scroll-mt-28">
          <div className="text-center space-y-4 mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-ochre font-semibold block">
              CRAFT & EXPERTISE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#f3e8da] font-light">20 Skills Portfolio</h2>
            <div className="w-16 h-[1px] bg-amberwood-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Technical skills */}
            <div className="space-y-6 text-left">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-amberwood-950/60 rounded-xl text-ochre border border-amberwood-900/40">
                  <Cpu className="w-5 h-5 text-ochre" />
                </div>
                <h3 className="font-serif text-2xl text-parchment font-light italic">
                  Technical Spectrum (10)
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    {...hoverHandlers}
                    className="p-4 bg-amberwood-950/30 border border-amberwood-900/40 rounded-xl flex items-center space-x-3 botanical-card cursor-pointer"
                  >
                    {getIcon(skill.icon)}
                    <span className="text-[11px] uppercase tracking-widest text-amberwood-200">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft skills */}
            <div className="space-y-6 text-left">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-amberwood-950/60 rounded-xl text-ochre border border-amberwood-900/40">
                  <Users className="w-5 h-5 text-ochre" />
                </div>
                <h3 className="font-serif text-2xl text-parchment font-light italic">
                  Soft Capabilities (10)
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {softSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    {...hoverHandlers}
                    className="p-4 bg-amberwood-950/30 border border-amberwood-900/40 rounded-xl flex items-center space-x-3 botanical-card cursor-pointer"
                  >
                    {getIcon(skill.icon)}
                    <span className="text-[11px] uppercase tracking-widest text-amberwood-200">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section id="achievements" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 scroll-mt-28">
          <div className="text-center space-y-4 mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-ochre font-semibold block">
              CHRONICLES
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#f3e8da] font-light">10 Major Achievements</h2>
            <div className="w-16 h-[1px] bg-amberwood-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto text-left">
            {achievements.map((ach) => (
              <div
                key={ach.num}
                {...hoverHandlers}
                className="bg-[#1b0d09]/40 border border-amberwood-900/40 rounded-2xl p-6 flex flex-col justify-between project-card botanical-card group cursor-pointer transition-all duration-300 hover:border-ochre/50 hover:shadow-[0_10px_30px_rgba(131,70,38,0.15)] relative overflow-hidden"
              >
                {/* Background glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-ochre/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    {/* Icon container with a glowing background ring */}
                    <div className="w-10 h-10 rounded-xl bg-[#28140e] border border-amberwood-900/40 flex items-center justify-center shadow-inner group-hover:border-ochre/40 transition-colors duration-300">
                      {getAchievementIcon(ach.num)}
                    </div>
                    {/* Big beautiful index number */}
                    <span className="font-mono text-xs font-bold text-amberwood-700 select-none group-hover:text-ochre transition-colors duration-300">
                      #{ach.num.toString().padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    {/* Achievement Tag Badge */}
                    <span className="inline-block px-2.5 py-0.5 text-[8px] uppercase tracking-widest font-bold text-ochre bg-[#27150e]/80 border border-ochre/20 rounded-full mb-2">
                      {ach.tag}
                    </span>
                    {/* Title with serif italic */}
                    <h3 className="font-serif text-lg text-amberwood-100 font-light italic leading-tight group-hover:text-parchment transition-colors duration-300">
                      {ach.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-amberwood-300 text-xs font-light leading-relaxed">
                    {ach.desc}
                  </p>
                </div>

                {/* Aesthetic accent bottom border */}
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-amberwood-900/10 to-transparent mt-4 group-hover:via-ochre/30 transition-all duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* GOALS */}
        <section id="goals" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 scroll-mt-28">
          <div className="text-center space-y-4 mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-ochre font-semibold block">
              ASPIRATIONS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#f3e8da] font-light">Earthy Visions & Goals</h2>
            <div className="w-16 h-[1px] bg-amberwood-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left quotation quote */}
            <div className="lg:col-span-5 bg-[#1b0d09] border border-amberwood-900/40 rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden text-center">
              <div className="absolute -top-6 -left-2 text-amberwood-900/10 text-9xl font-serif select-none">
                “
              </div>
              <blockquote className="relative z-10 space-y-4">
                <span className="text-[9px] uppercase tracking-[0.35em] text-ochre font-semibold block">
                  LOOKING FORWARD
                </span>
                <p className="font-serif text-lg md:text-xl italic text-amberwood-200 leading-relaxed text-glow">
                  "My journey doesn't stop at graduation. I continuously set new milestones that challenge me to grow beyond my limits and strengthen both my technical and creative abilities. I aim to keep learning, improving, and exploring new ideas that expand my skills in technology and design."
                </p>
              </blockquote>
              <div className="absolute -bottom-12 -right-4 text-amberwood-900/10 text-9xl font-serif select-none">
                ”
              </div>
            </div>

            {/* Right Goals listing */}
            <div className="lg:col-span-7 bg-amberwood-950/20 border border-amberwood-900/30 rounded-2xl p-8 space-y-6 botanical-card text-left">
              <h3 className="font-serif text-2xl text-amberwood-200 font-light italic border-b border-amberwood-900/30 pb-4">
                My Core 7 Goals
              </h3>
              <div className="space-y-5">
                {goals.map((g) => (
                  <div key={g.id} className="flex items-start space-x-3">
                    <span className="text-[9px] font-semibold text-ochre bg-[#27150e] px-2.5 py-1 rounded-md border border-amberwood-900/40 flex-shrink-0">
                      {g.id}
                    </span>
                    <p className="text-amberwood-200 text-sm font-light mt-0.5">
                      {g.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOBBIES */}
        <section id="hobbies" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 scroll-mt-28">
          <div className="text-center space-y-4 mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-ochre font-semibold block">
              RITUALS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#f3e8da] font-light">10 Creative Hobbies</h2>
            <div className="w-16 h-[1px] bg-amberwood-600 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {hobbies.map((hob) => (
              <div
                key={hob.num}
                {...hoverHandlers}
                className="bg-amberwood-950/40 rounded-xl overflow-hidden border border-amberwood-900/40 botanical-card group cursor-pointer"
              >
                <div className="h-36 overflow-hidden relative">
                  <img
                    src={hob.image}
                    alt={hob.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter sepia contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-3 text-center border-t border-amberwood-900/20">
                  <h4 className="font-serif text-xs font-light text-amberwood-200">
                    {hob.num}. {hob.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 scroll-mt-28">
          <div className="text-center space-y-4 mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-ochre font-semibold block">
              CRAFT GALLERY
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#f3e8da] font-light">Curated Projects</h2>
            <div className="w-16 h-[1px] bg-amberwood-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                {...hoverHandlers}
                className="bg-[#1b0d09]/40 border border-amberwood-900/40 rounded-2xl overflow-hidden flex flex-col project-card botanical-card group cursor-pointer text-left"
              >
                <div className="p-4 space-y-4 flex-grow">
                  <div className="w-full overflow-hidden relative bg-amberwood-950 rounded-xl h-48">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="project-img w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{proj.icon}</span>
                    <h4 className="font-serif text-base text-amberwood-100 font-light italic">
                      {proj.num.toString().padStart(2, "0")}. {proj.title}
                    </h4>
                  </div>
                  <p className="text-amberwood-300 text-xs font-light leading-relaxed">
                    {proj.desc.substring(0, 85)}...
                  </p>
                </div>
                <div className="p-4 border-t border-amberwood-900/20 flex justify-between items-center text-xs">
                  <span className="text-ochre tracking-widest font-semibold uppercase text-[9px]">
                    {proj.category}
                  </span>
                  <span className="text-amberwood-200 flex items-center space-x-1 font-medium">
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMMUNITY CAPSTONE BLOG SECTION */}
        <section id="capstone" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 scroll-mt-28">
          <div className="text-center space-y-4 mb-16 md:mb-20 no-print">
            <span className="text-xs uppercase tracking-[0.3em] text-ochre font-semibold block">
              SOCIALLY RESPONSIBLE TECH
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#f3e8da] font-light">Community Capstone</h2>
            <div className="w-16 h-[1px] bg-amberwood-600 mx-auto" />
          </div>
          
          <CapstoneBlog />
        </section>

        {/* INTERACTIVE RESUME SECTION */}
        <section id="resume" className="max-w-7xl mx-auto px-6 lg:px-16 scroll-mt-28">
          <div className="text-center space-y-4 mb-20 no-print">
            <span className="text-xs uppercase tracking-[0.3em] text-ochre font-semibold block">Professional Profile</span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#f3e8da] font-light">My Resume</h2>
            <div className="w-16 h-[1px] bg-amberwood-600 mx-auto"></div>
          </div>
          
          {/* Main content which handles tabs and printing */}
          <div className="w-full">
            <InteractiveResume />
          </div>
        </section>

        {/* LEARNING JOURNAL / REFLECTIONS */}
        <section id="reflections" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 scroll-mt-28">
          <div className="text-center space-y-4 mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-ochre font-semibold block">
              Academic Journals
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#f3e8da] font-light">Learning Reflections</h2>
            <div className="w-16 h-[1px] bg-amberwood-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
            <div className="bg-amberwood-950/40 border border-amberwood-900/40 rounded-3xl p-8 md:p-10 space-y-4 hover:border-amberwood-700 transition-colors relative overflow-hidden botanical-card">
              <span className="text-[10px] text-ochre font-semibold uppercase tracking-widest block">
                Entry 1: Aesthetic Digital Layout & Visual Composition
              </span>
              <h3 className="font-serif text-2xl text-amberwood-100 font-light italic">
                The Concept of Visual Balance
              </h3>
              <p className="text-amberwood-200 text-sm md:text-base leading-relaxed font-light mb-4">
                Last week, I dove deep into the Canva ecosystem to experiment with spatial layouts, hierarchy, and color harmony. I focused on creating a balanced design that feels both modern and timeless.
              </p>
              <div className="border-t border-amberwood-900/30 pt-4 mt-2">
                <strong className="font-medium text-ochre text-xs uppercase tracking-wider block mb-1">
                  Key Takeaway:
                </strong>
                <p className="text-amberwood-300 text-sm font-light leading-relaxed">
                  Mastering Canva allowed me to translate my ideas into visual realities. It taught me the principles of visual hierarchy, color theory, and typography. Combining Canva with AI tools like image generators and text assistants has made my creative process faster, more dynamic, and infinitely more exploratory.
                </p>
              </div>
            </div>

            <div className="bg-amberwood-950/40 border border-amberwood-900/40 rounded-3xl p-8 md:p-10 space-y-4 hover:border-amberwood-700 transition-colors relative overflow-hidden botanical-card">
              <span className="text-[10px] text-ochre font-semibold uppercase tracking-widest block">
                Entry 2: Navigating the AI Frontier
              </span>
              <h3 className="font-serif text-2xl text-amberwood-100 font-light italic">
                Evolving the Collaborative Partner
              </h3>
              <p className="text-amberwood-200 text-sm md:text-base leading-relaxed font-light mb-4">
                Today at the AI Academy, my perspective on technology shifted. I explored how artificial intelligence isn't just a basic tool, but a collaborative partner that can amplify human creativity.
              </p>
              <div className="border-t border-amberwood-900/30 pt-4 mt-2">
                <strong className="font-medium text-ochre text-xs uppercase tracking-wider block mb-1">
                  Key Takeaway:
                </strong>
                <p className="text-amberwood-300 text-sm font-light leading-relaxed">
                  The AI Academy was a transformative journey. I discovered that AI isn't a threat to human creativity, but rather a powerful amplifier. Learning prompt engineering taught me the art of communication with machines. I realized that my unique value lies in combining my human intuition and design sensibility with the computational power of AI tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 pb-12 scroll-mt-28">
          <div className="text-center space-y-4 mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-ochre font-semibold block">
              Let's Connect
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#f3e8da] font-light">Contact Coordinates</h2>
            <div className="w-16 h-[1px] bg-amberwood-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto text-left">
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-serif text-2xl text-amberwood-100 font-light italic">Direct Channels</h3>
              <p className="text-amberwood-300 text-sm leading-relaxed font-light">
                You can reach me through my main contact channels listed below. Feel free to send me a message anytime if you have questions, ideas, or collaboration opportunities.
              </p>
              <div className="space-y-4 pt-2">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center space-x-3.5 p-4 bg-amberwood-950/30 border border-amberwood-900/40 rounded-2xl hover:border-ochre transition-colors cursor-pointer"
                  {...hoverHandlers}
                >
                  <Mail className="w-5 h-5 text-ochre" />
                  <div>
                    <span className="text-[10px] text-amberwood-400 font-semibold uppercase tracking-wider block">
                      Email Address
                    </span>
                    <span className="text-sm text-amberwood-100 font-light">{contactInfo.email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center space-x-3.5 p-4 bg-amberwood-950/30 border border-amberwood-900/40 rounded-2xl hover:border-ochre transition-colors cursor-pointer"
                  {...hoverHandlers}
                >
                  <Phone className="w-5 h-5 text-ochre" />
                  <div>
                    <span className="text-[10px] text-amberwood-400 font-semibold uppercase tracking-wider block">
                      Phone Number
                    </span>
                    <span className="text-sm text-amberwood-100 font-light">{contactInfo.phone}</span>
                  </div>
                </a>

                <div className="flex items-center space-x-3.5 p-4 bg-amberwood-950/30 border border-amberwood-900/40 rounded-2xl">
                  <MapPin className="w-5 h-5 text-ochre" />
                  <div>
                    <span className="text-[10px] text-amberwood-400 font-semibold uppercase tracking-wider block">
                      Primary Location
                    </span>
                    <span className="text-sm text-amberwood-100 font-light">{contactInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-[#1b0d09]/40 border border-amberwood-900/40 p-8 rounded-3xl relative">
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-ochre uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full bg-[#180b07] border border-amberwood-900/40 rounded-xl p-3 text-xs text-amberwood-100 focus:outline-none focus:border-ochre transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-ochre uppercase tracking-wider">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full bg-[#180b07] border border-amberwood-900/40 rounded-xl p-3 text-xs text-amberwood-100 focus:outline-none focus:border-ochre transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-ochre uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Inquiry / Mentorship"
                    className="w-full bg-[#180b07] border border-amberwood-900/40 rounded-xl p-3 text-xs text-amberwood-100 focus:outline-none focus:border-ochre transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-ochre uppercase tracking-wider">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hello, I wanted to reach out regarding..."
                    className="w-full bg-[#180b07] border border-amberwood-900/40 rounded-xl p-3 text-xs text-amberwood-100 focus:outline-none focus:border-ochre transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  {...hoverHandlers}
                  className="w-full py-3 bg-amberwood-800 text-parchment text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#834626] transition-colors shadow-md"
                >
                  Send Transmission
                </button>
              </form>

              {/* Dynamic Form Submission Banner */}
              <AnimatePresence>
                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-0 bg-[#1b0d09]/95 flex flex-col items-center justify-center text-center p-8 rounded-3xl"
                  >
                    <Award className="w-12 h-12 text-ochre mb-3" />
                    <h4 className="font-serif text-xl text-amberwood-100 font-light">Transmission Received</h4>
                    <p className="text-xs text-amberwood-300 max-w-sm mt-2 leading-relaxed">
                      Thank you for reaching out! I will review your message and respond as soon as possible.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-amberwood-900/30 bg-[#1b0d09]/60 py-10 text-center text-xs text-amberwood-400 no-print">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <p className="font-serif text-lg text-amberwood-200 italic font-light">Maison</p>
          <p className="font-sans font-light tracking-wide">
            © {new Date().getFullYear()} Jane Marie Baluna. Curated with technical discipline and creative pride.
          </p>
          <p className="text-[10px] text-amberwood-500 uppercase tracking-widest font-mono">
            SISTERS OF MARY SCHOOL • GRADE 12 COMPUTER PROGRAMMING & MECHATRONICS
          </p>
        </div>
      </footer>

      {/* Project details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
