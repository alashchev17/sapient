import { Anchor, type AnchorProps } from '@sapiently/anchor';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<AnchorProps> = {
  title: 'Components/Anchor',
  component: Anchor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'inline'],
    },
    disabled: {
      control: 'boolean',
    },
    external: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Link',
    href: '#',
  },
};

export const Inline: Story = {
  args: {
    children: 'Inline Link',
    href: '#',
    variant: 'inline',
  },
};

export const External: Story = {
  args: {
    children: 'External Link',
    href: 'https://example.com',
    external: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Link',
    href: '#',
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a longer link text that shows how the component handles wrapping',
    href: '#',
  },
};
