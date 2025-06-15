'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, ChevronUp, Palette, Sparkles, RotateCw, Zap, Navigation, RotateCcw, Copy, Check, Shuffle } from 'lucide-react';

interface Gradient {
  id: string;
  name: string;
  type: string;
  description: string;
  basePattern: string;
}

interface GradientControlsPanelProps {
  gradients: Gradient[];
  selectedGradient: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  opacity: number;
  angle: number;
  isAnimated: boolean;
  animationSpeed: number;
  animationDirection: string;
  cssCode: string;
  onGradientChange: (gradientId: string) => void;
  onColor1Change: (color: string) => void;
  onColor2Change: (color: string) => void;
  onColor3Change: (color: string) => void;
  onColor4Change: (color: string) => void;
  onOpacityChange: (opacity: number) => void;
  onAngleChange: (angle: number) => void;
  onAnimationToggle: (isAnimated: boolean) => void;
  onAnimationSpeedChange: (speed: number) => void;
  onAnimationDirectionChange: (direction: string) => void;
  onReset: () => void;
  onGenerateRandom: () => void;
}

export default function GradientControlsPanel({
  gradients,
  selectedGradient,
  color1,
  color2,
  color3,
  color4,
  opacity,
  angle,
  isAnimated,
  animationSpeed,
  animationDirection,
  cssCode,
  onGradientChange,
  onColor1Change,
  onColor2Change,
  onColor3Change,
  onColor4Change,
  onOpacityChange,
  onAngleChange,
  onAnimationToggle,
  onAnimationSpeedChange,
  onAnimationDirectionChange,
  onReset,
  onGenerateRandom,
}: GradientControlsPanelProps) {
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
            Gradient Controls
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
              title="Generate random gradient"
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
          {/* Gradient Selection */}
          <div className="space-y-4 flex flex-col">
            <Label className="text-sm font-semibold flex items-center gap-2 text-black">
              <Sparkles className="h-4 w-4 text-black" />
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

            {/* Angle Control (for linear gradients) - Fixed Height Container */}
            <div className="space-y-3 min-h-[60px]">
              {showAngleControl ? (
                <>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold flex items-center gap-2 text-black">
                      <RotateCw className="h-4 w-4 text-black" />
                      Angle
                    </Label>
                    <span className="text-sm text-gray-700">{angle}°</span>
                  </div>
                  <Slider
                    value={[angle]}
                    onValueChange={(value) => onAngleChange(value[0])}
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
              Gradient Colors
            </Label>
            
            <div className="space-y-3 flex-1">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={color1}
                      onChange={(e) => onColor1Change(e.target.value)}
                      className="w-8 h-6 rounded border border-white/20 cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={color1}
                      onChange={(e) => onColor1Change(e.target.value)}
                      className="flex-1 px-1 py-1 text-xs border border-white/20 rounded bg-white/10 backdrop-blur-sm text-black min-w-0"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={color2}
                      onChange={(e) => onColor2Change(e.target.value)}
                      className="w-8 h-6 rounded border border-white/20 cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={color2}
                      onChange={(e) => onColor2Change(e.target.value)}
                      className="flex-1 px-1 py-1 text-xs border border-white/20 rounded bg-white/10 backdrop-blur-sm text-black min-w-0"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={color3}
                      onChange={(e) => onColor3Change(e.target.value)}
                      className="w-8 h-6 rounded border border-white/20 cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={color3}
                      onChange={(e) => onColor3Change(e.target.value)}
                      className="flex-1 px-1 py-1 text-xs border border-white/20 rounded bg-white/10 backdrop-blur-sm text-black min-w-0"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={color4}
                      onChange={(e) => onColor4Change(e.target.value)}
                      className="w-8 h-6 rounded border border-white/20 cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={color4}
                      onChange={(e) => onColor4Change(e.target.value)}
                      className="flex-1 px-1 py-1 text-xs border border-white/20 rounded bg-white/10 backdrop-blur-sm text-black min-w-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animation Controls - Fixed Height */}
          <div className="space-y-4 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-semibold text-black">Animated Gradient</Label>
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