import type { Post } from '@/types';
import { PostCard } from './PostCard';

interface PostListProps {
  /** Array of posts to display */
  posts: Post[];
}

/**
 * PostList
 *
 * Renders a responsive grid mapping a collection of posts to PostCard components.
 * Automatically handles screen dimensions elegantly via tailwind responsive grid columns.
 */
export function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 select-none">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex h-full w-full"
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
