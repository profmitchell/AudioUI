/**
 * Utility functions for handling DOM attributes and props
 */

/**
 * List of camelCase props that should not be passed directly to DOM elements
 * to avoid React warnings
 */
export const nonDomProps = [
  'arcStart',
  'arcEnd',
  'onChange',
  'onValueChange',
  'onRelease',
  'onPadTrigger',
  'valueFormat',
  'onValueCommit'
];

/**
 * Converts a camelCase string to kebab-case for DOM attributes
 * @param str The camelCase string to convert
 * @returns The kebab-case version of the string
 */
export function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Filters props to only include those safe for DOM elements
 * @param props Object containing props
 * @returns Object with only DOM-safe props
 */
export function filterDomProps(props: Record<string, any>): Record<string, any> {
  const domProps: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(props)) {
    if (!nonDomProps.includes(key)) {
      // For non-function props, convert to DOM-friendly format
      if (typeof value !== 'function') {
        domProps[toKebabCase(key)] = value;
      }
    }
  }
  
  return domProps;
}

/**
 * Ensures component props are properly formatted for both component and DOM usage
 * @param props Original props object
 * @returns Object with component props and DOM props
 */
export function processComponentProps(props: Record<string, any>): {
  componentProps: Record<string, any>;
  domProps: Record<string, any>;
} {
  const domProps = filterDomProps(props);
  return {
    componentProps: { ...props },
    domProps
  };
} 