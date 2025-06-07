/** @jsxImportSource @emotion/react */
import { forwardRef } from 'react';
import { css, keyframes } from '@emotion/react';
import { Box, type BoxProps } from '@sapiently/primitives';
import { getVariantStyles } from './Skeleton.styles';

export interface SkeletonProps extends Omit<BoxProps, 'bg'> {
  /**
   * Width of the skeleton
   * @default '100%'
   */
  width?: BoxProps['width'];

  /**
   * Height of the skeleton
   * @default '1rem'
   */
  height?: BoxProps['height'];

  /**
   * Whether to animate the skeleton
   * @default true
   */
  animate?: boolean;

  /**
   * Predefined skeleton variants
   */
  variant?: 'text' | 'circular' | 'rectangular';

  /**
   * Number of text lines (only for text variant)
   * @default 1
   */
  lines?: number;
}

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
`;

const getSkeletonStyles = (animate: boolean) => css`
  background: linear-gradient(90deg, #f0f0eb 0%, #e5e4df 50%, #f0f0eb 100%);
  background-size: 200% 100%;
  ${animate &&
  css`
    animation: ${pulse} 1.5s ease-in-out infinite;
  `}
`;

export const Skeleton = forwardRef<HTMLElement, SkeletonProps>(
  (
    {
      width = '100%',
      height = '1rem',
      animate = true,
      variant = 'rectangular',
      lines = 1,
      borderRadius,
      ...props
    },
    ref
  ) => {
    // Handle variant-specific styling
    const variantStyles = getVariantStyles({
      variant,
      width,
      height,
      borderRadius,
    });

    // For multiple text lines, render a stack of skeletons
    if (variant === 'text' && lines > 1) {
      return (
        <Box {...props}>
          {Array.from({ length: lines }, (_, index) => (
            <Box
              key={index}
              width={index === lines - 1 ? '80%' : '100%'} // Last line shorter
              height={height}
              style={{
                marginBottom: index < lines - 1 ? '0.5rem' : undefined,
                ...props.style,
              }}
              css={[
                getSkeletonStyles(animate),
                getVariantStyles({
                  variant: 'text',
                  width,
                  height,
                  borderRadius,
                })
              ]}
            />
          ))}
        </Box>
      );
    }

    return (
      <Box
        ref={ref}
        width={width}
        height={height}
        css={[getSkeletonStyles(animate), variantStyles]}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
