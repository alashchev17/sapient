/** @jsxImportSource @emotion/react */
import { useTheme } from '@sapiently/theme';
import { forwardRef, useId } from 'react';
import { Box, Flex, Text } from '@sapiently/primitives';
import { HelpText } from '@sapiently/help-text';
import { css } from '@emotion/react';

import { RadioGroupProps } from './types';

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      helpText,
      name,
      disabled = false,
      required = false,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const generatedName = useId();
    const radioName = name || generatedName;
    const helpTextId = `${radioName}-help`;

    // Hidden radio input
    const hiddenRadioStyles = css({
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0,
      margin: 0,
      padding: 0,
      pointerEvents: 'none',

      '&:focus + div': {
        outline: `2px solid ${theme.colors.border.FocusDefault}`,
        outlineOffset: '2px',
      },

      '&:focus-visible + div': {
        outline: `2px solid ${theme.colors.border.FocusDefault}`,
        outlineOffset: '2px',
      },

      '&:focus:not(:focus-visible) + div': {
        outline: 'none',
      },
    });

    // Custom radio button styles matching design system
    const getCustomRadioStyles = (isChecked: boolean, isDisabled: boolean) =>
      css({
        width: theme.spacing.spacer40,
        height: theme.spacing.spacer40,
        borderRadius: '50%',
        border: `2px solid ${
          isDisabled
            ? theme.colors.border.Subtle
            : isChecked
              ? theme.colors.border.FocusDefault
              : theme.colors.border.Default
        }`,
        backgroundColor:
          isChecked && !isDisabled
            ? theme.colors.background.FocusDefault
            : theme.colors.background.Surface,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        // Inner dot for selected state
        '&::after':
          isChecked && !isDisabled
            ? {
                content: '""',
                width: theme.spacing.spacer20,
                height: theme.spacing.spacer20,
                borderRadius: '50%',
                backgroundColor: theme.colors.background.Surface,
              }
            : {},

        '&:hover': isDisabled
          ? {}
          : {
              borderColor: isChecked ? theme.colors.border.FocusStrong : theme.colors.border.Strong,
            },
      });

    const handleChange = (optionValue: string) => {
      if (!disabled) {
        onChange?.(optionValue);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent, currentIndex: number) => {
      if (disabled) return;

      let nextIndex = currentIndex;

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          nextIndex = (currentIndex + 1) % options.length;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          nextIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
          break;
        default:
          return;
      }

      // Find next non-disabled option
      while (options[nextIndex]?.disabled && nextIndex !== currentIndex) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
          nextIndex = (nextIndex + 1) % options.length;
        } else {
          nextIndex = nextIndex === 0 ? options.length - 1 : nextIndex - 1;
        }
      }

      if (!options[nextIndex]?.disabled) {
        handleChange(options[nextIndex].value);
      }
    };

    const displayedHelpText = errorMessage || helpText;

    return (
      <Box as="fieldset" ref={ref} m="spacer0" p="spacer0" style={{ border: 'none' }} {...props}>
        {label && (
          <Box mb="spacer20">
            <Text as="legend" variant="p2" color="Default" weight="medium">
              {label}
              {required && (
                <Text as="span" color="Destructive" style={{ marginLeft: theme.spacing.spacer10 }}>
                  *
                </Text>
              )}
            </Text>
          </Box>
        )}

        {displayedHelpText && (
          <Box mb="spacer20">
            <HelpText id={helpTextId} variant={errorMessage ? 'error' : 'default'}>
              {displayedHelpText}
            </HelpText>
          </Box>
        )}

        <Flex direction="column" gap="spacer30">
          {options.map((option, index) => {
            const isChecked = value === option.value;
            const isDisabled = disabled || Boolean(option.disabled);

            return (
              <Flex
                key={option.value}
                align="start"
                gap="spacer30"
                as="label"
                style={{
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.5 : 1,
                }}
              >
                <Box style={{ position: 'relative' }}>
                  <input
                    type="radio"
                    name={radioName}
                    value={option.value}
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => handleChange(option.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    css={hiddenRadioStyles}
                    aria-describedby={displayedHelpText ? helpTextId : undefined}
                    required={required}
                  />
                  <div css={getCustomRadioStyles(isChecked, isDisabled)} />
                </Box>
                <Flex direction="column" gap="spacer10" style={{ flex: 1 }}>
                  <Text variant="p2" color="Default" weight="normal">
                    {option.label}
                  </Text>
                  {option.helpText && (
                    <Text variant="p3" color="Muted">
                      {option.helpText}
                    </Text>
                  )}
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Box>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
