/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import { Box } from '@sapiently/primitives';
import { Heading } from '@sapiently/heading';
import { Paragraph } from '@sapiently/paragraph';
import { useTheme } from '@sapiently/theme';
import { NeutralIcon, WarningIcon, ErrorIcon, SuccessIcon } from '@sapiently/icons';

export type CalloutVariant = 'neutral' | 'warning' | 'error' | 'success';

export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'css'> {
  /** @default 'neutral' */
  variant?: CalloutVariant;
  /** Optional bolded headline */
  title?: string;
  /** Body content */
  children: React.ReactNode;
}

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  ({ variant = 'neutral', title, children, style, ...htmlAttrs }, ref) => {
    const theme = useTheme();

    const variants = {
      neutral: {
        bg: 'Surface' as const,
        borderColor: 'Default' as const,
        iconColor: 'Default' as const,
        icon: NeutralIcon,
      },
      warning: {
        bg: 'Surface' as const,
        borderColor: 'WarningDefault' as const,
        iconColor: 'Warning' as const,
        icon: WarningIcon,
      },
      error: {
        bg: 'DestructiveWeak' as const,
        borderColor: 'DestructiveDefault' as const,
        iconColor: 'Destructive' as const,
        icon: ErrorIcon,
      },
      success: {
        bg: 'Surface' as const,
        borderColor: 'SuccessDefault' as const,
        iconColor: 'Success' as const,
        icon: SuccessIcon,
      },
    } as const;

    const cfg = variants[variant];
    const Icon = cfg.icon;

    return (
      <Box
        ref={ref}
        as="div"
        display="flex"
        bg={cfg.bg}
        borderRadius="border4"
        p="spacer50"
        css={{
          alignItems: 'flex-start',
          gap: theme.spacing.spacer30,
          border: `1px solid ${theme.colors.border[cfg.borderColor]}`,
        }}
        style={style}
        {...htmlAttrs}
      >
        <Box as="span" css={{ flexShrink: 0, color: theme.colors.text[cfg.iconColor] }}>
          <Icon aria-hidden="true" />
        </Box>
        <Box as="div" css={{ flex: 1 }}>
          {title && (
            <Heading
              level={5}
              as="h5"
              weight="bold"
              css={{
                marginBottom: theme.spacing.spacer20,
              }}
            >
              {title}
            </Heading>
          )}
          <Paragraph size="2" color="Muted" css={{ margin: 0 }}>
            {children}
          </Paragraph>
        </Box>
      </Box>
    );
  }
);

Callout.displayName = 'Callout';
