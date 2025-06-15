'use client';

import { useMemo } from 'react';

export function useDynamicStyles(backgroundStyle: React.CSSProperties = {}) {
  const buttonStyles = useMemo(() => {
    // Extract background colors from the style
    const bgColor = backgroundStyle.backgroundColor || '#ffffff';
    const bgImage = backgroundStyle.backgroundImage;
    
    // Simple brightness detection based on background color
    const getBrightness = (color: string): number => {
      // Handle hex colors
      if (color.startsWith('#')) {
        const hex = color.slice(1);
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return (r * 299 + g * 587 + b * 114) / 1000;
      }
      
      // Handle rgb colors
      if (color.startsWith('rgb')) {
        const matches = color.match(/\d+/g);
        if (matches && matches.length >= 3) {
          const r = parseInt(matches[0]);
          const g = parseInt(matches[1]);
          const b = parseInt(matches[2]);
          return (r * 299 + g * 587 + b * 114) / 1000;
        }
      }
      
      // Default to medium brightness for unknown formats
      return 128;
    };
    
    const brightness = getBrightness(bgColor);
    
    // If we have a gradient or pattern, assume it's more complex and use white text
    const hasComplexBackground = bgImage && (
      bgImage.includes('gradient') || 
      bgImage.includes('repeating') ||
      bgImage.includes('radial') ||
      bgImage.includes('conic')
    );
    
    // Determine text color based on background brightness
    // Use black text on bright backgrounds, white text on dark backgrounds
    const textColor = hasComplexBackground ? '#ffffff' : (brightness > 128 ? '#000000' : '#ffffff');
    
    return {
      color: textColor,
      brightness,
      hasComplexBackground
    };
  }, [backgroundStyle]);
  
  return { buttonStyles };
}