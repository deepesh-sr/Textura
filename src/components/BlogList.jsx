import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Container from './Container';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
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
    <div style={{ backgroundColor: '#F2F2F2', minHeight: '100vh', padding: '120px 0' }}>
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
        <div style={{ maxWidth: '800px', marginBottom: '80px' }}>
          <h1 style={{ 
            fontFamily: "'Inter Tight', sans-serif", 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            fontWeight: '800', 
            lineHeight: '0.9', 
            marginBottom: '32px', 
            letterSpacing: '-0.04em',
            color: '#000000'
          }}>
            Insights &<br/>Stories.
          </h1>
          <p style={{ 
            fontSize: '22px', 
            lineHeight: '1.5', 
            color: '#4B5563', 
            fontWeight: '500', 
            fontFamily: "'Inter Tight', sans-serif",
            maxWidth: '540px'
          }}>
            Documenting the future of digital content management and strategy.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: '32px' 
        }}>
          {blogs.map(blog => (
            <Link key={blog._id} to={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }} className="group">
              <div style={{ 
                backgroundColor: '#FFFFFF',
                borderRadius: '40px',
                padding: '24px',
                height: '100%',
                transition: 'transform 0.4s cubic-bezier(0.2, 1, 0.3, 1), box-shadow 0.4s',
                border: '1px solid transparent'
              }} className="hover:-translate-y-2 hover:shadow-2xl hover:border-gray-100">
                <div style={{ 
                  height: '320px', 
                  borderRadius: '24px', 
                  overflow: 'hidden',
                  marginBottom: '32px'
                }}>
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
