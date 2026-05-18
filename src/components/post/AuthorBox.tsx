import type { Author } from '@/types';
import { Button } from '@/components/ui/Button';

interface AuthorBoxProps {
  author: Author;
}

/**
 * AuthorBox
 *
 * Premium biography display widget positioned at the base of single blog posts.
 * Responsive design collapses to a centered layout on mobile, transitioning
 * to a side-by-side flex layout on sm+ displays.
 */
export function AuthorBox({ author }: AuthorBoxProps) {
  return (
    <section
      className={[
        'w-full flex flex-col sm:flex-row gap-6 p-6 md:p-8',
        'rounded-[var(--border-radius)] bg-[var(--color-bg-alt)] border border-[var(--color-border)]',
        'items-center sm:items-start text-center sm:text-left select-none',
      ].join(' ')}
      aria-labelledby="author-heading"
    >
      {/* ── Profile photo ── */}
      <img
        src={author.avatar}
        alt={`Profile photograph of ${author.name}`}
        className="w-20 h-20 rounded-full border border-[var(--color-border)] object-cover shrink-0 shadow-sm"
      />

      {/* ── Biography meta details ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <h4
          id="author-heading"
          className="font-[var(--font-heading)] font-bold text-base md:text-lg text-[var(--color-fg-bold)] mb-2"
        >
          About {author.name}
        </h4>
        <p className="text-sm text-[var(--color-fg)] leading-relaxed mb-4">
          {author.bio}
        </p>

        {/* Back to Blog Action Trigger */}
        <div className="mt-auto flex justify-center sm:justify-start">
          <Button href="/blog" variant="outline" size="sm" className="w-full sm:w-auto">
            Back to Blog
          </Button>
        </div>
      </div>
    </section>
  );
}
