import { forwardRef } from 'react';
import { Flex, type FlexProps } from '@sapiently/primitives';

export type StackDirection = 'horizontal' | 'vertical';

export interface StackProps extends Omit<FlexProps, 'direction' | 'gap'> {
  /**
   * Stack direction
   * @default 'vertical'
   */
  direction?: StackDirection;
  
  /**
   * Space between stack items using design tokens
   * @default 'spacer40'
   */
  spacing?: FlexProps['gap'];
}

export const Stack = forwardRef<HTMLElement, StackProps>(
  ({ 
    direction = 'vertical',
    spacing = 'spacer40',
    ...props 
  }, ref) => {
    // Map stack direction to flex direction
    const flexDirection = direction === 'horizontal' ? 'row' : 'column';
    
    return (
      <Flex
        ref={ref}
        direction={flexDirection}
        gap={spacing}
        {...props}
      />
    );
  }
);

Stack.displayName = 'Stack';
