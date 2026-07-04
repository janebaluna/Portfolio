import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Users,
  User,
  AlertTriangle,
  CheckCircle2,
  Play,
  ArrowRight,
  Lock,
  ShieldCheck,
  Layers,
  Activity,
  FileSpreadsheet,
  Sparkles,
  BookOpen,
  Cpu,
  Search,
  Filter,
  RefreshCw,
  Copy,
  Check,
  ArrowUpRight,
  Info,
  Clock,
  BookMarked,
  Download,
  AlertCircle
} from "lucide-react";

// Mock database for the Live Prototype Simulator
interface MockStudent {
  id: string;
  name: string;
  studentNo: string;
  grades: {
    [subject: string]: "Completed" | "Pending" | "Excused";
  };
}

const initialStudents: MockStudent[] = [
  {
    id: "1",
    name: "Jane Marie Baluna",
    studentNo: "SMS-2026-0044",
    grades: {
      "Work Immersion": "Completed",
      "Research": "Completed",
      "Physics": "Pending",
      "Catechism": "Completed",
      "TVET - Computer Programming": "Completed"
    }
  },
  {
    id: "2",
    name: "Maria Santos",
    studentNo: "SMS-2026-0012",
    grades: {
      "Work Immersion": "Completed",
      "Research": "Pending",
      "Physics": "Completed",
      "Catechism": "Completed",
      "TVET - Computer Programming": "Completed"
    }
  },
  {
    id: "3",
    name: "Patricia Diaz",
    studentNo: "SMS-2026-0028",
    grades: {
      "Work Immersion": "Completed",
      "Research": "Completed",
      "Physics": "Pending",
      "Catechism": "Completed",
      "TVET - Computer Programming": "Pending"
    }
  },
  {
    id: "4",
    name: "Angela Reyes",
    studentNo: "SMS-2026-0005",
    grades: {
      "Work Immersion": "Completed",
      "Research": "Completed",
      "Physics": "Completed",
      "Catechism": "Completed",
      "TVET - Computer Programming": "Completed"
    }
  },
  {
    id: "5",
    name: "Sofia Castro",
    studentNo: "SMS-2026-0031",
    grades: {
      "Work Immersion": "Completed",
      "Research": "Completed",
      "Physics": "Completed",
      "Catechism": "Completed",
      "TVET - Computer Programming": "Completed"
    }
  },
  {
    id: "6",
    name: "Grace Villanueva",
    studentNo: "SMS-2026-0019",
    grades: {
      "Work Immersion": "Completed",
      "Research": "Completed",
      "Physics": "Completed",
      "Catechism": "Pending",
      "TVET - Computer Programming": "Completed"
    }
  }
];

export default function CapstoneBlog() {
  // Blog page states
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Interactive Emulator states
  const [emulatorTab, setEmulatorTab] = useState<"teacher" | "student">("teacher");
  const [pinInput, setPinInput] = useState("");
  const [pinVerified, setPinVerified] = useState(false);
  const [pinError, setPinError] = useState(false);
  
  // Teacher dashboard states
  const [selectedSubject, setSelectedSubject] = useState("Physics");
  const [selectedTVET, setSelectedTVET] = useState("Computer Programming");
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Completed">("All");
  const [students, setStudents] = useState<MockStudent[]>(initialStudents);
  
  // Student checker states
  const [studentQuery, setStudentQuery] = useState("");
  const [searchedStudentResult, setSearchedStudentResult] = useState<MockStudent | null>(null);
  const [studentSearched, setStudentSearched] = useState(false);
  
  // UI notifications
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Helper copy function
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // PIN validation
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "1957" || pinInput === "2026") {
      setPinVerified(true);
      setPinError(false);
      triggerNotification("PIN Verified. Welcome to Teacher Dashboard.");
    } else {
      setPinError(true);
      setPinVerified(false);
    }
  };

  const triggerNotification = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => setShowNotification(null), 3000);
  };

  // Toggle examination status
  const toggleStatus = (studentId: string, subjectName: string) => {
    setStudents(prev =>
      prev.map(st => {
        if (st.id === studentId) {
          const currentStatus = st.grades[subjectName];
          const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
          triggerNotification(`Updated ${st.name}'s status to ${newStatus}`);
          return {
            ...st,
            grades: {
              ...st.grades,
              [subjectName]: newStatus
            }
          };
        }
        return st;
      })
    );
  };

  // Handle student search
  const handleStudentSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = studentQuery.trim().toLowerCase();
    if (!query) return;

    const found = students.find(
      st => st.name.toLowerCase().includes(query) || st.studentNo.toLowerCase().includes(query)
    );
    setSearchedStudentResult(found || null);
    setStudentSearched(true);
  };

  // Reset Student search
  const resetStudentSearch = () => {
    setStudentQuery("");
    setSearchedStudentResult(null);
    setStudentSearched(false);
  };

  // Calculate stats based on current subject
  const currentSubjectKey = selectedSubject === "TVET" ? `TVET - ${selectedTVET}` : selectedSubject;
  const statsTotal = students.length;
  const statsCompleted = students.filter(st => st.grades[currentSubjectKey] === "Completed").length;
  const statsPending = students.filter(st => st.grades[currentSubjectKey] === "Pending").length;
  const statsExcused = students.filter(st => st.grades[currentSubjectKey] === "Excused").length;
  const completionPercent = Math.round((statsCompleted / statsTotal) * 100);

  // Generate Report function
  const handleGenerateReport = () => {
    triggerNotification(`Summary Report generated for ${currentSubjectKey}. Ready to download.`);
  };

  // AI-Assisted Messages
  const aiSummaryText = `Subject: ${currentSubjectKey}
Total Students: ${statsTotal}
Completed: ${statsCompleted}
Pending: ${statsPending}
AI Summary:
${statsPending > 0 
  ? `${statsPending} student${statsPending > 1 ? 's' : ''} still have pending examinations. It is highly recommended that the teacher follow up with these students immediately before the grade submission deadline.`
  : "All examinations are fully completed! Excellent tracking. No further teacher actions are required."
}`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Blog Article Wrap */}
      <article className="bg-[#1b0d09]/80 border border-amberwood-900/30 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ochre via-amberwood-600 to-ochre" />
        
        {/* Blog Header Banner */}
        <div className="p-6 sm:p-10 md:p-14 border-b border-amberwood-900/20 relative overflow-hidden text-center bg-gradient-to-b from-[#24130d] to-transparent">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,143,101,0.08),transparent_70%)] pointer-events-none" />
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ochre/15 border border-ochre/20 text-[10px] uppercase tracking-[0.2em] text-ochre font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Featured Capstone Project Showcase
          </span>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-parchment leading-tight font-light max-w-4xl mx-auto">
            EXAMTRACK: <span className="italic font-normal text-ochre text-glow block mt-1">An AI-Assisted Student Examination Monitoring and Alert System</span>
          </h1>
          
          <p className="text-amberwood-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest mt-4">
            For the Sisters of Mary School of Banneux Inc.
          </p>

          {/* Author metadata banner */}
          <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-6 mt-8 pt-6 border-t border-amberwood-900/10 text-xs text-amberwood-300">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-ochre" />
              <span>By <strong className="text-parchment font-medium">Jane Marie Baluna</strong> & Classmates</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-amberwood-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-ochre" />
              <span>Timeline: <strong className="text-parchment font-medium">Jan - Mar 2026</strong></span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-amberwood-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-ochre" />
              <span>Academic Year <strong className="text-parchment font-medium">2025-2026</strong></span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 md:p-12 space-y-12">
          
          {/* Section 1: Overview and Metadata Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-4 text-left">
              <h2 className="font-serif text-2xl text-amberwood-100 font-light italic flex items-center gap-2 border-b border-amberwood-900/20 pb-2">
                <BookOpen className="w-5 h-5 text-ochre" />
                Project Description
              </h2>
              <p className="text-sm md:text-base text-amberwood-200 leading-relaxed font-light">
                <strong>ExamTrack</strong> is an innovative, web-based examination management and monitoring system specifically engineered for the <strong>Sisters of Mary School of Banneux Inc.</strong> 
                By replacing outdated, manual administrative checkups with a centralized digital database and AI-assisted alert summaries, ExamTrack acts as an operational bridge between teachers and students.
              </p>
              <p className="text-sm md:text-base text-amberwood-200 leading-relaxed font-light">
                The prototype has been custom-scaled to support the school's operational requirements, ensuring grading periods remain stress-free, records stay highly secure, and students are promptly notified about their academic requirements with enough time to prepare.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="md:col-span-4 bg-amberwood-950/40 border border-amberwood-900/30 rounded-2xl p-6 space-y-4 text-left">
              <h3 className="font-serif text-sm text-ochre tracking-wider uppercase font-semibold border-b border-amberwood-900/20 pb-1.5">
                Project Dossier
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-amberwood-400 block uppercase tracking-wider text-[9px]">My Role</span>
                  <span className="text-parchment font-medium mt-0.5 block">Lead Developer & UI Designer</span>
                </div>
                <div>
                  <span className="text-amberwood-400 block uppercase tracking-wider text-[9px]">Class Collaborators</span>
                  <span className="text-parchment font-medium mt-0.5 block">Grade 12 Computer Programming Group</span>
                </div>
                <div>
                  <span className="text-amberwood-400 block uppercase tracking-wider text-[9px]">Platform Stack</span>
                  <span className="text-parchment font-medium mt-0.5 block">React, Tailwind CSS, Local Storage, Gemini API</span>
                </div>
                <div>
                  <span className="text-amberwood-400 block uppercase tracking-wider text-[9px]">Prototype Scope</span>
                  <span className="text-parchment font-medium mt-0.5 block">44 Students • 5 Major Subjects • 1 TVET Section</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Problem & Community Observation */}
          <div className="space-y-6 text-left">
            <h2 className="font-serif text-2xl text-amberwood-100 font-light italic flex items-center gap-2 border-b border-amberwood-900/20 pb-2">
              <AlertTriangle className="w-5 h-5 text-ochre" />
              Community Observation & Problems
            </h2>
            
            <p className="text-sm md:text-base text-amberwood-200 leading-relaxed font-light">
              Our community exploration at the Sisters of Mary School revealed a serious bottleneck in student tracking during examinations. When a student is absent, teachers must manually cross-reference attendance sheets, class registries, and printed exam folders to locate pending tests.
            </p>

            {/* 3-column Problem breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 bg-amberwood-950/20 border border-amberwood-900/20 rounded-2xl space-y-3">
                <div className="w-8 h-8 rounded-full bg-amber-900/20 border border-amber-600/30 flex items-center justify-center text-amber-500 font-bold text-xs">
                  01
                </div>
                <h4 className="font-serif text-base text-amberwood-100 font-medium leading-snug">
                  Manual Oversight
                </h4>
                <p className="text-xs text-amberwood-300 leading-relaxed font-light">
                  Teachers relied on memory and raw paperwork. Missed exams were often discovered only during the high-stress final grading compute weeks.
                </p>
              </div>

              <div className="p-5 bg-amberwood-950/20 border border-amberwood-900/20 rounded-2xl space-y-3">
                <div className="w-8 h-8 rounded-full bg-amber-900/20 border border-amber-600/30 flex items-center justify-center text-amber-500 font-bold text-xs">
                  02
                </div>
                <h4 className="font-serif text-base text-amberwood-100 font-medium leading-snug">
                  Unreliable Messages
                </h4>
                <p className="text-xs text-amberwood-300 leading-relaxed font-light">
                  Relying on verbal reminders passed through classmates often failed because messages were forgotten, causing long delays.
                </p>
              </div>

              <div className="p-5 bg-amberwood-950/20 border border-amberwood-900/20 rounded-2xl space-y-3">
                <div className="w-8 h-8 rounded-full bg-amber-900/20 border border-amber-600/30 flex items-center justify-center text-amber-500 font-bold text-xs">
                  03
                </div>
                <h4 className="font-serif text-base text-amberwood-100 font-medium leading-snug">
                  Student Pressure
                </h4>
                <p className="text-xs text-amberwood-300 leading-relaxed font-light">
                  Late notifications gave students extremely limited preparation time, leading to intense test anxiety and poorer academic grades.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Proposed Solution */}
          <div className="space-y-6 text-left">
            <h2 className="font-serif text-2xl text-amberwood-100 font-light italic flex items-center gap-2 border-b border-amberwood-900/20 pb-2">
              <CheckCircle2 className="w-5 h-5 text-ochre" />
              The Proposed Solution: ExamTrack
            </h2>
            
            <p className="text-sm md:text-base text-amberwood-200 leading-relaxed font-light">
              ExamTrack represents a clean shift to centralized automation. By providing an online dashboard with secure, role-based controls, the system ensures that information is instantly accessible, accurate, and completely transparent for both teachers and students.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
              <div className="bg-[#21110b] border border-amberwood-900/40 p-6 rounded-2xl space-y-4">
                <h3 className="font-serif text-lg text-ochre italic flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Authorized Teacher Access
                </h3>
                <p className="text-xs text-amberwood-200 leading-relaxed font-light">
                  Teachers utilize a secure PIN code lock to enter their personalized dashboard. Here, they can immediately choose their handled subjects, check total stats, update student statuses instantly (from Pending to Completed), generate AI reports, and copy quick alerts.
                </p>
              </div>

              <div className="bg-[#21110b] border border-amberwood-900/40 p-6 rounded-2xl space-y-4">
                <h3 className="font-serif text-lg text-ochre italic flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Student Examination Checker
                </h3>
                <p className="text-xs text-amberwood-200 leading-relaxed font-light">
                  Students do not need complex logins. They simply search using their student number or full name. The system instantly lists all subjects and highlights any pending items with an empathetic, custom reminder recommending they schedule a make-up session.
                </p>
              </div>
            </div>
          </div>

          {/* PROTOTYPE LINK / CALL TO ACTION BANNER */}
          <div className="bg-gradient-to-r from-[#2a1711] to-[#361f17] border border-ochre/30 p-8 rounded-3xl text-center space-y-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-ochre/10 rounded-full blur-2xl pointer-events-none animate-pulse" />
            <h3 className="font-serif text-2xl text-parchment font-light">
              Experience the live prototype of <span className="text-ochre">ExamTrack</span>
            </h3>
            <p className="text-xs text-amberwood-300 max-w-xl mx-auto leading-relaxed">
              We have built a fully simulated prototype representing the real application architecture directly within your browser. Try entering the PIN <strong>1957</strong> to test teacher actions, or search <strong>Jane Marie Baluna</strong> in the Student checker.
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="#live-emulator"
                className="inline-flex items-center gap-2 px-6 py-3 bg-ochre text-stone-950 text-xs uppercase tracking-widest font-bold rounded-full hover:bg-parchment transition-all duration-300 shadow-lg hover:scale-105"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Launch Interactive Emulator Below
              </a>
              <a
                href="https://6a48ab673942a75d6d90241a--examtrack1.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-ochre text-ochre text-xs uppercase tracking-widest font-bold rounded-full hover:bg-ochre hover:text-stone-950 transition-all duration-300 shadow-lg hover:scale-105"
              >
                <ArrowUpRight className="w-4 h-4" />
                Explore Live Web Application
              </a>
            </div>
          </div>

          {/* INTERACTIVE EMULATOR MODULE (ANCHOR) */}
          <div id="live-emulator" className="bg-stone-950 border border-amberwood-900/40 rounded-3xl overflow-hidden shadow-2xl relative scroll-mt-28">
            
            {/* Header switcher */}
            <div className="bg-[#1b0d09] border-b border-amberwood-900/30 p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-left">
                <h3 className="font-serif text-lg text-parchment font-normal flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-ochre" />
                  ExamTrack Live Prototype Simulator
                </h3>
                <p className="text-[10px] text-amberwood-400 font-mono uppercase mt-0.5">
                  Academic Proof-of-Concept • Client-Side Database Sandbox
                </p>
              </div>

              {/* View Switcher */}
              <div className="flex bg-stone-950 p-1 rounded-lg border border-amberwood-900/30 shrink-0">
                <button
                  onClick={() => setEmulatorTab("teacher")}
                  className={`px-4 py-1.5 rounded text-xs tracking-wider uppercase font-medium transition-colors ${
                    emulatorTab === "teacher"
                      ? "bg-ochre text-stone-950 font-semibold"
                      : "text-amberwood-300 hover:text-parchment"
                  }`}
                >
                  Teacher Access
                </button>
                <button
                  onClick={() => setEmulatorTab("student")}
                  className={`px-4 py-1.5 rounded text-xs tracking-wider uppercase font-medium transition-colors ${
                    emulatorTab === "student"
                      ? "bg-ochre text-stone-950 font-semibold"
                      : "text-amberwood-300 hover:text-parchment"
                  }`}
                >
                  Student Checker
                </button>
              </div>
            </div>

            {/* Simulated Live Toast notifications */}
            {showNotification && (
              <div className="absolute top-16 right-4 z-50 bg-[#1e100c] border border-ochre/40 text-parchment px-4 py-2.5 rounded-xl shadow-2xl text-xs flex items-center gap-2 animate-bounce">
                <ShieldCheck className="w-4 h-4 text-ochre shrink-0" />
                <span>{showNotification}</span>
              </div>
            )}

            {/* TAB 1: TEACHER ACCESS SIMULATION */}
            {emulatorTab === "teacher" && (
              <div className="p-6 md:p-8 text-left">
                {!pinVerified ? (
                  // PIN screen
                  <div className="max-w-md mx-auto py-12 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-[#1b0d09] border border-ochre/30 flex items-center justify-center mx-auto shadow-md">
                      <Lock className="w-7 h-7 text-ochre" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl text-amberwood-100 font-light">Teacher PIN Verification</h4>
                      <p className="text-xs text-amberwood-400 mt-1 leading-relaxed">
                        To protect examination integrity, please authorize by entering the Teacher PIN.
                      </p>
                    </div>

                    <form onSubmit={handlePinSubmit} className="space-y-3">
                      <div className="relative max-w-xs mx-auto">
                        <input
                          type="password"
                          value={pinInput}
                          onChange={(e) => setPinInput(e.target.value)}
                          placeholder="••••"
                          maxLength={4}
                          className="w-full text-center tracking-widest bg-stone-900 border border-amberwood-900/50 rounded-xl p-3 text-lg text-ochre focus:outline-none focus:border-ochre focus:ring-1 focus:ring-ochre"
                        />
                      </div>
                      
                      {pinError && (
                        <p className="text-[11px] text-red-400 font-mono">
                          Incorrect PIN. Hint: enter <strong>1957</strong> or <strong>2026</strong>.
                        </p>
                      )}

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-ochre text-stone-950 text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-parchment transition-colors"
                      >
                        Verify Credentials
                      </button>
                    </form>

                    <div className="bg-amberwood-950/20 border border-amberwood-900/10 rounded-xl p-3 max-w-xs mx-auto text-[10px] text-amberwood-300 leading-relaxed">
                      <strong>💡 Quick Tip:</strong> The school's founding year is the standard Teacher PIN: <strong>1957</strong>.
                    </div>
                  </div>
                ) : (
                  // Verified Dashboard View
                  <div className="space-y-6">
                    
                    {/* Welcome Banner */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1e100c]/40 border border-amberwood-900/30 p-4 rounded-2xl">
                      <div>
                        <span className="text-[9px] font-mono text-ochre tracking-widest uppercase block">SESSION SECURED</span>
                        <h4 className="text-sm font-semibold text-parchment">Welcome Back, Authorized Faculty Member</h4>
                      </div>
                      <button
                        onClick={() => {
                          setPinVerified(false);
                          setPinInput("");
                          triggerNotification("Securely logged out.");
                        }}
                        className="text-[10px] uppercase tracking-wider bg-stone-900 border border-amberwood-900/40 text-amberwood-300 px-3 py-1 rounded-md hover:border-ochre hover:text-ochre transition-colors"
                      >
                        Lock Dashboard
                      </button>
                    </div>

                    {/* Subject selectors */}
                    <div>
                      <h5 className="text-[10px] uppercase tracking-widest text-ochre font-bold mb-3">
                        Subjects list (Select one to monitor)
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {["Work Immersion", "Research", "Physics", "Catechism", "TVET"].map((sub) => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSubject(sub)}
                            className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold border transition-all duration-300 ${
                              selectedSubject === sub
                                ? "bg-[#834626] border-ochre text-parchment font-bold scale-105"
                                : "bg-[#1b0d09] border-amberwood-900/30 text-amberwood-300 hover:border-amberwood-700"
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sub-specialization for TVET */}
                    {selectedSubject === "TVET" && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-stone-900 p-4 rounded-xl border border-amberwood-900/20 space-y-2"
                      >
                        <h6 className="text-[10px] uppercase tracking-widest text-amberwood-400 font-bold">
                          Select TVET Specialization
                        </h6>
                        <div className="flex flex-wrap gap-2">
                          {["Computer Programming", "Mechatronics", "Hotel Operations", "Technical Drafting", "Caregiving"].map((spec) => (
                            <button
                              key={spec}
                              onClick={() => setSelectedTVET(spec)}
                              className={`px-3 py-1.5 rounded text-xs transition-colors border ${
                                selectedTVET === spec
                                  ? "bg-ochre text-stone-950 font-bold border-ochre"
                                  : "bg-stone-950 border-amberwood-900/20 text-amberwood-300 hover:border-amberwood-400"
                              }`}
                            >
                              {spec}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Monitoring Stats Indicators */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      
                      <div className="bg-[#1b0d09] border border-amberwood-900/20 p-3 rounded-xl text-center">
                        <span className="text-[9px] uppercase tracking-wider text-amberwood-400 block">Total Students</span>
                        <span className="text-xl font-bold text-parchment mt-1 block">{statsTotal}</span>
                      </div>

                      <div className="bg-[#1b0d09] border border-amberwood-900/20 p-3 rounded-xl text-center">
                        <span className="text-[9px] uppercase tracking-wider text-green-400 block">Completed</span>
                        <span className="text-xl font-bold text-green-300 mt-1 block">🟢 {statsCompleted}</span>
                      </div>

                      <div className="bg-[#1b0d09] border border-amberwood-900/20 p-3 rounded-xl text-center">
                        <span className="text-[9px] uppercase tracking-wider text-red-400 block">Pending</span>
                        <span className="text-xl font-bold text-red-400 mt-1 block">🔴 {statsPending}</span>
                      </div>

                      <div className="bg-[#1b0d09] border border-amberwood-900/20 p-3 rounded-xl text-center">
                        <span className="text-[9px] uppercase tracking-wider text-amberwood-400 block">Excused</span>
                        <span className="text-xl font-bold text-parchment mt-1 block">{statsExcused}</span>
                      </div>

                      <div className="bg-[#1b0d09] border border-amberwood-900/20 p-3 rounded-xl text-center col-span-2 md:col-span-1">
                        <span className="text-[9px] uppercase tracking-wider text-ochre block">Completion %</span>
                        <span className="text-xl font-bold text-ochre mt-1 block">{completionPercent}%</span>
                      </div>

                    </div>

                    {/* Filters & Search controls */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-amberwood-900/10 pt-4">
                      
                      {/* Search */}
                      <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-amberwood-500" />
                        <input
                          type="text"
                          value={studentSearchQuery}
                          onChange={(e) => setStudentSearchQuery(e.target.value)}
                          placeholder="Search student name..."
                          className="w-full bg-stone-900 border border-amberwood-900/30 rounded-lg pl-9 pr-4 py-2 text-xs text-amberwood-100 focus:outline-none focus:border-ochre"
                        />
                      </div>

                      {/* Filter tabs */}
                      <div className="flex bg-[#1b0d09] p-1 rounded-lg border border-amberwood-900/30 shrink-0 w-full sm:w-auto justify-center">
                        {(["All", "Pending", "Completed"] as const).map((f) => (
                          <button
                            key={f}
                            onClick={() => setStatusFilter(f)}
                            className={`px-3 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-colors ${
                              statusFilter === f
                                ? "bg-ochre text-stone-950"
                                : "text-amberwood-300 hover:text-parchment"
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>

                    </div>

                    {/* Student List Table */}
                    <div className="bg-[#1b0d09]/40 border border-amberwood-900/30 rounded-xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-amberwood-200 border-collapse">
                          <thead className="bg-[#1e100c] text-[10px] uppercase tracking-wider text-ochre font-bold border-b border-amberwood-900/30">
                            <tr>
                              <th className="p-4">Student Number</th>
                              <th className="p-4">Name</th>
                              <th className="p-4 text-center">Current Exam Status</th>
                              <th className="p-4 text-right">Administrative Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-amberwood-900/10">
                            {students
                              .filter(st => {
                                // Filter by search query
                                if (studentSearchQuery && !st.name.toLowerCase().includes(studentSearchQuery.toLowerCase())) return false;
                                // Filter by status
                                const stat = st.grades[currentSubjectKey];
                                if (statusFilter === "Pending" && stat !== "Pending") return false;
                                if (statusFilter === "Completed" && stat !== "Completed") return false;
                                return true;
                              })
                              .map((st) => {
                                const stat = st.grades[currentSubjectKey];
                                return (
                                  <tr key={st.id} className="hover:bg-amberwood-950/20 transition-colors">
                                    <td className="p-4 font-mono text-[10px] text-amberwood-400">{st.studentNo}</td>
                                    <td className="p-4 font-semibold text-parchment">{st.name}</td>
                                    <td className="p-4 text-center">
                                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                        stat === "Completed"
                                          ? "bg-green-950/40 text-green-400 border border-green-500/20"
                                          : "bg-red-950/40 text-red-400 border border-red-500/20"
                                      }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${stat === "Completed" ? "bg-green-400" : "bg-red-400 animate-pulse"}`} />
                                        {stat}
                                      </span>
                                    </td>
                                    <td className="p-4 text-right">
                                      <button
                                        onClick={() => toggleStatus(st.id, currentSubjectKey)}
                                        className={`px-3 py-1.5 rounded text-[10px] uppercase tracking-wider font-bold border transition-colors ${
                                          stat === "Completed"
                                            ? "bg-transparent border-red-900/40 text-red-400 hover:bg-red-900/25"
                                            : "bg-green-950 border-green-500/30 text-green-300 hover:bg-green-800"
                                        }`}
                                      >
                                        Mark {stat === "Completed" ? "Pending" : "Completed"}
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* AI-Assisted Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      
                      {/* Realtime AI Summary */}
                      <div className="bg-[#1b0d09] border border-amberwood-900/30 p-5 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-2 right-2 text-ochre/25">
                          <Sparkles className="w-6 h-6 animate-pulse" />
                        </div>
                        <h5 className="font-serif text-sm text-ochre italic mb-2.5 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4" />
                          AI-Assisted Operational Summary
                        </h5>
                        <div className="bg-stone-950 p-3.5 rounded-xl border border-amberwood-900/10 font-mono text-[11px] text-amberwood-300 whitespace-pre-line leading-relaxed text-left">
                          {aiSummaryText}
                        </div>
                        <button
                          onClick={() => copyToClipboard(aiSummaryText, "ai-summary")}
                          className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-amberwood-400 hover:text-ochre font-mono"
                        >
                          {copiedText === "ai-summary" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedText === "ai-summary" ? "Copied AI Summary!" : "Copy Report Logs"}
                        </button>
                      </div>

                      {/* Reminder Message Generator */}
                      <div className="bg-[#1b0d09] border border-amberwood-900/30 p-5 rounded-2xl relative overflow-hidden text-left">
                        <h5 className="font-serif text-sm text-ochre italic mb-2.5 flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-ochre" />
                          AI-Generated Student Reminder Message
                        </h5>
                        <p className="text-[11px] text-amberwood-300 mb-3 font-light leading-relaxed">
                          Automated clipboard text to pass directly to classmates or student communications:
                        </p>
                        
                        <div className="bg-stone-950 p-3.5 rounded-xl border border-amberwood-900/10 font-serif text-xs text-amberwood-100 italic leading-relaxed">
                          {statsPending > 0 ? (
                            `"Hi, this is an academic follow-up reminder from Sisters of Mary of Banneux. You still have a pending examination in ${currentSubjectKey}. Please approach your subject teacher immediately to schedule your make-up examination before the grading deadline."`
                          ) : (
                            `"All clear! Excellent job. No pending examination alerts currently exist for ${currentSubjectKey}."`
                          )}
                        </div>

                        <div className="flex gap-4 mt-3">
                          <button
                            disabled={statsPending === 0}
                            onClick={() => copyToClipboard(
                              `Hi, this is an academic follow-up reminder from Sisters of Mary of Banneux. You still have a pending examination in ${currentSubjectKey}. Please approach your subject teacher immediately to schedule your make-up examination before the grading deadline.`,
                              "reminder"
                            )}
                            className="inline-flex items-center gap-1.5 text-[10px] text-amberwood-400 hover:text-ochre font-mono disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {copiedText === "reminder" ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                            {copiedText === "reminder" ? "Reminder Copied!" : "Copy Alert Text"}
                          </button>

                          <button
                            onClick={handleGenerateReport}
                            className="inline-flex items-center gap-1 text-[10px] text-amberwood-400 hover:text-ochre font-mono ml-auto"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Generate Summary Report
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            )}

            {/* TAB 2: STUDENT EXAMINATION CHECKER */}
            {emulatorTab === "student" && (
              <div className="p-6 md:p-8 text-left max-w-2xl mx-auto space-y-6">
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-[#1b0d09] border border-ochre/30 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Search className="w-5 h-5 text-ochre" />
                  </div>
                  <h4 className="font-serif text-lg text-parchment font-light">Student Examination Checker</h4>
                  <p className="text-xs text-amberwood-400 leading-relaxed max-w-md mx-auto">
                    Check your current pending academic examinations. Simply search your name or student number below. No login credentials required.
                  </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleStudentSearch} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={studentQuery}
                    onChange={(e) => setStudentQuery(e.target.value)}
                    placeholder="Enter Name (e.g. Jane Marie) or Student No..."
                    className="flex-1 bg-stone-900 border border-amberwood-900/40 rounded-xl px-4 py-3 text-xs text-amberwood-100 placeholder:text-amberwood-600 focus:outline-none focus:border-ochre"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#834626] border border-ochre/25 text-parchment hover:bg-ochre hover:text-stone-950 text-xs uppercase tracking-widest font-bold rounded-xl transition-all"
                  >
                    Search Records
                  </button>
                </form>

                {/* Help tip if not searched yet */}
                {!studentSearched && (
                  <div className="bg-amberwood-950/25 border border-amberwood-900/20 p-4 rounded-xl flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-ochre shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amberwood-300 leading-relaxed">
                      <strong>Demo Hint:</strong> Type <span className="text-ochre font-bold font-mono">Jane Marie</span> or <span className="text-ochre font-bold font-mono">Maria</span> then click Search. You will see their exact examination logs as updated by the teacher dashboard.
                    </p>
                  </div>
                )}

                {/* Search Result */}
                {studentSearched && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#1b0d09] border border-amberwood-900/30 rounded-2xl p-6 space-y-5"
                  >
                    {searchedStudentResult ? (
                      // Found Student
                      <div className="space-y-5">
                        <div className="flex justify-between items-start flex-wrap gap-2 border-b border-amberwood-900/10 pb-3">
                          <div>
                            <span className="text-[8px] font-mono text-ochre tracking-widest uppercase">Verified Record Found</span>
                            <h5 className="font-serif text-lg text-parchment font-semibold">{searchedStudentResult.name}</h5>
                            <p className="text-[10px] text-amberwood-400 font-mono mt-0.5">{searchedStudentResult.studentNo}</p>
                          </div>
                          <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-amberwood-950/80 text-amberwood-300 border border-amberwood-900/30">
                            Section: Grade 12 - A
                          </span>
                        </div>

                        {/* List of Subjects */}
                        <div className="space-y-2.5">
                          {Object.entries(searchedStudentResult.grades).map(([subject, status]) => (
                            <div
                              key={subject}
                              className="flex items-center justify-between p-3 bg-stone-950/60 rounded-xl border border-amberwood-900/10"
                            >
                              <span className="text-xs text-amberwood-200 font-medium">{subject}</span>
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                                status === "Completed"
                                  ? "bg-green-950/40 text-green-400 border border-green-500/20"
                                  : "bg-red-950/40 text-red-400 border border-red-500/20"
                              }`}>
                                <span className={`w-1 h-1 rounded-full ${status === "Completed" ? "bg-green-400" : "bg-red-400 animate-pulse"}`} />
                                {status}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Reminders section if pending exists */}
                        {Object.entries(searchedStudentResult.grades).some(([_, stat]) => stat === "Pending") ? (
                          // Show customized emotional warning banner
                          <div className="bg-red-950/30 border border-red-500/20 p-4 rounded-xl flex gap-3 text-left">
                            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <div>
                              <h6 className="text-xs font-bold text-red-400 uppercase tracking-wide">
                                Pending Action Required
                              </h6>
                              <p className="text-[11px] text-amberwood-200 mt-1 leading-relaxed">
                                You still have a pending examination in{" "}
                                <strong className="text-red-300">
                                  {Object.entries(searchedStudentResult.grades)
                                    .filter(([_, stat]) => stat === "Pending")
                                    .map(([sub]) => sub)
                                    .join(", ")}
                                </strong>
                                . Please approach your subject teacher as soon as possible to schedule your make-up examination before the grading deadline.
                              </p>
                            </div>
                          </div>
                        ) : (
                          // All clear banner
                          <div className="bg-green-950/30 border border-green-500/20 p-4 rounded-xl flex gap-3 text-left">
                            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                            <div>
                              <h6 className="text-xs font-bold text-green-400 uppercase tracking-wide">
                                Academic standing clear
                              </h6>
                              <p className="text-[11px] text-green-200 mt-1 leading-relaxed">
                                All of your examinations have been recorded as completed. Excellent job maintaining your academic standing! Keep up the brilliant work.
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="text-center pt-2">
                          <button
                            onClick={resetStudentSearch}
                            className="text-[10px] font-mono text-amberwood-500 hover:text-ochre"
                          >
                            ← Look Up Another Student
                          </button>
                        </div>
                      </div>
                    ) : (
                      // No student found
                      <div className="text-center py-6 space-y-4">
                        <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
                        <div>
                          <h5 className="font-serif text-base text-parchment font-medium">Record Not Found</h5>
                          <p className="text-xs text-amberwood-400 mt-1 max-w-sm mx-auto">
                            We couldn't find any examination files matching "{studentQuery}". Please verify the name spelling or try searching another name.
                          </p>
                        </div>
                        <button
                          onClick={resetStudentSearch}
                          className="px-4 py-1.5 bg-[#21110b] text-amberwood-300 border border-amberwood-900/30 rounded text-xs hover:border-ochre hover:text-parchment transition-colors"
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

              </div>
            )}

          </div>

          {/* Section 4: Expected Benefits & Outcomes */}
          <div className="space-y-6 text-left">
            <h2 className="font-serif text-2xl text-amberwood-100 font-light italic flex items-center gap-2 border-b border-amberwood-900/20 pb-2">
              <Layers className="w-5 h-5 text-ochre" />
              Expected Benefits & Outcomes
            </h2>
            
            <p className="text-sm md:text-base text-amberwood-200 leading-relaxed font-light">
              Implementing ExamTrack produces critical organizational wins across three levels of the Sisters of Mary School community:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-stone-950/50 border border-amberwood-900/20 p-5 rounded-2xl text-left space-y-2">
                <span className="text-[9px] font-mono text-ochre tracking-widest uppercase font-bold block">FOR TEACHERS</span>
                <h4 className="font-serif text-sm font-semibold text-parchment">Administrative Relief</h4>
                <p className="text-xs text-amberwood-300 leading-relaxed font-light">
                  Slashes hours spent cross-checking attendance sheets and manual checklists. Organizes exam states in one click, preventing high-stress workloads right before grading deadlines.
                </p>
              </div>

              <div className="bg-stone-950/50 border border-amberwood-900/20 p-5 rounded-2xl text-left space-y-2">
                <span className="text-[9px] font-mono text-ochre tracking-widest uppercase font-bold block">FOR STUDENTS</span>
                <h4 className="font-serif text-sm font-semibold text-parchment">Reduced Test Anxiety</h4>
                <p className="text-xs text-amberwood-300 leading-relaxed font-light">
                  Provides full, independent transparency of exam statuses. Prevents sudden "surprise makeups", giving students several days to study properly and perform at their personal best.
                </p>
              </div>

              <div className="bg-stone-950/50 border border-amberwood-900/20 p-5 rounded-2xl text-left space-y-2">
                <span className="text-[9px] font-mono text-ochre tracking-widest uppercase font-bold block">FOR THE SCHOOL</span>
                <h4 className="font-serif text-sm font-semibold text-parchment">Operational Flow</h4>
                <p className="text-xs text-amberwood-300 leading-relaxed font-light">
                  Enforces systematic academic accountability. Smooths out grading bottlenecks, ensures zero missed exams are overlooked, and improves communication between staff and student bodies.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Learnings and Growth (Personal Statement) */}
          <div className="bg-[#1e100c]/40 border border-amberwood-900/30 p-6 sm:p-8 rounded-3xl text-left space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-amberwood-100 font-light italic flex items-center gap-2 border-b border-amberwood-900/20 pb-2">
              <BookMarked className="w-5 h-5 text-ochre" />
              My Learnings & Key Takeaways
            </h2>
            
            <p className="text-sm text-amberwood-200 leading-relaxed font-light">
              As the lead developer of this Capstone, this project stretched both my technical and social problem-solving abilities. Working alongside my Grade 12 Computer Programming peers under the Sisters of Mary was a deeply humbling and transformative experience.
            </p>

            <ul className="space-y-3.5 text-xs text-amberwood-300 pl-1">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre shrink-0 mt-1.5" />
                <span>
                  <strong>Full-Stack UX Intent:</strong> I realized that software is only as good as its usability. Designing the Student Checker without login credentials was a conscious decision to ensure barrier-free lookups for students without technical difficulties.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre shrink-0 mt-1.5" />
                <span>
                  <strong>Empathetic AI Integrations:</strong> Integrating AI features taught me to focus on human workflows. Instead of making automated "decisions" that override teachers, our AI focuses purely on summarizing records and draft-composing supportive follow-up reminders.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre shrink-0 mt-1.5" />
                <span>
                  <strong>Real-World Impact:</strong> Building software for my own high school showed me that technology has the power to solve immediate, daily frustrations. Watching teachers save administrative hours gives me incredible pride and validates my future path in Computer Science and Automation.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 6: Limitations & Prototype Boundaries */}
          <div className="border-t border-amberwood-900/20 pt-8 text-left grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-amberwood-400">
            <div>
              <h5 className="font-semibold text-parchment uppercase tracking-wider mb-2 text-[10px]">PROTOTYPE SCOPE & BOUNDARIES</h5>
              <p className="leading-relaxed font-light">
                This desktop-responsive prototype demonstrates academic workflow tracking using client-side database states. AI actions are performed server-side with Gemini API endpoints, processing metadata to generate clear notification logs.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-parchment uppercase tracking-wider mb-2 text-[10px]">LIMITATIONS DISCLOSURE</h5>
              <p className="leading-relaxed font-light">
                To respect school infrastructure limits, the system manages local web-based alert boxes and copyable text blocks rather than direct SMS/Email gateway integrations. Teachers remain responsible for checking off exams after students complete makeup sheets.
              </p>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="bg-[#1b0d09] p-5 border-t border-amberwood-900/20 flex flex-col sm:flex-row justify-between items-center text-[10px] text-amberwood-500 font-mono gap-2 text-center sm:text-left">
          <span>EXAMTRACK CAPSTONE • PROOF OF CONCEPT ARCHIVE</span>
          <span>SISTERS OF MARY SCHOOL OF BANNEUX INC. © 2026</span>
        </div>

      </article>

    </div>
  );
}
