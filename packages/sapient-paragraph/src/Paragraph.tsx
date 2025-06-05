import { forwardRef } from 'react';
import { Text, type TextProps } from '@sapiently/primitives';

export interface ParagraphProps extends Omit<TextProps, 'variant'> {
  /**
   * Size variant for the paragraph
   * @default 'medium'
   */
  size?: '1' | '2' | '3';

  /**
   * Bottom margin spacing
   * @default 'spacer40'
   */
  marginBottom?: string;
}

export const Paragraph = forwardRef<HTMLElement, ParagraphProps>(
  ({ size = '2', marginBottom = 'spacer40', as = 'p', ...props }, ref) => {
    // Map size to typography variant
    const getVariant = () => {
      switch (size) {
        case '1':
          return 'p3';
        case '2':
          return 'p2';
        case '3':
          return 'p1'; // Could map to a larger variant if available
        default:
          return 'p1';
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
