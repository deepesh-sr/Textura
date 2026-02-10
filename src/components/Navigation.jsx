import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem('role');
    setIsAdmin(role === 'Admin');
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/', ariaLabel: 'Go to home page' },
    // Only show CMS to Admins
    ...(isAdmin ? [{ name: 'CMS', href: '/#cms', ariaLabel: 'Admin CMS Management' }] : []),
    { name: 'BLOGS', href: '/blogs', ariaLabel: 'View our blog' },
  ];

  return (
    <ul className="flex items-center gap-8 xl:gap-10" role="menubar" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex' }}>
      {navLinks.map((link) => {
        const isActive = location.pathname === link.href;
        const isHashLink = link.href.startsWith('/#');

        return (
          <li key={link.name} role="none">
            {isHashLink ? (
              <a
                href={link.href}
                className="group"
                style={{ 
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  color: '#000000',
                  fontFamily: "'Inter Tight', sans-serif",
                  padding: '8px 0',
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                {link.name}
              </a>
            ) : (
              <Link
                to={link.href}
                className="group"
                style={{ 
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: isActive ? '800' : '600',
                  letterSpacing: '0.1em',
                  color: isActive ? '#000000' : '#6B7280',
                  fontFamily: "'Inter Tight', sans-serif",
                  padding: '8px 0',
                  position: 'relative',
                  display: 'inline-block',
                  transition: 'color 0.3s ease'
                }}
              >
                {link.name}
                <span 
                  style={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: isActive ? '100%' : '0%',
                    height: '2px',
                    backgroundColor: '#000000',
                    transition: 'width 0.3s ease'
                  }}
                  className="group-hover:w-full"
                />
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Navigation;
