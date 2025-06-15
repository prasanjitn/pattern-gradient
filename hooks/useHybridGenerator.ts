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
  const [selectedGradient, setSelectedGradient] = useState('linear-vertical');
  const [patternColor, setPatternColor] = useState('#feca57');
  const [gradientColor1, setGradientColor1] = useState('#a55eea');
  const [gradientColor2, setGradientColor2] = useState('#0abde3');
  const [gradientColor3, setGradientColor3] = useState('#54a0ff');
  const [gradientColor4, setGradientColor4] = useState('#feca57');
  const [patternOpacity, setPatternOpacity] = useState(63);
  const [gradientOpacity, setGradientOpacity] = useState(54);
  const [spacing, setSpacing] = useState(5);
  const [gradientAngle, setGradientAngle] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [animationDirection, setAnimationDirection] = useState('normal');

  // Load patterns and gradients from JSON
  useEffect(() => {
    Promise.all([
      fetch('/data/patterns.json').then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }),
      fetch('/data/gradients.json').then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
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
            id: 'linear-vertical',
            name: 'Linear Vertical',
            type: 'linear-gradient',
            description: 'Vertical gradient',
            basePattern: 'linear-gradient(0deg, {color1}, {color2}, {color3}, {color4})'
          }
        ]);
      });
  }, []);

  // Generate random hybrid
  const generateRandom = () => {
    if (patterns.length === 0 || gradients.length === 0) return;
    
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    const randomColors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd',
      '#00d2d3', '#ff9f43', '#10ac84', '#ee5a24', '#0abde3', '#3867d6', '#8854d0', '#a55eea'
    ];
    
    setSelectedPattern(randomPattern.id);
    setSelectedGradient(randomGradient.id);
    setPatternColor(randomColors[Math.floor(Math.random() * randomColors.length)]);
    setGradientColor1(randomColors[Math.floor(Math.random() * randomColors.length)]);
    setGradientColor2(randomColors[Math.floor(Math.random() * randomColors.length)]);
    setGradientColor3(randomColors[Math.floor(Math.random() * randomColors.length)]);
    setGradientColor4(randomColors[Math.floor(Math.random() * randomColors.length)]);
    setPatternOpacity(Math.floor(Math.random() * 50) + 30); // 30-80%
    setGradientOpacity(Math.floor(Math.random() * 50) + 50); // 50-100%
    setSpacing(Math.floor(Math.random() * 60) + 10); // 10-70px
    setGradientAngle(Math.floor(Math.random() * 24) * 15); // 0-360 in 15° steps
    setIsAnimated(Math.random() > 0.5);
    setAnimationSpeed(Math.floor(Math.random() * 15) + 5); // 5-20
    setAnimationDirection(['normal', 'reverse', 'alternate', 'alternate-reverse'][Math.floor(Math.random() * 4)]);
  };

  // Reset function
  const reset = () => {
    setSelectedPattern('stripes');
    setSelectedGradient('linear-vertical');
    setPatternColor('#feca57');
    setGradientColor1('#a55eea');
    setGradientColor2('#0abde3');
    setGradientColor3('#54a0ff');
    setGradientColor4('#feca57');
    setPatternOpacity(63);
    setGradientOpacity(54);
    setSpacing(5);
    setGradientAngle(0);
    setIsAnimated(false);
    setAnimationSpeed(5);
    setAnimationDirection('normal');
  };

  // Generate background style with improved rendering
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

    // Generate pattern (foreground layer) with transparency
    const doubleSpacing = spacing * 2;
    let pattern = currentPattern.basePattern
      .replace(/{fg}/g, patternColor)
      .replace(/{bg}/g, 'transparent')
      .replace(/{spacing}/g, spacing.toString())
      .replace(/{doubleSpacing}/g, doubleSpacing.toString());

    // Apply pattern opacity by modifying the pattern color
    const patternWithOpacity = pattern.replace(
      new RegExp(patternColor, 'g'), 
      patternColor + Math.round(patternOpacity * 2.55).toString(16).padStart(2, '0')
    );

    const style: React.CSSProperties = {
      backgroundColor: '#ffffff',
      // Pattern as overlay, gradient as background
      backgroundImage: `${patternWithOpacity}, ${gradient}`,
      opacity: gradientOpacity / 100,
      transition: 'all 0.3s ease-in-out',
      // Improved rendering properties
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'repeat, no-repeat',
      backgroundPosition: 'center, center',
      // Prevent rendering artifacts
      isolation: 'isolate',
      transform: 'translateZ(0)',
      willChange: 'background-image, background-position, transform',
      // Ensure proper color rendering
      imageRendering: 'crisp-edges',
      WebkitImageRendering: 'crisp-edges',
    };

    // Add background size for certain patterns
    if (selectedPattern === 'dots' || selectedPattern === 'grid') {
      style.backgroundSize = `${spacing}px ${spacing}px, 100% 100%`;
    } else if (selectedPattern === 'hexagon' || selectedPattern === 'circles') {
      style.backgroundSize = `${spacing * 2}px ${spacing * 2}px, 100% 100%`;
    } else {
      style.backgroundSize = 'auto, 100% 100%';
    }

    // Add animation if enabled - improved for smoother rendering
    if (isAnimated) {
      const duration = 21 - animationSpeed;
      if (currentGradient.type === 'conic-gradient') {
        style.animation = `gradientSpin ${duration}s linear infinite ${animationDirection}`;
      } else {
        style.animation = `gradientShift ${duration}s ease-in-out infinite ${animationDirection}`;
        // Update background size for animation
        if (selectedPattern === 'dots' || selectedPattern === 'grid') {
          style.backgroundSize = `${spacing}px ${spacing}px, 400% 400%`;
        } else if (selectedPattern === 'hexagon' || selectedPattern === 'circles') {
          style.backgroundSize = `${spacing * 2}px ${spacing * 2}px, 400% 400%`;
        } else {
          style.backgroundSize = 'auto, 400% 400%';
        }
      }
      // Optimize for animation
      style.willChange = 'background-position, transform';
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

    // Generate pattern with opacity
    const doubleSpacing = spacing * 2;
    let pattern = currentPattern.basePattern
      .replace(/{fg}/g, patternColor)
      .replace(/{bg}/g, 'transparent')
      .replace(/{spacing}/g, spacing.toString())
      .replace(/{doubleSpacing}/g, doubleSpacing.toString());

    // Apply pattern opacity
    const patternWithOpacity = pattern.replace(
      new RegExp(patternColor, 'g'), 
      patternColor + Math.round(patternOpacity * 2.55).toString(16).padStart(2, '0')
    );

    let css = `.hybrid-background {
  background-color: #ffffff;
  background-image: ${patternWithOpacity}, ${gradient};`;

    // Add background size for certain patterns
    if (selectedPattern === 'dots' || selectedPattern === 'grid') {
      css += `\n  background-size: ${spacing}px ${spacing}px, 100% 100%;`;
    } else if (selectedPattern === 'hexagon' || selectedPattern === 'circles') {
      css += `\n  background-size: ${spacing * 2}px ${spacing * 2}px, 100% 100%;`;
    } else {
      css += `\n  background-size: auto, 100% 100%;`;
    }

    css += `\n  opacity: ${gradientOpacity / 100};`;
    css += `\n  transition: all 0.3s ease-in-out;`;
    css += `\n  background-attachment: fixed;`;
    css += `\n  background-repeat: repeat, no-repeat;`;
    css += `\n  background-position: center, center;`;

    if (isAnimated) {
      const duration = 21 - animationSpeed;
      if (currentGradient.type === 'conic-gradient') {
        css += `\n  animation: gradientSpin ${duration}s linear infinite ${animationDirection};`;
      } else {
        css += `\n  animation: gradientShift ${duration}s ease-in-out infinite ${animationDirection};`;
        // Update background size for animation
        if (selectedPattern === 'dots' || selectedPattern === 'grid') {
          css += `\n  background-size: ${spacing}px ${spacing}px, 400% 400%;`;
        } else if (selectedPattern === 'hexagon' || selectedPattern === 'circles') {
          css += `\n  background-size: ${spacing * 2}px ${spacing * 2}px, 400% 400%;`;
        } else {
          css += `\n  background-size: auto, 400% 400%;`;
        }
      }
    }

    css += `\n}`;

    if (isAnimated) {
      if (currentGradient.type === 'conic-gradient') {
        css += `\n\n@keyframes gradientSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
      } else {
        css += `\n\n@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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
    generateRandom,
    reset,
  };
}