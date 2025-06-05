import { Paragraph, type ParagraphProps } from '@sapiently/paragraph';
import { colors } from '@sapiently/design-tokens';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<ParagraphProps> = {
  title: 'Components/Paragraph',
  component: Paragraph,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant for the paragraph',
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
    marginBottom: {
      control: 'text',
      description: 'Bottom margin (CSS value)',
    },
    as: {
      control: 'select',
      options: ['p', 'div', 'span'],
      description: 'HTML element to render as',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Paragraph
export const Default: Story = {
  args: {
    children: 'This is a default paragraph using the medium size variant. It demonstrates the standard appearance and spacing of paragraph text in the design system.',
    size: 'medium',
    color: 'Default',
  },
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Paragraph size="small">
        Small paragraph text - This size is typically used for captions, fine print, or supplementary information that needs to be less prominent than the main content.
      </Paragraph>
      <Paragraph size="medium">
        Medium paragraph text - This is the default size for most body content and provides optimal readability for longer passages of text.
      </Paragraph>
      <Paragraph size="large">
        Large paragraph text - This size is used for introductory content, lead paragraphs, or when you want to emphasize important textual information.
      </Paragraph>
    </div>
  ),
};

// Color Variants
export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Paragraph color="Default">Default color paragraph text</Paragraph>
      <Paragraph color="Muted">Muted color paragraph text</Paragraph>
      <Paragraph color="Subtle">Subtle color paragraph text</Paragraph>
      <Paragraph color="Brand">Brand color paragraph text</Paragraph>
      <Paragraph color="Success">Success color paragraph text</Paragraph>
      <Paragraph color="Warning">Warning color paragraph text</Paragraph>
      <Paragraph color="Destructive">Destructive color paragraph text</Paragraph>
    </div>
  ),
};

// Text Alignment
export const TextAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <Paragraph align="left">
        Left aligned paragraph text. This is the default alignment for most content and provides natural reading flow for left-to-right languages.
      </Paragraph>
      <Paragraph align="center">
        Center aligned paragraph text. This alignment is often used for headlines, quotes, or standalone content that needs emphasis.
      </Paragraph>
      <Paragraph align="right">
        Right aligned paragraph text. This alignment is less common but can be useful for specific design layouts or RTL languages.
      </Paragraph>
      <Paragraph align="justify">
        Justified paragraph text. This alignment stretches the text to align with both left and right margins, creating clean edges on both sides of the text block.
      </Paragraph>
    </div>
  ),
};

// Font Weight Variants
export const FontWeightVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Paragraph weight="normal">
        Normal weight paragraph text - This uses the default font weight specified in the typography tokens.
      </Paragraph>
      <Paragraph weight="medium">
        Medium weight paragraph text - This provides slightly more emphasis while remaining readable for longer content.
      </Paragraph>
      <Paragraph weight="bold">
        Bold weight paragraph text - This provides strong emphasis and is ideal for important statements or highlights.
      </Paragraph>
    </div>
  ),
};

// Margin Variants
export const MarginVariants: Story = {
  render: () => (
    <div style={{ border: '1px dashed #ccc', padding: '1rem' }}>
      <Paragraph marginBottom="0.5rem">
        Paragraph with small bottom margin (0.5rem)
      </Paragraph>
      <Paragraph marginBottom="1rem">
        Paragraph with medium bottom margin (1rem)
      </Paragraph>
      <Paragraph marginBottom="2rem">
        Paragraph with large bottom margin (2rem)
      </Paragraph>
      <Paragraph marginBottom="0">
        Final paragraph with no bottom margin
      </Paragraph>
    </div>
  ),
};

// Truncation Example
export const TruncationExample: Story = {
  render: () => (
    <div style={{ width: '300px', border: '1px dashed #ccc', padding: '1rem' }}>
      <Paragraph truncate>
        This is a very long paragraph that will be truncated with an ellipsis when it overflows the container width. The truncation helps maintain layout consistency while indicating there's more content.
      </Paragraph>
      <Paragraph>
        This paragraph is not truncated and will wrap normally to multiple lines when it exceeds the container width.
      </Paragraph>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates text truncation behavior with ellipsis when content overflows.',
      },
    },
  },
};

// Different HTML Elements
export const DifferentElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Paragraph as="p">Paragraph rendered as P element (default)</Paragraph>
      <Paragraph as="div">Paragraph rendered as DIV element</Paragraph>
      <Paragraph as="span">Paragraph rendered as SPAN element (inline)</Paragraph>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how Paragraph can render as different HTML elements while maintaining styling.',
      },
    },
  },
};

// Content Example
export const ContentExample: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Paragraph size="large" color="Default" marginBottom="1.5rem">
        Design systems are a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.
      </Paragraph>
      <Paragraph marginBottom="1rem">
        They serve as a single source of truth for design and development teams, ensuring consistency across products while improving efficiency and reducing duplication of effort.
      </Paragraph>
      <Paragraph size="small" color="Muted" marginBottom="0">
        This example demonstrates how different paragraph variants can work together to create a content hierarchy with proper spacing and visual emphasis.
      </Paragraph>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A real-world example showing how different paragraph variants create content hierarchy.',
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  args: {
    children: 'This is an interactive paragraph. Use the controls below to experiment with different properties and see how they affect the appearance and behavior.',
    size: 'medium',
    color: 'Default',
    align: 'left',
    weight: 'normal',
    marginBottom: '1rem',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls panel to experiment with different paragraph properties.',
      },
    },
  },
};
