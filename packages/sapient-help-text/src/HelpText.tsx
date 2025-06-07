/** @jsxImportSource @emotion/react */
import { forwardRef } from 'react';
import { Text } from '@sapiently/primitives';

import { HelpTextProps } from './types';

export const HelpText = forwardRef<HTMLParagraphElement, HelpTextProps>(
  ({ children, variant = 'default', id, className, ...props }, ref) => {
    const getTextColor = () => {
      switch (variant) {
        case 'error':
          return 'Destructive';
        case 'success':
          return 'Success';
        default:
          return 'Muted';
      }
    };

    return (
      <Text
        ref={ref}
        as="p"
        variant="p3"
        color={getTextColor()}
        id={id}
        className={className}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

HelpText.displayName = 'HelpText';
