import React, { useState } from 'react';
import API_BASE from '../config';

const Signup = ({ onClose, onSwitchToLogin }) => {
  // Hardcode role to 'User' to prevent admin creation from frontend
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'User' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => onSwitchToLogin(), 2000);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" style={{ zIndex: 1000 }}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden" style={{ padding: '48px', backgroundColor: '#FFFFFF', borderRadius: '24px' }}>
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors" style={{ padding: '8px' }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: "'Inter Tight', sans-serif", color: '#000000', marginBottom: '32px' }}>Create Account</h2>
        
        {error && <div className="mb-6 p-4 bg-red-50 text-red-500 rounded-xl text-sm border border-red-100" style={{ marginBottom: '24px' }}>{error}</div>}
        {success && <div className="mb-6 p-4 bg-green-50 text-green-500 rounded-xl text-sm border border-green-100" style={{ marginBottom: '24px' }}>Account created! Redirecting to login...</div>}

        <form onSubmit={handleSubmit} className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#4D4D4D' }}>Full Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all"
              style={{ padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', fontSize: '15px' }}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#4D4D4D' }}>Email</label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all"
              style={{ padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', fontSize: '15px' }}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#4D4D4D' }}>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all"
              style={{ padding: '16px', border: '1px solid #CCCCCC', borderRadius: '12px', fontSize: '15px' }}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-pure-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-all active:scale-95 disabled:bg-gray-400"
            style={{ padding: '16px', backgroundColor: '#000000', color: '#FFFFFF', borderRadius: '12px', marginTop: '12px', fontSize: '16px' }}
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-gray-600 text-sm" style={{ marginTop: '32px' }}>
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-black font-bold hover:underline" style={{ color: '#000000' }}>Log In</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
