import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { playSelectSound } from '../../utils/soundEffects';

export function ProjectReel({ category, onBackToRing, onOpenArchDoc }) {
  if (!category) return null;

  const categoryProjects = PROJECTS.filter(
    (p) => p.categoryId === category.id
  );

  return (
    <section className="relative z-20 w-full min-h-screen pt-28 pb-20 px-6 max-w-6xl mx-auto animate-fade-in">
      
      {/* Category Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-[#362319]/15">
        <button
          onClick={() => {
            playSelectSound();
            onBackToRing();
          }}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-white border border-[#362319]/20 hover:bg-[#faf8f5] text-xs font-mono text-[#1c120c] transition-all group shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-[#b45309] group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-wider font-bold">RETURN TO 3D RING</span>
        </button>

        <div className="flex items-center space-x-3">
          <span
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: category.color }}
          />
          <span className="font-mono text-xs text-[#5c3d2e] uppercase tracking-widest font-semibold">
            CATEGORY: <strong className="text-[#1c120c]">{category.title}</strong>
          </span>
        </div>
      </div>

      {/* Big Bold Category Title Header */}
      <div className="mb-12 text-center md:text-left relative">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#b45309]/10 border border-[#b45309]/30 text-[11px] font-mono text-[#b45309] font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION SYSTEMS REEL • MUHAMMAD ATIF</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold font-serif text-[#1c120c] tracking-tight mb-4">
          {category.title}
        </h2>
        
        <p className="max-w-2xl text-base text-[#4a3225] font-sans font-medium leading-relaxed">
          {category.description}
        </p>

        {/* Category Key Stats Bar */}
        <div className="grid grid-cols-3 gap-3 max-w-xl mt-6 p-4 rounded-2xl bg-white/90 border border-[#362319]/15 font-mono text-xs shadow-sm">
          {category.stats.map((st, i) => (
            <div key={i} className="text-center md:text-left">
              <span className="text-[10px] text-[#5c3d2e] block uppercase font-semibold">{st.label}</span>
              <strong className="text-sm font-bold" style={{ color: category.color }}>
                {st.value}
              </strong>
            </div>
          ))}
        </div>
      </div>

      {/* Vertical Infinite Scroll Project Cards Reel */}
      <div className="space-y-12">
        {categoryProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenArchDoc={onOpenArchDoc}
          />
        ))}

        {categoryProjects.length === 0 && (
          <div className="p-12 rounded-3xl glass-panel text-center text-[#5c3d2e] font-mono text-sm">
            No projects loaded for this view yet. Check back soon!
          </div>
        )}
      </div>

    </section>
  );
}
