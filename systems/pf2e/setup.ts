/**
 * PF2e-specific test environment setup
 * 
 * Provides utilities for setting up PF2e game system environment in tests
 */

/// <reference types="@rayners/foundry-dev-tools/types" />

import { setupFoundryMocks } from '../../mocks/foundry-mocks';

export interface PF2eEnvironmentOptions {
  worldCreationTimestamp?: number;
  currentWorldTime?: number;
  expectedWorldCreationYear?: number;
}

/**
 * Set up a test environment simulating PF2e system
 */
export function setupPF2eEnvironment(options: PF2eEnvironmentOptions = {}) {
  const {
    worldCreationTimestamp = 1609459200, // 2021-01-01 00:00:00 UTC
    currentWorldTime = 0,
    expectedWorldCreationYear = 2025
  } = options;

  // Set up base Foundry environment with PF2e system
  setupFoundryMocks({
    systemId: 'pf2e',
    includeCanvas: false
  });

  // Mock PF2e-specific game object extensions
  if (!(globalThis as any).game) {
    (globalThis as any).game = {};
  }

  // Add PF2e world clock settings
  (globalThis as any).game.pf2e = {
    settings: {
      worldClock: {
        worldCreatedOn: worldCreationTimestamp
      }
    }
  };

  // Set current world time
  if (!(globalThis as any).game.time) {
    (globalThis as any).game.time = {};
  }
  (globalThis as any).game.time.worldTime = currentWorldTime;

  // Return test utilities for verification
  return {
    worldCreationTimestamp,
    currentWorldTime,
    expectedWorldCreationYear,
    verifyPF2eYear: (actualYear: number) => {
      const expectedYear = expectedWorldCreationYear + Math.floor(currentWorldTime / (365 * 24 * 60 * 60));
      return actualYear === expectedYear;
    }
  };
}

/**
 * Create PF2e world creation timestamp hook data structure
 */
export function createPF2eTimestampHookData() {
  return {
    timestamp: null as number | null,
    found: false
  };
}