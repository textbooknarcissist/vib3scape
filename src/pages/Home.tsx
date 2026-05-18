import { Helmet } from 'react-helmet-async';
import { Banner } from '@/components/home/Banner';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { PostsGrid } from '@/components/home/PostsGrid';

export function Home() {
  return (
    <>
      <Helmet>
        <title>Vib3scape | Tech Blog & Engineering Insights</title>
        <meta
          name="description"
          content="A premium technical dev blog sharing clean styling architectures, React patterns, TypeScript design schemas, and tips to fast-track your engineering career."
        />
        <meta property="og:title" content="Vib3scape | Tech Blog & Engineering Insights" />
        <meta
          property="og:description"
          content="A premium technical dev blog sharing clean styling architectures, React patterns, TypeScript design schemas, and tips to fast-track your engineering career."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vib3scape | Tech Blog & Engineering Insights" />
      </Helmet>

      <div className="flex flex-col w-full">
        {/* Banner Section */}
        <Banner />

        {/* Features / Content Categories */}
        <FeaturesGrid />

        {/* Dynamic Posts Grid (Latest 6 posts) */}
        <PostsGrid />
      </div>
    </>
  );
}
