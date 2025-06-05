/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import { Box, type BoxProps } from '@sapiently/primitives';
import { useTheme } from '@sapiently/theme';
import type { ComponentSpacingToken } from '@sapiently/design-tokens';

export type ListVariant = 'unordered' | 'ordered';

export interface ListProps extends Omit<BoxProps, 'as'> {
  /**
   * 'unordered' renders <ul>, 'ordered' renders <ol>
   * @default 'unordered'
   */
  variant?: ListVariant;
  /**
   * Spacing token for gap between items
   * @default 'spacer40'
   */
  spacing?: ComponentSpacingToken;
  /**
   * Override list-style-type CSS
   */
  styleType?: React.CSSProperties['listStyleType'];
  children?: React.ReactNode;
}

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>((props, ref) => {
  const {
    variant = 'unordered',
    spacing = 'spacer40',
    styleType,
    children,
    // all other BoxProps (margin, bg, borderRadius, etc.)
    ...boxProps
  } = props;

  const theme = useTheme();
  const Tag = variant === 'ordered' ? 'ol' : 'ul';
  const gap = theme.spacing[spacing];

  /**
   * Wrap anything that isn't already an <li> in <li>
   */
  const items = React.Children.toArray(children).map((child, index) => {
    return (
      <li
        key={index}
        css={{
          marginBottom: gap,
        }}
      >
        {child}
      </li>
    );
  });

  return (
    <Box
      ref={ref}
      as={Tag}
      css={{
        // Only override listStyleType if explicitly provided
        ...(styleType && { listStyleType: styleType }),
        margin: 0,
        // Let browser handle default padding for proper nesting
        paddingLeft: '2rem', // Standard browser default
      }}
      style={boxProps.style}
      {...boxProps}
    >
      {items}
    </Box>
  );
});

List.displayName = 'List';
