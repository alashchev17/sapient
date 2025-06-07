/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type { BoxProps } from '@sapiently/primitives';

export interface VariantStyleProps {
  variant: 'text' | 'circular' | 'rectangular';
  width?: BoxProps['width'];
  height?: BoxProps['height'];
  borderRadius?: BoxProps['borderRadius'];
}

export const getVariantStyles = ({
  variant,
  width,
  height,
  borderRadius,
}: VariantStyleProps) => {
  switch (variant) {
    case 'text':
      return css({
        height: '1rem',
        borderRadius: borderRadius || 'border4',
      });
    
    case 'circular':
      return css({
        width: width || height,
        height: height || width,
        borderRadius: '50%',
      });
    
    case 'rectangular':
    default:
      return css({
        borderRadius: borderRadius || 'border4',
      });
  }
};
