import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  Layers,
  Award,
  Globe,
  FileText,
  Sparkles,
  BookOpen,
  Code,
  CheckCircle2,
  Cpu,
  Zap,
  DraftingCompass,
  Database,
  ArrowRight,
  Printer,
  Info,
  Download
} from "lucide-react";
// @ts-ignore
import html2pdf from "html2pdf.js";
import {
  contactInfo,
  education,
  technicalCompetencies,
  softCompetencies,
  experienceCertifications
} from "../data";

// Exact lists from user's PDF to ensure 100% replication accuracy
const pdfSoftSkills = [
  "Time Management",
  "Adaptability and Flexibility",
  "Active Listening",
  "Communication Skills",
  "Teamwork and Collaboration",
  "Organizational Skills",
  "Leadership"
];

const pdfTechnicalSkills = [
  "SQL Database Management",
  "Website Design and Development",
  "Pneumatics Board Setup",
  "Electrical & Electronics",
  "Mechatronics & Automation",
  "Problem Solving & Analytical Thinking"
];

const pdfLanguages = ["Filipino", "English"];

export default function InteractiveResume() {
  const [activeTab, setActiveTab] = useState<"interactive" | "printable">("interactive");
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);
  const [showPrintTip, setShowPrintTip] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("printable-resume-sheet");
    if (!element) return;

    setIsDownloading(true);

    const originalGetComputedStyle = window.getComputedStyle;

    const sanitizeColor = (val: string): string => {
      return val.replace(/(oklch|oklab|lch|lab)\(([^)]+)\)/gi, (match, type, p1) => {
        const parts = p1.trim().split(/[\s,]+/);
        if (parts.length > 0) {
          const lightnessStr = parts[0];
          let l = 0.5;
          if (lightnessStr.endsWith('%')) {
            l = parseFloat(lightnessStr) / 100;
          } else {
            const num = parseFloat(lightnessStr);
            const isOkl = type.toLowerCase().startsWith('ok');
            if (isOkl) {
              l = num; // oklch/oklab lightness is 0..1
            } else {
              l = num / 100; // lab/lch lightness is 0..100
            }
          }
          
          l = Math.max(0, Math.min(1, l));
          const rgbVal = Math.round(l * 255);
          return `rgb(${rgbVal}, ${rgbVal}, ${rgbVal})`;
        }
        return 'rgb(150, 150, 150)';
      });
    };

    // Override window.getComputedStyle to intercept oklch/oklab/lch/lab colors on the fly
    window.getComputedStyle = function(el, pseudoElt) {
      const style = originalGetComputedStyle.call(this, el, pseudoElt);
      return new Proxy(style, {
        get(target, prop) {
          if (prop === 'getPropertyValue') {
            return function(propertyName: string) {
              const value = target.getPropertyValue(propertyName);
              if (typeof value === 'string' && (value.includes('oklch') || value.includes('oklab') || value.includes('lab') || value.includes('lch'))) {
                return sanitizeColor(value);
              }
              return value;
            };
          }
          const value = target[prop as keyof CSSStyleDeclaration];
          if (typeof value === 'string' && (value.includes('oklch') || value.includes('oklab') || value.includes('lab') || value.includes('lch'))) {
            return sanitizeColor(value);
          }
          if (typeof value === 'function') {
            return (value as Function).bind(target);
          }
          return value;
        }
      });
    };

    const opt = {
      margin: 0,
      filename: "Jane_Marie_Baluna_Resume.pdf",
      image: { type: "jpeg" as const, quality: 1.0 },
      html2canvas: {
        scale: 2.5,
        useCORS: true,
        letterRendering: true,
        logging: false,
        backgroundColor: "#FFFFFF",
        onclone: (clonedDoc: Document) => {
          try {
            // Gather all CSS rules from cloned sheets
            let combinedCss = "";
            const sheets = Array.from(clonedDoc.styleSheets);
            for (const sheet of sheets) {
              try {
                const rules = sheet.cssRules || sheet.rules;
                if (rules) {
                  for (let i = 0; i < rules.length; i++) {
                    combinedCss += rules[i].cssText + "\n";
                  }
                }
              } catch (e) {
                // Ignore cross-origin sheets errors
              }
            }

            // Also search all inline style tags
            const styleTags = clonedDoc.querySelectorAll("style");
            styleTags.forEach((tag) => {
              combinedCss += tag.innerHTML + "\n";
            });

            // Replace all oklch, oklab, lch, lab occurrences with safe fallsbacks
            const sanitizedCss = sanitizeColor(combinedCss);

            // Disable/remove all existing style elements in the cloned document
            const styleElements = clonedDoc.querySelectorAll("style, link[rel='stylesheet']");
            styleElements.forEach((el) => {
              if (el.parentNode) {
                el.parentNode.removeChild(el);
              }
            });

            // Create a single sanitized style element in clonedDoc
            const tempStyle = clonedDoc.createElement("style");
            tempStyle.innerHTML = sanitizedCss;
            clonedDoc.head.appendChild(tempStyle);

            // Also replace in any inline style attributes on elements
            const allElements = clonedDoc.querySelectorAll("*");
            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              if (htmlEl.style) {
                const styleAttr = htmlEl.getAttribute("style");
                if (styleAttr && (styleAttr.includes("oklch") || styleAttr.includes("oklab") || styleAttr.includes("lab") || styleAttr.includes("lch"))) {
                  htmlEl.setAttribute("style", sanitizeColor(styleAttr));
                }
              }
            });

            console.log("clonedDoc stylesheets sanitized successfully");
          } catch (err) {
            console.error("Failed to sanitize oklch/oklab in cloned document", err);
          }
        }
      },
      jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const }
    };

    let failsafeTimeout: any;

    const cleanup = () => {
      if (failsafeTimeout) {
        clearTimeout(failsafeTimeout);
      }
      window.getComputedStyle = originalGetComputedStyle;
      setIsDownloading(false);
    };

    failsafeTimeout = setTimeout(() => {
      console.warn("PDF generation timed out, running cleanup failsafe");
      cleanup();
    }, 15000);

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        cleanup();
      })
      .catch((err: any) => {
        console.error("PDF generation failed:", err);
        cleanup();
      });
  };

  // Helper to map experience titles to specific icons for the interactive timeline
  const getExperienceIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("programming") || t.includes("computer")) return <Code className="w-4 h-4 text-ochre" />;
    if (t.includes("mechatronics")) return <Cpu className="w-4 h-4 text-ochre" />;
    if (t.includes("epa") || t.includes("electric")) return <Zap className="w-4 h-4 text-ochre" />;
    if (t.includes("autocad") || t.includes("drafting")) return <DraftingCompass className="w-4 h-4 text-ochre" />;
    return <Briefcase className="w-4 h-4 text-ochre" />;
  };

  // Helper to map experience titles to specific icons for the clean print view
  const getExperienceIconPrint = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("programming") || t.includes("computer")) return <Code className="w-2.5 h-2.5 text-[#0F172A]" />;
    if (t.includes("mechatronics")) return <Cpu className="w-2.5 h-2.5 text-[#0F172A]" />;
    if (t.includes("epa") || t.includes("electric")) return <Zap className="w-2.5 h-2.5 text-[#0F172A]" />;
    if (t.includes("autocad") || t.includes("drafting")) return <DraftingCompass className="w-2.5 h-2.5 text-[#0F172A]" />;
    return <Briefcase className="w-2.5 h-2.5 text-[#0F172A]" />;
  };

  // Helper to map experience titles to tech tag pills
  const getTechTags = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("programming")) return ["C#", ".NET", "SQL", "HTML5", "CSS3", "JavaScript", "Responsive UI"];
    if (t.includes("mechatronics")) return ["PLC Ladder Logic", "Pneumatics", "Electro-Pneumatic", "Automation", "Robotics"];
    if (t.includes("epa")) return ["Parallel Circuits", "One-Way Lighting", "Electrical Wiring", "Industrial Safety"];
    if (t.includes("autocad")) return ["AutoCAD 3D", "House Drafting", "Car Modeling", "Technical Drawing"];
    return [];
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Dynamic Header with Switcher and Print Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-amberwood-900/30 pb-6 no-print gap-4">
        <div className="text-center md:text-left">
          <h2 className="font-serif text-2xl sm:text-3xl text-parchment font-light tracking-wide flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-5 h-5 text-ochre animate-pulse" />
            Curriculum Vitae
          </h2>
          <p className="text-xs text-amberwood-400 mt-1 font-mono">
            Explore the responsive visual showcase or download the official A4 resume.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3">
          {/* View Toggles */}
          <div className="flex space-x-1.5 bg-amberwood-950/60 p-1 rounded-full border border-amberwood-900/30">
            <button
              onClick={() => setActiveTab("interactive")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                activeTab === "interactive"
                  ? "bg-ochre text-stone-950 shadow-md scale-105"
                  : "text-amberwood-300 hover:text-parchment hover:bg-amberwood-900/20"
              }`}
            >
              Interactive Showcase
            </button>
            <button
              onClick={() => setActiveTab("printable")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                activeTab === "printable"
                  ? "bg-ochre text-stone-950 shadow-md scale-105"
                  : "text-amberwood-300 hover:text-parchment hover:bg-amberwood-900/20"
              }`}
            >
              Clean / PDF View
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Action Download Button */}
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#834626] text-parchment text-xs uppercase tracking-widest font-bold rounded-full hover:bg-ochre hover:text-stone-950 transition-all duration-300 shadow-md border border-ochre/30 hover:scale-105 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5 shrink-0 animate-bounce" />
              {isDownloading ? "Downloading..." : "Download PDF"}
            </button>

            {/* Action Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 bg-amberwood-950/40 text-amberwood-200 text-xs uppercase tracking-widest font-bold rounded-full hover:bg-amberwood-900/30 hover:text-parchment transition-all duration-300 border border-amberwood-900/30 shrink-0"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5 shrink-0" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Printing Helper Banner */}
      {activeTab === "printable" && showPrintTip && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amberwood-950/40 border border-ochre/30 rounded-xl p-4 mb-6 flex items-start gap-3 text-left no-print"
        >
          <Info className="w-5 h-5 text-ochre shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-parchment">
              Optimized Resume Downloads
            </h4>
            <p className="text-xs text-amberwood-300 mt-1 leading-relaxed">
              We've added a premium <strong>"Download PDF"</strong> feature that exports the resume to your device. Alternatively, click <strong>"Print"</strong> to use the browser print utility. For browser printing, ensure <strong>"Background graphics"</strong> is checked to preserve column backgrounds.
            </p>
          </div>
          <button
            onClick={() => setShowPrintTip(false)}
            className="text-amberwood-400 hover:text-parchment text-xs font-mono px-1.5 py-0.5 border border-amberwood-900/30 rounded"
          >
            ✕
          </button>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {activeTab === "interactive" ? (
          <motion.div
            key="interactive"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* LEFT COLUMN - Profile, Contacts, Skills */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile card with radial light glow */}
              <div className="bg-[#1b0d09] border border-amberwood-900/40 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-ochre/10 rounded-full blur-3xl pointer-events-none group-hover:bg-ochre/15 transition-colors duration-500" />
                
                {/* Circular image with gold frame */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-ochre p-1 shadow-lg shadow-ochre/10 mb-4 hover:scale-105 transition-transform duration-300">
                    <img
                      src="https://res.cloudinary.com/dkzomhqe0/image/upload/v1782302221/ChatGPT_Image_Feb_14_2026_02_39_40_PM_pdy1po.png"
                      alt={contactInfo.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-parchment font-light tracking-wide leading-tight">
                    {contactInfo.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-widest text-ochre font-semibold mt-1">
                    {contactInfo.title}
                  </span>
                </div>

                {/* Contact items with micro-interactions */}
                <div className="space-y-3 text-xs font-light text-amberwood-200 border-t border-amberwood-900/30 pt-5 mt-5">
                  <div className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-amberwood-950/40 transition-colors">
                    <Mail className="w-4 h-4 text-ochre shrink-0" />
                    <span className="truncate" title={contactInfo.email}>{contactInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-amberwood-950/40 transition-colors">
                    <Phone className="w-4 h-4 text-ochre shrink-0" />
                    <span>{contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-amberwood-950/40 transition-colors">
                    <MapPin className="w-4 h-4 text-ochre shrink-0" />
                    <span>{contactInfo.location}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-amberwood-950/40 transition-colors">
                    <GraduationCap className="w-4 h-4 text-ochre shrink-0" />
                    <span className="truncate" title={contactInfo.school}>{contactInfo.school}</span>
                  </div>

                </div>
              </div>

              {/* Skills Card with Accordion or list */}
              <div className="bg-[#1b0d09]/60 border border-amberwood-900/30 rounded-2xl p-6 space-y-6">
                <div>
                  <h4 className="font-serif text-lg text-amberwood-200 font-light italic border-b border-amberwood-900/20 pb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-ochre" />
                    Core Skills
                  </h4>
                  
                  {/* Interactive skill pills */}
                  <div className="mt-4 space-y-5">
                    <div>
                      <h5 className="text-[10px] uppercase tracking-widest text-ochre font-bold mb-2.5">
                        Technical Specializations
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {pdfTechnicalSkills.map((tech, i) => (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            key={i}
                            className="text-xs px-3 py-1.5 bg-amberwood-950/50 border border-amberwood-900/30 rounded-lg text-amberwood-200 font-light hover:border-ochre/40 transition-colors cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-[10px] uppercase tracking-widest text-ochre font-bold mb-2.5">
                        Soft Competencies
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {pdfSoftSkills.map((soft, i) => (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (i + 5) * 0.05 }}
                            key={i}
                            className="text-xs px-3 py-1.5 bg-[#251510]/50 border border-amberwood-900/20 rounded-lg text-amberwood-300 font-light hover:border-ochre/30 transition-colors cursor-default"
                          >
                            {soft}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-[10px] uppercase tracking-widest text-ochre font-bold mb-2.5">
                        Languages
                      </h5>
                      <div className="flex gap-2">
                        {pdfLanguages.map((lang, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1.5 bg-[#1b0d09] border border-amberwood-900/40 rounded-lg text-amberwood-200"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN - Experience, Education */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* About me brief card */}
              <div className="bg-[#1b0d09]/40 border border-amberwood-900/30 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-ochre/5 rounded-full blur-2xl pointer-events-none" />
                <h4 className="font-serif text-lg text-amberwood-200 font-light italic border-b border-amberwood-900/20 pb-2 mb-3">
                  Professional Summary
                </h4>
                <p className="text-sm font-light text-amberwood-200 leading-relaxed">
                  {contactInfo.aboutMe}
                </p>
              </div>

              {/* Experience timeline with high-fidelity hover interactions */}
              <div className="bg-amberwood-950/20 border border-amberwood-900/30 rounded-2xl p-6 space-y-6">
                <h4 className="font-serif text-xl text-amberwood-200 font-light italic border-b border-amberwood-900/30 pb-3 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-ochre" />
                  Vocational Training & Experience
                </h4>
                
                <div className="relative pl-6 border-l border-amberwood-900/30 space-y-6">
                  {experienceCertifications.map((exp, idx) => (
                    <motion.div
                      key={idx}
                      onMouseEnter={() => setHoveredExp(idx)}
                      onMouseLeave={() => setHoveredExp(null)}
                      className={`relative p-4 rounded-xl border transition-all duration-300 ${
                        hoveredExp === idx
                          ? "bg-amberwood-950/40 border-ochre/50 shadow-md"
                          : "bg-transparent border-transparent"
                      }`}
                    >
                      {/* Circle bullet representation with icon inside */}
                      <div className={`absolute -left-[35px] top-4 w-7 h-7 rounded-full bg-stone-900 border flex items-center justify-center shadow-md transition-colors ${
                        hoveredExp === idx ? "border-ochre bg-amberwood-950" : "border-amberwood-900"
                      }`}>
                        {getExperienceIcon(exp.title)}
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-[9px] uppercase tracking-widest text-ochre font-bold bg-[#1b0d09] px-2 py-0.5 rounded border border-amberwood-900/40 inline-block mb-1">
                          Vocational Competency
                        </span>
                        <h5 className="font-serif text-lg text-amberwood-100 font-semibold leading-snug">
                          {exp.title}
                        </h5>
                      </div>
                      <p className="text-xs font-light text-amberwood-200 leading-relaxed">
                        {exp.details}
                      </p>

                      {/* Display technology tags matching the competency */}
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-amberwood-900/10">
                        {getTechTags(exp.title).map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className={`text-[9px] px-2 py-0.5 rounded font-mono transition-colors ${
                              hoveredExp === idx
                                ? "bg-ochre/20 text-ochre border border-ochre/30"
                                : "bg-amberwood-950/60 text-amberwood-400 border border-amberwood-900/20"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education section */}
              <div className="bg-amberwood-950/20 border border-amberwood-900/30 rounded-2xl p-6 space-y-6">
                <h4 className="font-serif text-xl text-amberwood-200 font-light italic border-b border-amberwood-900/30 pb-3 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-ochre" />
                  Academic History
                </h4>
                
                <div className="relative pl-6 border-l border-amberwood-900/30 space-y-6">
                  {education.map((edu, idx) => (
                    <div key={idx} className="relative pl-2">
                      <div className="absolute -left-[32px] top-1.5 w-3.5 h-3.5 rounded-full bg-ochre border-2 border-stone-950 shadow" />
                      
                      <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                        <div>
                          <h5 className="font-serif text-base text-amberwood-100 font-semibold">{edu.school}</h5>
                          <p className="text-xs text-ochre tracking-wide uppercase font-medium mt-0.5">
                            {edu.major}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono font-medium px-2.5 py-1 bg-[#27150e] border border-amberwood-900/40 rounded text-ochre">
                          {edu.period}
                        </span>
                      </div>
                      
                      <ul className="space-y-1.5 text-xs font-light text-amberwood-200 leading-relaxed list-disc list-inside">
                        {edu.details && edu.details.map((detail, dIdx) => (
                          <li key={dIdx} className="hover:text-parchment transition-colors">{detail}</li>
                        ))}
                        {!edu.details && (
                          <li className="hover:text-parchment transition-colors">Graduated with an outstanding honors recognition and active participation in student councils.</li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </motion.div>
        ) : (
          <div className="w-full overflow-x-auto pb-6 flex justify-center">
            <motion.div
              key="printable"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-white text-[#1E293B] shadow-2xl border border-gray-300 text-left overflow-hidden select-text shrink-0 rounded-lg"
              style={{ width: "794px", height: "1123px", boxSizing: "border-box" }}
              id="printable-resume-sheet"
            >
              {/* Split layout mimicking the exact PDF uploaded by the user */}
              <div className="grid grid-cols-12 h-full items-stretch">
                
                {/* Left Column (33.33% width) - Dark Navy blue color from the user's PDF */}
                <div className="col-span-4 bg-[#0F172A] text-[#F8FAFC] p-8 flex flex-col justify-between select-text">
                  <div>
                    
                    {/* Portrait circular photo */}
                    <div className="flex justify-center mb-6">
                      <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-white/90 p-0.5 shadow-lg bg-slate-800">
                        <img
                          src="https://res.cloudinary.com/dkzomhqe0/image/upload/v1782302221/ChatGPT_Image_Feb_14_2026_02_39_40_PM_pdy1po.png"
                          alt={contactInfo.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>

                    {/* Name and title */}
                    <div className="text-center mb-8">
                      <h1 className="text-2xl font-bold tracking-wider uppercase text-white font-sans text-center leading-tight">
                        JANE MARIE
                      </h1>
                      <h1 className="text-2xl font-bold tracking-wider uppercase text-white font-sans text-center leading-tight">
                        BALUNA
                      </h1>
                      <p className="text-[10px] tracking-widest text-[#94A3B8] mt-2.5 font-semibold text-center uppercase">
                        GRADE 12 STUDENT
                      </p>
                    </div>

                    {/* CONTACT section */}
                    <div className="mb-8">
                      <div className="border-b border-white/20 pb-1.5 mb-3">
                        <h3 className="text-xs font-bold tracking-widest uppercase text-white">
                          CONTACT
                        </h3>
                      </div>
                      <div className="space-y-4 text-xs text-[#CBD5E1]">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 text-white shrink-0 mt-0.5 flex items-center justify-center bg-white/10 rounded-full p-0.5">
                            <MapPin className="w-3 h-3" />
                          </div>
                          <span className="pt-0.5 leading-relaxed">{contactInfo.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 text-white shrink-0 flex items-center justify-center bg-white/10 rounded-full p-0.5">
                            <Phone className="w-3 h-3" />
                          </div>
                          <span>{contactInfo.phone}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 text-white shrink-0 mt-0.5 flex items-center justify-center bg-white/10 rounded-full p-0.5">
                            <Mail className="w-3 h-3" />
                          </div>
                          <span className="break-all leading-relaxed">{contactInfo.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* SKILLS Section (Soft Skills & Technical Skills) */}
                    <div className="mb-8">
                      <div className="border-b border-white/20 pb-1.5 mb-3">
                        <h3 className="text-xs font-bold tracking-widest uppercase text-white">
                          SKILLS
                        </h3>
                      </div>
                      
                      {/* Soft Skills */}
                      <div className="mb-5">
                        <h4 className="text-[10px] font-bold text-[#E2E8F0] tracking-wider uppercase mb-2">
                          SOFT SKILLS
                        </h4>
                        <ul className="space-y-2 text-xs text-[#CBD5E1] list-disc list-inside text-left">
                          {pdfSoftSkills.map((skill, i) => (
                            <li key={i} className="pl-0.5">{skill}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Technical Skills */}
                      <div>
                        <h4 className="text-[10px] font-bold text-[#E2E8F0] tracking-wider uppercase mb-2">
                          TECHNICAL SKILLS
                        </h4>
                        <ul className="space-y-2 text-xs text-[#CBD5E1] list-disc list-inside text-left">
                          {pdfTechnicalSkills.map((skill, i) => (
                            <li key={i} className="pl-0.5">{skill}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* LANGUAGES Section */}
                    <div>
                      <div className="border-b border-white/20 pb-1.5 mb-3">
                        <h3 className="text-xs font-bold tracking-widest uppercase text-white">
                          LANGUAGE
                        </h3>
                      </div>
                      <ul className="space-y-2 text-xs text-[#CBD5E1] list-disc list-inside text-left">
                        {pdfLanguages.map((lang, idx) => (
                          <li key={idx} className="pl-0.5">{lang}</li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Academic Portfolio watermark */}
                  <div className="text-[9px] text-[#475569] text-center border-t border-white/5 pt-4 mt-8 no-print">
                    Academic & Technical Portfolio Archive
                  </div>
                </div>

                {/* Right Column (66.67% width) - White background with exact content timeline */}
                <div className="col-span-8 bg-white text-[#1E293B] p-10 flex flex-col justify-between select-text">
                  <div className="space-y-8">
                    
                    {/* ABOUT ME section */}
                    <div>
                      <div className="border-b-2 border-[#0F172A] pb-1.5 mb-3">
                        <h2 className="text-base font-bold tracking-widest uppercase text-[#0F172A] leading-none">
                          ABOUT ME
                        </h2>
                      </div>
                      <p className="text-xs text-[#334155] leading-relaxed font-normal text-left">
                        {contactInfo.aboutMe}
                      </p>
                    </div>

                    {/* EXPERIENCE section (Vocational and Certifications) - IN THE MIDDLE */}
                    <div>
                      <div className="border-b border-dashed border-gray-400 pb-1.5 mb-5">
                        <h2 className="text-base font-bold tracking-widest uppercase text-[#0F172A] leading-none">
                          EXPERIENCE
                        </h2>
                      </div>
                      
                      {/* Vertical dashed timeline */}
                      <div className="relative pl-8 border-l border-dashed border-gray-300 space-y-7 ml-3">
                        {experienceCertifications.map((exp, idx) => (
                          <div key={idx} className="relative">
                            {/* Circle bullet representation with custom icon */}
                            <div className="absolute -left-[43px] top-0.5 w-5 h-5 rounded-full bg-white border border-[#0F172A] flex items-center justify-center z-10 shadow-sm">
                              {getExperienceIconPrint(exp.title)}
                            </div>
                            
                            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide text-left">
                              {exp.title}
                            </h4>
                            <ul className="list-disc pl-4 mt-1.5 text-xs text-[#334155] text-left leading-relaxed">
                              <li>{exp.details}</li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* EDUCATION section - AT THE BOTTOM */}
                    <div>
                      <div className="border-b-2 border-[#0F172A] pb-1.5 mb-5">
                        <h2 className="text-base font-bold tracking-widest uppercase text-[#0F172A] leading-none">
                          EDUCATION
                        </h2>
                      </div>
                      
                      {/* Timeline line */}
                      <div className="relative pl-8 border-l-2 border-[#0F172A] space-y-6 ml-3">
                        
                        {/* Bua Elementary School */}
                        <div className="relative">
                          {/* Square dark bullet */}
                          <div className="absolute -left-[37px] top-1.5 w-2.5 h-2.5 bg-[#0F172A]" />
                          <h4 className="text-xs font-bold text-[#0F172A] text-left">
                            Bua Elementary School
                          </h4>
                          <p className="text-xs text-[#475569] mt-0.5 font-semibold text-left">With Honors</p>
                          <p className="text-[11px] text-[#64748B] font-mono mt-0.5 text-left">2012 - 2019</p>
                        </div>

                        {/* Sisters of Mary School of Banneux, Inc. */}
                        <div className="relative">
                          {/* Square dark bullet */}
                          <div className="absolute -left-[37px] top-1.5 w-2.5 h-2.5 bg-[#0F172A]" />
                          <h4 className="text-xs font-bold text-[#0F172A] text-left">
                            Sisters of Mary School of Banneux, Inc.
                          </h4>
                          <p className="text-xs text-[#475569] mt-0.5 font-semibold text-left">With Honors</p>
                          <p className="text-[11px] text-[#64748B] font-mono mt-0.5 text-left">2021 - 2026</p>
                        </div>

                      </div>
                    </div>

                  </div>

                  {/* Print footer */}
                  <div className="text-[9px] text-[#94A3B8] text-right mt-12 pt-4 border-t border-gray-100 no-print flex justify-between items-center">
                    <span>Jane Marie Baluna • Technical Portfolio</span>
                    <span>Generated on A4 paper format</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
