import { useState, useEffect } from 'react';
import Container from './Container';

const AdminDashboard = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentSlider, setCurrentSlider] = useState({
    title: '',
    badge: '',
    description: '',
    buttonText: '',
    imageUrl: '',
    label: ''
  });
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const fetchSliders = async () => {
    try {
      const response = await fetch('/api/sliders');
      const data = await response.json();
      setSliders(data);
    } catch (err) {
      console.error('Failed to fetch sliders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleSubmit = async (e) => {
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
        fetchSliders();
        resetForm();
      } else {
        const data = await response.json();
        setError(data.error || 'Operation failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slider?')) return;
    try {
      const response = await fetch(`/api/admin/sliders/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) fetchSliders();
    } catch (err) {
      console.error('Failed to delete');
    }
  };

  const handleEdit = (slider) => {
    setCurrentSlider(slider);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setCurrentSlider({
      title: '',
      badge: '',
      description: '',
      buttonText: '',
      imageUrl: '',
      label: ''
    });
    setEditMode(false);
    setError('');
  };

  if (loading) return <div style={{ padding: '80px', textAlign: 'center', fontSize: '18px', color: '#666666' }}>Loading Admin Panel...</div>;

  return (
    <section className="bg-gray-50 border-t border-gray-200" style={{ padding: '96px 0', backgroundColor: '#F9FAFB' }}>
      <Container>
        <div style={{ marginBottom: '64px' }}>
          <h2 className="text-3xl font-bold mb-4 text-pure-black" style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '32px', marginBottom: '16px', color: '#000000' }}>
            Admin Dashboard
          </h2>
          <p className="text-gray-600" style={{ fontSize: '16px', color: '#4D4D4D' }}>Manage your Hero Slider content directly from the CMS</p>
        </div>

        {/* Form Section */}
        <div className="bg-white shadow-sm border border-gray-100" style={{ padding: '48px', backgroundColor: '#FFFFFF', borderRadius: '24px', marginBottom: '64px', border: '1px solid #E5E7EB' }}>
          <h3 className="text-xl font-semibold text-pure-black" style={{ fontSize: '24px', marginBottom: '40px', color: '#000000' }}>{editMode ? 'Edit Slider Entry' : 'Create New Slider Entry'}</h3>
          {error && <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#FEF2F2', color: '#DC2626', borderRadius: '12px', fontSize: '14px', border: '1px solid #FEE2E2' }}>{error}</div>}
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
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
                <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px', fontSize: '14px' }}>Label (Internal Tag)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Content"
                  className="w-full focus:ring-2 focus:ring-black outline-none"
                  style={{ padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', fontSize: '15px' }}
                  value={currentSlider.label}
                  onChange={(e) => setCurrentSlider({ ...currentSlider, label: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px', fontSize: '14px' }}>Background Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  className="w-full focus:ring-2 focus:ring-black outline-none"
                  style={{ padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', fontSize: '15px' }}
                  value={currentSlider.imageUrl}
                  onChange={(e) => setCurrentSlider({ ...currentSlider, imageUrl: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium" style={{ color: '#4D4D4D', marginBottom: '8px', fontSize: '14px' }}>Call to Action Button Text</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Start Creating"
                  className="w-full focus:ring-2 focus:ring-black outline-none"
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
                  placeholder="Describe the slide content..."
                  className="w-full focus:ring-2 focus:ring-black outline-none"
                  style={{ padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', fontSize: '15px', resize: 'none' }}
                  value={currentSlider.description}
                  onChange={(e) => setCurrentSlider({ ...currentSlider, description: e.target.value })}
                />
              </div>
            </div>

            <div className="md:col-span-2 flex gap-4" style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
              <button
                type="submit"
                className="bg-pure-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-all active:scale-95"
                style={{ padding: '16px 40px', backgroundColor: '#000000', color: '#FFFFFF', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '16px' }}
              >
                {editMode ? 'Save Changes' : 'Publish Slider'}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  style={{ padding: '16px 40px', backgroundColor: '#E5E7EB', color: '#374151', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
          {sliders.map((slider) => (
            <div key={slider._id} className="bg-white shadow-sm border border-gray-100 flex flex-col" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', overflow: 'hidden', border: '1px solid #E5E7EB', transition: 'transform 0.3s' }}>
              <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                <img src={slider.imageUrl} alt={slider.title} style={{ width: '100%', height: '100%', objectCover: 'cover' }} />
              </div>
              <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '800', color: '#2563EB', marginBottom: '12px' }}>{slider.badge}</span>
                <h4 style={{ fontWeight: '700', fontSize: '20px', marginBottom: '12px', color: '#000000', lineHeight: '1.2' }}>{slider.title}</h4>
                <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{slider.description}</p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => handleEdit(slider)}
                    style={{ flex: 1, padding: '12px', fontSize: '14px', fontWeight: '600', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.2s' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slider._id)}
                    style={{ padding: '12px 20px', fontSize: '14px', fontWeight: '600', backgroundColor: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.2s' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AdminDashboard;
