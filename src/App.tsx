import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Blog } from '@/pages/Blog';
import { Post } from '@/pages/Post';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { NotFound } from '@/pages/NotFound';

/**
 * App
 *
 * Core React entry point.
 * Configures client-side routing matching React Router v6/v7 standards.
 * All views are rendered as child outlets within the global responsive [Layout] shell.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Landing / Home view */}
          <Route index element={<Home />} />
          
          {/* Blog archive list page */}
          <Route path="blog" element={<Blog />} />
          
          {/* Single post reader */}
          <Route path="blog/:slug" element={<Post />} />
          
          {/* About Ted page */}
          <Route path="about" element={<About />} />
          
          {/* Feedback Form / Contact */}
          <Route path="contact" element={<Contact />} />
          
          {/* Wildcard 404 handler */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
