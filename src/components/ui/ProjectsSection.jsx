import React, { useState } from 'react';
import { HeroSection } from './HeroSection';
import { ProjectReel } from './ProjectReel';
import { ArchitectureDocModal } from './ArchitectureDocModal';

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [archDocProject, setArchDocProject] = useState(null);

  return (
    <>
      {/* Hero + 3D Ring + Category Selector */}
      <div id="projects" className="relative">
        <HeroSection
          onSelectCategory={setSelectedCategory}
          hoveredCategory={hoveredCategory}
          setHoveredCategory={setHoveredCategory}
        />

        {/* Project Reel — slides in below hero when a category is selected */}
        {selectedCategory && (
          <div className="relative z-20 bg-[#faf8f5] border-t border-[#362319]/15">
            <ProjectReel
              category={selectedCategory}
              onBackToRing={() => setSelectedCategory(null)}
              onOpenArchDoc={(project) => setArchDocProject(project)}
            />
          </div>
        )}
      </div>

      {/* Architecture Blueprint Modal — rendered above everything */}
      {archDocProject && (
        <ArchitectureDocModal
          project={archDocProject}
          onClose={() => setArchDocProject(null)}
        />
      )}
    </>
  );
}
