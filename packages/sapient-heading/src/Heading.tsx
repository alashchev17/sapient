import { forwardRef } from 'react';
import { Text, type TextProps } from '@sapiently/primitives';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingVariant = 'default' | 'display';

export interface HeadingProps extends Omit<TextProps, 'variant' | 'as'> {
  /**
   * Heading level (1-6)
   * @default 1
   */
  level?: HeadingLevel;
  
  /**
   * Heading variant style
   * @default 'default'
   */
  variant?: HeadingVariant;
  
  /**
   * Bottom margin spacing
   * @default 'spacer40'
   */
  marginBottom?: string;
  
  /**
   * Override the HTML element (useful for semantic purposes)
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
}

export const Heading = forwardRef<HTMLElement, HeadingProps>(
  ({ 
    level = 1, 
    variant = 'default', 
    marginBottom = 'spacer40', 
    as,
    ...props 
  }, ref) => {
    // Determine the semantic HTML element
    const semanticElement = as || (`h${level}` as const);
    
    // Map level and variant to typography variant
    const getTypographyVariant = () => {
      const levelMap = {
        1: variant === 'display' ? 'h1Display' : 'h1',
        2: variant === 'display' ? 'h2Display' : 'h2',
        3: variant === 'display' ? 'h3Display' : 'h3',
        4: variant === 'display' ? 'h4Display' : 'h4',
        5: variant === 'display' ? 'h5Display' : 'h5',
        6: variant === 'display' ? 'h6Display' : 'h6',
      } as const;
      return levelMap[level];
    };

    return (
      <Text
        ref={ref}
        as={semanticElement}
        variant={getTypographyVariant()}
        style={{ marginBottom, ...props.style }}
        {...props}
      />
    );
  }
);

Heading.displayName = 'Heading';
