'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, ChevronUp, Palette, Settings, Sparkles, RotateCw, Zap, Navigation, RotateCcw } from 'lucide-react';

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
}: GradientControlsPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentGradient = gradients.find(g => g.id === selectedGradient);
  const showAngleControl = currentGradient?.type === 'linear-gradient';

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl z-20">
      <CardHeader className="pb-3 bg-white/10 backdrop-blur-lg z-10 border-b border-white/10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-2xl text-white">
            <Settings className="h-6 w-6 text-purple-400" />
            CSS Pattern Designer
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={onReset}
              variant="ghost"
              size="sm"
              className="h-8 px-2 hover:bg-white/20 text-white"
              title="Reset to defaults"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0 hover:bg-white/20 text-white"
            >
              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Gradient Selection */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold flex items-center gap-2 text-white">
              <Sparkles className="h-4 w-4 text-purple-400" />
              Gradient Type
            </Label>
            <Select value={selectedGradient} onValueChange={onGradientChange}>
              <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
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

            {/* Angle Control (for linear gradients) */}
            {showAngleControl && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold flex items-center gap-2 text-white">
                    <RotateCw className="h-4 w-4 text-blue-400" />
                    Angle
                  </Label>
                  <span className="text-sm text-gray-300">{angle}°</span>
                </div>
                <Slider
                  value={[angle]}
                  onValueChange={(value) => onAngleChange(value[0])}
                  min={0}
                  max={360}
                  step={15}
                  className="w-full"
                />
              </div>
            )}

            {/* Opacity Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-white">Opacity</Label>
                <span className="text-sm text-gray-300">{opacity}%</span>
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
          <div className="space-y-4">
            <Label className="text-sm font-semibold flex items-center gap-2 text-white">
              <Palette className="h-4 w-4 text-pink-400" />
              Gradient Colors
            </Label>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-xs text-gray-300">Color 1</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => onColor1Change(e.target.value)}
                    className="w-10 h-8 rounded-md border-2 border-white/20 cursor-pointer flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={color1}
                    onChange={(e) => onColor1Change(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-white/20 rounded-md bg-white/10 backdrop-blur-sm text-white min-w-0"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs text-gray-300">Color 2</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => onColor2Change(e.target.value)}
                    className="w-10 h-8 rounded-md border-2 border-white/20 cursor-pointer flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={color2}
                    onChange={(e) => onColor2Change(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-white/20 rounded-md bg-white/10 backdrop-blur-sm text-white min-w-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-300">Color 3</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color3}
                    onChange={(e) => onColor3Change(e.target.value)}
                    className="w-10 h-8 rounded-md border-2 border-white/20 cursor-pointer flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={color3}
                    onChange={(e) => onColor3Change(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-white/20 rounded-md bg-white/10 backdrop-blur-sm text-white min-w-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-300">Color 4</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color4}
                    onChange={(e) => onColor4Change(e.target.value)}
                    className="w-10 h-8 rounded-md border-2 border-white/20 cursor-pointer flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={color4}
                    onChange={(e) => onColor4Change(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-white/20 rounded-md bg-white/10 backdrop-blur-sm text-white min-w-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Animation Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-semibold text-white">Animated Gradient</Label>
                <p className="text-xs text-gray-300">Add flowing animation</p>
              </div>
              <Switch
                checked={isAnimated}
                onCheckedChange={onAnimationToggle}
              />
            </div>

            {isAnimated && (
              <div className="space-y-4 pt-2 border-t border-white/10">
                {/* Animation Speed */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold flex items-center gap-2 text-white">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      Speed
                    </Label>
                    <span className="text-sm text-gray-300">{animationSpeed}/20</span>
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
                  <Label className="text-sm font-semibold flex items-center gap-2 text-white">
                    <Navigation className="h-4 w-4 text-orange-400" />
                    Direction
                  </Label>
                  <Select value={animationDirection} onValueChange={onAnimationDirectionChange}>
                    <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
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
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}