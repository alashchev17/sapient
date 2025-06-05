import { Text, type TextProps } from '@sapiently/primitives';
import { colors, typography } from '@sapiently/design-tokens';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<TextProps> = {
  title: 'Primitives/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(typography),
      description: 'Typography variant token',
    },
    color: {
      control: 'select',
      options: Object.keys(colors.text),
      description: 'Text color token',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'bold'],
      description: 'Font weight override',
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate text with ellipsis',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
      description: 'HTML element to render as',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Text
export const Default: Story = {
  args: {
    children: 'Default text using p1 variant',
    variant: 'p1',
    color: 'Default',
  },
};

// Heading Variants
export const HeadingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="h1">Heading 1 - Large Title</Text>
      <Text variant="h2">Heading 2 - Section Title</Text>
      <Text variant="h3">Heading 3 - Subsection</Text>
      <Text variant="h4">Heading 4 - Small Heading</Text>
      <Text variant="h5">Heading 5 - Tiny Heading</Text>
      <Text variant="h6">Heading 6 - Micro Heading</Text>
    </div>
  ),
};

// Display Heading Variants
export const DisplayHeadingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="h1Display">Display Heading 1 - Hero Title</Text>
      <Text variant="h2Display">Display Heading 2 - Large Display</Text>
      <Text variant="h3Display">Display Heading 3 - Medium Display</Text>
      <Text variant="h4Display">Display Heading 4 - Small Display</Text>
      <Text variant="h5Display">Display Heading 5 - Tiny Display</Text>
      <Text variant="h6Display">Display Heading 6 - Micro Display</Text>
    </div>
  ),
};

// Body Text Variants
export const BodyTextVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="p1">
        Paragraph 1 - This is the main body text variant, typically used for primary content and
        longer text passages that need good readability.
      </Text>
      <Text variant="p2">
        Paragraph 2 - This is a smaller body text variant, often used for secondary content,
        captions, or supporting information.
      </Text>
      <Text variant="p3">
        Paragraph 3 - This is the smallest body text variant, typically used for fine print,
        metadata, or very small supporting text.
      </Text>
    </div>
  ),
};

// Color Variants
export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="p1" color="Default">
        Default text color
      </Text>
      <Text variant="p1" color="Muted">
        Muted text color
      </Text>
      <Text variant="p1" color="Subtle">
        Subtle text color
      </Text>
      <Text variant="p1" color="Brand">
        Brand text color
      </Text>
      <Text variant="p1" color="Disabled">
        Disabled text color
      </Text>
      <Text variant="p1" color="Focus">
        Focus text color
      </Text>
      <Text variant="p1" color="Destructive">
        Destructive text color
      </Text>
      <Text variant="p1" color="Warning">
        Warning text color
      </Text>
      <Text variant="p1" color="Success">
        Success text color
      </Text>
    </div>
  ),
};

// Text Alignment
export const TextAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Text variant="p1" align="left">
        Left aligned text content
      </Text>
      <Text variant="p1" align="center">
        Center aligned text content
      </Text>
      <Text variant="p1" align="right">
        Right aligned text content
      </Text>
      <Text variant="p1" align="justify">
        Justified text content that will stretch across the full width of the container to create
        even margins on both sides.
      </Text>
    </div>
  ),
};

// Font Weight Variants
export const FontWeightVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="p1" weight="normal">
        Normal weight text
      </Text>
      <Text variant="p1" weight="medium">
        Medium weight text
      </Text>
      <Text variant="p1" weight="bold">
        Bold weight text
      </Text>
      <Text variant="h3" weight="normal">
        Heading with normal weight override
      </Text>
      <Text variant="h3" weight="bold">
        Heading with bold weight override
      </Text>
    </div>
  ),
};

// Text Truncation
export const TextTruncation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '200px' }}>
      <Text variant="p1" truncate>
        This is a very long text that will be truncated with an ellipsis when it overflows the
        container width
      </Text>
      <Text variant="h3" truncate>
        Very long heading that gets truncated
      </Text>
      <Text variant="p2" truncate>
        Another example of truncated text content that demonstrates the ellipsis behavior
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text components with truncate prop will show ellipsis when content overflows.',
      },
    },
  },
};

// Semantic HTML Elements
export const SemanticElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="h1" as="h1">
        Heading 1 as H1 element
      </Text>
      <Text variant="h2" as="h2">
        Heading 2 as H2 element
      </Text>
      <Text variant="p1" as="p">
        Paragraph as P element
      </Text>
      <Text variant="p2" as="span">
        Paragraph style as SPAN element
      </Text>
      <Text variant="h3" as="div">
        Heading style as DIV element
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Text component automatically chooses semantic HTML elements but can be overridden with the "as" prop.',
      },
    },
  },
};

// Typography Scale
export const TypographyScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <Text variant="h1Display" color="Brand">
          Display Typography
        </Text>
        <Text variant="p2" color="Muted">
          Large display headings for hero sections
        </Text>
      </div>
      <div>
        <Text variant="h1">Standard Headings</Text>
        <Text variant="p2" color="Muted">
          Regular headings for content structure
        </Text>
      </div>
      <div>
        <Text variant="p1">Body Text</Text>
        <Text variant="p2" color="Muted">
          Main content and reading text
        </Text>
      </div>
    </div>
  ),
};

// Content Hierarchy Example
export const ContentHierarchy: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', lineHeight: 1.6 }}>
      <Text variant="h1Display" color="Brand" style={{ marginBottom: '0.5rem' }}>
        Design System Typography
      </Text>
      <Text variant="p1" color="Muted" style={{ marginBottom: '2rem' }}>
        A comprehensive guide to using text components in your design system
      </Text>

      <Text variant="h2" style={{ marginBottom: '1rem' }}>
        Introduction
      </Text>
      <Text variant="p1" style={{ marginBottom: '1.5rem' }}>
        Typography is one of the most important aspects of any design system. It helps establish
        hierarchy, improve readability, and maintain consistency across your application.
      </Text>

      <Text variant="h3" style={{ marginBottom: '1rem' }}>
        Best Practices
      </Text>
      <Text variant="p1" style={{ marginBottom: '1rem' }}>
        When using typography components, consider the following guidelines:
      </Text>
      <Text variant="p2" color="Muted" style={{ marginBottom: '0.5rem' }}>
        • Use semantic HTML elements for accessibility
      </Text>
      <Text variant="p2" color="Muted" style={{ marginBottom: '0.5rem' }}>
        • Maintain consistent spacing between elements
      </Text>
      <Text variant="p2" color="Muted" style={{ marginBottom: '1.5rem' }}>
        • Choose appropriate color tokens for context
      </Text>

      <Text variant="h4" style={{ marginBottom: '0.5rem' }}>
        Final Notes
      </Text>
      <Text variant="p3" color="Subtle">
        This example demonstrates how different typography variants work together to create a clear
        content hierarchy.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive example showing how different text variants work together to create clear content hierarchy.',
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  args: {
    children: 'Customize this text using the controls below to see how different properties affect the appearance',
    variant: 'h2',
    color: 'Brand',
    align: 'center',
    weight: 'medium',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', border: '1px dashed #ccc', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Use the controls panel to experiment with different text properties. The container has a fixed width to demonstrate truncation.',
      },
    },
  },
};
