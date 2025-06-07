/** @jsxImportSource @emotion/react */
import { useTheme } from '@sapiently/theme';
import { forwardRef, useState, useId } from 'react';
import { Box, Text } from '@sapiently/primitives';
import { HelpText } from '@sapiently/help-text';
import { css } from '@emotion/react';

import { getInputStyles, getWrapperStyles, getContainerStyles } from './TextInput.styles';
import { TextAreaProps } from './types';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helpText,
      state = 'default',
      size = 'medium',
      required = false,
      id,
      errorMessage,
      successMessage,
      disabled = false,
      readOnly = false,
      rows = 4,
      resize = true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      prefix, // Extract and ignore prefix
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      suffix, // Extract and ignore suffix
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const generatedId = useId();
    const inputId = id || generatedId;
    const helpTextId = `${inputId}-help`;

    const [internalState, setInternalState] = useState(state);
    const currentState = state !== 'default' ? state : internalState;

    const styles = getContainerStyles(theme, size);
    const inputStyles = getInputStyles({
      theme,
      size,
      hasPrefix: false,
      hasSuffix: false,
      disabled,
      readOnly,
    });
    const wrapperStyles = getWrapperStyles({
      theme,
      state: currentState,
      disabled,
      readOnly,
    });

    // TextArea specific styles
    const textAreaStyles = css([
      inputStyles,
      {
        resize: resize ? 'vertical' : 'none',
        minHeight: 'auto',
        lineHeight: theme.typography.p2.lineHeight,
        fontFamily: theme.typography.p2.fontFamily,
      },
    ]);

    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      if (state === 'default') {
        setInternalState('focused');
      }
      props.onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      if (state === 'default') {
        setInternalState('default');
      }
      props.onBlur?.(event);
    };

    const handleMouseEnter = () => {
      if (state === 'default' && internalState !== 'focused') {
        setInternalState('hover');
      }
    };

    const handleMouseLeave = () => {
      if (state === 'default' && internalState === 'hover') {
        setInternalState('default');
      }
    };

    // Determine help text to display
    const getHelpText = () => {
      if (currentState === 'error' && errorMessage) return errorMessage;
      if (currentState === 'success' && successMessage) return successMessage;
      return helpText;
    };

    const displayedHelpText = getHelpText();

    return (
      <Box css={styles.container}>
        {label && (
          <label htmlFor={inputId}>
            <Text variant="p2" color="Default" weight="medium">
              {label}
              {required && (
                <Text as="span" color="Destructive" style={{ marginLeft: '2px' }}>
                  *
                </Text>
              )}
            </Text>
          </label>
        )}

        <Box css={wrapperStyles}>
          <textarea
            ref={ref}
            id={inputId}
            css={textAreaStyles}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            rows={rows}
            aria-describedby={displayedHelpText ? helpTextId : undefined}
            aria-invalid={currentState === 'error'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
          />
        </Box>

        {displayedHelpText && (
          <HelpText
            id={helpTextId}
            variant={
              currentState === 'error'
                ? 'error'
                : currentState === 'success'
                  ? 'success'
                  : 'default'
            }
          >
            {displayedHelpText}
          </HelpText>
        )}
      </Box>
    );
  }
);

TextArea.displayName = 'TextArea';
