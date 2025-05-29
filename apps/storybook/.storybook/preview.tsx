import React from 'react';
import type { Preview } from '@storybook/react';
import { SapientProvider } from '@sapiently/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <SapientProvider>
        <Story />
      </SapientProvider>
    ),
  ],
};

export default preview;
