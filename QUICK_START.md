# Quick Start Guide

## Installation

```bash
# Using npm
npm install @sapient/theme @sapient/button

# Using yarn
yarn add @sapient/theme @sapient/button

# Using pnpm
pnpm add @sapient/theme @sapient/button
```

## Basic Setup

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SapientProvider } from '@sapient/theme';
import { Button } from '@sapient/button';

function App() {
  return (
    <SapientProvider>
      <div style={{ padding: '2rem' }}>
        <h1>My App with Sapient</h1>
        <Button variant="primary">Click me!</Button>
      </div>
    </SapientProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
```

## Component Examples

### Buttons

```tsx
import { Button } from '@sapient/button';

// Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="success">Success</Button>

// Different sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// Disabled
<Button disabled>Disabled</Button>
```

## Customizing Theme

```tsx
import { SapientProvider } from '@sapient/theme';

const myTheme = {
  colors: {
    primary: {
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
    },
  },
  spacing: {
    // Override spacing values
  },
  typography: {
    fonts: {
      body: '"Inter", sans-serif',
    },
  },
};

function App() {
  return (
    <SapientProvider theme={myTheme}>
      {/* Your app */}
    </SapientProvider>
  );
}
```

## TypeScript Support

All components are fully typed. You get IntelliSense for all props:

```tsx
import { Button, ButtonProps } from '@sapient/button';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Next Steps

1. Explore more components as they're added
2. Check out the [Storybook](https://your-storybook-url.com) for interactive demos
3. Read the [full documentation](https://your-docs-url.com)
4. Join our [Discord](https://discord.gg/your-discord) community
