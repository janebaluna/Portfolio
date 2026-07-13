import React, { useState, useEffect } from "react";
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
  Download,
  Copy,
  Check,
  Eye,
  X,
  Upload
} from "lucide-react";
// @ts-ignore
import html2pdf from "html2pdf.js";
import janePortrait from "../assets/images/jane_custom_photo.png";
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
  const [copiedLink, setCopiedLink] = useState(false);
  const [isOpenA4Modal, setIsOpenA4Modal] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("file:///C:/Users/pco405/Downloads/Baluna,Jane%20Marie%20T..pdf.pdf.pdf");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    const element = document.getElementById("printable-resume-sheet");
    if (!element) {
      setIsDownloading(false);
      return;
    }
    const opt = {
      margin: 0,
      filename: "Baluna,Jane Marie T..pdf",
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2.5, useCORS: true, letterRendering: true },
      jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const }
    };
    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        setIsDownloading(false);
      })
      .catch((err: any) => {
        console.error("PDF generation error:", err);
        setIsDownloading(false);
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

  const renderA4ResumeContent = () => {
    return (
      <div className="grid grid-cols-12 h-full items-stretch select-text text-left bg-white" style={{ minHeight: "1123px" }}>
        {/* Left Column (33.33% width) - Dark Navy blue color from the user's PDF */}
        <div className="col-span-4 bg-[#0F172A] text-[#F8FAFC] p-5 flex flex-col justify-start select-text space-y-5">
          {/* Portrait circular photo */}
          <div className="flex justify-center mt-3">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/90 p-0.5 shadow-lg bg-[#0F172A] transition-transform duration-300 hover:scale-105 cursor-pointer">
              <img
                src={janePortrait}
                alt={contactInfo.name}
                className="w-full h-full object-cover object-center rounded-full transition-transform duration-500 hover:brightness-110"
                style={{
                  transform: "scale(1.35)",
                  objectPosition: "center 38%",
                }}
              />
            </div>
          </div>

          {/* Name and title */}
          <div className="text-center">
            <h1 className="text-lg font-bold tracking-wider uppercase text-white font-sans text-center leading-snug">
              JANE MARIE
            </h1>
            <h1 className="text-lg font-bold tracking-wider uppercase text-white font-sans text-center leading-snug">
              BALUNA
            </h1>
            <h2 className="text-[9px] tracking-widest font-semibold text-slate-300 font-sans mt-1.5 text-center uppercase">
              GRADE 12 STUDENTS
            </h2>
          </div>

          {/* CONTACT section */}
          <div>
            <div className="border-b border-white/30 pb-1 mb-2">
              <h3 className="text-[10px] font-bold tracking-widest uppercase text-white">
                CONTACT
              </h3>
            </div>
            <div className="space-y-2 text-[10px] text-slate-200">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-white/10 text-white shrink-0 flex items-center justify-center rounded-full">
                  <MapPin className="w-3 h-3" />
                </div>
                <span className="pt-0.5 leading-tight">{contactInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-white/10 text-white shrink-0 flex items-center justify-center rounded-full">
                  <Phone className="w-3 h-3" />
                </div>
                <span className="leading-tight">{contactInfo.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-white/10 text-white shrink-0 flex items-center justify-center rounded-full">
                  <Mail className="w-3 h-3" />
                </div>
                <span className="break-all leading-tight pt-0.5">{contactInfo.email}</span>
              </div>
            </div>
          </div>

          {/* SKILLS Section (Soft Skills & Technical Skills) */}
          <div className="space-y-3.5">
            <div className="border-b border-white/30 pb-1">
              <h3 className="text-[10px] font-bold tracking-widest uppercase text-white">
                SKILLS
              </h3>
            </div>

            {/* Soft Skills */}
            <div>
              <h4 className="text-[8px] font-bold text-slate-300 tracking-wider uppercase mb-1">
                SOFT SKILLS
              </h4>
              <ul className="space-y-1 text-[10px] text-slate-200 text-left">
                {pdfSoftSkills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-white select-none text-[6px] mt-0.5">•</span>
                    <span className="leading-tight">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Skills */}
            <div>
              <h4 className="text-[8px] font-bold text-slate-300 tracking-wider uppercase mb-1">
                TECHNICAL SKILLS
              </h4>
              <ul className="space-y-1 text-[10px] text-slate-200 text-left">
                {pdfTechnicalSkills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-white select-none text-[6px] mt-0.5">•</span>
                    <span className="leading-tight">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* LANGUAGES Section */}
          <div>
            <div className="border-b border-white/30 pb-1 mb-1.5">
              <h3 className="text-[10px] font-bold tracking-widest uppercase text-white">
                LANGUAGE
              </h3>
            </div>
            <div className="space-y-1 text-[10px] text-slate-200 text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-white select-none text-[5px]">•</span>
                <span>Filipino</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-white select-none text-[5px]">•</span>
                <span>English</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (66.67% width) - White background with exact content timeline */}
        <div className="col-span-8 bg-white text-[#1E293B] p-6 flex flex-col justify-start select-text space-y-4">
          {/* ABOUT ME section */}
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <h2 className="text-xs font-bold tracking-widest uppercase text-[#0F172A] shrink-0">
                ABOUT ME
              </h2>
              <div className="flex-grow border-b-2 border-[#0F172A] mt-1" />
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#334155] leading-relaxed font-normal text-left">
              {contactInfo.aboutMe}
            </p>
          </div>

          {/* EXPERIENCE section (Vocational and Certifications) - IN THE MIDDLE */}
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <h2 className="text-xs font-bold tracking-widest uppercase text-[#0F172A] shrink-0">
                EXPERIENCE
              </h2>
              <div className="flex-grow border-b border-dashed border-gray-400 mt-1" />
            </div>

            {/* Vertical dashed timeline */}
            <div className="relative pl-5 border-l border-dashed border-gray-300 space-y-2.5">
              {experienceCertifications.map((exp, idx) => (
                <div key={idx} className="relative">
                  {/* Circle bullet representation with dark center */}
                  <div className="absolute -left-[27.5px] top-0.5 w-3.5 h-3.5 rounded-full bg-white border border-[#0F172A] flex items-center justify-center z-10 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0F172A]" />
                  </div>

                  <h4 className="text-[11px] font-bold text-[#0F172A] text-left leading-tight">
                    {exp.title}
                  </h4>
                  <ul className="list-none pl-0 mt-0.5 text-[10px] sm:text-[10.5px] text-[#334155] text-left leading-relaxed">
                    <li className="flex items-start gap-1">
                      <span className="text-[#334155] mt-0.5 text-[5px]">•</span>
                      <span>{exp.details}</span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION section - AT THE BOTTOM */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xs font-bold tracking-widest uppercase text-[#0F172A] shrink-0">
                EDUCATION
              </h2>
              <div className="flex-grow border-b-2 border-[#0F172A] mt-1" />
            </div>

            {/* Timeline line */}
            <div className="relative pl-5 border-l-2 border-[#0F172A] space-y-3">
              {/* Bua ElementarySchool */}
              <div className="relative">
                {/* Square dark bullet */}
                <div className="absolute -left-[24px] top-1 w-2 h-2 bg-[#0F172A]" />
                <h4 className="text-[11px] font-bold text-[#0F172A] text-left">
                  Bua ElementarySchool
                </h4>
                <p className="text-[10px] text-[#475569] mt-0.5 font-semibold text-left">With Honors</p>
                <p className="text-[9.5px] text-[#64748B] font-mono mt-0.5 text-left">2012 - 2019</p>
              </div>

              {/* Sisters of Mary of Banneus Inc. */}
              <div className="relative">
                {/* Square dark bullet */}
                <div className="absolute -left-[24px] top-1 w-2 h-2 bg-[#0F172A]" />
                <h4 className="text-[11px] font-bold text-[#0F172A] text-left">
                  Sisters of Mary of Banneus Inc.
                </h4>
                <p className="text-[10px] text-[#475569] mt-0.5 font-semibold text-left">With Honors</p>
                <p className="text-[9.5px] text-[#64748B] font-mono mt-0.5 text-left">2021 - 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
          <div className="flex items-center gap-2">
            {/* View A4 PDF Button */}
            <a
              href="https://drive.google.com/file/d/1bZ-_QYgWYFu4CIEzoO3a_f84pgh4cw9V/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-ochre text-stone-950 text-xs uppercase tracking-widest font-bold rounded-full hover:bg-parchment transition-all duration-300 shadow-md hover:scale-105 shrink-0"
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              View PDF Resume
            </a>

            {/* Download PDF Button */}
            <a
              href="https://drive.google.com/uc?export=download&id=1bZ-_QYgWYFu4CIEzoO3a_f84pgh4cw9V"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#834626] text-parchment text-xs uppercase tracking-widest font-bold rounded-full hover:bg-ochre hover:text-stone-950 transition-all duration-300 shadow-md border border-ochre/30 hover:scale-105 shrink-0"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              Download PDF
            </a>

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
      {showPrintTip && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amberwood-950/40 border border-ochre/30 rounded-xl p-5 mb-6 flex flex-col md:flex-row items-start gap-4 text-left no-print"
        >
          <div className="flex items-start gap-3 flex-grow w-full">
            <Info className="w-5 h-5 text-ochre shrink-0 mt-0.5" />
            <div className="flex-1 space-y-3 w-full">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-parchment flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-ochre animate-pulse" />
                  Your Google Drive Resume is Connected!
                </h4>
                <p className="text-xs text-amberwood-300 mt-1 leading-relaxed">
                  We have connected your Google Drive resume link directly to this portfolio. When you click <strong>"View PDF Resume"</strong> or <strong>"Download PDF"</strong>, you can access your original file on Google Drive (<strong>https://drive.google.com/file/d/1bZ-_QYgWYFu4CIEzoO3a_f84pgh4cw9V/view?usp=sharing</strong>) to view, print, download, or manage it.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="https://drive.google.com/file/d/1bZ-_QYgWYFu4CIEzoO3a_f84pgh4cw9V/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-ochre hover:bg-parchment text-stone-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors font-sans"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Open in Drive
                </a>
                <a
                  href="https://drive.google.com/uc?export=download&id=1bZ-_QYgWYFu4CIEzoO3a_f84pgh4cw9V"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#834626] hover:bg-ochre hover:text-stone-950 text-parchment text-xs font-bold uppercase tracking-wider rounded-lg transition-colors font-sans border border-ochre/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  Direct Download
                </a>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowPrintTip(false)}
            className="text-amberwood-400 hover:text-parchment text-xs font-mono px-1.5 py-0.5 border border-amberwood-900/30 rounded self-start md:self-auto"
          >
            ✕
          </button>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
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
                      src={janePortrait}
                      alt={contactInfo.name}
                      className="w-full h-full object-cover object-center rounded-full"
                      style={{
                        transform: "scale(1.35)",
                        objectPosition: "center 38%",
                      }}
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
        </AnimatePresence>

        {/* Hidden offscreen printable container for PDF generation & printing */}
        <div className="absolute -left-[9999px] -top-[9999px] opacity-0 pointer-events-none select-none overflow-hidden print:static print:opacity-100 print:pointer-events-auto print:block flex justify-center">
          <div
            className="bg-white text-[#1E293B] shadow-2xl border border-gray-300 text-left overflow-hidden select-text shrink-0 rounded-lg"
            style={{ width: "794px", height: "1123px", boxSizing: "border-box" }}
            id="printable-resume-sheet"
          >
            {renderA4ResumeContent()}
          </div>
        </div>

        {/* Aesthetic A4 PDF Viewer Modal */}
        <AnimatePresence>
          {isOpenA4Modal && (
            <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto no-print">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-stone-900 border border-amberwood-900/30 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[96vh] sm:max-h-[92vh] flex flex-col overflow-hidden"
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-amberwood-900/20 bg-stone-950/50">
                  <div>
                    <h3 className="font-serif text-sm sm:text-base text-parchment tracking-wide flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-ochre animate-pulse" />
                      Jane Marie's Original A4 Resume
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-amberwood-400 font-mono">
                      High-fidelity layout of your real resume
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpenA4Modal(false)}
                    className="p-1.5 text-stone-400 hover:text-parchment hover:bg-white/5 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body with Zoomable/Scrollable Paper */}
                <div className="flex-1 overflow-auto bg-stone-950/40 p-3 sm:p-6 flex justify-center items-start min-h-[50vh] max-h-[72vh]">
                  <div className="scale-[0.52] xs:scale-[0.62] sm:scale-[0.78] md:scale-[0.95] lg:scale-100 origin-top transform-gpu shadow-2xl rounded-lg overflow-hidden border border-stone-800 shrink-0">
                    <div
                      id="printable-resume-sheet"
                      className="bg-white text-[#1E293B] text-left select-text overflow-hidden shrink-0"
                      style={{ width: "794px", height: "1123px", boxSizing: "border-box" }}
                    >
                      {renderA4ResumeContent()}
                    </div>
                  </div>
                </div>

                {/* Modal Footer with Actions */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-amberwood-900/20 bg-stone-950/50 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-amberwood-400">
                    <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ochre" />
                    <span>Connected directly to your Google Drive • High fidelity & downloadable</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => {
                        handleDownloadPDF();
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#834626] text-parchment text-[11px] uppercase tracking-widest font-bold rounded-full hover:bg-ochre hover:text-stone-950 transition-all"
                    >
                      <Download className="w-3 h-3" />
                      Download PDF
                    </button>
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-stone-800 text-amberwood-200 text-[11px] uppercase tracking-widest font-bold rounded-full hover:bg-stone-700 hover:text-parchment transition-all"
                    >
                      <Printer className="w-3 h-3" />
                      Print
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
    </div>
  );
}
