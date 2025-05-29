import { CSSProperties } from 'react';
import { Theme } from '@sapiently/theme';
import { Variant, Size } from '@sapiently/core';

interface ButtonStyleProps {
  theme: Theme;
  variant: Variant;
  size: Size;
  fullWidth: boolean;
  disabled: boolean;
}

export const getButtonStyles = ({ theme, variant, size, fullWidth, disabled }: ButtonStyleProps): CSSProperties => {
  const baseStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.typography.fontWeights.medium,
    borderRadius: theme.radii.md,
    transition: 'all 0.2s ease',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: theme.typography.fonts.body,
    outline: 'none',
  };
  
  // Size styles
  const sizeStyles: Record<Size, CSSProperties> = {
    small: {
      paddingLeft: theme.spacing[3],
      paddingRight: theme.spacing[3],
      paddingTop: theme.spacing[2],
      paddingBottom: theme.spacing[2],
      fontSize: theme.typography.fontSizes.sm,
    },
    medium: {
      paddingLeft: theme.spacing[4],
      paddingRight: theme.spacing[4],
      paddingTop: theme.spacing[2],
      paddingBottom: theme.spacing[2],
      fontSize: theme.typography.fontSizes.md,
    },
    large: {
      paddingLeft: theme.spacing[6],
      paddingRight: theme.spacing[6],
      paddingTop: theme.spacing[3],
      paddingBottom: theme.spacing[3],
      fontSize: theme.typography.fontSizes.lg,
    },
  };
  
  // Variant styles  
  const variantStyles: Record<Variant, CSSProperties> = {
    primary: {
      backgroundColor: theme.colors.primary[600],
      color: theme.colors.white,
    },
    secondary: {
      backgroundColor: theme.colors.gray[200],
      color: theme.colors.gray[900],
    },
    danger: {
      backgroundColor: theme.colors.error.main,
      color: theme.colors.white,
    },
    warning: {
      backgroundColor: theme.colors.warning.main,
      color: theme.colors.white,
    },
    success: {
      backgroundColor: theme.colors.success.main,
      color: theme.colors.white,
    },
    neutral: {
      backgroundColor: theme.colors.gray[600],
      color: theme.colors.white,
    },
  };
  
  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};
