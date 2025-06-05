import { forwardRef } from 'react';
import { Text, type TextProps } from '@sapiently/primitives';

export interface ParagraphProps extends Omit<TextProps, 'variant'> {
  /**
   * Size variant for the paragraph
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Bottom margin spacing
   * @default 'spacer40'
   */
  marginBottom?: string;
}

export const Paragraph = forwardRef<HTMLElement, ParagraphProps>(
  ({ size = 'medium', marginBottom = 'spacer40', as = 'p', ...props }, ref) => {
    // Map size to typography variant
    const getVariant = () => {
      switch (size) {
        case 'small': return 'p3';
        case 'medium': return 'p1';
        case 'large': return 'p1'; // Could map to a larger variant if available
        default: return 'p1';
      }
    };

    return (
      <Text
        ref={ref}
        as={as}
        variant={getVariant()}
        style={{ marginBottom, ...props.style }}
        {...props}
      />
    );
  }
);

Paragraph.displayName = 'Paragraph';
