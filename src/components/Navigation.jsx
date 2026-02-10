import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setIsAdmin(role === 'Admin');
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/', ariaLabel: 'Go to home page' },
    // Only show CMS to Admins
    ...(isAdmin ? [{ name: 'CMS', href: '#cms', ariaLabel: 'Admin CMS Management' }] : []),
    { name: 'CONTENT', href: '/content', ariaLabel: 'Manage your content' },
    { name: 'ANALYTICS', href: '/analytics', ariaLabel: 'View analytics' },
    { name: 'SEO TOOLS', href: '/seo', ariaLabel: 'SEO optimization tools' },
    { name: 'MEDIA', href: '/media', ariaLabel: 'Media library' },
    { name: 'SETTINGS', href: '/settings', ariaLabel: 'Account settings' },
  ];

  return (
    <ul className="flex items-center gap-8 xl:gap-10" role="menubar">
      {navLinks.map((link, index) => (
        <li key={link.name} role="none">
          <a
            href={link.href}
            className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
              index === 0 
                ? 'text-pure-black after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-pure-black' 
                : 'text-gray-500 hover:text-pure-black'
            }`}
            aria-label={link.ariaLabel}
            role="menuitem"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
