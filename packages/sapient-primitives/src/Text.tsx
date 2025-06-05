/** @jsxImportSource @emotion/react */
import { forwardRef, useMemo, type ElementType } from 'react';
import { useTheme } from '@sapiently/theme';
import type { TextProps } from './types';
import { textStyles } from './Text.styles';

export const Text = forwardRef<HTMLElement, TextProps>((allProps, ref) => {
  const theme = useTheme();
  const {
    as,
    variant = 'p1',
    color = 'Default',
    align,
    weight,
    truncate = false,
    children,
    ...htmlProps
  } = allProps;

  // pick a default tag if none supplied
  const defaultTag = useMemo(() => {
    if (/^h[1-6]$/.test(variant)) {
      return variant;
    }
    if (/^h[1-6]Display$/.test(variant)) {
      return variant.replace(/Display$/, '') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    }
    return 'p';
  }, [variant]);

  const Element = (as || defaultTag) as ElementType;

  return (
    <Element
      ref={ref}
      css={textStyles({ variant, color, align, weight, truncate }, theme)}
      {...htmlProps}
    >
      {children}
    </Element>
  );
});

Text.displayName = 'Text';
