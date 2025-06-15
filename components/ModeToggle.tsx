'use client';

import { Button } from '@/components/ui/button';
import { Palette, Grid3X3, Layers } from 'lucide-react';

interface ModeToggleProps {
  mode: 'pattern' | 'gradient' | 'hybrid';
  onModeChange: (mode: 'pattern' | 'gradient' | 'hybrid') => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-30">
      <div className="flex bg-white/10 backdrop-blur-lg border border-white/20 rounded-full p-1 shadow-2xl">
        <Button
          onClick={() => onModeChange('pattern')}
          variant={mode === 'pattern' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-full px-3 py-2 transition-all duration-300 ${
            mode === 'pattern'
              ? 'bg-white text-gray-900 shadow-lg'
              : 'text-white hover:bg-white/20'
          }`}
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
              : 'text-white hover:bg-white/20'
          }`}
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
              : 'text-white hover:bg-white/20'
          }`}
        >
          <Layers className="h-4 w-4 mr-1" />
          Hybrid
        </Button>
      </div>
    </div>
  );
}