/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type { TextStyleProps } from './types';
import type { Theme } from '@sapiently/theme';

export const textStyles = (props: TextStyleProps, theme: Theme) => {
  const variant = props.variant || 'p1';
  const color = props.color || 'Default';
  const t = theme.typography[variant];
  const weightMap = { normal: 400, medium: 500, bold: 700 };

  return css({
    margin: 0,
    fontFamily: t.fontFamily,
    fontSize: t.fontSize,
    fontWeight: props.weight
      ? weightMap[props.weight]
      : t.fontWeight,
    lineHeight: t.lineHeight,
    letterSpacing: t.letterSpacing,
    color: theme.colors.text[color],
    textAlign: props.align,
    ...(props.truncate
      ? {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '100%',
          display: 'block'
        }
      : {})
  });
};
