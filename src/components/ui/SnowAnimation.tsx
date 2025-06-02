import React, { useEffect, useRef } from 'react';

const SnowAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const snowflakesCount = 50; // Reduced count for better performance
    
    // Clear any existing snowflakes
    container.innerHTML = '';
    
    const createSnowflakes = () => {
      for (let i = 0; i < snowflakesCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Random size between 2px and 7px
        const size = Math.random() * 5 + 2;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Random horizontal position
        snowflake.style.left = `${Math.random() * 100}%`;
        
        // Random falling duration between 10s and 20s
        const duration = Math.random() * 10 + 10;
        snowflake.style.animationDuration = `${duration}s`;
        
        // Random delay so they don't all start at once
        snowflake.style.animationDelay = `${Math.random() * 10}s`;
        
        container.appendChild(snowflake);
      }
    };
    
    createSnowflakes();
    
    // Clean up
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="snow-container" aria-hidden="true"></div>
  );
};

export default SnowAnimation;