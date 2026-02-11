import { motion } from 'framer-motion';
import { useState } from 'react';
import Container from './Container';

const CaseStudiesSection = () => {
  const caseStudies = [
    {
      id: 1,
      title: 'ContentFlow',
      subtitle: 'Streamlining Content Management for Digital Publishers',
      description: 'ContentFlow revolutionizes how digital publishers manage their content workflows, enabling seamless collaboration and faster time-to-publish across multiple platforms.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
      logo: '📱'
    },
    {
      id: 2,
      title: 'MediaHub',
      subtitle: 'Transforming Asset Management for Creative Teams',
      description: 'MediaHub delivers comprehensive digital asset management solutions tailored to creative agencies, enabling efficient organization, search, and distribution of media files.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      logo: '🎨'
    },
    {
      id: 3,
      title: 'PublishPro',
      subtitle: 'Empowering Multi-Channel Publishing Excellence',
      description: 'PublishPro is a pioneering content publishing platform designed to provide a seamless and efficient process for managing and distributing content across channels.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
      logo: '📰'
    }
  ];

  return (
    <section className="bg-white py-12 md:py-20">
      <Container>
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2
            className="text-pure-black font-semibold text-2xl md:text-3xl mb-4 md:mb-6"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
            }}
          >
            Case Studies
          </h2>
          <p
            className="text-gray-700 text-2xl md:text-4xl lg:text-5xl font-medium leading-tight md:leading-snug max-w-4xl"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
            }}
          >
            Our offerings are designed to drive meaningful outcomes, enhance customer experiences, and revolutionize industries with efficiency and speed.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-start mt-12 md:mt-16">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full flex items-center gap-2 transition-all duration-300 hover:shadow-lg px-8 py-4 md:px-10 md:py-5 text-lg"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
            }}
          >
            View More
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </Container>
    </section>
  );
};

const CaseStudyCard = ({ caseStudy }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative rounded-3xl overflow-hidden cursor-pointer h-125 md:h-150"
      style={{
        backgroundColor: '#000000'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background Image with scale effect */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <img
          src={caseStudy.image}
          alt={caseStudy.title}
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent"></div>
      </motion.div>

      {/* Content Card - Expands on hover */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          backgroundColor: 'rgba(30, 30, 30, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
        initial={false}
        animate={{
          bottom: isHovered ? '12px' : '24px',
          left: isHovered ? '0px' : '24px',
          right: isHovered ? '0px' : '24px',
          borderRadius: isHovered ? '0px' : '16px'
        }}
        transition={{ duration: 0.05, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          initial={false}
          animate={{
            padding: isHovered ? '40px 32px' : '32px'
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Logo/Icon */}
          <div 
            style={{ 
              fontSize: '32px',
              marginBottom: '16px'
            }}
          >
            {caseStudy.logo}
          </div>

          {/* Title */}
          <h3
            className="text-white font-bold"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)',
              marginBottom: '12px',
              lineHeight: '1.2'
            }}
          >
            {caseStudy.title}
          </h3>

          {/* Subtitle */}
          <p
            className="text-gray-300 font-medium"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
              marginBottom: '16px',
              lineHeight: '1.4'
            }}
          >
            {caseStudy.subtitle}
          </p>

          {/* Description - Only visible on hover */}
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? 'auto' : 0,
              marginBottom: isHovered ? '20px' : 0
            }}
            transition={{ duration: 0.4, delay: isHovered ? 0.2 : 0 }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="text-gray-400"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 'clamp(0.875rem, 1vw, 0.95rem)',
                lineHeight: '1.6'
              }}
            >
              {caseStudy.description}
            </p>
          </motion.div>

          {/* View Case Study Link */}
          <motion.a
            href={`/case-studies/${caseStudy.id}`}
            className="text-green-400 hover:text-green-300 font-medium flex items-center gap-2 transition-all"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)'
            }}
            initial={false}
            animate={{
              y: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.3 }}
          >
            View Case Study
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              animate={{
                x: isHovered ? 3 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CaseStudiesSection;
