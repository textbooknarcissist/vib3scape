import { Link } from "react-router-dom";
import type { Post } from "@/types";
import { TagChip } from "@/components/ui/TagChip";
import { Button } from "@/components/ui/Button";
import { PostMeta } from "@/components/post/PostMeta";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  // Truncate tags to a maximum of 3 items
  const displayTags = post.tags.slice(0, 3);

  return (
    <article className="flex flex-col h-full w-full group/card select-none">
      {/* ── Cover Image Container ── */}
      <div className="relative w-full aspect-video overflow-hidden rounded-(--border-radius) border border-(--color-border) mb-4">
        <Link
          to={`/blog/${post.slug}`}
          className="block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)"
          aria-label={`Read article: ${post.title}`}
        >
          <img
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover/card:scale-[1.02]"
            loading="lazy"
          />
        </Link>
      </div>

      {/* ── Title & Meta ── */}
      <div className="flex flex-col gap-2 mb-3">
        <h3
          className={[
            "font-(--font-heading)",
            "font-bold text-(--color-fg-bold)",
            "text-lg md:text-xl leading-snug",
            "group-hover/card:text-(--color-accent) transition-colors duration-200",
          ].join(" ")}
        >
          <Link
            to={`/blog/${post.slug}`}
            className="hover:underline hover:text-(--color-accent) focus:outline-none focus-visible:text-(--color-accent)"
          >
            {post.title}
          </Link>
        </h3>

        {/* Compact Metadata (Date + Reading Time) */}
        <PostMeta post={post} compact />
      </div>

      {/* ── Tag Chips (max 3) ── */}
      {displayTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4" aria-label="Tags">
          {displayTags.map((tag) => (
            <TagChip key={tag} label={tag} href={`/blog?tag=${tag}`} />
          ))}
        </div>
      )}

      {/* ── Excerpt ── */}
      <p className="text-sm text-(--color-fg) leading-relaxed line-clamp-2 overflow-hidden mb-6">
        {post.excerpt}
      </p>

      {/* ── Read More CTA ── */}
      <div className="mt-auto">
        <Button
          href={`/blog/${post.slug}`}
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
        >
          Read More
        </Button>
      </div>
    </article>
  );
}
