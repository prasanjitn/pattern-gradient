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

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-30">
      <div 
        className="flex rounded-full p-1 shadow-2xl backdrop-blur-lg transition-all duration-300"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: buttonStyles.borderColor,
          boxShadow: `0 8px 32px ${buttonStyles.shadowColor}`,
        }}
      >
        <Button
          onClick={() => onModeChange('pattern')}
          variant={mode === 'pattern' ? 'default' : 'ghost'}
          size="sm"
          className="rounded-full px-3 py-2 transition-all duration-300 font-medium"
          style={mode === 'pattern' ? {
            backgroundColor: buttonStyles.color === '#000000' ? '#ffffff' : '#000000',
            color: buttonStyles.color === '#000000' ? '#000000' : '#ffffff',
            boxShadow: `0 4px 16px ${buttonStyles.shadowColor}`,
          } : {
            color: buttonStyles.color,
            backgroundColor: 'transparent',
          }}
          onMouseEnter={(e) => {
            if (mode !== 'pattern') {
              e.currentTarget.style.backgroundColor = buttonStyles.hoverBg;
            }
          }}
          onMouseLeave={(e) => {
            if (mode !== 'pattern') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <Grid3X3 className="h-4 w-4 mr-1" />
          Patterns
        </Button>
        <Button
          onClick={() => onModeChange('gradient')}
          variant={mode === 'gradient' ? 'default' : 'ghost'}
          size="sm"
          className="rounded-full px-3 py-2 transition-all duration-300 font-medium"
          style={mode === 'gradient' ? {
            backgroundColor: buttonStyles.color === '#000000' ? '#ffffff' : '#000000',
            color: buttonStyles.color === '#000000' ? '#000000' : '#ffffff',
            boxShadow: `0 4px 16px ${buttonStyles.shadowColor}`,
          } : {
            color: buttonStyles.color,
            backgroundColor: 'transparent',
          }}
          onMouseEnter={(e) => {
            if (mode !== 'gradient') {
              e.currentTarget.style.backgroundColor = buttonStyles.hoverBg;
            }
          }}
          onMouseLeave={(e) => {
            if (mode !== 'gradient') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <Palette className="h-4 w-4 mr-1" />
          Gradients
        </Button>
        <Button
          onClick={() => onModeChange('hybrid')}
          variant={mode === 'hybrid' ? 'default' : 'ghost'}
          size="sm"
          className="rounded-full px-3 py-2 transition-all duration-300 font-medium"
          style={mode === 'hybrid' ? {
            backgroundColor: buttonStyles.color === '#000000' ? '#ffffff' : '#000000',
            color: buttonStyles.color === '#000000' ? '#000000' : '#ffffff',
            boxShadow: `0 4px 16px ${buttonStyles.shadowColor}`,
          } : {
            color: buttonStyles.color,
            backgroundColor: 'transparent',
          }}
          onMouseEnter={(e) => {
            if (mode !== 'hybrid') {
              e.currentTarget.style.backgroundColor = buttonStyles.hoverBg;
            }
          }}
          onMouseLeave={(e) => {
            if (mode !== 'hybrid') {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <Layers className="h-4 w-4 mr-1" />
          Hybrid
        </Button>
      </div>
    </div>
  );
}