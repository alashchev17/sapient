# Sapient + Next.js Example

This example shows how to use Sapient Design System with Next.js.

## Setup

```bash
# Install dependencies
npm install @sapiently/theme @sapiently/button

# Or use the workspace version (for development)
yarn add @sapiently/theme@^0.2.1 @sapiently/button@^0.2.1
```

## Usage

### 1. Configure your app layout

```tsx
// app/layout.tsx
import { SapientProvider } from '@sapiently/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SapientProvider>{children}</SapientProvider>
      </body>
    </html>
  );
}
```

### 2. Use components

```tsx
// app/page.tsx
import { Button } from '@sapiently/button';

export default function Home() {
  return (
    <main>
      <h1>Welcome to Sapient + Next.js</h1>
      <Button variant="primary" size="large">
        Get Started
      </Button>
    </main>
  );
}
```

## Custom Theme

```tsx
// app/providers.tsx
'use client';

import { SapientProvider } from '@sapiently/theme';

const customTheme = {
  colors: {
    primary: {
      500: '#0070f3',
      600: '#0051cc',
      700: '#003d99',
    },
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  return <SapientProvider theme={customTheme}>{children}</SapientProvider>;
}
```
