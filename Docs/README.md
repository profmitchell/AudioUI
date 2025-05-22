# AudioUI Documentation Site

This is the official documentation site for the AudioUI library, a comprehensive collection of React components specifically designed for audio applications, digital audio workstations (DAWs), and music production tools.

## Overview

The AudioUI Documentation site provides:

- Comprehensive component documentation
- Interactive examples
- Installation guides
- API references
- Usage patterns and best practices

## Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Deployment**: Static site generation

## Local Development

```bash
# Install dependencies
npm install
# or
pnpm install

# Start the development server
npm run dev
# or
pnpm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

## Structure

```text
/
├── app/                  # Next.js app directory
│   ├── docs/             # Documentation pages
│   │   ├── components/   # Component documentation
│   │   └── ...          # Other doc sections
├── components/           # Reusable UI components
│   ├── ui/              # Core UI components demonstrated in the docs
│   └── ...              # Site components (navigation, etc.)
├── public/              # Static assets
└── styles/              # Global styles
```

## Building for Production

```bash
# Build the site
npm run build
# or
pnpm run build

# Export as static site (if configured)
npm run export
# or
pnpm run export
```

## Related Resources

- [AudioUI GitHub Repository](https://github.com/profmitchell/AudioUI)
- [AudioUI NPM Package](https://www.npmjs.com/package/audioui)
- [AudioUIJUCEStarterTemplate](https://github.com/profmitchell/AudioUIJUCEStarterTemplate) - JUCE 8 with React integration template
