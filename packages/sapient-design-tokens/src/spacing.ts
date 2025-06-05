export const spacing = {
  spacer10: '0.25rem',
  spacer20: '0.5rem',
  spacer40: '1rem',
  spacer60: '1.5rem',
  spacer80: '2rem',
  spacer100: '2.5rem',
  spacer30: '0.75rem',
  spacer50: '1.25rem',
  spacer70: '1.75rem',
  spacer90: '2.25rem',
  spacer0: '0rem',
} as const;

export type SpacingToken = keyof typeof spacing;

// Semantic spacing token types for design system usage
export type ComponentSpacingToken = SpacingToken; // Alias for component usage
export type LayoutSpacingToken = SpacingToken; // Alias for layout usage
export type MarginToken = SpacingToken; // Alias for margin properties
export type PaddingToken = SpacingToken; // Alias for padding properties
export type GapToken = SpacingToken; // Alias for gap properties (flexbox/grid)

// Utility type for all spacing values
export type SpacingValues = typeof spacing;
