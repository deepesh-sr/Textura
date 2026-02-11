import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API_BASE from "../config";
import SliderCard from "./SliderCard";
import Container from "./Container";

const HeroSlider = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/sliders`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          const mappedSlides = data.map((item, index) => ({
            id: index, // or item._id
            title: item.title,
            badge: item.badge,
            description: item.description,
            buttonText: item.buttonText,
            imageUrl: item.imageUrl,
            label: item.label
          }));
          setSlides(mappedSlides);
        }
      } catch (error) {
        console.error("Error fetching sliders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (slides.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <section className="relative min-h-screen bg-pure-white" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
      <Container>
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl h-150 lg:h-150 min-h-150 md:min-h-0"
          style={{ 
            borderRadius: '16px', 
            overflow: 'hidden', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            minHeight: '600px'
          }}
        >
          <div 
            className="flex flex-col md:flex-row h-full gap-3 p-3 bg-[#F2F2F2]"
            style={{ 
              display: 'flex', 
              flexDirection: window.innerWidth < 768 ? 'column' : 'row',
              height: '100%',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#F2F2F2'
            }}
          >
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
      </Container>
    </section>
  );
};

export default HeroSlider;
