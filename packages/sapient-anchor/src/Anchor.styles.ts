import { css } from '@emotion/react';
import { Theme } from '@sapiently/theme';
import { AnchorVariant } from './types';

interface AnchorStyleProps {
  theme: Theme;
  variant: AnchorVariant;
  disabled: boolean;
}

export const getAnchorStyles = ({ theme, variant, disabled }: AnchorStyleProps) => {
  const baseStyles = css({
    fontFamily: theme.typography.p2.fontFamily,
    fontSize: theme.typography.p2.fontSize,
    fontWeight: theme.typography.p2.fontWeight,
    lineHeight: theme.typography.p2.lineHeight,
    textDecoration: 'underline',
    transition: 'color 0.2s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    
    // Default state
    color: theme.colors.text.Focus,
    
    // Hover state
    '&:hover': disabled ? {} : {
      color: theme.colors.text.Brand,
    },
    
    // Active state
    '&:active': disabled ? {} : {
      color: theme.colors.text.Default,
    },
    
    // Visited state
    '&:visited': disabled ? {} : {
      color: theme.colors.text.Muted,
    },
    
    // Focus state for accessibility
    '&:focus': {
      outline: `2px solid ${theme.colors.border.FocusDefault}`,
      outlineOffset: '2px',
    },
    
    // Focus-visible for better keyboard navigation
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.border.FocusDefault}`,
      outlineOffset: '2px',
    },
    
    // Remove focus outline when not using keyboard
    '&:focus:not(:focus-visible)': {
      outline: 'none',
    },
  });

  const variantStyles = {
    default: css({
      display: 'inline-block',
      padding: `${theme.spacing.spacer10} ${theme.spacing.spacer20}`,
    }),
    inline: css({
      display: 'inline',
      padding: 0,
    }),
  };

  return [baseStyles, variantStyles[variant]];
};
