import React, { useState } from 'react';
import { TECH_STACK, SYSTEM_METRICS } from '../../data/techStack';
import { Cpu, Code2, Activity } from 'lucide-react';
import { playHoverSound, playSelectSound } from '../../utils/soundEffects';

export function TechStackMatrix() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="tech-matrix" className="relative z-20 w-full py-24 px-6 bg-[#faf8f5] border-t border-b border-[#362319]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#b45309]/10 border border-[#b45309]/30 text-[#b45309] font-mono text-xs mb-3 font-bold">
              <Cpu className="w-3.5 h-3.5" />
              <span>CORE TECHNICAL STACK</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#1c120c] tracking-tight">
              Full Stack <span className="text-gradient">Engineering Matrix</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#4a3225] font-sans font-medium mt-3 md:mt-0">
            Battle-tested architecture tools, languages, and distributed systems technologies leveraged by Muhammad Atif.
          </p>
        </div>

        {/* System Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {SYSTEM_METRICS.map((metric, idx) => (
            <div
              key={idx}
              onMouseEnter={playHoverSound}
              className="p-5 rounded-2xl glass-panel bg-white/90 border border-[#362319]/15 hover:border-[#b45309]/40 transition-all group shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-[#5c3d2e] uppercase tracking-wider font-bold">{metric.label}</span>
                <Activity className="w-4 h-4 text-[#b45309] group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl md:text-3xl font-bold font-mono text-[#1c120c] mb-1">
                {metric.value}
              </div>
              <p className="text-[11px] text-[#5c3d2e] font-sans font-medium">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {TECH_STACK.map((group, idx) => (
            <button
              key={idx}
              onClick={() => {
                playSelectSound();
                setActiveTab(idx);
              }}
              className={`px-5 py-3 rounded-2xl font-mono text-xs font-bold whitespace-nowrap transition-all border ${
                activeTab === idx
                  ? 'bg-[#1c120c] text-white border-[#1c120c] shadow-md scale-102'
                  : 'bg-white text-[#1c120c] border-[#362319]/15 hover:bg-[#faf8f5]'
              }`}
            >
              {group.category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TECH_STACK[activeTab].tools.map((tool, i) => (
            <div
              key={i}
              onMouseEnter={playHoverSound}
              className="p-5 rounded-2xl glass-panel bg-white/90 border border-[#362319]/15 hover:border-[#b45309]/50 hover:bg-white transition-all flex flex-col justify-between group shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="p-2 rounded-xl bg-[#faf8f5] border border-[#362319]/15 text-[#b45309] group-hover:bg-[#b45309]/10 group-hover:border-[#b45309]/30 transition-colors">
                    <Code2 className="w-5 h-5" />
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#b45309]/10 text-[#b45309] border border-[#b45309]/30 font-bold">
                    {tool.level}
                  </span>
                </div>
                <h4 className="font-bold text-base text-[#1c120c] mb-1 font-sans">
                  {tool.name}
                </h4>
              </div>
              <div className="mt-4 pt-3 border-t border-[#362319]/10 flex items-center justify-between text-xs font-mono text-[#5c3d2e] font-medium">
                <span>EXP:</span>
                <strong className="text-[#1c120c] font-bold">{tool.experience}</strong>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
