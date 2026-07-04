import { Project } from "../types";
import { motion } from "motion/react";
import InteractiveCalculator from "./InteractiveCalculator";
import BrickBreaker from "./BrickBreaker";
import LoveResponder from "./LoveResponder";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div className="fixed inset-0 bg-[#1b0d09]/95 z-[2000] backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="max-w-4xl w-full bg-[#1b0d09] border border-amberwood-900/30 rounded-3xl p-6 md:p-10 relative overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
      >
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-ochre/5 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-ochre hover:text-parchment transition-colors p-2 rounded-full hover:bg-amberwood-950/40"
          aria-label="Close Modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="12" />
          </svg>
        </button>

        <div className="space-y-6 md:space-y-8">
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-2xl">{project.icon}</span>
            <span className="text-ochre uppercase tracking-widest font-semibold font-sans">
              {project.category}
            </span>
            <span className="text-amberwood-600">/</span>
            <span className="text-amberwood-400 uppercase tracking-widest font-sans">
              Project {project.num.toString().padStart(2, "0")}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-3xl md:text-5xl text-amberwood-100 font-light italic leading-tight">
            {project.title}
          </h2>

          {/* Project Image banner */}
          <div className="w-full h-64 md:h-96 overflow-hidden rounded-2xl border border-amberwood-900/40 relative">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Description */}
          <p className="text-amberwood-200 text-sm md:text-base leading-relaxed font-light">
            {project.desc}
          </p>

          {/* Embedded Calculator (if applicable) */}
          {project.hasInteractiveCalculator && (
            <div className="bg-[#180b07]/60 border border-amberwood-900/40 p-6 rounded-3xl space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[10px] tracking-[0.3em] text-ochre font-semibold uppercase">
                  Interactive Preview
                </span>
                <h4 className="font-serif text-xl text-amberwood-100 font-light">
                  Try out the Calculator Live!
                </h4>
                <p className="text-xs text-amberwood-300 max-w-md mx-auto font-light leading-relaxed">
                  I embedded a real, functioning calculator matching the TVL Web Development assignment parameters so you can test calculations instantly.
                </p>
              </div>
              <InteractiveCalculator />
            </div>
          )}

          {/* Embedded Brick Breaker Game (if applicable) */}
          {project.hasInteractiveBrickBreaker && (
            <div className="bg-[#180b07]/60 border border-amberwood-900/40 p-6 rounded-3xl space-y-6">
              <div className="text-center space-y-2 mb-4">
                <span className="text-[10px] tracking-[0.3em] text-ochre font-semibold uppercase">
                  Interactive Playroom
                </span>
                <h4 className="font-serif text-xl text-amberwood-100 font-light">
                  Play Brick Breaker Live!
                </h4>
                <p className="text-xs text-amberwood-300 max-w-md mx-auto font-light leading-relaxed">
                  Test out this fully interactive 2D arcade game! Break all rows of bricks to advance through levels, catching falling power-ups as you go.
                </p>
              </div>
              <BrickBreaker />
            </div>
          )}

          {/* Embedded Love Responder Comfort Application (if applicable) */}
          {project.hasInteractiveLoveResponder && (
            <div className="bg-[#180b07]/60 border border-amberwood-900/40 p-6 rounded-3xl space-y-6">
              <div className="text-center space-y-2 mb-4">
                <span className="text-[10px] tracking-[0.3em] text-ochre font-semibold uppercase">
                  Interactive Companion
                </span>
                <h4 className="font-serif text-xl text-amberwood-100 font-light">
                  Interact with Love Responder Live!
                </h4>
                <p className="text-xs text-amberwood-300 max-w-md mx-auto font-light leading-relaxed">
                  Select your current emotional feeling state, generate dynamic personalized self-care affirmations, or release your worries safely into the digital cosmos.
                </p>
              </div>
              <LoveResponder />
            </div>
          )}

          {/* Details Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-amberwood-900/30">
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-ochre font-semibold font-sans">
                What I Accomplished
              </h4>
              <div className="space-y-3">
                {project.details.map((detail, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-ochre mt-2 flex-shrink-0" />
                    <p className="text-xs text-amberwood-200 font-light leading-relaxed">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-widest text-ochre font-semibold font-sans">
                  Tools & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, idx) => (
                    <span key={idx} className="tag">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#180b07] border border-amberwood-900/40 rounded-xl space-y-2">
                <h4 className="text-[10px] uppercase tracking-widest text-ochre font-semibold font-sans">
                  Outcome & Growth
                </h4>
                <p className="text-xs text-amberwood-300 font-light leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            </div>
          </div>

          {/* Code snippet */}
          {project.codeSnippet && (
            <div className="space-y-3 pt-4 border-t border-amberwood-900/30">
              <h4 className="text-[10px] uppercase tracking-widest text-ochre font-semibold font-sans">
                Source Code Highlight
              </h4>
              <div className="relative">
                <pre className="code-block font-mono overflow-x-auto text-[11px] p-5">
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
