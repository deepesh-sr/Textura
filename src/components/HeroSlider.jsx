import { useState, useEffect } from 'react';
import SliderCard from './SliderCard';

const HeroSlider = () => {
  const [activeCard, setActiveCard] = useState(0);

  const slides = [
    {
      id: 0,
      title: 'Manage Content Effortlessly',
      badge: 'CMS Dashboard',
      description: 'Create, edit, and publish SEO-optimized blog content with our intuitive drag-and-drop editor. No technical knowledge required.',
      buttonText: "Start Creating",
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80',
      label: 'Content'
    },
    {
      id: 1,
      title: 'SEO Tools Built-In',
      badge: 'Optimization Hub',
      description: 'Boost your search rankings with automated meta tags, keyword suggestions, and real-time SEO scoring for every post.',
      buttonText: 'Explore SEO',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
      label: 'SEO Tools'
    },
    {
      id: 2,
      title: 'Track Your Growth',
      badge: 'Analytics',
      description: 'Monitor page views, engagement metrics, and user behavior with comprehensive analytics dashboard and insights.',
      buttonText: 'View Analytics',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
      label: 'Analytics'
    },
    {
      id: 3,
      title: 'Media Management',
      badge: 'Asset Library',
      description: 'Upload, organize, and optimize images and videos with our powerful media library. Automatic compression included.',
      buttonText: 'Manage Media',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&q=80',
      label: 'Media'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen bg-pure-black" style={{ padding: '32px 16px' }}>
      <div className="max-w-400 mx-auto rounded-2xl overflow-hidden shadow-2xl" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <SliderCard
              key={slide.id}
              slide={slide}
              isActive={activeCard === index}
              onClick={() => setActiveCard(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
