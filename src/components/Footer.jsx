
import Container from './Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      'Strategy & Digital Transformation',
      'Application Services',
      'Cloud Services',
      'Data, Analytics & Artificial Intelligence',
      'Digital Engineering Product Development',
      'IoT & Connected Products',
      'Cybersecurity',
      'Integration & Middleware',
      'Digital Experience & Design',
      'Infrastructure Services & Modernization',
      'Managed Services',
      'Blockchain & Web3',
      'Immersive Technologies & Metaverse',
      '5G & Edge Computing',
      'Sustainability & ESG Technology Services',
      'Quantum Computing',
      'Business Process'
    ],
    Industries: [
      'Aerospace',
      'Agriculture',
      'Automotive & Mobility',
      'Aviation',
      'Banking, Capital Markets & Financial Services',
      'Chemical Manufacturing',
      'Communication & Telecommunication Services',
      'Consumer Goods',
      'Dairy',
      'Defense',
      'Education',
      'Energy & Utilities',
      'Engineering, Procurement & Construction',
      'Gems, Stones & Jewellery',
      'Government & Public Goods',
      'Healthcare',
      'High Technology',
      'Industrial & Process Manufacturing',
      'Information Services & Publishing',
      'Insurance',
      'Life Sciences',
      'Logistics, Supply Chain, Transport & Distribution',
      'Marine Economy',
      'Media, Gaming & Entertainment',
      'Mining & Metals',
      'Oil & Gas',
      'Private Equity',
      'Professional Services',
      'Real Estate',
      'Renewable Energy & Sustainability',
      'Retail & E-commerce',
      'Semiconductor',
      'Smart Cities',
      'Sports',
      'Textile',
      'Travel, Tourism & Hospitality',
      'Waste Management & Circular Economy'
    ],
    Company: [
      'About',
      'Insights',
      'Services',
      'Industries',
      'Contact',
      'Career',
      'Press Release',
      'Diversity, Equity & Inclusion',
      'Environmental, Social & Governance',
      'Corporate Social Responsibility'
    ]
  };

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Services Column */}
          <div>
            <h3 className="text-xl font-medium mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Services</h3>
            <ul className="space-y-3">
              {footerLinks.Services.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-[15px] font-normal" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Column (Split into two if needed, but following the screenshot's dense layout) */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-medium mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Industries</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {footerLinks.Industries.map((link) => (
                <a key={link} href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-[15px] font-normal" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xl font-medium mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Company</h3>
            <ul className="space-y-3">
              {footerLinks.Company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-[15px] font-normal" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[#00C292] font-bold text-xl">Giakaa</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Growth<br/>For All</span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Privacy Policy</a>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              © {currentYear} Giakaa. All rights reserved
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
              <span className="sr-only">Telegram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.36-.49.99-.75 3.84-1.67 6.41-2.77 7.7-3.3 3.66-1.51 4.42-1.77 4.92-1.78.11 0 .35.03.5.16.12.1.16.23.18.33.02.09.03.26.02.39z"/></svg>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
