# Sapient

Sapient is a modern design system implementation for React, built with accessibility, consistency, and developer experience in mind. Inspired by industry-leading design systems like Twilio's Paste.

## Features

- 🎨 **Comprehensive token system** - Colors, typography, spacing, shadows, and more
- 📦 **Modular architecture** - Pick only what you need
- 🚀 **TypeScript first** - Full type safety and IntelliSense support
<!-- - ♿ **Accessible by default** - WCAG 2.1 AA compliant components -->
- 🎯 **Developer focused** - Great DX with detailed documentation
- 🔧 **Customizable** - Extend and customize to match your brand
- 📖 **Storybook integration** - Interactive component playground

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Yarn >= 4.0.0

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-org/sapient.git
cd sapient
```

2. Install dependencies:

```bash
yarn install
```

3. Build all packages:

```bash
yarn build
```

4. Start Storybook:

```bash
yarn start:storybook
```

## Development

### Available Commands

- `yarn build` - Build all packages
- `yarn dev` - Build packages and start Storybook
- `yarn test` - Run tests
- `yarn lint` - Lint code
- `yarn format` - Format code with Prettier
- `yarn changeset` - Create a changeset for version updates
- `yarn packages:check` - Check peer dependencies
- `yarn packages:fix` - Fix peer dependencies

### Package Structure

```
sapient/
├── packages/           # Component and utility packages
│   ├── sapient-core/        # Core utilities and types
│   ├── sapient-design-tokens/ # Design tokens
│   ├── sapient-theme/       # Theme provider
│   ├── sapient-button/      # Button component
│   └── ...                  # Other components
├── apps/              # Applications
│   └── storybook/          # Component documentation
└── scripts/           # Build and maintenance scripts
```

## Usage in Your Project

### Basic Setup

```tsx
import { SapientProvider } from '@sapiently/theme';
import { Button } from '@sapiently/button';

function App() {
  return (
    <SapientProvider>
      <Button variant="primary">Click me</Button>
    </SapientProvider>
  );
}
```

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a Pull Request.

### Creating Changesets

Each change to a package must come with a changeset:

```bash
yarn changeset
```

Follow the prompts to describe your changes.

## Architecture Decisions

- **Monorepo with Yarn Workspaces** - Efficient dependency management and cross-package development
- **TypeScript** - Type safety and better developer experience
- **Changesets** - Automated versioning and changelog generation
- **Peer Dependencies** - Avoiding version conflicts in consuming applications
- **Build with tsup** - Fast, zero-config bundler for TypeScript packages

## License

MIT © Sapiently
