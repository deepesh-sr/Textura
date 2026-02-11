import { motion } from 'framer-motion';
import Container from './Container';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: '✨',
      title: 'Built for Content Creators',
      description: 'Unlike legacy CMS platforms requiring technical knowledge, Textura was purpose-built with content creators at our core. Every feature leverages intuitive design, drag-and-drop editing, and smart automation to deliver a system that adapts to your workflow.',
      iconBg: '#93C5FD',
      hoverIconBg: '#60A5FA'
    },
    {
      id: 2,
      icon: '⚡',
      title: 'Rapid, High-Impact Publishing',
      description: 'We combine modern CMS technologies, pre-built SEO tools, and streamlined workflows to deliver production-ready content 3-5x faster than traditional platforms—without compromising quality, security, or scalability.',
      iconBg: '#93C5FD',
      hoverIconBg: '#60A5FA'
    },
    {
      id: 3,
      icon: '📊',
      title: 'ROI-Focused Results',
      description: 'Every feature is designed with clear KPIs and success metrics. We focus relentlessly on outcomes that matter: organic traffic growth, engagement rates, conversion optimization, user satisfaction, and competitive differentiation.',
      iconBg: '#93C5FD',
      hoverIconBg: '#60A5FA'
    }
  ];

  return (
    <section className="bg-pure-white py-12 md:py-20">
      <Container>
        {/* Section Header */}
        <div className="mb-6 md:mb-12">
          <h2
            className="text-pure-black font-semibold text-base md:text-xl mb-2 md:mb-4"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
            }}
          >
            Why Textura
          </h2>
          <h3
            className="text-gray-700 text-3xl md:text-5xl lg:text-6xl font-medium leading-tight md:leading-tight"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
            }}
          >
            The intelligent partner for your digital transformation
          </h3>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </Container>
    </section>
  );
};

const FeatureCard = ({ feature }) => {
  return (
    <motion.div
      className="group relative bg-gray-50 border border-gray-200 rounded-2xl cursor-pointer p-8 md:p-10"
      initial={{ y: 0, boxShadow: 'none' }}
      whileHover={{
        y: -8,
        boxShadow: '12px 12px 30px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
      }}
    >
      {/* Icon Box */}
      <div
        className="rounded-xl flex items-center justify-center group-hover:scale-110"
        style={{
          width: '64px',
          height: '64px',
          backgroundColor: feature.iconBg,
          marginBottom: '24px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <span style={{ fontSize: '28px' }}>{feature.icon}</span>
      </div>

      {/* Title */}
      <h4
        className="font-semibold group-hover:text-blue-600"
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
          marginBottom: '16px',
          color: '#000000',
          lineHeight: '1.3',
          transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {feature.title}
      </h4>

      {/* Description */}
      <p
        className="group-hover:text-gray-700"
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
          lineHeight: '1.6',
          color: '#6B7280',
          transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {feature.description}
      </p>
    </motion.div>
  );
};

export default FeaturesSection;
