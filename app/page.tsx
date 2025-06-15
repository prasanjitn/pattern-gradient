'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import ControlsPanel from '@/components/ControlsPanel';
import GradientControlsPanel from '@/components/GradientControlsPanel';
import HybridControlsPanel from '@/components/HybridControlsPanel';
import ModeToggle from '@/components/ModeToggle';
import { usePatternGenerator } from '@/hooks/usePatternGenerator';
import { useGradientGenerator } from '@/hooks/useGradientGenerator';
import { useHybridGenerator } from '@/hooks/useHybridGenerator';

export default function Home() {
  const [mode, setMode] = useState<'pattern' | 'gradient' | 'hybrid'>('pattern'); // Changed default to pattern

  const patternHook = usePatternGenerator();
  const gradientHook = useGradientGenerator();
  const hybridHook = useHybridGenerator();

  // Initialize theme on mount
  useEffect(() => {
    // Add animation keyframes to document
    const style = document.createElement('style');
    style.textContent = `
      @keyframes patternMove {
        0% { background-position: 0 0; }
        100% { background-position: var(--pattern-move-x, 50px) var(--pattern-move-y, 50px); }
      }
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes gradientSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes hybridMove {
        0% { background-position: 0 0, 0% 50%; }
        50% { background-position: 50px 50px, 100% 50%; }
        100% { background-position: 0 0, 0% 50%; }
      }
      @keyframes hybridMoveConic {
        0% { 
          background-position: 0 0, center;
          transform: rotate(0deg);
        }
        100% { 
          background-position: 50px 50px, center;
          transform: rotate(360deg);
        }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const getCurrentBackgroundStyle = () => {
    switch (mode) {
      case 'pattern':
        return patternHook.backgroundStyle;
      case 'gradient':
        return gradientHook.backgroundStyle;
      case 'hybrid':
        return hybridHook.backgroundStyle;
      default:
        return { backgroundColor: '#ffffff' }; // Default white background
    }
  };

  const getCurrentIsAnimated = () => {
    switch (mode) {
      case 'pattern':
        return patternHook.isAnimated;
      case 'gradient':
        return gradientHook.isAnimated;
      case 'hybrid':
        return hybridHook.isAnimated;
      default:
        return false;
    }
  };

  const getCurrentCssCode = () => {
    switch (mode) {
      case 'pattern':
        return patternHook.cssCode;
      case 'gradient':
        return gradientHook.cssCode;
      case 'hybrid':
        return hybridHook.cssCode;
      default:
        return '';
    }
  };

  const currentBackgroundStyle = getCurrentBackgroundStyle();

  return (
    <main className="min-h-screen bg-white">
      <ModeToggle mode={mode} onModeChange={setMode} backgroundStyle={currentBackgroundStyle} />
      
      <Hero 
        backgroundStyle={currentBackgroundStyle}
        isAnimated={getCurrentIsAnimated()}
      >
        {mode === 'pattern' && (
          <ControlsPanel
            patterns={patternHook.patterns}
            selectedPattern={patternHook.selectedPattern}
            foregroundColor={patternHook.foregroundColor}
            backgroundColor={patternHook.backgroundColor}
            opacity={patternHook.opacity}
            spacing={patternHook.spacing}
            isAnimated={patternHook.isAnimated}
            animationSpeed={patternHook.animationSpeed}
            animationAngle={patternHook.animationAngle}
            cssCode={patternHook.cssCode}
            onPatternChange={patternHook.setSelectedPattern}
            onForegroundColorChange={patternHook.setForegroundColor}
            onBackgroundColorChange={patternHook.setBackgroundColor}
            onOpacityChange={patternHook.setOpacity}
            onSpacingChange={patternHook.setSpacing}
            onAnimationToggle={patternHook.setIsAnimated}
            onAnimationSpeedChange={patternHook.setAnimationSpeed}
            onAnimationAngleChange={patternHook.setAnimationAngle}
            onReset={patternHook.reset}
            onGenerateRandom={patternHook.generateRandom}
          />
        )}

        {mode === 'gradient' && (
          <GradientControlsPanel
            gradients={gradientHook.gradients}
            selectedGradient={gradientHook.selectedGradient}
            color1={gradientHook.color1}
            color2={gradientHook.color2}
            color3={gradientHook.color3}
            color4={gradientHook.color4}
            opacity={gradientHook.opacity}
            angle={gradientHook.angle}
            isAnimated={gradientHook.isAnimated}
            animationSpeed={gradientHook.animationSpeed}
            animationDirection={gradientHook.animationDirection}
            cssCode={gradientHook.cssCode}
            onGradientChange={gradientHook.setSelectedGradient}
            onColor1Change={gradientHook.setColor1}
            onColor2Change={gradientHook.setColor2}
            onColor3Change={gradientHook.setColor3}
            onColor4Change={gradientHook.setColor4}
            onOpacityChange={gradientHook.setOpacity}
            onAngleChange={gradientHook.setAngle}
            onAnimationToggle={gradientHook.setIsAnimated}
            onAnimationSpeedChange={gradientHook.setAnimationSpeed}
            onAnimationDirectionChange={gradientHook.setAnimationDirection}
            onReset={gradientHook.reset}
            onGenerateRandom={gradientHook.generateRandom}
          />
        )}

        {mode === 'hybrid' && (
          <HybridControlsPanel
            patterns={hybridHook.patterns}
            gradients={hybridHook.gradients}
            selectedPattern={hybridHook.selectedPattern}
            selectedGradient={hybridHook.selectedGradient}
            patternColor={hybridHook.patternColor}
            gradientColor1={hybridHook.gradientColor1}
            gradientColor2={hybridHook.gradientColor2}
            gradientColor3={hybridHook.gradientColor3}
            gradientColor4={hybridHook.gradientColor4}
            patternOpacity={hybridHook.patternOpacity}
            gradientOpacity={hybridHook.gradientOpacity}
            spacing={hybridHook.spacing}
            gradientAngle={hybridHook.gradientAngle}
            isAnimated={hybridHook.isAnimated}
            animationSpeed={hybridHook.animationSpeed}
            animationDirection={hybridHook.animationDirection}
            cssCode={hybridHook.cssCode}
            onPatternChange={hybridHook.setSelectedPattern}
            onGradientChange={hybridHook.setSelectedGradient}
            onPatternColorChange={hybridHook.setPatternColor}
            onGradientColor1Change={hybridHook.setGradientColor1}
            onGradientColor2Change={hybridHook.setGradientColor2}
            onGradientColor3Change={hybridHook.setGradientColor3}
            onGradientColor4Change={hybridHook.setGradientColor4}
            onPatternOpacityChange={hybridHook.setPatternOpacity}
            onGradientOpacityChange={hybridHook.setGradientOpacity}
            onSpacingChange={hybridHook.setSpacing}
            onGradientAngleChange={hybridHook.setGradientAngle}
            onAnimationToggle={hybridHook.setIsAnimated}
            onAnimationSpeedChange={hybridHook.setAnimationSpeed}
            onAnimationDirectionChange={hybridHook.setAnimationDirection}
            onReset={hybridHook.reset}
            onGenerateRandom={hybridHook.generateRandom}
          />
        )}
      </Hero>
    </main>
  );
}