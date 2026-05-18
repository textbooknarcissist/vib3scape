/**
 * Sidebar — stub implementation.
 * Replaced in full by Group 6 (src/components/sidebar/Sidebar.tsx).
 * This file exists only so Layout.tsx can compile before Group 6 is built.
 */
interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div aria-hidden={!isOpen} className="p-4 text-[var(--color-fg)]">
      {/* Sidebar contents — built in Group 6 */}
    </div>
  );
}
