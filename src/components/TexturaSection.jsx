import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const TexturaSection = () => {
  const containerRef = useRef(null);
  const [focusedLetter, setFocusedLetter] = useState(null);
  const [lockedOpacity, setLockedOpacity] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Phase 1: Scale and opacity (0-0.5 of scroll) - extended duration
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  
  // Phase 2: Letter focus progression (0.5-1.0 of scroll)
  const letterProgress = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  useEffect(() => {
    const unsubscribe = letterProgress.onChange((latest) => {
      if (latest < 0.14) {
        setFocusedLetter(0); // T
      } else if (latest < 0.28) {
        setFocusedLetter(1); // E
      } else if (latest < 0.42) {
        setFocusedLetter(2); // X
      } else if (latest < 0.56) {
        setFocusedLetter(3); // T
      } else if (latest < 0.70) {
        setFocusedLetter(4); // U
      } else if (latest < 0.84) {
        setFocusedLetter(5); // R
      } else if (latest < 1) {
        setFocusedLetter(6); // A
      } else {
        setFocusedLetter(null);
      }
    });

    return () => unsubscribe();
  }, [letterProgress]);

  // Check if Phase 1 is complete
  const [isPhase1Complete, setIsPhase1Complete] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setIsPhase1Complete(latest >= 0.5);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const letters = [
    {
      letter: 'T',
      title: 'Transform',
      description: 'Transform your content workflow with powerful digital solutions',
      gradient: 'from-gray-900 via-gray-800 to-gray-700'
    },
    {
      letter: 'e',
      title: 'Elevate',
      description: 'Elevate your digital presence with seamless content management',
      gradient: 'from-gray-800 via-gray-700 to-gray-600'
    },
    {
      letter: 'x',
      title: 'eXperience',
      description: 'Experience intuitive interfaces designed for modern publishers',
      gradient: 'from-gray-900 via-gray-700 to-gray-600'
    },
    {
      letter: 't',
      title: 'Technology',
      description: 'Technology that adapts to your unique business needs',
      gradient: 'from-black via-gray-800 to-gray-700'
    },
    {
      letter: 'u',
      title: 'Unify',
      description: 'Unify your teams with collaborative content creation tools',
      gradient: 'from-gray-800 via-gray-700 to-gray-600'
    },
    {
      letter: 'r',
      title: 'Revolutionize',
      description: 'Revolutionize how you create, manage, and distribute content',
      gradient: 'from-gray-900 via-gray-800 to-gray-600'
    },
    {
      letter: 'a',
      title: 'Amplify',
      description: 'Amplify your reach across all digital channels effortlessly',
      gradient: 'from-black via-gray-800 to-gray-700'
    }
  ];

  return (
    <section ref={containerRef} className="relative bg-black min-h-[300vh] py-20">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Main Title Background */}
        <motion.div
          style={{
            scale,
            opacity: isPhase1Complete ? (lockedOpacity ? 1 : opacity) : opacity,
          }}
          className="relative flex flex-col items-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 lg:gap-8">
            {letters.map((item, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer"
                onMouseEnter={() => setFocusedLetter(index)}
                onMouseLeave={() => setFocusedLetter(null)}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: 'clamp(80px, 10vw, 120px)',
                  height: 'clamp(80px, 10vw, 120px)',
                  margin: '0 auto',
                  position: 'relative',
                  willChange: 'opacity, transform'
                }}
              >
                <span
                  className="text-white font-black leading-none transition-all duration-500 block"
                  style={{
                    fontSize: 'clamp(4rem, 15vw, 12rem)',
                    fontFamily: "'Inter Tight', sans-serif",
                    filter: focusedLetter !== null && focusedLetter !== index ? 'blur(8px) grayscale(1)' : 'none',
                    opacity: focusedLetter !== null && focusedLetter !== index ? 0.3 : 1,
                    transform: focusedLetter === index ? 'scale(1.1)' : 'scale(1)',
                    color: focusedLetter === index ? '#FFFFFF' : '#333333'
                  }}
                >
                  {item.letter}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Dynamic Content based on focused letter */}
          <div className="mt-12 md:mt-20 h-32 md:h-40 text-center max-w-2xl px-6">
            <AnimatePresence mode="wait">
              {focusedLetter !== null && (
                <motion.div
                  key={focusedLetter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-white text-2xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {letters[focusedLetter].title}
                  </h3>
                  <p className="text-gray-400 text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    {letters[focusedLetter].description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TexturaSection;
