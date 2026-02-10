import { motion } from 'framer-motion';
import { useState } from 'react';
import Container from './Container';

const IndustriesSection = () => {
  const industries = [
    {
      id: 1,
      title: 'Publishing & Media',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'E-commerce & Retail',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Education & E-learning',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Healthcare & Medical',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'Marketing & Agencies',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'Corporate & Enterprise',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 7,
      title: 'Technology & SaaS',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 8,
      title: 'Non-profit & Government',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: 9,
      title: 'Travel & Hospitality',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 10,
      title: 'Entertainment & Events',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-gray-900" style={{ padding: '80px 0' }}>
      <Container>
        {/* Section Header */}
        <div className="flex justify-between items-start" style={{ marginBottom: '24px' }}>
          <div>
            <h2
              className="text-white font-semibold"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                marginBottom: '16px'
              }}
            >
              Industries
            </h2>
            <p
              className="text-gray-300"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: '500',
                lineHeight: '1.3',
                maxWidth: '900px'
              }}
            >
              Our comprehensive experience across these sectors enables us to deliver tailored solutions that drive innovation and efficiency for our clients
            </p>
          </div>
          <a
            href="/industries"
            className="text-white hover:text-blue-400 font-medium flex items-center gap-2"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              transition: 'color 0.3s ease',
              whiteSpace: 'nowrap',
              marginTop: '8px'
            }}
          >
            View all
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Industries Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '20px', marginTop: '60px' }}
        >
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} />
          ))}
        </div>
      </Container>
    </section>
  );
};

const IndustryCard = ({ industry }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={`/industries/${industry.id}`}
      className="group relative rounded-2xl overflow-hidden cursor-pointer block"
      style={{
        padding: '32px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Colored Background - Only visible on hover */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)',
          borderRadius: '16px'
        }}
      />

      {/* Content */}
      <div className="relative flex items-center justify-between">
        {/* Icon and Title */}
        <div className="flex items-center gap-4">
          {/* Icon Container */}
          <motion.div
            className="shrink-0"
            initial={false}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-gray-400" style={{ color: isHovered ? '#ffffff' : '#9CA3AF' }}>
              {industry.icon}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="font-semibold"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
              color: '#ffffff'
            }}
          >
            {industry.title}
          </motion.h3>
        </div>

        {/* Arrow Icon */}
        <motion.div
          initial={false}
          animate={{
            x: isHovered ? 5 : 0,
            opacity: isHovered ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </div>
    </motion.a>
  );
};

export default IndustriesSection;
