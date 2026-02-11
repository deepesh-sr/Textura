import Container from './Container';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      'Content Creation & Management',
      'SEO Optimization',
      'Analytics & Insights',
      'Media Management',
      'Collaboration Tools',
      'Custom Workflow Automation',
      'Digital Strategy'
    ],
    Features: [
      'Drag-and-Drop Editor',
      'Smart Automation',
      'Real-time Performance Tracking',
      'Asset Organization',
      'Team Governance',
      'Pre-built SEO Tools',
      'Scalable Publishing'
    ],
    Company: [
      'About Us',
      'Case Studies',
      'Technology Stack',
      'Careers',
      'Contact',
      'Privacy Policy',
      'Terms of Service'
    ]
  };

  return (
    <footer className="bg-white border-t border-gray-100 py-16 md:py-24" style={{ padding: '96px 0 48px', backgroundColor: '#FFFFFF', borderTop: '1px solid #F3F4F6' }}>
      <Container>
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 md:mb-24"
          style={{ 
            display: 'grid',
            gap: '48px',
            marginBottom: '80px'
          }}
        >
          {/* Services Column */}
          <div>
            <h3 className="font-extrabold text-lg mb-8 text-black uppercase tracking-wider" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Services</h3>
            <ul className="flex flex-col gap-4 list-none p-0">
              {footerLinks.Services.map((link) => (
                <li key={link}>
                  <a href="#" className="font-normal text-gray-500 text-[15px] no-underline transition-colors hover:text-black" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features Column */}
          <div>
            <h3 className="font-extrabold text-lg mb-8 text-black uppercase tracking-wider" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Insights</h3>
            <ul className="flex flex-col gap-4 list-none p-0">
              <li>
                <Link to="/blogs" className="font-normal text-gray-500 text-[15px] no-underline transition-colors hover:text-black" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  View Latest Articles
                </Link>
              </li>
              {footerLinks.Features.slice(0, 4).map((link) => (
                <li key={link}>
                  <a href="#" className="font-normal text-gray-500 text-[15px] no-underline transition-colors hover:text-black" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empty Space for layout balance or additional info */}
          <div className="hidden lg:block"></div>

          {/* Company Column */}
          <div>
            <h3 className="font-extrabold text-lg mb-8 text-black uppercase tracking-wider" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Company</h3>
            <ul className="flex flex-col gap-4 list-none p-0">
              {footerLinks.Company.map((link) => (
                <li key={link}>
                  <a href="#" className="font-normal text-gray-500 text-[15px] no-underline transition-colors hover:text-black" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="text-black font-normal text-3xl tracking-tight" style={{ fontFamily: "'Roboto', sans-serif" }}>Textura</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-12 text-gray-600">
            <a href="#" className="hover:text-blue-600 text-[15px] transition-colors no-underline" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Privacy Policy</a>
            <p className="text-[15px]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              © {currentYear} Textura. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
