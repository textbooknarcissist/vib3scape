import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';

interface NavMenuProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

interface NavMenuItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavMenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  {
    label: 'Topics',
    children: [
      { label: 'React', href: '/blog?tag=React' },
      { label: 'TypeScript', href: '/blog?tag=TypeScript' },
      { label: 'CSS', href: '/blog?tag=CSS' },
      { label: 'Career', href: '/blog?tag=Career' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function NavMenu({ isSidebarOpen, closeSidebar }: NavMenuProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Reset expanded submenus when the mobile sidebar is closed
  useEffect(() => {
    if (!isSidebarOpen) {
      setOpenSubmenu(null);
    }
  }, [isSidebarOpen]);

  const handleSubmenuToggle = (label: string): void => {
    const nextOpen = openSubmenu === label ? null : label;
    setOpenSubmenu(nextOpen);

    // Dispatch resize event to trigger useSidebarLock recalculations
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 150); // Small delay to let heights calculate after rendering
  };

  return (
    <ul className="flex flex-col w-full text-sm font-medium">
      {navItems.map((item) => {
        const hasChildren = !!item.children;

        if (hasChildren) {
          const isOpen = openSubmenu === item.label;

          return (
            <li key={item.label} className="border-b border-[var(--color-border)] last:border-0">
              <button
                type="button"
                onClick={() => handleSubmenuToggle(item.label)}
                aria-expanded={isOpen}
                aria-controls={`submenu-${item.label}`}
                className={[
                  'w-full min-h-[44px] flex items-center justify-between py-3 px-4',
                  'text-[var(--color-fg-bold)] hover:bg-[var(--color-border)] transition-colors duration-200',
                  'focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-[-2px]',
                ].join(' ')}
              >
                <span>{item.label}</span>
                <FaChevronDown
                  className={[
                    'w-3.5 h-3.5 text-[var(--color-fg-light)] transition-transform duration-200',
                    isOpen ? 'rotate-180 text-[var(--color-accent)]' : '',
                  ].join(' ')}
                  aria-hidden="true"
                />
              </button>

              {/* Submenu links */}
              <div
                id={`submenu-${item.label}`}
                className={[
                  'overflow-hidden transition-all duration-200 ease-in-out',
                  isOpen ? 'max-h-60 opacity-100 py-1 bg-[var(--color-border)]/20' : 'max-h-0 opacity-0 pointer-events-none',
                ].join(' ')}
              >
                <ul className="flex flex-col">
                  {item.children?.map((child) => (
                    <li key={child.label}>
                      <NavLink
                        to={child.href}
                        onClick={closeSidebar}
                        className={({ isActive }) => [
                          'w-full min-h-[40px] flex items-center pl-8 pr-4 py-2',
                          'transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-[-2px]',
                          isActive
                            ? 'text-[var(--color-accent)] font-semibold'
                            : 'text-[var(--color-fg)] hover:text-[var(--color-accent)]',
                        ].join(' ')}
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        }

        // Standard Top-Level Navigation Link
        return (
          <li key={item.label} className="border-b border-[var(--color-border)] last:border-0">
            <NavLink
              to={item.href || ''}
              onClick={closeSidebar}
              className={({ isActive }) => [
                'w-full min-h-[44px] flex items-center px-4 py-3',
                'transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-[-2px]',
                isActive
                  ? 'text-[var(--color-accent)] bg-[var(--color-border)]/30 font-semibold'
                  : 'text-[var(--color-fg-bold)] hover:bg-[var(--color-border)]',
              ].join(' ')}
            >
              {item.label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
