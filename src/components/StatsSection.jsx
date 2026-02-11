import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from './Container';

const StatsSection = () => {
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, amount: 0.3 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 });

  const text = "At Textura, we empower content creators to compete with industry leaders by delivering world-class CMS technology, streamlined publishing, and SEO expertise, without the overhead of building it all in-house.";
  
  const stats = [
    { 
      number: 50, 
      suffix: '+', 
      label: 'Content Creators',
      subLabel: '+25 This Month',
      color: '#10B981'
    },
    { 
      number: 24, 
      suffix: '/7', 
      label: 'Support',
      subLabel: '',
      color: '#FFFFFF'
    },
    { 
      number: 1000, 
      suffix: '+', 
      label: 'Blog Posts Published',
      subLabel: '+30% Growth YoY',
      color: '#10B981'
    },
    { 
      number: 95, 
      suffix: '%', 
      label: 'SEO Score Average',
      subLabel: '',
      color: '#FFFFFF'
    }
  ];

  return (
    <section className="bg-pure-white py-12 md:py-20">
      <Container>
        {/* Animated Text Section */}
        <div className="mb-12 md:mb-20">
          <motion.p
          ref={textRef}
          className="text-pure-black leading-relaxed"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            lineHeight: '1.4'
          }}
        >
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={isTextInView ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(10px)' }}
              transition={{
                duration: 0.4,
                delay: index * 0.025,
                ease: 'easeIn'
              }}
              style={{
                color: char === 'T' && index < 10 ? '#3B82F6' : 'inherit',
                fontWeight: char === 'T' && index < 10 ? 'bold' : 'normal',
                display: 'inline-block'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.p>
      </div>

      {/* Stats Box */}
      <motion.div
        ref={statsRef}
        className="bg-pure-black rounded-2xl px-6 py-12 md:px-10 md:py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        {/* Tagline */}
        <h3
          className="text-white text-center px-4"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            fontWeight: '600',
            marginBottom: '40px md:60px'
          }}
        >
          Global Scale. Local Expertise. Proven Results.
        </h3>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              isInView={isStatsInView}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.div>
      </Container>
    </section>
  );
};

const StatCard = ({ stat, isInView, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const duration = 2000; // 2 seconds
    const startValue = 0;
    const endValue = stat.number;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (endValue - startValue) + startValue);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, stat.number, delay]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Number */}
      <div
        className="text-white font-bold"
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          lineHeight: '1',
          marginBottom: '12px'
        }}
      >
        {count}
        <span style={{ color: stat.color }}>{stat.suffix}</span>
      </div>

      {/* Label */}
      <div
        className="text-white font-medium"
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
          marginBottom: '8px'
        }}
      >
        {stat.label}
      </div>

      {/* Sub Label */}
      {stat.subLabel && (
        <div
          className="font-medium"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
            color: stat.color
          }}
        >
          {stat.subLabel}
        </div>
      )}
    </motion.div>
  );
};

export default StatsSection;
