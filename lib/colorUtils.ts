// Utility functions for color analysis and dynamic styling

/**
 * Convert hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate luminance of a color (0-1, where 1 is brightest)
 */
export function getLuminance(r: number, g: number, b: number): number {
  // Convert RGB to linear RGB
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  // Calculate luminance using the standard formula
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Determine if a color is bright (luminance > 0.5)
 */
export function isBrightColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  
  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
  return luminance > 0.5;
}

/**
 * Get contrasting color (black or white) based on background
 */
export function getContrastColor(backgroundColor: string): string {
  return isBrightColor(backgroundColor) ? '#000000' : '#ffffff';
}

/**
 * Get dynamic button styles based on background color
 */
export function getDynamicButtonStyles(backgroundColor: string) {
  const isBright = isBrightColor(backgroundColor);
  
  return {
    color: isBright ? '#000000' : '#ffffff',
    borderColor: isBright ? '#000000' : '#ffffff',
    hoverBg: isBright ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    shadowColor: isBright ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'
  };
}

/**
 * Extract dominant color from a CSS background string
 */
export function extractDominantColor(backgroundStyle: React.CSSProperties): string {
  // Try to extract from backgroundColor first
  if (backgroundStyle.backgroundColor) {
    return backgroundStyle.backgroundColor as string;
  }
  
  // Try to extract from backgroundImage (gradients/patterns)
  if (backgroundStyle.backgroundImage) {
    const bgImage = backgroundStyle.backgroundImage as string;
    
    // Extract first color from gradient
    const colorMatch = bgImage.match(/#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|rgb\([^)]+\)|rgba\([^)]+\)/);
    if (colorMatch) {
      let color = colorMatch[0];
      
      // Convert rgb/rgba to hex if needed
      if (color.startsWith('rgb')) {
        const rgbMatch = color.match(/\d+/g);
        if (rgbMatch && rgbMatch.length >= 3) {
          const r = parseInt(rgbMatch[0]);
          const g = parseInt(rgbMatch[1]);
          const b = parseInt(rgbMatch[2]);
          color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        }
      }
      
      return color;
    }
  }
  
  // Default to white if no color found
  return '#ffffff';
}