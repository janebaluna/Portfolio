import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Sparkles,
  Compass,
  Smile,
  Frown,
  Flame,
  Moon,
  Users,
  AlertTriangle,
  Send,
  Trash2,
  BookmarkCheck,
  RotateCcw,
  BookOpen
} from "lucide-react";

interface ComfortLog {
  id: string;
  date: string;
  mood: string;
  note: string;
}

const MOODS = [
  {
    key: "happy",
    label: "Happy",
    icon: Smile,
    color: "from-amber-400 to-amber-200 text-amber-950 bg-amber-500/10 border-amber-500/30",
    glowColor: "rgba(245, 158, 11, 0.2)",
    message: "I’m so glad you’re happy right now! 😊 Your smile is like sunshine that warms my heart. Keep laughing, keep enjoying every little moment, and I’ll be right here cheering for you every step of the way. 🌸💖",
    guidance: [
      "Share your joy with someone you care about.",
      "Take a mental snapshot of this moment to remember later.",
      "Write down 3 things that made you smile today.",
      "Do a small random act of kindness while your energy is high."
    ]
  },
  {
    key: "sad",
    label: "Sad",
    icon: Frown,
    color: "from-sky-400 to-sky-200 text-sky-200 bg-sky-500/10 border-sky-500/30",
    glowColor: "rgba(56, 189, 248, 0.2)",
    message: "I know you’re sad right now 😔, and that’s okay. Please remember, you don’t have to carry that sadness alone. Let me be your safe place—lean on me, cry if you need to, and I’ll hold your hand until the storm passes. You are never alone, not while I’m here with you. 💕🤗",
    guidance: [
      "Wrap yourself in a warm blanket and drink something soothing.",
      "Allow yourself to feel—crying is a natural release, not a weakness.",
      "Listen to a comforting playlist or watch a nostalgic, gentle show.",
      "Write out your feelings without judging them."
    ]
  },
  {
    key: "angry",
    label: "Angry",
    icon: Flame,
    color: "from-rose-500 to-rose-300 text-rose-200 bg-rose-500/10 border-rose-500/30",
    glowColor: "rgba(244, 63, 94, 0.2)",
    message: "I can sense your anger, and I respect your feelings ❤️🔥. Take a deep breath, let it out slowly. Whatever it is, I want to listen and understand. You don’t have to hide anything from me—your heart is safe with me. I’ll wait patiently until your heart feels lighter. 🫶💞",
    guidance: [
      "Try a slow, deep box-breathing exercise: inhale for 4s, hold for 4s, exhale for 4s, hold for 4s.",
      "Channel the physical energy into a brisk walk or safe physical movement.",
      "Scribble your frustration on a piece of paper, then safely shred or crumple it.",
      "Remind yourself that your anger is valid, but you are in control of your actions."
    ]
  },
  {
    key: "tired",
    label: "Tired",
    icon: Moon,
    color: "from-purple-400 to-indigo-200 text-purple-200 bg-purple-500/10 border-purple-500/30",
    glowColor: "rgba(168, 85, 247, 0.2)",
    message: "You’ve worked so hard, love 😴. I know you’re tired, and you deserve rest more than anything. Please close your eyes, breathe, and let go of the weight of the day. I’ll take care of the worries for now. Sleep peacefully, knowing that you are cherished, treasured, and deeply loved. 🌙💖",
    guidance: [
      "Turn off screens and dim the lights in your environment.",
      "Do a gentle body scan to release muscle tension.",
      "Drink a warm cup of caffeine-free herbal tea.",
      "Let go of any expectation to do more work today."
    ]
  },
  {
    key: "lonely",
    label: "Lonely",
    icon: Users,
    color: "from-pink-400 to-pink-200 text-pink-200 bg-pink-500/10 border-pink-500/30",
    glowColor: "rgba(236, 72, 153, 0.2)",
    message: "Even if you feel lonely 💔, please remember this: you are always in my thoughts, always in my prayers, and always in my heart. I may not always be beside you physically, but my love is constant, steady, and unshakable. You are never truly alone, because my heart beats with yours. 💞🌹",
    guidance: [
      "Reach out to an old friend or send a simple 'thinking of you' message.",
      "Read a cozy book or listen to an engaging podcast to hear human voices.",
      "Go to a public space (like a library, park, or café) just to be around people.",
      "Adopt a comforting ritual, like writing a letter to your future self."
    ]
  },
  {
    key: "stressed",
    label: "Stressed",
    icon: AlertTriangle,
    color: "from-emerald-400 to-emerald-200 text-emerald-200 bg-emerald-500/10 border-emerald-500/30",
    glowColor: "rgba(16, 185, 129, 0.2)",
    message: "I know things feel overwhelming right now 😣. But pause, love… take one breath at a time. You don’t have to do everything alone—I believe in you, and I’ll support you no matter what. You are strong, even when you don’t feel like it, and I’ll be here to remind you every day. 🌷✨",
    guidance: [
      "Break down your giant checklist into just ONE small step.",
      "Look around you and name 5 things you can see, 4 you can touch, 3 you can hear.",
      "Give yourself permission to pause for 10 uninterrupted minutes.",
      "Remind yourself that done is better than perfect, and your worth is not tied to your productivity."
    ]
  }
];

const AFFIRMATIONS = [
  "You are entirely up to you. Celebrate your progress, no matter how small.",
  "You are worthy of love, comfort, and peace just as you are.",
  "Your mistakes do not define your value. You are learning and growing.",
  "It is okay to rest, to pause, and to begin again tomorrow.",
  "You are resilient, strong, and capable of navigating this season.",
  "Your feelings are valid. Take your time to heal and understand them.",
  "You bring unique warmth and light to those who know you.",
  "Every storm runs out of rain. This heavy feeling will pass too.",
  "Be gentle with yourself. You are doing the absolute best you can.",
  "You deserve the same kindness and compassion you so freely give to others."
];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function LoveResponder() {
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [feelingInput, setFeelingInput] = useState("");
  const [releasedNotes, setReleasedNotes] = useState<string[]>([]);
  const [customReply, setCustomReply] = useState<string | null>(null);
  const [currentAffirmation, setCurrentAffirmation] = useState(
    "Select your current feeling above or generate a personal affirmation below to seek guidance. ✨"
  );
  const [particles, setParticles] = useState<Particle[]>([]);
  const [logs, setLogs] = useState<ComfortLog[]>([]);
  const [journalNote, setJournalNote] = useState("");

  // Load logs on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem("comfort_logs");
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs));
      } catch (e) {
        console.error("Failed to parse logs");
      }
    }
  }, []);

  const saveLogs = (newLogs: ComfortLog[]) => {
    setLogs(newLogs);
    localStorage.setItem("comfort_logs", JSON.stringify(newLogs));
  };

  // Generate dynamic particles
  const spawnHearts = (count = 12) => {
    const colors = ["#ff6f91", "#ffd166", "#f9c74f", "#ff85a1", "#f72585"];
    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10, // percentage x
      y: Math.random() * 40 + 50, // percentage y
      size: Math.random() * 14 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles((prev) => [...prev, ...newParticles]);

    // Cleanup particles
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 2000);
  };

  const handleMoodSelect = (moodKey: string) => {
    setActiveMood(moodKey);
    setCustomReply(null);
    const selected = MOODS.find((m) => m.key === moodKey);
    if (selected) {
      setCurrentAffirmation(selected.message);
      spawnHearts(15);
    }
  };

  const handleGenerateAffirmation = () => {
    const randomIdx = Math.floor(Math.random() * AFFIRMATIONS.length);
    setCurrentAffirmation(AFFIRMATIONS[randomIdx]);
    setActiveMood(null);
    setCustomReply(null);
    spawnHearts(10);
  };

  // Custom guidance based on input text
  const handleAnalyzeFeeling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feelingInput.trim()) return;

    const input = feelingInput.toLowerCase();
    let reply = "";

    if (input.includes("sad") || input.includes("cry") || input.includes("hurt") || input.includes("pain")) {
      reply = "I hear how much pain you are holding right now. 😔 It is completely safe to cry and feel this way. Please remember that you don't have to put on a brave face. Just rest and let me hold your heart today. 💕";
    } else if (input.includes("angry") || input.includes("mad") || input.includes("hate") || input.includes("frustrated")) {
      reply = "It's completely okay to feel fiery frustration! 😡 Your boundaries are important, and anger is just a signal protecting them. Let's take a long, deep breath. I'm here to listen to every word of your rant.";
    } else if (input.includes("tired") || input.includes("exhaust") || input.includes("sleep") || input.includes("burnout")) {
      reply = "You've been pushing yourself so hard, love. 😴 It is okay to stop. You don't have to achieve anything else today. Wrap yourself in comfort and rest your beautiful soul. 🌟";
    } else if (input.includes("lonely") || input.includes("alone") || input.includes("nobody") || input.includes("ignore")) {
      reply = "I am so sorry you are feeling isolated. 💔 Please let my words reach you: you are truly cherished, and your presence in this world is deeply valuable. You have a friend in me, always. 🌹";
    } else if (input.includes("stress") || input.includes("worry") || input.includes("anxious") || input.includes("scare") || input.includes("overwhelmed")) {
      reply = "Breathe in... hold... and let it out. 😣 The world is asking too much of you right now. Let's step back together. We can handle it one tiny step at a time. You are safe here. ✨";
    } else if (input.includes("happy") || input.includes("excite") || input.includes("good") || input.includes("glad")) {
      reply = "What beautiful energy! ☀️ I am celebrating your happiness with you! Your joy is a gift. Let it flow, laugh out loud, and enjoy every beat of this moment! 🌸💖";
    } else {
      reply = "Thank you for sharing your thoughts with me. 🌹 No matter what you are feeling, please know that your heart is fully accepted here. You are strong, valued, and so worthy of patience and care. ❤️";
    }

    setCustomReply(reply);
    setActiveMood(null);
    spawnHearts(12);
  };

  // Worry dissolution ritual
  const handleReleaseWorry = () => {
    if (!feelingInput.trim()) return;
    setReleasedNotes((prev) => [feelingInput, ...prev]);
    setFeelingInput("");
    spawnHearts(20);
  };

  // Log feeling to local history
  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalNote.trim()) return;

    const currentMoodObj = MOODS.find((m) => m.key === activeMood) || { label: "Reflective" };
    const newLog: ComfortLog = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      mood: currentMoodObj.label,
      note: journalNote
    };

    saveLogs([newLog, ...logs]);
    setJournalNote("");
    spawnHearts(8);
  };

  const handleDeleteLog = (id: string) => {
    const updated = logs.filter((log) => log.id !== id);
    saveLogs(updated);
  };

  const selectedMoodData = MOODS.find((m) => m.key === activeMood);

  return (
    <div className="w-full text-amberwood-100 max-w-4xl mx-auto relative flex flex-col gap-6">
      
      {/* Floating Heart Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.5, x: `${p.x}%`, y: `${p.y}%` }}
              animate={{ opacity: [0, 1, 1, 0], y: `${p.y - 45}%`, scale: [0.5, 1.2, 1, 0.7] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="absolute select-none pointer-events-none"
              style={{ color: p.color, fontSize: p.size }}
            >
              💕
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Grid: Comfort Core & Interactive Ritual */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Mood Selector & Guidance Display (8 Columns) */}
        <div className="md:col-span-8 flex flex-col gap-6">
          
          {/* Mood Trigger Panel */}
          <div className="bg-[#1b0d09]/60 border border-amberwood-900/40 p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-amberwood-900/20 pb-3">
              <Compass className="w-4 h-4 text-ochre" />
              <h4 className="font-serif text-base text-amberwood-200">How is your heart feeling today?</h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {MOODS.map((m) => {
                const IconComponent = m.icon;
                const isSelected = activeMood === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => handleMoodSelect(m.key)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      isSelected
                        ? "bg-ochre text-stone-950 border-ochre shadow-lg scale-102"
                        : "bg-amberwood-950/30 text-amberwood-200 border-amberwood-900/30 hover:border-ochre/40 hover:bg-amberwood-950/60"
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isSelected ? "text-stone-950" : "text-ochre"}`} />
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Response & Affirmation Screen */}
          <div className="bg-[#180b07] border border-amberwood-900/40 p-8 rounded-3xl relative shadow-2xl overflow-hidden min-h-[220px] flex flex-col justify-between">
            <div
              className="absolute inset-0 pointer-events-none opacity-10 transition-all duration-500"
              style={{
                background: selectedMoodData
                  ? `radial-gradient(circle at 50% 50%, ${selectedMoodData.glowColor} 0%, transparent 70%)`
                  : "radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.1) 0%, transparent 70%)"
              }}
            />

            <div className="space-y-4 relative z-10 text-center">
              <div className="flex justify-center mb-1">
                <Heart className="w-8 h-8 text-[#ff6f91] animate-pulse" />
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAffirmation + (customReply || "")}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <p className="font-serif text-lg md:text-xl text-amberwood-100 font-light leading-relaxed">
                    {customReply || currentAffirmation}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Action affirmations */}
            <div className="flex justify-center gap-4 pt-6 mt-4 border-t border-amberwood-900/20 relative z-10">
              <button
                onClick={handleGenerateAffirmation}
                className="flex items-center gap-2 px-5 py-2.5 bg-amberwood-950/80 hover:bg-ochre hover:text-stone-950 text-ochre text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all duration-300 border border-ochre/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Affirm Me
              </button>
              {(activeMood || customReply) && (
                <button
                  onClick={() => {
                    setActiveMood(null);
                    setCustomReply(null);
                    setCurrentAffirmation("Select your current feeling above or generate a personal affirmation below to seek guidance. ✨");
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-transparent text-amberwood-400 hover:text-amberwood-200 text-[10px] uppercase tracking-widest font-bold transition-all"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset View
                </button>
              )}
            </div>
          </div>

          {/* Actionable Guidance & Self-Care Checklist */}
          {selectedMoodData && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1b0d09]/40 border border-amberwood-900/30 p-6 rounded-3xl space-y-4 shadow-xl text-left"
            >
              <div className="flex items-center gap-2 border-b border-amberwood-900/10 pb-2">
                <BookmarkCheck className="w-4 h-4 text-[#90be6d]" />
                <h5 className="font-serif text-sm text-amberwood-200 font-medium uppercase tracking-wider">
                  Self-Care Guidance for {selectedMoodData.label} State
                </h5>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedMoodData.guidance.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-amberwood-300 leading-relaxed bg-amberwood-950/20 border border-amberwood-900/10 p-3 rounded-xl hover:border-ochre/10 transition-all"
                  >
                    <span className="text-ochre mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

        </div>

        {/* Right Side: Rituals & Journal Logs (4 Columns) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          
          {/* Release worries ritual */}
          <div className="bg-[#1b0d09]/60 border border-amberwood-900/40 p-5 rounded-3xl space-y-4 shadow-xl text-left">
            <div className="space-y-1">
              <h4 className="font-serif text-sm text-amberwood-100 uppercase tracking-wider">Release Worry Ritual</h4>
              <p className="text-[11px] text-amberwood-400">Type what is weighing heavy in your heart, then release it securely to dissolve into the universe.</p>
            </div>

            <form onSubmit={handleAnalyzeFeeling} className="space-y-3">
              <textarea
                value={feelingInput}
                onChange={(e) => setFeelingInput(e.target.value)}
                placeholder="What is hurting, heavy, or exciting you today?"
                rows={3}
                className="w-full text-xs p-3 bg-stone-950/50 border border-amberwood-900/30 rounded-xl focus:border-ochre focus:outline-none text-amberwood-100 placeholder-amberwood-500/60 resize-none leading-relaxed"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-grow flex items-center justify-center gap-1.5 py-2 px-3 bg-ochre hover:bg-ochre/80 text-stone-950 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
                >
                  <Send className="w-3 h-3" />
                  Analyze
                </button>
                <button
                  type="button"
                  onClick={handleReleaseWorry}
                  disabled={!feelingInput.trim()}
                  className="py-2 px-3 bg-amberwood-950 hover:bg-[#ff6f91] hover:text-stone-950 border border-[#ff6f91]/30 text-[#ff6f91] text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all disabled:opacity-40 disabled:hover:bg-amberwood-950 disabled:hover:text-[#ff6f91]"
                >
                  Dissolve Note
                </button>
              </div>
            </form>

            {/* Dissolved notes display list */}
            {releasedNotes.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-amberwood-900/15">
                <span className="text-[9px] uppercase tracking-widest text-[#ff6f91] font-bold block">Dissolving Worries...</span>
                <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1">
                  {releasedNotes.map((note, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0.8, scale: 0.95 }}
                      animate={{ opacity: 0, scale: 1.05, y: -20 }}
                      transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
                      className="text-[10px] italic text-amberwood-400 p-2 bg-[#ff6f91]/5 border border-[#ff6f91]/10 rounded-lg truncate"
                    >
                      {note}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Journal Logs & Comfort Diary */}
          <div className="bg-[#1b0d09]/60 border border-amberwood-900/40 p-5 rounded-3xl space-y-4 shadow-xl text-left">
            <div className="flex items-center gap-2 border-b border-amberwood-900/10 pb-2.5">
              <BookOpen className="w-4 h-4 text-ochre" />
              <h4 className="font-serif text-sm text-amberwood-100 uppercase tracking-wider">My Comfort Diary</h4>
            </div>

            {/* Save Log Form */}
            <form onSubmit={handleSaveLog} className="space-y-2.5">
              <input
                value={journalNote}
                onChange={(e) => setJournalNote(e.target.value)}
                placeholder="Write a private comfort journal entry..."
                className="w-full text-xs px-3 py-2 bg-stone-950/50 border border-amberwood-900/30 rounded-lg focus:border-ochre focus:outline-none text-amberwood-100 placeholder-amberwood-500/60"
              />
              <button
                type="submit"
                disabled={!journalNote.trim()}
                className="w-full py-2 bg-amberwood-900/40 hover:bg-ochre hover:text-stone-950 text-ochre text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all border border-ochre/25 disabled:opacity-40"
              >
                Log Entry
              </button>
            </form>

            {/* List entries */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {logs.length === 0 ? (
                <p className="text-[11px] text-amberwood-500 italic text-center py-2">No entries logged yet</p>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="bg-amberwood-950/20 border border-amberwood-900/15 p-2.5 rounded-xl space-y-1 relative group">
                    <button
                      onClick={() => handleDeleteLog(log.id)}
                      className="absolute top-2 right-2 text-amberwood-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <div className="flex items-center justify-between gap-2 pr-4">
                      <span className="text-[9px] font-bold text-ochre uppercase tracking-wider bg-ochre/10 px-1.5 py-0.5 rounded">
                        {log.mood}
                      </span>
                      <span className="text-[9px] text-amberwood-500 font-mono">{log.date}</span>
                    </div>
                    <p className="text-[11px] text-amberwood-300 leading-relaxed pr-2 break-words">
                      {log.note}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
