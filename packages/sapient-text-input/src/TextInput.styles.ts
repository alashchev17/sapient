import { css } from '@emotion/react';
import { Theme } from '@sapiently/theme';
import { Size } from '@sapiently/core';
import { InputState } from './types';

interface InputStyleProps {
  theme: Theme;
  size: Size;
  hasPrefix: boolean;
  hasSuffix: boolean;
  disabled: boolean;
  readOnly: boolean;
}

export const getInputStyles = ({
  theme,
  size,
  hasPrefix,
  hasSuffix,
  disabled,
  readOnly,
}: InputStyleProps) => {
  // Size-based styles for input field (padding and font based on prefix/suffix)
  const sizeStyles = {
    small: {
      fontSize: theme.typography.p3.fontSize,
      padding: `${theme.spacing.spacer20} ${hasSuffix ? theme.spacing.spacer10 : theme.spacing.spacer30} ${theme.spacing.spacer20} ${hasPrefix ? theme.spacing.spacer10 : theme.spacing.spacer30}`,
    },
    medium: {
      fontSize: theme.typography.p2.fontSize,
      padding: `${theme.spacing.spacer20} ${hasSuffix ? theme.spacing.spacer10 : theme.spacing.spacer40} ${theme.spacing.spacer20} ${hasPrefix ? theme.spacing.spacer10 : theme.spacing.spacer40}`,
    },
    large: {
      fontSize: theme.typography.p1.fontSize,
      padding: `${theme.spacing.spacer30} ${hasSuffix ? theme.spacing.spacer10 : theme.spacing.spacer50} ${theme.spacing.spacer30} ${hasPrefix ? theme.spacing.spacer10 : theme.spacing.spacer50}`,
    },
  };

  return css({
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontFamily: theme.typography.p2.fontFamily,
    fontWeight: theme.typography.p2.fontWeight,
    lineHeight: theme.typography.p2.lineHeight,
    color: disabled ? theme.colors.text.Disabled : theme.colors.text.Default,
    cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'text',

    ...sizeStyles[size],

    '&::placeholder': {
      color: theme.colors.text.Subtle,
      opacity: 1,
    },
  });
};

interface WrapperStyleProps {
  theme: Theme;
  state: InputState;
  disabled: boolean;
  readOnly: boolean;
}

export const getWrapperStyles = ({ theme, state, disabled, readOnly }: WrapperStyleProps) => {
  // State-based styles for wrapper
  const getStateStyles = () => {
    if (disabled) {
      return {
        backgroundColor: theme.colors.background.Disabled,
        borderColor: theme.colors.border.Subtle,
        cursor: 'not-allowed',
        opacity: 0.5,
      };
    }

    if (readOnly || state === 'read-only') {
      return {
        backgroundColor: theme.colors.input.BackgroundReadOnly,
        borderColor: theme.colors.border.Default,
        cursor: 'default',
      };
    }

    switch (state) {
      case 'error':
        return {
          backgroundColor: theme.colors.input.BackgroundDefault,
          borderColor: theme.colors.input.BorderDestructive,
        };
      case 'success':
        return {
          backgroundColor: theme.colors.input.BackgroundDefault,
          borderColor: theme.colors.input.BorderSuccess,
        };
      default:
        return {
          backgroundColor: theme.colors.input.BackgroundDefault,
          borderColor: theme.colors.border.Default,
        };
    }
  };

  return css({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: '1px solid',
    borderRadius: theme.radii.border8,
    transition: 'all 0.2s ease',

    ...getStateStyles(),

    '&:focus-within': disabled
      ? {}
      : {
          borderColor: theme.colors.input.BorderFocus,
          outline: `2px solid ${theme.colors.input.BorderFocus}`,
          outlineOffset: '1px',
        },

    '&:hover:not(:focus-within)': disabled
      ? {}
      : {
          borderColor:
            state === 'error'
              ? theme.colors.input.BorderDestructive
              : state === 'success'
                ? theme.colors.input.BorderSuccess
                : theme.colors.input.BorderHover,
        },
  });
};

export const getContainerStyles = (theme: Theme, size: Size = 'medium') => ({
  container: css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.spacer10,
    width: '100%',
  }),

  prefix: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing.spacer30,
    color: theme.colors.icon.Default,
    flexShrink: 0,
    fontSize: size === 'small' ? theme.typography.p3.fontSize : size === 'large' ? theme.typography.p1.fontSize : theme.typography.p2.fontSize,
    lineHeight: size === 'small' ? theme.typography.p3.lineHeight : size === 'large' ? theme.typography.p1.lineHeight : theme.typography.p2.lineHeight,
  }),

  suffix: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: theme.spacing.spacer30,
    color: theme.colors.icon.Default,
    flexShrink: 0,
    fontSize: size === 'small' ? theme.typography.p3.fontSize : size === 'large' ? theme.typography.p1.fontSize : theme.typography.p2.fontSize,
    lineHeight: size === 'small' ? theme.typography.p3.lineHeight : size === 'large' ? theme.typography.p1.lineHeight : theme.typography.p2.lineHeight,
  }),
});
