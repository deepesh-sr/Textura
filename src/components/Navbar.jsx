import { useState, useEffect } from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import SignIn from './SignIn';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      style={{ 
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.7)' : '#FFFFFF',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #F3F4F6',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.05)' : 'none'
      }}
    >
      <nav 
        style={{ 
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 48px',
          height: scrolled ? '72px' : '96px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'between',
          transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Left Column - Logo */}
          <div style={{ flexShrink: 0 }}>
            <Logo />
          </div>

          {/* Middle Column - Navigation Links */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Navigation />
          </div>

          {/* Right Column - Sign In */}
          <div style={{ flexShrink: 0 }}>
            <SignIn />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
