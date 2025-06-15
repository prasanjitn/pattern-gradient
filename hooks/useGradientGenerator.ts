'use client';

import { useState, useEffect, useMemo } from 'react';

interface Gradient {
  id: string;
  name: string;
  type: string;
  description: string;
  basePattern: string;
}

// Fallback gradients in case JSON loading fails
const FALLBACK_GRADIENTS: Gradient[] = [
  {
    id: 'linear-horizontal',
    name: 'Linear Horizontal',
    type: 'linear-gradient',
    description: 'Left to right gradient',
    basePattern: 'linear-gradient(90deg, {color1}, {color2}, {color3}, {color4})'
  },
  {
    id: 'linear-vertical',
    name: 'Linear Vertical',
    type: 'linear-gradient',
    description: 'Top to bottom gradient',
    basePattern: 'linear-gradient(180deg, {color1}, {color2}, {color3}, {color4})'
  },
  {
    id: 'linear-diagonal',
    name: 'Linear Diagonal',
    type: 'linear-gradient',
    description: 'Diagonal gradient',
    basePattern: 'linear-gradient(45deg, {color1}, {color2}, {color3}, {color4})'
  },
  {
    id: 'radial-center',
    name: 'Radial Center',
    type: 'radial-gradient',
    description: 'Radial from center',
    basePattern: 'radial-gradient(circle at center, {color1}, {color2}, {color3}, {color4})'
  },
  {
    id: 'conic-center',
    name: 'Conic Center',
    type: 'conic-gradient',
    description: 'Conic gradient from center',
    basePattern: 'conic-gradient(from 0deg at center, {color1}, {color2}, {color3}, {color4}, {color1})'
  }
];

export function useGradientGenerator() {
  const [gradients, setGradients] = useState<Gradient[]>(FALLBACK_GRADIENTS);
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

  // Load gradients from JSON with better error handling
  useEffect(() => {
    const loadGradients = async () => {
      try {
        const response = await fetch('/data/gradients.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.gradients && Array.isArray(data.gradients) && data.gradients.length > 0) {
          setGradients(data.gradients);
          console.log('Loaded gradients:', data.gradients.length);
        } else {
          console.warn('Invalid gradients data, using fallback');
          setGradients(FALLBACK_GRADIENTS);
        }
      } catch (error) {
        console.error('Error loading gradients:', error);
        console.log('Using fallback gradients');
        setGradients(FALLBACK_GRADIENTS);
      }
    };

    loadGradients();
  }, []);

  // Generate random gradient with improved randomization
  const generateRandom = () => {
    if (gradients.length === 0) return;
    
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    
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
    
    setSelectedGradient(randomGradient.id);
    setColor1(allColors[Math.floor(Math.random() * allColors.length)]);
    setColor2(allColors[Math.floor(Math.random() * allColors.length)]);
    setColor3(allColors[Math.floor(Math.random() * allColors.length)]);
    setColor4(allColors[Math.floor(Math.random() * allColors.length)]);
    
    // More balanced opacity range (70-95% instead of 50-100%)
    setOpacity(Math.floor(Math.random() * 26) + 70);
    
    setAngle(Math.floor(Math.random() * 24) * 15); // 0-360 in 15° steps
    
    // 30% chance of animation (less overwhelming)
    setIsAnimated(Math.random() > 0.7);
    
    // More reasonable animation speed range
    setAnimationSpeed(Math.floor(Math.random() * 8) + 6); // 6-14
    
    setAnimationDirection(['normal', 'reverse', 'alternate', 'alternate-reverse'][Math.floor(Math.random() * 4)]);
  };

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

  // Generate background style with improved rendering
  const backgroundStyle = useMemo(() => {
    const currentGradient = gradients.find((g: Gradient) => g.id === selectedGradient);
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
      backgroundColor: '#ffffff',
      backgroundImage: pattern,
      opacity: opacity / 100,
      transition: 'all 0.3s ease-in-out',
      // Improved rendering properties
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: isAnimated && currentGradient.type !== 'conic-gradient' ? '0% 50%' : 'center',
      backgroundSize: '100% 100%',
      // Prevent rendering artifacts
      isolation: 'isolate',
      transform: 'translateZ(0)',
      willChange: 'background-image, background-position, transform',
      // Ensure proper color rendering
      imageRendering: 'crisp-edges', // Use standard property only
    };

    // Add animation if enabled - improved for smoother rendering
    if (isAnimated) {
      const duration = 21 - animationSpeed;
      if (currentGradient.type === 'conic-gradient') {
        style.animation = `gradientSpin ${duration}s linear infinite ${animationDirection}`;
      } else {
        style.animation = `gradientShift ${duration}s ease-in-out infinite ${animationDirection}`;
        style.backgroundSize = '400% 400%';
      }
      // Optimize for animation
      style.willChange = 'background-position, transform';
    }

    return style;
  }, [gradients, selectedGradient, color1, color2, color3, color4, opacity, angle, isAnimated, animationSpeed, animationDirection]);

  // Generate CSS code
  const cssCode = useMemo(() => {
    const currentGradient = gradients.find((g: Gradient) => g.id === selectedGradient);
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
    css += `\n  background-attachment: fixed;`;
    css += `\n  background-repeat: no-repeat;`;
    css += `\n  background-position: ${isAnimated && currentGradient.type !== 'conic-gradient' ? '0% 50%' : 'center'};`;
    css += `\n  background-size: 100% 100%;`;

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
    generateRandom,
    reset,
  };
}