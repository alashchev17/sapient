/** @jsxImportSource @emotion/react */
import { forwardRef, type ElementType } from 'react';
import { useTheme } from '@sapiently/theme';
import type { BoxProps } from './types';
import { boxStyles } from './Box.styles';

export const Box = forwardRef<HTMLElement, BoxProps>((allProps, ref) => {
  const theme = useTheme();
  const {
    as = 'div',
    children,
    // margin props
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    // padding props
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    // style props
    bg,
    borderColor,
    borderRadius,
    shadow,
    display,
    width,
    height,
    ...htmlProps
  } = allProps;

  const styleProps = {
    // margin props
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    // padding props
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    // style props
    bg,
    borderColor,
    borderRadius,
    shadow,
    display,
    width,
    height,
  };

  const Element = as as ElementType;

  return (
    <Element ref={ref} css={boxStyles(styleProps, theme)} {...htmlProps}>
      {children}
    </Element>
  );
});

Box.displayName = 'Box';
