import { getAllPosts } from '@/services/posts';
import { PostCard } from '@/components/blog/PostCard';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function PostsGrid() {
  const latestPosts = getAllPosts().slice(0, 6);

  return (
    <section
      className="py-12 md:py-16 px-4 md:px-6 lg:px-8 border-b border-[var(--color-border)]"
      aria-labelledby="latest-posts-heading"
    >
      <SectionHeader id="latest-posts-heading">Latest Posts</SectionHeader>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-8">
        {latestPosts.map((post) => {
          return (
            <div
              key={post.id}
              className={[
                'p-6 md:p-8 flex flex-col justify-between transition-colors duration-200 hover:bg-[var(--color-bg-alt)]/30',
                
                // ── Mobile borders ─────────────────────────────────────────────
                // Bottom border on all items except the last
                'border-b border-[var(--color-border)] last:border-b-0',
                
                // ── Medium Screen borders (2 columns) ──────────────────────────
                // Add right border on odd elements (1st col). Reset on even (2nd col)
                'md:border-r md:odd:border-r md:even:border-r-0',
                // Keep bottom border on all except the last row (last 2 elements)
                'md:[&:nth-last-child(-n+2)]:border-b-0',
                // Re-enable bottom border on 5th element if total count is 5, but here it's 6, so last row is always 2 elements
                
                // ── Large Screen borders (3 columns) ───────────────────────────
                // Overrides md: odd/even right border clobbering.
                // Right border on 1st & 2nd column elements. Reset on 3rd column (multiples of 3).
                'xl:[&:nth-child(odd)]:border-r xl:[&:nth-child(even)]:border-r xl:[&:nth-child(3n)]:border-r-0',
                // Bottom border on all except the last row (last 3 elements)
                'xl:[&:nth-last-child(-n+3)]:border-b-0',
                // Reset bottom border for elements that were in the last row in 2-col mode but are not in 3-col mode
                'xl:[&:nth-child(4)]:border-b xl:[&:nth-child(5)]:border-b',
              ].join(' ')}
            >
              <PostCard post={post} />
            </div>
          );
        })}
      </div>

      {/* View All Posts Call to Action */}
      <div className="flex justify-center mt-12">
        <Button href="/blog" variant="primary" size="lg" className="w-full sm:w-auto">
          View All Posts
        </Button>
      </div>
    </section>
  );
}
