const Container = ({ children, fullWidth = false, className = '' }) => {
  if (fullWidth) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={`mx-auto w-full ${className}`}
      style={{ 
        paddingLeft: 'clamp(20px, 5vw, 80px)',
        paddingRight: 'clamp(20px, 5vw, 80px)',
        maxWidth: '1600px'
      }}
    >
      {children}
    </div>
  );
};

export default Container;
