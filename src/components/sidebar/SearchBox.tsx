import { useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export function SearchBox() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Set initial value from current query param if available
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setError('Type something to search');
      return;
    }

    if (trimmed.length < 2) {
      setError('Search query is too short');
      return;
    }

    setError(null);
    navigate(`/blog?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full flex flex-col group">
      {/* Search Input Container */}
      <div className="relative flex items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Search"
          maxLength={100}
          className={[
            'w-full min-h-[44px] py-2 pl-4 pr-12 rounded-[var(--border-radius)]',
            'bg-[#ededee] dark:bg-[#1c1f20]',
            'text-[var(--color-fg-bold)] placeholder-[var(--color-fg-light)]',
            'border border-transparent transition-all duration-200',
            'focus:outline-none focus:border-[var(--color-accent)] focus:bg-[var(--color-bg)] dark:focus:bg-[var(--color-bg)]',
            'focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
          ].join(' ')}
          aria-label="Search posts"
        />
        
        {/* Absolutely positioned magnifying glass icon button */}
        <button
          type="submit"
          className={[
            'absolute right-0 h-full px-4 text-[var(--color-fg-light)]',
            'hover:text-[var(--color-accent)] transition-colors duration-200',
            'min-h-[44px] min-w-[44px] flex items-center justify-center',
            'focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-[-4px] rounded-r-[var(--border-radius)]',
          ].join(' ')}
          aria-label="Submit search query"
        >
          <FaMagnifyingGlass className="w-4 h-4" />
        </button>
      </div>

      {/* Validation Message */}
      {error && (
        <span
          role="alert"
          className="text-[#e05555] text-xs mt-1.5 font-medium ml-1 transition-opacity duration-150"
        >
          {error}
        </span>
      )}
    </form>
  );
}
