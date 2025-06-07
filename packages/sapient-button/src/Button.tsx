/** @jsxImportSource @emotion/react */
import { Size } from '@sapiently/core';
import { useTheme, LoadingSpinner } from '@sapiently/theme';
import { ButtonHTMLAttributes, forwardRef, ReactNode, useMemo } from 'react';

import { getButtonStyles } from './Button.styles';
import { ButtonVariants, IconPosition, ButtonShape, ButtonKind } from './types';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'css'> {
  variant?: ButtonVariants;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  loading?: boolean;
  shape?: ButtonShape;
  /**
   * Accessible label for icon-only buttons (required when using icon-only)
   */
  'aria-label'?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'medium',
      disabled = false,
      type = 'button',
      icon,
      iconPosition = 'left',
      loading = false,
      shape = 'default',
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    // Determine button kind automatically
    const kind: ButtonKind = useMemo(() => {
      if (!children && icon) return 'icon-only';
      if (children && icon) return 'with-icon';
      return 'default';
    }, [children, icon]);

    const buttonStyles = getButtonStyles({ theme, variant, size, disabled, shape, kind, loading });

    // Get loading spinner size based on button size
    const getSpinnerSize = () => {
      switch (size) {
        case 'small':
          return 14;
        case 'medium':
          return 16;
        case 'large':
          return 18;
        default:
          return 16;
      }
    };

    // Render icon with proper positioning
    const renderIcon = () => {
      if (loading) {
        return <LoadingSpinner size={getSpinnerSize()} />;
      }
      return icon;
    };

    // Render button content
    const renderContent = () => {
      if (kind === 'icon-only') {
        return renderIcon();
      }

      if (kind === 'with-icon') {
        return iconPosition === 'left' ? (
          <>
            {renderIcon()}
            {children}
          </>
        ) : (
          <>
            {children}
            {renderIcon()}
          </>
        );
      }

      // Default kind - text only, but show spinner if loading
      return loading ? (
        <>
          <LoadingSpinner size={getSpinnerSize()} />
          {children}
        </>
      ) : (
        children
      );
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-redundant-roles
      <button
        ref={ref}
        type={type}
        css={buttonStyles}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        aria-label={kind === 'icon-only' ? props['aria-label'] : undefined}
        role="button"
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';
