import { Link } from 'react-router-dom';
import type { ReactNode, MouseEventHandler } from 'react';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  /** Internal path → renders as <Link>. External URL (starts with http) → renders as <a>. */
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  /** Forwarded to <button> elements (e.g. "submit") */
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  /** Accessible label for icon-only buttons */
  'aria-label'?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[var(--color-accent)] text-white hover:brightness-110 border-transparent',
  secondary:
    'bg-[var(--color-bg-alt)] text-[var(--color-fg-bold)] hover:bg-[var(--color-border)] border-transparent',
  outline:
    'border border-[var(--color-fg-light)] text-[var(--color-fg-bold)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] bg-transparent',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 min-h-[36px]',
  md: 'px-5 py-2 min-h-[44px]',
  lg: 'text-lg px-7 py-3 min-h-[44px]',
};

const base =
  'rounded-[var(--border-radius)] transition-all duration-200 inline-flex items-center justify-center gap-2 font-medium cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2';

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  } ${className}`.trim();

  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          aria-disabled={disabled}
          onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        to={href}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}
