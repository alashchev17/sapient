/** @jsxImportSource @emotion/react */
import { forwardRef } from 'react';
import { useTheme } from '@sapiently/theme';
import { css } from '@emotion/react';
import { Box } from './Box';
import type { FlexProps } from './types';
import { responsiveTokenStyle } from './utils';
import type { Theme } from '@sapiently/theme';

const alignMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline'
} as const;

const justifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly'
} as const;

const getFlexStyles = (props: Pick<FlexProps, 'direction' | 'align' | 'justify' | 'wrap' | 'gap'>, theme: Theme) => {
  return css({
    ...(props.direction ? { flexDirection: props.direction } : {}),
    ...(props.align ? { alignItems: alignMap[props.align] } : {}),
    ...(props.justify ? { justifyContent: justifyMap[props.justify] } : {}),
    ...(props.wrap ? { flexWrap: props.wrap } : {}),
    ...responsiveTokenStyle('gap', props.gap, theme.spacing, theme)
  });
};

export const Flex = forwardRef<HTMLElement, FlexProps>((allProps, ref) => {
  const theme = useTheme();
  const { 
    // Flex-specific props
    direction, align, justify, wrap, gap,
    // Display defaults to flex for Flex component
    display = 'flex',
    ...boxProps 
  } = allProps;
  
  const flexSpecificProps = { direction, align, justify, wrap, gap };
  
  return (
    <Box 
      ref={ref} 
      display={display}
      css={getFlexStyles(flexSpecificProps, theme)}
      {...boxProps}
    />
  );
});

Flex.displayName = 'Flex';
