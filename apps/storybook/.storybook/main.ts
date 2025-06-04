import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    // Configure Vite to resolve workspace packages
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@sapiently/button': resolve(__dirname, '../../../packages/sapient-button/src'),
      '@sapiently/core': resolve(__dirname, '../../../packages/sapient-core/src'),
      '@sapiently/design-tokens': resolve(__dirname, '../../../packages/sapient-design-tokens/src'),
      '@sapiently/theme': resolve(__dirname, '../../../packages/sapient-theme/src'),
    };

    return config;
  },
};

export default config;
