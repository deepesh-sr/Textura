import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ mobile = false, onItemClick = () => {} }) => {
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

  const listStyles = mobile 
    ? { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', width: '100%' }
    : { listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '40px', alignItems: 'center' };

  return (
    <ul style={listStyles}>
      {navLinks.map((link) => {
        const isActive = location.pathname === link.href;
        const isHashLink = link.href.startsWith('/#');

        return (
          <li key={link.name} className={mobile ? 'w-full text-center' : ''}>
            {isHashLink ? (
              <a
                href={link.href}
                onClick={onItemClick}
                className="group"
                style={{ 
                  textDecoration: 'none',
                  fontSize: mobile ? '16px' : '11px',
                  fontWeight: '800',
                  letterSpacing: '0.15em',
                  color: '#000000',
                  padding: '8px 0',
                  fontFamily: "'Inter Tight', sans-serif",
                  display: 'inline-block'
                }}
              >
                {link.name}
              </a>
            ) : (
              <Link
                to={link.href}
                onClick={onItemClick}
                className="group"
                style={{ 
                  textDecoration: 'none',
                  fontSize: mobile ? '16px' : '11px',
                  fontWeight: '800',
                  letterSpacing: '0.15em',
                  color: isActive ? '#2563EB' : '#000000',
                  fontFamily: "'Inter Tight', sans-serif",
                  padding: '8px 0',
                  position: 'relative',
                  display: 'inline-block',
                  transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {link.name}
                {!mobile && (
                  <span 
                    style={{ 
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: isActive ? '4px' : '0%',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#2563EB',
                      transition: 'width 0.3s ease, background-color 0.3s'
                    }}
                    className="group-hover:w-1 group-hover:bg-blue-600"
                  />
                )}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Navigation;
