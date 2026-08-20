import React from 'react';
import { X, Network, Cpu, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import { playSelectSound } from '../../utils/soundEffects';

export function ArchitectureDocModal({ project, onClose }) {
  if (!project) return null;

  const arch = project.architecture;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel bg-white/95 rounded-3xl border border-[#362319]/20 p-6 md:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={() => {
            playSelectSound();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-black/5 hover:bg-black/10 text-[#1c120c] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-2xl bg-[#b45309]/10 border border-[#b45309]/30 text-[#b45309]">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-xs text-[#b45309] tracking-wider font-bold uppercase">
              SYSTEM ARCHITECTURE SPECIFICATION BY MUHAMMAD ATIF
            </span>
            <h2 className="text-2xl font-bold font-serif text-[#1c120c]">
              {project.title}
            </h2>
          </div>
        </div>

        <p className="text-sm text-[#4a3225] mb-6 font-sans leading-relaxed font-medium">
          {arch?.overview || project.longDescription}
        </p>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#faf8f5] border border-[#362319]/15 mb-8 font-mono text-xs shadow-xs">
          <div>
            <span className="text-[#5c3d2e] block text-[10px] uppercase font-bold">Throughput SLA</span>
            <strong className="text-[#b45309] text-sm font-bold">{project.stats?.throughput || project.stats?.requests || "100k QPS"}</strong>
          </div>
          <div>
            <span className="text-[#5c3d2e] block text-[10px] uppercase font-bold">Latency Target</span>
            <strong className="text-[#c2410c] text-sm font-bold">{project.stats?.latency || project.stats?.p99Latency || "< 10ms"}</strong>
          </div>
          <div>
            <span className="text-[#5c3d2e] block text-[10px] uppercase font-bold">Target Uptime</span>
            <strong className="text-[#1c120c] text-sm font-bold">99.999% SLA</strong>
          </div>
        </div>

        {/* Architecture Visual Topology Diagram */}
        <div className="mb-8 p-6 rounded-2xl bg-[#1c120c] text-white border border-[#362319]/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
            <Cpu className="w-32 h-32 text-[#b45309]" />
          </div>

          <h3 className="font-mono text-xs text-amber-400 font-bold tracking-wider uppercase mb-4 flex items-center">
            <Activity className="w-4 h-4 mr-2 text-amber-400" />
            MICROSERVICE DATA FLOW & NODE GRAPH
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative z-10">
            {arch?.components?.map((comp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs flex items-center justify-center font-bold">
                      0{idx + 1}
                    </span>
                    {idx < arch.components.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-500 hidden md:block" />
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1">
                    {comp.name}
                  </h4>
                </div>
                <p className="font-mono text-[11px] text-amber-300 bg-amber-950/40 p-2 rounded-lg border border-amber-800/40">
                  {comp.tech}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Architectural Principles */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs text-[#5c3d2e] uppercase tracking-wider font-bold">
            KEY ARCHITECTURAL HIGHLIGHTS
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#2e1c14] font-sans font-medium">
            <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-[#faf8f5] border border-[#362319]/15">
              <CheckCircle2 className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
              <span>Event-Driven Decoupled Messaging via Apache Kafka / NATS.</span>
            </div>
            <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-[#faf8f5] border border-[#362319]/15">
              <CheckCircle2 className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
              <span>Sliding window Redis memory rate limiting & mTLS security.</span>
            </div>
            <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-[#faf8f5] border border-[#362319]/15">
              <CheckCircle2 className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
              <span>Auto-healing Kubernetes deployment with horizontal pod autoscaling.</span>
            </div>
            <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-[#faf8f5] border border-[#362319]/15">
              <CheckCircle2 className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
              <span>Immutable event store logs with CQRS read/write segregation.</span>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="mt-8 pt-4 border-t border-[#362319]/15 flex justify-end">
          <button
            onClick={() => {
              playSelectSound();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#1c120c] hover:bg-[#362319] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            CLOSE BLUEPRINT
          </button>
        </div>

      </div>
    </div>
  );
}
