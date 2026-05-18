/**
 * Service layer — the only correct way to access post data from UI components.
 *
 * Components and pages MUST import from this file, never directly from
 * src/data/posts.ts. This indirection means we can swap the data source
 * (static → Supabase, REST API, etc.) without touching any UI code.
 */
import { posts } from '../data/posts';
import type { Post } from '../types';

// ─── Read helpers ─────────────────────────────────────────────────────────────

/** All posts sorted newest-first by publishedAt. */
export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/** Single post by slug. Returns undefined when the slug does not match. */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Posts where featured === true, sorted newest-first. */
export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((p) => p.featured === true);
}

/** The N most recent posts (default: 3). */
export function getRecentPosts(count = 3): Post[] {
  return getAllPosts().slice(0, count);
}

/** All posts that include the given tag (case-sensitive). */
export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

/**
 * Paginated post slice.
 *
 * @param page     1-based page number
 * @param perPage  Items per page (default 6)
 */
export function getPaginatedPosts(
  page: number,
  perPage = 6,
): { data: Post[]; total: number; totalPages: number; page: number } {
  const all = getAllPosts();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const data = all.slice((safePage - 1) * perPage, safePage * perPage);
  return { data, total, totalPages, page: safePage };
}

// ─── Future Supabase equivalents (not implemented) ───────────────────────────
//
// import { supabase } from '@/lib/supabaseClient';
//
// export async function getAllPosts(): Promise<Post[]> {
//   const { data, error } = await supabase
//     .from('posts')
//     .select('*')
//     .order('published_at', { ascending: false });
//   if (error) throw error;
//   return data ?? [];
// }
//
// export async function getPostBySlug(slug: string): Promise<Post | undefined> {
//   const { data } = await supabase
//     .from('posts')
//     .select('*')
//     .eq('slug', slug)
//     .single();
//   return data ?? undefined;
// }
//
// export async function getFeaturedPosts(): Promise<Post[]> {
//   const { data } = await supabase
//     .from('posts')
//     .select('*')
//     .eq('featured', true)
//     .order('published_at', { ascending: false });
//   return data ?? [];
// }
//
// export async function getRecentPosts(count = 3): Promise<Post[]> {
//   const { data } = await supabase
//     .from('posts')
//     .select('*')
//     .order('published_at', { ascending: false })
//     .limit(count);
//   return data ?? [];
// }
//
// export async function getPostsByTag(tag: string): Promise<Post[]> {
//   const { data } = await supabase
//     .from('posts')
//     .select('*')
//     .contains('tags', [tag])
//     .order('published_at', { ascending: false });
//   return data ?? [];
// }
//
// export async function getPaginatedPosts(page: number, perPage = 6) {
//   const from = (page - 1) * perPage;
//   const to = from + perPage - 1;
//   const { data, count } = await supabase
//     .from('posts')
//     .select('*', { count: 'exact' })
//     .order('published_at', { ascending: false })
//     .range(from, to);
//   const total = count ?? 0;
//   const totalPages = Math.max(1, Math.ceil(total / perPage));
//   return { data: data ?? [], total, totalPages, page };
// }
