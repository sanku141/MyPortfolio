import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children, direction = 'up', delay = 0, duration = 800, is3D = false }) => {
  const ref = useRef(null);
  const [transformStyle, setTransformStyle] = useState({});
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Check if we are on a mobile/tablet viewport size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef || isMobile) return;

    if (is3D) {
      // 3D Real-Time Parallax Scroll for Desktop
      const handleScroll = () => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        
        if (rect.top < viewHeight && rect.bottom > 0) {
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = viewHeight / 2;
          
          const ratio = (elementCenter - viewportCenter) / (viewportCenter || 1);
          const clampedRatio = Math.max(-1.2, Math.min(1.2, ratio));

          const rotateX = clampedRatio * -6; // Subtle professional 3D tilt (reduced from 10)
          const translateY = clampedRatio * 15; // Parallax translation
          const translateZ = (1 - Math.abs(clampedRatio)) * 30 - 30; // Subtle Z-depth
          const scale = 0.97 + (1 - Math.abs(clampedRatio)) * 0.03; // Smooth scale
          
          // CRITICAL: Opacity is locked to 1.0 (or very slightly dimmed at the extreme edges)
          // to prevent washed-out text and ensure excellent readability.
          const opacity = 0.9 + (1 - Math.abs(clampedRatio)) * 0.1;
          const clampedOpacity = Math.max(0.85, Math.min(1, opacity));

          setTransformStyle({
            transform: `perspective(1200px) rotateX(${rotateX}deg) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
            opacity: clampedOpacity,
            transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
            transformStyle: 'preserve-3d',
            willChange: 'transform, opacity'
          });
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      setTimeout(handleScroll, 50);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // Standard reveal observer for Desktop non-3D reveals
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
      );

      observer.observe(currentRef);

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }
  }, [is3D, isMobile]);

  // If mobile or tablet, return a standard div with no hidden opacity/transforms
  if (isMobile) {
    return <div className="mobile-reveal-container">{children}</div>;
  }

  // If desktop running 3D parallax
  if (is3D) {
    return (
      <div ref={ref} style={transformStyle} className="reveal-3d-panel">
        {children}
      </div>
    );
  }

  const getRevealClass = () => {
    switch (direction) {
      case 'up': return 'reveal-up';
      case 'down': return 'reveal-down';
      case 'left': return 'reveal-left';
      case 'right': return 'reveal-right';
      case 'scale': return 'reveal-scale';
      default: return 'reveal-up';
    }
  };

  // If desktop running standard static fade-in
  return (
    <div
      ref={ref}
      className={`reveal ${getRevealClass()} ${isIntersecting ? 'active' : ''}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
