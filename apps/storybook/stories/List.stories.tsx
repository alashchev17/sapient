import type { Meta, StoryObj } from '@storybook/react';
import { List } from '@sapiently/list';
import { Text } from '@sapiently/primitives';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible list component that supports both ordered and unordered lists with customizable spacing and styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['unordered', 'ordered'],
      description: 'List type - unordered renders <ul>, ordered renders <ol>',
    },
    spacing: {
      control: { type: 'select' },
      options: ['spacer10', 'spacer20', 'spacer30', 'spacer40', 'spacer50', 'spacer60'],
      description: 'Spacing between list items',
    },
    styleType: {
      control: { type: 'select' },
      options: [
        'disc',
        'circle',
        'square',
        'decimal',
        'decimal-leading-zero',
        'lower-roman',
        'upper-roman',
        'lower-alpha',
        'upper-alpha',
      ],
      description: 'Custom list-style-type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Unordered: Story = {
  args: {
    variant: 'unordered',
    spacing: 'spacer40',
  },
  render: (args) => (
    <List {...args}>
      <Text>First list item with some longer content to show text wrapping</Text>
      <Text>Second list item</Text>
      <Text>Third list item</Text>
      <Text>Fourth list item</Text>
    </List>
  ),
};

export const Ordered: Story = {
  args: {
    variant: 'ordered',
    spacing: 'spacer40',
  },
  render: (args) => (
    <List {...args}>
      <Text>First numbered item</Text>
      <Text>Second numbered item</Text>
      <Text>Third numbered item</Text>
      <Text>Fourth numbered item</Text>
    </List>
  ),
};

export const CustomSpacing: Story = {
  args: {
    variant: 'unordered',
    spacing: 'spacer20',
  },
  render: (args) => (
    <List {...args}>
      <Text>Tight spacing item 1</Text>
      <Text>Tight spacing item 2</Text>
      <Text>Tight spacing item 3</Text>
    </List>
  ),
};

export const CustomStyleType: Story = {
  args: {
    variant: 'ordered',
    spacing: 'spacer40',
    styleType: 'upper-roman',
  },
  render: (args) => (
    <List {...args}>
      <Text>Roman numeral item I</Text>
      <Text>Roman numeral item II</Text>
      <Text>Roman numeral item III</Text>
    </List>
  ),
};

export const MixedContent: Story = {
  args: {
    variant: 'unordered',
    spacing: 'spacer40',
  },
  render: (args) => (
    <List {...args}>
      <span>Plain span element</span>
      <Text variant="p1">Text component</Text>
      <li>Already an li element</li>
      <div>Div element with nested content</div>
    </List>
  ),
};

export const NestedLists: Story = {
  args: {
    variant: 'unordered',
    spacing: 'spacer30',
  },
  render: (args) => (
    <List {...args}>
      <Text>First level item</Text>
      <li>
        <Text>First level item with nested list</Text>
        <List variant="unordered" spacing="spacer20" style={{ marginTop: '0.5rem' }}>
          <Text>Nested item 1</Text>
          <Text>Nested item 2</Text>
        </List>
      </li>
      <Text>Another first level item</Text>
    </List>
  ),
};
