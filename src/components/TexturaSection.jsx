import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const TexturaSection = () => {
  const containerRef = useRef(null);
  const [focusedLetter, setFocusedLetter] = useState(null);
  const [lockedOpacity, setLockedOpacity] = useState(false);

useEffect(() => {
  return scrollYProgress.onChange((v) => {
    if (v >= 0.4) setLockedOpacity(true);
  });
}, []);

  
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
    <section 
      ref={containerRef}
      className="bg-gray-50 relative"
      style={{ 
        minHeight: '1300vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Sticky Container */}
      <div 
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ width: '100%' }}
      >
        {/* Main Text Container */}
        <div className="relative w-full h-full flex items-center justify-center px-8">
          {/* The Word "Textura" */}
          <motion.div
            style={{
              scale,
              opacity : lockedOpacity ? 1 : opacity,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'clamp(0.5rem, 2vw, 2rem)',
              position: 'relative',
              width: '100%'
            }}
          >
            {letters.map((item, index) => (
              <Letter
                key={index}
                letter={item.letter}
                gradient={item.gradient}
                title={item.title}
                description={item.description}
                isFocused={focusedLetter === index}
                shouldDim={focusedLetter !== null && focusedLetter !== index}
                showExplanation={isPhase1Complete && focusedLetter === index}
              />
            ))}
          </motion.div>
        </div>

        {/* Background Gradient Effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: focusedLetter !== null 
              ? 'radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(249,250,251,0.8) 100%)'
              : 'transparent',
            transition: 'background 0.6s ease'
          }}
        />
      </div>
    </section>
  );
};

const Letter = ({ letter, gradient, title, description, isFocused, shouldDim, showExplanation }) => {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      animate={{
        opacity: shouldDim ? 0.35 : 1,
        scale: isFocused ? 1.15 : 1
      }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }}
      style={{
        position: 'relative',
        willChange: 'opacity, transform'
      }}
    >
      {/* The Letter */}
      <motion.span
        className={`font-bold bg-linear-to-r ${gradient} bg-clip-text`}
        style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 'clamp(5rem, 15vw, 12rem)',
          lineHeight: '1',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          display: 'inline-block',
          position: 'relative'
        }}
      >
        {letter}
      </motion.span>

      {/* Description Below the Letter */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            top: '100%',
            marginTop: 'clamp(15px, 2vw, 25px)',
            textAlign: 'center',
            pointerEvents: 'none',
            width: 'max-content',
            maxWidth: '400px'
          }}
        >
          <h3
            className={`font-bold mb-2 bg-linear-to-r ${gradient}`}
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              marginBottom: 'clamp(6px, 1vw, 10px)',
              whiteSpace: 'nowrap'
            }}
          >
            {title}
          </h3>
          <p
            className="text-gray-900"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
              lineHeight: '1.5',
              fontWeight: '500',
              whiteSpace: 'normal'
            }}
          >
            {description}
          </p>
        </motion.div>
      )}

      {/* Glow effect when focused */}
      {isFocused && (
        <motion.div
          className={`absolute inset-0 bg-linear-to-r ${gradient} blur-2xl`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            zIndex: -1,
            transform: 'scale(1.3)'
          }}
        />
      )}
    </motion.div>
  );
};

export default TexturaSection;
