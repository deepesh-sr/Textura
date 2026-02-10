
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

  if (loading) return <div className="p-20 text-center">Loading Admin Panel...</div>;

  return (
    <section className="bg-gray-50 py-20 border-t border-gray-200">
      <Container>
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
            Admin Dashboard
          </h2>
          <p className="text-gray-600">Manage your Hero Slider content</p>
        </div>

        {/* Form Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
          <h3 className="text-xl font-semibold mb-6">{editMode ? 'Edit Slider' : 'Add New Slider'}</h3>
          {error && <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none"
                  value={currentSlider.title}
                  onChange={(e) => setCurrentSlider({ ...currentSlider, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Badge</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none"
                  value={currentSlider.badge}
                  onChange={(e) => setCurrentSlider({ ...currentSlider, badge: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Label (Tag)</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none"
                  value={currentSlider.label}
                  onChange={(e) => setCurrentSlider({ ...currentSlider, label: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none"
                  value={currentSlider.imageUrl}
                  onChange={(e) => setCurrentSlider({ ...currentSlider, imageUrl: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Button Text</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none"
                  value={currentSlider.buttonText}
                  onChange={(e) => setCurrentSlider({ ...currentSlider, buttonText: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  required
                  rows="3"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none"
                  value={currentSlider.description}
                  onChange={(e) => setCurrentSlider({ ...currentSlider, description: e.target.value })}
                />
              </div>
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                {editMode ? 'Update Slider' : 'Create Slider'}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sliders.map((slider) => (
            <div key={slider._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <img src={slider.imageUrl} alt={slider.title} className="h-40 w-full object-cover" />
              <div className="p-4 flex-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600">{slider.badge}</span>
                <h4 className="font-bold text-lg mb-2">{slider.title}</h4>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{slider.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(slider)}
                    className="flex-1 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slider._id)}
                    className="px-4 py-2 text-sm font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
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
