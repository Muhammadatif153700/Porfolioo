import React from 'react';
import { InteractiveTerminal } from './InteractiveTerminal';

/**
 * ContactSection — lightweight wrapper that gives the terminal/contact
 * block a proper `id="contact"` anchor and a consistent section boundary.
 */
export function ContactSection() {
  return (
    <div id="contact">
      <InteractiveTerminal />
    </div>
  );
}
