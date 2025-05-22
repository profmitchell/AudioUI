# Contributing to AudioUI

Thank you for your interest in contributing to AudioUI! This document provides guidelines and instructions for contributing to the project. We welcome all contributions, whether they're new components, bug fixes, documentation improvements, or other enhancements.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Component Guidelines](#component-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to foster an inclusive and welcoming community.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm or yarn
- Git

### Fork and Clone the Repository

1. Fork the AudioUI repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/AudioUI.git
   cd AudioUI
   ```
3. Add the original repository as an upstream remote:
   ```bash
   git remote add upstream https://github.com/profmitchell/AudioUI.git
   ```

### Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

## Development Workflow

1. **Sync your fork** with the upstream repository:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-you-are-fixing
   ```

3. **Make your changes** and commit them with clear, descriptive commit messages:
   ```bash
   git commit -m "Add new feature: description of what was added"
   ```

4. **Push your branch** to your fork on GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** from your branch to the main AudioUI repository.

## Pull Request Process

1. Ensure your code follows the [Coding Standards](#coding-standards)
2. Update documentation if necessary
3. Add tests for new features
4. Make sure all tests pass
5. Fill out the pull request template completely
6. Request a review from a maintainer

After submitting your PR, a maintainer will review your code and may request changes. Once approved, your code will be merged into the main branch.

## Coding Standards

### General Guidelines

- Follow the existing code style in the project
- Use TypeScript for type safety
- Write self-documenting code with clear function and variable names
- Comment complex logic
- Keep functions small and focused on a single responsibility

### Component Guidelines

When creating new components:

1. Follow the project's component structure
2. Ensure accessibility compliance (ARIA attributes, keyboard navigation, etc.)
3. Make components responsive and mobile-friendly
4. Include appropriate PropTypes or TypeScript interfaces
5. Document props, including types and default values

## Testing

We use Jest and React Testing Library for testing. Please include tests for any new components or features.

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Documentation

Documentation is essential for new components. Please include:

1. A component description
2. Props documentation
3. Usage examples
4. Accessibility considerations

For components, create a documentation page in the appropriate directory under `/app/docs/components/`.

## JUCE Integration Contributions

If you're contributing to the JUCE integration (AudioUIJUCEStarterTemplate):

1. Ensure compatibility with the main AudioUI library
2. Test with JUCE 8 or later
3. Document C++/JavaScript communication patterns
4. Include both development and production usage examples

---

Thank you for contributing to AudioUI! Your efforts help make audio software development better for everyone.
