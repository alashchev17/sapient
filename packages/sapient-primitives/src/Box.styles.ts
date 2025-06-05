/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type { BoxStyleProps } from './types';
import { responsiveTokenStyle } from './utils';
import type { Theme } from '@sapiently/theme';

export const boxStyles = (props: BoxStyleProps, theme: Theme) => {
  return css({
    boxSizing: 'border-box',
    // margins - all sides
    ...responsiveTokenStyle('margin', props.m, theme.spacing, theme),
    // margins - directional (x/y axis)
    ...responsiveTokenStyle('marginLeft', props.mx, theme.spacing, theme),
    ...responsiveTokenStyle('marginRight', props.mx, theme.spacing, theme),
    ...responsiveTokenStyle('marginTop', props.my, theme.spacing, theme),
    ...responsiveTokenStyle('marginBottom', props.my, theme.spacing, theme),
    // margins - individual sides
    ...responsiveTokenStyle('marginTop', props.mt, theme.spacing, theme),
    ...responsiveTokenStyle('marginRight', props.mr, theme.spacing, theme),
    ...responsiveTokenStyle('marginBottom', props.mb, theme.spacing, theme),
    ...responsiveTokenStyle('marginLeft', props.ml, theme.spacing, theme),
    // paddings - all sides
    ...responsiveTokenStyle('padding', props.p, theme.spacing, theme),
    // paddings - directional (x/y axis)
    ...responsiveTokenStyle('paddingLeft', props.px, theme.spacing, theme),
    ...responsiveTokenStyle('paddingRight', props.px, theme.spacing, theme),
    ...responsiveTokenStyle('paddingTop', props.py, theme.spacing, theme),
    ...responsiveTokenStyle('paddingBottom', props.py, theme.spacing, theme),
    // paddings - individual sides
    ...responsiveTokenStyle('paddingTop', props.pt, theme.spacing, theme),
    ...responsiveTokenStyle('paddingRight', props.pr, theme.spacing, theme),
    ...responsiveTokenStyle('paddingBottom', props.pb, theme.spacing, theme),
    ...responsiveTokenStyle('paddingLeft', props.pl, theme.spacing, theme),
    // colors
    ...(props.bg
      ? { backgroundColor: theme.colors.background[props.bg] }
      : {}),
    ...(props.borderColor
      ? { border: `1px solid ${theme.colors.border[props.borderColor]}` }
      : {}),
    ...(props.borderRadius
      ? { borderRadius: theme.radii[props.borderRadius] }
      : {}),
    ...(props.shadow
      ? { boxShadow: theme.shadows[props.shadow] }
      : {}),
    // layout
    ...(props.display ? { display: props.display } : {}),
    ...(props.width != null
      ? {
          width:
            typeof props.width === 'number'
              ? `${props.width}px`
              : props.width
        }
      : {}),
    ...(props.height != null
      ? {
          height:
            typeof props.height === 'number'
              ? `${props.height}px`
              : props.height
        }
      : {})
  });
};
