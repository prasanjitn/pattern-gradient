'use client';

import { useState, useEffect, useMemo } from 'react';

interface Gradient {
  id: string;
  name: string;
  type: string;
  description: string;
  basePattern: string;
}

export function useGradientGenerator() {
  const [gradients, setGradients] = useState<Gradient[]>([]);
  const [selectedGradient, setSelectedGradient] = useState('conic-center');
  const [color1, setColor1] = useState('#ee7cd9');
  const [color2, setColor2] = useState('#8ad1f5');
  const [color3, setColor3] = useState('#e0f9ff');
  const [color4, setColor4] = useState('#4d4e5c');
  const [opacity, setOpacity] = useState(100);
  const [angle, setAngle] = useState(45);
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [animationDirection, setAnimationDirection] = useState('normal');

  // Load gradients from JSON
  useEffect(() => {
    fetch('/data/gradients.json')
      .then(response => response.json())
      .then(data => {
        setGradients(data.gradients);
      })
      .catch(error => {
        console.error('Error loading gradients:', error);
        // Fallback gradients in case of error
        setGradients([
          {
            id: 'conic-center',
            name: 'Conic Center',
            type: 'conic-gradient',
            description: 'Conic gradient from center',
            basePattern: 'conic-gradient(from 0deg at center, {color1}, {color2}, {color3}, {color4}, {color1})'
          }
        ]);
      });
  }, []);

  // Reset function
  const reset = () => {
    setSelectedGradient('conic-center');
    setColor1('#ee7cd9');
    setColor2('#8ad1f5');
    setColor3('#e0f9ff');
    setColor4('#4d4e5c');
    setOpacity(100);
    setAngle(45);
    setIsAnimated(false);
    setAnimationSpeed(5);
    setAnimationDirection('normal');
  };

  // Generate background style
  const backgroundStyle = useMemo(() => {
    const currentGradient = gradients.find(g => g.id === selectedGradient);
    if (!currentGradient) return { backgroundColor: '#ffffff' };

    let pattern = currentGradient.basePattern
      .replace(/{color1}/g, color1)
      .replace(/{color2}/g, color2)
      .replace(/{color3}/g, color3)
      .replace(/{color4}/g, color4);

    // Replace angle for linear gradients
    if (currentGradient.type === 'linear-gradient' && pattern.includes('deg')) {
      pattern = pattern.replace(/\d+deg/, `${angle}deg`);
    }

    const style: React.CSSProperties = {
      backgroundColor: '#ffffff', // Always white background
      backgroundImage: pattern,
      opacity: opacity / 100,
      transition: 'all 0.3s ease-in-out',
      // Improved rendering properties
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '100% 100%',
      // Prevent rendering artifacts
      isolation: 'isolate',
      transform: 'translateZ(0)',
      willChange: 'background-image, background-position, transform',
      // Ensure proper color rendering
      imageRendering: 'crisp-edges', // Use standard property only
    };

    // Add animation if enabled - make it continuous
    if (isAnimated) {
      const duration = 21 - animationSpeed; // Convert speed (1-20) to duration (20s-1s)
      if (currentGradient.type === 'conic-gradient') {
        style.animation = `gradientSpin ${duration}s linear infinite ${animationDirection}`;
      } else {
        style.animation = `gradientShift ${duration}s ease-in-out infinite ${animationDirection}`;
        style.backgroundSize = '400% 400%'; // Larger size for smoother animation
      }
    }

    return style;
  }, [gradients, selectedGradient, color1, color2, color3, color4, opacity, angle, isAnimated, animationSpeed, animationDirection]);

  // Generate CSS code
  const cssCode = useMemo(() => {
    const currentGradient = gradients.find(g => g.id === selectedGradient);
    if (!currentGradient) return '';

    let pattern = currentGradient.basePattern
      .replace(/{color1}/g, color1)
      .replace(/{color2}/g, color2)
      .replace(/{color3}/g, color3)
      .replace(/{color4}/g, color4);

    // Replace angle for linear gradients
    if (currentGradient.type === 'linear-gradient' && pattern.includes('deg')) {
      pattern = pattern.replace(/\d+deg/, `${angle}deg`);
    }

    let css = `.gradient-background {
  background-color: #ffffff;
  background-image: ${pattern};`;

    css += `\n  opacity: ${opacity / 100};`;
    css += `\n  transition: all 0.3s ease-in-out;`;

    if (isAnimated) {
      const duration = 21 - animationSpeed;
      if (currentGradient.type === 'conic-gradient') {
        css += `\n  animation: gradientSpin ${duration}s linear infinite ${animationDirection};`;
      } else {
        css += `\n  background-size: 400% 400%;`;
        css += `\n  animation: gradientShift ${duration}s ease-in-out infinite ${animationDirection};`;
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
  }, [gradients, selectedGradient, color1, color2, color3, color4, opacity, angle, isAnimated, animationSpeed, animationDirection]);

  return {
    gradients,
    selectedGradient,
    color1,
    color2,
    color3,
    color4,
    opacity,
    angle,
    isAnimated,
    animationSpeed,
    animationDirection,
    backgroundStyle,
    cssCode,
    setSelectedGradient,
    setColor1,
    setColor2,
    setColor3,
    setColor4,
    setOpacity,
    setAngle,
    setIsAnimated,
    setAnimationSpeed,
    setAnimationDirection,
    reset,
  };
}