/** @jsxImportSource @emotion/react */
import { useTheme } from '@sapiently/theme';
import { forwardRef, useState, useId } from 'react';
import { Box, Text } from '@sapiently/primitives';
import { HelpText } from '@sapiently/help-text';

import { getInputStyles, getWrapperStyles, getContainerStyles } from './TextInput.styles';
import { TextInputProps } from './types';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      helpText,
      state = 'default',
      size = 'medium',
      prefix,
      suffix,
      required = false,
      id,
      errorMessage,
      successMessage,
      type = 'text',
      disabled = false,
      readOnly = false,
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
      hasPrefix: !!prefix,
      hasSuffix: !!suffix,
      disabled,
      readOnly,
    });
    const wrapperStyles = getWrapperStyles({
      theme,
      state: currentState,
      disabled,
      readOnly,
    });

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      if (state === 'default') {
        setInternalState('focused');
      }
      props.onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
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
            <Text
              variant="p2"
              color="Default"
              weight="medium"
            >
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
          {prefix && (
            <Box css={styles.prefix}>
              {prefix}
            </Box>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            css={inputStyles}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-describedby={displayedHelpText ? helpTextId : undefined}
            aria-invalid={currentState === 'error'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
          />

          {suffix && (
            <Box css={styles.suffix}>
              {suffix}
            </Box>
          )}
        </Box>

        {displayedHelpText && (
          <HelpText
            id={helpTextId}
            variant={currentState === 'error' ? 'error' : currentState === 'success' ? 'success' : 'default'}
          >
            {displayedHelpText}
          </HelpText>
        )}
      </Box>
    );
  }
);

TextInput.displayName = 'TextInput';
