import { HelpText, type HelpTextProps } from '@sapiently/help-text';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<HelpTextProps> = {
  title: 'Components/HelpText',
  component: HelpText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is helpful information about the field above.',
  },
};

export const Error: Story = {
  args: {
    children: 'This field is required and cannot be empty.',
    variant: 'error',
  },
};

export const Success: Story = {
  args: {
    children: 'Great! This input looks good.',
    variant: 'success',
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a longer help text that explains more complex requirements or provides detailed guidance about what the user should enter in the field.',
  },
};
