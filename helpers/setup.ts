/**
 * Common test setup for FoundryVTT modules
 * 
 * This file sets up the basic environment needed for testing Foundry modules.
 * Import this in your vitest.config.js setupFiles array.
 */

import { vi, beforeEach } from 'vitest';
import '../mocks/foundry-mocks.js';

// Mock jQuery if not already available
if (typeof global.$ === 'undefined') {
  global.$ = vi.fn(() => ({
    ready: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    find: vi.fn(() => ({ length: 0 })),
    append: vi.fn(),
    remove: vi.fn(),
    addClass: vi.fn(),
    removeClass: vi.fn(),
    hasClass: vi.fn(() => false),
    attr: vi.fn(),
    prop: vi.fn(),
    val: vi.fn(),
    text: vi.fn(),
    html: vi.fn(),
    css: vi.fn(),
    hide: vi.fn(),
    show: vi.fn(),
    trigger: vi.fn(),
    click: vi.fn(),
    submit: vi.fn()
  }));
  global.jQuery = global.$;
}

// Setup DOM environment
beforeEach(() => {
  // Clear any existing DOM
  document.body.innerHTML = '';
  
  // Reset all mocks
  vi.clearAllMocks();
  
  // Ensure game object is properly reset
  if (global.game) {
    // Reset collections
    Object.keys(global.game).forEach(key => {
      if (global.game[key] && typeof global.game[key] === 'object' && global.game[key].clear) {
        global.game[key].clear();
      }
    });
  }
});

// Common test utilities
export const createMockElement = (tagName: string = 'div', attributes: Record<string, string> = {}) => {
  const element = document.createElement(tagName);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
};

export const createMockEvent = (type: string, options: any = {}) => {
  return new Event(type, options);
};

export const waitForNextTick = () => new Promise(resolve => setTimeout(resolve, 0));