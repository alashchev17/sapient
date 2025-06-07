import { Tabs, type TabsProps } from '@sapiently/tabs';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<TabsProps> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['pill', 'underline'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicTabs = [
  {
    id: 'tab1',
    label: 'Overview',
    content: (
      <div>
        <h3>Overview Content</h3>
        <p>This is the overview tab content. Here you can see general information about the topic.</p>
      </div>
    ),
  },
  {
    id: 'tab2',
    label: 'Details',
    content: (
      <div>
        <h3>Details Content</h3>
        <p>This is the details tab content. Here you can find more specific information and technical details.</p>
      </div>
    ),
  },
  {
    id: 'tab3',
    label: 'Settings',
    content: (
      <div>
        <h3>Settings Content</h3>
        <p>This is the settings tab content. Here you can configure various options and preferences.</p>
      </div>
    ),
  },
];

const tabsWithIcons = [
  {
    id: 'home',
    label: 'Home',
    icon: '🏠',
    content: (
      <div>
        <h3>Home Dashboard</h3>
        <p>Welcome to your dashboard! Here's an overview of your recent activity.</p>
      </div>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: '👤',
    content: (
      <div>
        <h3>User Profile</h3>
        <p>Manage your profile information and account settings here.</p>
      </div>
    ),
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: '🔔',
    content: (
      <div>
        <h3>Notifications</h3>
        <p>View and manage your notifications and alerts.</p>
      </div>
    ),
  },
];

const tabsWithDisabled = [
  {
    id: 'available1',
    label: 'Available Tab',
    content: <div><h3>Available Content</h3><p>This tab is available and can be accessed.</p></div>,
  },
  {
    id: 'disabled',
    label: 'Disabled Tab',
    disabled: true,
    content: <div><h3>Disabled Content</h3><p>This content should not be visible.</p></div>,
  },
  {
    id: 'available2',
    label: 'Another Tab',
    content: <div><h3>Another Content</h3><p>This is another available tab.</p></div>,
  },
];

export const Default: Story = {
  args: {
    items: basicTabs,
  },
};

export const UnderlineVariant: Story = {
  args: {
    items: basicTabs,
    variant: 'underline',
  },
};

export const WithIcons: Story = {
  args: {
    items: tabsWithIcons,
    variant: 'pill',
  },
};

export const UnderlineWithIcons: Story = {
  args: {
    items: tabsWithIcons,
    variant: 'underline',
  },
};

export const FullWidth: Story = {
  args: {
    items: basicTabs,
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const Vertical: Story = {
  args: {
    items: basicTabs,
    orientation: 'vertical',
  },
  parameters: {
    layout: 'padded',
  },
};

export const VerticalUnderline: Story = {
  args: {
    items: basicTabs,
    variant: 'underline',
    orientation: 'vertical',
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithDisabledTab: Story = {
  args: {
    items: tabsWithDisabled,
  },
};

export const ManyTabs: Story = {
  args: {
    items: [
      { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
      { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
      { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
      { id: 'tab4', label: 'Tab 4', content: <div>Content 4</div> },
      { id: 'tab5', label: 'Tab 5', content: <div>Content 5</div> },
      { id: 'tab6', label: 'Tab 6', content: <div>Content 6</div> },
    ],
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
      <div>
        <Tabs
          items={basicTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <p style={{ marginTop: '1rem', color: '#666', textAlign: 'center' }}>
          Active tab: {activeTab}
        </p>
      </div>
    );
  },
};
