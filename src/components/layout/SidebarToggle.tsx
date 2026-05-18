import { FaBars, FaXmark } from 'react-icons/fa6';

interface SidebarToggleProps {
  isOpen: boolean;
  toggle: () => void;
}

/**
 * SidebarToggle
 *
 * Rendered inside the Sidebar div as an absolutely-positioned element so it
 * slides with the sidebar during the translateX transition on mobile.
 * Positioned at top:0, right:-44px — visually outside the sidebar's right edge.
 *
 * Visible only on screens ≤ 1280px (hidden on xl+ where the sidebar is always shown).
 */
export function SidebarToggle({ isOpen, toggle }: SidebarToggleProps) {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle navigation"
      aria-expanded={isOpen}
      aria-controls="sidebar"
      className={[
        // Positioning — slides with the sidebar
        'absolute top-0 right-[-44px] z-50',
        // Size — 44×44px minimum touch target
        'w-[44px] h-[44px]',
        // Appearance
        'flex items-center justify-center',
        'bg-[var(--color-bg-alt)]',
        'border-r border-b border-[var(--color-border)]',
        'text-[var(--color-fg-bold)]',
        'transition-colors duration-200',
        'hover:text-[var(--color-accent)]',
        // Only visible on mobile (hidden at xl where sidebar is always shown)
        'xl:hidden',
        // Focus
        'focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-[-2px]',
      ].join(' ')}
    >
      <span className="sr-only">{isOpen ? 'Close navigation' : 'Open navigation'}</span>
      {isOpen ? (
        <FaXmark aria-hidden="true" className="w-5 h-5" />
      ) : (
        <FaBars aria-hidden="true" className="w-5 h-5" />
      )}
    </button>
  );
}
