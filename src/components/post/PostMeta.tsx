import type { Post } from '@/types';

interface PostMetaProps {
  post: Post;
  compact?: boolean;
}

/**
 * PostMeta
 *
 * Renders high-fidelity post metadata.
 *
 * Displays:
 *  - If compact (for grids): Date + Reading time (no avatar)
 *  - If full (for single post pages): Author avatar (40x40px), name, date, and reading time
 *
 * Dynamically computes reading time at ~200 WPM on content word lengths.
 */
export function PostMeta({ post, compact = false }: PostMetaProps) {
  const dateStr = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate dynamic reading time
  const words = post.content ? post.content.split(/\s+/).filter(Boolean).length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200)) + ' min read';

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs text-[var(--color-fg-light)] select-none">
        <time dateTime={post.publishedAt}>{dateStr}</time>
        <span className="text-[var(--color-border)]" aria-hidden="true">•</span>
        <span>{readingTime}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-4 py-3 select-none">
      {/* Author Avatar */}
      <img
        src={post.author.avatar}
        alt={`Profile of ${post.author.name}`}
        className="w-10 h-10 rounded-full border border-[var(--color-border)] object-cover shrink-0"
      />

      {/* Meta Text */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--color-fg)]">
        <span className="font-semibold text-[var(--color-fg-bold)]">
          {post.author.name}
        </span>
        <span className="text-[var(--color-border)] hidden sm:inline" aria-hidden="true">•</span>
        <time dateTime={post.publishedAt} className="text-[var(--color-fg-light)]">
          {dateStr}
        </time>
        <span className="text-[var(--color-border)]" aria-hidden="true">•</span>
        <span className="text-[var(--color-fg-light)]">
          {readingTime}
        </span>
      </div>
    </div>
  );
}
