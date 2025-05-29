import { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type ResponsiveValue<T> = T | T[];

export interface StyleProps {
  margin?: ResponsiveValue<string | number>;
  marginTop?: ResponsiveValue<string | number>;
  marginRight?: ResponsiveValue<string | number>;
  marginBottom?: ResponsiveValue<string | number>;
  marginLeft?: ResponsiveValue<string | number>;
  marginX?: ResponsiveValue<string | number>;
  marginY?: ResponsiveValue<string | number>;
  padding?: ResponsiveValue<string | number>;
  paddingTop?: ResponsiveValue<string | number>;
  paddingRight?: ResponsiveValue<string | number>;
  paddingBottom?: ResponsiveValue<string | number>;
  paddingLeft?: ResponsiveValue<string | number>;
  paddingX?: ResponsiveValue<string | number>;
  paddingY?: ResponsiveValue<string | number>;
}

export interface SapientProps<T = HTMLDivElement> extends HTMLAttributes<T>, StyleProps {
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
  sx?: CSSProperties;
}

export type Variant = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'neutral';
export type Size = 'small' | 'medium' | 'large';
