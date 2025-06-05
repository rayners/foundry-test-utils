# @rayners/foundry-test-utils

Shared testing utilities and mocks for FoundryVTT modules.

## Installation

```bash
npm install --save-dev @rayners/foundry-test-utils
```

## Usage

### Basic Setup

In your `vitest.config.ts`:

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['@rayners/foundry-test-utils/helpers/setup.js']
  }
});
```

### Using Foundry Mocks

The package automatically sets up comprehensive Foundry VTT mocks including:

- `game` object with settings, time, user, collections
- `ui` object with notifications, sidebar, etc.
- `canvas` object with scene, grid, dimensions
- `Hooks` API for event handling
- `foundry.applications.api` for ApplicationV2 and mixins
- Document classes (JournalEntry, User, Folder, etc.)
- Utility functions (duplicate, mergeObject, etc.)

```javascript
import { describe, it, expect } from 'vitest';

describe('My Foundry Module', () => {
  it('should access game object', () => {
    expect(game).toBeDefined();
    expect(game.user).toBeDefined();
    expect(game.settings).toBeDefined();
  });

  it('should use Hooks API', () => {
    const hookId = Hooks.on('ready', () => {});
    expect(typeof hookId).toBe('number');
  });
});
```

### Custom Mock Utilities

The package provides helper functions for creating test elements and events:

```javascript
import { createMockElement, createMockEvent, waitForNextTick } from '@rayners/foundry-test-utils';

describe('DOM testing', () => {
  it('should create mock elements', () => {
    const button = createMockElement('button', { 
      'data-action': 'test',
      class: 'my-button'
    });
    
    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('data-action')).toBe('test');
  });

  it('should create mock events', () => {
    const clickEvent = createMockEvent('click', { bubbles: true });
    expect(clickEvent.type).toBe('click');
  });

  it('should wait for next tick', async () => {
    let value = 1;
    setTimeout(() => value = 2, 0);
    
    await waitForNextTick();
    expect(value).toBe(2);
  });
});
```

### Advanced Mock Configuration

You can extend or customize the mocks in your tests:

```javascript
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  // Customize game settings for specific tests
  game.settings = {
    get: vi.fn((module, key) => {
      if (module === 'my-module' && key === 'debug') return true;
      return false;
    }),
    set: vi.fn()
  };

  // Mock specific user permissions
  game.user = {
    id: 'test-user',
    name: 'Test User',
    isGM: true,
    can: vi.fn(() => true)
  };
});
```

### ApplicationV2 Testing

The package includes mocks for Foundry's ApplicationV2 system:

```javascript
import { foundry } from '@rayners/foundry-test-utils';

class MyWidget extends foundry.applications.api.ApplicationV2 {
  static DEFAULT_OPTIONS = {
    tag: 'div',
    classes: ['my-widget']
  };

  async _prepareContext() {
    return { title: 'Test Widget' };
  }
}

describe('ApplicationV2 Widget', () => {
  it('should create widget instance', () => {
    const widget = new MyWidget();
    expect(widget).toBeInstanceOf(foundry.applications.api.ApplicationV2);
  });
});
```

### jQuery Mocking

Basic jQuery functionality is mocked for compatibility:

```javascript
describe('jQuery compatibility', () => {
  it('should provide jQuery functions', () => {
    const $element = $('<div>');
    expect($element.addClass).toBeDefined();
    expect($element.removeClass).toBeDefined();
    expect($element.find).toBeDefined();
  });
});
```

## What's Included

### Mocks
- **foundry-mocks.ts**: Comprehensive Foundry VTT environment mocking (~600 lines)
- Complete `game` object with all major collections and APIs
- `ui`, `canvas`, `Hooks`, `CONFIG` objects
- Document classes and utility functions
- ApplicationV2 and HandlebarsApplicationMixin support

### Helpers
- **setup.ts**: Automated test environment setup
- DOM element creation utilities
- Event creation helpers
- Async testing utilities

### Types
- **foundry-types.d.ts**: Essential TypeScript definitions for testing
- Global Foundry object interfaces
- Document class definitions
- API type definitions

## Migrating from Individual Mocks

If you currently have `test/foundry-mocks.ts` in your modules:

1. Remove the local `foundry-mocks.ts` file
2. Update imports from `'./foundry-mocks'` to `'@rayners/foundry-test-utils'`
3. Update your vitest config setup files
4. Remove duplicate mock code (~600 lines per module!)

## GitHub Packages

This package is published to GitHub Packages. Make sure your `.npmrc` includes:

```
@rayners:registry=https://npm.pkg.github.com
```

## License

MIT