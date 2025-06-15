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
  const [selectedPattern, setSelectedPattern] = useState('dots'); // Changed to dots (polka dots)
  const [foregroundColor, setForegroundColor] = useState('#254ef4'); // Changed to requested color
  const [backgroundColor, setBackgroundColor] = useState('#f0fff1'); // Changed to requested color
  const [opacity, setOpacity] = useState(100); // Changed to 100%
  const [spacing, setSpacing] = useState(30); // Changed to 30px
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(10); // Changed to 10
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

  // Generate random pattern
  const generateRandom = () => {
    if (patterns.length === 0) return;
    
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    const randomColors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd',
      '#00d2d3', '#ff9f43', '#10ac84', '#ee5a24', '#0abde3', '#3867d6', '#8854d0', '#a55eea'
    ];
    
    setSelectedPattern(randomPattern.id);
    setForegroundColor(randomColors[Math.floor(Math.random() * randomColors.length)]);
    setBackgroundColor(randomColors[Math.floor(Math.random() * randomColors.length)]);
    setOpacity(Math.floor(Math.random() * 50) + 50); // 50-100%
    setSpacing(Math.floor(Math.random() * 60) + 10); // 10-70px
    setIsAnimated(Math.random() > 0.5);
    setAnimationSpeed(Math.floor(Math.random() * 15) + 5); // 5-20
    setAnimationDirection(['normal', 'reverse', 'alternate', 'alternate-reverse'][Math.floor(Math.random() * 4)]);
  };

  // Reset function
  const reset = () => {
    setSelectedPattern('dots'); // Changed to dots
    setForegroundColor('#254ef4'); // Changed to requested color
    setBackgroundColor('#f0fff1'); // Changed to requested color
    setOpacity(100); // Changed to 100%
    setSpacing(30); // Changed to 30px
    setIsAnimated(false);
    setAnimationSpeed(10); // Changed to 10
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
    generateRandom,
    reset,
  };
}