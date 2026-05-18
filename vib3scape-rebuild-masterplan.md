# Vib3scape — Blog Rebuild Masterplan
> React + TypeScript + Vite + Tailwind CSS v4
> Based on HTML5 UP Editorial — complete source analysis + finalized Cursor prompt

---

## Decisions Log

| Decision | Choice | Rationale |
|---|---|---|
| Blog name | **Vib3scape** | — |
| Accent color | **#f56a6a** (original) | Keep Editorial's warm coral |
| Fonts | **Open Sans + Roboto Slab** (original) | Editorial typographic identity |
| Content source | **Static TS behind service layer** | Fast start; clean upgrade path to Supabase |
| Contact form | **Formspree** | Zero-backend, real submissions |
| Dark mode | **Yes** | Tailwind `dark:` + localStorage |
| Social links | **X, GitHub, LinkedIn, RSS** | Right set for a dev blog |
| Features section | **Keep** | Good "what this blog covers" section |
| Architecture | **Service layer abstraction** | `src/services/posts.ts` decouples data from UI |

---

## 1. What the Original Template Is (Source Analysis)

**Layout:** Two-column flex row. Left = `#sidebar` (fixed width: 26em at xl, 24em at large, `bg: #f5f6f7`). Right = `#main` (flex-grows, white). Wrapped in `#wrapper`.

**Original pages:**
- `index.html` — Homepage: banner hero + features grid + posts grid
- `generic.html` — Inner/article page: full-width prose with `hr.major` section dividers
- `elements.html` — Component reference (not being rebuilt)

**Sidebar signature behavior:**
- `> 1280px`: sidebar is always visible. Its `.inner` div **scroll-locks** — when sidebar content is taller than the viewport, it switches between `position: relative` and `position: fixed` with a calculated `top` offset so the sidebar bottom stays pinned as you scroll past it.
- `≤ 1280px`: sidebar collapses off-screen (`margin-left: -26em`). A `.toggle` button appears. Clicking opens it as a full-height fixed overlay.
- Mobile: overlay is scrollable, closes on outside click or navigation.

**All JS behaviors (jQuery → to be replaced in React):**
1. Preload class removal (prevents animation flash on load)
2. Resize debounce (disables transitions during window resize)
3. `object-fit` polyfill for Safari — not needed, drop it
4. Sidebar scroll-lock (the locking behavior)
5. Sidebar toggle open/close on ≤ large
6. Sidebar close on body click or link navigation (mobile)
7. Menu `.opener` accordion (click to expand submenu, collapses siblings)

---

## 2. Design System (Extracted from SASS Source)

### Color Tokens
| Token | Value | Role |
|---|---|---|
| `bg` | `#ffffff` | Main content background |
| `bg-alt` | `#f5f6f7` | Sidebar background |
| `fg` | `#7f888f` | Body text |
| `fg-bold` | `#3d4449` | Headings, strong text |
| `fg-light` | `#9fa3a6` | Muted / secondary text |
| `border` | `rgba(210,215,217,0.75)` | Dividers, card borders |
| `accent` | `#f56a6a` | Links, buttons, highlights |

### Dark Mode Tokens (new — not in original)
| Token | Value |
|---|---|
| `dark-bg` | `#1a1d1e` |
| `dark-bg-alt` | `#222527` |
| `dark-fg` | `#c8cdd0` |
| `dark-fg-bold` | `#e8eaeb` |
| `dark-border` | `rgba(255,255,255,0.08)` |

### Typography
| Role | Font | Weight |
|---|---|---|
| Body | Open Sans | 400 |
| Headings | Roboto Slab | 700 |
| Monospace | `ui-monospace, 'Cascadia Code', monospace` | — |

**Base size:** 13pt → 11pt (≤1680px) → 10pt (≤1280px) → 9pt (≤360px)

**Heading scale:** h1=4em, h2=1.75em, h3=1.25em, h4=1.1em, h5=0.9em, h6=0.7em

### Spacing Tokens
| Token | Value |
|---|---|
| `element-margin` | 2em |
| `gutter` | 3em |
| `sidebar-width` | 26em (xl), 24em (large) |
| `border-radius` | 0.375em |

### Breakpoints
| Name | Range |
|---|---|
| xxsmall | ≤ 360px |
| xsmall | 361–480px |
| small | 481–736px |
| medium | 737–980px |
| large | 981–1280px |
| xlarge | 1281–1680px |
| max | > 1680px |

---

## 3. Component Inventory

### Homepage
1. **Header bar** — `Vib3scape` logo link (left) + X, GitHub, LinkedIn, RSS icons (right)
2. **Banner** — 50/50 flex: left = h1 + tagline + CTA button | right = cover image (`object-fit: cover`)
3. **Features section** — `SectionHeader` (h2 + left accent border) + 2×2 icon+text grid
4. **Posts grid** — `SectionHeader` + 3-col `PostCard` grid

### Sidebar
1. **SearchBox** — full-width input, slightly darker alt background
2. **NavMenu** — accordion: flat links + collapsible submenus (one open at a time)
3. **MiniPosts** — "Recent Posts": 3 items, thumbnail + title + date
4. **ContactInfo** — email link + social icon list
5. **Footer** — copyright line

### Post Page
1. **Header bar** (same)
2. `<article>`: h1 + PostMeta (author, date, reading time, tags) + full-width hero image + prose body + `<hr>` dividers + PostNav (prev/next)

### Blog Index Page
1. **Header bar** (same)
2. Full `PostList` with `Pagination`

### About Page
Uses generic inner page layout: h1 + hero image + prose sections

### Contact Page
Formspree-wired form: name, email, message fields + submit button

---

## 4. What's Fixed vs Original

| Original Problem | Fix |
|---|---|
| jQuery 3.x + 5 helper scripts | Replaced with React hooks + native browser APIs |
| Sidebar scroll-lock in jQuery | `useSidebarLock` hook with passive scroll/resize listeners |
| `margin-left` slide animation (janky) | CSS `translateX(-100%)` transition (GPU-composited, smooth) |
| Vendor prefixes everywhere (`-moz-`, `-webkit-`, `-ms-`) | Dropped; Tailwind + modern browsers handle it |
| FontAwesome via 2MB local webfonts | `react-icons/fa6` — tree-shaken, zero extra load |
| No semantic blog structure | `<article>`, `<time datetime>`, `<nav aria-label>` throughout |
| No SEO meta tags | `react-helmet-async` for per-page `<title>`, `og:*`, `twitter:*` |
| No dark mode | Tailwind `dark:` class strategy + `localStorage` persistence |
| No reading time | Calculated: `Math.ceil(wordCount / 200)` minutes |
| No tags | Tag chips on cards and post pages |
| Contact form non-functional | Formspree endpoint |
| Fake pagination | Real client-side pagination with page state |
| `user-scalable=no` | Removed (accessibility violation) |
| Empty `alt=""` on all images | Meaningful alt text from post title/context |
| No service layer | `src/services/posts.ts` abstracts data access from components |

---

## 5. Routes

| Route | Page Component | Description |
|---|---|---|
| `/` | `HomePage` | Banner + features + post grid (featured posts) |
| `/blog` | `BlogPage` | Paginated full post listing |
| `/blog/:slug` | `PostPage` | Individual article |
| `/about` | `AboutPage` | Author bio, prose layout |
| `/contact` | `ContactPage` | Formspree contact form |
| `*` | `NotFoundPage` | 404 |

---

## 6. Full File Structure

```
vib3scape/
├── public/
│   └── rss.xml                         ← Static RSS feed (manually maintained or generated)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx              ← Two-column wrapper (sidebar + main)
│   │   │   ├── Header.tsx              ← Logo + social icons top bar
│   │   │   └── SidebarToggle.tsx       ← Mobile hamburger button (fixed position)
│   │   ├── sidebar/
│   │   │   ├── Sidebar.tsx             ← Full sidebar assembly
│   │   │   ├── SearchBox.tsx           ← Search input
│   │   │   ├── NavMenu.tsx             ← Accordion navigation
│   │   │   ├── MiniPosts.tsx           ← Recent posts widget
│   │   │   └── ContactInfo.tsx         ← Email + social links
│   │   ├── home/
│   │   │   ├── Banner.tsx              ← Hero 50/50 split
│   │   │   ├── FeaturesGrid.tsx        ← Icon+text 2×2 grid
│   │   │   └── PostsGrid.tsx           ← 3-col post card grid
│   │   ├── blog/
│   │   │   ├── PostCard.tsx            ← Card: image, meta, excerpt, button
│   │   │   ├── PostList.tsx            ← Maps posts → PostCard
│   │   │   └── Pagination.tsx          ← Page number controls
│   │   ├── post/
│   │   │   ├── PostMeta.tsx            ← Author, date, reading time, tags
│   │   │   ├── PostBody.tsx            ← Prose HTML renderer
│   │   │   └── PostNav.tsx             ← Prev/next article links
│   │   └── ui/
│   │       ├── Button.tsx              ← Reusable button (primary/secondary/outline)
│   │       ├── TagChip.tsx             ← Pill tag chip
│   │       ├── SectionHeader.tsx       ← h2 + left accent border
│   │       └── DarkModeToggle.tsx      ← Sun/moon toggle button
│   ├── hooks/
│   │   ├── useSidebarLock.ts           ← Desktop scroll-lock behavior
│   │   └── useSidebarToggle.ts         ← Mobile open/close + escape key
│   ├── services/
│   │   └── posts.ts                    ← Data access layer (reads from data/posts.ts now, Supabase later)
│   ├── data/
│   │   └── posts.ts                    ← Static mock post array
│   ├── types/
│   │   └── index.ts                    ← Post interface + other shared types
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── BlogPage.tsx
│   │   ├── PostPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── styles/
│   │   └── globals.css                 ← Tailwind directives + CSS custom properties
│   ├── App.tsx                         ← Router setup
│   └── main.tsx                        ← Entry point, dark mode init
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 7. Type Definitions (`src/types/index.ts`)

```ts
export interface Author {
  name: string;
  avatar: string;       // URL
  bio?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;      // HTML string
  coverImage: string;   // URL
  author: Author;
  publishedAt: string;  // ISO 8601 date string e.g. "2025-11-14T09:00:00Z"
  tags: string[];
  featured?: boolean;   // Shown in homepage banner/hero position
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export type Theme = 'light' | 'dark';
```

---

## 8. Service Layer (`src/services/posts.ts`)

This is the architectural abstraction. Components never import from `data/posts.ts` directly — they always go through `services/posts.ts`. When you migrate to Supabase, only this file changes.

```ts
// Current implementation — static data
import { posts } from '../data/posts';
import type { Post } from '../types';

export const getAllPosts = (): Post[] =>
  [...posts].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

export const getPostBySlug = (slug: string): Post | undefined =>
  posts.find(p => p.slug === slug);

export const getFeaturedPosts = (): Post[] =>
  getAllPosts().filter(p => p.featured);

export const getRecentPosts = (count = 3): Post[] =>
  getAllPosts().slice(0, count);

export const getPostsByTag = (tag: string): Post[] =>
  getAllPosts().filter(p => p.tags.includes(tag));

export const getPaginatedPosts = (page: number, perPage = 6) => {
  const all = getAllPosts();
  const total = all.length;
  const totalPages = Math.ceil(total / perPage);
  const data = all.slice((page - 1) * perPage, page * perPage);
  return { data, total, totalPages, page };
};

// Future Supabase version — same signatures, different internals:
// export const getAllPosts = async (): Promise<Post[]> => {
//   const { data } = await supabase.from('posts').select('*').order('published_at', { ascending: false });
//   return data ?? [];
// };
```

---

## 9. Sidebar Scroll-Lock Hook (`src/hooks/useSidebarLock.ts`)

Replaces the jQuery scroll-lock. Exact behavioral parity with the original.

```ts
import { useEffect, RefObject } from 'react';

export function useSidebarLock(innerRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    let locked = false;

    const calculate = () => {
      // Only active on desktop (> 1280px)
      if (window.innerWidth <= 1280) {
        inner.style.position = '';
        inner.style.top = '';
        locked = false;
        return;
      }

      const sh = inner.offsetHeight;
      const wh = window.innerHeight;
      const x = Math.max(sh - wh, 0);       // how much sidebar overflows
      const y = Math.max(0, window.scrollY - x); // how far past overflow point

      if (locked) {
        if (y <= 0) {
          inner.style.position = '';
          inner.style.top = '';
          locked = false;
        } else {
          inner.style.top = `${-x}px`;
        }
      } else {
        if (y > 0) {
          inner.style.position = 'fixed';
          inner.style.top = `${-x}px`;
          locked = true;
        }
      }
    };

    window.addEventListener('scroll', calculate, { passive: true });
    window.addEventListener('resize', calculate, { passive: true });
    calculate(); // run once on mount

    return () => {
      window.removeEventListener('scroll', calculate);
      window.removeEventListener('resize', calculate);
    };
  }, [innerRef]);
}
```

---

## 10. Dark Mode Strategy

**Implementation:** Tailwind `darkMode: 'class'` strategy. Class `dark` on `<html>`.

**Init in `main.tsx`** (before React renders, prevents flash):
```ts
const saved = localStorage.getItem('vib3scape-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (saved === 'dark' || (!saved && prefersDark)) {
  document.documentElement.classList.add('dark');
}
```

**Dark mode color map:**
| Light | Dark |
|---|---|
| `bg-white` | `dark:bg-[#1a1d1e]` |
| `bg-[#f5f6f7]` | `dark:bg-[#222527]` |
| `text-[#7f888f]` | `dark:text-[#c8cdd0]` |
| `text-[#3d4449]` | `dark:text-[#e8eaeb]` |
| `border-[rgba(210,215,217,0.75)]` | `dark:border-[rgba(255,255,255,0.08)]` |
| Accent `#f56a6a` | Same — works on both modes |

---

## 11. THE FINALIZED CURSOR PROMPT

Copy everything between the triple-dash lines below. Paste it as your agent prompt.

---

```
You are building Vib3scape — a personal blog — as a production-quality React + TypeScript + Vite + Tailwind CSS v4 application. This is a faithful rebuild of the HTML5 UP "Editorial" template with all jQuery removed, full dark mode, real service layer abstraction, and modern React patterns throughout.

Do NOT use jQuery or any jQuery-dependent libraries.
Do NOT copy or adapt the original main.css — derive all styling in Tailwind utility classes.
Do NOT leave TODO comments. Implement everything completely.
Do NOT use vendor prefixes (-ms-, -moz-, -webkit-) in any CSS.
Do NOT set user-scalable=no in the viewport meta tag.
Do NOT leave empty alt="" on any image element.
Report verbatim before creating each file group and wait for confirmation before proceeding.

---

## TECH STACK

- React 18 + TypeScript
- Vite
- Tailwind CSS v4 (darkMode: 'class')
- React Router v6
- react-icons (fa6 set)
- react-helmet-async (per-page SEO meta)
- Google Fonts: Open Sans (400, 600) + Roboto Slab (700) via @import in globals.css

---

## DESIGN TOKENS

Define these as CSS custom properties in src/styles/globals.css:

Light mode:
--color-bg: #ffffff;
--color-bg-alt: #f5f6f7;
--color-fg: #7f888f;
--color-fg-bold: #3d4449;
--color-fg-light: #9fa3a6;
--color-border: rgba(210, 215, 217, 0.75);
--color-accent: #f56a6a;
--font-body: 'Open Sans', sans-serif;
--font-heading: 'Roboto Slab', serif;
--sidebar-width: 26rem;
--border-radius: 0.375rem;
--element-margin: 2rem;

Dark mode (.dark on <html>):
--color-bg: #1a1d1e;
--color-bg-alt: #222527;
--color-fg: #c8cdd0;
--color-fg-bold: #e8eaeb;
--color-fg-light: #888e92;
--color-border: rgba(255, 255, 255, 0.08);
--color-accent: #f56a6a;   /* accent unchanged */

---

## TYPES (src/types/index.ts)

export interface Author {
  name: string;
  avatar: string;
  bio?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;       // HTML string
  coverImage: string;    // picsum.photos URL
  author: Author;
  publishedAt: string;   // ISO 8601
  tags: string[];
  featured?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export type Theme = 'light' | 'dark';

---

## DARK MODE INIT (main.tsx)

Before ReactDOM.render, insert this script to prevent flash of wrong theme:

const saved = localStorage.getItem('vib3scape-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (saved === 'dark' || (!saved && prefersDark)) {
  document.documentElement.classList.add('dark');
}

DarkModeToggle component: reads current theme from document.documentElement.classList,
toggles 'dark' class, saves to localStorage('vib3scape-theme'). Uses FaSun / FaMoon
icons from react-icons/fa6. Placed in Header, right side before social icons.

---

## ROUTES (App.tsx — React Router v6)

/ → HomePage
/blog → BlogPage
/blog/:slug → PostPage
/about → AboutPage
/contact → ContactPage
* → NotFoundPage

All routes wrapped in <Layout />.

---

## SERVICE LAYER (src/services/posts.ts)

Components NEVER import from src/data/posts.ts directly.
All data access goes through these exported functions:

getAllPosts(): Post[]           — sorted newest first
getPostBySlug(slug): Post | undefined
getFeaturedPosts(): Post[]     — posts where featured === true
getRecentPosts(count = 3): Post[]
getPostsByTag(tag): Post[]
getPaginatedPosts(page, perPage = 6): { data: Post[], total: number, totalPages: number, page: number }

Internally reads from src/data/posts.ts for now. Comment at bottom of file showing
the async Supabase signature equivalent (commented out, not implemented).

---

## MOCK DATA (src/data/posts.ts)

Create 8 mock posts about web development / tech topics appropriate for "Vib3scape".
Topics should feel like a real dev blog: TypeScript tips, React patterns, CSS tricks,
career/job hunt content, tool reviews.

Each post must have:
- Unique slug (kebab-case)
- Rich content string: valid HTML with at least 2× <h2>, 4× <p>, 1× <blockquote>,
  1× <pre><code> block, and 1× <ul> list
- coverImage: https://picsum.photos/seed/{slug}/800/450
- author: { name: "Ted Vibes", avatar: "https://picsum.photos/seed/author/80/80" }
- publishedAt: spread across last 6 months (ISO strings)
- 2–4 tags each from: ["React", "TypeScript", "CSS", "Career", "Tools", "Performance", "Design", "JavaScript"]
- 2 posts marked featured: true

---

## LAYOUT (src/components/layout/Layout.tsx)

Two-column flex row. Full viewport height.
Left: <Sidebar /> — width var(--sidebar-width), shrink-0, bg var(--color-bg-alt)
Right: <main id="main"> — flex-1, bg var(--color-bg), overflow-y-auto

The sidebar on screens > 1280px is always visible.
On screens ≤ 1280px: sidebar is position:fixed, left:0, top:0, h-full, z-50,
translated -100% when closed, translated 0 when open. Transition: transform 0.5s ease.
A semi-transparent overlay div covers #main when sidebar is open on mobile (click to close).

useSidebarToggle hook manages isOpen state. Escape key closes sidebar.
Pass isOpen and toggle fn as props to Sidebar and SidebarToggle.

---

## HEADER (src/components/layout/Header.tsx)

Inside #main, above page content. Flex row, space-between, border-bottom.
Left: <Link to="/"> with blog name "Vib3scape" — font-heading, fg-bold color, font-bold.
Right:
  1. DarkModeToggle
  2. Social icon links (each opens target="_blank" rel="noopener noreferrer"):
     - X/Twitter: FaXTwitter → https://twitter.com
     - GitHub: FaGithub → https://github.com
     - LinkedIn: FaLinkedin → https://linkedin.com
     - RSS: FaRss → /rss.xml
  Each icon link: aria-label="{platform}", visually-hidden <span> with platform name.

---

## SIDEBAR (src/components/sidebar/Sidebar.tsx)

Contains in order (each separated by a bottom border):
1. SearchBox
2. NavMenu
3. MiniPosts (titled "Recent Posts")
4. ContactInfo (titled "Get in Touch")
5. Footer line: "© 2025 Vib3scape. All rights reserved."

Sidebar inner div: ref passed to useSidebarLock hook (desktop scroll-lock).
On ≤ 1280px: inner is height:100%, overflow-y:auto (scrollable overlay).

SidebarToggle: a separate component rendered in Layout, outside the sidebar.
Position: fixed, top:0, left:0 when sidebar closed / left:var(--sidebar-width) when
sidebar would be open (but use translateX on sidebar itself, not left on toggle).
Shows hamburger icon (FaBars) when closed, X icon (FaXmark) when open.
aria-label="Toggle navigation", aria-expanded={isOpen}.

---

## useSidebarLock hook (src/hooks/useSidebarLock.ts)

Takes a RefObject<HTMLDivElement> for the sidebar inner div.
Only active when window.innerWidth > 1280.

Logic (exact parity with original jQuery):
  sh = inner.offsetHeight
  wh = window.innerHeight
  x = Math.max(sh - wh, 0)
  y = Math.max(0, window.scrollY - x)

  if locked:
    if y <= 0: unlock (remove position:fixed and top)
    else: inner.style.top = `${-x}px`
  else:
    if y > 0: lock (position:fixed, top = -x)

Passive scroll and resize listeners. Clean up on unmount. Run once on mount.

---

## SEARCH BOX (src/components/sidebar/SearchBox.tsx)

Full-width text input. Placeholder "Search". Background slightly darker than sidebar
(use bg-[#ededee] light / dark:bg-[#1c1f20]).
Search icon (FaMagnifyingGlass) positioned absolutely on right side.
Negative margin top/sides to bleed to sidebar edges (alt section styling).
On submit (Enter): navigate to /blog?q={query} (BlogPage will read the query param).

---

## NAV MENU (src/components/sidebar/NavMenu.tsx)

Static nav data defined in the component (not from posts service):
- Home → /
- Blog → /blog
- Topics (opener):
  - React → /blog?tag=React
  - TypeScript → /blog?tag=TypeScript
  - CSS → /blog?tag=CSS
  - Career → /blog?tag=Career
- About → /about
- Contact → /contact

Accordion: items with children render a <span> with a caret icon (FaChevronDown,
rotates 180° when open). Clicking toggles that item's submenu. Only one open at a time
(useState tracking open item label). Submenu items are indented child links.
When sidebar closes (mobile), reset all open submenus.
Trigger useSidebarLock recalculation when a submenu opens/closes (call window.dispatchEvent(new Event('resize'))).

---

## MINI POSTS (src/components/sidebar/MiniPosts.tsx)

Shows getRecentPosts(3) from posts service.
Each article: thumbnail image (80×80, object-cover, rounded) + post title as link + formatted date.
Border-top between items (not on first). "More" button at bottom links to /blog.

---

## CONTACT INFO (src/components/sidebar/ContactInfo.tsx)

Short paragraph: "Have something to say? Reach out."
List with icons:
- FaEnvelope: hello@vib3scape.dev (mailto link)
- FaXTwitter: @vib3scape
- FaGithub: github.com/vib3scape

---

## BANNER (src/components/home/Banner.tsx)

50/50 flex row. Padding: 4rem 0.
Left (.content, flex-grow):
  <h1> "Hi, I'm Ted." (or: "Welcome to Vib3scape")
  <p> tagline: "A dev blog about React, TypeScript, and building things that matter."
  <Button href="/blog" variant="primary" size="lg">Read the Blog</Button>
Right (.image, flex-shrink-0, w-1/2):
  <img> with object-fit:cover, full height of banner.
  Use getFeaturedPosts()[0].coverImage as the image src.

On portrait / mobile (flex-col-reverse): image on top (max-h-64), content below.

---

## FEATURES GRID (src/components/home/FeaturesGrid.tsx)

<SectionHeader>What You'll Find Here</SectionHeader>
2×2 grid (grid-cols-2 on md+, grid-cols-1 on mobile).
4 feature cards, each: icon (react-icons) + h3 + short paragraph.

Cards:
1. FaReact — "React & TypeScript" — "Deep dives into component patterns, hooks, and type-safe development."
2. FaPaintbrush — "CSS & Design" — "Styling systems, Tailwind tips, and making interfaces that feel right."
3. FaBriefcase — "Career & Growth" — "Job hunting, portfolio strategy, and levelling up as a developer."
4. FaBolt — "Tools & Performance" — "Dev tooling, build optimization, and things that make you faster."

---

## POST CARD (src/components/blog/PostCard.tsx)

Props: post: Post
- Cover image: aspect-video, object-cover, w-full, rounded-sm, links to /blog/:slug
- <h3> title as <Link> in fg-bold color, hover accent color, font-heading
- <PostMeta> compact: date + reading time (no author avatar in card view)
- Tag chips: <TagChip> for each tag (max 3, truncate rest)
- Excerpt: 2-line clamp (overflow-hidden, line-clamp-2)
- <Button href={/blog/${post.slug}} variant="outline" size="sm">Read More</Button>

Reading time: calculated inline as Math.ceil(post.content.split(' ').length / 200) + " min read"

---

## POSTS GRID (src/components/home/PostsGrid.tsx)

<SectionHeader>Latest Posts</SectionHeader>
Renders getAllPosts().slice(0, 6) (homepage shows 6 most recent).
Grid: grid-cols-3 (xl+), grid-cols-2 (md–xl), grid-cols-1 (mobile).
Each cell has border-right and border-bottom dividers (except last column and last row).
Use CSS grid with divide utilities or pseudo-element approach from original.
"View All Posts" button below grid linking to /blog.

---

## BLOG PAGE (src/pages/BlogPage.tsx)

Reads ?q= (search) and ?tag= and ?page= from URL search params.
Calls getPaginatedPosts(page, 6).
If ?q= present: client-side filter posts where title or content includes query (case-insensitive).
If ?tag= present: filter by tag.
Renders: <SectionHeader> + <PostList> + <Pagination>.
Shows "No posts found" state if filtered result is empty.

Pagination: shows page numbers, prev/next buttons, updates URL params on change.

---

## POST PAGE (src/pages/PostPage.tsx)

Reads :slug from params. Calls getPostBySlug(slug).
If not found: render <NotFoundPage />.

Structure (inside <article>):
1. <header class="main">: <h1> post title (font-heading, 3–4rem)
2. <PostMeta>: author avatar (40px circle) + author name + " · " + formatted date + " · " + reading time + tag chips
3. Full-width cover image: max-h-96, w-full, object-cover, rounded
4. <PostBody>: renders post.content as HTML via dangerouslySetInnerHTML
   Wrap in a prose div with these explicit Tailwind styles (do NOT use @tailwindcss/typography plugin):
   - p: mb-6, text-[var(--color-fg)], leading-relaxed
   - h2: font-heading, text-2xl, font-bold, text-[var(--color-fg-bold)], mt-10 mb-4, pb-2, border-b border-[var(--color-border)]
   - blockquote: border-l-4 border-[var(--color-accent)], pl-6, italic, my-6, text-[var(--color-fg-light)]
   - pre: bg-[#f0f2f4] dark:bg-[#2a2d2e], rounded, p-4, overflow-x-auto, mb-6
   - code: font-mono, text-sm
   - ul: list-disc, pl-6, mb-6, space-y-1
   - a: text-[var(--color-accent)], underline
5. <hr> between post body and PostNav (styled: border-[var(--color-border)], my-12)
6. <PostNav>: prev/next post links (from getAllPosts(), find adjacent by index)

---

## ABOUT PAGE (src/pages/AboutPage.tsx)

Generic inner page layout.
<header class="main"><h1>About Vib3scape</h1></header>
Full-width author photo (picsum.photos/seed/about/1200/400, object-cover, max-h-72).
3 prose sections separated by <hr class="major">:
  - "Who Am I" — short developer bio for Ted
  - "Why Vib3scape" — what the blog is about
  - "Let's Connect" — links to socials

---

## CONTACT PAGE (src/pages/ContactPage.tsx)

<header class="main"><h1>Get In Touch</h1></header>
<p> intro text.
Formspree form. Replace FORMSPREE_ID with placeholder "YOUR_FORMSPREE_ID".

Form fields:
- Name (text, required)
- Email (email, required)
- Subject (text, required)
- Message (textarea, required, min 4 rows)
- Submit <Button variant="primary">Send Message</Button>

Form state: idle | submitting | success | error.
On success: show "Message sent! I'll get back to you soon." and clear form.
On error: show "Something went wrong. Please try again."
Use fetch to POST to https://formspree.io/f/YOUR_FORMSPREE_ID with
Content-Type: application/json body.

---

## NOT FOUND PAGE (src/pages/NotFoundPage.tsx)

<h1>404</h1>
<p>Looks like this page went offline.</p>
<Button href="/" variant="primary">Back to Home</Button>

---

## UI COMPONENTS

### Button (src/components/ui/Button.tsx)
Props: children, href?: string, onClick?: fn, variant: 'primary'|'secondary'|'outline', size: 'sm'|'md'|'lg', disabled?: boolean
If href: render as <Link> (internal) or <a> (external, has http).
If no href: render as <button>.
Variants:
  primary: bg-[var(--color-accent)] text-white hover:brightness-110
  secondary: bg-[var(--color-bg-alt)] text-[var(--color-fg-bold)] hover:bg-[var(--color-border)]
  outline: border border-[var(--color-fg-light)] text-[var(--color-fg-bold)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]
Sizes: sm=text-sm px-3 py-1.5, md=px-5 py-2, lg=text-lg px-7 py-3
All: rounded-[var(--border-radius)] transition-all duration-200 inline-flex items-center

### TagChip (src/components/ui/TagChip.tsx)
Props: label: string, href?: string
Pill: text-xs, px-2.5 py-0.5, rounded-full, bg-[var(--color-accent)]/10,
text-[var(--color-accent)], border border-[var(--color-accent)]/20, font-medium.
If href: wrap in <Link>.

### SectionHeader (src/components/ui/SectionHeader.tsx)
Props: children
<h2> with: font-heading, text-2xl, font-bold, text-[var(--color-fg-bold)],
border-b-2 border-[var(--color-accent)], pb-2, mb-8.
Wrapper: mb-2.

### DarkModeToggle (src/components/ui/DarkModeToggle.tsx)
Button showing FaSun (light mode) or FaMoon (dark mode).
On click: toggle 'dark' on document.documentElement, save to localStorage('vib3scape-theme').
Style: p-2, rounded, text-[var(--color-fg-light)], hover:text-[var(--color-fg-bold)], transition-colors.

---

## POST META (src/components/post/PostMeta.tsx)

Props: post: Post, compact?: boolean
Full (post page): author avatar (img, 40px circle) + author name (bold) + separator + formatted date + separator + reading time + tag chips row below
Compact (card): date + separator + reading time only (no avatar)
Date format: "November 14, 2025" (use toLocaleDateString with { year: 'numeric', month: 'long', day: 'numeric' })
Reading time: Math.ceil(post.content.split(/\s+/).length / 200) + " min read"

---

## POST NAV (src/components/post/PostNav.tsx)

Props: currentSlug: string
Gets all posts from getAllPosts(). Finds index of current. 
Prev = index + 1 (older), Next = index - 1 (newer).
Layout: flex row space-between. Each side: label ("← Older" / "Newer →") + post title as link.
If no prev/next: that side is empty.

---

## PAGINATION (src/components/blog/Pagination.tsx)

Props: currentPage, totalPages, onPageChange: (page: number) => void
Shows: ← Prev | 1 2 3 ... N | Next →
Current page highlighted with accent color.
Ellipsis when totalPages > 5 and middle pages need collapsing.
Prev/Next disabled and dimmed at boundaries.

---

## SEO

Each page uses react-helmet-async <Helmet>:
- HomePage: title="Vib3scape — A Dev Blog" + description meta
- BlogPage: title="Blog — Vib3scape"
- PostPage: title="{post.title} — Vib3scape" + og:title, og:description (excerpt), og:image (coverImage), twitter:card="summary_large_image"
- AboutPage: title="About — Vib3scape"
- ContactPage: title="Contact — Vib3scape"

Wrap app in <HelmetProvider> in main.tsx.

---

## FORM VALIDATION

All forms must validate on the client before submission. Do NOT use any external
validation library — implement with React useState and native HTML5 constraint API only.

### Validation approach
Use a controlled form pattern:
- Each field has its own value in state
- A separate `errors` object maps field name → error string | null
- Validation runs on submit AND on blur (after first submit attempt)
- Fields show error state immediately on blur once the form has been submitted once
  (use a `touched` object tracking which fields have been blurred post-submit)

### Contact form validation rules (ContactPage.tsx)

name:
  - Required: "Name is required"
  - Min 2 characters: "Name must be at least 2 characters"
  - Max 100 characters: "Name must be under 100 characters"
  - Pattern: letters, spaces, hyphens, apostrophes only: "Name contains invalid characters"

email:
  - Required: "Email is required"
  - Valid email format (RFC-safe regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/): "Please enter a valid email address"
  - Max 254 characters (RFC 5321 limit): "Email address is too long"

subject:
  - Required: "Subject is required"
  - Min 3 characters: "Subject must be at least 3 characters"
  - Max 150 characters: "Subject must be under 150 characters"

message:
  - Required: "Message is required"
  - Min 20 characters: "Message is too short — tell me a little more"
  - Max 5000 characters: "Message must be under 5000 characters"
  - Show character count: "{n} / 5000" below the textarea, turns accent color when > 4500

### Error display
Each field: show error message below the input in text-[#e05555] text-sm mt-1.
Input border: border-[var(--color-border)] by default,
  border-[#e05555] when field has an error and has been touched,
  border-green-500 when field is valid and has been touched.
Do NOT use red background fills — border color change only (less aggressive UX).
Error messages use role="alert" so screen readers announce them.

### Submit button state
Disabled and visually dimmed (opacity-50 cursor-not-allowed) while submitting.
Shows "Sending..." text with a spinner (animate-spin inline SVG or FaSpinner icon)
while the Formspree fetch is in flight.

### Sanitization before submit
Before sending to Formspree, trim all string values:
  name: value.trim()
  email: value.trim().toLowerCase()
  subject: value.trim()
  message: value.trim()
Never send untrimmed whitespace to the API.

### Search box validation (SearchBox.tsx)
On submit (Enter key or search button click):
  - Trim the query
  - If empty after trim: do not navigate, show inline hint text
    "Type something to search" in text-[var(--color-fg-light)] text-sm below input
  - If query < 2 characters: show "Search query is too short"
  - Max 100 characters: truncate silently (do not let user type past 100)
  - On valid query: navigate to /blog?q={encodeURIComponent(trimmedQuery)}

### HTML5 native attributes (belt-and-suspenders)
Add these to all form inputs alongside the JS validation.
They provide a fallback if JS somehow fails, and improve mobile keyboard behavior:
  name input:     type="text" maxLength={100} autoComplete="name"
  email input:    type="email" maxLength={254} autoComplete="email"
  subject input:  type="text" maxLength={150}
  message:        maxLength={5000}
  search input:   type="search" maxLength={100}

---

## ANIMATIONS

Add these CSS transitions (no external animation library needed):
- Sidebar open/close: transform translateX, 0.5s ease
- Button hover: brightness/border-color, 0.2s
- Nav submenu expand: max-height 0 → auto trick with transition (or use height animation)
- TagChip hover: slight scale(1.05), 0.15s
- PostCard image hover: scale(1.02) on the img, overflow-hidden on wrapper, 0.3s ease
- Page transitions: not required for v1

Add `is-resizing` class to body during resize (100ms debounce) to disable all
transitions during window resize (prevents visual glitches):
useEffect in Layout: window.addEventListener('resize', debounced handler that
adds/removes 'is-resizing' on document.body). CSS: body.is-resizing * { transition: none !important; }

---

## ACCESSIBILITY

- All icon-only buttons: aria-label, visually-hidden text span
- Sidebar toggle: aria-expanded={isOpen}, aria-controls="sidebar"
- Sidebar nav: role="navigation", aria-label="Main navigation"
- All images: meaningful alt text (post.title or descriptive string)
- All <time> elements: datetime={post.publishedAt}
- Focus styles: visible on all interactive elements (use Tailwind focus-visible:ring)
- Escape key: closes sidebar when open on mobile

---

## MOBILE-FIRST REQUIREMENTS

All Tailwind classes must be written mobile-first. This means the base (unprefixed)
class defines the mobile style, and responsive prefixes (md:, lg:, xl:) add
overrides for larger screens. Never write a layout class without starting from
the smallest screen first.

CORRECT:   className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
INCORRECT: className="grid grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"

### Touch targets
Every interactive element (buttons, links, nav items, accordion openers,
sidebar toggle, pagination controls, tag chips) must have a minimum tap target
of 44×44px on mobile. Achieve this with min-h-[44px] min-w-[44px] or padding
that reaches that size. This is non-negotiable for iOS and Android usability.

### Sidebar toggle button
Position: fixed, top-0, left-0, z-50. Visible only on screens ≤ 1280px (hidden on lg+).
Size: w-[44px] h-[44px] minimum. Background: var(--color-bg-alt) with a subtle
border-right and border-bottom. Icon: FaBars (closed) / FaXmark (open), centered.
When sidebar is open on mobile, the toggle moves with the sidebar edge — achieve this
by placing the toggle INSIDE the sidebar div as an absolutely-positioned element
at top:0, right:-44px (outside the sidebar's right edge), so it slides with the sidebar.

### Typography — mobile scale
Body text: text-sm (14px) on mobile, text-base (16px) on md+.
h1: text-3xl on mobile, text-4xl on md+, text-5xl on xl+.
h2: text-xl on mobile, text-2xl on md+.
h3: text-lg on mobile, text-xl on md+.
Line height: leading-relaxed on all body text (1.625).

### Banner (mobile)
flex-col (stacked) by default. Image on top: w-full h-48 object-cover.
Content below: full width, text-center on mobile, text-left on md+.
Button: w-full on mobile (block), auto width on md+.

### Posts grid (mobile)
grid-cols-1 by default. grid-cols-2 on md. grid-cols-3 on xl.
Card borders: show border-b between all cards on mobile (no border-r on single column).
On md (2 cols): border-r on odd cards, border-b on all but last row.
On xl (3 cols): original pseudo-element pattern.

### Post page prose (mobile)
PostBody wrapper: max-w-none on mobile, max-w-3xl mx-auto on lg+.
This prevents ultra-wide line lengths on tablets in landscape.
Font size: text-base (16px) minimum — never smaller in prose.
Images inside prose: w-full, h-auto, rounded.

### Contact form (mobile)
All fields: full width (w-full), stacked vertically.
No multi-column form layout on any breakpoint — single column throughout.
Input/textarea min-height: 44px for inputs, 120px for textarea.
Submit button: w-full on mobile, w-auto on md+.

### NavMenu accordion (mobile)
Each top-level nav item: min-h-[44px], flex items-center, px-4.
Submenu items: min-h-[40px], pl-8 (indented), flex items-center.
Opener caret: FaChevronDown, transition-transform duration-200,
rotate-180 when open. Touch area covers full row width.

### Pagination (mobile)
On mobile (< md): show only Prev, current page indicator ("Page 2 of 8"), and Next.
On md+: show full page number list.
All buttons: min 44px height.

### Header (mobile)
Logo and icons in a flex row. On very small screens (< sm, < 480px):
hide LinkedIn icon to prevent overflow (hidden sm:flex).
Social icons: gap-3 minimum between icons, each icon link min 44px tap target.

### MiniPosts (mobile)
Thumbnail: 64×64px on mobile (not 80px) to give title more room.
Title: clamp to 2 lines (line-clamp-2). Date: text-xs.

### Overlay (mobile sidebar)
When sidebar is open on mobile: a full-screen semi-transparent overlay
(fixed inset-0 bg-black/40 z-40) renders behind the sidebar (z-50) and
above #main. Clicking it closes the sidebar. This must be present — without it,
users on mobile have no intuitive way to close the sidebar.

### Tap highlight
Add to globals.css:
* { -webkit-tap-highlight-color: transparent; }
This removes the blue flash on tap on Android Chrome for custom interactive elements.

### Resize transition lock
In globals.css:
body.is-resizing * { transition: none !important; }
In Layout.tsx useEffect: debounced resize listener adds/removes 'is-resizing'
on document.body with a 100ms timeout. Prevents sidebar/layout glitches during
orientation changes on mobile.

### Viewport meta (index.html)
<meta name="viewport" content="width=device-width, initial-scale=1" />
NO user-scalable=no. NO maximum-scale. Users must be able to pinch-zoom.

---

## FILE EXECUTION ORDER

Build in this order. Report what you are about to build before each group. Wait for confirmation.

GROUP 1: Project scaffolding
  vite.config.ts, tailwind.config.ts, tsconfig.json, index.html, src/main.tsx, src/styles/globals.css

GROUP 2: Types and data
  src/types/index.ts, src/data/posts.ts, src/services/posts.ts

GROUP 3: Hooks
  src/hooks/useSidebarLock.ts, src/hooks/useSidebarToggle.ts

GROUP 4: UI primitives
  src/components/ui/Button.tsx, src/components/ui/TagChip.tsx,
  src/components/ui/SectionHeader.tsx, src/components/ui/DarkModeToggle.tsx

GROUP 5: Layout shell
  src/components/layout/Layout.tsx, src/components/layout/Header.tsx,
  src/components/layout/SidebarToggle.tsx

GROUP 6: Sidebar
  src/components/sidebar/Sidebar.tsx, src/components/sidebar/SearchBox.tsx,
  src/components/sidebar/NavMenu.tsx, src/components/sidebar/MiniPosts.tsx,
  src/components/sidebar/ContactInfo.tsx

GROUP 7: Home page components
  src/components/home/Banner.tsx, src/components/home/FeaturesGrid.tsx,
  src/components/home/PostsGrid.tsx

GROUP 8: Blog components
  src/components/blog/PostCard.tsx, src/components/blog/PostList.tsx,
  src/components/blog/Pagination.tsx

GROUP 9: Post components
  src/components/post/PostMeta.tsx, src/components/post/PostBody.tsx,
  src/components/post/PostNav.tsx

GROUP 10: Pages + routing
  src/pages/HomePage.tsx, src/pages/BlogPage.tsx, src/pages/PostPage.tsx,
  src/pages/AboutPage.tsx, src/pages/ContactPage.tsx, src/pages/NotFoundPage.tsx,
  src/App.tsx

---

HALLUCINATION GUARD: If at any point you are uncertain about a prop type, a component
API, a Tailwind class, or any implementation detail — STOP. Do not guess. Report
exactly what you are uncertain about verbatim and wait for instruction before continuing.
```

---

## 12. Post-Build Checklist

Run through this after the agent finishes before calling it done.

### Visual
- [ ] Sidebar is 26rem wide on desktop, collapses cleanly on ≤1280px
- [ ] Sidebar scroll-lock works: scroll a long page, confirm sidebar bottom stays pinned
- [ ] Dark mode toggle works; preference survives page reload
- [ ] Banner 50/50 split correct; stacks on mobile
- [ ] Post cards have consistent height in the 3-col grid
- [ ] Tag chips visible and linked

### Functional
- [ ] All routes load without 404 in Vite dev server
- [ ] Clicking a post card navigates to correct post page
- [ ] Pagination changes page and updates URL param
- [ ] Search/tag filter in BlogPage works
- [ ] Contact form submits (test with real Formspree endpoint)
- [ ] Escape key closes mobile sidebar
- [ ] Clicking outside sidebar on mobile closes it

### Form validation
- [ ] Contact form: all 4 fields show errors on submit if empty
- [ ] Contact form: errors appear on blur after first submit attempt (touched pattern)
- [ ] Email field rejects obviously invalid formats (e.g. "notanemail")
- [ ] Message field shows character count; turns accent color above 4500 chars
- [ ] Submit button shows "Sending..." + spinner while request is in flight
- [ ] Submit button is disabled while submitting (no double-submit)
- [ ] Success message appears after Formspree responds 200
- [ ] Error message appears if Formspree responds with non-200
- [ ] All field values are trimmed before submission
- [ ] Search box does not navigate on empty or whitespace-only query
- [ ] Search box shows hint text for queries under 2 characters
- [ ] Error messages have `role="alert"` (test with axe DevTools)
- [ ] Invalid inputs show red border, valid touched inputs show green border

### Code quality
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] No components importing directly from `src/data/posts.ts` (all via services)
- [ ] No jQuery, no vendor prefixes, no `user-scalable=no`
- [ ] All images have non-empty alt attributes
- [ ] All `<time>` elements have `datetime` attribute

### Performance
- [ ] No FontAwesome webfont files (using react-icons only)
- [ ] Images lazy-loaded (`loading="lazy"`)
- [ ] Passive scroll listeners confirmed in useSidebarLock

---

## 13. Security, Secrets & Git Hygiene

### The Golden Rule
**A secret that has ever touched a git commit is a compromised secret — even if you delete it in a later commit.** Git history is permanent. `git log` will show it forever. Scrubbing it requires `git filter-repo` which rewrites history and is painful on a pushed repo. Do it right from the first commit.

---

### 13a. Project Initialization Checklist
Run through this before you write a single line of application code.

**Step 1 — Scaffold and gitignore first**
- [ ] `npm create vite@latest vib3scape -- --template react-ts`
- [ ] `cd vib3scape && git init`
- [ ] Verify `.gitignore` exists (Vite creates one — review and extend it)
- [ ] Create `.env.local` (your real secrets go here)
- [ ] Create `.env.example` (placeholder values, committed to repo)
- [ ] Run `git status` — confirm `.env.local` is NOT listed (it should be gitignored already by Vite's default)
- [ ] If `.env.local` IS listed: add it to `.gitignore` immediately, before first commit
- [ ] Make your first commit: scaffolding + gitignore only — nothing else

**Step 2 — Confirm gitignore covers everything**
Open `.gitignore` and verify these lines exist. Add any that are missing:

```gitignore
# Environment variables — NEVER commit these
.env
.env.local
.env.development
.env.development.local
.env.test
.env.test.local
.env.production
.env.production.local

# Dependencies
node_modules/

# Build output
dist/
dist-ssr/

# Vite cache
.vite/

# Editor config (optional — keep if you want to share editor settings)
.vscode/settings.json
.idea/

# OS artifacts
.DS_Store
.DS_Store?
._*
Thumbs.db
ehthumbs.db
Desktop.ini

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# TypeScript build info
*.tsbuildinfo
```

- [ ] Every line above is present in `.gitignore`
- [ ] Run `git check-ignore -v .env.local` — must output a match (confirms it's ignored)
- [ ] Run `git check-ignore -v .env` — must output a match

**Step 3 — Create your .env files**

`.env.example` (commit this — no real values):
```
# Formspree
VITE_FORMSPREE_ID=your_formspree_form_id_here

# Supabase (Phase 2)
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

`.env.local` (NEVER commit — put real values here):
```
VITE_FORMSPREE_ID=xAbCdEf12
```

- [ ] `.env.example` committed and pushed
- [ ] `.env.local` created locally with real Formspree ID
- [ ] `import.meta.env.VITE_FORMSPREE_ID` used in ContactPage.tsx (not a hardcoded string)
- [ ] Searched entire codebase for your real Formspree ID — it must appear ONLY in `.env.local`

---

### 13b. Pre-Commit Security Checklist
Run this before EVERY `git push` that introduces new third-party integrations.

**Scan for secrets before pushing:**
- [ ] Run `git diff --staged` and visually scan for any API keys, tokens, passwords, or IDs
- [ ] Search staged files: `git diff --staged | grep -iE "(key|secret|token|password|api_key|formspree|supabase)" `
- [ ] Confirm no `.env*` files appear in `git status` output (other than `.env.example`)
- [ ] Confirm `node_modules/` does not appear in `git status`

**Check environment variable usage:**
- [ ] All secrets accessed via `import.meta.env.VITE_*` in code
- [ ] No hardcoded IDs, keys, or tokens anywhere in `src/`
- [ ] `grep -r "formspree.io/f/" src/` returns only a reference to `import.meta.env`, never a literal ID
- [ ] (Phase 2) `grep -r "supabase" src/` — all occurrences use env vars, not literals

---

### 13c. Vercel Deployment Secrets Checklist
When you deploy to Vercel, environment variables must be added through the Vercel dashboard — not through committed files.

- [ ] In Vercel project → Settings → Environment Variables:
  - [ ] `VITE_FORMSPREE_ID` added for Production environment
  - [ ] (Phase 2) `VITE_SUPABASE_URL` added for Production
  - [ ] (Phase 2) `VITE_SUPABASE_ANON_KEY` added for Production
- [ ] After adding vars in Vercel: trigger a redeploy (Vercel does not auto-redeploy on env var changes)
- [ ] Test the live URL — contact form submits successfully
- [ ] Variables are NOT visible in your deployed JS bundle:
  - Open deployed site → DevTools → Sources → search for your Formspree ID
  - `VITE_*` variables ARE inlined into the client bundle by Vite — this is expected and fine for Formspree (the form ID is not a secret, just an identifier). See note below.

> **Important note on VITE_ variables:** Anything prefixed `VITE_` is intentionally exposed to the browser. This is correct for Formspree (the form ID is public-safe — Formspree protects against spam via allowed origins, not secret keys). For Supabase, the anon key is also designed to be public. True secrets (private API keys, service-role keys, database passwords) must NEVER use the `VITE_` prefix and must only be used in server-side code (e.g. Vercel serverless functions, not in your React components).

---

### 13d. Phase 2 — When You Add Supabase

When you wire Supabase, additional security steps apply:

- [ ] Use ONLY the `anon` key in frontend code (`VITE_SUPABASE_ANON_KEY`) — never the `service_role` key
- [ ] Enable Row Level Security (RLS) on every Supabase table — especially `posts`
- [ ] Add RLS policy: public read access on `posts` table (so blog posts are publicly readable)
- [ ] Add RLS policy: no public write/update/delete on `posts` (only authenticated users or service role)
- [ ] In Supabase dashboard → Authentication → URL Configuration:
  - [ ] Add your Vercel production URL to allowed redirect URLs
  - [ ] Add `localhost:5173` for local dev
- [ ] Never query Supabase with the service_role key from browser code — it bypasses all RLS

---

### 13e. Ongoing Security Habits

**Dependency hygiene:**
- [ ] Run `npm audit` before deploying to production — fix critical and high severity issues
- [ ] Keep dependencies updated: `npm outdated` monthly check
- [ ] Use `npm ci` (not `npm install`) in CI/CD pipelines — installs exact locked versions

**GitHub repo settings:**
- [ ] Go to repo → Settings → Security → Enable Dependabot alerts
- [ ] Enable Dependabot security updates (auto PRs for vulnerable deps)
- [ ] Enable Secret scanning (GitHub will alert you if it detects a secret in a push)
  - Settings → Security → Secret scanning → Enable
  - This is your safety net — but don't rely on it. Prevention beats detection.

**Formspree-specific:**
- [ ] In Formspree dashboard → your form → Settings:
  - [ ] Add your Vercel production domain to "Allowed Domains" (blocks submissions from other origins)
  - [ ] Enable reCAPTCHA or Formspree's honeypot spam protection
  - [ ] Set up email notifications for new submissions

**Commit message hygiene:**
- [ ] Never include API keys, passwords, or tokens in commit messages
- [ ] Use meaningful messages: "feat: add contact form with Formspree integration" not "added stuff"
- [ ] Commit in logical units — one feature/fix per commit, not a giant dump

---

### 13f. If You Ever Accidentally Commit a Secret

Do this immediately — do not wait:

1. **Revoke the secret first** — go to Formspree/Supabase/wherever and regenerate/invalidate the key. The git history problem is secondary to the key being live.
2. **Do NOT just delete the file and commit** — the secret is still in history.
3. **Remove from history:**
   ```bash
   # Install git-filter-repo (pip install git-filter-repo)
   git filter-repo --path .env --invert-paths
   # This removes .env from entire history
   ```
4. **Force push:**
   ```bash
   git push origin --force --all
   ```
5. **Notify collaborators** (if any) — their local clones still have the old history. They must re-clone.
6. **Rotate the secret again** after the history is clean — treat the key as permanently compromised regardless.

---

## 14. Phase 2 Roadmap (After Build)

These are intentionally out of scope for the initial build but are natural next steps:

1. **Supabase migration** — swap `src/services/posts.ts` internals, add loading/error states to pages
2. **Markdown support** — store content as `.md` files or Supabase markdown field, render with `marked` or `remark`
3. **Real search** — Fuse.js client-side fuzzy search, or Supabase full-text search
4. **RSS feed** — generate `/rss.xml` at build time with Vite plugin
5. **Reading progress bar** — thin accent-colored bar at top of post page
6. **Table of contents** — parse h2/h3 from post content, render in sidebar on post pages
7. **Code block enhancements** — syntax highlighting with `highlight.js` or `prism`, copy-to-clipboard button
8. **Comments** — Giscus (GitHub Discussions-based, free, no backend)
9. **Analytics** — Plausible or Umami (privacy-respecting, self-hostable)
10. **OG image generation** — Vercel OG or `satori` for dynamic per-post social cards
