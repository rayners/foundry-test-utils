/**
 * @rayners/foundry-test-utils
 * 
 * Shared testing utilities and mocks for FoundryVTT modules
 */

// Import mocks to ensure they're available
import './mocks/foundry-mocks';

// Export mock utilities
export * from './mocks/foundry-mocks';

// Export helper functions
export * from './helpers/setup';

// Export system-specific test utilities
export * from './systems/pf2e/setup';