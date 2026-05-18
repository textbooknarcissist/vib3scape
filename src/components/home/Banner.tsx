import { getFeaturedPosts } from '@/services/posts';
import { Button } from '@/components/ui/Button';

export function Banner() {
  const featuredPosts = getFeaturedPosts();
  // Safe fallback if there are no featured posts
  const coverImg = featuredPosts[0]?.coverImage || 'https://picsum.photos/seed/vib3scape-banner/800/450';
  const featuredTitle = featuredPosts[0]?.title || 'Featured Article';

  return (
    <section
      className={[
        'flex flex-col-reverse md:flex-row',
        'items-center justify-between',
        'gap-8 md:gap-12 lg:gap-16',
        'py-12 md:py-16 lg:py-20',
        'px-4 md:px-6 lg:px-8',
        'border-b border-[var(--color-border)]',
      ].join(' ')}
      aria-label="Welcome Banner"
    >
      {/* ── Content Left ────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left min-w-0">
        <h1
          className={[
            'font-[var(--font-heading)]',
            'font-bold text-[var(--color-fg-bold)]',
            'text-3xl md:text-4xl xl:text-5xl',
            'leading-tight mb-4 tracking-tight',
          ].join(' ')}
        >
          Hi, I'm Ted.
          <br className="hidden md:inline" /> Welcome to Vib3scape.
        </h1>
        
        <p
          className={[
            'text-sm md:text-base text-[var(--color-fg)]',
            'leading-relaxed mb-8 max-w-xl',
          ].join(' ')}
        >
          A dev blog about React, TypeScript, and building things that matter. Dive into clean abstractions, modern styling architectures, and strategies to fast-track your engineering career.
        </p>

        {/* CTA Button */}
        <Button
          href="/blog"
          variant="primary"
          size="lg"
          className="w-full md:w-auto"
        >
          Read the Blog
        </Button>
      </div>

      {/* ── Image Right ─────────────────────────────────────────────────── */}
      <div className="w-full md:w-1/2 shrink-0 overflow-hidden rounded-[var(--border-radius)] border border-[var(--color-border)]">
        <img
          src={coverImg}
          alt={`Featured post cover: ${featuredTitle}`}
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover hover:scale-[1.02] transition-transform duration-300 ease-in-out"
        />
      </div>
    </section>
  );
}
