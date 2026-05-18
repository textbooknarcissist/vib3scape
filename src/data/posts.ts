/**
 * Static mock post data.
 *
 * IMPORTANT: Do NOT import this file from components or pages.
 * Always go through src/services/posts.ts so the data source can be swapped
 * (e.g. to Supabase) without touching any UI code.
 */
import type { Post } from '../types';

const AUTHOR = {
  name: 'Ted Vibes',
  avatar: 'https://picsum.photos/seed/author/80/80',
  bio: 'Frontend engineer obsessed with TypeScript, great DX, and CSS that actually makes sense.',
};

export const posts: Post[] = [
  // ─── 1 ───────────────────────────────────────────────────────────────────
  {
    id: '1',
    slug: 'typescript-discriminated-unions',
    title: 'Mastering Discriminated Unions in TypeScript',
    excerpt:
      'Learn how discriminated unions eliminate impossible states and make your TypeScript code self-documenting and runtime-safe.',
    coverImage: 'https://picsum.photos/seed/typescript-discriminated-unions/800/450',
    author: AUTHOR,
    publishedAt: '2025-11-14T09:00:00Z',
    tags: ['TypeScript', 'JavaScript'],
    featured: true,
    content: `
<h2>What Is a Discriminated Union?</h2>
<p>A discriminated union (also called a tagged union) is a TypeScript pattern that combines a union type with a shared literal property — the <em>discriminant</em> — that lets the compiler narrow the type inside a <code>switch</code> or <code>if</code> block.</p>
<p>Without them, you end up with optional properties scattered everywhere, forcing you to write defensive null-checks that the type system can't actually verify. With them, impossible states become unrepresentable at the type level.</p>

<h2>A Practical Example: Async Request State</h2>
<p>Consider modelling the lifecycle of an HTTP request. A naive approach might look like this:</p>

<pre><code>// ❌ Naive — allows impossible combinations
interface RequestState {
  loading: boolean;
  data?: User;
  error?: string;
}

// This compiles even though it makes no sense:
const bad: RequestState = { loading: false, data: undefined, error: undefined };</code></pre>

<p>With a discriminated union the compiler enforces the correct shape at every callsite:</p>

<pre><code>// ✅ Discriminated union — only valid states exist
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; message: string };

function render(state: RequestState) {
  switch (state.status) {
    case 'idle':    return &lt;p&gt;Ready.&lt;/p&gt;;
    case 'loading': return &lt;Spinner /&gt;;
    case 'success': return &lt;UserCard user={state.data} /&gt;;
    case 'error':   return &lt;p&gt;{state.message}&lt;/p&gt;;
  }
}</code></pre>

<blockquote>
  "Make illegal states unrepresentable." — Richard Feldman. This single principle will improve the quality of your TypeScript more than any other technique.
</blockquote>

<h2>When to Reach for This Pattern</h2>
<ul>
  <li>Async data fetching (idle / loading / success / error)</li>
  <li>Multi-step form wizards with distinct step data</li>
  <li>Event payloads in a reducer or state machine</li>
  <li>API response shapes that vary by <code>type</code> field</li>
</ul>

<p>The exhaustiveness check is a bonus: add a <code>default: assertNever(state)</code> branch and TypeScript will error at compile time if you ever forget to handle a new variant.</p>
`,
  },

  // ─── 2 ───────────────────────────────────────────────────────────────────
  {
    id: '2',
    slug: 'react-server-components-mental-model',
    title: 'React Server Components: The Mental Model You Actually Need',
    excerpt:
      'RSC blurs the client/server boundary in a way that trips everyone up at first. Here is the clearest framing I have found.',
    coverImage: 'https://picsum.photos/seed/react-server-components-mental-model/800/450',
    author: AUTHOR,
    publishedAt: '2025-10-28T08:00:00Z',
    tags: ['React', 'Performance'],
    featured: true,
    content: `
<h2>The Core Shift</h2>
<p>For a decade, React components ran in one place: the browser. React Server Components (RSC) change that. A server component renders on the server — once — and sends serialised UI to the client. It never ships its own JavaScript bundle to the browser.</p>
<p>The mental model that clicked for me: think of server components as the <em>database query layer</em>. They exist to fetch data and shape it into a tree that client components can consume. They have no state, no effects, and no event handlers.</p>

<h2>What Changes in Practice</h2>
<p>The biggest practical change is the import boundary. Anything you import inside a server component runs <em>only</em> on the server — including your database client, environment variables, and heavy parsing libraries. None of that code appears in the JS bundle.</p>

<pre><code>// app/posts/page.tsx — Server Component (no 'use client')
import { db } from '@/lib/db';

export default async function PostsPage() {
  // This query runs on the server. The DB client never ships to the browser.
  const posts = await db.post.findMany({ orderBy: { createdAt: 'desc' } });
  return &lt;PostList posts={posts} /&gt;;
}</code></pre>

<blockquote>
  Server components are not a replacement for client components — they are a complement. Interactive UI still needs <code>'use client'</code>. The skill is knowing where to draw the line.
</blockquote>

<h2>Common Mistakes</h2>
<ul>
  <li>Wrapping everything in <code>'use client'</code> "to be safe" — you lose all the bundle-size benefits</li>
  <li>Trying to pass non-serialisable props (functions, class instances) across the server/client boundary</li>
  <li>Forgetting that context providers must be client components</li>
  <li>Not co-locating data fetching with the component that needs it</li>
</ul>

<p>Once the mental model settles, RSC feels like the obvious way to build React apps. It is just a new boundary — not a new framework.</p>
`,
  },

  // ─── 3 ───────────────────────────────────────────────────────────────────
  {
    id: '3',
    slug: 'css-cascade-layers-explained',
    title: 'CSS Cascade Layers Explained for People Who Hate Specificity Wars',
    excerpt:
      'Cascade layers let you declare the order of specificity battles before they happen. No more !important arms races.',
    coverImage: 'https://picsum.photos/seed/css-cascade-layers-explained/800/450',
    author: AUTHOR,
    publishedAt: '2025-10-05T10:30:00Z',
    tags: ['CSS', 'Design'],
    content: `
<h2>The Problem with Specificity</h2>
<p>Every CSS developer has been there: you write a component style, it works fine, then a third-party library import flips your layout. You add a more specific selector. The library gets updated. You add <code>!important</code>. Your colleague adds a more specific <code>!important</code>. Welcome to specificity hell.</p>
<p>Cascade layers fix this at the architectural level. Instead of fighting specificity after the fact, you declare a layer order upfront and rules in a later layer always win — regardless of selector specificity.</p>

<h2>Declaring Layers</h2>

<pre><code>/* Declare the order first — this is the source of truth */
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
}

@layer components {
  .card { border-radius: 0.5rem; padding: 1rem; }
}

@layer utilities {
  /* Utilities win over components, regardless of selector specificity */
  .p-0 { padding: 0; }
}</code></pre>

<blockquote>
  "Layers let you reason about override order without counting 0-1-3 specificity tuples in your head." — Miriam Suzanne, CSS specification editor.
</blockquote>

<h2>Real-World Uses</h2>
<ul>
  <li>Importing third-party CSS into a named layer so it cannot override your styles</li>
  <li>Building a design system with predictable component → utility override order</li>
  <li>Integrating Tailwind reset styles without them clobbering your base layer</li>
  <li>Safely upgrading normalize.css without auditing specificity</li>
</ul>

<p>Browser support is now universal (Chrome 99+, Firefox 97+, Safari 15.4+). If you are not using cascade layers yet, start on your next project. Your future self will thank you.</p>
`,
  },

  // ─── 4 ───────────────────────────────────────────────────────────────────
  {
    id: '4',
    slug: 'landing-your-first-dev-job-2025',
    title: 'Landing Your First Dev Job in 2025: What Actually Works',
    excerpt:
      'Hundreds of applications and silence in return? Here is what changed when I shifted from applying to building in public.',
    coverImage: 'https://picsum.photos/seed/landing-your-first-dev-job-2025/800/450',
    author: AUTHOR,
    publishedAt: '2025-09-18T07:00:00Z',
    tags: ['Career'],
    content: `
<h2>The Application Volume Trap</h2>
<p>Early in my job search I sent over 200 applications in two months. I got four responses. The math felt catastrophic. The problem was not my skills — it was that I was invisible. My resume looked identical to everyone else who had completed the same bootcamp or degree program.</p>
<p>The pivot that changed everything was treating job hunting as a distribution problem, not a volume problem. Instead of sending more applications, I focused on being findable before positions were even posted.</p>

<h2>What Actually Moved the Needle</h2>

<pre><code>// The three levers that generated inbound interest for me:
const strategy = {
  buildInPublic: 'Tweet/post your learning daily — even tiny wins',
  portfolioProjects: 'Solve a real problem you personally experienced',
  targetedOutreach: 'DM engineers at companies you admire, not recruiters',
};</code></pre>

<blockquote>
  "Your portfolio is not a collection of projects. It is proof that you solve problems." — advice from the first senior engineer who responded to my cold DM.
</blockquote>

<h2>The Cold DM Template That Gets Replies</h2>
<ul>
  <li>One sentence about a specific thing you genuinely like about their work</li>
  <li>One sentence about a real problem you solved that is relevant to them</li>
  <li>A link to the relevant project — not your whole portfolio</li>
  <li>No ask for a job — ask for 15 minutes of feedback instead</li>
</ul>

<p>Building in public is uncomfortable at first. You feel like no one is watching and you are shouting into a void. But the compound effect over 3–6 months is real. Engineers at companies you admire will have seen your name before your application lands in their inbox.</p>

<h2>On Portfolio Projects</h2>
<p>A weather app and a to-do list will not get you hired in 2025. Build something that solves a problem you personally experienced. The best portfolio projects have a story: "I built this because I was frustrated that no tool did X." That narrative is memorable in an interview in a way that a CRUD app never is.</p>
`,
  },

  // ─── 5 ───────────────────────────────────────────────────────────────────
  {
    id: '5',
    slug: 'vite-vs-webpack-2025',
    title: 'Vite vs Webpack in 2025: When Does Webpack Still Win?',
    excerpt:
      'Vite is the obvious default for greenfield projects. But Webpack is not dead — here is where it still earns its keep.',
    coverImage: 'https://picsum.photos/seed/vite-vs-webpack-2025/800/450',
    author: AUTHOR,
    publishedAt: '2025-09-02T11:00:00Z',
    tags: ['Tools', 'Performance'],
    content: `
<h2>Why Vite Won the DX War</h2>
<p>For new projects there is almost no argument left for choosing Webpack. Vite's native ESM dev server starts in under 300ms regardless of project size, HMR updates apply in single-digit milliseconds, and the config API is dramatically simpler. The developer experience gap is not small — it is enormous.</p>
<p>The key insight behind Vite's speed is that it does not bundle during development at all. It serves source files as native ES modules and lets the browser do the dependency graph work. Bundling only happens at build time, and even then Rollup is significantly faster than Webpack for most output sizes.</p>

<h2>Where Webpack Still Earns Its Place</h2>

<pre><code>// Scenarios where Webpack's plugin ecosystem still matters:
const webpackAdvantages = [
  'Module Federation — micro-frontend architectures at scale',
  'Legacy browser targets below ES2015 with complex transforms',
  'Monorepos already deeply invested in Webpack plugin ecosystem',
  'Custom chunk splitting strategies for very large SPAs',
  'Build caches that need to persist across CI machines (filesystem cache)',
];</code></pre>

<blockquote>
  Module Federation is Webpack's killer feature. Until an equivalent lands in Vite's ecosystem with the same production maturity, large micro-frontend platforms should think twice before migrating.
</blockquote>

<h2>The Migration Decision</h2>
<ul>
  <li>Greenfield project: Vite, no question</li>
  <li>Small-to-medium existing Webpack project: migrate, the ROI is fast</li>
  <li>Large Webpack project with Module Federation: wait, evaluate @module-federation/vite</li>
  <li>Enterprise monorepo with custom Webpack plugins: audit plugin parity first</li>
</ul>

<p>The trajectory is clear. Vite — or the Rust-native tools it is converging with (Rolldown, Turbopack, Rspack) — will be the default for everything within two years. The question is not whether to migrate, but when.</p>
`,
  },

  // ─── 6 ───────────────────────────────────────────────────────────────────
  {
    id: '6',
    slug: 'react-usereducer-patterns',
    title: 'useReducer Patterns Worth Keeping in Your Toolkit',
    excerpt:
      'useState is fine for simple values, but these four useReducer patterns will tame complex component state before it escapes into context.',
    coverImage: 'https://picsum.photos/seed/react-usereducer-patterns/800/450',
    author: AUTHOR,
    publishedAt: '2025-08-15T09:30:00Z',
    tags: ['React', 'TypeScript'],
    content: `
<h2>When useState Starts to Hurt</h2>
<p>The smell is familiar: five or six <code>useState</code> calls at the top of a component, each one updating in lockstep with others, each update requiring you to remember which other states to update simultaneously. You are managing a state machine manually, and it is painful.</p>
<p><code>useReducer</code> is the answer. It centralises transitions, makes state changes auditable, and pairs beautifully with discriminated union action types so TypeScript can verify every dispatch.</p>

<h2>Pattern 1: Enum-Gated Actions with Exhaustive Dispatch</h2>

<pre><code>type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET'; payload: number };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    case 'RESET':     return action.payload;
    // TypeScript errors here if a new Action variant is unhandled
  }
}</code></pre>

<blockquote>
  A reducer is just a pure function from (state, action) → state. Keep it pure and you get time-travel debugging, easy testing, and zero surprises.
</blockquote>

<h2>Four Patterns Worth Knowing</h2>
<ul>
  <li><strong>Slice reducers</strong> — split a large reducer into domain-specific sub-reducers and combine them</li>
  <li><strong>Immer integration</strong> — use <code>produce</code> inside the reducer for deeply nested state mutations without spread hell</li>
  <li><strong>Reducer + context</strong> — replace custom event buses with a local store that child components subscribe to via <code>useContext</code></li>
  <li><strong>State machines as reducers</strong> — model explicit states and valid transitions; invalid state mutations simply return the current state unchanged</li>
</ul>

<p>You do not need Redux for any of these patterns. The combination of <code>useReducer</code> + <code>useContext</code> + TypeScript discriminated unions handles the vast majority of complex component state in a React application without any additional dependencies.</p>
`,
  },

  // ─── 7 ───────────────────────────────────────────────────────────────────
  {
    id: '7',
    slug: 'container-queries-real-world',
    title: 'Container Queries in the Real World: Beyond the Demos',
    excerpt:
      'Every demo shows a card resizing in isolation. Here is how container queries actually change component architecture in a production design system.',
    coverImage: 'https://picsum.photos/seed/container-queries-real-world/800/450',
    author: AUTHOR,
    publishedAt: '2025-07-22T08:00:00Z',
    tags: ['CSS', 'Design', 'Performance'],
    content: `
<h2>The Promise: Truly Context-Aware Components</h2>
<p>Viewport media queries have always been a compromise. A card component placed in a full-width main column needs different styles than the same card in a narrow sidebar — but a viewport query has no idea where the card lives in the layout. You end up with modifier classes, render props, or JS-based ResizeObserver hacks.</p>
<p>Container queries solve this at the CSS level. The component responds to its container's size, not the viewport's. The component is truly portable.</p>

<h2>Setting Up a Container</h2>

<pre><code>/* Make the wrapper a container */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* Style the card relative to its container width */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}</code></pre>

<blockquote>
  Container queries do not replace media queries — they complement them. Use media queries for page-level layout decisions and container queries for component-level ones.
</blockquote>

<h2>What This Changes in a Design System</h2>
<ul>
  <li>Cards, list items, and tiles can be defined once and placed anywhere without variant props</li>
  <li>Sidebar widgets automatically reflow without knowing their placement context</li>
  <li>Responsive tables can collapse columns based on their own width, not the viewport</li>
  <li>Documentation components (like a code preview pane) can show full or compact views based on available space</li>
</ul>

<p>The browser support story is now solid: Chrome 105+, Firefox 110+, Safari 16+. If you are building a design system today and not using container queries, you are writing more code than you need to.</p>
`,
  },

  // ─── 8 ───────────────────────────────────────────────────────────────────
  {
    id: '8',
    slug: 'measuring-core-web-vitals-locally',
    title: 'Measuring Core Web Vitals Locally Before They Cost You Rankings',
    excerpt:
      'Lighthouse is not enough. Here is the local toolchain I use to catch LCP, CLS, and INP regressions before they hit production.',
    coverImage: 'https://picsum.photos/seed/measuring-core-web-vitals-locally/800/450',
    author: AUTHOR,
    publishedAt: '2025-06-30T10:00:00Z',
    tags: ['Performance', 'Tools'],
    content: `
<h2>Why Lighthouse Is Not Enough</h2>
<p>Lighthouse runs in a throttled, sandboxed environment that bears little resemblance to how real users experience your site. The scores are useful for catching egregious regressions, but a 94 Lighthouse score does not mean your LCP is good on a mid-range Android device in India on a 4G connection. It means it is fine in a Chrome DevTools simulation.</p>
<p>The gap between Lighthouse scores and field data (CrUX) is why teams are surprised when their "fast" site tanks in Search Console. You need tools that measure the same signals Google actually uses.</p>

<h2>The Local Toolchain</h2>

<pre><code># 1. web-vitals library — measure in the browser during dev
npm install web-vitals

# In your app entry point:
import { onLCP, onCLS, onINP } from 'web-vitals';
onLCP(console.log);
onCLS(console.log);
onINP(console.log);

# 2. Playwright + web-vitals for CI
# 3. Chrome DevTools Performance panel — Interactions track for INP
# 4. WebPageTest for waterfall analysis with real devices</code></pre>

<blockquote>
  INP (Interaction to Next Paint) replaced FID as a Core Web Vital in March 2024. If your tooling still reports FID, it is out of date.
</blockquote>

<h2>The Five Things That Move CWV Most</h2>
<ul>
  <li><strong>LCP:</strong> Preload the hero image, use <code>fetchpriority="high"</code>, serve from a CDN close to the user</li>
  <li><strong>CLS:</strong> Always specify explicit width and height on images and video embeds</li>
  <li><strong>INP:</strong> Break up long tasks, defer non-critical JS with <code>scheduler.yield()</code></li>
  <li><strong>TTFB:</strong> Cache at the edge — a slow server makes every other metric worse</li>
  <li><strong>FCP:</strong> Inline critical CSS, avoid render-blocking scripts</li>
</ul>

<p>The fastest path to better field data is almost always fixing LCP. It is the most impactful signal, the most correlated with user-perceived speed, and usually the one with the most obvious fix: your hero image is too large and not preloaded.</p>
`,
  },
];
