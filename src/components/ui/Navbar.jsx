import React from 'react';

export function Navbar() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between glass-panel rounded-2xl px-6 py-3 border border-[#362319]/15 shadow-sm">
        
        {/* Brand Logo - MA */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1c120c] text-white flex items-center justify-center shadow-md font-serif font-black text-lg group-hover:bg-[#b45309] transition-colors">
            MA
          </div>
          <div>
            <span className="font-serif font-bold text-sm text-[#1c120c] tracking-wide block">
              MUHAMMAD ATIF
            </span>
            <span className="font-mono text-[10px] text-[#b45309] tracking-wider block font-bold">
              FULL STACK SOFTWARE ENGINEER
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono font-bold tracking-wider text-[#2e1c14]">
          <button 
            onClick={() => scrollToSection('projects')} 
            className="hover:text-[#b45309] transition-colors uppercase"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollToSection('experience')} 
            className="hover:text-[#b45309] transition-colors uppercase"
          >
            Experience
          </button>
          <button 
            onClick={() => scrollToSection('tech-matrix')} 
            className="hover:text-[#b45309] transition-colors uppercase"
          >
            Skills
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-[#b45309] transition-colors uppercase"
          >
            Contact
          </button>
        </nav>

        {/* CTA Button */}
        <button
          onClick={() => scrollToSection('contact')}
          className="px-5 py-2.5 rounded-xl bg-[#1c120c] hover:bg-[#362319] text-white text-xs font-mono font-bold tracking-wider transition-all shadow-sm"
        >
          GET IN TOUCH
        </button>
      </div>
    </header>
  );
}
