'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, User } from 'lucide-react';
import { useDynamicStyles } from '@/hooks/useDynamicStyles';

interface SocialIconsProps {
  backgroundStyle?: React.CSSProperties;
}

export default function SocialIcons({ backgroundStyle = {} }: SocialIconsProps) {
  const { buttonStyles } = useDynamicStyles(backgroundStyle);

  const buttonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(8px)',
    color: buttonStyles.color,
    borderWidth: '2px',
    borderStyle: 'solid' as const,
    borderColor: buttonStyles.borderColor,
    boxShadow: `0 4px 16px ${buttonStyles.shadowColor}`,
  };

  return (
    <div className="fixed top-6 right-6 z-30 flex items-center gap-2">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="h-10 w-10 p-0 transition-all duration-300 rounded-full"
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = buttonStyles.hoverBg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        <a
          href="https://github.com/prasanjitn/"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <Github className="h-5 w-5" style={{ color: buttonStyles.color }} />
        </a>
      </Button>
      
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="h-10 w-10 p-0 transition-all duration-300 rounded-full"
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = buttonStyles.hoverBg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        <a
          href="https://www.linkedin.com/in/prasanjitnayak/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <Linkedin className="h-5 w-5" style={{ color: buttonStyles.color }} />
        </a>
      </Button>
      
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="h-10 w-10 p-0 transition-all duration-300 rounded-full"
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = buttonStyles.hoverBg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        <a
          href="https://prasanjitn.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          title="Portfolio"
        >
          <User className="h-5 w-5" style={{ color: buttonStyles.color }} />
        </a>
      </Button>
    </div>
  );
}