import { ReactNode } from 'react';
import { Size } from '@sapiently/core';
import { InputState } from '@sapiently/text-input';

export interface ComboboxOption {
  /**
   * Unique identifier for the option
   */
  value: string;
  /**
   * Display label for the option
   */
  label: ReactNode;
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
  /**
   * Optional icon for the option
   */
  icon?: ReactNode;
  /**
   * Optional description for the option
   */
  description?: ReactNode;
}

export type ComboboxMode = 'single' | 'multiple';

export interface ComboboxProps {
  /**
   * Array of options to display
   */
  options: ComboboxOption[];
  /**
   * Selected value(s)
   */
  value?: string | string[];
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (value: string | string[]) => void;
  /**
   * Label for the combobox
   */
  label?: ReactNode;
  /**
   * Help text displayed below the combobox
   */
  helpText?: ReactNode;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether the combobox is disabled
   */
  disabled?: boolean;
  /**
   * Whether the combobox is required
   */
  required?: boolean;
  /**
   * Current state of the combobox
   */
  state?: InputState;
  /**
   * Size of the combobox
   * @default 'medium'
   */
  size?: Size;
  /**
   * Selection mode
   * @default 'single'
   */
  mode?: ComboboxMode;
  /**
   * Whether to enable search/filter functionality
   * @default true
   */
  searchable?: boolean;
  /**
   * Custom filter function
   */
  filterFunction?: (option: ComboboxOption, searchValue: string) => boolean;
  /**
   * Maximum number of visible options
   * @default 6
   */
  maxVisibleOptions?: number;
  /**
   * Custom error message
   */
  errorMessage?: ReactNode;
  /**
   * Custom success message
   */
  successMessage?: ReactNode;
  /**
   * ID for the combobox
   */
  id?: string;
  /**
   * Custom no options message
   */
  noOptionsMessage?: ReactNode;
}
