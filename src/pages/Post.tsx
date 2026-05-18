import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug } from '@/services/posts';
import { PostMeta } from '@/components/post/PostMeta';
import { PostContent } from '@/components/post/PostContent';
import { AuthorBox } from '@/components/post/AuthorBox';
import { Button } from '@/components/ui/Button';

export function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  // ── Error Fallback: Article Not Found ──
  if (!post) {
    return (
      <>
        <Helmet>
          <title>Article Not Found | Vib3scape</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>

        <div className="py-16 px-4 max-w-lg mx-auto flex flex-col items-center justify-center text-center">
          <span className="text-5xl mb-6 select-none" role="img" aria-label="Not Found">
            📄❌
          </span>
          <h1 className="font-[var(--font-heading)] font-bold text-2xl md:text-3xl text-[var(--color-fg-bold)] mb-3">
            Article Not Found
          </h1>
          <p className="text-sm md:text-base text-[var(--color-fg-light)] leading-relaxed mb-8">
            The article you are trying to view does not exist, or has been removed. Check the URL or browse our recent archives instead.
          </p>
          <Button href="/blog" variant="primary" size="md">
            Go to Blog Archive
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Vib3scape</title>
        <meta name="description" content={post.excerpt} />
        
        {/* OpenGraph & Social meta headers */}
        <meta property="og:title" content={`${post.title} | Vib3scape`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author.name} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | Vib3scape`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.coverImage} />
      </Helmet>

      <div className="py-8 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full flex flex-col">
        {/* Breadcrumbs navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 select-none">
          <ol className="flex items-center gap-2 text-xs font-semibold text-[var(--color-fg-light)] uppercase tracking-wider">
            <li>
              <Link to="/" className="hover:text-[var(--color-accent)] transition-colors duration-200">
                Home
              </Link>
            </li>
            <span aria-hidden="true">&rsaquo;</span>
            <li>
              <Link to="/blog" className="hover:text-[var(--color-accent)] transition-colors duration-200">
                Blog
              </Link>
            </li>
            <span aria-hidden="true">&rsaquo;</span>
            <li className="text-[var(--color-fg-bold)] truncate max-w-[150px] sm:max-w-[240px]">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* ── Header Title & Meta details ── */}
        <header className="mb-6">
          <h1
            className={[
              'font-[var(--font-heading)]',
              'font-bold text-[var(--color-fg-bold)]',
              'text-3xl md:text-4xl xl:text-5xl',
              'leading-tight tracking-tight mb-4',
            ].join(' ')}
          >
            {post.title}
          </h1>

          {/* Large Header Metadata block */}
          <div className="border-y border-[var(--color-border)] py-1.5">
            <PostMeta post={post} compact={false} />
          </div>
        </header>

        {/* ── Content Area ── */}
        <PostContent post={post} />

        {/* Divider */}
        <div className="w-full h-px bg-[var(--color-border)] my-12" />

        {/* ── Author Box biographical detail ── */}
        <AuthorBox author={post.author} />
      </div>
    </>
  );
}
