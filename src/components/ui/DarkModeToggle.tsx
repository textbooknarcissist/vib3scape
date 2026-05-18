import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa6';

const STORAGE_KEY = 'vib3scape-theme';

/**
 * DarkModeToggle
 *
 * Reads the current theme from <html>.classList ('dark' present = dark mode).
 * On click: toggles the 'dark' class on <html> and persists the choice to
 * localStorage so main.tsx can restore it on the next page load before React
 * renders (preventing FOUC).
 */
export function DarkModeToggle() {
  // Derive initial state from the class that main.tsx already applied
  const [isDark, setIsDark] = useState<boolean>(
    () => document.documentElement.classList.contains('dark'),
  );

  // Keep local state in sync if something else changes the class (e.g. system
  // preference change while the tab is open)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const toggle = (): void => {
    const next = !isDark;
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEY, 'light');
    }
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className={[
        'p-2 rounded-[var(--border-radius)]',
        'text-[var(--color-fg-light)]',
        'hover:text-[var(--color-fg-bold)]',
        'transition-colors duration-200',
        'min-h-[44px] min-w-[44px]',
        'inline-flex items-center justify-center',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2',
      ].join(' ')}
    >
      {/* Visually hidden label for screen readers */}
      <span className="sr-only">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
      {isDark ? (
        <FaSun aria-hidden="true" className="w-4 h-4" />
      ) : (
        <FaMoon aria-hidden="true" className="w-4 h-4" />
      )}
    </button>
  );
}
