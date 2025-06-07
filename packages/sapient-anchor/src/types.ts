import { AnchorHTMLAttributes, ReactNode } from 'react';

export type AnchorVariant = 'default' | 'inline';

export interface AnchorProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'css'> {
  /**
   * The variant of the anchor
   * @default 'default'
   */
  variant?: AnchorVariant;
  /**
   * The content of the anchor
   */
  children: ReactNode;
  /**
   * Whether the anchor is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * External link indicator (opens in new tab)
   * @default false
   */
  external?: boolean;
}
