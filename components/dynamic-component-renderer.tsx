"use client"

import React, { useState, useEffect } from 'react'
import { ComponentSchema } from '@/utils/component-schemas'
import { processComponentProps } from '@/utils/dom-utils'

interface DynamicComponentRendererProps {
  schema: ComponentSchema
  initialProps?: Record<string, any>
}

/**
 * Component that renders any AudioUI component based on its schema
 * and passes the appropriate props
 */
export function DynamicComponentRenderer({ schema, initialProps = {} }: DynamicComponentRendererProps) {
  // Initialize state for each prop
  const [props, setProps] = useState<Record<string, any>>(() => {
    // Initialize with default values from schema, overridden by initialProps
    const defaultProps: Record<string, any> = {}
    schema.props.forEach(propSchema => {
      // Ensure we always have a defined value (never undefined)
      if (initialProps[propSchema.name] !== undefined) {
        defaultProps[propSchema.name] = initialProps[propSchema.name]
      } else if (propSchema.default !== undefined) {
        defaultProps[propSchema.name] = propSchema.default
      } else {
        // Provide sensible defaults based on type if no default is specified
        switch (propSchema.type) {
          case 'string':
            defaultProps[propSchema.name] = ''
            break
          case 'number':
            defaultProps[propSchema.name] = propSchema.min !== undefined ? propSchema.min : 0
            break
          case 'boolean':
            defaultProps[propSchema.name] = false
            break
          case 'array':
            defaultProps[propSchema.name] = propSchema.name === 'value' ? [50] : []
            break
          case 'object':
            defaultProps[propSchema.name] = {}
            break
          case 'color':
            defaultProps[propSchema.name] = '#000000'
            break
          default:
            defaultProps[propSchema.name] = null
        }
      }
    })
    return defaultProps
  })

  // Update props when schema changes
  useEffect(() => {
    setProps(prevProps => {
      const newProps: Record<string, any> = {}
      schema.props.forEach(propSchema => {
        // Preserve existing values when possible, otherwise use defaults
        if (initialProps[propSchema.name] !== undefined) {
          newProps[propSchema.name] = initialProps[propSchema.name]
        } else if (prevProps[propSchema.name] !== undefined) {
          newProps[propSchema.name] = prevProps[propSchema.name]
        } else if (propSchema.default !== undefined) {
          newProps[propSchema.name] = propSchema.default
        } else {
          // Same default logic as in the initial state
          switch (propSchema.type) {
            case 'string':
              newProps[propSchema.name] = ''
              break
            case 'number':
              newProps[propSchema.name] = propSchema.min !== undefined ? propSchema.min : 0
              break
            case 'boolean':
              newProps[propSchema.name] = false
              break
            case 'array':
              newProps[propSchema.name] = propSchema.name === 'value' ? [50] : []
              break
            case 'object':
              newProps[propSchema.name] = {}
              break
            case 'color':
              newProps[propSchema.name] = '#000000'
              break
            default:
              newProps[propSchema.name] = null
          }
        }
      })
      return newProps
    })
  }, [schema, initialProps])

  // Handle prop changes
  const updateProp = (name: string, value: any) => {
    setProps(prev => ({ ...prev, [name]: value }))
  }

  // Create final props object including function props
  const componentProps: Record<string, any> = { ...props }
  
  // Add onChange/onValueChange handlers
  schema.props.forEach(propSchema => {
    if (propSchema.type === 'function' && propSchema.name.startsWith('on')) {
      // Add a handler that updates the internal state
      componentProps[propSchema.name] = (...args: any[]) => {
        // Handle different callback patterns
        if (propSchema.name === 'onValueChange' && Array.isArray(args[0])) {
          // Slider components use onValueChange with array values
          updateProp('value', args[0])
        } else if (propSchema.name === 'onChange') {
          if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
            // XYPad component uses onChange with (x, y) parameters
            updateProp('x', args[0])
            updateProp('y', args[1])
          } else if (typeof args[0] === 'number') {
            // Dial and numeric components use onChange with number value
            updateProp('value', args[0])
          } else if (Array.isArray(args[0])) {
            // Handle array values passed to onChange
            updateProp('value', args[0])
          }
        } else if (args.length === 1 && typeof args[0] !== 'object') {
          // Standard single value handler
          updateProp('value', args[0])
        } else if (args.length === 1 && typeof args[0] === 'object' && 'target' in args[0]) {
          // DOM event handler
          updateProp('value', args[0].target.value)
        }
        
        // Call original handler from initialProps if it exists
        if (initialProps[propSchema.name]) {
          initialProps[propSchema.name](...args)
        }
      }
    }
  })

  // Process props to ensure DOM compatibility
  const { componentProps: finalProps } = processComponentProps(componentProps)
  
  // Special case adjustments for specific components
  if (schema.id === 'meter-arc') {
    // Ensure these props exist and have valid values
    if (finalProps.arcStart === undefined) finalProps.arcStart = 135
    if (finalProps.arcEnd === undefined) finalProps.arcEnd = 405
    
    // Ensure glow color is set when using glow variant
    if (finalProps.variant === 'glow' && !finalProps.glowColor) {
      finalProps.glowColor = 'rgba(255, 255, 255, 0.5)'
    }
  }

  // Render the component with props
  const Component = schema.component
  return <Component {...finalProps} />
}

/**
 * Returns the properties of a component as a flat object
 * for use in UI controls
 */
export function getComponentProperties(componentProps: Record<string, any>): Record<string, any> {
  return { ...componentProps }
}

/**
 * Helper function to create default props for a component
 */
export function createDefaultProps(schema: ComponentSchema): Record<string, any> {
  const props: Record<string, any> = {}
  schema.props.forEach(propSchema => {
    if (propSchema.type !== 'function') {
      // Use defined default value or provide a type-specific fallback
      if (propSchema.default !== undefined) {
        props[propSchema.name] = propSchema.default
      } else {
        // Provide sensible defaults based on type if no default is specified
        switch (propSchema.type) {
          case 'string':
            props[propSchema.name] = ''
            break
          case 'number':
            props[propSchema.name] = propSchema.min !== undefined ? propSchema.min : 0
            break
          case 'boolean':
            props[propSchema.name] = false
            break
          case 'array':
            props[propSchema.name] = propSchema.name === 'value' ? [50] : []
            break
          case 'object':
            props[propSchema.name] = {}
            break
          case 'color':
            props[propSchema.name] = '#000000'
            break
          case 'enum':
            props[propSchema.name] = propSchema.options && propSchema.options.length > 0 
              ? propSchema.options[0] 
              : ''
            break
          default:
            props[propSchema.name] = null
        }
      }
    }
  })
  return props
} 