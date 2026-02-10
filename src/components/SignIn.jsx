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
        <span className="text-sm font-medium text-gray-500">{user.role}</span>
        <button
          onClick={handleLogout}
          className="text-sm font-medium px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
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
