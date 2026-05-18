import { Link } from 'react-router-dom';
import { getRecentPosts } from '@/services/posts';
import { Button } from '@/components/ui/Button';

interface MiniPostsProps {
  closeSidebar: () => void;
}

export function MiniPosts({ closeSidebar }: MiniPostsProps) {
  const recent = getRecentPosts(3);

  return (
    <div className="flex flex-col w-full gap-5">
      <ul className="flex flex-col w-full">
        {recent.map((post, idx) => {
          // Format date according to system long structure e.g. "November 14, 2025"
          const dateStr = new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <li
              key={post.id}
              className={[
                'flex gap-4 py-4 first:pt-0 last:pb-0',
                idx > 0 ? 'border-t border-[var(--color-border)]' : '',
              ].join(' ')}
            >
              {/* Thumbnail Container */}
              <Link
                to={`/blog/${post.slug}`}
                onClick={closeSidebar}
                className="shrink-0 group overflow-hidden rounded-[var(--border-radius)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                aria-label={`Read ${post.title}`}
              >
                <img
                  src={post.coverImage}
                  alt={`Cover for ${post.title}`}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </Link>

              {/* Text Meta Container */}
              <div className="flex flex-col justify-center min-w-0">
                <Link
                  to={`/blog/${post.slug}`}
                  onClick={closeSidebar}
                  className="font-[var(--font-heading)] text-sm font-semibold text-[var(--color-fg-bold)] hover:text-[var(--color-accent)] transition-colors duration-200 line-clamp-2 leading-snug mb-1"
                >
                  {post.title}
                </Link>
                <time
                  dateTime={post.publishedAt}
                  className="text-xs text-[var(--color-fg-light)]"
                >
                  {dateStr}
                </time>
              </div>
            </li>
          );
        })}
      </ul>

      {/* More Button */}
      <Button
        href="/blog"
        variant="outline"
        size="sm"
        onClick={closeSidebar}
        className="w-full mt-2"
      >
        More Posts
      </Button>
    </div>
  );
}
