import { ReactNode } from 'react';

export type TabsVariant = 'pill' | 'underline';

export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string;
  /**
   * Tab label content
   */
  label: ReactNode;
  /**
   * Tab panel content
   */
  content: ReactNode;
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
  /**
   * Optional icon for the tab
   */
  icon?: ReactNode;
}

export interface TabsProps {
  /**
   * Array of tab items
   */
  items: TabItem[];
  /**
   * Currently active tab ID
   */
  activeTab?: string;
  /**
   * Callback when tab changes
   */
  onTabChange?: (tabId: string) => void;
  /**
   * Variant of tabs
   * @default 'pill'
   */
  variant?: TabsVariant;
  /**
   * Whether tabs should take full width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Orientation of tabs
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
}
