import { Skeleton, type SkeletonProps } from '@sapiently/skeleton';
import { Stack } from '@sapiently/stack';
import { Box } from '@sapiently/primitives';
import { Heading } from '@sapiently/heading';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<SkeletonProps> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
      description: 'Skeleton variant',
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton',
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the skeleton',
    },
    lines: {
      control: 'number',
      description: 'Number of text lines (text variant only)',
      if: { arg: 'variant', eq: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Skeleton
export const Default: Story = {
  args: {
    variant: 'rectangular',
    width: '100%',
    height: '1rem',
    animate: true,
  },
};

// Variant Types
export const VariantTypes: Story = {
  render: () => (
    <Stack direction="vertical" spacing="spacer40">
      <Box>
        <Heading level={4} marginBottom="1rem">Text Skeleton</Heading>
        <Skeleton variant="text" width="100%" />
      </Box>
      
      <Box>
        <Heading level={4} marginBottom="1rem">Rectangular Skeleton</Heading>
        <Skeleton variant="rectangular" width="200px" height="120px" />
      </Box>
      
      <Box>
        <Heading level={4} marginBottom="1rem">Circular Skeleton</Heading>
        <Skeleton variant="circular" width="60px" height="60px" />
      </Box>
    </Stack>
  ),
};

// Text Line Variants
export const TextLineVariants: Story = {
  render: () => (
    <Stack direction="vertical" spacing="spacer40" style={{ maxWidth: '500px' }}>
      <Box>
        <Heading level={4} marginBottom="1rem">Single Line</Heading>
        <Skeleton variant="text" lines={1} />
      </Box>
      
      <Box>
        <Heading level={4} marginBottom="1rem">Three Lines</Heading>
        <Skeleton variant="text" lines={3} />
      </Box>
      
      <Box>
        <Heading level={4} marginBottom="1rem">Five Lines</Heading>
        <Skeleton variant="text" lines={5} />
      </Box>
    </Stack>
  ),
};

// Different Sizes
export const DifferentSizes: Story = {
  render: () => (
    <Stack direction="vertical" spacing="spacer40">
      <Box>
        <Heading level={4} marginBottom="1rem">Small Rectangles</Heading>
        <Stack direction="horizontal" spacing="spacer20">
          <Skeleton variant="rectangular" width="60px" height="40px" />
          <Skeleton variant="rectangular" width="80px" height="40px" />
          <Skeleton variant="rectangular" width="100px" height="40px" />
        </Stack>
      </Box>
      
      <Box>
        <Heading level={4} marginBottom="1rem">Medium Rectangles</Heading>
        <Stack direction="horizontal" spacing="spacer20">
          <Skeleton variant="rectangular" width="120px" height="80px" />
          <Skeleton variant="rectangular" width="140px" height="80px" />
          <Skeleton variant="rectangular" width="160px" height="80px" />
        </Stack>
      </Box>
      
      <Box>
        <Heading level={4} marginBottom="1rem">Different Circles</Heading>
        <Stack direction="horizontal" spacing="spacer20" align="center">
          <Skeleton variant="circular" width="30px" height="30px" />
          <Skeleton variant="circular" width="50px" height="50px" />
          <Skeleton variant="circular" width="80px" height="80px" />
        </Stack>
      </Box>
    </Stack>
  ),
};

// Animation Variants
export const AnimationVariants: Story = {
  render: () => (
    <Stack direction="vertical" spacing="spacer40" style={{ maxWidth: '400px' }}>
      <Box>
        <Heading level={4} marginBottom="1rem">With Animation (default)</Heading>
        <Skeleton variant="text" lines={3} animate={true} />
      </Box>
      
      <Box>
        <Heading level={4} marginBottom="1rem">Without Animation</Heading>
        <Skeleton variant="text" lines={3} animate={false} />
      </Box>
    </Stack>
  ),
};

// Loading States Examples
export const LoadingStates: Story = {
  render: () => (
    <Stack direction="vertical" spacing="spacer60">
      {/* Article Loading */}
      <Box>
        <Heading level={3} marginBottom="1.5rem">Article Loading State</Heading>
        <Box style={{ maxWidth: '600px' }}>
          <Skeleton variant="text" width="70%" height="2rem" style={{ marginBottom: '1rem' }} />
          <Skeleton variant="text" width="50%" height="1rem" style={{ marginBottom: '2rem' }} />
          <Skeleton variant="rectangular" width="100%" height="200px" style={{ marginBottom: '1.5rem' }} />
          <Skeleton variant="text" lines={4} />
        </Box>
      </Box>
      
      {/* Card Loading */}
      <Box>
        <Heading level={3} marginBottom="1.5rem">Card Loading State</Heading>
        <Stack direction="horizontal" spacing="spacer30">
          {Array.from({ length: 3 }, (_, i) => (
            <Box key={i} p="spacer40" bg="Surface" borderRadius="border8" shadow="shadowsmall" style={{ width: '200px' }}>
              <Stack direction="vertical" spacing="spacer20">
                <Skeleton variant="rectangular" width="100%" height="120px" />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" lines={2} />
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
      
      {/* Profile Loading */}
      <Box>
        <Heading level={3} marginBottom="1.5rem">Profile Loading State</Heading>
        <Stack direction="horizontal" spacing="spacer30" align="start">
          <Skeleton variant="circular" width="80px" height="80px" />
          <Stack direction="vertical" spacing="spacer20" style={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height="1.5rem" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" lines={3} />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples of skeleton loading states for different content types.',
      },
    },
  },
};

// List Loading State
export const ListLoadingState: Story = {
  render: () => (
    <Box style={{ maxWidth: '500px' }}>
      <Heading level={3} marginBottom="1.5rem">List Loading State</Heading>
      <Stack direction="vertical" spacing="spacer30">
        {Array.from({ length: 5 }, (_, i) => (
          <Stack key={i} direction="horizontal" spacing="spacer20" align="center">
            <Skeleton variant="circular" width="40px" height="40px" />
            <Stack direction="vertical" spacing="spacer10" style={{ flex: 1 }}>
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="40%" />
            </Stack>
            <Skeleton variant="rectangular" width="60px" height="24px" />
          </Stack>
        ))}
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of skeleton loading state for list items with avatars and actions.',
      },
    },
  },
};

// Table Loading State
export const TableLoadingState: Story = {
  render: () => (
    <Box style={{ maxWidth: '700px' }}>
      <Heading level={3} marginBottom="1.5rem">Table Loading State</Heading>
      <Box p="spacer30" bg="Surface" borderRadius="border8" borderColor="Subtle" style={{ border: '1px solid' }}>
        {/* Header */}
        <Stack direction="horizontal" spacing="spacer40" style={{ paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
          <Skeleton variant="text" width="120px" />
          <Skeleton variant="text" width="100px" />
          <Skeleton variant="text" width="80px" />
          <Skeleton variant="text" width="60px" />
        </Stack>
        
        {/* Rows */}
        <Stack direction="vertical" spacing="spacer20" style={{ paddingTop: '1rem' }}>
          {Array.from({ length: 4 }, (_, i) => (
            <Stack key={i} direction="horizontal" spacing="spacer40" align="center">
              <Skeleton variant="text" width="120px" />
              <Skeleton variant="text" width="100px" />
              <Skeleton variant="text" width="80px" />
              <Skeleton variant="rectangular" width="60px" height="24px" />
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of skeleton loading state for table data with headers and rows.',
      },
    },
  },
};

// Dashboard Loading State
export const DashboardLoadingState: Story = {
  render: () => (
    <Box style={{ maxWidth: '800px' }}>
      <Heading level={3} marginBottom="1.5rem">Dashboard Loading State</Heading>
      <Stack direction="vertical" spacing="spacer40">
        {/* Stats Row */}
        <Stack direction="horizontal" spacing="spacer30">
          {Array.from({ length: 4 }, (_, i) => (
            <Box key={i} p="spacer30" bg="Surface" borderRadius="border8" style={{ flex: 1 }}>
              <Stack direction="vertical" spacing="spacer20">
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" height="2rem" />
              </Stack>
            </Box>
          ))}
        </Stack>
        
        {/* Chart Area */}
        <Box p="spacer40" bg="Surface" borderRadius="border8">
          <Stack direction="vertical" spacing="spacer30">
            <Skeleton variant="text" width="30%" height="1.5rem" />
            <Skeleton variant="rectangular" width="100%" height="300px" />
          </Stack>
        </Box>
        
        {/* Recent Activity */}
        <Box p="spacer40" bg="Surface" borderRadius="border8">
          <Stack direction="vertical" spacing="spacer30">
            <Skeleton variant="text" width="40%" height="1.5rem" />
            <Stack direction="vertical" spacing="spacer20">
              {Array.from({ length: 3 }, (_, i) => (
                <Stack key={i} direction="horizontal" spacing="spacer20" align="center">
                  <Skeleton variant="circular" width="32px" height="32px" />
                  <Stack direction="vertical" spacing="spacer10" style={{ flex: 1 }}>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="50%" />
                  </Stack>
                  <Skeleton variant="text" width="60px" />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex dashboard loading state with multiple content sections and layouts.',
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  args: {
    variant: 'text',
    width: '100%',
    height: '1rem',
    animate: true,
    lines: 3,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Use the controls panel to experiment with different skeleton properties.',
      },
    },
  },
};
