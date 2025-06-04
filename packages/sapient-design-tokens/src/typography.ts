export const typography = {
  h1: {
  "fontSize": "2rem",
  "fontFamily": "Test Tiempos Text",
  "fontWeight": 400,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  h2: {
  "fontSize": "1.5rem",
  "fontFamily": "Test Tiempos Text",
  "fontWeight": 400,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  h3: {
  "fontSize": "1.25rem",
  "fontFamily": "Styrene A Trial",
  "fontWeight": 500,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  h4: {
  "fontSize": "1rem",
  "fontFamily": "Styrene A Trial",
  "fontWeight": 500,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  p1: {
  "fontSize": "1rem",
  "fontFamily": "Test Tiempos Text",
  "fontWeight": 400,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  p2: {
  "fontSize": "0.875rem",
  "fontFamily": "Styrene B Trial",
  "fontWeight": 400,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  p3: {
  "fontSize": "0.75rem",
  "fontFamily": "Styrene B Trial",
  "fontWeight": 400,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  h5: {
  "fontSize": "0.875rem",
  "fontFamily": "Styrene A Trial",
  "fontWeight": 500,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  h6: {
  "fontSize": "0.75rem",
  "fontFamily": "Styrene A Trial",
  "fontWeight": 500,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  h1Display: {
  "fontSize": "3rem",
  "fontFamily": "Styrene A Trial",
  "fontWeight": 700,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  h2Display: {
  "fontSize": "2rem",
  "fontFamily": "Styrene A Trial",
  "fontWeight": 700,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  h3Display: {
  "fontSize": "1.5rem",
  "fontFamily": "Styrene A Trial",
  "fontWeight": 700,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  h4Display: {
  "fontSize": "1.25rem",
  "fontFamily": "Test Tiempos Text",
  "fontWeight": 400,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  h5Display: {
  "fontSize": "1rem",
  "fontFamily": "Styrene B Trial",
  "fontWeight": 500,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
  h6Display: {
  "fontSize": "0.75rem",
  "fontFamily": "Styrene B Trial",
  "fontWeight": 400,
  "lineHeight": 1.2,
  "letterSpacing": "0em"
},
} as const;

export type TypographyToken = keyof typeof typography;

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
export type FontSize = TypographyStyle['fontSize'];
