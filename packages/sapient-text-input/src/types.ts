import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';
import { Size } from '@sapiently/core';

export type InputState = 'default' | 'focused' | 'hover' | 'read-only' | 'success' | 'error';

export interface BaseInputProps {
  /**
   * Label for the input field
   */
  label?: ReactNode;
  /**
   * Help text displayed below the input
   */
  helpText?: ReactNode;
  /**
   * Current state of the input
   */
  state?: InputState;
  /**
   * Size of the input
   * @default 'medium'
   */
  size?: Size;
  /**
   * Icon or content to display before the input
   */
  prefix?: ReactNode;
  /**
   * Icon or content to display after the input
   */
  suffix?: ReactNode;
  /**
   * Whether the input is required
   */
  required?: boolean;
  /**
   * ID for the input field (used for label association)
   */
  id?: string;
  /**
   * Custom error message (overrides helpText when state is 'error')
   */
  errorMessage?: ReactNode;
  /**
   * Custom success message (overrides helpText when state is 'success')
   */
  successMessage?: ReactNode;
}

export interface TextInputProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /**
   * Input type
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'search' | 'number';
}

export interface TextAreaProps extends BaseInputProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'prefix'> {
  /**
   * Number of visible text lines
   * @default 4
   */
  rows?: number;
  /**
   * Whether to allow resize
   * @default true
   */
  resize?: boolean;
}
