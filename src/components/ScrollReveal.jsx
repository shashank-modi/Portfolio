import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'up',
  threshold = 0.05
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      },
      { threshold }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getDirectionStyles = () => {
    const state = isVisible ? 'reveal-visible' : '';
    switch (direction) {
      case 'up':
        return `reveal-up ${state}`;
      case 'down':
        return `reveal-down ${state}`;
      case 'left':
        return `reveal-left ${state}`;
      case 'right':
        return `reveal-right ${state}`;
      case 'none':
      default:
        return `reveal-none ${state}`;
    }
  };

  return (
    <div
      ref={domRef}
      className={`scroll-reveal ${getDirectionStyles()} ${className}`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
