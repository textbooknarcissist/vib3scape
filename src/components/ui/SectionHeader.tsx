import type { ReactNode } from 'react';

interface SectionHeaderProps {
  children: ReactNode;
  /** Optional id used for accessibility anchors */
  id?: string;
  /** Optional extra classes forwarded to the wrapper div */
  className?: string;
}

/**
 * SectionHeader
 *
 * Renders a styled <h2> with Roboto Slab, the accent bottom border, and the
 * mb-8 spacing defined in the masterplan. Wrap in a div with mb-2 as per spec.
 */
export function SectionHeader({ children, id, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-2 ${className}`}>
      <h2
        id={id}
        className={[
          'font-[var(--font-heading)]',
          'text-xl md:text-2xl',
          'font-bold',
          'text-[var(--color-fg-bold)]',
          'border-b-2 border-[var(--color-accent)]',
          'pb-2 mb-8',
          'leading-tight',
        ].join(' ')}
      >
        {children}
      </h2>
    </div>
  );
}
