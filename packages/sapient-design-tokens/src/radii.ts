export const radii = {
  bordersmall: '0.5rem',
  bordermedium: '1rem',
  borderlarge: '2rem',
} as const;

export type RadiiToken = keyof typeof radii;

// Semantic radii token types for design system usage
export type BorderRadiusToken = keyof typeof radii;
export type ComponentRadiusToken = BorderRadiusToken; // Alias for component usage
export type CardRadiusToken = BorderRadiusToken; // Alias for card components
export type ButtonRadiusToken = BorderRadiusToken; // Alias for button components
export type InputRadiusToken = BorderRadiusToken; // Alias for input components
export type ModalRadiusToken = BorderRadiusToken; // Alias for modal components
export type ImageRadiusToken = BorderRadiusToken; // Alias for image components

// Utility type for all radii values
export type RadiiValues = typeof radii;
