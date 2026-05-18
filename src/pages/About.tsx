import { Helmet } from 'react-helmet-async';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FaCode, FaUserGroup, FaGaugeHigh, FaGraduationCap } from 'react-icons/fa6';

interface ValueCard {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const values: ValueCard[] = [
  {
    icon: <FaCode className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />,
    title: 'Clean Code',
    description: 'Writing readable, maintainable, self-documenting TypeScript with sensible architectural patterns.',
  },
  {
    icon: <FaUserGroup className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />,
    title: 'Users Over Systems',
    description: 'Building accessible, device-agnostic layouts that guarantee premium performance for every screen size.',
  },
  {
    icon: <FaGaugeHigh className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />,
    title: 'Performance Driven',
    description: 'Optimizing build sizes, leveraging CDNs, and tracking Core Web Vitals to maximize index speeds.',
  },
  {
    icon: <FaGraduationCap className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />,
    title: 'Continuous Growth',
    description: 'Learning in public, sharing early prototypes, and embracing modern build specifications.',
  },
];

export function About() {
  return (
    <>
      <Helmet>
        <title>About Ted Vibes | Vib3scape</title>
        <meta
          name="description"
          content="Meet Ted Vibes, the engineer behind Vib3scape. Learning frontend systems, clean styling abstractions, and modern React patterns."
        />
      </Helmet>

      <div className="py-8 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full select-none">
        {/* Title Heading */}
        <SectionHeader>About Ted Vibes</SectionHeader>

        {/* ── Biography Split Section ── */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start my-8">
          {/* Avatar Profile image */}
          <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-[var(--border-radius)] border border-[var(--color-border)] shrink-0 shadow-md">
            <img
              src="https://picsum.photos/seed/author/300/300"
              alt="Ted Vibes profile avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bio text content */}
          <div className="flex-1 text-sm md:text-base text-[var(--color-fg)] leading-relaxed flex flex-col gap-4">
            <h3 className="font-[var(--font-heading)] font-bold text-lg md:text-xl text-[var(--color-fg-bold)]">
              Hey, I'm Ted. A frontend engineer focused on TypeScript, great developer experience, and styling that makes sense.
            </h3>
            <p>
              I launched <strong className="text-[var(--color-fg-bold)]">Vib3scape</strong> as a creative space to share deep dives, architectural designs, and real-world experiments in modern frontend engineering.
            </p>
            <p>
              Over the past few years, I've spent my time building accessible design libraries, auditing load profiles, and crafting fast interfaces. I believe the best products balance elegant code with user empathy.
            </p>
          </div>
        </div>

        {/* Spacing Divider */}
        <div className="w-full h-px bg-[var(--color-border)] my-12" />

        {/* ── Personal Engineering Values Grid ── */}
        <section aria-labelledby="values-title" className="flex flex-col">
          <h3
            id="values-title"
            className="font-[var(--font-heading)] font-bold text-lg md:text-xl text-[var(--color-fg-bold)] mb-8"
          >
            Engineering Principles
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {values.map((val) => (
              <div
                key={val.title}
                className="flex gap-4 p-5 rounded-[var(--border-radius)] bg-[var(--color-bg-alt)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-200"
              >
                {/* Styled icon box */}
                <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--color-border)] flex items-center justify-center">
                  {val.icon}
                </div>

                <div className="flex flex-col min-w-0">
                  <h4 className="font-semibold text-sm md:text-base text-[var(--color-fg-bold)] mb-1">
                    {val.title}
                  </h4>
                  <p className="text-xs md:text-sm text-[var(--color-fg)] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
