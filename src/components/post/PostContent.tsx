import type { Post } from '@/types';

interface PostContentProps {
  post: Post;
}

/**
 * PostContent
 *
 * Renders the primary single article reading pane.
 * Features a high-resolution hero cover image, followed by a dynamically styled
 * HTML content renderer.
 *
 * Rather than relying on external typography plugins, it uses Tailwind v4's
 * arbitrary child selectors to apply gorgeous, responsive styling tokens to the
 * dynamically rendered static markup.
 */
export function PostContent({ post }: PostContentProps) {
  return (
    <article className="w-full flex flex-col select-text">
      {/* ── High-Resolution Hero Cover Image ── */}
      <div className="w-full overflow-hidden rounded-[var(--border-radius)] border border-[var(--color-border)] mb-8 max-h-[480px]">
        <img
          src={post.coverImage}
          alt={`Cover illustration for ${post.title}`}
          className="w-full h-auto object-cover"
          loading="eager"
        />
      </div>

      {/* ── Styled HTML Body Content ── */}
      <div
        className={[
          'rich-content',
          'text-[var(--color-fg)] text-sm md:text-base leading-relaxed',
          
          // Headings (H2)
          '[&>h2]:font-[var(--font-heading)] [&>h2]:font-bold [&>h2]:text-[var(--color-fg-bold)]',
          '[&>h2]:text-xl md:[&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:leading-tight [&>h2]:border-b [&>h2]:border-[var(--color-border)] [&>h2]:pb-2',
          
          // Headings (H3)
          '[&>h3]:font-[var(--font-heading)] [&>h3]:font-bold [&>h3]:text-[var(--color-fg-bold)]',
          '[&>h3]:text-lg md:[&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:leading-tight',
          
          // Paragraphs
          '[&>p]:mb-6 [&>p]:leading-relaxed',
          
          // Blockquotes
          '[&>blockquote]:pl-5 [&>blockquote]:border-l-4 [&>blockquote]:border-[var(--color-accent)]',
          '[&>blockquote]:italic [&>blockquote]:text-[var(--color-fg-light)]',
          '[&>blockquote]:my-8 [&>blockquote]:py-1 [&>blockquote]:bg-[var(--color-bg-alt)]/40 [&>blockquote]:pr-4 [&>blockquote]:rounded-r-[var(--border-radius)]',
          
          // Code Blocks (Pre + Code)
          '[&>pre]:bg-[var(--color-bg-alt)] [&>pre]:border [&>pre]:border-[var(--color-border)]',
          '[&>pre]:rounded-[var(--border-radius)] [&>pre]:p-5 [&>pre]:overflow-x-auto [&>pre]:my-8 [&>pre]:shadow-inner',
          '[&>pre>code]:font-mono [&>pre>code]:text-xs md:[&>pre>code]:text-sm [&>pre>code]:text-[var(--color-fg-bold)] [&>pre>code]:leading-normal',
          
          // Inline Code elements
          '[&>:not(pre)>code]:font-mono [&>:not(pre)>code]:text-xs md:[&>:not(pre)>code]:text-sm',
          '[&>:not(pre)>code]:bg-[var(--color-bg-alt)] [&>:not(pre)>code]:px-1.5 [&>:not(pre)>code]:py-0.5',
          '[&>:not(pre)>code]:rounded [&>:not(pre)>code]:text-[var(--color-accent)] [&>:not(pre)>code]:font-semibold',
          
          // Lists (Unordered & Ordered)
          '[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2.5',
          '[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2.5',
          '[&>li]:leading-relaxed',
          
          // Dividers / Horizontal lines
          '[&>hr]:border-[var(--color-border)] [&>hr]:my-8',
        ].join(' ')}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
