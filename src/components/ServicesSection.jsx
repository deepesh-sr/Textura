import { motion } from 'framer-motion';
import { useState } from 'react';
import Container from './Container';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Content Creation & Management',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
      description: 'Streamlined content creation tools'
    },
    {
      id: 2,
      title: 'SEO Optimization',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      description: 'Advanced SEO tools and analytics'
    },
    {
      id: 3,
      title: 'Analytics & Insights',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      description: 'Real-time performance tracking'
    },
    {
      id: 4,
      title: 'Media Management',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      description: 'Powerful asset organization'
    },
    {
      id: 5,
      title: 'Collaboration Tools',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      description: 'Team workflow management'
    }
  ];

  return (
    <section className="bg-gray-100" style={{ padding: '80px 0' }}>
      <Container>
        {/* Section Header */}
        <div className="flex justify-between items-start" style={{ marginBottom: '24px' }}>
          <div>
            <h2
              className="text-pure-black font-semibold"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                marginBottom: '16px'
              }}
            >
              Services
            </h2>
            <p
              className="text-gray-700"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: '500',
                lineHeight: '1.3',
                maxWidth: '900px'
              }}
            >
              Our offerings are designed to drive meaningful outcomes, enhance customer experiences, and revolutionize industries with efficiency and speed.
            </p>
          </div>
          <a
            href="/services"
            className="text-pure-black hover:text-blue-600 font-medium flex items-center gap-2"
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

        {/* Services Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5"
          style={{ gap: '20px', marginTop: '60px' }}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center" style={{ marginTop: '60px' }}>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              padding: '16px 32px'
            }}
          >
            View More
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </Container>
    </section>
  );
};

const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{
        height: '400px',
        border: '1px solid #E5E7EB',
        backgroundColor: '#FFFFFF'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Image - expands on hover */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          clipPath: isHovered 
            ? 'inset(0% 0% 0% 0% round 24px)' 
            : 'inset(50% 0% 0% 0% round 0px 0px 24px 24px)'
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay - more visible on hover */}
        <motion.div 
          className="absolute inset-0"
          initial={false}
          animate={{
            background: isHovered 
              ? 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)'
              : 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)'
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between" style={{ padding: '32px' }}>
        {/* Title - Always Visible, changes color on hover */}
        <motion.h3
          className="font-semibold z-10"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
            lineHeight: '1.2',
            maxWidth: '100%'
          }}
          initial={false}
          animate={{
            color: isHovered ? '#FFFFFF' : '#000000'
          }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>

        {/* Learn More Link - Only visible on hover */}
        <motion.div
          className="z-10"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }}
          transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0 }}
        >
          <a
            href={`/services/${service.id}`}
            className="text-white font-medium flex items-center gap-2 hover:gap-3 transition-all"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)'
            }}
          >
            Learn More
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        {/* Small Icon - Only visible when NOT hovered */}
        <motion.div 
          className="absolute bottom-0 right-0 w-12 h-12 bg-blue-600 rounded-tl-2xl flex items-center justify-center"
          style={{ 
            zIndex: 5,
            borderTopLeftRadius: '16px'
          }}
          initial={false}
          animate={{
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 0.8 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServicesSection;
