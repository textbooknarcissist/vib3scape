import { Link } from 'react-router-dom';

interface TagChipProps {
  label: string;
  /** If provided the chip is wrapped in a <Link> to this path */
  href?: string;
}

const chipClasses =
  'inline-flex items-center text-xs px-2.5 py-0.5 rounded-full ' +
  'bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] ' +
  'text-[var(--color-accent)] ' +
  'border border-[color-mix(in_srgb,var(--color-accent)_20%,transparent)] ' +
  'font-medium transition-transform duration-150 hover:scale-105 ' +
  'min-h-[24px] select-none';

export function TagChip({ label, href }: TagChipProps) {
  if (href) {
    return (
      <Link
        to={href}
        className={`${chipClasses} cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-1`}
      >
        {label}
      </Link>
    );
  }

  return <span className={chipClasses}>{label}</span>;
}
