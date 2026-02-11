import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Container from './Container';
import DOMPurify from 'dompurify';
import API_BASE from '../config';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/blogs/${slug}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [slug]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#FFF' }}>
      <div style={{ width: '32px', height: '32px', border: '2px solid #EEE', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
  if (!blog) return <div style={{ padding: '120px 0', textAlign: 'center', fontFamily: "'Inter Tight', sans-serif" }}>Story not found.</div>;

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Helmet>
        <title>{blog.metaTitle || blog.title} | Textura Insights</title>
        <meta name="description" content={blog.metaDescription || blog.title} />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.metaTitle || blog.title} />
        <meta property="og:description" content={blog.metaDescription || blog.title} />
        <meta property="og:image" content={blog.featuredImage} />
        <meta property="og:url" content={`${window.location.origin}/blog/${blog.slug}`} />
        <meta property="og:site_name" content="Textura" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.metaTitle || blog.title} />
        <meta name="twitter:description" content={blog.metaDescription || blog.title} />
        <meta name="twitter:image" content={blog.featuredImage} />

        {/* Canonical URL */}
        <link rel="canonical" href={`${window.location.origin}/blog/${blog.slug}`} />
      </Helmet>

      {/* Modern Hero */}
      <div className="relative h-[60vh] md:h-[70vh] min-h-100 md:min-h-150 bg-black">
        <img 
          src={blog.featuredImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'} 
          alt={blog.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full py-12 md:py-20" style={{ padding: '80px 0' }}>
          <Container>
            <div className="max-w-4xl">
              <Link to="/blogs" className="inline-flex items-center gap-2 text-white no-underline mb-8 md:mb-10 text-[10px] md:text-xs font-extrabold tracking-[0.2em] uppercase hover:opacity-70 transition-opacity">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                Back to Index
              </Link>
              <h1 className="text-white font-extrabold leading-tight mb-8 tracking-tighter" style={{ 
                fontSize: 'clamp(2rem, 6vw, 5.5rem)', 
                fontFamily: "'Inter Tight', sans-serif",
              }}>
                {blog.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', color: '#000' }}>TX</div>
                  <div style={{ color: '#FFF' }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '700' }}>Textura Editorial</p>
                    <p style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>Published {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 md:py-24" style={{ padding: '96px 0' }}>
        <Container>
          <div className="max-w-3xl mx-auto">
            <div 
              className="blog-prose"
              style={{ 
                fontSize: '21px', 
                lineHeight: '1.7', 
                color: '#1F2937',
                fontFamily: "'Inter Tight', sans-serif",
                overflowWrap: 'break-word',
                wordBreak: 'break-word'
              }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
            />
          </div>
        </Container>
      </div>

      <style>{`
        .blog-prose { width: 100%; }
        .blog-prose p { margin-bottom: 2rem; }
        .blog-prose h2 { font-size: 36px; font-weight: 800; margin: 3rem 0 1.5rem; letter-spacing: -0.02em; color: #000; }
        .blog-prose h3 { font-size: 28px; font-weight: 800; margin: 2.5rem 0 1.25rem; color: #000; }
        .blog-prose blockquote { 
          padding: 40px; 
          background: #F9FAFB; 
          border-left: 8px solid #000; 
          font-size: 24px; 
          font-style: italic; 
          font-weight: 600; 
          margin: 4rem 0;
          color: #111;
        }
        .blog-prose img { max-width: 100%; height: auto; border-radius: 24px; margin: 3rem 0; }
        .blog-prose iframe { max-width: 100%; border-radius: 12px; }
        .blog-prose pre { 
          background: #f4f4f4; 
          padding: 20px; 
          border-radius: 8px; 
          overflow-x: auto; 
          margin-bottom: 2rem;
        }
        .blog-prose ul { margin-bottom: 2rem; padding-left: 1.5rem; }
        .blog-prose li { margin-bottom: 0.75rem; }
      `}</style>
    </div>
  );
};

export default BlogDetail;
