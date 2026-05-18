import { Link } from 'react-router-dom';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

/**
 * PostCard — Stub Implementation.
 * Replaced in full by Group 8 (src/components/blog/PostCard.tsx).
 * This stub exists only to allow PostsGrid.tsx and TypeScript compilation
 * to succeed before Group 8 is built.
 */
export function PostCard({ post }: PostCardProps) {
  return (
    <article className="flex flex-col h-full p-4 border border-[var(--color-border)] rounded-[var(--border-radius)]">
      <Link to={`/blog/${post.slug}`} className="hover:underline">
        <h3 className="font-[var(--font-heading)] font-bold text-lg text-[var(--color-fg-bold)] mb-2">
          {post.title}
        </h3>
      </Link>
      <p className="text-sm text-[var(--color-fg)] line-clamp-2 mb-4">
        {post.excerpt}
      </p>
      <Link
        to={`/blog/${post.slug}`}
        className="text-xs font-semibold text-[var(--color-accent)] hover:underline mt-auto"
      >
        Read More
      </Link>
    </article>
  );
}
