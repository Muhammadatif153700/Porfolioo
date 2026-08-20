import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { playSelectSound } from '../../utils/soundEffects';

export function HeroSection({ onSelectCategory, hoveredCategory, setHoveredCategory }) {
  return (
    <section id="3d-carousel" className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 overflow-hidden pointer-events-none">
      
      {/* Giant Background Typography Watermark - Dark Brown on White */}
      <div className="absolute inset-0 flex flex-col justify-center items-center select-none opacity-[0.05] pointer-events-none overflow-hidden">
        <h1 className="font-serif font-black text-[12vw] leading-none text-center whitespace-nowrap uppercase tracking-tighter text-[#1c120c]">
          MUHAMMAD
        </h1>
        <h2 className="font-sans font-extrabold text-[14vw] leading-none text-center whitespace-nowrap uppercase tracking-widest text-[#b45309]">
          ATIF
        </h2>
      </div>

      {/* Hero Headline Overlay Top */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mt-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#b45309]/10 border border-[#b45309]/30 backdrop-blur-md mb-4 pointer-events-auto shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#b45309] animate-pulse" />
          <span className="font-mono text-xs text-[#b45309] font-bold tracking-wider uppercase">
            Muhammad Atif • Senior Full Stack Engineer & System Architect
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-[#1c120c] mb-3">
          Architecting High-Scale <span className="text-gradient">Distributed Systems</span> & <span className="text-gradient-amber">WebGL Engines</span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm md:text-base text-[#4a3225] font-sans font-medium leading-relaxed">
          Full Stack Software Engineer building sub-millisecond cloud microservices, 60 FPS 3D canvas platforms, and fault-tolerant event-driven pipelines.
        </p>
      </div>

      {/* Floating Center Hint Badge */}
      <div className="relative z-10 my-auto text-center pointer-events-none">
        <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-2xl bg-white/90 border border-[#362319]/20 backdrop-blur-xl shadow-xl pointer-events-auto transition-transform hover:scale-105">
          <div className="w-5 h-5 rounded-full border-2 border-[#b45309] border-t-transparent animate-spin" />
          <span className="font-mono text-xs text-[#1c120c] font-bold tracking-widest uppercase">
            DRAG TO ROTATE 3D RING • CLICK CARD TO EXPLORE
          </span>
        </div>
      </div>

      {/* Bottom Category Selector Bar */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pointer-events-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map((cat, i) => {
            const isHovered = hoveredCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playSelectSound();
                  onSelectCategory(cat);
                }}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-300 glass-panel-hover flex flex-col justify-between ${
                  isHovered
                    ? 'bg-white/95 border-[#b45309]/60 shadow-[0_10px_30px_rgba(180,83,9,0.2)]'
                    : 'bg-white/70 border-[#362319]/15'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[#5c3d2e] font-bold">
                    0{i + 1}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
                <span className="font-sans font-bold text-xs text-[#1c120c] tracking-wide uppercase line-clamp-1">
                  {cat.title}
                </span>
                <span className="font-mono text-[10px] text-[#5c3d2e] mt-1 line-clamp-1 font-medium">
                  {cat.stats[0].label}: <strong className="text-[#1c120c]">{cat.stats[0].value}</strong>
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
}
