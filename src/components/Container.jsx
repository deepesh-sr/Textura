const Container = ({ children, fullWidth = false, className = '' }) => {
  if (fullWidth) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={`mx-auto ${className}`}
      style={{ 
        paddingLeft: 'clamp(16px, 5vw, 80px)',
        paddingRight: 'clamp(16px, 5vw, 80px)',
        maxWidth: '1600px'
      }}
    >
      {children}
    </div>
  );
};

export default Container;
