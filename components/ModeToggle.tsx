'use client';

import { Button } from '@/components/ui/button';
import { Palette, Grid3X3, Layers } from 'lucide-react';
import { useDynamicStyles } from '@/hooks/useDynamicStyles';

interface ModeToggleProps {
  mode: 'pattern' | 'gradient' | 'hybrid';
  onModeChange: (mode: 'pattern' | 'gradient' | 'hybrid') => void;
  backgroundStyle?: React.CSSProperties;
}

export default function ModeToggle({ mode, onModeChange, backgroundStyle = {} }: ModeToggleProps) {
  const { buttonStyles } = useDynamicStyles(backgroundStyle);
  
  // Determine if background is bright to adjust glassmorphism
  const isDarkGlass = buttonStyles.color === '#000000'; // If text should be black, background is bright

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-30">
      <div 
        className="flex rounded-full p-1 shadow-2xl backdrop-blur-lg border border-white/20"
        style={{
          backgroundColor: isDarkGlass ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)',
          borderColor: isDarkGlass ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Button
          onClick={() => onModeChange('pattern')}
          variant={mode === 'pattern' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-full px-3 py-2 transition-all duration-300 ${
            mode === 'pattern'
              ? 'bg-white text-gray-900 shadow-lg'
              : `hover:${isDarkGlass ? 'bg-black/20' : 'bg-white/20'}`
          }`}
          style={mode !== 'pattern' ? { color: buttonStyles.color } : {}}
        >
          <Grid3X3 className="h-4 w-4 mr-1" />
          Patterns
        </Button>
        <Button
          onClick={() => onModeChange('gradient')}
          variant={mode === 'gradient' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-full px-3 py-2 transition-all duration-300 ${
            mode === 'gradient'
              ? 'bg-white text-gray-900 shadow-lg'
              : `hover:${isDarkGlass ? 'bg-black/20' : 'bg-white/20'}`
          }`}
          style={mode !== 'gradient' ? { color: buttonStyles.color } : {}}
        >
          <Palette className="h-4 w-4 mr-1" />
          Gradients
        </Button>
        <Button
          onClick={() => onModeChange('hybrid')}
          variant={mode === 'hybrid' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-full px-3 py-2 transition-all duration-300 ${
            mode === 'hybrid'
              ? 'bg-white text-gray-900 shadow-lg'
              : `hover:${isDarkGlass ? 'bg-black/20' : 'bg-white/20'}`
          }`}
          style={mode !== 'hybrid' ? { color: buttonStyles.color } : {}}
        >
          <Layers className="h-4 w-4 mr-1" />
          Hybrid
        </Button>
      </div>
    </div>
  );
}