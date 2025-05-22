import html2canvas from 'html2canvas';

// Types for the UI Builder
export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
}

export interface UIComponent {
  id: string;
  type: string;
  props: any;
  paramId?: string;
}

export interface UILayout {
  id: string;
  name: string;
  description?: string;
  created: string;
  modified: string;
  version: string;
  dimensions: {
    width: number;
    height: number;
  };
  background: string;
  grid: {
    columns: number;
    cellSize: number;
  };
  components: UIComponent[];
  layout: LayoutItem[];
}

export interface ExportOptions {
  format: 'sprite-sheet' | 'code' | 'bundle';
  platform: 'juce' | 'web' | 'kontakt';
  resolution: number;
  frames?: number;
  orientation?: 'horizontal' | 'vertical';
  spacing?: number;
}

export interface SpritesheetMetadata {
  component: string;
  paramId?: string;
  frames: number;
  frameWidth: number;
  frameHeight: number;
  orientation: string;
  version: string;
}

/**
 * Save a layout to localStorage
 */
export const saveLayout = (layout: UILayout): void => {
  try {
    // Get existing layouts
    const layoutsStr = localStorage.getItem('audioui-layouts');
    const layouts: UILayout[] = layoutsStr ? JSON.parse(layoutsStr) : [];
    
    // Update layout's modified date
    const updatedLayout = {
      ...layout,
      modified: new Date().toISOString()
    };
    
    // Check if layout already exists
    const existingIndex = layouts.findIndex(l => l.id === layout.id);
    if (existingIndex >= 0) {
      // Update existing layout
      layouts[existingIndex] = updatedLayout;
    } else {
      // Add new layout
      layouts.push(updatedLayout);
    }
    
    // Save back to localStorage
    localStorage.setItem('audioui-layouts', JSON.stringify(layouts));
  } catch (error) {
    console.error('Error saving layout:', error);
    throw new Error('Failed to save layout');
  }
};

/**
 * Load all saved layouts from localStorage
 */
export const loadLayouts = (): UILayout[] => {
  try {
    const layoutsStr = localStorage.getItem('audioui-layouts');
    return layoutsStr ? JSON.parse(layoutsStr) : [];
  } catch (error) {
    console.error('Error loading layouts:', error);
    return [];
  }
};

/**
 * Load a specific layout by ID
 */
export const loadLayout = (id: string): UILayout | null => {
  try {
    const layouts = loadLayouts();
    return layouts.find(layout => layout.id === id) || null;
  } catch (error) {
    console.error(`Error loading layout ${id}:`, error);
    return null;
  }
};

/**
 * Create a new empty layout
 */
export const createNewLayout = (name: string = 'New Layout'): UILayout => {
  const now = new Date().toISOString();
  return {
    id: `layout-${Date.now()}`,
    name,
    created: now,
    modified: now,
    version: '1.0.0',
    dimensions: {
      width: 800,
      height: 600
    },
    background: 'bg-zinc-900',
    grid: {
      columns: 24,
      cellSize: 20
    },
    components: [],
    layout: []
  };
};

/**
 * Delete a layout by ID
 */
export const deleteLayout = (id: string): boolean => {
  try {
    const layouts = loadLayouts();
    const filteredLayouts = layouts.filter(layout => layout.id !== id);
    localStorage.setItem('audioui-layouts', JSON.stringify(filteredLayouts));
    return true;
  } catch (error) {
    console.error(`Error deleting layout ${id}:`, error);
    return false;
  }
};

/**
 * Convert component to a sprite sheet
 */
export const componentToSpritesheet = async (
  element: HTMLElement, 
  options: {
    frames: number,
    orientation: 'horizontal' | 'vertical',
    spacing: number,
    bipolar?: boolean
  }
): Promise<{ 
  spritesheet: string, 
  metadata: SpritesheetMetadata 
}> => {
  if (!element) {
    throw new Error('Component element not found');
  }
  
  // Store original dimensions
  const originalBounds = element.getBoundingClientRect();
  const frameWidth = Math.ceil(originalBounds.width);
  const frameHeight = Math.ceil(originalBounds.height);
  
  // Store original style information
  const originalTransform = element.style.transform;
  const originalPosition = element.style.position;
  
  // Set consistent styling for capturing
  element.style.position = 'relative';
  element.style.transform = 'none';
  
  // Wait for styles to apply
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Create canvas of appropriate size based on orientation
  const spriteCanvas = document.createElement('canvas');
  if (options.orientation === 'horizontal') {
    spriteCanvas.width = (frameWidth + options.spacing) * options.frames - options.spacing;
    spriteCanvas.height = frameHeight;
  } else {
    spriteCanvas.height = (frameHeight + options.spacing) * options.frames - options.spacing;
    spriteCanvas.width = frameWidth;
  }
  
  const ctx = spriteCanvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not create canvas context');
  }
  
  // Enable high quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // Clear the canvas
  ctx.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);
  
  // Calculate value range
  const minValue = options.bipolar ? -100 : 0;
  const maxValue = 100;
  const valueRange = maxValue - minValue;
  
  // Standard updateComponentValue function - depends on component type
  // In a real implementation, this would have specific handlers for each component type
  const updateComponentValue = (value: number) => {
    // This is a placeholder - actual implementation would update the component's value prop
    console.log('Updating component value to:', value);
    // Most components have a 'value' prop
    if ('value' in element) {
      (element as any).value = value;
    }
  };
  
  // Capture frames
  const canvasOptions = {
    backgroundColor: null,
    scale: 2, // Higher quality
    logging: false,
    allowTaint: true,
    useCORS: true,
    foreignObjectRendering: false
  };
  
  for (let i = 0; i < options.frames; i++) {
    // Calculate normalized progress (0 to 1)
    const progress = i / (options.frames - 1);
    
    // Calculate value for this frame
    const value = minValue + progress * valueRange;
    
    // Update component with this value
    updateComponentValue(value);
    
    // Wait for component to update and stabilize
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // Capture the component at this state
    const canvas = await html2canvas(element, canvasOptions);
    
    // Draw this frame to the sprite sheet
    const x = options.orientation === 'horizontal' ? i * (frameWidth + options.spacing) : 0;
    const y = options.orientation === 'vertical' ? i * (frameHeight + options.spacing) : 0;
    
    ctx.drawImage(canvas, x, y, frameWidth, frameHeight);
  }
  
  // Restore original style
  element.style.position = originalPosition;
  element.style.transform = originalTransform;
  
  // Reset component to middle value
  const resetValue = options.bipolar ? 0 : minValue + valueRange / 2;
  updateComponentValue(resetValue);
  
  // Convert canvas to data URL
  const dataUrl = spriteCanvas.toDataURL('image/png');
  
  // Create metadata
  const metadata: SpritesheetMetadata = {
    component: 'unknown-component', // This would come from component type in real implementation
    frames: options.frames,
    frameWidth,
    frameHeight,
    orientation: options.orientation,
    version: '1.0.0'
  };
  
  return {
    spritesheet: dataUrl,
    metadata
  };
};

/**
 * Export JUCE code snippets for a component
 */
export const exportJUCECode = (component: UIComponent, spriteMetadata: SpritesheetMetadata): string => {
  // This is a simplified template - real version would be more sophisticated
  return `
// JUCE component code for ${component.type} - Parameter: ${component.paramId || 'unnamed'}
// Generated by AudioUI Builder

class ${component.type}Component : public juce::Component
{
public:
    ${component.type}Component()
    {
        // Load sprite sheet
        spriteSheet = juce::ImageCache::getFromMemory(BinaryData::${component.paramId || 'component'}_sprite_png, BinaryData::${component.paramId || 'component'}_sprite_pngSize);
        
        // Setup dimensions
        frameWidth = ${spriteMetadata.frameWidth};
        frameHeight = ${spriteMetadata.frameHeight};
        numFrames = ${spriteMetadata.frames};
        
        // Set initial size
        setSize(frameWidth, frameHeight);
    }
    
    ~${component.type}Component() override = default;
    
    void paint(juce::Graphics& g) override
    {
        // Calculate which frame to display based on value
        int frameIndex = juce::jlimit(0, numFrames - 1, 
            static_cast<int>((currentValue - minimumValue) / (maximumValue - minimumValue) * (numFrames - 1)));
        
        // Draw the appropriate frame from sprite sheet
        if (spriteSheet.isValid())
        {
            // Calculate source rectangle based on orientation
            juce::Rectangle<int> sourceRect;
            if (isHorizontal)
                sourceRect = { frameIndex * frameWidth, 0, frameWidth, frameHeight };
            else
                sourceRect = { 0, frameIndex * frameHeight, frameWidth, frameHeight };
                
            g.drawImage(spriteSheet, 0, 0, getWidth(), getHeight(), 
                        sourceRect.getX(), sourceRect.getY(), 
                        sourceRect.getWidth(), sourceRect.getHeight());
        }
    }
    
    void setValue(float newValue)
    {
        currentValue = juce::jlimit(minimumValue, maximumValue, newValue);
        repaint();
    }
    
    // In a real component, we'd also:
    // - Handle mouse interactions
    // - Attach to audio parameters
    // - Support resizing
    
private:
    juce::Image spriteSheet;
    int frameWidth = 0;
    int frameHeight = 0;
    int numFrames = 0;
    bool isHorizontal = ${spriteMetadata.orientation === 'horizontal' ? 'true' : 'false'};
    
    float currentValue = 0.0f;
    float minimumValue = 0.0f;
    float maximumValue = 1.0f;
};
  `.trim();
};

/**
 * Export complete bundle for a layout
 */
export const exportLayoutBundle = async (
  layout: UILayout,
  options: ExportOptions
): Promise<{
  manifest: any,
  assets: Record<string, string>,
  code: Record<string, string>
}> => {
  // This is a placeholder implementation
  // A real implementation would:
  // 1. Export each component as a sprite sheet
  // 2. Generate code for each component
  // 3. Create a manifest file
  // 4. Bundle everything together
  
  return {
    manifest: {
      name: layout.name,
      version: '1.0.0',
      components: layout.components.length,
      generated: new Date().toISOString()
    },
    assets: {
      // Component sprite sheets would go here
      'demo-sprite.png': 'data:image/png;base64,iVBORw0KGgoAAAANSU'
    },
    code: {
      // Generated code files would go here
      'MainComponent.cpp': '// Generated JUCE code would go here',
      'MainComponent.h': '// Generated JUCE header would go here'
    }
  };
}; 