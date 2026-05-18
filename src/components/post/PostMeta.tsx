import type { Post } from '@/types';

interface PostMetaProps {
  post: Post;
  compact?: boolean;
}

/**
 * PostMeta — Stub Implementation.
 * Replaced in full by Group 9 (src/components/post/PostMeta.tsx).
 * This stub exists only to allow PostCard.tsx and TypeScript compilation
 * to succeed before Group 9 is built.
 */
export function PostMeta({ post, compact = false }: PostMetaProps) {
  const dateStr = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200) + ' min read';

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs text-[var(--color-fg-light)] select-none">
        <time dateTime={post.publishedAt}>{dateStr}</time>
        <span>•</span>
        <span>{readingTime}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm text-[var(--color-fg)]">
      <span>{post.author.name}</span>
      <span>•</span>
      <time dateTime={post.publishedAt}>{dateStr}</time>
    </div>
  );
}
