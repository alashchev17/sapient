/** @jsxImportSource @emotion/react */
import { useTheme } from '@sapiently/theme';
import { forwardRef } from 'react';

import { getAnchorStyles } from './Anchor.styles';
import { AnchorProps } from './types';

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    {
      children,
      variant = 'default',
      disabled = false,
      external = false,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const anchorStyles = getAnchorStyles({ theme, variant, disabled });

    // Handle external links
    const linkTarget = external ? '_blank' : target;
    const linkRel = external ? 'noopener noreferrer' : rel;

    // Prevent navigation if disabled
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      props.onClick?.(event);
    };

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        target={linkTarget}
        rel={linkRel}
        css={anchorStyles}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        onClick={handleClick}
        {...props}
      >
        {children}
        {external && !disabled && (
          <span aria-label="Opens in new tab" style={{ marginLeft: theme.spacing.spacer10 }}>
            ↗
          </span>
        )}
      </a>
    );
  }
);

Anchor.displayName = 'Anchor';
