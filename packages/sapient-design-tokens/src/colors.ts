export const colors = {
  orange: {
    '100': '#ebdbbcff',
    '300': '#d4a27fff',
    '500': '#cc785cff',
  },
  gray: {
    '100': '#fafaf7ff',
    '200': '#f0f0ebff',
    '300': '#e5e4dfff',
    '400': '#bfbfbaff',
    '500': '#91918dff',
    '600': '#666663ff',
    '700': '#40403eff',
    '800': '#262625ff',
    '900': '#191919ff',
  },
  red: {
    '200': '#f7eeedff',
    '500': '#bf4d43ff',
    '800': '#8a2423ff',
  },
  blue: {
    '100': '#d2e8ffff',
    '200': '#b7d3eeff',
    '500': '#61aaf2ff',
    '700': '#3889ddff',
  },
  green: {
    '100': '#e2f5e1ff',
    '200': '#e9f1e9ff',
    '500': '#6bb765ff',
    '700': '#468040ff',
  },
  yellow: {
    '200': '#f4efe0ff',
    '500': '#ddad11ff',
  },
  background: {
    Surface: '#ffffffff',
    PrimaryWeakest: '#ebdbbcff',
    Canvas: '#fafaf7ff',
    Subtle: '#f0f0ebff',
    Emphasis: '#191919ff',
    Disabled: '#e5e4dfff',
    DestructiveWeak: '#f7eeedff',
    DestructiveDefault: '#bf4d43ff',
    DestructiveStrong: '#8a2423ff',
    SuccessWeak: '#e9f1e9ff',
    SuccessDefault: '#6bb765ff',
    WarningWeak: '#f4efe0ff',
    WarningDefault: '#ddad11ff',
    FocusWeak: '#b7d3eeff',
    FocusDefault: '#61aaf2ff',
    PrimaryWeak: '#d4a27fff',
    PrimaryDefault: '#cc785cff',
    FocusStrong: '#3889ddff',
    research: '#788c5dff',
    commitments: '#c46686ff',
    solutions: '#cbcadbff',
    api: '#6a9bccff',
    learn: '#bcd1caff',
  },
  text: {
    Default: '#191919ff',
    Muted: '#666663ff',
    Subtle: '#91918dff',
    Inverse: '#fafaf7ff',
    Brand: '#cc785cff',
    Disabled: '#bfbfbaff',
    Focus: '#3889ddff',
    Destructive: '#bf4d43ff',
    Warning: '#ddad11ff',
    Success: '#6bb765ff',
  },
  border: {
    Default: '#bfbfbaff',
    Subtle: '#e5e4dfff',
    Strong: '#91918dff',
    FocusWeak: '#b7d3eeff',
    DestructiveWeak: '#f7eeedff',
    WarningWeak: '#f4efe0ff',
    SuccessWeak: '#e9f1e9ff',
    FocusDefault: '#61aaf2ff',
    SuccessDefault: '#6bb765ff',
    WarningDefault: '#ddad11ff',
    DestructiveDefault: '#bf4d43ff',
    DestructiveStrong: '#8a2423ff',
    FocusStrong: '#3889ddff',
    Emphasis: '#191919ff',
  },
  icon: {
    Default: '#666663ff',
    Inverse: '#f0f0ebff',
    Accent: '#cc785cff',
    AccentWeak: '#d4a27fff',
    Emphasis: '#191919ff',
    Success: '#6bb765ff',
    Warning: '#ddad11ff',
    Destructive: '#bf4d43ff',
    Disabled: '#91918dff',
  },
  button: {
    BackgroundPrimaryDefault: '#cc785cff',
    BackgroundPrimaryHover: '#d4a27fff',
    BackgroundPrimaryDisabled: '#ebdbbcff',
    BackgroundSecondary: '#000000ff',
    BackgroundSecondaryHover: '#40403eff',
    BackgroundSecondaryDisabled: '#91918dff',
    BackgroundTertiaryDefault: '#fafaf7ff',
    BackgroundTertiaryHover: '#e5e4dfff',
    BackgroundSuccessDefault: '#6bb765ff',
    BackgroundSuccessDisabled: '#e9f1e9ff',
    BackgroundDestructiveDefault: '#8a2423ff',
    BackgroundDestructiveHover: '#bf4d43ff',
    BorderFocus: '#3889ddff',
    BorderDestructive: '#bf4d43ff',
    BorderSuccess: '#6bb765ff',
    BorderDefault: '#bfbfbaff',
    BorderHover: '#91918dff',
    shadow: '#e5e4dfff',
    BackgroundDestructiveDisabled: '#f7eeedff',
    BackgroundSuccessHover: '#468040ff',
    BorderEmphasis: '#191919ff',
  },
  input: {
    BackgroundDefault: '#ffffffff',
    BorderFocus: '#b7d3eeff',
    BorderDefault: '#bfbfbaff',
    BorderHover: '#91918dff',
    BorderDestructive: '#bf4d43ff',
    BorderSuccess: '#6bb765ff',
    BackgroundReadOnly: '#fafaf7ff',
  },
  black: '#000000ff',
  white: '#ffffffff',
  turquoise: '#bcd1caff',
  purple: '#cbcadbff',
  pink: '#c46686ff',
  darkblue: '#6a9bccff',
  darkgreen: '#788c5dff',
} as const;

export type ColorToken = keyof typeof colors;

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
export type InputColors = typeof colors.input;
