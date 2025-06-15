'use client';

import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface HeroProps {
  backgroundStyle: React.CSSProperties;
  isAnimated: boolean;
  children?: React.ReactNode;
}

export default function Hero({ backgroundStyle, isAnimated, children }: HeroProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Fixed Background Container */}
      <div 
        className={`hero-background pattern-container transition-all duration-500 ${isAnimated ? 'animate-pulse' : ''}`}
        style={{
          ...backgroundStyle,
          // Ensure proper background rendering
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          // Prevent color bleeding
          isolation: 'isolate',
          // Force proper rendering
          transform: 'translateZ(0)',
          willChange: 'background-image, background-position',
        }}
      />
      
      {/* Subtle Overlay for better text readability - reduced opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 z-2" />
      
      {/* Content - Just the subheader now, positioned closer to controls with more space from toggle */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mb-3 mt-20">
        <p className="text-xl md:text-2xl mb-4 leading-relaxed max-w-2xl mx-auto text-white font-extrabold drop-shadow-lg" style={{ fontFamily: 'sans-serif' }}>
          Create, preview, and export customizable<br />
          CSS backgrounds in seconds.
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
          onClick={() => window.open('https://github.com/prasanjitn', '_blank')}
        >
          <Heart className="mr-2 h-5 w-5" />
          Support the Work
        </Button>
      </div>
      
      {/* Floating Elements - reduced opacity to prevent color conflicts */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-bounce z-1" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse z-1" />
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-ping z-1" />
    </div>
  );
}