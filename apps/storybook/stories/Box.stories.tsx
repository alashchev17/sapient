import { Box, type BoxProps } from '@sapiently/primitives';
import { colors, spacing, radii, shadows } from '@sapiently/design-tokens';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<BoxProps> = {
  title: 'Primitives/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    bg: {
      control: 'select',
      options: Object.keys(colors.background),
      description: 'Background color token',
    },
    borderColor: {
      control: 'select',
      options: Object.keys(colors.border),
      description: 'Border color token',
    },
    borderRadius: {
      control: 'select',
      options: Object.keys(radii),
      description: 'Border radius token',
    },
    shadow: {
      control: 'select',
      options: Object.keys(shadows),
      description: 'Shadow token',
    },
    p: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Padding (all sides)',
    },
    px: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Padding horizontal (left/right)',
    },
    py: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Padding vertical (top/bottom)',
    },
    pt: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Padding top',
    },
    pr: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Padding right',
    },
    pb: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Padding bottom',
    },
    pl: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Padding left',
    },
    m: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Margin (all sides)',
    },
    mx: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Margin horizontal (left/right)',
    },
    my: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Margin vertical (top/bottom)',
    },
    mt: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Margin top',
    },
    mr: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Margin right',
    },
    mb: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Margin bottom',
    },
    ml: {
      control: 'select',
      options: Object.keys(spacing),
      description: 'Margin left',
    },
    display: {
      control: 'select',
      options: ['block', 'inline-block', 'inline-flex', 'flex', 'grid'],
      description: 'CSS display property',
    },
    width: {
      control: 'text',
      description: 'Width (number in px or string with units)',
    },
    height: {
      control: 'text',
      description: 'Height (number in px or string with units)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Box
export const Default: Story = {
  args: {
    children: 'Basic Box',
    p: 'spacer40',
    bg: 'Canvas',
    borderRadius: 'border4',
  },
};

// Card-like Box
export const Card: Story = {
  args: {
    children: 'Card Box with shadow',
    p: 'spacer50',
    bg: 'Surface',
    borderRadius: 'border8',
    shadow: 'shadowmedium',
    borderColor: 'Subtle',
  },
};

// Colored Boxes
export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Box p="spacer40" bg="PrimaryWeak" borderRadius="border4">
        Primary Weak
      </Box>
      <Box p="spacer40" bg="PrimaryDefault" borderRadius="border4">
        Primary Default
      </Box>
      <Box p="spacer40" bg="DestructiveWeak" borderRadius="border4">
        Destructive Weak
      </Box>
      <Box p="spacer40" bg="SuccessWeak" borderRadius="border4">
        Success Weak
      </Box>
      <Box p="spacer40" bg="WarningWeak" borderRadius="border4">
        Warning Weak
      </Box>
    </div>
  ),
};

// Spacing Variants
export const SpacingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <Box p="spacer20" bg="Canvas" borderColor="Default">
        Small Padding
      </Box>
      <Box p="spacer40" bg="Canvas" borderColor="Default">
        Medium Padding
      </Box>
      <Box p="spacer80" bg="Canvas" borderColor="Default">
        Large Padding
      </Box>
    </div>
  ),
};

// Responsive Spacing
export const ResponsiveSpacing: Story = {
  args: {
    children: 'Responsive padding (resize window to see changes)',
    p: ['spacer20', 'spacer40', 'spacer80'],
    bg: 'PrimaryWeak',
    borderRadius: 'border4',
  },
  parameters: {
    docs: {
      description: {
        story:
          'This box uses responsive padding: small on mobile, medium on tablet, large on desktop.',
      },
    },
  },
};

// Border Radius Variants
export const BorderRadiusVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Box p="spacer40" bg="Canvas" borderColor="Default" borderRadius="border4">
        Small Radius
      </Box>
      <Box p="spacer40" bg="Canvas" borderColor="Default" borderRadius="border8">
        Medium Radius
      </Box>
      <Box p="spacer40" bg="Canvas" borderColor="Default" borderRadius="border16">
        Large Radius
      </Box>
    </div>
  ),
};

// Shadow Variants
export const ShadowVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
      <Box p="spacer40" bg="Surface" borderRadius="border4" shadow="shadowsmall">
        Small Shadow
      </Box>
      <Box p="spacer40" bg="Surface" borderRadius="border4" shadow="shadowmedium">
        Medium Shadow
      </Box>
      <Box p="spacer40" bg="Surface" borderRadius="border4" shadow="shadowlarge">
        Large Shadow
      </Box>
    </div>
  ),
};

// Layout Variants
export const LayoutVariants: Story = {
  render: () => (
    <div style={{ width: '100%' }}>
      <Box
        p="spacer30"
        bg="Canvas"
        borderColor="Default"
        display="block"
        style={{ marginBottom: '1rem' }}
      >
        Block Display (full width)
      </Box>
      <Box
        p="spacer30"
        bg="Canvas"
        borderColor="Default"
        display="inline-block"
        style={{ marginRight: '1rem' }}
      >
        Inline Block
      </Box>
      <Box p="spacer30" bg="Canvas" borderColor="Default" display="inline-block">
        Inline Block
      </Box>
    </div>
  ),
};

// Fixed Dimensions
export const FixedDimensions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <Box width={100} height={100} bg="PrimaryWeak" borderRadius="border4" />
      <Box width="150px" height="100px" bg="SuccessWeak" borderRadius="border4" />
      <Box width="200px" height="120px" bg="WarningWeak" borderRadius="border4" />
    </div>
  ),
};

// Complex Layout Example
export const ComplexLayout: Story = {
  render: () => (
    <Box p="spacer50" bg="Canvas" borderRadius="border8" shadow="shadowmedium" width="400px">
      <Box mb="spacer40" p="spacer30" bg="PrimaryWeak" borderRadius="border4">
        Header Section
      </Box>
      <Box mb="spacer30" p="spacer40" bg="Surface" borderColor="Subtle" borderRadius="border4">
        Content Section with longer text that demonstrates how the box handles content of varying
        lengths.
      </Box>
      <Box display="flex" style={{ gap: '1rem' }}>
        <Box p="spacer30" bg="SuccessWeak" borderRadius="border4" style={{ flex: 1 }}>
          Footer Left
        </Box>
        <Box p="spacer30" bg="WarningWeak" borderRadius="border4" style={{ flex: 1 }}>
          Footer Right
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A complex layout demonstrating nested boxes with different styling and spacing.',
      },
    },
  },
};

// As Different HTML Elements
export const DifferentElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Box as="section" p="spacer40" bg="Canvas" borderColor="Default">
        As Section Element
      </Box>
      <Box as="article" p="spacer40" bg="PrimaryWeak" borderRadius="border4">
        As Article Element
      </Box>
      <Box as="nav" p="spacer40" bg="SuccessWeak" borderRadius="border4">
        As Nav Element
      </Box>
      <Box as="aside" p="spacer40" bg="WarningWeak" borderRadius="border4">
        As Aside Element
      </Box>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Box can render as different HTML elements using the "as" prop while maintaining all styling capabilities.',
      },
    },
  },
};
