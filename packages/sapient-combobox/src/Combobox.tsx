/** @jsxImportSource @emotion/react */
import { useTheme } from '@sapiently/theme';
import { useState, useRef, useEffect, useId, useMemo } from 'react';
import { Box, Flex, Text } from '@sapiently/primitives';
import { HelpText } from '@sapiently/help-text';
import { ChevronDown, CrossIcon } from '@sapiently/icons';

import { getComboboxStyles } from './Combobox.styles';
import { ComboboxProps, ComboboxOption } from './types';

export const Combobox = ({
  options,
  value,
  onSelectionChange,
  label,
  helpText,
  placeholder = 'Select an option...',
  disabled = false,
  required = false,
  state = 'default',

  mode = 'single',
  searchable = true,
  filterFunction,
  maxVisibleOptions = 6,
  errorMessage,
  successMessage,
  id,
  noOptionsMessage = 'No options found',
}: ComboboxProps) => {
  const theme = useTheme();
  const generatedId = useId();
  const comboboxId = id || generatedId;
  const dropdownId = `${comboboxId}-dropdown`;

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const styles = getComboboxStyles({ theme, isOpen, maxVisibleOptions, state, disabled });

  // Handle selected values
  const selectedValues = useMemo(() => {
    if (mode === 'multiple') {
      return Array.isArray(value) ? value : [];
    }
    return typeof value === 'string' ? [value] : [];
  }, [value, mode]);

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchValue) return options;

    const defaultFilter = (option: ComboboxOption, search: string) =>
      typeof option.label === 'string' && option.label.toLowerCase().includes(search.toLowerCase());

    const filter = filterFunction || defaultFilter;
    return options.filter((option) => filter(option, searchValue));
  }, [options, searchValue, searchable, filterFunction]);

  // Get display value for input
  const getDisplayValue = () => {
    if (mode === 'single') {
      const selected = options.find((opt) => opt.value === value);
      return typeof selected?.label === 'string' ? selected.label : '';
    }
    return searchValue;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    setIsOpen(true);
    setFocusedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = (event: React.FocusEvent) => {
    // Delay closing to allow option clicks
    setTimeout(() => {
      if (!dropdownRef.current?.contains(event.relatedTarget as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
        if (mode === 'single') {
          setSearchValue('');
        }
      }
    }, 150);
  };

  const handleOptionSelect = (option: ComboboxOption) => {
    if (option.disabled) return;

    if (mode === 'single') {
      onSelectionChange?.(option.value);
      setIsOpen(false);
      setSearchValue('');
      inputRef.current?.blur();
    } else {
      const newSelection = selectedValues.includes(option.value)
        ? selectedValues.filter((v) => v !== option.value)
        : [...selectedValues, option.value];
      onSelectionChange?.(newSelection);
      setSearchValue('');
      inputRef.current?.focus();
    }
  };

  const handleTagRemove = (valueToRemove: string) => {
    const newSelection = selectedValues.filter((v) => v !== valueToRemove);
    onSelectionChange?.(newSelection);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === 'ArrowDown') {
        event.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
        break;
      case 'Enter':
        event.preventDefault();
        if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          handleOptionSelect(filteredOptions[focusedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Focus management for keyboard navigation
  useEffect(() => {
    if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
      const optionValue = filteredOptions[focusedIndex].value;
      optionRefs.current[optionValue]?.focus();
    }
  }, [focusedIndex, filteredOptions]);

  const selectedTags =
    mode === 'multiple'
      ? selectedValues.map((val) => options.find((opt) => opt.value === val)).filter(Boolean)
      : [];

  return (
    <Box css={styles.container}>
      {/* Label */}
      {label && (
        <Box mb="spacer20">
          <Text variant="p2" color="Default" weight="medium">
            {label}
            {required && (
              <Text as="span" color="Destructive" style={{ marginLeft: theme.spacing.spacer10 }}>
                *
              </Text>
            )}
          </Text>
        </Box>
      )}

      <Box css={styles.inputWrapper}>
        {/* Custom input field with tags inside */}
        <Box
          css={styles.customInput}
          onClick={() => {
            if (!disabled) {
              setIsOpen(true);
              inputRef.current?.focus();
            }
          }}
        >
          {/* Tags inside the input for multi-select */}
          {mode === 'multiple' && selectedTags.length > 0 && (
            <Flex css={styles.inlineTagContainer}>
              {selectedTags.map((option) => (
                <Box key={option!.value} css={styles.inlineTag}>
                  <Text variant="p3">{option!.label}</Text>
                  <button
                    css={styles.inlineTagRemove}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTagRemove(option!.value);
                    }}
                    aria-label={`Remove ${option!.label}`}
                  >
                    <CrossIcon />
                  </button>
                </Box>
              ))}
            </Flex>
          )}

          {/* Hidden input for form functionality */}
          <input
            ref={inputRef}
            id={comboboxId}
            value={searchable ? searchValue : getDisplayValue()}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            css={styles.hiddenInput}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={dropdownId}
            aria-haspopup="listbox"
            aria-autocomplete={searchable ? 'list' : 'none'}
            aria-invalid={state === 'error'}
          />

          {/* Dropdown icon */}
          <Box css={styles.dropdownIcon}>
            <ChevronDown />
          </Box>
        </Box>

        {/* Dropdown */}
        {isOpen && (
          <Box ref={dropdownRef} id={dropdownId} css={styles.dropdown} role="listbox">
            {filteredOptions.length === 0 ? (
              <Box css={styles.noOptions}>{noOptionsMessage}</Box>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  ref={(ref) => {
                    optionRefs.current[option.value] = ref;
                  }}
                  css={[styles.option, option.disabled && styles.disabledOption]}
                  onClick={() => handleOptionSelect(option)}
                  disabled={option.disabled}
                  role="option"
                  aria-selected={selectedValues.includes(option.value)}
                  tabIndex={focusedIndex === index ? 0 : -1}
                >
                  {option.icon && <span>{option.icon}</span>}
                  <Box css={styles.optionContent}>
                    <Text variant="p2">{option.label}</Text>
                    {option.description && (
                      <Text css={styles.optionDescription}>{option.description}</Text>
                    )}
                  </Box>
                </button>
              ))
            )}
          </Box>
        )}
      </Box>

      {/* Help text */}
      {(helpText || errorMessage || successMessage) && (
        <Box mt="spacer20">
          <HelpText
            variant={state === 'error' ? 'error' : state === 'success' ? 'success' : 'default'}
          >
            {state === 'error' && errorMessage
              ? errorMessage
              : state === 'success' && successMessage
                ? successMessage
                : helpText}
          </HelpText>
        </Box>
      )}
    </Box>
  );
};

Combobox.displayName = 'Combobox';
