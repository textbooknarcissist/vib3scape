import { useRef } from 'react';
import { SearchBox } from './SearchBox';
import { NavMenu } from './NavMenu';
import { MiniPosts } from './MiniPosts';
import { ContactInfo } from './ContactInfo';
import { SidebarToggle } from '../layout/SidebarToggle';
import { useSidebarLock } from '@/hooks/useSidebarLock';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

/**
 * Sidebar
 *
 * Full sidebar container that aggregates:
 * 1. SearchBox
 * 2. NavMenu
 * 3. MiniPosts (titled "Recent Posts")
 * 4. ContactInfo (titled "Get in Touch")
 * 5. Copyright line
 *
 * It uses the useSidebarLock hook on its inner container to lock sidebar scrolling
 * when the content exceeds the viewport on desktop screens (>1280px).
 * On mobile/tablet (≤ 1280px), the inner container takes full-height, scroll-y,
 * and includes the absolutely positioned SidebarToggle button that slides out with it.
 */
export function Sidebar({ isOpen, toggle, close }: SidebarProps) {
  const innerRef = useRef<HTMLDivElement | null>(null);

  // Apply desktop scroll-locking behavior
  useSidebarLock(innerRef);

  return (
    <div
      className="relative h-full w-full flex flex-col bg-[var(--color-bg-alt)] border-r border-[var(--color-border)] select-none"
      id="sidebar-container"
    >
      {/* Absolute Toggle Button for mobile overlay (slides with sidebar) */}
      <SidebarToggle isOpen={isOpen} toggle={toggle} />

      <div
        ref={innerRef}
        className={[
          'w-full flex flex-col',
          'px-6 py-8 md:px-8',
          // Mobile/tablet overlay scroll setup
          'xl:h-auto overflow-y-auto xl:overflow-y-visible',
          'h-full',
        ].join(' ')}
      >
        {/* Search section */}
        <section className="mb-8" aria-label="Search">
          <SearchBox />
        </section>

        {/* Navigation menu */}
        <nav className="mb-8 border-t border-[var(--color-border)] py-4" aria-label="Main navigation">
          <NavMenu isSidebarOpen={isOpen} closeSidebar={close} />
        </nav>

        {/* Recent Posts widget */}
        <section className="mb-8 border-t border-[var(--color-border)] pt-8" aria-labelledby="mini-posts-title">
          <h2 id="mini-posts-title" className="font-[var(--font-heading)] text-sm font-bold uppercase tracking-wider text-[var(--color-fg-bold)] mb-6">
            Recent Posts
          </h2>
          <MiniPosts closeSidebar={close} />
        </section>

        {/* Contact info */}
        <section className="mb-8 border-t border-[var(--color-border)] pt-8" aria-labelledby="contact-info-title">
          <h2 id="contact-info-title" className="font-[var(--font-heading)] text-sm font-bold uppercase tracking-wider text-[var(--color-fg-bold)] mb-4">
            Get in Touch
          </h2>
          <ContactInfo />
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-[var(--color-border)] pt-8 text-xs text-[var(--color-fg-light)]">
          <p>© 2025 Vib3scape. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
