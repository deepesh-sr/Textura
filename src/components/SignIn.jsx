import { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';

const SignIn = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      setUser({ token, role });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    window.location.reload();
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: "'Inter Tight', sans-serif" }}>{user.role}</span>
        <button
          onClick={handleLogout}
          style={{ 
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: '13px',
            fontWeight: '700',
            padding: '10px 24px',
            border: '1px solid #E5E7EB',
            borderRadius: '100px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          className="hover:bg-black hover:text-white hover:border-black"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setShowLogin(true)}
        className="text-sm font-medium text-pure-black hover:opacity-70 transition-opacity duration-300 hidden sm:block"
        style={{ fontFamily: "'Inter Tight', sans-serif" }}
      >
        Log in
      </button>
      <button
        onClick={() => setShowSignup(true)}
        className="bg-pure-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
        style={{ 
          fontFamily: "'Inter Tight', sans-serif",
          padding: '12px 28px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        Sign Up
      </button>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}
      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
};

export default SignIn;
