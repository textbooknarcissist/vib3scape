import { Link } from 'react-router-dom';
import { FaXTwitter, FaGithub, FaLinkedin, FaRss } from 'react-icons/fa6';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactElement;
  external: boolean;
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://twitter.com',
    label: 'X (Twitter)',
    icon: <FaXTwitter aria-hidden="true" className="w-4 h-4" />,
    external: true,
  },
  {
    href: 'https://github.com',
    label: 'GitHub',
    icon: <FaGithub aria-hidden="true" className="w-4 h-4" />,
    external: true,
  },
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    icon: <FaLinkedin aria-hidden="true" className="w-4 h-4" />,
    external: true,
  },
  {
    href: '/rss.xml',
    label: 'RSS Feed',
    icon: <FaRss aria-hidden="true" className="w-4 h-4" />,
    external: false,
  },
];

/**
 * Header
 *
 * Rendered inside #main, above page content.
 * Left: "Vib3scape" logo link (Roboto Slab, fg-bold, bold)
 * Right: DarkModeToggle + four social icon links
 *
 * On very small screens (< sm / < 480px) the LinkedIn icon is hidden to prevent
 * overflow — it reappears at sm+.
 */
export function Header() {
  return (
    <header
      className={[
        'flex items-center justify-between',
        'px-4 md:px-6 lg:px-8',
        'py-3',
        'border-b border-[var(--color-border)]',
        'bg-[var(--color-bg)]',
        'shrink-0',
        // Sticky so it stays at the top of the main scroll area
        'sticky top-0 z-30',
      ].join(' ')}
    >
      {/* ── Logo ────────────────────────────────────────────────────────── */}
      <Link
        to="/"
        className={[
          'font-[var(--font-heading)]',
          'font-bold',
          'text-xl md:text-2xl',
          'text-[var(--color-fg-bold)]',
          'hover:text-[var(--color-accent)]',
          'transition-colors duration-200',
          'no-underline',
          'leading-none',
          // Minimum tap target height
          'min-h-[44px] inline-flex items-center',
        ].join(' ')}
        aria-label="Vib3scape — home"
      >
        Vib3scape
      </Link>

      {/* ── Right side: dark mode toggle + social icons ──────────────────── */}
      <nav
        aria-label="Site utilities"
        className="flex items-center gap-1 sm:gap-2"
      >
        <DarkModeToggle />

        {socialLinks.map(({ href, label, icon, external }) => {
          const linkClasses = [
            'inline-flex items-center justify-center',
            'min-h-[44px] min-w-[44px]',
            'rounded-[var(--border-radius)]',
            'text-[var(--color-fg-light)]',
            'hover:text-[var(--color-accent)]',
            'transition-colors duration-200',
            'focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2',
            // Hide LinkedIn on very small screens to prevent overflow
            label === 'LinkedIn' ? 'hidden sm:inline-flex' : '',
          ]
            .join(' ')
            .trim();

          return external ? (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
            >
              <span className="sr-only">{label}</span>
              {icon}
            </a>
          ) : (
            <Link
              key={label}
              to={href}
              aria-label={label}
              className={linkClasses}
            >
              <span className="sr-only">{label}</span>
              {icon}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
