# No Duplicate Chrome Tabs Extension

A TypeScript Chrome extension that automatically prevents duplicate tabs by focusing existing tabs with the same URL instead of creating new ones.

## Features

- Automatically detects when a duplicate tab is being created
- Focuses the existing tab and removes the duplicate
- Handles cross-window tab focusing
- Ignores system URLs (chrome://, about:, etc.)
- Normalizes URLs by removing hash fragments

## Installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Build the extension: `npm run build`
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode"
6. Click "Load unpacked" and select the extension directory

## Development

### Setup

```bash
npm install
```

### Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint on TypeScript files
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format TypeScript code with Prettier
- `npm run format:check` - Check TypeScript code formatting
- `npm run clean` - Remove build artifacts

### Project Structure

```
src/
├── background.ts          # Main extension logic (TypeScript)
├── background.test.ts     # Tests for background script
dist/
├── background.js          # Compiled JavaScript (generated)
```

### Testing

The extension uses Jest for testing with Chrome API mocks and TypeScript support.

```bash
npm test
```

## Files

- `src/background.ts` - Main extension logic in TypeScript
- `dist/background.js` - Compiled JavaScript (referenced by manifest)
- `manifest.json` - Extension manifest
- `tsconfig.json` - TypeScript configuration
