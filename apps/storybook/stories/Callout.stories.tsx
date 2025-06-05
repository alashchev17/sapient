import type { Meta, StoryObj } from '@storybook/react';
import { Callout } from '@sapiently/callout';

const meta: Meta<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A callout component for highlighting important information with different visual variants and automatic icons.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'warning', 'error', 'success'],
      description: 'Visual variant that determines colors and icon',
    },
    title: {
      control: { type: 'text' },
      description: 'Optional title/headline for the callout',
    },
    children: {
      control: { type: 'text' },
      description: 'Main content of the callout',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    title: 'Neutral callout',
    children:
      'This is an neutral callout. Use it to provide helpful context or additional details.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children:
      'This is a warning callout. Use it to alert users about potential issues or important considerations.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children:
      'This is an error callout. Use it to communicate critical issues or validation errors.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children:
      'This is a success callout. Use it to confirm successful actions or positive outcomes.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'neutral',
    children:
      'This callout has no title, just the main content. The icon is still displayed automatically.',
  },
};

export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: 'Long Content Example',
    children:
      'This is a callout with much longer content to demonstrate how the component handles text wrapping and maintains proper spacing. The icon stays aligned to the top while the text flows naturally. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Callout variant="neutral" title="Information">
        This is an informational callout with helpful context.
      </Callout>
      <Callout variant="warning" title="Warning">
        This is a warning about potential issues.
      </Callout>
      <Callout variant="error" title="Error">
        This is an error message for critical issues.
      </Callout>
      <Callout variant="success" title="Success">
        This is a success message for positive outcomes.
      </Callout>
    </div>
  ),
};
