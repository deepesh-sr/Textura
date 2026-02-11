const Container = ({ children, fullWidth = false, className = '' }) => {
  if (fullWidth) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={`mx-auto w-full ${className}`}
      style={{ 
        paddingLeft: 'clamp(20px, 5vw, 60px)',
        paddingRight: 'clamp(20px, 5vw, 60px)',
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      {children}
    </div>
  );
};

export default Container;
