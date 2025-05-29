# Publishing Sapient Design System

## Prerequisites

1. Create an npm account at https://www.npmjs.com/
2. Login to npm in your terminal:
   ```bash
   npm login
   ```

## Initial Setup

### 1. Update Package Names (if needed)

If you want to publish under your own scope, update all package.json files:
- Change `@sapient/` to `@yourscope/`
- Or remove the scope to publish as `sapient-core`, `sapient-button`, etc.

### 2. Set Initial Versions

Currently all packages are at `0.0.0`. Before first publish, set them to `0.1.0`:

```bash
yarn changeset version
```

## Publishing Process

### Manual Publishing

1. Build all packages:
   ```bash
   yarn build
   ```

2. Create a changeset for your changes:
   ```bash
   yarn changeset
   ```

3. Version packages:
   ```bash
   yarn changeset version
   ```

4. Publish to npm:
   ```bash
   yarn changeset publish
   ```

### Automated Publishing with GitHub Actions

Create `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    branches:
      - main

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --immutable

      - name: Build packages
        run: yarn build

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          publish: yarn changeset publish
          version: yarn changeset version
          commit: "chore: release packages"
          title: "chore: release packages"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Setting up GitHub Secrets

1. Get your npm token:
   ```bash
   npm token create
   ```

2. Add to GitHub:
   - Go to your repo → Settings → Secrets → Actions
   - Add `NPM_TOKEN` with your npm token

## Usage Documentation

### For NPM Users

```bash
# Install core packages
npm install @sapient/theme @sapient/button

# Or with yarn
yarn add @sapient/theme @sapient/button

# Or with pnpm
pnpm add @sapient/theme @sapient/button
```

### Basic Usage

```tsx
import { SapientProvider } from '@sapient/theme';
import { Button } from '@sapient/button';

function App() {
  return (
    <SapientProvider>
      <Button variant="primary">Hello Sapient!</Button>
    </SapientProvider>
  );
}
```

### With Custom Theme

```tsx
import { SapientProvider } from '@sapient/theme';

const customTheme = {
  colors: {
    primary: {
      500: '#your-color',
      600: '#your-color-dark',
      700: '#your-color-darker',
    }
  }
};

function App() {
  return (
    <SapientProvider theme={customTheme}>
      {/* Your app */}
    </SapientProvider>
  );
}
```

## Version Strategy

- **Patch (0.0.X)**: Bug fixes, documentation updates
- **Minor (0.X.0)**: New features, backwards compatible
- **Major (X.0.0)**: Breaking changes

## Pre-release Testing

1. Pack packages locally:
   ```bash
   cd packages/sapient-button
   npm pack
   ```

2. Install in a test project:
   ```bash
   npm install ../path/to/sapient-button-0.1.0.tgz
   ```

## Documentation Website

Consider setting up:
1. **Docusaurus** for documentation site
2. **Vercel/Netlify** for hosting
3. **Storybook** deployment for component demos

## Package.json Configuration

Ensure each package has:
```json
{
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/sapient.git",
    "directory": "packages/package-name"
  },
  "homepage": "https://github.com/yourusername/sapient#readme",
  "bugs": {
    "url": "https://github.com/yourusername/sapient/issues"
  }
}
```
