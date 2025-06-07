import { RadioGroup, type RadioGroupProps } from '@sapiently/radio-group';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<RadioGroupProps> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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

const basicOptions = [
  { value: 'option1', label: 'First Option' },
  { value: 'option2', label: 'Second Option' },
  { value: 'option3', label: 'Third Option' },
];

const optionsWithHelp = [
  { 
    value: 'starter', 
    label: 'Starter Plan',
    helpText: 'Perfect for individuals and small teams'
  },
  { 
    value: 'professional', 
    label: 'Professional Plan',
    helpText: 'For growing businesses with advanced needs'
  },
  { 
    value: 'enterprise', 
    label: 'Enterprise Plan',
    helpText: 'For large organizations with custom requirements'
  },
];

const optionsWithDisabled = [
  { value: 'available1', label: 'Available Option 1' },
  { value: 'available2', label: 'Available Option 2' },
  { value: 'disabled', label: 'Disabled Option', disabled: true },
  { value: 'available3', label: 'Available Option 3' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <RadioGroup
        label="Choose an option"
        options={basicOptions}
        value={value}
        onChange={setValue}
        helpText="Select one of the options below."
      />
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [value, setValue] = useState('option2');
    return (
      <RadioGroup
        label="Choose an option"
        options={basicOptions}
        value={value}
        onChange={setValue}
        helpText="Option 2 is currently selected."
      />
    );
  },
};

export const WithHelpText: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <RadioGroup
        label="Select a Plan"
        options={optionsWithHelp}
        value={value}
        onChange={setValue}
        helpText="Choose the plan that best fits your needs."
      />
    );
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <RadioGroup
        label="Available Options"
        options={optionsWithDisabled}
        value={value}
        onChange={setValue}
        helpText="Some options may not be available."
      />
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <RadioGroup
        label="Required Selection"
        options={basicOptions}
        value={value}
        onChange={setValue}
        required={true}
        helpText="You must select one option to continue."
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Group',
    options: basicOptions,
    disabled: true,
    helpText: 'This entire group is disabled.',
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <RadioGroup
        label="Payment Method"
        options={[
          { value: 'card', label: 'Credit Card' },
          { value: 'paypal', label: 'PayPal' },
          { value: 'bank', label: 'Bank Transfer' },
        ]}
        value={value}
        onChange={setValue}
        required={true}
        errorMessage="Please select a payment method to continue."
      />
    );
  },
};

export const LongLabels: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <RadioGroup
        label="Terms and Conditions"
        options={[
          { 
            value: 'agree', 
            label: 'I agree to the Terms of Service and Privacy Policy',
            helpText: 'By selecting this option, you accept our terms and conditions.'
          },
          { 
            value: 'disagree', 
            label: 'I do not agree to the Terms of Service',
            helpText: 'You will not be able to proceed without accepting the terms.'
          },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};
