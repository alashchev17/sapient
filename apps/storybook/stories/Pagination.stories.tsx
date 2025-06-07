import { Pagination, type PaginationProps } from '@sapiently/pagination';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<PaginationProps> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['numeric', 'prevnext'],
    },
    siblingCount: {
      control: 'number',
    },
    showFirstLast: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const PrevNextVariant: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    variant: 'prevnext',
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const NoFirstLast: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    showFirstLast: false,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const CustomLabels: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    labels: {
      previous: 'Previous',
      next: 'Next',
      first: 'First',
      last: 'Last',
    },
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const Interactive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    return (
      <div style={{ textAlign: 'center' }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <p style={{ marginTop: '1rem', color: '#666' }}>
          Current page: {currentPage} of {totalPages}
        </p>
      </div>
    );
  },
};
