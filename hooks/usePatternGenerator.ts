'use client';

import { useState, useEffect, useMemo } from 'react';

interface Pattern {
  id: string;
  name: string;
  type: string;
  description: string;
  basePattern: string;
}

// Fallback patterns in case JSON loading fails
const FALLBACK_PATTERNS: Pattern[] = [
  {
    id: 'dots',
    name: 'Polka Dots',
    type: 'radial-gradient',
    description: 'Circular dot pattern',
    basePattern: 'radial-gradient(circle at center, {fg} 2px, transparent 2px)'
  },
  {
    id: 'stripes',
    name: 'Diagonal Stripes',
    type: 'linear-gradient',
    description: 'Classic diagonal stripe pattern',
    basePattern: 'repeating-linear-gradient(45deg, {fg} 0px, {fg} {spacing}px, transparent {spacing}px, transparent {doubleSpacing}px)'
  },
  {
    id: 'waves',
    name: 'Wave Pattern',
    type: 'linear-gradient',
    description: 'Flowing wave design',
    basePattern: 'repeating-linear-gradient(0deg, {fg} 0px, {fg} {spacing}px, transparent {spacing}px, transparent {doubleSpacing}px)'
  },
  {
    id: 'grid',
    name: 'Grid Lines',
    type: 'linear-gradient',
    description: 'Clean grid pattern',
    basePattern: 'linear-gradient({fg} 1px, transparent 1px), linear-gradient(90deg, {fg} 1px, transparent 1px)'
  },
  {
    id: 'chevron',
    name: 'Chevron',
    type: 'linear-gradient',
    description: 'Zigzag chevron pattern',
    basePattern: 'repeating-linear-gradient(45deg, {fg} 0px, {fg} {spacing}px, transparent {spacing}px, transparent {doubleSpacing}px)'
  },
  {
    id: 'hexagon',
    name: 'Hexagon',
    type: 'radial-gradient',
    description: 'Hexagonal pattern',
    basePattern: 'radial-gradient(circle at 50% 50%, {fg} 30%, transparent 30%)'
  },
  {
    id: 'triangles',
    name: 'Triangles',
    type: 'linear-gradient',
    description: 'Geometric triangle pattern',
    basePattern: 'repeating-linear-gradient(60deg, {fg} 0px, {fg} {spacing}px, transparent {spacing}px, transparent {doubleSpacing}px)'
  },
  {
    id: 'circles',
    name: 'Circles',
    type: 'radial-gradient',
    description: 'Overlapping circle pattern',
    basePattern: 'radial-gradient(circle at 25% 25%, {fg} {spacing}px, transparent {spacing}px)'
  }
];

export function usePatternGenerator() {
  const [patterns, setPatterns] = useState<Pattern[]>(FALLBACK_PATTERNS);
  const [selectedPattern, setSelectedPattern] = useState('dots');
  const [foregroundColor, setForegroundColor] = useState('#254ef4');
  const [backgroundColor, setBackgroundColor] = useState('#f0fff1');
  const [opacity, setOpacity] = useState(100);
  const [spacing, setSpacing] = useState(30);
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(10);
  const [animationDirection, setAnimationDirection] = useState('normal');

  // Load patterns from JSON with better error handling
  useEffect(() => {
    const loadPatterns = async () => {
      try {
        const response = await fetch('/data/patterns.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.patterns && Array.isArray(data.patterns) && data.patterns.length > 0) {
          setPatterns(data.patterns);
          console.log('Loaded patterns:', data.patterns.length);
        } else {
          console.warn('Invalid patterns data, using fallback');
          setPatterns(FALLBACK_PATTERNS);
        }
      } catch (error) {
        console.error('Error loading patterns:', error);
        console.log('Using fallback patterns');
        setPatterns(FALLBACK_PATTERNS);
      }
    };

    loadPatterns();
  }, []);

  // Generate random pattern with improved randomization
  const generateRandom = () => {
    if (patterns.length === 0) return;
    
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    // More balanced color palette
    const vibrantColors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', 
      '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#10ac84', '#ee5a24', 
      '#0abde3', '#3867d6', '#8854d0', '#a55eea', '#26de81', '#fd79a8',
      '#fdcb6e', '#6c5ce7', '#74b9ff', '#00b894', '#e17055', '#81ecec'
    ];
    
    const pastelColors = [
      '#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8', '#fdcb6e', '#e17055',
      '#74b9ff', '#0984e3', '#00b894', '#00cec9', '#6c5ce7', '#a29bfe',
      '#ddd6fe', '#fecaca', '#fed7d7', '#d1fae5', '#dbeafe', '#e0e7ff'
    ];
    
    // Mix vibrant and pastel colors for better balance
    const allColors = [...vibrantColors, ...pastelColors];
    
    setSelectedPattern(randomPattern.id);
    setForegroundColor(allColors[Math.floor(Math.random() * allColors.length)]);
    setBackgroundColor(allColors[Math.floor(Math.random() * allColors.length)]);
    
    // More balanced opacity range (60-95% instead of 50-100%)
    setOpacity(Math.floor(Math.random() * 36) + 60);
    
    // Better spacing distribution
    setSpacing(Math.floor(Math.random() * 50) + 15); // 15-65px
    
    // 40% chance of animation (less overwhelming)
    setIsAnimated(Math.random() > 0.6);
    
    // More reasonable animation speed range
    setAnimationSpeed(Math.floor(Math.random() * 10) + 8); // 8-18
    
    setAnimationDirection(['normal', 'reverse', 'alternate', 'alternate-reverse'][Math.floor(Math.random() * 4)]);
  };

  // Reset function
  const reset = () => {
    setSelectedPattern('dots');
    setForegroundColor('#254ef4');
    setBackgroundColor('#f0fff1');
    setOpacity(100);
    setSpacing(30);
    setIsAnimated(false);
    setAnimationSpeed(10);
    setAnimationDirection('normal');
  };

  // Generate background style with improved rendering
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
      // Improved rendering properties
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center',
      // Prevent rendering artifacts
      isolation: 'isolate',
      transform: 'translateZ(0)',
      willChange: 'background-image, background-position',
      // Ensure proper color rendering
      imageRendering: 'crisp-edges',
      
    };

    // Add background size for certain patterns
    if (selectedPattern === 'dots' || selectedPattern === 'grid') {
      style.backgroundSize = `${spacing}px ${spacing}px`;
    } else if (selectedPattern === 'hexagon' || selectedPattern === 'circles') {
      style.backgroundSize = `${spacing * 2}px ${spacing * 2}px`;
    }

    // Add animation if enabled - improved for smoother rendering
    if (isAnimated) {
      const duration = 21 - animationSpeed;
      style.animation = `patternMove ${duration}s linear infinite ${animationDirection}`;
      // Optimize for animation
      style.willChange = 'background-position, transform';
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
    css += `\n  background-attachment: fixed;`;
    css += `\n  background-repeat: repeat;`;
    css += `\n  background-position: center;`;

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