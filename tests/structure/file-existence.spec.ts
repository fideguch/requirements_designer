import { test, expect } from '@playwright/test';
import { fileExists, REQUIRED_FILES } from '../helpers/test-helpers';

// ============================================================
// Test Suite 1: File Structure Validation
// ============================================================
test.describe('File Structure', () => {
  for (const file of REQUIRED_FILES) {
    test(`${file} exists`, () => {
      expect(fileExists(file)).toBe(true);
    });
  }
});
