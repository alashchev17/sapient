import type {
  MarginToken,
  PaddingToken,
  GapToken,
  BackgroundColorToken,
  BorderColorToken,
  BorderRadiusToken,
  ShadowToken,
  TypographyToken,
  TextColorToken,
} from '@sapiently/design-tokens';
import type { ResponsiveValue } from '@sapiently/core';
import type { HTMLAttributes } from 'react';

/**
 * BOX
 */
export interface BoxStyleProps {
  // spacing - margin
  m?: ResponsiveValue<MarginToken>;
  mx?: ResponsiveValue<MarginToken>;
  my?: ResponsiveValue<MarginToken>;
  mt?: ResponsiveValue<MarginToken>;
  mr?: ResponsiveValue<MarginToken>;
  mb?: ResponsiveValue<MarginToken>;
  ml?: ResponsiveValue<MarginToken>;
  // spacing - padding
  p?: ResponsiveValue<PaddingToken>;
  px?: ResponsiveValue<PaddingToken>;
  py?: ResponsiveValue<PaddingToken>;
  pt?: ResponsiveValue<PaddingToken>;
  pr?: ResponsiveValue<PaddingToken>;
  pb?: ResponsiveValue<PaddingToken>;
  pl?: ResponsiveValue<PaddingToken>;
  // colors & borders
  bg?: BackgroundColorToken;
  borderColor?: BorderColorToken;
  borderRadius?: BorderRadiusToken;
  shadow?: ShadowToken;
  // layout
  display?: 'block' | 'inline-block' | 'inline-flex' | 'flex' | 'grid';
  width?: number | string;
  height?: number | string;
}

export interface BoxProps extends BoxStyleProps, Omit<HTMLAttributes<HTMLElement>, 'css'> {
  as?: keyof JSX.IntrinsicElements;
}

/**
 * TEXT
 */
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextWeight = 'normal' | 'medium' | 'bold';

export interface TextStyleProps {
  variant?: TypographyToken;
  color?: TextColorToken;
  align?: TextAlign;
  weight?: TextWeight;
  truncate?: boolean;
}

export interface TextProps extends TextStyleProps, Omit<HTMLAttributes<HTMLElement>, 'css' | 'color'> {
  as?: keyof JSX.IntrinsicElements;
}

/**
 * FLEX
 */
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface FlexProps extends BoxProps {
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: FlexWrap;
  gap?: ResponsiveValue<GapToken>;
}
