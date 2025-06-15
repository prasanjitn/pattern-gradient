'use client';

import { useState, useEffect, useMemo } from 'react';

interface Pattern {
  id: string;
  name: string;
  type: string;
  description: string;
  basePattern: string;
}

export function usePatternGenerator() {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [selectedPattern, setSelectedPattern] = useState('stripes');
  const [foregroundColor, setForegroundColor] = useState('#808080'); // Grey
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // White
  const [opacity, setOpacity] = useState(50); // 50%
  const [spacing, setSpacing] = useState(20);
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [animationDirection, setAnimationDirection] = useState('normal');

  // Load patterns from JSON
  useEffect(() => {
    fetch('/data/patterns.json')
      .then(response => response.json())
      .then(data => {
        setPatterns(data.patterns);
      })
      .catch(error => {
        console.error('Error loading patterns:', error);
        // Fallback patterns in case of error
        setPatterns([
          {
            id: 'stripes',
            name: 'Diagonal Stripes',
            type: 'linear-gradient',
            description: 'Classic diagonal stripe pattern',
            basePattern: 'repeating-linear-gradient(45deg, {fg} 0px, {fg} {spacing}px, {bg} {spacing}px, {bg} {doubleSpacing}px)'
          }
        ]);
      });
  }, []);

  // Reset function
  const reset = () => {
    setSelectedPattern('stripes');
    setForegroundColor('#808080'); // Grey
    setBackgroundColor('#ffffff'); // White
    setOpacity(50); // 50%
    setSpacing(20);
    setIsAnimated(false);
    setAnimationSpeed(5);
    setAnimationDirection('normal');
  };

  // Generate background style
  const backgroundStyle = useMemo(() => {
    const currentPattern = patterns.find(p => p.id === selectedPattern);
    if (!currentPattern) return { backgroundColor: '#ffffff' };

    const doubleSpacing = spacing * 2;
    let pattern = currentPattern.basePattern
      .replace(/{fg}/g, foregroundColor)
      .replace(/{bg}/g, backgroundColor)
      .replace(/{spacing}/g, spacing.toString())
      .replace(/{doubleSpacing}/g, doubleSpacing.toString());

    const style: React.CSSProperties = {
      backgroundColor: backgroundColor,
      backgroundImage: pattern,
      opacity: opacity / 100,
      transition: 'all 0.3s ease-in-out',
    };

    // Add background size for certain patterns
    if (selectedPattern === 'dots' || selectedPattern === 'grid') {
      style.backgroundSize = `${spacing}px ${spacing}px`;
    } else if (selectedPattern === 'hexagon' || selectedPattern === 'circles') {
      style.backgroundSize = `${spacing * 2}px ${spacing * 2}px`;
    }

    // Add animation if enabled - make it continuous
    if (isAnimated) {
      const duration = 21 - animationSpeed; // Convert speed (1-20) to duration (20s-1s)
      style.animation = `patternMove ${duration}s linear infinite ${animationDirection}`;
    }

    return style;
  }, [patterns, selectedPattern, foregroundColor, backgroundColor, opacity, spacing, isAnimated, animationSpeed, animationDirection]);

  // Generate CSS code
  const cssCode = useMemo(() => {
    const currentPattern = patterns.find(p => p.id === selectedPattern);
    if (!currentPattern) return '';

    const doubleSpacing = spacing * 2;
    let pattern = currentPattern.basePattern
      .replace(/{fg}/g, foregroundColor)
      .replace(/{bg}/g, backgroundColor)
      .replace(/{spacing}/g, spacing.toString())
      .replace(/{doubleSpacing}/g, doubleSpacing.toString());

    let css = `.pattern-background {
  background-color: ${backgroundColor};
  background-image: ${pattern};`;

    // Add background size for certain patterns
    if (selectedPattern === 'dots' || selectedPattern === 'grid') {
      css += `\n  background-size: ${spacing}px ${spacing}px;`;
    } else if (selectedPattern === 'hexagon' || selectedPattern === 'circles') {
      css += `\n  background-size: ${spacing * 2}px ${spacing * 2}px;`;
    }

    css += `\n  opacity: ${opacity / 100};`;
    css += `\n  transition: all 0.3s ease-in-out;`;

    if (isAnimated) {
      const duration = 21 - animationSpeed;
      css += `\n  animation: patternMove ${duration}s linear infinite ${animationDirection};`;
    }

    css += `\n}`;

    if (isAnimated) {
      css += `\n\n@keyframes patternMove {
  0% { background-position: 0 0; }
  100% { background-position: ${spacing}px ${spacing}px; }
}`;
    }

    return css;
  }, [patterns, selectedPattern, foregroundColor, backgroundColor, opacity, spacing, isAnimated, animationSpeed, animationDirection]);

  return {
    patterns,
    selectedPattern,
    foregroundColor,
    backgroundColor,
    opacity,
    spacing,
    isAnimated,
    animationSpeed,
    animationDirection,
    backgroundStyle,
    cssCode,
    setSelectedPattern,
    setForegroundColor,
    setBackgroundColor,
    setOpacity,
    setSpacing,
    setIsAnimated,
    setAnimationSpeed,
    setAnimationDirection,
    reset,
  };
}