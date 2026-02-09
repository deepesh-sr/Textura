const SliderCard = ({ slide, isActive, onClick }) => {
  return (
    <div
      className={`relative transition-all duration-700 ease-in-out cursor-pointer rounded-2xl overflow-hidden group ${
        isActive ? 'flex-3' : 'flex-[0.5] hover:flex-[0.6]'
      }`}
      onClick={onClick}
      style={{ 
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Background Image/Video - Only this gets blurred */}
      <div 
        className="absolute inset-0 overflow-hidden transition-all duration-700"
        style={{ filter: isActive ? 'blur(0px)' : 'blur(8px) brightness(0.7)' }}
      >
        <img
          src={slide.imageUrl}
          alt={slide.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between" style={{ padding: '32px' }}>
        {/* Top Badge - Horizontal when active, Vertical when inactive */}
        <div className={`flex ${isActive ? 'justify-end' : 'justify-center'}`}>
          {isActive ? (
            // Horizontal Badge (Active - Top Right)
            <div className="bg-blue-600/80 backdrop-blur-sm rounded-full animate-fade-in" style={{ padding: '12px 24px' }}>
              <span
                className="text-white text-sm font-medium tracking-wide"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                {slide.badge}
              </span>
            </div>
          ) : (
            // Vertical Badge (Inactive - Top Center)
            <div 
              className="bg-gray-800/60 backdrop-blur-sm rounded-lg transition-transform duration-300 hover:scale-110" 
              style={{ 
                padding: '16px 12px',
                transform: 'scale(1.15)'
              }}
            >
              <span
                className="text-white text-xs font-medium tracking-wider block"
                style={{ 
                  fontFamily: "'Inter Tight', sans-serif",
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)'
                }}
              >
                {slide.label}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Content */}
        <div className="flex flex-col items-center">
          {isActive ? (
            // Active Card Content
            <div className="w-full max-w-6xl animate-fade-in">
              <div className="flex gap-12 items-end">
                {/* Left - Headline */}
                <div className="flex-1">
                  <h1
                    className="text-white font-bold leading-tight"
                    style={{ 
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                      marginBottom: '24px'
                    }}
                  >
                    {slide.title}
                  </h1>
                </div>

                {/* Right - Description and CTA */}
                <div className="flex-1 flex flex-col" style={{ gap: '24px' }}>
                  {/* Supporting Text */}
                  <p
                    className="text-gray-200 leading-relaxed"
                    style={{ 
                      fontFamily: "'Inter Tight', sans-serif",
                      fontSize: 'clamp(1rem, 2vw, 1.125rem)'
                    }}
                  >
                    {slide.description}
                  </p>

                  {/* Call to Action Button */}
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/50 flex items-center gap-2 w-fit group"
                    style={{ 
                      padding: '16px 32px',
                      fontSize: 'clamp(1rem, 2vw, 1.125rem)'
                    }}
                  >
                    <span style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                      {slide.buttonText}
                    </span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Inactive Card - Plus Sign
            <div className="animate-fade-in">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/50"
                aria-label={`Open ${slide.label}`}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
