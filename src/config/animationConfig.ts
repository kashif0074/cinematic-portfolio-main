// Centralized Animation Configuration
// Controls durations, easings, delays, springs, and intensities across the entire portfolio.

export const animationConfig = {
  // Global timing presets (in seconds)
  durations: {
    instant: 0.15,
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    cinematic: 1.2,
  },

  // Easing curves (Cubic Bezier & Framer Motion friendly)
  easings: {
    // Elegant luxury ease-out
    luxury: [0.16, 1, 0.3, 1] as const,
    // Smooth cinematic curve
    cinematic: [0.25, 0.1, 0.25, 1] as const,
    // Snappy bounce/spring
    spring: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 24,
    },
    gentleSpring: {
      type: 'spring' as const,
      stiffness: 180,
      damping: 22,
    },
    magneticSpring: {
      type: 'spring' as const,
      stiffness: 350,
      damping: 25,
      mass: 0.5,
    },
  },

  // Stagger delays for child items
  stagger: {
    fast: 0.06,
    default: 0.1,
    relaxed: 0.16,
  },

  // Cursor Configuration
  cursor: {
    dotSize: 8,
    ringSize: 38,
    hoverScale: 1.75,
    ringBorderWidth: '1.5px',
    smoothing: 0.18, // lerp interpolation factor
    magneticRadius: 80, // distance in px to attract
    magneticPull: 0.35, // strength factor
  },

  // Scroll & Parallax factors
  parallax: {
    subtle: 0.08,
    ambient: 0.15,
  },
};

export type AnimationConfig = typeof animationConfig;
