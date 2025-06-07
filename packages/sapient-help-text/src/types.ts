import { ReactNode } from 'react';

export type HelpTextVariant = 'default' | 'error' | 'success';

export interface HelpTextProps {
  /**
   * The content of the help text
   */
  children: ReactNode;
  /**
   * Variant of the help text
   * @default 'default'
   */
  variant?: HelpTextVariant;
  /**
   * ID for accessibility linking
   */
  id?: string;
  /**
   * Additional CSS class name
   */
  className?: string;
}
