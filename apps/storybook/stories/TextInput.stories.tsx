import {
  TextInput,
  TextArea,
  type TextInputProps,
  type TextAreaProps,
} from '@sapiently/text-input';
import type { Meta, StoryObj } from '@storybook/react';
import { CardIcon, RevealPasswordIcon } from '@sapiently/icons';

const meta: Meta<TextInputProps> = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'focused', 'hover', 'read-only', 'success', 'error'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'url', 'tel', 'search', 'number'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helpText: 'We will never share your email with anyone.',
  },
};

export const WithPrefix: Story = {
  args: {
    label: 'Website URL',
    placeholder: 'example.com',
    prefix: <CardIcon />,
    helpText: 'Enter your website without https://',
  },
};

export const WithSuffix: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    suffix: <RevealPasswordIcon />,
    helpText: 'Must be at least 8 characters long.',
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    required: true,
    helpText: 'This field is required.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    state: 'error',
    value: 'invalid-email',
    errorMessage: 'Please enter a valid email address.',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    state: 'success',
    value: 'user@example.com',
    successMessage: 'Email address is valid!',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'User ID',
    value: 'user_12345',
    state: 'read-only',
    helpText: 'This value cannot be changed.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    disabled: true,
    helpText: 'This field is currently disabled.',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'large',
  },
};

// TextArea Stories
const textAreaMeta: Meta<TextAreaProps> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'focused', 'hover', 'read-only', 'success', 'error'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    rows: {
      control: 'number',
    },
    resize: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

type TextAreaStory = StoryObj<typeof textAreaMeta>;

export const TextAreaDefault: TextAreaStory = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description...',
    helpText: 'Provide a detailed description of your project.',
    rows: 4,
  },
  render: (args) => <TextArea {...args} />,
};

export const TextAreaError: TextAreaStory = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments...',
    state: 'error',
    value: 'Too short',
    errorMessage: 'Comments must be at least 10 characters long.',
    rows: 3,
  },
  render: (args) => <TextArea {...args} />,
};

export const TextAreaNoResize: TextAreaStory = {
  args: {
    label: 'Fixed Size',
    placeholder: 'This textarea cannot be resized...',
    resize: false,
    rows: 5,
  },
  render: (args) => <TextArea {...args} />,
};
