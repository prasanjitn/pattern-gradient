'use client';

import { Button } from '@/components/ui/button';
import { Github, Linkedin, User } from 'lucide-react';

export default function SocialIcons() {
  return (
    <div className="fixed top-6 right-6 z-30 flex items-center gap-2">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="h-10 w-10 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all duration-300 rounded-full"
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
        className="h-10 w-10 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all duration-300 rounded-full"
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
        className="h-10 w-10 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all duration-300 rounded-full"
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