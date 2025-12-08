/**
 * Extract CSS properties and HTML elements from email HTML
 * This is a simple regex-based extractor - could be upgraded to PostCSS for robustness
 */

export interface ExtractedFeatures {
  cssProperties: Set<string>;
  htmlElements: Set<string>;
  htmlAttributes: Set<string>;
}

/**
 * Extract CSS properties from inline styles and style tags
 */
function extractCssProperties(html: string): Set<string> {
  const properties = new Set<string>();

  // Extract from inline style attributes: style="property: value; ..."
  const inlineStyleRegex = /style\s*=\s*["']([^"']+)["']/gi;
  let match;

  while ((match = inlineStyleRegex.exec(html)) !== null) {
    const styleContent = match[1];
    extractPropertiesFromCss(styleContent, properties);
  }

  // Extract from <style> tags
  const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;

  while ((match = styleTagRegex.exec(html)) !== null) {
    const styleContent = match[1];
    extractPropertiesFromCss(styleContent, properties);
  }

  return properties;
}

/**
 * Parse CSS text and extract property names
 */
function extractPropertiesFromCss(css: string, properties: Set<string>): void {
  // Remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // Match property names (word-word pattern before colon)
  // This handles both "color: red" and "background-color: blue"
  const propertyRegex = /([a-z-]+)\s*:/gi;
  let match;

  while ((match = propertyRegex.exec(css)) !== null) {
    const property = match[1].toLowerCase();

    // Filter out pseudo-properties and invalid ones
    if (property.length > 1 && !property.startsWith('-')) {
      properties.add(property);
    }
  }

  // Extract @-rules like @media, @keyframes, @font-face, @import, @supports
  const atRuleRegex = /@([a-z-]+)/gi;

  while ((match = atRuleRegex.exec(css)) !== null) {
    const atRule = `@${match[1].toLowerCase()}`;
    properties.add(atRule);
  }

  // Extract media query features like (prefers-color-scheme), (min-width), etc.
  const mediaFeatureRegex = /@media[^{]*\(([a-z-]+)/gi;

  while ((match = mediaFeatureRegex.exec(css)) !== null) {
    const feature = `@media (${match[1].toLowerCase()})`;
    properties.add(feature);
  }
}

/**
 * Extract HTML elements used in the email
 */
function extractHtmlElements(html: string): Set<string> {
  const elements = new Set<string>();

  // Match opening tags
  const tagRegex = /<([a-z][a-z0-9]*)/gi;
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    elements.add(match[1].toLowerCase());
  }

  return elements;
}

/**
 * Extract HTML attributes used in the email
 */
function extractHtmlAttributes(html: string): Set<string> {
  const attributes = new Set<string>();

  // Match attributes in tags
  const attrRegex = /\s([a-z][a-z0-9-]*)\s*=/gi;
  let match;

  while ((match = attrRegex.exec(html)) !== null) {
    attributes.add(match[1].toLowerCase());
  }

  return attributes;
}

/**
 * Main extraction function - returns all features used in the HTML
 */
export function extractFeatures(html: string): ExtractedFeatures {
  return {
    cssProperties: extractCssProperties(html),
    htmlAttributes: extractHtmlAttributes(html),
    htmlElements: extractHtmlElements(html),
  };
}

/**
 * Normalize CSS property names to match caniemail slugs
 * e.g., "background-color" -> "background-color"
 * e.g., "@media" -> "at-media"
 * e.g., "@media (prefers-color-scheme)" -> "at-media-prefers-color-scheme"
 */
export function normalizeCssPropertyToSlug(property: string): string {
  // Handle @-rules
  if (property.startsWith('@')) {
    // @media (feature) -> at-media-feature
    const atRuleMatch = property.match(/@([a-z-]+)(?:\s*\(([a-z-]+)\))?/);

    if (atRuleMatch) {
      const rule = atRuleMatch[1];
      const feature = atRuleMatch[2];

      if (feature) {
        return `at-${rule}-${feature}`;
      }

      return `at-${rule}`;
    }
  }

  return property;
}

/**
 * Map of CSS shorthand properties to their longhand equivalents
 * Used to check if using a shorthand might have compatibility issues
 */
export const CSS_SHORTHANDS: Record<string, string[]> = {
  flex: ['flex-grow', 'flex-shrink', 'flex-basis'],
  font: ['font-style', 'font-variant', 'font-weight', 'font-size', 'line-height', 'font-family'],
  margin: ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
  padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
  animation: [
    'animation-name',
    'animation-duration',
    'animation-timing-function',
    'animation-delay',
    'animation-iteration-count',
    'animation-direction',
    'animation-fill-mode',
    'animation-play-state',
  ],
  background: [
    'background-color',
    'background-image',
    'background-position',
    'background-size',
    'background-repeat',
    'background-origin',
    'background-clip',
    'background-attachment',
  ],
  border: [
    'border-width',
    'border-style',
    'border-color',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left',
  ],
  'border-radius': [
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-right-radius',
    'border-bottom-left-radius',
  ],
  grid: [
    'grid-template-rows',
    'grid-template-columns',
    'grid-template-areas',
    'grid-auto-rows',
    'grid-auto-columns',
    'grid-auto-flow',
  ],
};
