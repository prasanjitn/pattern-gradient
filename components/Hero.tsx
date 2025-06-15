'use client';

import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface HeroProps {
  backgroundStyle: React.CSSProperties;
  isAnimated: boolean;
  children?: React.ReactNode;
}

export default function Hero({ backgroundStyle, isAnimated, children }: HeroProps) {
  // Calculate text color based on background for high contrast
  const getTextColor = () => {
    // For patterns and gradients, we'll use a smart contrast approach
    // Since backgrounds can be complex, we'll use white text with shadow for better readability
    return 'text-black drop-shadow-lg';
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${isAnimated ? 'animate-pulse' : ''}`}
        style={backgroundStyle}
      />
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      
      {/* Content - Just the subheader now */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mb-6">
        <p className={`text-2xl md:text-3xl mb-8 leading-relaxed max-w-2xl mx-auto ${getTextColor()}`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Create, preview, and export customizable CSS backgrounds in seconds.
        </p>
      </div>

      {/* Controls Panel */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 mb-6">
        {children}
      </div>
      
      {/* Support Button */}
      <div className="relative z-10 flex justify-center">
        <Button 
          size="lg" 
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all duration-300 hover:scale-105"
        >
          <Heart className="mr-2 h-5 w-5" />
          Support the Work
        </Button>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-ping" />
    </div>
  );
}