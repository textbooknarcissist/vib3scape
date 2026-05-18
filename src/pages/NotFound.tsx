import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found | Vib3scape</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="py-20 px-4 max-w-lg mx-auto flex flex-col items-center justify-center text-center select-none">
        {/* Giant visual indicator */}
        <span className="text-7xl mb-6 leading-none animate-bounce" role="img" aria-label="Exploding head emoji">
          🤯
        </span>
        
        {/* Error Header */}
        <h1 className="font-[var(--font-heading)] font-bold text-3xl md:text-4xl text-[var(--color-fg-bold)] mb-4 tracking-tight leading-tight">
          404: Lost in Space
        </h1>

        {/* Informative message */}
        <p className="text-sm md:text-base text-[var(--color-fg-light)] leading-relaxed mb-8">
          Oops! The page you are looking for has vibed out. It might have been moved, deleted, or never existed in the first place.
        </p>

        {/* Suggestion list */}
        <div className="w-full bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-[var(--border-radius)] p-5 mb-8 text-left text-xs md:text-sm">
          <h3 className="font-semibold text-[var(--color-fg-bold)] mb-2.5">
            Looking for something else?
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-[var(--color-fg)]">
            <li>
              Browse our latest technical posts on the{' '}
              <Button href="/blog" variant="outline" size="sm" className="inline-flex py-0.5 px-2 min-h-0 text-xs">
                Blog
              </Button>
            </li>
            <li>
              Learn more about Ted Vibes' experience on the{' '}
              <Button href="/about" variant="outline" size="sm" className="inline-flex py-0.5 px-2 min-h-0 text-xs">
                About Page
              </Button>
            </li>
          </ul>
        </div>

        {/* Redirect button */}
        <Button href="/" variant="primary" size="lg" className="w-full sm:w-auto">
          Return to Homepage
        </Button>
      </div>
    </>
  );
}
