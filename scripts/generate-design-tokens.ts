#!/usr/bin/env ts-node
/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs';
import path from 'path';

// Get the directory of this script
const __dirname = path.dirname(__filename);

// Paths
const TOKENS_FILE = path.resolve(__dirname, '../design-tokens/tokens.json');
const OUTPUT_DIR = path.resolve(__dirname, '../packages/sapient-design-tokens/src');

// Token interface based on Figma Design Tokens plugin output
interface FigmaToken {
  type: string;
  value: any;
  description?: string;
  extensions?: any;
  // For complex tokens like typography
  fontSize?: { type: string; value: any };
  fontFamily?: { type: string; value: any };
  fontWeight?: { type: string; value: any };
  lineHeight?: { type: string; value: any };
  letterSpacing?: { type: string; value: any };
  // For shadow tokens with multiple values
  [key: string]: any;
}

interface FigmaTokenCollection {
  [collectionName: string]: {
    [tokenName: string]: FigmaToken;
  };
}

// Helper function to convert token names to valid TypeScript identifiers with proper camelCase
function sanitizeKey(key: string): string {
  // Handle special cases and improve camelCase conversion
  const sanitized = key
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .trim()
    .split(' ')
    .filter((word) => word.length > 0) // Remove empty strings
    .map((word, index) => {
      // Convert to proper case
      const lowerWord = word.toLowerCase();
      if (index === 0) {
        return lowerWord;
      }
      return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
    })
    .join('');

  // If it starts with a number, prefix with underscore
  if (/^[0-9]/.test(sanitized)) {
    return `_${sanitized}`;
  }

  return sanitized || 'unknown';
}

// Helper function to convert semantic color names to better camelCase
function improveColorNaming(key: string): string {
  // Handle specific patterns for better naming
  return key
    .replace(/weak/g, 'Weak')
    .replace(/strong/g, 'Strong')
    .replace(/default/g, 'Default')
    .replace(/hover/g, 'Hover')
    .replace(/disabled/g, 'Disabled')
    .replace(/focus/g, 'Focus')
    .replace(/primary/g, 'Primary')
    .replace(/secondary/g, 'Secondary')
    .replace(/tertiary/g, 'Tertiary')
    .replace(/success/g, 'Success')
    .replace(/destructive/g, 'Destructive')
    .replace(/warning/g, 'Warning')
    .replace(/background/g, 'Background')
    .replace(/border/g, 'Border')
    .replace(/readonly/g, 'ReadOnly')
    .replace(/emphasis/g, 'Emphasis')
    .replace(/surface/g, 'Surface')
    .replace(/canvas/g, 'Canvas')
    .replace(/subtle/g, 'Subtle')
    .replace(/inverse/g, 'Inverse')
    .replace(/brand/g, 'Brand')
    .replace(/accent/g, 'Accent')
    .replace(/muted/g, 'Muted');
}

// Helper function to build TypeScript object literal with optional nested structure
function buildObjectLiteral(
  entries: { key: string; value: any }[],
  useNestedStructure: boolean = false
): string {
  if (!useNestedStructure) {
    const pairs = entries.map(({ key, value }) => {
      const sanitizedKey = sanitizeKey(key);
      const quotedKey = /^[a-zA-Z$_][\w$]*$/.test(sanitizedKey)
        ? sanitizedKey
        : `'${sanitizedKey}'`;
      const stringValue = typeof value === 'string' ? `'${value}'` : JSON.stringify(value, null, 2);
      return `  ${quotedKey}: ${stringValue},`;
    });
    return `{\n${pairs.join('\n')}\n}`;
  }

  // Create nested structure for colors
  const nestedStructure: Record<string, Record<string, any>> = {};
  const flatEntries: Array<{ key: string; value: any }> = [];
  const usedKeys = new Set<string>(); // Track used keys to prevent duplicates

  entries.forEach(({ key, value }) => {
    // Handle primitive colors (e.g., gray500, orange300)
    const primitiveMatch = key.match(/^([a-zA-Z]+)(\d+)$/);
    if (primitiveMatch) {
      const [, colorName, shade] = primitiveMatch;
      if (!nestedStructure[colorName]) nestedStructure[colorName] = {};
      nestedStructure[colorName][shade] = value;
      usedKeys.add(colorName); // Mark this color name as used in nested structure
      return;
    }

    // Handle semantic colors (e.g., colorbackgroundprimary)
    if (key.startsWith('color')) {
      const cleanKey = key.replace(/^color/, '');

      if (cleanKey.startsWith('background')) {
        const subKey = cleanKey.replace(/^background/, '');
        if (!nestedStructure.background) nestedStructure.background = {};
        nestedStructure.background[improveColorNaming(sanitizeKey(subKey))] = value;
        usedKeys.add('background');
      } else if (cleanKey.startsWith('text')) {
        const subKey = cleanKey.replace(/^text/, '');
        if (!nestedStructure.text) nestedStructure.text = {};
        nestedStructure.text[improveColorNaming(sanitizeKey(subKey))] = value;
        usedKeys.add('text');
      } else if (cleanKey.startsWith('border')) {
        const subKey = cleanKey.replace(/^border/, '');
        if (!nestedStructure.border) nestedStructure.border = {};
        nestedStructure.border[improveColorNaming(sanitizeKey(subKey))] = value;
        usedKeys.add('border');
      } else if (cleanKey.startsWith('icon')) {
        const subKey = cleanKey.replace(/^icon/, '');
        if (!nestedStructure.icon) nestedStructure.icon = {};
        nestedStructure.icon[improveColorNaming(sanitizeKey(subKey))] = value;
        usedKeys.add('icon');
      } else if (cleanKey.startsWith('button')) {
        const subKey = cleanKey.replace(/^button/, '');
        if (!nestedStructure.button) nestedStructure.button = {};
        nestedStructure.button[improveColorNaming(sanitizeKey(subKey))] = value;
        usedKeys.add('button');
      } else if (cleanKey.startsWith('input')) {
        const subKey = cleanKey.replace(/^input/, '');
        if (!nestedStructure.input) nestedStructure.input = {};
        nestedStructure.input[improveColorNaming(sanitizeKey(subKey))] = value;
        usedKeys.add('input');
      } else {
        const sanitizedKey = sanitizeKey(cleanKey);
        if (!usedKeys.has(sanitizedKey)) {
          flatEntries.push({ key: sanitizedKey, value });
        }
      }
    } else {
      const sanitizedKey = sanitizeKey(key);
      // Only add to flat entries if not already used in nested structure
      if (!usedKeys.has(sanitizedKey)) {
        flatEntries.push({ key: sanitizedKey, value });
      }
    }
  });

  // Build the nested object literal
  const parts: string[] = [];

  // Add nested structures
  Object.entries(nestedStructure).forEach(([groupName, group]) => {
    const groupPairs = Object.entries(group).map(([subKey, subValue]) => {
      const quotedSubKey = /^[a-zA-Z$_][\w$]*$/.test(subKey) ? subKey : `'${subKey}'`;
      const stringValue = typeof subValue === 'string' ? `'${subValue}'` : JSON.stringify(subValue);
      return `    ${quotedSubKey}: ${stringValue},`;
    });
    parts.push(`  ${groupName}: {\n${groupPairs.join('\n')}\n  },`);
  });

  // Add flat entries
  flatEntries.forEach(({ key, value }) => {
    const quotedKey = /^[a-zA-Z$_][\w$]*$/.test(key) ? key : `'${key}'`;
    const stringValue = typeof value === 'string' ? `'${value}'` : JSON.stringify(value);
    parts.push(`  ${quotedKey}: ${stringValue},`);
  });

  return `{\n${parts.join('\n')}\n}`;
}

// Helper function to generate TypeScript file content with semantic color types
function generateTypeScriptFile(
  constName: string,
  entries: { key: string; value: any }[],
  typeName?: string,
  useNestedStructure: boolean = false
): string {
  const objectLiteral = buildObjectLiteral(entries, useNestedStructure);
  let typeExports = '';

  if (typeName) {
    typeExports = `\n\nexport type ${typeName} = keyof typeof ${constName};`;

    // Generate semantic types based on token category
    if (constName === 'colors') {
      typeExports += `

// Semantic color token types for design system usage
export type PrimitiveColorToken = keyof typeof colors.orange | keyof typeof colors.gray | keyof typeof colors.red | keyof typeof colors.blue | keyof typeof colors.green | keyof typeof colors.yellow;
export type BackgroundColorToken = keyof typeof colors.background;
export type TextColorToken = keyof typeof colors.text;
export type BorderColorToken = keyof typeof colors.border;
export type IconColorToken = keyof typeof colors.icon;
export type ButtonColorToken = keyof typeof colors.button;
export type InputColorToken = keyof typeof colors.input;

// Utility types for accessing nested color values
export type PrimitiveColors = typeof colors.orange | typeof colors.gray | typeof colors.red | typeof colors.blue | typeof colors.green | typeof colors.yellow;
export type BackgroundColors = typeof colors.background;
export type TextColors = typeof colors.text;
export type BorderColors = typeof colors.border;
export type IconColors = typeof colors.icon;
export type ButtonColors = typeof colors.button;
export type InputColors = typeof colors.input;`;
    } else if (constName === 'spacing') {
      typeExports += `

// Semantic spacing token types for design system usage
export type ComponentSpacingToken = SpacingToken; // Alias for component usage
export type LayoutSpacingToken = SpacingToken; // Alias for layout usage
export type MarginToken = SpacingToken; // Alias for margin properties
export type PaddingToken = SpacingToken; // Alias for padding properties
export type GapToken = SpacingToken; // Alias for gap properties (flexbox/grid)

// Utility type for all spacing values
export type SpacingValues = typeof spacing;`;
    } else if (constName === 'radii') {
      typeExports += `

// Semantic radii token types for design system usage
export type BorderRadiusToken = keyof typeof radii;
export type ComponentRadiusToken = BorderRadiusToken; // Alias for component usage
export type CardRadiusToken = BorderRadiusToken; // Alias for card components
export type ButtonRadiusToken = BorderRadiusToken; // Alias for button components
export type InputRadiusToken = BorderRadiusToken; // Alias for input components
export type ModalRadiusToken = BorderRadiusToken; // Alias for modal components
export type ImageRadiusToken = BorderRadiusToken; // Alias for image components

// Utility type for all radii values
export type RadiiValues = typeof radii;`;
    } else if (constName === 'shadows') {
      typeExports += `

// Semantic shadow token types for design system usage
export type CardShadowToken = ShadowToken; // Alias for card components
export type ButtonShadowToken = ShadowToken; // Alias for button components
export type ModalShadowToken = ShadowToken; // Alias for modal components
export type DropdownShadowToken = ShadowToken; // Alias for dropdown components
export type TooltipShadowToken = ShadowToken; // Alias for tooltip components
export type ElevationToken = ShadowToken; // Alias for elevation system
export type BoxShadowToken = ShadowToken; // Alias for box-shadow CSS property

// Utility type for all shadow values
export type ShadowValues = typeof shadows;`;
    } else if (constName === 'typography') {
      typeExports += `

// Semantic typography token types for design system usage
export type HeadingToken = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type DisplayHeadingToken = 'h1Display' | 'h2Display' | 'h3Display' | 'h4Display' | 'h5Display' | 'h6Display';
export type BodyTextToken = 'p1' | 'p2' | 'p3';
export type FontSizeToken = HeadingToken | DisplayHeadingToken | BodyTextToken;
export type ComponentTypographyToken = FontSizeToken; // Alias for component usage
export type TitleTypographyToken = HeadingToken | DisplayHeadingToken; // Alias for title components
export type ContentTypographyToken = BodyTextToken; // Alias for content components

// Utility types for accessing typography properties
export type TypographyStyle = typeof typography[keyof typeof typography];
export type FontFamily = TypographyStyle['fontFamily'];
export type FontWeight = TypographyStyle['fontWeight'];
export type LineHeight = TypographyStyle['lineHeight'];
export type LetterSpacing = TypographyStyle['letterSpacing'];
export type FontSize = TypographyStyle['fontSize'];`;
    }
  }

  return `export const ${constName} = ${objectLiteral} as const;${typeExports}\n`;
}

// Main function
async function generateDesignTokens() {
  console.log('🚀 Generating design tokens from Figma export...');

  // Check if tokens file exists
  if (!fs.existsSync(TOKENS_FILE)) {
    console.error(`❌ Tokens file not found: ${TOKENS_FILE}`);
    console.log(
      '📝 Please export your design tokens from Figma and save as design-tokens/tokens.json'
    );
    process.exit(1);
  }

  // Read and parse tokens
  let figmaTokens: FigmaTokenCollection;
  try {
    const tokensContent = fs.readFileSync(TOKENS_FILE, 'utf8');
    figmaTokens = JSON.parse(tokensContent);
    console.log(`✅ Loaded tokens from ${TOKENS_FILE}`);
  } catch (error) {
    console.error('❌ Failed to parse tokens file:', error);
    process.exit(1);
  }

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Process tokens by collection and type
  const processedTokens: Record<string, Array<{ name: string; value: any }>> = {};

  // Helper function to resolve token references like {primitives.orange-500}
  function resolveTokenReference(value: string, allTokens: FigmaTokenCollection): any {
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      const reference = value.slice(1, -1); // Remove { }
      const [collection, tokenName] = reference.split('.');

      if (allTokens[collection] && allTokens[collection][tokenName]) {
        const referencedToken = allTokens[collection][tokenName];
        // Recursively resolve if the referenced token is also a reference
        return resolveTokenReference(referencedToken.value, allTokens);
      }

      console.warn(`⚠️  Could not resolve reference: ${value}`);
      return value; // Return as-is if can't resolve
    }
    return value;
  }

  // Helper function to convert pixel values to rem
  function convertToRem(value: any): string {
    if (typeof value === 'number') {
      return `${value / 16}rem`; // Convert px to rem (assuming 16px base)
    }
    if (typeof value === 'string' && value.endsWith('px')) {
      const pixels = parseFloat(value);
      return `${pixels / 16}rem`;
    }
    return value;
  }

  // Process each collection
  Object.entries(figmaTokens).forEach(([collectionName, tokens]) => {
    console.log(`📦 Processing collection: ${collectionName}`);

    Object.entries(tokens).forEach(([tokenName, token]) => {
      // Determine the target category based on collection name and token type
      let category = 'unknown';

      if (collectionName === 'primitives' && token.type === 'color') {
        category = 'colors';
      } else if (collectionName.includes('color') && token.type === 'color') {
        category = 'colors';
      } else if (collectionName === 'spacers' && token.type === 'dimension') {
        category = 'spacing';
      } else if (collectionName === 'radii' && token.type === 'dimension') {
        category = 'radii';
      } else if (collectionName === 'typography' || collectionName === 'display-typography') {
        category = 'typography';
      } else if (token.type === 'custom-shadow' || collectionName.includes('effect')) {
        category = 'shadows';
      } else if (token.type === 'dimension') {
        // Check if it's a typography-related dimension based on token name
        if (tokenName.match(/^(h[1-6]|p[1-3]|display)/i) || collectionName.includes('typography')) {
          category = 'typography';
        } else {
          category = 'spacing'; // Default other dimensions to spacing
        }
      } else if (token.type === 'color') {
        category = 'colors'; // Default colors to colors
      }

      if (category === 'unknown') {
        console.warn(
          `⚠️  Unknown token category for ${collectionName}.${tokenName} (type: ${token.type})`
        );
        return;
      }

      if (!processedTokens[category]) {
        processedTokens[category] = [];
      }

      // Process the token value
      let processedValue = resolveTokenReference(token.value, figmaTokens);

      // Handle special cases
      if (category === 'spacing' || category === 'radii') {
        processedValue = convertToRem(processedValue);
      }

      // Handle shadow tokens (can have multiple shadow values)
      if (category === 'shadows' && token.type === 'custom-shadow') {
        if (typeof token.value === 'object' && token.value.shadowType) {
          // Single shadow
          const shadow = token.value;
          processedValue = `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.radius}px ${shadow.spread || 0}px ${shadow.color}`;
        } else if (Array.isArray(token.value)) {
          // Multiple shadows
          processedValue = token.value
            .map(
              (shadow: any) =>
                `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.radius}px ${shadow.spread || 0}px ${shadow.color}`
            )
            .join(', ');
        }
      }

      // Handle typography tokens
      if (category === 'typography') {
        if (token.fontSize) {
          processedTokens[category].push({
            name: `${tokenName}FontSize`,
            value: convertToRem(token.fontSize.value),
          });
        }
        if (token.fontFamily) {
          processedTokens[category].push({
            name: `${tokenName}FontFamily`,
            value: token.fontFamily.value,
          });
        }
        if (token.fontWeight) {
          processedTokens[category].push({
            name: `${tokenName}FontWeight`,
            value: token.fontWeight.value,
          });
        }
        if (token.lineHeight) {
          processedTokens[category].push({
            name: `${tokenName}LineHeight`,
            value: token.lineHeight.value / (token.fontSize?.value || 16), // Convert to unitless ratio
          });
        }
        if (token.letterSpacing) {
          processedTokens[category].push({
            name: `${tokenName}LetterSpacing`,
            value: `${token.letterSpacing.value}em`,
          });
        }
        return; // Skip adding the main token for typography
      }

      // Create a clean token name
      const cleanName = tokenName.replace(/[^a-zA-Z0-9]/g, '');

      processedTokens[category].push({
        name: cleanName,
        value: processedValue,
      });
    });
  });

  // Category to file mapping
  const categoryToFileMapping: Record<
    string,
    { filename: string; constName: string; typeName: string }
  > = {
    colors: { filename: 'colors.ts', constName: 'colors', typeName: 'ColorToken' },
    spacing: { filename: 'spacing.ts', constName: 'spacing', typeName: 'SpacingToken' },
    radii: { filename: 'radii.ts', constName: 'radii', typeName: 'RadiiToken' },
    shadows: { filename: 'shadows.ts', constName: 'shadows', typeName: 'ShadowToken' },
    typography: { filename: 'typography.ts', constName: 'typography', typeName: 'TypographyToken' },
  };

  // Generate TypeScript files
  const generatedFiles = new Set<string>();

  Object.entries(processedTokens).forEach(([category, tokenList]) => {
    const mapping = categoryToFileMapping[category];
    if (!mapping) {
      console.warn(`⚠️  Unknown category: ${category}, skipping...`);
      return;
    }

    const { filename, constName, typeName } = mapping;

    // Handle typography differently - create nested structure
    if (category === 'typography') {
      // Group typography tokens by base name
      const groupedTokens: Record<string, any> = {};
      tokenList.forEach((token) => {
        const baseName = token.name.replace(
          /(FontSize|FontFamily|FontWeight|LineHeight|LetterSpacing)$/,
          ''
        );
        if (!groupedTokens[baseName]) {
          groupedTokens[baseName] = {};
        }

        if (token.name.endsWith('FontSize')) {
          groupedTokens[baseName].fontSize = token.value;
        } else if (token.name.endsWith('FontFamily')) {
          groupedTokens[baseName].fontFamily = token.value;
        } else if (token.name.endsWith('FontWeight')) {
          groupedTokens[baseName].fontWeight = token.value;
        } else if (token.name.endsWith('LineHeight')) {
          groupedTokens[baseName].lineHeight = token.value;
        } else if (token.name.endsWith('LetterSpacing')) {
          groupedTokens[baseName].letterSpacing = token.value;
        }
      });

      // Create typography structure
      const typographyEntries = Object.entries(groupedTokens).map(([name, props]) => ({
        key: name,
        value: props,
      }));

      const content = generateTypeScriptFile(constName, typographyEntries, typeName);
      const filePath = path.join(OUTPUT_DIR, filename);

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Generated ${filename} with ${typographyEntries.length} typography tokens`);
    } else {
      // Handle other token types normally
      const entries = tokenList.map((token) => ({ key: token.name, value: token.value }));
      const useNestedStructure = category === 'colors'; // Use nested structure for colors
      const content = generateTypeScriptFile(constName, entries, typeName, useNestedStructure);
      const filePath = path.join(OUTPUT_DIR, filename);

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Generated ${filename} with ${entries.length} tokens`);
    }

    generatedFiles.add(filename);
  });

  // Handle special case for breakpoints if not present in tokens
  if (!generatedFiles.has('breakpoints.ts')) {
    console.log('ℹ️  No breakpoint tokens found, keeping existing breakpoints.ts');
  }

  console.log(`📊 Generated ${generatedFiles.size} token files`);

  // Update index.ts to export all generated files
  const indexContent = `export * from './colors';
export * from './spacing';
export * from './typography';
export * from './shadows';
export * from './breakpoints';
export * from './radii';
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent, 'utf8');
  console.log('✅ Updated index.ts');

  console.log('🎉 Design tokens generation completed!');
  console.log(`📁 Generated files in: ${OUTPUT_DIR}`);
}

// Run the script
if (require.main === module) {
  generateDesignTokens().catch(console.error);
}

export { generateDesignTokens };
