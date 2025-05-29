import React, { ButtonHTMLAttributes, forwardRef, CSSProperties, useState } from 'react';
import { Variant, Size } from '@sapiently/core';
import { useTheme } from '@sapiently/theme';
import { getButtonStyles } from './Button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    style, 
    variant = 'primary', 
    size = 'medium',
    fullWidth = false,
    disabled = false,
    type = 'button',
    onMouseEnter,
    onMouseLeave,
    ...props 
  }, ref) => {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    
    const styles = getButtonStyles({ theme, variant, size, fullWidth, disabled });
    
    // Add hover styles
    const hoverStyles: Record<Variant, CSSProperties> = {
      primary: { backgroundColor: theme.colors.primary[700] },
      secondary: { backgroundColor: theme.colors.gray[300] },
      danger: { backgroundColor: theme.colors.error.dark },
      warning: { backgroundColor: theme.colors.warning.dark },
      success: { backgroundColor: theme.colors.success.dark },
      neutral: { backgroundColor: theme.colors.gray[700] },
    };
    
    const combinedStyles: CSSProperties = {
      ...styles,
      ...(isHovered && !disabled ? hoverStyles[variant] : {}),
      ...style,
    };
    
    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(true);
      onMouseEnter?.(e);
    };
    
    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false);
      onMouseLeave?.(e);
    };
    
    return (
      <button
        ref={ref}
        type={type}
        style={combinedStyles}
        disabled={disabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
