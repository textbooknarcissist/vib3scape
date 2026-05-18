import { FaReact, FaPaintbrush, FaBriefcase, FaBolt } from 'react-icons/fa6';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface FeatureItem {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <FaReact className="w-6 h-6 text-[var(--color-accent)]" aria-hidden="true" />,
    title: 'React & TypeScript',
    description: 'Deep dives into component patterns, hooks, state machines, and type-safe frontend architecture.',
  },
  {
    icon: <FaPaintbrush className="w-6 h-6 text-[var(--color-accent)]" aria-hidden="true" />,
    title: 'CSS & Design',
    description: 'Styling systems, Tailwind CSS tips, container queries, and engineering interfaces that feel right.',
  },
  {
    icon: <FaBriefcase className="w-6 h-6 text-[var(--color-accent)]" aria-hidden="true" />,
    title: 'Career & Growth',
    description: 'Portfolio strategies, job hunting guides, cold outreach techniques, and fast-tracking to senior level.',
  },
  {
    icon: <FaBolt className="w-6 h-6 text-[var(--color-accent)]" aria-hidden="true" />,
    title: 'Tools & Performance',
    description: 'Vite build configurations, bundle size optimizations, Core Web Vitals profiling, and local DX setups.',
  },
];

export function FeaturesGrid() {
  return (
    <section
      className="py-12 md:py-16 px-4 md:px-6 lg:px-8 border-b border-[var(--color-border)]"
      aria-labelledby="features-heading"
    >
      <SectionHeader id="features-heading">What You'll Find Here</SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex gap-4 items-start p-4 rounded-[var(--border-radius)] hover:bg-[var(--color-bg-alt)] transition-colors duration-200"
          >
            {/* Styled Icon Wrapper */}
            <div className="shrink-0 w-12 h-12 rounded-full bg-[var(--color-border)]/40 flex items-center justify-center">
              {feature.icon}
            </div>

            {/* Content block */}
            <div className="flex-1 min-w-0">
              <h3
                className={[
                  'font-[var(--font-heading)]',
                  'font-bold text-[var(--color-fg-bold)]',
                  'text-lg md:text-xl',
                  'mb-2 leading-tight',
                ].join(' ')}
              >
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-[var(--color-fg)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
