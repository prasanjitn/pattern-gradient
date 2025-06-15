'use client';

import { useState, useEffect, useMemo } from 'react';

interface Pattern {
  id: string;
  name: string;
  type: string;
  description: string;
  basePattern: string;
}

interface Gradient {
  id: string;
  name: string;
  type: string;
  description: string;
  basePattern: string;
}

export function useHybridGenerator() {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [gradients, setGradients] = useState<Gradient[]>([]);
  const [selectedPattern, setSelectedPattern] = useState('stripes');
  const [selectedGradient, setSelectedGradient] = useState('linear-diagonal');
  const [patternColor, setPatternColor] = useState('#3b82f6');
  const [gradientColor1, setGradientColor1] = useState('#ff6b6b');
  const [gradientColor2, setGradientColor2] = useState('#4ecdc4');
  const [gradientColor3, setGradientColor3] = useState('#45b7d1');
  const [gradientColor4, setGradientColor4] = useState('#96ceb4');
  const [patternOpacity, setPatternOpacity] = useState(60);
  const [gradientOpacity, setGradientOpacity] = useState(100);
  const [spacing, setSpacing] = useState(20);
  const [gradientAngle, setGradientAngle] = useState(45);
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [animationDirection, setAnimationDirection] = useState('normal');

  // Load patterns and gradients from JSON
  useEffect(() => {
    Promise.all([
      fetch('/data/patterns.json').then(response => response.json()),
      fetch('/data/gradients.json').then(response => response.json())
    ])
      .then(([patternsData, gradientsData]) => {
        setPatterns(patternsData.patterns);
        setGradients(gradientsData.gradients);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        // Fallback data
        setPatterns([
          {
            id: 'stripes',
            name: 'Diagonal Stripes',
            type: 'linear-gradient',
            description: 'Classic diagonal stripe pattern',
            basePattern: 'repeating-linear-gradient(45deg, {fg} 0px, {fg} {spacing}px, transparent {spacing}px, transparent {doubleSpacing}px)'
          }
        ]);
        setGradients([
          {
            id: 'linear-diagonal',
            name: 'Linear Diagonal',
            type: 'linear-gradient',
            description: 'Diagonal gradient',
            basePattern: 'linear-gradient(45deg, {color1}, {color2})'
          }
        ]);
      });
  }, []);

  // Reset function
  const reset = () => {
    setSelectedPattern('stripes');
    setSelectedGradient('linear-diagonal');
    setPatternColor('#3b82f6');
    setGradientColor1('#ff6b6b');
    setGradientColor2('#4ecdc4');
    setGradientColor3('#45b7d1');
    setGradientColor4('#96ceb4');
    setPatternOpacity(60);
    setGradientOpacity(100);
    setSpacing(20);
    setGradientAngle(45);
    setIsAnimated(false);
    setAnimationSpeed(5);
    setAnimationDirection('normal');
  };

  // Generate background style
  const backgroundStyle = useMemo(() => {
    const currentPattern = patterns.find(p => p.id === selectedPattern);
    const currentGradient = gradients.find(g => g.id === selectedGradient);
    
    if (!currentPattern || !currentGradient) return { backgroundColor: '#ffffff' };

    // Generate gradient (background layer)
    let gradient = currentGradient.basePattern
      .replace(/{color1}/g, gradientColor1)
      .replace(/{color2}/g, gradientColor2)
      .replace(/{color3}/g, gradientColor3)
      .replace(/{color4}/g, gradientColor4);

    // Replace angle for linear gradients
    if (currentGradient.type === 'linear-gradient' && gradient.includes('deg')) {
      gradient = gradient.replace(/\d+deg/, `${gradientAngle}deg`);
    }

    // Generate pattern (foreground layer) - always with transparent background
    const doubleSpacing = spacing * 2;
    let pattern = currentPattern.basePattern
      .replace(/{fg}/g, patternColor)
      .replace(/{bg}/g, 'transparent')
      .replace(/{spacing}/g, spacing.toString())
      .replace(/{doubleSpacing}/g, doubleSpacing.toString());

    const style: React.CSSProperties = {
      backgroundColor: '#ffffff', // Always white background
      // Gradient as background, pattern as overlay
      backgroundImage: `${pattern}, ${gradient}`,
      transition: 'all 0.3s ease-in-out',
    };

    // Add background size for certain patterns
    if (selectedPattern === 'dots' || selectedPattern === 'grid') {
      style.backgroundSize = `${spacing}px ${spacing}px, 400% 400%`;
    } else if (selectedPattern === 'hexagon' || selectedPattern === 'circles') {
      style.backgroundSize = `${spacing * 2}px ${spacing * 2}px, 400% 400%`;
    } else {
      style.backgroundSize = 'auto, 400% 400%';
    }

    // Apply opacity
    style.opacity = gradientOpacity / 100;

    // Add animation if enabled - make it continuous
    if (isAnimated) {
      const duration = 21 - animationSpeed;
      if (currentGradient.type === 'conic-gradient') {
        style.animation = `hybridMoveConic ${duration}s linear infinite ${animationDirection}`;
      } else {
        style.animation = `hybridMove ${duration}s linear infinite ${animationDirection}`;
      }
    }

    return style;
  }, [patterns, gradients, selectedPattern, selectedGradient, patternColor, gradientColor1, gradientColor2, gradientColor3, gradientColor4, patternOpacity, gradientOpacity, spacing, gradientAngle, isAnimated, animationSpeed, animationDirection]);

  // Generate CSS code
  const cssCode = useMemo(() => {
    const currentPattern = patterns.find(p => p.id === selectedPattern);
    const currentGradient = gradients.find(g => g.id === selectedGradient);
    
    if (!currentPattern || !currentGradient) return '';

    // Generate gradient
    let gradient = currentGradient.basePattern
      .replace(/{color1}/g, gradientColor1)
      .replace(/{color2}/g, gradientColor2)
      .replace(/{color3}/g, gradientColor3)
      .replace(/{color4}/g, gradientColor4);

    // Replace angle for linear gradients
    if (currentGradient.type === 'linear-gradient' && gradient.includes('deg')) {
      gradient = gradient.replace(/\d+deg/, `${gradientAngle}deg`);
    }

    // Generate pattern
    const doubleSpacing = spacing * 2;
    let pattern = currentPattern.basePattern
      .replace(/{fg}/g, patternColor)
      .replace(/{bg}/g, 'transparent')
      .replace(/{spacing}/g, spacing.toString())
      .replace(/{doubleSpacing}/g, doubleSpacing.toString());

    let css = `.hybrid-background {
  background-color: #ffffff;
  /* Pattern overlay, gradient background */
  background-image: ${pattern}, ${gradient};`;

    // Add background size for certain patterns
    if (selectedPattern === 'dots' || selectedPattern === 'grid') {
      css += `\n  background-size: ${spacing}px ${spacing}px, 400% 400%;`;
    } else if (selectedPattern === 'hexagon' || selectedPattern === 'circles') {
      css += `\n  background-size: ${spacing * 2}px ${spacing * 2}px, 400% 400%;`;
    } else {
      css += `\n  background-size: auto, 400% 400%;`;
    }

    css += `\n  opacity: ${gradientOpacity / 100};`;
    css += `\n  transition: all 0.3s ease-in-out;`;

    if (isAnimated) {
      const duration = 21 - animationSpeed;
      if (currentGradient.type === 'conic-gradient') {
        css += `\n  animation: hybridMoveConic ${duration}s linear infinite ${animationDirection};`;
      } else {
        css += `\n  animation: hybridMove ${duration}s linear infinite ${animationDirection};`;
      }
    }

    css += `\n}`;

    // Add pattern opacity using pseudo-element
    css += `\n\n.hybrid-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${pattern};`;

    if (selectedPattern === 'dots' || selectedPattern === 'grid') {
      css += `\n  background-size: ${spacing}px ${spacing}px;`;
    } else if (selectedPattern === 'hexagon' || selectedPattern === 'circles') {
      css += `\n  background-size: ${spacing * 2}px ${spacing * 2}px;`;
    }

    css += `\n  opacity: ${patternOpacity / 100};
  pointer-events: none;
}`;

    if (isAnimated) {
      if (currentGradient.type === 'conic-gradient') {
        css += `\n\n@keyframes hybridMoveConic {
  0% { 
    background-position: 0 0, center;
    transform: rotate(0deg);
  }
  100% { 
    background-position: ${spacing}px ${spacing}px, center;
    transform: rotate(360deg);
  }
}`;
      } else {
        css += `\n\n@keyframes hybridMove {
  0% { background-position: 0 0, 0% 50%; }
  50% { background-position: ${spacing}px ${spacing}px, 100% 50%; }
  100% { background-position: 0 0, 0% 50%; }
}`;
      }
    }

    return css;
  }, [patterns, gradients, selectedPattern, selectedGradient, patternColor, gradientColor1, gradientColor2, gradientColor3, gradientColor4, patternOpacity, gradientOpacity, spacing, gradientAngle, isAnimated, animationSpeed, animationDirection]);

  return {
    patterns,
    gradients,
    selectedPattern,
    selectedGradient,
    patternColor,
    gradientColor1,
    gradientColor2,
    gradientColor3,
    gradientColor4,
    patternOpacity,
    gradientOpacity,
    spacing,
    gradientAngle,
    isAnimated,
    animationSpeed,
    animationDirection,
    backgroundStyle,
    cssCode,
    setSelectedPattern,
    setSelectedGradient,
    setPatternColor,
    setGradientColor1,
    setGradientColor2,
    setGradientColor3,
    setGradientColor4,
    setPatternOpacity,
    setGradientOpacity,
    setSpacing,
    setGradientAngle,
    setIsAnimated,
    setAnimationSpeed,
    setAnimationDirection,
    reset,
  };
}