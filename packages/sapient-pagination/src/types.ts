export type PaginationVariant = 'numeric' | 'prevnext';

export type PaginationItem = number | '...';

export interface PaginationProps {
  /**
   * Current active page (1-indexed)
   */
  currentPage: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;
  /**
   * Variant of pagination
   * @default 'numeric'
   */
  variant?: PaginationVariant;
  /**
   * Maximum number of page buttons to show
   * @default 1
   */
  siblingCount?: number;
  /**
   * Whether to show first/last page buttons
   * @default true
   */
  showFirstLast?: boolean;
  /**
   * Custom labels for navigation buttons (only used in prevnext variant)
   */
  labels?: {
    previous?: string;
    next?: string;
  };
}
