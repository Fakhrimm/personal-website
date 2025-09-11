// main.ts
// main.ts
console.log('🚀 main.ts is loaded and running!');

import './style.css';
import { initNavbarScrollBehavior } from './script/navbar';

// Your existing theme toggle function
declare global {
  interface Window {
    toggleTheme: (checkbox: HTMLInputElement) => void;
  }
}

window.toggleTheme = (checkbox: HTMLInputElement) => {
  // Change 'light' to 'emerald' to match your CSS theme name
  const theme = checkbox.checked ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
};

// Initialize navbar behavior when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize with default config
  const cleanupNavbar = initNavbarScrollBehavior();

  // Or with custom config
  // const cleanupNavbar = initNavbarScrollBehavior({
  //   scrollThreshold: 150,
  //   navbarId: 'navbar'
  // });

  // Optional: Clean up on page unload
  window.addEventListener('beforeunload', cleanupNavbar);
});
