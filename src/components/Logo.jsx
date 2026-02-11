const Logo = () => {
  return (
    <a 
      href="/" 
      className="hover:opacity-80 transition-opacity duration-300 flex items-center no-underline"
      aria-label="Textura - Home"
      style={{ 
        fontFamily: "'Inter Tight', sans-serif",
        fontSize: 'clamp(24px, 4vw, 28px)',
        fontWeight: '900',
        color: '#000000',
        letterSpacing: '-0.05em',
      }}
    >
      Textura
      <span style={{ color: '#2563EB', marginLeft: '1px' }}>.</span>
    </a>
  );
};

export default Logo;
