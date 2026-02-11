import { useState, useEffect } from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import SignIn from './SignIn';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className="sticky top-0 z-100 w-full transition-all duration-400"
      style={{ 
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.7)' : '#FFFFFF',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid #F3F4F6',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.05)' : 'none'
      }}
    >
      <nav 
        className="max-w-400 mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-400"
        style={{ 
          height: scrolled ? '72px' : '96px',
        }}
      >
        <div className="flex items-center justify-between w-full">
          {/* Left Column - Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Middle Column - Navigation Links (Desktop) */}
          <div className="hidden lg:flex flex-1 justify-center">
            <Navigation />
          </div>

          {/* Right Column - Sign In (Desktop) */}
          <div className="hidden lg:flex shrink-0">
            <SignIn />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-black focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 absolute w-full left-0 animate-in fade-in slide-in-from-top-1">
          <div className="px-6 py-8 flex flex-col gap-6 items-center">
            <Navigation mobile onItemClick={() => setIsMenuOpen(false)} />
            <div className="w-full h-px bg-gray-100"></div>
            <SignIn />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
