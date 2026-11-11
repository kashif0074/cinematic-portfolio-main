import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { animationConfig } from '../config/animationConfig';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  disabled?: boolean;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = animationConfig.cursor.magneticPull,
  className = '',
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const touchQuery = window.matchMedia('(pointer: coarse), (hover: none)');
    const updateTouch = () => setIsTouchDevice(touchQuery.matches);
    updateTouch();
    touchQuery.addEventListener('change', updateTouch);
    return () => touchQuery.removeEventListener('change', updateTouch);
  }, []);

  const springConfig = animationConfig.easings.magneticSpring;
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isTouchDevice || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (disabled || isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
