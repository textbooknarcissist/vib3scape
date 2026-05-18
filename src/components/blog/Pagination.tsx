interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  // Middle paging range generator
  const getPages = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      // Handle intermediate items without duplicating boundaries
      const middleItems = new Set<number>();
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          middleItems.add(i);
        }
      }

      // If we are at page 3, we add page 2 explicitly to prevent gaps
      if (currentPage === 3) {
        middleItems.add(2);
      }
      // If we are at second to last page, add previous page to prevent gaps
      if (currentPage === totalPages - 2) {
        middleItems.add(totalPages - 1);
      }

      const sortedMiddle = Array.from(middleItems).sort((a, b) => a - b);
      pages.push(...sortedMiddle);

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPages();

  return (
    <nav
      aria-label="Pagination Navigation"
      className="flex items-center justify-between py-6 border-t border-[var(--color-border)] select-none w-full"
    >
      {/* ── Mobile Pagination (< md) ── */}
      <div className="flex md:hidden items-center justify-between w-full">
        <button
          type="button"
          onClick={() => !isFirst && onPageChange(currentPage - 1)}
          disabled={isFirst}
          className={[
            'min-h-[44px] min-w-[80px] px-4 rounded-[var(--border-radius)] border border-[var(--color-border)] font-medium text-sm',
            'transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
            isFirst
              ? 'opacity-40 cursor-not-allowed text-[var(--color-fg-light)] bg-transparent'
              : 'text-[var(--color-fg-bold)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:bg-[var(--color-border)]/20',
          ].join(' ')}
          aria-label="Go to previous page"
        >
          Previous
        </button>

        <span className="text-sm font-semibold text-[var(--color-fg-bold)]">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => !isLast && onPageChange(currentPage + 1)}
          disabled={isLast}
          className={[
            'min-h-[44px] min-w-[80px] px-4 rounded-[var(--border-radius)] border border-[var(--color-border)] font-medium text-sm',
            'transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
            isLast
              ? 'opacity-40 cursor-not-allowed text-[var(--color-fg-light)] bg-transparent'
              : 'text-[var(--color-fg-bold)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:bg-[var(--color-border)]/20',
          ].join(' ')}
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>

      {/* ── Desktop Pagination (md+) ── */}
      <div className="hidden md:flex items-center justify-center gap-2 w-full">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => !isFirst && onPageChange(currentPage - 1)}
          disabled={isFirst}
          className={[
            'min-h-[44px] px-4 rounded-[var(--border-radius)] border border-[var(--color-border)] font-semibold text-sm',
            'transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
            isFirst
              ? 'opacity-40 cursor-not-allowed text-[var(--color-fg-light)] bg-transparent'
              : 'text-[var(--color-fg-bold)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:bg-[var(--color-border)]/10 cursor-pointer',
          ].join(' ')}
          aria-label="Go to previous page"
        >
          &larr; Prev
        </button>

        {/* Numbered Page Links */}
        <div className="flex items-center gap-1.5" role="list">
          {pages.map((page, idx) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-10 h-10 flex items-center justify-center text-[var(--color-fg-light)] select-none text-sm"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            const isCurrent = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={`Go to page ${page}`}
                className={[
                  'w-11 h-11 flex items-center justify-center rounded-[var(--border-radius)] font-semibold text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
                  isCurrent
                    ? 'bg-[var(--color-accent)] text-white pointer-events-none'
                    : 'border border-[var(--color-border)] text-[var(--color-fg-bold)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:bg-[var(--color-border)]/10 cursor-pointer',
                ].join(' ')}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => !isLast && onPageChange(currentPage + 1)}
          disabled={isLast}
          className={[
            'min-h-[44px] px-4 rounded-[var(--border-radius)] border border-[var(--color-border)] font-semibold text-sm',
            'transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
            isLast
              ? 'opacity-40 cursor-not-allowed text-[var(--color-fg-light)] bg-transparent'
              : 'text-[var(--color-fg-bold)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:bg-[var(--color-border)]/10 cursor-pointer',
          ].join(' ')}
          aria-label="Go to next page"
        >
          Next &rarr;
        </button>
      </div>
    </nav>
  );
}
