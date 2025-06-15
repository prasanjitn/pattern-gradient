'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, Code2, ChevronDown, ChevronUp } from 'lucide-react';

interface CssOutputProps {
  cssCode: string;
}

export default function CssOutput({ cssCode }: CssOutputProps) {
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Card className="fixed bottom-6 left-6 right-6 md:left-6 md:right-auto md:w-96 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl z-20">
      <CardHeader className="pb-3 border-b border-white/10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg text-white">
            <Code2 className="h-5 w-5 text-blue-400" />
            Generated CSS
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={copyToClipboard}
              size="sm"
              variant="ghost"
              className="h-8 px-3 hover:bg-white/20 text-white"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1 text-green-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0 hover:bg-white/20 text-white"
            >
              {isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent>
          <div className="relative">
            <pre className="bg-black/20 backdrop-blur-sm p-4 rounded-lg text-sm font-mono overflow-x-auto max-h-60 overflow-y-auto border border-white/10">
              <code className="text-gray-200 whitespace-pre-wrap">
                {cssCode}
              </code>
            </pre>
          </div>
          
          <div className="mt-4 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <p className="text-sm text-gray-200">
              <strong className="text-white">Usage:</strong> Copy this CSS and add it to your stylesheet. 
              Apply the background styles to any element you want to display the pattern.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}