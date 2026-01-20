import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Cleanup après chaque test
afterEach(() => {
  cleanup();
});

// Configuration globale si nécessaire
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

export { expect };
