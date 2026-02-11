import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Container from './Container';
import API_BASE from '../config';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/blogs`)
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#F2F2F2' 
    }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        border: '3px solid #E5E7EB', 
        borderTopColor: '#000000', 
        borderRadius: '50%', 
        animation: 'spin 1s linear infinite' 
      }} />
      <p style={{ marginTop: '20px', fontSize: '14px', fontWeight: '600', color: '#666', fontFamily: "'Inter Tight', sans-serif", letterSpacing: '0.1em' }}>GATHERING INSIGHTS</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div 
      style={{ 
        backgroundColor: '#F2F2F2', 
        minHeight: '100vh', 
        paddingTop: '80px', 
        paddingBottom: '120px' 
      }} 
      className="py-20 md:py-32"
    >
      <Helmet>
        <title>Insights & Stories | Textura Digital Strategy</title>
        <meta name="description" content="Explore the latest trends in content management, SEO optimization, and digital growth strategy from the Textura editorial team." />
        
        <meta property="og:title" content="Insights & Stories | Textura Digital Strategy" />
        <meta property="og:description" content="Explore the latest trends in content management, SEO optimization, and digital growth strategy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/blogs`} />
        
        <link rel="canonical" href={`${window.location.origin}/blogs`} />
      </Helmet>
      
      <Container>
        <div className="mb-12 md:mb-20 max-w-3xl" style={{ marginBottom: '64px' }}>
          <h1 className="font-extrabold text-black leading-tight md:leading-none mb-6 md:mb-8 tracking-tighter" style={{ 
            fontFamily: "'Inter Tight', sans-serif", 
            fontSize: 'clamp(2.5rem, 8vw, 6rem)', 
          }}>
            Insights &<br/>Stories.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-lg leading-relaxed" style={{ 
            fontFamily: "'Inter Tight', sans-serif",
          }}>
            Documenting the future of digital content management and strategy.
          </p>
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{ 
            display: 'grid',
            gap: '32px'
          }}
        >
          {blogs.map(blog => (
            <Link key={blog._id} to={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }} className="group">
              <div 
                className="bg-white rounded-4xl p-6 h-full transition-all duration-400 border border-transparent hover:-translate-y-2 hover:shadow-2xl hover:border-gray-100"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  borderRadius: '32px',
                  padding: '24px',
                  height: '100%'
                }}
              >
                <div className="h-64 md:h-80 rounded-2xl md:rounded-3xl overflow-hidden mb-8">
                  <img 
                    src={blog.featuredImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'} 
                    alt={blog.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '0 12px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '800', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em', 
                      color: '#000000',
                      backgroundColor: '#F3F4F6',
                      padding: '6px 14px',
                      borderRadius: '100px'
                    }}>Editorial</span>
                    <span style={{ fontSize: '14px', color: '#9CA3AF', fontWeight: '500' }}>
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: '800', 
                    lineHeight: '1.2', 
                    color: '#000000',
                    fontFamily: "'Inter Tight', sans-serif",
                    marginBottom: '32px'
                  }}>{blog.title}</h2>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    fontSize: '14px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#000000'
                  }}>
                    Read full story
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      border: '1px solid #E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.3s, color 0.3s'
                    }} className="group-hover:bg-black group-hover:text-white">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogList;
