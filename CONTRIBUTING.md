# Contributing to Sapient

We love your input! We want to make contributing to Sapient as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Create a changeset for your changes.
7. Issue that pull request!

## Setting Up Development Environment

1. Clone your fork:
```bash
git clone https://github.com/your-username/sapient.git
cd sapient
```

2. Install dependencies:
```bash
yarn install
```

3. Build packages:
```bash
yarn build
```

4. Start development:
```bash
yarn dev
```

## Creating a New Component

1. Create a new package:
```bash
mkdir -p packages/sapient-your-component/src
cd packages/sapient-your-component
```

2. Create package.json with proper peer dependencies
3. Implement your component
4. Add stories for Storybook
5. Write tests
6. Update peer dependencies if needed:
```bash
yarn packages:check
yarn packages:fix
```

## Code Style

- We use ESLint and Prettier
- Run `yarn lint` to check your code
- Run `yarn format` to format your code
- Follow the existing code style

## Testing

- Write tests for all new functionality
- Run `yarn test` to run tests
- Run `yarn test:watch` for development
- Aim for high test coverage

## Creating Changesets

We use [changesets](https://github.com/changesets/changesets) for version management.

```bash
yarn changeset
```

- Select the packages you've changed
- Select the version bump type (patch/minor/major)
- Write a summary of your changes

## Commit Messages

We follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
