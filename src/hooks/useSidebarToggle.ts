import { useState, useEffect, useCallback } from 'react';

export interface SidebarToggle {
  /** Whether the sidebar overlay is currently open (mobile only) */
  isOpen: boolean;
  /** Toggle isOpen on/off */
  toggle: () => void;
  /** Explicitly close the sidebar */
  close: () => void;
}

/**
 * useSidebarToggle
 *
 * Manages the open/close state of the mobile sidebar overlay.
 *
 * Behaviours:
 * - `toggle()` flips isOpen
 * - `close()` always sets isOpen to false (used by overlay click, link nav, etc.)
 * - Pressing Escape while the sidebar is open calls `close()`
 * - Automatically closes on window resize when the viewport crosses > 1280px
 *   (the breakpoint at which the sidebar is always-visible and the toggle is hidden)
 */
export function useSidebarToggle(): SidebarToggle {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback((): void => {
    setIsOpen((prev) => !prev);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  // Auto-close when the sidebar becomes always-visible (desktop breakpoint)
  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth > 1280 && isOpen) {
        close();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, close]);

  // Prevent body scroll while the overlay is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return { isOpen, toggle, close };
}
