/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { Flex, Text } from '@sapiently/primitives';
import { css } from '@emotion/react';
import { useTheme } from '@sapiently/theme';
import { ChevronRight, ChevronLeft, DoubleChevronRight, DoubleChevronLeft } from '@sapiently/icons';

import { PaginationProps, PaginationItem } from './types';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'numeric',
  siblingCount = 1,
  showFirstLast = true,
  labels = {},
}: PaginationProps) => {
  const theme = useTheme();
  const { previous = 'Prev', next = 'Next' } = labels;

  const paginationRange = useMemo((): PaginationItem[] => {
    const totalPageNumbers = siblingCount + 5; // Current + 2*siblingCount + first + last + ellipsis

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }

    return [];
  }, [currentPage, totalPages, siblingCount]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, page: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePageChange(page);
    }
  };

  // Custom button styles
  const getButtonStyles = (isActive: boolean = false, isDisabled: boolean = false) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '2.5rem', // Square buttons for numbers and icons
      height: '2.5rem',
      padding: 0, // No padding needed for square buttons
      border: `1px solid ${theme.colors.border.Default}`,
      borderRadius: theme.radii.border8,
      backgroundColor: isActive
        ? theme.colors.background.PrimaryDefault
        : theme.colors.background.Surface,
      color: isActive ? theme.colors.text.Inverse : theme.colors.text.Default,
      fontFamily: theme.typography.p1.fontFamily, // Tiempos Text
      fontSize: theme.typography.p2.fontSize,
      fontWeight: theme.typography.p1.fontWeight,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      opacity: isDisabled ? 0.5 : 1,

      '&:hover': isDisabled
        ? {}
        : {
            backgroundColor: isActive
              ? theme.colors.background.PrimaryWeak
              : theme.colors.background.Subtle,
            borderColor: theme.colors.border.Strong,
          },

      '&:focus': {
        outline: `2px solid ${theme.colors.border.FocusDefault}`,
        outlineOffset: '2px',
      },

      '&:focus-visible': {
        outline: `2px solid ${theme.colors.border.FocusDefault}`,
        outlineOffset: '2px',
      },

      '&:focus:not(:focus-visible)': {
        outline: 'none',
      },
    });

  const getNavButtonStyles = (isDisabled: boolean = false) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2.5rem', // Match the number buttons height
      padding: `${theme.spacing.spacer20} ${theme.spacing.spacer40}`, // More horizontal padding for text
      border: `1px solid ${theme.colors.border.Default}`,
      borderRadius: theme.radii.border8,
      backgroundColor: theme.colors.background.Surface,
      color: theme.colors.text.Default,
      fontFamily: theme.typography.p1.fontFamily, // Tiempos Text
      fontSize: theme.typography.p2.fontSize,
      fontWeight: theme.typography.p1.fontWeight,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      opacity: isDisabled ? 0.5 : 1,
      whiteSpace: 'nowrap' as const, // Prevent text wrapping
      minWidth: 'auto', // Let content determine width

      '&:hover': isDisabled
        ? {}
        : {
            backgroundColor: theme.colors.background.Subtle,
            borderColor: theme.colors.border.Strong,
          },

      '&:focus': {
        outline: `2px solid ${theme.colors.border.FocusDefault}`,
        outlineOffset: '2px',
      },

      '&:focus-visible': {
        outline: `2px solid ${theme.colors.border.FocusDefault}`,
        outlineOffset: '2px',
      },

      '&:focus:not(:focus-visible)': {
        outline: 'none',
      },
    });

  if (variant === 'prevnext') {
    return (
      <Flex
        as="nav"
        align="center"
        justify="center"
        gap="spacer20"
        aria-label="Pagination Navigation"
      >
        <button
          css={getNavButtonStyles(currentPage === 1)}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          {previous}
        </button>

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <Text
                key={`ellipsis-${index}`}
                variant="p2"
                color="Muted"
                style={{
                  minWidth: '2.5rem',
                  textAlign: 'center',
                  fontFamily: theme.typography.p1.fontFamily,
                }}
              >
                {pageNumber}
              </Text>
            );
          }

          return (
            <button
              key={pageNumber}
              css={getButtonStyles(pageNumber === currentPage)}
              onClick={() => handlePageChange(pageNumber as number)}
              onKeyDown={(e) => handleKeyDown(e, pageNumber as number)}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={pageNumber === currentPage ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          css={getNavButtonStyles(currentPage === totalPages)}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          {next}
        </button>
      </Flex>
    );
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      gap="spacer20"
      aria-label="Pagination Navigation"
    >
      {showFirstLast && (
        <button
          css={getButtonStyles(false, currentPage === 1)}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          aria-label="Go to first page"
        >
          <DoubleChevronLeft />
        </button>
      )}

      <button
        css={getButtonStyles(false, currentPage === 1)}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft />
      </button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === '...') {
          return (
            <Text
              key={`ellipsis-${index}`}
              variant="p2"
              color="Muted"
              style={{
                minWidth: '2.5rem',
                textAlign: 'center',
                fontFamily: theme.typography.p1.fontFamily,
              }}
            >
              {pageNumber}
            </Text>
          );
        }

        return (
          <button
            key={pageNumber}
            css={getButtonStyles(pageNumber === currentPage)}
            onClick={() => handlePageChange(pageNumber as number)}
            onKeyDown={(e) => handleKeyDown(e, pageNumber as number)}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={pageNumber === currentPage ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        css={getButtonStyles(false, currentPage === totalPages)}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <ChevronRight />
      </button>

      {showFirstLast && (
        <button
          css={getButtonStyles(false, currentPage === totalPages)}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Go to last page"
        >
          <DoubleChevronRight />
        </button>
      )}
    </Flex>
  );
};

Pagination.displayName = 'Pagination';
