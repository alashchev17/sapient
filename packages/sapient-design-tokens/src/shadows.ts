export const shadows = {
  shadowsmall: '0px 2px 6px 0px #e5e4dfff',
  shadowmedium: undefined,
  shadowlarge: undefined,
} as const;

export type ShadowToken = keyof typeof shadows;

// Semantic shadow token types for design system usage
export type CardShadowToken = ShadowToken; // Alias for card components
export type ButtonShadowToken = ShadowToken; // Alias for button components
export type ModalShadowToken = ShadowToken; // Alias for modal components
export type DropdownShadowToken = ShadowToken; // Alias for dropdown components
export type TooltipShadowToken = ShadowToken; // Alias for tooltip components
export type ElevationToken = ShadowToken; // Alias for elevation system
export type BoxShadowToken = ShadowToken; // Alias for box-shadow CSS property

// Utility type for all shadow values
export type ShadowValues = typeof shadows;
