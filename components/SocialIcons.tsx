'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, User } from 'lucide-react';
import { useDynamicStyles } from '@/hooks/useDynamicStyles';

interface SocialIconsProps {
  backgroundStyle?: React.CSSProperties;
}

export default function SocialIcons({ backgroundStyle = {} }: SocialIconsProps) {
  const { buttonStyles } = useDynamicStyles(backgroundStyle);
  
  // Determine if background is bright to adjust glassmorphism
  const isDarkGlass = buttonStyles.color === '#000000'; // If text should be black, background is bright

  const buttonClassName = `h-10 w-10 p-0 backdrop-blur-sm border border-white/20 transition-all duration-300 rounded-full hover:${isDarkGlass ? 'bg-black/20' : 'bg-white/20'}`;
  const buttonStyle = {
    backgroundColor: isDarkGlass ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)',
    borderColor: isDarkGlass ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
    color: buttonStyles.color,
  };

  return (
    <div className="fixed top-6 right-6 z-30 flex items-center gap-2">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={buttonClassName}
        style={buttonStyle}
      >
        <a
          href="https://github.com/prasanjitn/"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
      </Button>
      
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={buttonClassName}
        style={buttonStyle}
      >
        <a
          href="https://www.linkedin.com/in/prasanjitnayak/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </Button>
      
      <Button
        asChild
        variant="ghost"
        size="sm"
        className={buttonClassName}
        style={buttonStyle}
      >
        <a
          href="https://prasanjitn.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          title="Portfolio"
        >
          <User className="h-5 w-5" />
        </a>
      </Button>
    </div>
  );
}