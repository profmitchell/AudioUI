"use client"

import React, { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PropSchema } from '@/utils/component-schemas'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface PropertyEditorProps {
  propSchema: PropSchema
  value: any
  onChange: (name: string, value: any) => void
}

export function PropertyEditor({ propSchema, value, onChange }: PropertyEditorProps) {
  // Format properties for display
  const formatPropertyName = (name: string) => {
    // Convert camelCase to Title Case with spaces
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  // Handle different property types
  switch (propSchema.type) {
    case 'number':
      // Ensure value is a valid number
      const numValue = Number(value);
      const safeValue = isNaN(numValue) ? (propSchema.min ?? 0) : numValue;
      
      return (
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor={propSchema.name} className="text-white">
              {formatPropertyName(propSchema.name)}
            </Label>
            <span className="text-white/80">{safeValue}</span>
          </div>
          <Slider
            id={propSchema.name}
            value={[safeValue]}
            onValueChange={(newValue) => onChange(propSchema.name, newValue[0])}
            min={propSchema.min ?? 0}
            max={propSchema.max ?? 100}
            step={propSchema.step ?? 1}
            className="w-full"
          />
        </div>
      )

    case 'string':
      return (
        <div className="space-y-2">
          <Label htmlFor={propSchema.name} className="text-white">
            {formatPropertyName(propSchema.name)}
          </Label>
          <Input
            id={propSchema.name}
            value={value ?? ''}
            onChange={(e) => onChange(propSchema.name, e.target.value)}
            className="bg-black/40 border-white/10 text-white"
          />
        </div>
      )

    case 'boolean':
      return (
        <div className="flex items-center justify-between">
          <Label htmlFor={propSchema.name} className="text-white">
            {formatPropertyName(propSchema.name)}
          </Label>
          <Switch
            id={propSchema.name}
            checked={value}
            onCheckedChange={(checked) => onChange(propSchema.name, checked)}
          />
        </div>
      )

    case 'enum':
      return (
        <div className="space-y-2">
          <Label htmlFor={propSchema.name} className="text-white">
            {formatPropertyName(propSchema.name)}
          </Label>
          <Select
            value={String(value)}
            onValueChange={(newValue) => onChange(propSchema.name, newValue)}
          >
            <SelectTrigger className="w-full glass">
              <SelectValue placeholder={`Select ${propSchema.name}`} />
            </SelectTrigger>
            <SelectContent className="bg-black/80 backdrop-blur-md border border-white/10 text-white">
              {propSchema.options?.map((option) => (
                <SelectItem key={option.toString()} value={option.toString()}>
                  {option.toString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )

    case 'color':
      // Default value for color picker to avoid empty values
      const colorValue = value || propSchema.default || '#000000';
      const isRgba = colorValue.startsWith('rgba');
      
      return (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor={propSchema.name} className="text-white">
              {formatPropertyName(propSchema.name)}
            </Label>
            <div
              className="w-6 h-6 rounded-md border border-white/20"
              style={{ backgroundColor: colorValue }}
            />
          </div>
          
          {isRgba ? (
            // For RGBA colors, we need to provide a text input
            <Input
              id={propSchema.name}
              value={colorValue}
              onChange={(e) => onChange(propSchema.name, e.target.value)}
              className="w-full bg-black/40 border-white/10 text-white"
              placeholder="rgba(255, 255, 255, 0.5)"
            />
          ) : (
            // For hex colors, use the color picker
            <Input
              id={propSchema.name}
              type="color"
              value={colorValue}
              onChange={(e) => onChange(propSchema.name, e.target.value)}
              className="w-full h-10 p-1 bg-black/40 border-white/10"
            />
          )}
          
          {/* Add alpha option for hex colors */}
          {!isRgba && (
            <div className="pt-1">
              <button 
                className="text-xs text-white/60 hover:text-white underline"
                onClick={() => {
                  // Convert hex to rgba
                  const hex = colorValue.replace('#', '');
                  const r = parseInt(hex.substring(0, 2), 16);
                  const g = parseInt(hex.substring(2, 4), 16);
                  const b = parseInt(hex.substring(4, 6), 16);
                  onChange(propSchema.name, `rgba(${r}, ${g}, ${b}, 1.0)`);
                }}
              >
                Convert to RGBA
              </button>
            </div>
          )}
        </div>
      )

    // Ignore function props
    case 'function':
      return null

    // Placeholder for array and object props (simplified for now)
    case 'array':
      if (propSchema.name === 'value' && Array.isArray(value) && value.length === 1 && typeof value[0] === 'number') {
        // Handle slider-style array values
        const numValue = Number(value[0]);
        const safeValue = isNaN(numValue) ? (propSchema.min ?? 0) : numValue;
        
        return (
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor={propSchema.name} className="text-white">
                {formatPropertyName(propSchema.name)}
              </Label>
              <span className="text-white/80">{safeValue}</span>
            </div>
            <Slider
              id={propSchema.name}
              value={[safeValue]}
              onValueChange={(newValue) => onChange(propSchema.name, newValue)}
              min={propSchema.min ?? 0}
              max={propSchema.max ?? 100}
              step={propSchema.step ?? 1}
              className="w-full"
            />
          </div>
        )
      }
      return (
        <div className="space-y-2">
          <Label htmlFor={propSchema.name} className="text-white">
            {formatPropertyName(propSchema.name)}
          </Label>
          <Input
            id={propSchema.name}
            value={value ? JSON.stringify(value) : ''}
            disabled
            className="bg-black/40 border-white/10 text-white/50"
          />
        </div>
      )
    
    case 'object':
      return (
        <div className="space-y-2">
          <Label htmlFor={propSchema.name} className="text-white">
            {formatPropertyName(propSchema.name)}
          </Label>
          <Input
            id={propSchema.name}
            value={value ? JSON.stringify(value) : ''}
            disabled
            className="bg-black/40 border-white/10 text-white/50"
          />
        </div>
      )

    default:
      return null
  }
}

interface PropertyEditorGroupProps {
  propSchemas: PropSchema[]
  values: Record<string, any>
  onChange: (name: string, value: any) => void
}

export function PropertyEditorGroup({ propSchemas, values, onChange }: PropertyEditorGroupProps) {
  // Group states to track which groups are expanded/collapsed
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    Core: true, // Core group is expanded by default
  });

  // Categorize properties based on name patterns
  const categorizeProps = (props: PropSchema[]) => {
    // Map of property name patterns to categories
    const categoryPatterns = {
      // Core functionality props
      Core: [
        'value', 'defaultValue', 'min', 'max', 'step', 'onChange', 'onValueChange', 
        'disabled', 'readonly', 'required', 'name', 'id', 'label', 'showValue'
      ],
      
      // Layout & Structure
      Layout: [
        'width', 'height', 'size', 'orientation', 'direction', 'position', 'alignment',
        'spacing', 'padding', 'margin', 'gap', 'vertical', 'horizontal', 
        'layout', 'aspectRatio', 'responsive'
      ],
      
      // Styling props
      Appearance: [
        'variant', 'theme', 'style', 'color', 'background', 'border', 'shadow',
        'opacity', 'radius', 'shape', 'fill', 'stroke', 'gradient', 'mode',
        'shadowIntensity', 'effectTightness', 'borderRadius', 'reflection',
        'highlight', 'glass', 'blur', 'metallic', 'glossy', 'glow'
      ],
      
      // Animation & Behavior
      Behavior: [
        'animation', 'transition', 'duration', 'delay', 'effect', 'spring', 
        'bounce', 'ripple', 'snap', 'tilt', 'physics', 'trigger', 'snapStrength',
        'restPosition', 'automaticValues', 'releaseAction'
      ],
      
      // UI Feedback & Indicators
      Feedback: [
        'indicator', 'track', 'mark', 'tick', 'grid', 'showGrid', 'showTicks',
        'showLabels', 'showIndicator', 'led', 'light', 'pointer'
      ],
      
      // Audio-specific props
      Audio: [
        'attack', 'decay', 'sustain', 'release', 'envelope', 'frequency', 'velocity',
        'octave', 'note', 'midi', 'tempo', 'waveform', 'filter', 'resonance',
        'cutoff', 'lfo', 'amplitude', 'pan', 'channel'
      ],
      
      // Accessibility props
      Accessibility: [
        'aria', 'role', 'tabIndex', 'screenReader', 'accessible', 'keyboardNav'
      ],
    };
    
    // Function to determine the category of a property
    const getCategoryForProp = (prop: PropSchema): string => {
      // Check for explicit group in the schema
      if (prop.group) {
        return prop.group;
      }
      
      const propName = prop.name.toLowerCase();
      
      // Try to match the property to a category based on patterns
      for (const [category, patterns] of Object.entries(categoryPatterns)) {
        if (patterns.some(pattern => 
          propName === pattern.toLowerCase() || 
          propName.includes(pattern.toLowerCase())
        )) {
          return category;
        }
      }
      
      // Some specific property mappings for common cases
      if (propName.includes('color') || propName.endsWith('color')) {
        return 'Appearance';
      }
      
      if (propName.startsWith('show') || propName.startsWith('display') || propName.startsWith('hide')) {
        return 'Appearance';
      }
      
      // Default to Others if no match found
      return 'Others';
    };
    
    // Group props by their determined category
    return props.reduce((acc, prop) => {
      const category = getCategoryForProp(prop);
      
      if (!acc[category]) {
        acc[category] = [];
      }
      
      acc[category].push(prop);
      return acc;
    }, {} as Record<string, PropSchema[]>);
  };

  // Filter out any props that are not appropriate for the current component
  const relevantProps = propSchemas.filter(prop => {
    // Filter out function props (already done)
    if (prop.type === 'function' && prop.name !== 'onChange' && prop.name !== 'onValueChange') {
      return false;
    }
    
    // Check if the property is initialized in the values
    // If a property is not applicable to a component, it should not be in values
    if (values[prop.name] === undefined && !prop.required) {
      return false;
    }
    
    return true;
  });

  // Group the properties using the categorization function
  const groupedProps = categorizeProps(relevantProps);

  // Order of groups - ensure Core is first, Others is last
  const preferredGroupOrder = [
    'Core',
    'Layout',
    'Appearance',
    'Behavior',
    'Feedback',
    'Audio',
    'Accessibility',
    'Others'
  ];
  
  const orderedGroupNames = [
    ...preferredGroupOrder.filter(group => groupedProps[group]?.length > 0),
    ...Object.keys(groupedProps)
      .filter(group => !preferredGroupOrder.includes(group))
      .sort(),
  ];

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // If no props remain after filtering, show a message
  if (orderedGroupNames.length === 0) {
    return (
      <div className="p-4 text-center text-white/60">
        No configurable properties available for this component.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orderedGroupNames.map(groupName => (
        <div key={groupName} className="property-group">
          <button
            className="w-full flex items-center justify-between py-2 px-3 bg-black/30 text-white rounded-md hover:bg-black/40 transition-colors"
            onClick={() => toggleGroup(groupName)}
          >
            <span className="font-medium">{groupName}</span>
            {expandedGroups[groupName] ? (
              <ChevronDown className="h-4 w-4 text-white/70" />
            ) : (
              <ChevronRight className="h-4 w-4 text-white/70" />
            )}
          </button>
          
          {expandedGroups[groupName] && (
            <div className="space-y-4 mt-3 pl-1 pr-1 pt-1">
              {groupedProps[groupName]
                .sort((a, b) => {
                  // Sort properties by importance within group
                  if (a.required && !b.required) return -1;
                  if (!a.required && b.required) return 1;
                  // Sort by name as a fallback
                  return a.name.localeCompare(b.name);
                })
                .map(prop => (
                  <PropertyEditor
                    key={prop.name}
                    propSchema={prop}
                    value={values[prop.name]}
                    onChange={onChange}
                  />
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 