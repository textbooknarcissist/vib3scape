// ─── Domain types ────────────────────────────────────────────────────────────

export interface Author {
  name: string;
  /** Absolute URL to a square avatar image */
  avatar: string;
  bio?: string;
}

export interface Post {
  id: string;
  /** URL-safe kebab-case identifier used in /blog/:slug routes */
  slug: string;
  title: string;
  /** Plain-text summary shown in cards and og:description */
  excerpt: string;
  /** Full post body as an HTML string — rendered via dangerouslySetInnerHTML */
  content: string;
  /** Absolute image URL (picsum.photos or similar) */
  coverImage: string;
  author: Author;
  /** ISO 8601 date-time string e.g. "2025-11-14T09:00:00Z" */
  publishedAt: string;
  tags: string[];
  /** When true the post appears in the homepage Banner and featured sections */
  featured?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export type Theme = 'light' | 'dark';
