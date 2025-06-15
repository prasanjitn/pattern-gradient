'use client';

import { useMemo } from 'react';
import { extractDominantColor, getDynamicButtonStyles } from '@/lib/colorUtils';

export function useDynamicStyles(backgroundStyle: React.CSSProperties) {
  return useMemo(() => {
    const dominantColor = extractDominantColor(backgroundStyle);
    const buttonStyles = getDynamicButtonStyles(dominantColor);
    
    return {
      dominantColor,
      buttonStyles,
      // CSS custom properties for dynamic styling
      cssVariables: {
        '--dynamic-text-color': buttonStyles.color,
        '--dynamic-border-color': buttonStyles.borderColor,
        '--dynamic-hover-bg': buttonStyles.hoverBg,
        '--dynamic-shadow-color': buttonStyles.shadowColor,
      } as React.CSSProperties
    };
  }, [backgroundStyle]);
}