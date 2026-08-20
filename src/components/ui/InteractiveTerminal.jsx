import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Send, Sparkles, CheckCircle2, User, Mail, MessageSquare, Github } from 'lucide-react';
import { 
  TERMINAL_WELCOME, 
  HELP_OUTPUT, 
  SKILLS_OUTPUT, 
  PROJECTS_OUTPUT, 
  ARCHITECTURE_OUTPUT, 
  EXPERIENCE_OUTPUT, 
  HIRE_EASTER_EGG 
} from '../../data/terminalCommands';
import { playTerminalKeySound, playSelectSound } from '../../utils/soundEffects';

export function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState('terminal');
  const [history, setHistory] = useState([
    { type: 'output', text: TERMINAL_WELCOME }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '', budget: '$10k - $25k' });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    if (activeTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, activeTab]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    playSelectSound();

    const newHistory = [...history, { type: 'input', text: `atif@architect:~$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'output', text: HELP_OUTPUT });
        break;
      case 'skills':
        newHistory.push({ type: 'output', text: SKILLS_OUTPUT });
        break;
      case 'projects':
      case 'projects --detail':
        newHistory.push({ type: 'output', text: PROJECTS_OUTPUT });
        break;
      case 'architecture':
        newHistory.push({ type: 'output', text: ARCHITECTURE_OUTPUT });
        break;
      case 'experience':
        newHistory.push({ type: 'output', text: EXPERIENCE_OUTPUT });
        break;
      case 'github':
        newHistory.push({ type: 'output', text: "GitHub Profile: https://github.com/muhammadatif\nRepositories: https://github.com/muhammadatif?tab=repositories" });
        break;
      case 'contact':
        newHistory.push({ type: 'output', text: "Email: muhammad.atif@example.com\nGitHub: https://github.com/muhammadatif\nLinkedIn: https://linkedin.com/in/muhammadatif" });
        break;
      case 'sudo hire':
        newHistory.push({ type: 'output', text: HIRE_EASTER_EGG });
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        newHistory.push({ type: 'output', text: `Command not recognized: '${cmd}'. Type 'help' for reference.` });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    playSelectSound();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '', budget: '$10k - $25k' });
    }, 5000);
  };

  return (
    <section id="terminal-contact" className="relative z-20 w-full py-24 px-6 bg-[#faf8f5]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#b45309]/10 border border-[#b45309]/30 text-[#b45309] font-mono text-xs mb-3 font-bold">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>INTERACTIVE CLI & CONTACT PROTOCOL • MUHAMMAD ATIF</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#1c120c] tracking-tight">
            Initiate <span className="text-gradient-amber">Communication</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm text-[#4a3225] font-sans font-medium mt-3">
            Execute terminal commands to inspect system logs or submit project proposals directly to Muhammad Atif's inbox.
          </p>
        </div>

        {/* Outer Terminal Chassis */}
        <div className="glass-panel bg-white rounded-3xl border border-[#362319]/20 overflow-hidden shadow-[0_15px_40px_rgba(28,18,12,0.08)]">
          
          {/* Terminal Window Header Bar */}
          <div className="bg-[#1c120c] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="font-mono text-xs text-amber-200 ml-2 font-medium">
                atif@architect: ~/muhammad-atif
              </span>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  playSelectSound();
                  setActiveTab('terminal');
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                  activeTab === 'terminal'
                    ? 'bg-[#b45309] text-white font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                [CLI TERMINAL]
              </button>
              <button
                onClick={() => {
                  playSelectSound();
                  setActiveTab('contact');
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                  activeTab === 'contact'
                    ? 'bg-[#b45309] text-white font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                [VISUAL FORM]
              </button>
            </div>
          </div>

          {/* Mode 1: Terminal View */}
          {activeTab === 'terminal' && (
            <div className="p-6 font-mono text-xs md:text-sm bg-[#1c120c] text-amber-300 min-h-[380px] max-h-[500px] overflow-y-auto flex flex-col justify-between">
              <div className="space-y-3">
                {history.map((item, idx) => (
                  <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                    {item.type === 'input' ? (
                      <span className="text-white font-bold">{item.text}</span>
                    ) : (
                      <span className="text-slate-300">{item.text}</span>
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              <form onSubmit={handleCommandSubmit} className="mt-4 pt-4 border-t border-white/10 flex items-center space-x-2">
                <span className="text-amber-400 font-bold shrink-0">atif@architect:~$</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => {
                    playTerminalKeySound();
                    setInputVal(e.target.value);
                  }}
                  placeholder="type 'help', 'skills', 'github', 'sudo hire'..."
                  className="w-full bg-transparent text-white focus:outline-none font-mono text-xs md:text-sm placeholder:text-slate-500"
                />
                <button type="submit" className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/40 text-amber-300">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Mode 2: Contact Form View */}
          {activeTab === 'contact' && (
            <div className="p-8 bg-white font-sans">
              {formSent ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#b45309]/10 text-[#b45309] flex items-center justify-center border border-[#b45309]/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-[#1c120c]">
                    Transmission Dispatched Successfully!
                  </h3>
                  <p className="text-sm text-[#4a3225] max-w-md mx-auto font-mono font-medium">
                    Thank you. Muhammad Atif will review your architecture requirements and respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs text-[#5c3d2e] mb-2 uppercase font-bold">
                        YOUR NAME
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Engineering Lead"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf8f5] border border-[#362319]/20 text-[#1c120c] font-sans text-sm focus:outline-none focus:border-[#b45309]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-[#5c3d2e] mb-2 uppercase font-bold">
                        YOUR EMAIL
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@techcorp.io"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf8f5] border border-[#362319]/20 text-[#1c120c] font-sans text-sm focus:outline-none focus:border-[#b45309]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#5c3d2e] mb-2 uppercase font-bold">
                      PROJECT SCOPE & SYSTEM REQUIREMENTS FOR MUHAMMAD ATIF
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hi Atif, we are launching a high-scale WebGL/Microservice platform and would like to discuss leadership..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#faf8f5] border border-[#362319]/20 text-[#1c120c] font-sans text-sm focus:outline-none focus:border-[#b45309]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-[#362319]/15">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs text-[#5c3d2e] font-medium">
                        RESPONSE SLA: <strong className="text-[#b45309]">&lt; 24 HOURS</strong>
                      </span>
                      <a
                        href="https://github.com/muhammadatif"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#faf8f5] border border-[#362319]/20 text-xs font-mono text-[#1c120c] font-bold hover:bg-[#362319] hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub Profile</span>
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="px-8 py-3 rounded-xl bg-[#1c120c] hover:bg-[#362319] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-md"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>TRANSMIT PROPOSAL</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
