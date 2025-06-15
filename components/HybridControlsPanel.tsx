'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, ChevronUp, Palette, Sparkles, Zap, Navigation, RotateCw, RotateCcw, Copy, Check, Shuffle } from 'lucide-react';

interface Pattern {
  id: string;
  name: string;
  type: string;
  description: string;
  basePattern: string;
}

interface Gradient {
  id: string;
  name: string;
  type: string;
  description: string;
  basePattern: string;
}

interface HybridControlsPanelProps {
  patterns: Pattern[];
  gradients: Gradient[];
  selectedPattern: string;
  selectedGradient: string;
  patternColor: string;
  gradientColor1: string;
  gradientColor2: string;
  gradientColor3: string;
  gradientColor4: string;
  patternOpacity: number;
  gradientOpacity: number;
  spacing: number;
  gradientAngle: number;
  isAnimated: boolean;
  animationSpeed: number;
  animationDirection: string;
  cssCode: string;
  onPatternChange: (patternId: string) => void;
  onGradientChange: (gradientId: string) => void;
  onPatternColorChange: (color: string) => void;
  onGradientColor1Change: (color: string) => void;
  onGradientColor2Change: (color: string) => void;
  onGradientColor3Change: (color: string) => void;
  onGradientColor4Change: (color: string) => void;
  onPatternOpacityChange: (opacity: number) => void;
  onGradientOpacityChange: (opacity: number) => void;
  onSpacingChange: (spacing: number) => void;
  onGradientAngleChange: (angle: number) => void;
  onAnimationToggle: (isAnimated: boolean) => void;
  onAnimationSpeedChange: (speed: number) => void;
  onAnimationDirectionChange: (direction: string) => void;
  onReset: () => void;
  onGenerateRandom: () => void;
}

export default function HybridControlsPanel({
  patterns,
  gradients,
  selectedPattern,
  selectedGradient,
  patternColor,
  gradientColor1,
  gradientColor2,
  gradientColor3,
  gradientColor4,
  patternOpacity,
  gradientOpacity,
  spacing,
  gradientAngle,
  isAnimated,
  animationSpeed,
  animationDirection,
  cssCode,
  onPatternChange,
  onGradientChange,
  onPatternColorChange,
  onGradientColor1Change,
  onGradientColor2Change,
  onGradientColor3Change,
  onGradientColor4Change,
  onPatternOpacityChange,
  onGradientOpacityChange,
  onSpacingChange,
  onGradientAngleChange,
  onAnimationToggle,
  onAnimationSpeedChange,
  onAnimationDirectionChange,
  onReset,
  onGenerateRandom,
}: HybridControlsPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentGradient = gradients.find(g => g.id === selectedGradient);
  const showAngleControl = currentGradient?.type === 'linear-gradient';

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
            Hybrid Controls
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
              title="Generate random hybrid"
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
          {/* Pattern Controls */}
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

            {/* Pattern Color */}
            <div className="space-y-2">
              <Label className="text-xs text-gray-700">Pattern Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={patternColor}
                  onChange={(e) => onPatternColorChange(e.target.value)}
                  className="w-10 h-8 rounded-md border-2 border-white/20 cursor-pointer flex-shrink-0"
                />
                <input
                  type="text"
                  value={patternColor}
                  onChange={(e) => onPatternColorChange(e.target.value)}
                  className="flex-1 px-2 py-1 text-xs border border-white/20 rounded-md bg-white/10 backdrop-blur-sm text-black min-w-0"
                />
              </div>
            </div>

            {/* Pattern Spacing */}
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

            {/* Pattern and Gradient Opacity - Side by Side */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-black">Pattern</Label>
                  <span className="text-xs text-gray-700">{patternOpacity}%</span>
                </div>
                <Slider
                  value={[patternOpacity]}
                  onValueChange={(value) => onPatternOpacityChange(value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-black">Gradient</Label>
                  <span className="text-xs text-gray-700">{gradientOpacity}%</span>
                </div>
                <Slider
                  value={[gradientOpacity]}
                  onValueChange={(value) => onGradientOpacityChange(value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Gradient Controls */}
          <div className="space-y-4 flex flex-col">
            <Label className="text-sm font-semibold flex items-center gap-2 text-black">
              <Palette className="h-4 w-4 text-black" />
              Gradient Type
            </Label>
            <Select value={selectedGradient} onValueChange={onGradientChange}>
              <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-black">
                <SelectValue placeholder="Select a gradient" />
              </SelectTrigger>
              <SelectContent>
                {gradients.map((gradient) => (
                  <SelectItem key={gradient.id} value={gradient.id}>
                    <div>
                      <div className="font-medium">{gradient.name}</div>
                      <div className="text-xs text-gray-500">{gradient.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Gradient Colors */}
            <div className="space-y-3 flex-1">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={gradientColor1}
                      onChange={(e) => onGradientColor1Change(e.target.value)}
                      className="w-8 h-6 rounded border border-white/20 cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={gradientColor1}
                      onChange={(e) => onGradientColor1Change(e.target.value)}
                      className="flex-1 px-1 py-1 text-xs border border-white/20 rounded bg-white/10 backdrop-blur-sm text-black min-w-0"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={gradientColor2}
                      onChange={(e) => onGradientColor2Change(e.target.value)}
                      className="w-8 h-6 rounded border border-white/20 cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={gradientColor2}
                      onChange={(e) => onGradientColor2Change(e.target.value)}
                      className="flex-1 px-1 py-1 text-xs border border-white/20 rounded bg-white/10 backdrop-blur-sm text-black min-w-0"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={gradientColor3}
                      onChange={(e) => onGradientColor3Change(e.target.value)}
                      className="w-8 h-6 rounded border border-white/20 cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={gradientColor3}
                      onChange={(e) => onGradientColor3Change(e.target.value)}
                      className="flex-1 px-1 py-1 text-xs border border-white/20 rounded bg-white/10 backdrop-blur-sm text-black min-w-0"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={gradientColor4}
                      onChange={(e) => onGradientColor4Change(e.target.value)}
                      className="w-8 h-6 rounded border border-white/20 cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={gradientColor4}
                      onChange={(e) => onGradientColor4Change(e.target.value)}
                      className="flex-1 px-1 py-1 text-xs border border-white/20 rounded bg-white/10 backdrop-blur-sm text-black min-w-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Gradient Angle Control (for linear gradients) - Fixed Height Container */}
            <div className="space-y-3 min-h-[60px]">
              {showAngleControl ? (
                <>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold flex items-center gap-2 text-black">
                      <RotateCw className="h-4 w-4 text-black" />
                      Angle
                    </Label>
                    <span className="text-sm text-gray-700">{gradientAngle}°</span>
                  </div>
                  <Slider
                    value={[gradientAngle]}
                    onValueChange={(value) => onGradientAngleChange(value[0])}
                    min={0}
                    max={360}
                    step={15}
                    className="w-full"
                  />
                </>
              ) : (
                <div className="opacity-50">
                  <p className="text-sm text-gray-600">Angle control available for linear gradients</p>
                </div>
              )}
            </div>
          </div>

          {/* Animation Controls - Fixed Height */}
          <div className="space-y-4 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-semibold text-black">Animated Hybrid</Label>
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