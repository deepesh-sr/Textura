import { useState, useEffect } from 'react';
import Container from './Container';

const AdminDashboard = () => {
  const [sliders, setSliders] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('sliders'); // 'sliders' or 'blogs'
  
  const [editMode, setEditMode] = useState(false);
  const [currentSlider, setCurrentSlider] = useState({
    title: '',
    badge: '',
    description: '',
    buttonText: '',
    imageUrl: '',
    label: ''
  });

  const [currentBlog, setCurrentBlog] = useState({
    title: '',
    slug: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    featuredImage: '',
    status: 'draft'
  });

  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [slidersRes, blogsRes] = await Promise.all([
        fetch('/api/sliders'),
        fetch('/api/blogs')
      ]);
      const [slidersData, blogsData] = await Promise.all([
        slidersRes.json(),
        blogsRes.json()
      ]);
      setSliders(slidersData);
      setBlogs(blogsData);
    } catch (err) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Slider Submit
  const handleSliderSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const method = editMode ? 'PUT' : 'POST';
    const url = editMode ? `/api/admin/sliders/${currentSlider._id}` : '/api/admin/sliders';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(currentSlider)
      });

      if (response.ok) {
        fetchData();
        resetSliderForm();
      } else {
        const data = await response.json();
        setError(data.error || 'Operation failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  // Blog Submit
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const method = editMode ? 'PUT' : 'POST';
    const url = editMode ? `/api/admin/blogs/${currentBlog._id}` : '/api/admin/blogs';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(currentBlog)
      });

      if (response.ok) {
        fetchData();
        resetBlogForm();
      } else {
        const data = await response.json();
        setError(JSON.stringify(data.error) || 'Operation failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  const handleDeleteSlider = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slider?')) return;
    try {
      const response = await fetch(`/api/admin/sliders/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) fetchData();
    } catch (err) {
      console.error('Failed to delete');
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) fetchData();
    } catch (err) {
      console.error('Failed to delete');
    }
  };

  const resetSliderForm = () => {
    setCurrentSlider({ title: '', badge: '', description: '', buttonText: '', imageUrl: '', label: '' });
    setEditMode(false);
    setError('');
  };

  const resetBlogForm = () => {
    setCurrentBlog({ title: '', slug: '', content: '', metaTitle: '', metaDescription: '', featuredImage: '', status: 'draft' });
    setEditMode(false);
    setError('');
  };

  if (loading) return <div style={{ padding: '80px', textAlign: 'center', fontSize: '18px', color: '#666666' }}>Loading Admin Panel...</div>;

  return (
    <section id="cms" className="bg-gray-50 border-t border-gray-200" style={{ padding: '96px 0', backgroundColor: '#F9FAFB' }}>
      <Container>
        <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-pure-black" style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '32px', marginBottom: '16px', color: '#000000' }}>
              Textura CMS
            </h2>
            <p className="text-gray-600" style={{ fontSize: '16px', color: '#4D4D4D' }}>Manage your website content and publishing from here.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', backgroundColor: '#E5E7EB', padding: '4px', borderRadius: '12px' }}>
            <button 
              onClick={() => { setActiveTab('sliders'); setEditMode(false); }}
              style={{ padding: '8px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'sliders' ? '#FFFFFF' : 'transparent', color: activeTab === 'sliders' ? '#000000' : '#4D4D4D', boxShadow: activeTab === 'sliders' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }}>
              Sliders
            </button>
            <button 
              onClick={() => { setActiveTab('blogs'); setEditMode(false); }}
              style={{ padding: '8px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'blogs' ? '#FFFFFF' : 'transparent', color: activeTab === 'blogs' ? '#000000' : '#4D4D4D', boxShadow: activeTab === 'blogs' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }}>
              Blog Posts
            </button>
          </div>
        </div>

        {activeTab === 'sliders' ? (
          <>
            {/* Slider Form */}
            <div className="bg-white shadow-sm border border-gray-100" style={{ padding: '48px', backgroundColor: '#FFFFFF', borderRadius: '24px', marginBottom: '64px', border: '1px solid #E5E7EB' }}>
              <h3 className="text-xl font-semibold text-pure-black" style={{ fontSize: '24px', marginBottom: '40px', color: '#000000' }}>{editMode ? 'Edit Slider Entry' : 'Create New Slider Entry'}</h3>
              {error && <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#FEF2F2', color: '#DC2626', borderRadius: '12px', fontSize: '14px', border: '1px solid #FEE2E2' }}>{error}</div>}
              
              <form onSubmit={handleSliderSubmit} className="grid grid-cols-1 md:grid-cols-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px', fontSize: '14px' }}>Slider Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Manage Content Effortlessly"
                      className="w-full focus:ring-2 focus:ring-black outline-none"
                      style={{ padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', fontSize: '15px', transition: 'all 0.2s' }}
                      value={currentSlider.title}
                      onChange={(e) => setCurrentSlider({ ...currentSlider, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px', fontSize: '14px' }}>Badge Text</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., CMS Dashboard"
                      className="w-full focus:ring-2 focus:ring-black outline-none"
                      style={{ padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', fontSize: '15px' }}
                      value={currentSlider.badge}
                      onChange={(e) => setCurrentSlider({ ...currentSlider, badge: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px', fontSize: '14px' }}>Label (Tag)</label>
                    <input
                      type="text"
                      required
                      style={{ padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', fontSize: '15px' }}
                      value={currentSlider.label}
                      onChange={(e) => setCurrentSlider({ ...currentSlider, label: e.target.value })}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px', fontSize: '14px' }}>Image URL</label>
                    <input
                      type="url"
                      required
                      style={{ padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', fontSize: '15px' }}
                      value={currentSlider.imageUrl}
                      onChange={(e) => setCurrentSlider({ ...currentSlider, imageUrl: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px', fontSize: '14px' }}>Button Text</label>
                    <input
                      type="text"
                      required
                      style={{ padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', fontSize: '15px' }}
                      value={currentSlider.buttonText}
                      onChange={(e) => setCurrentSlider({ ...currentSlider, buttonText: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px', fontSize: '14px' }}>Description</label>
                    <textarea
                      required
                      rows="3"
                      style={{ padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', fontSize: '15px', resize: 'none' }}
                      value={currentSlider.description}
                      onChange={(e) => setCurrentSlider({ ...currentSlider, description: e.target.value })}
                    />
                  </div>
                </div>
                <div className="md:col-span-2 flex gap-4" style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
                  <button
                    type="submit"
                    style={{ padding: '16px 40px', backgroundColor: '#000000', color: '#FFFFFF', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                  >
                    {editMode ? 'Save Changes' : 'Publish Slider'}
                  </button>
                  {editMode && (
                    <button
                      type="button"
                      onClick={resetSliderForm}
                      style={{ padding: '16px 40px', backgroundColor: '#E5E7EB', color: '#374151', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Slider List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
              {sliders.map((s) => (
                <div key={s._id} style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                  <img src={s.imageUrl} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '24px' }}>
                    <h4 style={{ fontWeight: '700', fontSize: '18px', marginBottom: '8px' }}>{s.title}</h4>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                      <button onClick={() => { setCurrentSlider(s); setEditMode(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #E5E7EB', cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => handleDeleteSlider(s._id)} style={{ padding: '10px 15px', borderRadius: '8px', border: 'none', backgroundColor: '#FEF2F2', color: '#DC2626', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Blog Form */}
            <div className="bg-white shadow-sm border border-gray-100" style={{ padding: '48px', backgroundColor: '#FFFFFF', borderRadius: '24px', marginBottom: '64px', border: '1px solid #E5E7EB' }}>
              <h3 className="text-xl font-semibold text-pure-black" style={{ fontSize: '24px', marginBottom: '40px', color: '#000000' }}>{editMode ? 'Edit Blog Post' : 'Write New Blog Post'}</h3>
              {error && <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#FEF2F2', color: '#DC2626', borderRadius: '12px', fontSize: '14px', border: '1px solid #FEE2E2' }}>{error}</div>}
              
              <form onSubmit={handleBlogSubmit} className="space-y-8" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px' }}>Blog Title</label>
                    <input
                      type="text"
                      required
                      placeholder="The future of CMS..."
                      style={{ width: '100%', padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px' }}
                      value={currentBlog.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                        setCurrentBlog({ ...currentBlog, title, slug });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px' }}>Slug (URL)</label>
                    <input
                      type="text"
                      required
                      placeholder="the-future-of-cms"
                      style={{ width: '100%', padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px' }}
                      value={currentBlog.slug}
                      onChange={(e) => setCurrentBlog({ ...currentBlog, slug: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px' }}>Content (HTML Supported)</label>
                  <textarea
                    rows="10"
                    required
                    style={{ width: '100%', padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', resize: 'vertical' }}
                    value={currentBlog.content}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                  <div>
                    <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px' }}>Featured Image URL</label>
                    <input
                      type="url"
                      style={{ width: '100%', padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px' }}
                      value={currentBlog.featuredImage}
                      onChange={(e) => setCurrentBlog({ ...currentBlog, featuredImage: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px' }}>SEO Meta Title</label>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px' }}
                      value={currentBlog.metaTitle}
                      onChange={(e) => setCurrentBlog({ ...currentBlog, metaTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px' }}>Status</label>
                    <select
                      style={{ width: '100%', padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', backgroundColor: '#FFF' }}
                      value={currentBlog.status}
                      onChange={(e) => setCurrentBlog({ ...currentBlog, status: e.target.value })}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button
                    type="submit"
                    style={{ padding: '16px 40px', backgroundColor: '#000000', color: '#FFFFFF', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
                  >
                    {editMode ? 'Update Blog' : 'Publish Blog'}
                  </button>
                  {editMode && (
                    <button
                      type="button"
                      onClick={resetBlogForm}
                      style={{ padding: '16px 40px', backgroundColor: '#E5E7EB', color: '#374151', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Blog List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {blogs.map((b) => (
                <div key={b._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <img src={b.featuredImage || 'https://placehold.co/600x400'} style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontWeight: '700', fontSize: '18px' }}>{b.title}</h4>
                      <p style={{ fontSize: '12px', color: '#6B7280' }}>/{b.slug} • <span style={{ color: b.status === 'published' ? '#059669' : '#D97706' }}>{b.status.toUpperCase()}</span></p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => { setCurrentBlog(b); setEditMode(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ padding: '8px 20px', borderRadius: '8px', border: '1px solid #E5E7EB', cursor: 'pointer', backgroundColor: '#FFF' }}>Edit</button>
                    <button onClick={() => handleDeleteBlog(b._id)} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#FEF2F2', color: '#DC2626', cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default AdminDashboard;
