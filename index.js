/**
 * @rayners/foundry-test-utils
 * 
 * Shared testing utilities and mocks for FoundryVTT modules
 */

// Import mocks to ensure they're available
import './mocks/foundry-mocks.js';

// Export mock utilities
export * from './mocks/foundry-mocks.js';

// Export helper functions
export * from './helpers/setup.js';

// Export type definitions
export * from './types/foundry-types.js';