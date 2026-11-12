import React, { useState, useEffect } from 'react';

interface ContinuousWriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  delayStart?: number;
  className?: string;
  cursorColor?: string;
}

export const ContinuousWriter: React.FC<ContinuousWriterProps> = ({
  phrases,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 2200,
  delayStart = 0,
  className = '',
  cursorColor,
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(delayStart === 0);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Optional start delay for staggered typing across multiple columns
  useEffect(() => {
    if (delayStart > 0) {
      const startTimer = setTimeout(() => {
        setIsStarted(true);
      }, delayStart);
      return () => clearTimeout(startTimer);
    }
  }, [delayStart]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(phrases[0] || '');
      return;
    }

    if (!isStarted || phrases.length === 0) return;

    const targetPhrase = phrases[currentPhraseIndex];

    // Typing / Deleting logic
    if (!isDeleting) {
      // Typing characters
      if (displayedText.length < targetPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(targetPhrase.slice(0, displayedText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing phrase, pause before backspacing
        const pauseTimeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
        return () => clearTimeout(pauseTimeout);
      }
    } else {
      // Deleting characters
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(targetPhrase.slice(0, displayedText.length - 1));
        }, deletingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
  }, [
    displayedText,
    isDeleting,
    currentPhraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    isStarted,
    prefersReducedMotion,
  ]);

  return (
    <span className={`inline-flex items-center min-h-[1.4em] ${className}`}>
      <span className="truncate">{displayedText}</span>
      {!prefersReducedMotion && (
        <span
          className="inline-block w-[1.5px] h-[0.9em] ml-0.5 rounded-full animate-pulse"
          style={{
            backgroundColor: cursorColor || 'var(--blue-accent, #668CFF)',
          }}
          aria-hidden="true"
        />
      )}
    </span>
  );
};

export default ContinuousWriter;