import { Variant, Size } from '@sapiently/core';
import { Theme } from '@sapiently/theme';
import { CSSProperties } from 'react';

interface ButtonStyleProps {
  theme: Theme;
  variant: Variant;
  size: Size;
  fullWidth: boolean;
  disabled: boolean;
}

export const getButtonStyles = ({
  theme,
  variant,
  size,
  fullWidth,
  disabled,
}: ButtonStyleProps): CSSProperties => {
  const baseStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.typography.p3.fontWeight,
    borderRadius: theme.radii.bordersmall,
    transition: 'all 0.2s ease',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: theme.typography.p3.fontFamily,
    outline: 'none',
  };

  // Size styles
  const sizeStyles: Record<Size, CSSProperties> = {
    small: {
      paddingLeft: theme.spacing.spacer30,
      paddingRight: theme.spacing.spacer30,
      paddingTop: theme.spacing.spacer20,
      paddingBottom: theme.spacing.spacer20,
      fontSize: theme.typography.p3.fontSize,
    },
    medium: {
      paddingLeft: theme.spacing.spacer40,
      paddingRight: theme.spacing.spacer40,
      paddingTop: theme.spacing.spacer20,
      paddingBottom: theme.spacing.spacer20,
      fontSize: theme.typography.p2.fontSize,
    },
    large: {
      paddingLeft: theme.spacing.spacer60,
      paddingRight: theme.spacing.spacer60,
      paddingTop: theme.spacing.spacer30,
      paddingBottom: theme.spacing.spacer30,
      fontSize: theme.typography.p1.fontSize,
    },
  };

  // Variant styles
  const variantStyles: Record<Variant, CSSProperties> = {
    primary: {
      backgroundColor: theme.colors.button.BackgroundPrimaryDefault,
      color: theme.colors.white,
    },
    secondary: {
      backgroundColor: theme.colors.button.BackgroundSecondary,
      color: theme.colors.gray[900],
    },
    // @ts-expect-error will be fixed in the future
    tertiary: {
      backgroundColor: theme.colors.button.BackgroundTertiaryDefault,
      color: theme.colors.gray[900],
    },
    danger: {
      backgroundColor: theme.colors.button.BackgroundDestructiveDefault,
      color: theme.colors.white,
    },
    success: {
      backgroundColor: theme.colors.button.BackgroundSuccessDefault,
      color: theme.colors.white,
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};
