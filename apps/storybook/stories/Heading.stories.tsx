import { Heading, type HeadingProps } from '@sapiently/heading';
import { colors } from '@sapiently/design-tokens';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<HeadingProps> = {
  title: 'Components/Heading',
  component: Heading,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Heading level (1-6)',
    },
    variant: {
      control: 'select',
      options: ['default', 'display'],
      description: 'Heading variant style',
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
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span'],
      description: 'HTML element to render as',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Heading
export const Default: Story = {
  args: {
    children: 'Default Heading',
    level: 1,
    variant: 'default',
    color: 'Default',
  },
};

// Heading Levels
export const HeadingLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  ),
};

// Display Variants
export const DisplayVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 'normal', color: '#666' }}>Default Variants</h2>
        <Heading level={1} variant="default">Display Heading 1</Heading>
        <Heading level={2} variant="default">Display Heading 2</Heading>
        <Heading level={3} variant="default">Display Heading 3</Heading>
      </div>
      <div>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 'normal', color: '#666' }}>Display Variants</h2>
        <Heading level={1} variant="display">Display Heading 1</Heading>
        <Heading level={2} variant="display">Display Heading 2</Heading>
        <Heading level={3} variant="display">Display Heading 3</Heading>
      </div>
    </div>
  ),
};

// Color Variants
export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={2} color="Default">Default Color Heading</Heading>
      <Heading level={2} color="Brand">Brand Color Heading</Heading>
      <Heading level={2} color="Muted">Muted Color Heading</Heading>
      <Heading level={2} color="Success">Success Color Heading</Heading>
      <Heading level={2} color="Warning">Warning Color Heading</Heading>
      <Heading level={2} color="Destructive">Destructive Color Heading</Heading>
    </div>
  ),
};

// Text Alignment
export const TextAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={2} align="left">Left Aligned Heading</Heading>
      <Heading level={2} align="center">Center Aligned Heading</Heading>
      <Heading level={2} align="right">Right Aligned Heading</Heading>
    </div>
  ),
};

// Font Weight Variants
export const FontWeightVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={2} weight="normal">Normal Weight Heading</Heading>
      <Heading level={2} weight="medium">Medium Weight Heading</Heading>
      <Heading level={2} weight="bold">Bold Weight Heading</Heading>
    </div>
  ),
};

// Margin Variants
export const MarginVariants: Story = {
  render: () => (
    <div style={{ border: '1px dashed #ccc', padding: '1rem' }}>
      <Heading level={3} marginBottom="0.5rem">Heading with Small Margin</Heading>
      <p style={{ margin: '0 0 1rem 0', color: '#666' }}>Content following the heading</p>
      
      <Heading level={3} marginBottom="2rem">Heading with Large Margin</Heading>
      <p style={{ margin: '0 0 1rem 0', color: '#666' }}>Content following the heading</p>
      
      <Heading level={3} marginBottom="0">Heading with No Margin</Heading>
      <p style={{ margin: '0', color: '#666' }}>Content immediately following</p>
    </div>
  ),
};

// Semantic HTML Elements
export const SemanticElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Heading level={1} as="h1">Level 1 as H1 (semantic match)</Heading>
      <Heading level={2} as="h1">Level 2 styling as H1 element</Heading>
      <Heading level={1} as="div">Level 1 styling as DIV element</Heading>
      <Heading level={3} as="span">Level 3 styling as SPAN element</Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how styling can be independent of the semantic HTML element used.',
      },
    },
  },
};

// Truncation Example
export const TruncationExample: Story = {
  render: () => (
    <div style={{ width: '300px', border: '1px dashed #ccc', padding: '1rem' }}>
      <Heading level={2} truncate>
        This is a Very Long Heading That Will Be Truncated
      </Heading>
      <Heading level={3}>
        This heading wraps normally when it exceeds the container width
      </Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows how headings can be truncated with ellipsis when they overflow.',
      },
    },
  },
};

// Content Hierarchy Example
export const ContentHierarchy: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Heading level={1} variant="display" color="Brand" marginBottom="1rem">
        Design System Guide
      </Heading>
      
      <Heading level={2} marginBottom="1rem">
        Introduction
      </Heading>
      <p style={{ margin: '0 0 2rem 0', lineHeight: 1.6 }}>
        This section introduces the core concepts of our design system and how to use the heading components effectively.
      </p>
      
      <Heading level={2} marginBottom="1rem">
        Typography Hierarchy
      </Heading>
      
      <Heading level={3} marginBottom="0.75rem">
        Primary Headings
      </Heading>
      <p style={{ margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
        Use level 1 and 2 headings for main sections and primary content areas.
      </p>
      
      <Heading level={3} marginBottom="0.75rem">
        Secondary Headings
      </Heading>
      <p style={{ margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
        Use level 3 and 4 headings for subsections and detailed content organization.
      </p>
      
      <Heading level={4} marginBottom="0.5rem">
        Supporting Headings
      </Heading>
      <p style={{ margin: '0 0 1rem 0', lineHeight: 1.6 }}>
        Level 5 and 6 headings are perfect for fine-grained content structure.
      </p>
      
      <Heading level={5} marginBottom="0.5rem">
        Detail Headings
      </Heading>
      <p style={{ margin: '0', lineHeight: 1.6 }}>
        These provide the finest level of content organization.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive example showing proper heading hierarchy in content.',
      },
    },
  },
};

// Hero Section Example
export const HeroSection: Story = {
  render: () => (
    <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#f8f9fa', borderRadius: '8px' }}>
      <Heading level={1} variant="display" color="Brand" marginBottom="1rem">
        Welcome to Our Platform
      </Heading>
      <Heading level={2} variant="default" color="Muted" weight="normal" marginBottom="0">
        Build amazing experiences with our design system
      </Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using display variant headings in a hero section layout.',
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  args: {
    children: 'Interactive Heading Component',
    level: 2,
    variant: 'default',
    color: 'Brand',
    align: 'left',
    weight: 'medium',
    marginBottom: '1rem',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls panel to experiment with different heading properties.',
      },
    },
  },
};
