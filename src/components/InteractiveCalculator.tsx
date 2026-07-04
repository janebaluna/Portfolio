import { useState } from "react";
import { motion } from "motion/react";

export default function InteractiveCalculator() {
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState("");

  const handleButtonClick = (value: string) => {
    if (value === "C") {
      setDisplay("");
      setHistory("");
    } else if (value === "DEL") {
      setDisplay((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      try {
        // Safe standard evaluation using math operators
        if (!display) return;
        // Clean trailing operators to avoid syntax errors
        const sanitized = display.replace(/[^0-9+\-*/.]/g, "");
        // Simple evaluation logic (safe from injections)
        const result = Function(`"use strict"; return (${sanitized})`)();
        setHistory(display + " =");
        setDisplay(Number(result).toLocaleString(undefined, { maximumFractionDigits: 6 }));
      } catch (err) {
        setDisplay("Error");
      }
    } else {
      // Prevent consecutive operators
      const lastChar = display.slice(-1);
      const isOperator = ["+", "-", "*", "/"].includes(value);
      const isLastOperator = ["+", "-", "*", "/"].includes(lastChar);
      
      if (isOperator && isLastOperator) {
        setDisplay((prev) => prev.slice(0, -1) + value);
      } else {
        setDisplay((prev) => prev + value);
      }
    }
  };

  const buttons = [
    { label: "C", action: "C", type: "clear" },
    { label: "⌫", action: "DEL", type: "control" },
    { label: "(", action: "(", type: "control" },
    { label: ")", action: ")", type: "control" },
    { label: "7", action: "7", type: "number" },
    { label: "8", action: "8", type: "number" },
    { label: "9", action: "9", type: "number" },
    { label: "÷", action: "/", type: "operator" },
    { label: "4", action: "4", type: "number" },
    { label: "5", action: "5", type: "number" },
    { label: "6", action: "6", type: "number" },
    { label: "×", action: "*", type: "operator" },
    { label: "1", action: "1", type: "number" },
    { label: "2", action: "2", type: "number" },
    { label: "3", action: "3", type: "number" },
    { label: "−", action: "-", type: "operator" },
    { label: "0", action: "0", type: "number" },
    { label: ".", action: ".", type: "number" },
    { label: "=", action: "=", type: "equals" },
    { label: "+", action: "+", type: "operator" },
  ];

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-amberwood-950 border border-amberwood-900/40 rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-ochre/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-amberwood-600/10 rounded-full blur-xl pointer-events-none" />

      {/* Calculator Header / Aesthetic Logo */}
      <div className="flex justify-between items-center mb-4 px-1">
        <span className="text-[9px] tracking-[0.25em] text-ochre uppercase font-semibold">MAISON CALC.</span>
        <div className="flex space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-900/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-900/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-900/40" />
        </div>
      </div>

      {/* Screen */}
      <div className="mb-6 bg-[#180b07] border border-amberwood-900/40 rounded-2xl p-4 flex flex-col justify-end items-end h-24 text-right overflow-hidden shadow-inner">
        <div className="text-[10px] text-amberwood-400 tracking-wider h-4 font-mono font-light">
          {history}
        </div>
        <div className="text-2xl text-amberwood-100 font-serif font-light truncate w-full mt-1">
          {display || "0"}
        </div>
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        {buttons.map((btn, idx) => {
          let btnClass = "py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 select-none cursor-pointer ";
          if (btn.type === "clear") {
            btnClass += "bg-red-950/40 hover:bg-red-950/60 text-red-300 border border-red-900/30";
          } else if (btn.type === "control") {
            btnClass += "bg-amberwood-900/20 hover:bg-amberwood-900/40 text-amberwood-300 border border-amberwood-900/30";
          } else if (btn.type === "operator") {
            btnClass += "bg-ochre/10 hover:bg-ochre/20 text-ochre border border-ochre/30";
          } else if (btn.type === "equals") {
            btnClass += "bg-ochre text-[#1b0d09] hover:bg-[#834626] hover:text-parchment shadow-md shadow-ochre/10 font-bold";
          } else {
            btnClass += "bg-[#27150e]/60 hover:bg-amberwood-950/60 text-amberwood-100 border border-amberwood-900/20";
          }

          return (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.93 }}
              onClick={() => handleButtonClick(btn.action)}
              className={btnClass}
            >
              {btn.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
