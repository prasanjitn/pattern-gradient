'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, ChevronUp, Palette, Sparkles, Zap, Navigation, RotateCcw, Copy, Check, Shuffle } from 'lucide-react';

interface Pattern {
  id: string;
  name: string;
  type: string;
  description: string;
  basePattern: string;
}

interface ControlsPanelProps {
  patterns: Pattern[];
  selectedPattern: string;
  foregroundColor: string;
  backgroundColor: string;
  opacity: number;
  spacing: number;
  isAnimated: boolean;
  animationSpeed: number;
  animationDirection: string;
  cssCode: string;
  onPatternChange: (patternId: string) => void;
  onForegroundColorChange: (color: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onOpacityChange: (opacity: number) => void;
  onSpacingChange: (spacing: number) => void;
  onAnimationToggle: (isAnimated: boolean) => void;
  onAnimationSpeedChange: (speed: number) => void;
  onAnimationDirectionChange: (direction: string) => void;
  onReset: () => void;
  onGenerateRandom: () => void;
}

export default function ControlsPanel({
  patterns,
  selectedPattern,
  foregroundColor,
  backgroundColor,
  opacity,
  spacing,
  isAnimated,
  animationSpeed,
  animationDirection,
  cssCode,
  onPatternChange,
  onForegroundColorChange,
  onBackgroundColorChange,
  onOpacityChange,
  onSpacingChange,
  onAnimationToggle,
  onAnimationSpeedChange,
  onAnimationDirectionChange,
  onReset,
  onGenerateRandom,
}: ControlsPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

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
    <Card className="w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl z-20 rounded-2xl">
      <CardHeader className="pb-3 bg-white/10 backdrop-blur-lg z-10 border-b border-white/10 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-black font-semibold">
            Pattern Controls
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={copyToClipboard}
              variant="ghost"
              size="sm"
              className="h-8 px-3 hover:bg-white/20 text-black"
              title="Copy CSS"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1 text-black" />
                  Copy CSS
                </>
              )}
            </Button>
            <Button
              onClick={onGenerateRandom}
              variant="ghost"
              size="sm"
              className="h-8 px-3 hover:bg-white/20 text-black"
              title="Generate random pattern"
            >
              <Shuffle className="h-4 w-4 mr-1 text-black" />
              Random
            </Button>
            <Button
              onClick={onReset}
              variant="ghost"
              size="sm"
              className="h-8 px-2 hover:bg-white/20 text-black"
              title="Reset to defaults"
            >
              <RotateCcw className="h-4 w-4 text-black" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0 hover:bg-white/20 text-black"
            >
              {isCollapsed ? <ChevronDown className="h-4 w-4 text-black" /> : <ChevronUp className="h-4 w-4 text-black" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 min-h-[320px]">
          {/* Pattern Selection */}
          <div className="space-y-4 flex flex-col">
            <Label className="text-sm font-semibold flex items-center gap-2 text-black">
              <Sparkles className="h-4 w-4 text-black" />
              Pattern Type
            </Label>
            <Select value={selectedPattern} onValueChange={onPatternChange}>
              <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-black">
                <SelectValue placeholder="Select a pattern" />
              </SelectTrigger>
              <SelectContent>
                {patterns.map((pattern) => (
                  <SelectItem key={pattern.id} value={pattern.id}>
                    <div>
                      <div className="font-medium">{pattern.name}</div>
                      <div className="text-xs text-gray-500">{pattern.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Spacing Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-black">Spacing</Label>
                <span className="text-sm text-gray-700">{spacing}px</span>
              </div>
              <Slider
                value={[spacing]}
                onValueChange={(value) => onSpacingChange(value[0])}
                min={5}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {/* Opacity Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-black">Opacity</Label>
                <span className="text-sm text-gray-700">{opacity}%</span>
              </div>
              <Slider
                value={[opacity]}
                onValueChange={(value) => onOpacityChange(value[0])}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Color Controls */}
          <div className="space-y-4 flex flex-col">
            <Label className="text-sm font-semibold flex items-center gap-2 text-black">
              <Palette className="h-4 w-4 text-black" />
              Colors
            </Label>
            
            <div className="space-y-3 flex-1">
              <div className="space-y-2">
                <Label className="text-xs text-gray-700">Foreground</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => onForegroundColorChange(e.target.value)}
                    className="w-10 h-8 rounded-md border-2 border-white/20 cursor-pointer flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={foregroundColor}
                    onChange={(e) => onForegroundColorChange(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-white/20 rounded-md bg-white/10 backdrop-blur-sm text-black min-w-0"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs text-gray-700">Background</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => onBackgroundColorChange(e.target.value)}
                    className="w-10 h-8 rounded-md border-2 border-white/20 cursor-pointer flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => onBackgroundColorChange(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-white/20 rounded-md bg-white/10 backdrop-blur-sm text-black min-w-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Animation Controls - Fixed Height */}
          <div className="space-y-4 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-semibold text-black">Animated Pattern</Label>
                <p className="text-xs text-gray-700">Add flowing animation</p>
              </div>
              <Switch
                checked={isAnimated}
                onCheckedChange={onAnimationToggle}
              />
            </div>

            {/* Animation Controls Container - Always takes same space */}
            <div className="flex-1 min-h-[180px]">
              {isAnimated ? (
                <div className="space-y-4 pt-2 border-t border-white/10">
                  {/* Animation Speed */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold flex items-center gap-2 text-black">
                        <Zap className="h-4 w-4 text-black" />
                        Speed
                      </Label>
                      <span className="text-sm text-gray-700">{animationSpeed}/20</span>
                    </div>
                    <Slider
                      value={[animationSpeed]}
                      onValueChange={(value) => onAnimationSpeedChange(value[0])}
                      min={1}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Animation Direction */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-2 text-black">
                      <Navigation className="h-4 w-4 text-black" />
                      Direction
                    </Label>
                    <Select value={animationDirection} onValueChange={onAnimationDirectionChange}>
                      <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="reverse">Reverse</SelectItem>
                        <SelectItem value="alternate">Alternate</SelectItem>
                        <SelectItem value="alternate-reverse">Alternate Reverse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="pt-2 border-t border-white/10 opacity-50">
                  <p className="text-sm text-gray-600">Enable animation to access speed and direction controls</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}