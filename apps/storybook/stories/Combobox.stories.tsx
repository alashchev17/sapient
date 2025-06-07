import { Combobox, type ComboboxProps } from '@sapiently/combobox';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<ComboboxProps> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    state: {
      control: 'select',
      options: ['default', 'focused', 'hover', 'read-only', 'success', 'error'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    searchable: {
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

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

const optionsWithIcons = [
  { value: 'home', label: 'Home', icon: '🏠' },
  { value: 'work', label: 'Work', icon: '💼' },
  { value: 'school', label: 'School', icon: '🎓' },
  { value: 'gym', label: 'Gym', icon: '💪' },
];

const optionsWithDescriptions = [
  { 
    value: 'react', 
    label: 'React', 
    description: 'A JavaScript library for building user interfaces',
    icon: '⚛️'
  },
  { 
    value: 'vue', 
    label: 'Vue.js', 
    description: 'The Progressive JavaScript Framework',
    icon: '💚'
  },
  { 
    value: 'angular', 
    label: 'Angular', 
    description: 'Platform for building mobile and desktop web applications',
    icon: '🔺'
  },
  { 
    value: 'svelte', 
    label: 'Svelte', 
    description: 'Cybernetically enhanced web apps',
    icon: '🧡'
  },
];

const optionsWithDisabled = [
  { value: 'option1', label: 'Available Option 1' },
  { value: 'option2', label: 'Available Option 2' },
  { value: 'disabled', label: 'Disabled Option', disabled: true },
  { value: 'option3', label: 'Available Option 3' },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    label: 'Select a fruit',
    placeholder: 'Choose your favorite fruit...',
    helpText: 'Pick one from the list of available fruits.',
  },
};

export const WithSelection: Story = {
  args: {
    options: basicOptions,
    value: 'apple',
    label: 'Select a fruit',
    placeholder: 'Choose your favorite fruit...',
  },
};

export const Multiple: Story = {
  args: {
    options: basicOptions,
    mode: 'multiple',
    value: ['apple', 'banana'],
    label: 'Select multiple fruits',
    placeholder: 'Choose your favorite fruits...',
    helpText: 'You can select multiple options.',
  },
};

export const WithIcons: Story = {
  args: {
    options: optionsWithIcons,
    label: 'Select location',
    placeholder: 'Where are you going?',
  },
};

export const WithDescriptions: Story = {
  args: {
    options: optionsWithDescriptions,
    label: 'Choose framework',
    placeholder: 'Select a JavaScript framework...',
    helpText: 'Choose the framework you prefer for your project.',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: optionsWithDisabled,
    label: 'Available options',
    placeholder: 'Select an option...',
    helpText: 'Some options may not be available.',
  },
};

export const NotSearchable: Story = {
  args: {
    options: basicOptions,
    searchable: false,
    label: 'Select a fruit',
    placeholder: 'Choose from dropdown...',
    helpText: 'This combobox does not support search.',
  },
};

export const ErrorState: Story = {
  args: {
    options: basicOptions,
    label: 'Required selection',
    placeholder: 'Please make a selection...',
    state: 'error',
    required: true,
    errorMessage: 'You must select at least one option.',
  },
};

export const SuccessState: Story = {
  args: {
    options: basicOptions,
    value: 'apple',
    label: 'Verified selection',
    state: 'success',
    successMessage: 'Great choice! Selection confirmed.',
  },
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    value: 'apple',
    label: 'Disabled combobox',
    disabled: true,
    helpText: 'This combobox is currently disabled.',
  },
};

export const Small: Story = {
  args: {
    options: basicOptions,
    size: 'small',
    label: 'Small combobox',
    placeholder: 'Small size...',
  },
};

export const Large: Story = {
  args: {
    options: basicOptions,
    size: 'large',
    label: 'Large combobox',
    placeholder: 'Large size...',
  },
};

export const CustomFilter: Story = {
  args: {
    options: optionsWithDescriptions,
    label: 'Search frameworks',
    placeholder: 'Search by name or description...',
    helpText: 'Search includes both name and description.',
    filterFunction: (option, searchValue) => {
      const search = searchValue.toLowerCase();
      const label = typeof option.label === 'string' ? option.label.toLowerCase() : '';
      const description = typeof option.description === 'string' ? option.description.toLowerCase() : '';
      return label.includes(search) || description.includes(search);
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState<string>('');
    const [multipleValue, setMultipleValue] = useState<string[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '300px' }}>
        <Combobox
          options={basicOptions}
          value={singleValue}
          onSelectionChange={(value) => setSingleValue(value as string)}
          label="Single Selection"
          placeholder="Choose one fruit..."
        />
        
        <Combobox
          options={basicOptions}
          mode="multiple"
          value={multipleValue}
          onSelectionChange={(value) => setMultipleValue(value as string[])}
          label="Multiple Selection"
          placeholder="Choose multiple fruits..."
        />
        
        <div style={{ fontSize: '0.875rem', color: '#666' }}>
          <p>Single selection: {singleValue || 'None'}</p>
          <p>Multiple selection: {multipleValue.length > 0 ? multipleValue.join(', ') : 'None'}</p>
        </div>
      </div>
    );
  },
};
