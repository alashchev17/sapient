import { Stack, type StackProps } from '@sapiently/stack';
import { Box, Text } from '@sapiently/primitives';
import { Button } from '@sapiently/button';
import { Heading } from '@sapiently/heading';
import { Paragraph } from '@sapiently/paragraph';
import { spacing } from '@sapiently/design-tokens';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<StackProps> = {
  title: 'Components/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Stack direction',
    },
    spacing: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Space between stack items',
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'nav'],
      description: 'HTML element to render as',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for examples
const StackItem = ({ children, ...props }: { children: React.ReactNode } & any) => (
  <Box 
    p="spacer30" 
    bg="PrimaryWeak" 
    borderRadius="border4" 
    {...props}
  >
    <Text align="center">{children}</Text>
  </Box>
);

// Basic Stack
export const Default: Story = {
  args: {
    direction: 'vertical',
    spacing: 'spacer40',
  },
  render: (args) => (
    <Stack {...args}>
      <StackItem>Item 1</StackItem>
      <StackItem>Item 2</StackItem>
      <StackItem>Item 3</StackItem>
    </Stack>
  ),
};

// Direction Variants
export const DirectionVariants: Story = {
  render: () => (
    <Stack direction="vertical" spacing="spacer60">
      <Box>
        <Heading level={3} marginBottom="1rem">Vertical Stack</Heading>
        <Stack direction="vertical" spacing="spacer30">
          <StackItem>First</StackItem>
          <StackItem>Second</StackItem>
          <StackItem>Third</StackItem>
        </Stack>
      </Box>
      
      <Box>
        <Heading level={3} marginBottom="1rem">Horizontal Stack</Heading>
        <Stack direction="horizontal" spacing="spacer30">
          <StackItem>First</StackItem>
          <StackItem>Second</StackItem>
          <StackItem>Third</StackItem>
        </Stack>
      </Box>
    </Stack>
  ),
};

// Spacing Variants
export const SpacingVariants: Story = {
  render: () => (
    <Stack direction="vertical" spacing="spacer60">
      <Box>
        <Heading level={3} marginBottom="1rem">Small Spacing (spacer20)</Heading>
        <Stack direction="horizontal" spacing="spacer20">
          <StackItem>A</StackItem>
          <StackItem>B</StackItem>
          <StackItem>C</StackItem>
        </Stack>
      </Box>
      
      <Box>
        <Heading level={3} marginBottom="1rem">Medium Spacing (spacer40)</Heading>
        <Stack direction="horizontal" spacing="spacer40">
          <StackItem>A</StackItem>
          <StackItem>B</StackItem>
          <StackItem>C</StackItem>
        </Stack>
      </Box>
      
      <Box>
        <Heading level={3} marginBottom="1rem">Large Spacing (spacer80)</Heading>
        <Stack direction="horizontal" spacing="spacer80">
          <StackItem>A</StackItem>
          <StackItem>B</StackItem>
          <StackItem>C</StackItem>
        </Stack>
      </Box>
    </Stack>
  ),
};



// Responsive Spacing
export const ResponsiveSpacing: Story = {
  args: {
    direction: 'horizontal',
    spacing: ['spacer20', 'spacer40', 'spacer80'],
  },
  render: (args) => (
    <Stack {...args}>
      <StackItem>Responsive</StackItem>
      <StackItem>Spacing</StackItem>
      <StackItem>Example</StackItem>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spacing changes based on screen size: small on mobile, medium on tablet, large on desktop.',
      },
    },
  },
};

// Real World Examples
export const FormLayout: Story = {
  render: () => (
    <Box style={{ maxWidth: '400px' }}>
      <Stack direction="vertical" spacing="spacer40">
        <Box>
          <Text as="label" variant="p2" weight="medium" style={{ display: 'block', marginBottom: '0.5rem' }}>Name</Text>
          <input style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter your name" />
        </Box>
        
        <Box>
          <Text as="label" variant="p2" weight="medium" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</Text>
          <input style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Enter your email" />
        </Box>
        
        <Stack direction="horizontal" spacing="spacer20" justify="end">
          <Button variant="tertiary">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </Stack>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using Stack for form layouts with consistent spacing.',
      },
    },
  },
};

export const CardGrid: Story = {
  render: () => (
    <Stack direction="horizontal" spacing="spacer30" wrap="wrap">
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} p="spacer40" bg="Surface" borderRadius="border8" shadow="shadowsmall" style={{ minWidth: '200px', flex: '1 1 200px' }}>
          <Stack direction="vertical" spacing="spacer20">
            <Heading level={4} marginBottom="0">Card {i + 1}</Heading>
            <Paragraph size="small" color="Muted" marginBottom="0">
              This is a sample card content that demonstrates how Stack can be used for grid layouts.
            </Paragraph>
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using Stack with wrapping for responsive card grids.',
      },
    },
  },
};

export const Navigation: Story = {
  render: () => (
    <Box p="spacer40" bg="Canvas" borderRadius="border8">
      <Stack direction="horizontal" spacing="spacer40" align="center" justify="between">
        <Heading level={2} marginBottom="0">Logo</Heading>
        
        <Stack direction="horizontal" spacing="spacer30" align="center">
          <Text as="a" href="#" color="Default" style={{ textDecoration: 'none' }}>Home</Text>
          <Text as="a" href="#" color="Default" style={{ textDecoration: 'none' }}>About</Text>
          <Text as="a" href="#" color="Default" style={{ textDecoration: 'none' }}>Services</Text>
          <Text as="a" href="#" color="Default" style={{ textDecoration: 'none' }}>Contact</Text>
        </Stack>
        
        <Stack direction="horizontal" spacing="spacer20">
          <Button variant="tertiary" size="small">Sign In</Button>
          <Button variant="primary" size="small">Sign Up</Button>
        </Stack>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using nested Stacks for complex navigation layouts.',
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  args: {
    direction: 'horizontal',
    spacing: 'spacer40',
  },
  render: (args) => (
    <Box p="spacer40" borderColor="Subtle" style={{ border: '1px dashed', minHeight: '200px' }}>
      <Stack {...args}>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
        <StackItem>Item 4</StackItem>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use the controls panel to experiment with different stack properties.',
      },
    },
  },
};
