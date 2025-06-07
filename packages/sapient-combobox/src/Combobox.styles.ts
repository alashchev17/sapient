import { css } from '@emotion/react';
import { Theme } from '@sapiently/theme';
import { InputState } from '@sapiently/text-input';

interface ComboboxStyleProps {
  theme: Theme;
  isOpen: boolean;
  maxVisibleOptions: number;
  state?: InputState;
  disabled?: boolean;
}

export const getComboboxStyles = ({
  theme,
  isOpen,
  maxVisibleOptions,
  state = 'default',
  disabled = false,
}: ComboboxStyleProps) => {
  // Get border color based on state
  const getBorderColor = () => {
    if (disabled) return theme.colors.border.Subtle;
    switch (state) {
      case 'error':
        return theme.colors.input.BorderDestructive;
      case 'success':
        return theme.colors.input.BorderSuccess;
      case 'focused':
        return theme.colors.input.BorderFocus;
      default:
        return theme.colors.border.Default;
    }
  };

  return {
    container: css({
      position: 'relative',
      width: '100%',
    }),

    inputWrapper: css({
      position: 'relative',
      width: '100%',
    }),

    customInput: css({
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      minHeight: '2.5rem',
      padding: `${theme.spacing.spacer20} ${theme.spacing.spacer40}`,
      paddingRight: theme.spacing.spacer60, // Space for dropdown icon
      border: `1px solid ${getBorderColor()}`,
      borderRadius: theme.radii.border8,
      backgroundColor: disabled
        ? theme.colors.background.Disabled
        : theme.colors.background.Surface,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      gap: theme.spacing.spacer10,
      flexWrap: 'wrap',
      opacity: disabled ? 0.5 : 1,

      '&:hover': disabled
        ? {}
        : {
            borderColor:
              state === 'error'
                ? theme.colors.input.BorderDestructive
                : state === 'success'
                  ? theme.colors.input.BorderSuccess
                  : theme.colors.border.Strong,
          },

      '&:focus-within': disabled
        ? {}
        : {
            borderColor: theme.colors.input.BorderFocus,
            outline: `2px solid ${theme.colors.input.BorderFocus}`,
            outlineOffset: '1px',
          },
    }),

    hiddenInput: css({
      border: 'none',
      outline: 'none',
      background: 'transparent',
      flex: 1,
      minWidth: '120px',
      fontFamily: theme.typography.p2.fontFamily,
      fontSize: theme.typography.p2.fontSize,
      color: theme.colors.text.Default,

      '&::placeholder': {
        color: theme.colors.text.Subtle,
      },

      '&:disabled': {
        cursor: 'not-allowed',
      },
    }),

    inlineTagContainer: css({
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.spacing.spacer10,
      alignItems: 'center',
    }),

    inlineTag: css({
      display: 'inline-flex',
      alignItems: 'center',
      gap: theme.spacing.spacer10,
      padding: `${theme.spacing.spacer10} ${theme.spacing.spacer20}`,
      backgroundColor: theme.colors.background.Surface,
      border: `1px solid ${theme.colors.border.Default}`,
      color: theme.colors.text.Default,
      borderRadius: theme.radii.border8,
      fontSize: theme.typography.p3.fontSize,
      fontFamily: theme.typography.p3.fontFamily,
    }),

    inlineTagRemove: css({
      background: 'none',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      color: theme.colors.text.Muted,
      cursor: 'pointer',
      padding: 0,
      fontSize: '14px',
      lineHeight: 1,

      '&:hover': {
        color: theme.colors.text.Default,
      },
    }),

    dropdownIcon: css({
      position: 'absolute',
      right: theme.spacing.spacer30,
      height: '16px',
      top: '50%',
      transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}`,
      transition: 'transform 0.2s ease',
      color: theme.colors.icon.Default,
      pointerEvents: 'none',
      zIndex: 1,
    }),

    dropdown: css({
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: theme.colors.background.Surface,
      border: `1px solid ${theme.colors.border.Default}`,
      borderRadius: theme.radii.border8,
      boxShadow: theme.shadows.shadowmedium,
      marginTop: theme.spacing.spacer10,
      maxHeight: `${maxVisibleOptions * 3}rem`,
      overflowY: 'auto',

      // Hide scrollbar but keep functionality
      scrollbarWidth: 'thin',
      scrollbarColor: `${theme.colors.border.Default} transparent`,

      '&::-webkit-scrollbar': {
        width: '6px',
      },

      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.colors.border.Default,
        borderRadius: '3px',
      },
    }),

    option: css({
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.spacer20,
      padding: `${theme.spacing.spacer30} ${theme.spacing.spacer40}`,
      cursor: 'pointer',
      fontSize: theme.typography.p2.fontSize,
      fontFamily: theme.typography.p2.fontFamily,
      color: theme.colors.text.Default,
      backgroundColor: 'transparent',
      border: 'none',
      width: '100%',
      textAlign: 'left',
      transition: 'background-color 0.2s ease',

      '&:hover': {
        backgroundColor: theme.colors.background.Subtle,
      },

      '&:focus': {
        outline: 'none',
        backgroundColor: theme.colors.background.Subtle,
      },
    }),

    disabledOption: css({
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    }),

    optionContent: css({
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    }),

    optionDescription: css({
      fontSize: theme.typography.p3.fontSize,
      color: theme.colors.text.Muted,
      marginTop: theme.spacing.spacer10,
    }),

    noOptions: css({
      padding: `${theme.spacing.spacer40} ${theme.spacing.spacer40}`,
      textAlign: 'center',
      color: theme.colors.text.Muted,
      fontSize: theme.typography.p2.fontSize,
      fontStyle: 'italic',
    }),

    tagContainer: css({
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.spacing.spacer10,
      marginBottom: theme.spacing.spacer10,
    }),

    tag: css({
      display: 'inline-flex',
      alignItems: 'center',
      gap: theme.spacing.spacer10,
      padding: `${theme.spacing.spacer10} ${theme.spacing.spacer20}`,
      backgroundColor: theme.colors.background.PrimaryWeak,
      color: theme.colors.text.Default,
      border: `0.5px solid ${theme.colors.border.Default}`,
      borderRadius: theme.radii.border8,
      fontSize: theme.typography.p3.fontSize,
      fontFamily: theme.typography.p3.fontFamily,
    }),

    tagRemove: css({
      background: 'none',
      border: 'none',
      color: theme.colors.text.Muted,
      cursor: 'pointer',
      padding: 0,
      fontSize: '14px',
      lineHeight: 1,

      '&:hover': {
        color: theme.colors.text.Default,
      },
    }),
  };
};
