import { css } from '@emotion/react';
import { Size } from '@sapiently/core';
import { Theme } from '@sapiently/theme';

import { ButtonVariants, ButtonShape, ButtonKind } from './types';

interface ButtonStyleProps {
  theme: Theme;
  variant: ButtonVariants;
  size: Size;
  disabled: boolean;
  shape: ButtonShape;
  kind: ButtonKind;
  loading: boolean;
}

export const getButtonStyles = ({
  theme,
  variant,
  size,
  disabled,
  shape,
  kind,
  loading,
}: ButtonStyleProps) => {
  // Get hover styles for variant
  const getHoverStyles = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hoverStyles: Record<ButtonVariants, any> = {
      primary: { backgroundColor: theme.colors.button.BackgroundPrimaryHover },
      secondary: { backgroundColor: theme.colors.button.BackgroundSecondaryHover },
      tertiary: {
        backgroundColor: theme.colors.button.BackgroundTertiaryHover,
        borderColor: theme.colors.button.BorderHover,
      },
      danger: { backgroundColor: theme.colors.button.BackgroundDestructiveHover },
      success: { backgroundColor: theme.colors.button.BackgroundSuccessHover },
    };
    return hoverStyles[variant];
  };

  // Get size styles based on kind and shape
  const getSizeStyles = () => {
    const baseSizes = {
      small: {
        fontSize: theme.typography.p3.fontSize,
        gap: theme.spacing.spacer20,
      },
      medium: {
        fontSize: theme.typography.p2.fontSize,
        gap: theme.spacing.spacer20,
      },
      large: {
        fontSize: theme.typography.h4.fontSize,
        gap: theme.spacing.spacer30,
        borderRadius: theme.radii.border8,
        fontWeight: theme.typography.h4.fontWeight,
      },
    };

    // Icon-only buttons (square for circle shape)
    if (kind === 'icon-only') {
      const iconOnlySizes = {
        small: {
          width: '2rem',
          height: '2rem',
          padding: '0',
        },
        medium: {
          width: '2.5rem',
          height: '2.5rem',
          padding: '0',
        },
        large: {
          width: '3rem',
          height: '3rem',
          padding: '0',
        },
      };
      return { ...baseSizes[size], ...iconOnlySizes[size] };
    }

    // Regular buttons with text
    const textButtonSizes = {
      small: {
        paddingLeft: theme.spacing.spacer30,
        paddingRight: theme.spacing.spacer30,
        paddingTop: theme.spacing.spacer20,
        paddingBottom: theme.spacing.spacer20,
      },
      medium: {
        paddingLeft: theme.spacing.spacer40,
        paddingRight: theme.spacing.spacer40,
        paddingTop: theme.spacing.spacer20,
        paddingBottom: theme.spacing.spacer20,
      },
      large: {
        paddingLeft: theme.spacing.spacer60,
        paddingRight: theme.spacing.spacer60,
        paddingTop: theme.spacing.spacer30,
        paddingBottom: theme.spacing.spacer30,
      },
    };

    return { ...baseSizes[size], ...textButtonSizes[size] };
  };

  // Get variant styles
  const getVariantStyles = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const variantStyles: Record<ButtonVariants, any> = {
      primary: {
        backgroundColor: theme.colors.button.BackgroundPrimaryDefault,
        color: theme.colors.text.Default,
      },
      secondary: {
        backgroundColor: theme.colors.button.BackgroundSecondary,
        color: theme.colors.text.Inverse,
      },
      tertiary: {
        backgroundColor: theme.colors.button.BackgroundTertiaryDefault,
        color: theme.colors.text.Default,
        border: `1px solid ${theme.colors.button.BorderDefault}`,
      },
      danger: {
        backgroundColor: theme.colors.button.BackgroundDestructiveDefault,
        color: theme.colors.text.Inverse,
      },
      success: {
        backgroundColor: theme.colors.button.BackgroundSuccessDefault,
        color: theme.colors.text.Inverse,
      },
    };
    return variantStyles[variant];
  };

  return css({
    // Base styles
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.typography.p3.fontWeight,
    borderRadius: shape === 'circle' ? '50%' : theme.radii.border4,
    transition: 'all 0.2s ease',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.5 : 1,
    fontFamily: theme.typography.p3.fontFamily,
    outline: 'none',
    position: 'relative',

    // Size and variant styles
    ...getSizeStyles(),
    ...getVariantStyles(),

    // Hover styles (only when not disabled or loading)
    '&:hover': disabled || loading ? {} : getHoverStyles(),

    // Focus styles for accessibility
    '&:focus': {
      outline: `2px solid ${theme.colors.button.BorderFocus}`,
      outlineOffset: '2px',
      ...(variant === 'tertiary' ? { boxShadow: theme.shadows.shadowmedium } : {}),
    },

    // Focus-visible for better keyboard navigation
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.button.BorderFocus}`,
      outlineOffset: '2px',
      ...(variant === 'tertiary' ? { boxShadow: theme.shadows.shadowmedium } : {}),
    },

    // Remove focus outline when not using keyboard
    '&:focus:not(:focus-visible)': {
      outline: 'none',
    },
  });
};
