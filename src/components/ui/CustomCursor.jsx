import React, { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      const clickable = target.closest('button, a, input, textarea, [role="button"], canvas');
      setIsPointer(!!clickable);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Outer ring cursor */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full border border-[#b45309]/80 transition-transform duration-150 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block ${
          isPointer ? 'w-12 h-12 bg-[#b45309]/15 border-[#b45309]' : 'w-8 h-8'
        } ${isMouseDown ? 'scale-75 bg-[#b45309]/30' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Inner glow dot */}
      <div
        className="fixed pointer-events-none z-50 w-2 h-2 bg-[#b45309] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(180,83,9,0.8)] hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
