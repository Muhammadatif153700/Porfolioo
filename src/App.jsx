import React from 'react';
import { Navbar } from './components/ui/Navbar';
import { ProjectsSection } from './components/ui/ProjectsSection';
import { ExperienceSection } from './components/ui/ExperienceSection';
import { TechStackMatrix } from './components/ui/TechStackMatrix';
import { ContactSection } from './components/ui/ContactSection';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-[#1c120c] font-sans antialiased selection:bg-[#b45309] selection:text-white">

      {/* Persistent Navigation Header */}
      <Navbar />

      {/* Main Single-Page Sections */}
      <main className="relative z-10">
        <ProjectsSection />
        <ExperienceSection />
        <TechStackMatrix />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[#362319]/15 text-center font-mono text-xs text-[#5c3d2e] bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold">© {new Date().getFullYear()} MUHAMMAD ATIF • SENIOR FULL STACK ENGINEER</span>
          <span className="text-[#b45309] font-bold">BUILT WITH REACT &amp; TAILWIND CSS</span>
        </div>
      </footer>

    </div>
  );
}
