import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllPosts } from '@/services/posts';
import { PostList } from '@/components/blog/PostList';
import { Pagination } from '@/components/blog/Pagination';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';

const POSTS_PER_PAGE = 6;

export function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract params
  const q = searchParams.get('q') || '';
  const tag = searchParams.get('tag') || '';
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? Math.max(1, parseInt(pageParam) || 1) : 1;

  // Reset pagination to page 1 if query or tag filter changes
  useEffect(() => {
    if (pageParam && parseInt(pageParam) > 1 && (!q && !tag)) {
      // Keep page if navigating directly, otherwise let it stand.
    }
  }, [q, tag, pageParam]);

  // Combined search and tag filter logic
  const allPosts = getAllPosts();
  const filteredPosts = allPosts.filter((post) => {
    const matchesTag = tag ? post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase()) : true;
    
    let matchesQuery = true;
    if (q) {
      const lowerQuery = q.toLowerCase();
      matchesQuery =
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery) ||
        post.tags.some(t => t.toLowerCase().includes(lowerQuery));
    }

    return matchesTag && matchesQuery;
  });

  // Calculate pagination offsets
  const totalPosts = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  
  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Set page parameter helper
  const handlePageChange = (nextPage: number): void => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(nextPage));
    setSearchParams(nextParams);
    
    // Scroll to the top of the main scroll container
    const mainEl = document.getElementById('main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClearFilters = (): void => {
    setSearchParams({});
  };

  // Determine Title dynamically
  let pageTitle = 'All Articles';
  let helmetTitle = 'Blog Archive | Vib3scape';
  if (tag && q) {
    pageTitle = `Results for "${q}" in ${tag}`;
    helmetTitle = `Search: ${q} in ${tag} | Vib3scape`;
  } else if (tag) {
    pageTitle = `Articles Tagged "${tag}"`;
    helmetTitle = `${tag} Articles | Vib3scape`;
  } else if (q) {
    pageTitle = `Search Results for "${q}"`;
    helmetTitle = `Search: ${q} | Vib3scape`;
  }

  return (
    <>
      <Helmet>
        <title>{helmetTitle}</title>
        <meta
          name="description"
          content={`Browse our complete archive of technical articles. Page ${safePage} of ${totalPages}.`}
        />
      </Helmet>

      <div className="py-8 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none">
        {/* Title Header */}
        <SectionHeader>{pageTitle}</SectionHeader>

        {/* Filter / Search Status indicator */}
        {(tag || q) && (
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-[var(--border-radius)] bg-[var(--color-bg-alt)] border border-[var(--color-border)] mb-8">
            <div className="text-sm text-[var(--color-fg)]">
              Showing <span className="font-semibold text-[var(--color-fg-bold)]">{totalPosts}</span>{' '}
              {totalPosts === 1 ? 'post' : 'posts'}{' '}
              {tag && (
                <>
                  tagged with <span className="font-mono text-[var(--color-accent)] font-semibold">"{tag}"</span>
                </>
              )}
              {tag && q && ' and '}
              {q && (
                <>
                  matching search query <span className="italic font-semibold text-[var(--color-fg-bold)]">"{q}"</span>
                </>
              )}
            </div>

            <Button onClick={handleClearFilters} variant="outline" size="sm">
              Clear Filters
            </Button>
          </div>
        )}

        {/* Dynamic Post Grid listing */}
        {totalPosts > 0 ? (
          <div className="flex flex-col gap-10">
            <PostList posts={paginatedPosts} />
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        ) : (
          /* Fallback Empty Block */
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-[var(--color-bg-alt)] rounded-[var(--border-radius)] border border-[var(--color-border)] my-8">
            <span className="text-4xl mb-4 select-none" role="img" aria-label="No results">
              🔍
            </span>
            <h3 className="font-[var(--font-heading)] font-bold text-lg text-[var(--color-fg-bold)] mb-2">
              No articles found
            </h3>
            <p className="text-sm text-[var(--color-fg-light)] leading-relaxed max-w-md mb-6">
              We couldn't find any posts matching your criteria. Try adjusting your search query or tags to find what you are looking for.
            </p>
            <Button onClick={handleClearFilters} variant="primary" size="md">
              Show All Articles
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
