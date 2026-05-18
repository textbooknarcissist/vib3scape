import { useEffect, type RefObject } from 'react';

/**
 * useSidebarLock
 *
 * Replicates the HTML5 UP Editorial sidebar scroll-lock behaviour that was
 * originally implemented in jQuery. Only activates on desktop (> 1280px).
 *
 * Logic (exact parity with the original):
 *   sh = sidebar inner offsetHeight
 *   wh = window innerHeight
 *   x  = Math.max(sh - wh, 0)   → how many px the sidebar overflows the viewport
 *   y  = Math.max(0, scrollY - x) → how far past the overflow point the user has scrolled
 *
 *   When NOT locked:
 *     if y > 0 → lock: position=fixed, top=-x
 *   When locked:
 *     if y <= 0 → unlock: clear position and top
 *     else      → keep locked, update top=-x (handles viewport resize mid-lock)
 *
 * Listeners use { passive: true } so they never block the main thread.
 * All listeners are cleaned up on component unmount.
 */
export function useSidebarLock(innerRef: RefObject<HTMLDivElement | null>): void {
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    let locked = false;

    const calculate = (): void => {
      // Only active on true desktop widths
      if (window.innerWidth <= 1280) {
        if (locked) {
          inner.style.position = '';
          inner.style.top = '';
          locked = false;
        }
        return;
      }

      const sh = inner.offsetHeight;
      const wh = window.innerHeight;
      const x = Math.max(sh - wh, 0);
      const y = Math.max(0, window.scrollY - x);

      if (locked) {
        if (y <= 0) {
          // Scroll back to the top — release the lock
          inner.style.position = '';
          inner.style.top = '';
          locked = false;
        } else {
          // Still locked — keep top updated in case viewport was resized
          inner.style.top = `${-x}px`;
        }
      } else {
        if (y > 0) {
          // User scrolled past the sidebar overflow point — engage lock
          inner.style.position = 'fixed';
          inner.style.top = `${-x}px`;
          locked = true;
        }
      }
    };

    window.addEventListener('scroll', calculate, { passive: true });
    window.addEventListener('resize', calculate, { passive: true });

    // Run once on mount so the initial position is correct
    calculate();

    return () => {
      window.removeEventListener('scroll', calculate);
      window.removeEventListener('resize', calculate);
    };
  }, [innerRef]);
}
