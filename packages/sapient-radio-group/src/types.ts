import { ReactNode } from 'react';

export interface RadioOption {
  /**
   * Unique value for the radio option
   */
  value: string;
  /**
   * Label for the radio option
   */
  label: ReactNode;
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
  /**
   * Help text for this specific option
   */
  helpText?: ReactNode;
}

export interface RadioGroupProps {
  /**
   * Array of radio options
   */
  options: RadioOption[];
  /**
   * Currently selected value
   */
  value?: string;
  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void;
  /**
   * Group label
   */
  label?: ReactNode;
  /**
   * Group help text
   */
  helpText?: ReactNode;
  /**
   * Name attribute for the radio group
   */
  name?: string;
  /**
   * Whether the group is disabled
   */
  disabled?: boolean;
  /**
   * Whether selection is required
   */
  required?: boolean;
  /**
   * Custom error message
   */
  errorMessage?: ReactNode;
}
