import React, { useState } from 'react';
import { ExternalLink, Github, FileCode, Cpu, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { playHoverSound, playSelectSound } from '../../utils/soundEffects';

export function ProjectCard({ project, onOpenArchDoc }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        playHoverSound();
      }}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl transition-all duration-300 transform-gpu perspective-1000"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <div className={`glass-panel rounded-3xl p-6 md:p-8 border transition-all duration-500 ${
        isHovered
          ? 'border-[#b45309]/60 shadow-[0_15px_40px_rgba(180,83,9,0.15)] bg-white/95'
          : 'border-[#362319]/15 bg-white/80'
      }`}>
        
        {/* Card Header & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-[#b45309]/10 text-[#b45309] border border-[#b45309]/30 font-bold">
            {project.type}
          </span>
          <div className="flex items-center space-x-3 text-xs font-mono text-[#5c3d2e]">
            {Object.entries(project.stats || {}).slice(0, 2).map(([key, val], idx) => (
              <span key={idx} className="bg-[#faf8f5] px-2.5 py-1 rounded-lg border border-[#362319]/10">
                <strong className="text-[#1c120c] font-bold">{val}</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Visual Mockup Preview */}
        <div className="relative w-full h-56 md:h-64 rounded-2xl overflow-hidden bg-[#1c120c] border border-[#362319]/20 mb-6 group-hover:border-[#b45309]/50 transition-colors">
          {project.visualType === 'dashboard' && (
            <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-[#1c120c] via-[#2e1c14] to-[#4a3225]">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-[10px] text-amber-300 font-semibold">LIVE TELEMETRY • MUHAMMAD ATIF</span>
              </div>
              <div className="grid grid-cols-3 gap-2 my-2">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block font-mono">CPU LOAD</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">24.2%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block font-mono">MEMORY</span>
                  <span className="font-mono font-bold text-orange-300 text-sm">4.1 GB</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block font-mono">THROUGHPUT</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">52.4k QPS</span>
                </div>
              </div>
              <div className="h-20 w-full flex items-end justify-between gap-1 pt-2">
                {[40, 65, 30, 85, 95, 45, 70, 80, 60, 90, 100, 75, 85, 50, 95].map((h, i) => (
                  <div
                    key={i}
                    className="w-full bg-[#d97706]/50 rounded-t transition-all group-hover:bg-[#f59e0b]"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          )}

          {project.visualType === 'canvas3d' && (
            <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-[#1c120c] via-[#362319] to-[#1c120c] relative">
              <div className="absolute inset-0 bg-grid-pattern-light opacity-20" />
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-mono text-[10px] text-amber-400 font-bold">WebGPU SHADER CANVAS</span>
                <span className="font-mono text-[10px] text-slate-300">CRDT SYNC ACTIVE</span>
              </div>
              <div className="relative z-10 my-auto text-center">
                <div className="w-20 h-20 mx-auto rounded-3xl border-2 border-amber-500/60 animate-spin-slow flex items-center justify-center bg-amber-500/10 shadow-[0_0_30px_rgba(217,119,6,0.3)]">
                  <Cpu className="w-10 h-10 text-amber-400" />
                </div>
              </div>
              <div className="relative z-10 flex justify-between font-mono text-[10px] text-slate-300">
                <span>FPS: 60</span>
                <span>DRAW CALLS: 12</span>
              </div>
            </div>
          )}

          {project.visualType === 'terminal' && (
            <div className="w-full h-full p-4 font-mono text-xs text-amber-300 bg-[#1c120c] flex flex-col justify-between">
              <div className="flex items-center space-x-2 text-slate-400 border-b border-white/10 pb-2 text-[10px]">
                <TerminalIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>atif-gateway@prod-node-01:~$</span>
              </div>
              <div className="space-y-1 my-2 text-[11px]">
                <p className="text-slate-200">&gt; aegis --init --cluster-mode=multi-az</p>
                <p className="text-amber-400">[OK] Redis Sentinel ring synchronized.</p>
                <p className="text-emerald-400">[OK] mTLS handshake complete. 15,000,000 req/day ready.</p>
                <p className="text-orange-300">[METRIC] P99 Latency: 2.38ms | Error Rate: 0.0001%</p>
              </div>
              <div className="flex items-center space-x-1 text-slate-400 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>LISTENING ON PORT 443</span>
              </div>
            </div>
          )}

          {project.visualType === 'architecture' && (
            <div className="w-full h-full p-4 bg-gradient-to-br from-[#1c120c] via-[#2e1c14] to-[#1c120c] flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="font-mono text-[10px] text-amber-400 font-bold">EVENT STREAMING TOPOLOGY</span>
                <span className="font-mono text-[10px] text-emerald-400">100k events/sec</span>
              </div>
              <div className="grid grid-cols-3 gap-2 my-auto">
                <div className="p-2 rounded-xl bg-white/5 border border-amber-500/30 text-center font-mono text-[10px] text-white">
                  KAFKA CLUSTER
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-orange-500/30 text-center font-mono text-[10px] text-white">
                  FLINK AGGREGATOR
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-emerald-500/30 text-center font-mono text-[10px] text-white">
                  POSTGRES STORE
                </div>
              </div>
              <div className="text-center font-mono text-[10px] text-slate-400">
                CQRS Append-Only Ledger
              </div>
            </div>
          )}

          {project.visualType === 'timeline' && (
            <div className="w-full h-full p-4 bg-gradient-to-br from-[#1c120c] via-[#362319] to-[#2e1c14] flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="font-mono text-[10px] text-amber-400 font-bold">MUHAMMAD ATIF ROADMAP</span>
                <span className="font-mono text-[10px] text-slate-300">2018 - PRESENT</span>
              </div>
              <div className="space-y-2 my-auto">
                <div className="p-2 rounded-xl bg-white/5 border border-amber-500/30 flex justify-between items-center text-xs text-white">
                  <span>Lead Systems Architect @ CloudCore</span>
                  <span className="font-mono text-[10px] text-amber-300">2022+</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center text-xs text-slate-300">
                  <span>Senior Full Stack Eng @ Veloce</span>
                  <span className="font-mono text-[10px] text-slate-400">2020 - 2022</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Title & Description */}
        <h3 className="text-2xl font-bold font-serif text-[#1c120c] mb-2 group-hover:text-[#b45309] transition-colors">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-[#b45309] mb-3 font-semibold">
          {project.tagline}
        </p>
        <p className="text-sm text-[#4a3225] font-sans mb-6 leading-relaxed font-medium">
          {project.description}
        </p>

        {/* Live Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-[#faf8f5] border border-[#362319]/15 text-[#2e1c14] text-xs font-mono font-semibold group-hover:border-[#b45309]/40 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons with Real GitHub & Demo Links */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#362319]/15">
          <div className="flex items-center space-x-3">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => playSelectSound()}
              className="px-4 py-2 rounded-xl bg-[#1c120c] hover:bg-[#362319] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Live Demo</span>
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => playSelectSound()}
              className="px-3 py-2 rounded-xl bg-[#faf8f5] hover:bg-white text-[#1c120c] border border-[#362319]/20 font-mono text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-xs"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4 text-[#b45309]" />
              <span className="hidden sm:inline">GitHub Repo</span>
            </a>
          </div>

          <button
            onClick={() => {
              playSelectSound();
              onOpenArchDoc(project);
            }}
            className="px-3 py-2 rounded-xl bg-[#faf8f5] hover:bg-white border border-[#362319]/20 text-[#1c120c] text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors"
          >
            <FileCode className="w-3.5 h-3.5 text-[#b45309]" />
            <span>Architecture Doc</span>
          </button>
        </div>

      </div>
    </div>
  );
}
