import { describe, it, expect } from 'vitest';
import { safeNumber, formatDistance, formatSpeed } from '../js/utils.mjs';

describe('utils.mjs', () => {
  describe('safeNumber', () => {
    it('returns formatted number string for valid numbers', () => {
      expect(safeNumber(42)).toBe('42.00');
      expect(safeNumber(0)).toBe('0.00');
      expect(safeNumber(-5)).toBe('-5.00');
      expect(safeNumber(3.14)).toBe('3.14');
    });

    it('returns "Unknown" for non-numbers', () => {
      expect(safeNumber('hello')).toBe('Unknown');
      expect(safeNumber(null)).toBe('Unknown');
      expect(safeNumber(undefined)).toBe('Unknown');
      expect(safeNumber({})).toBe('Unknown');
      expect(safeNumber([])).toBe('Unknown');
    });

    it('respects decimals parameter', () => {
      expect(safeNumber(3.14159, 3)).toBe('3.142');
      expect(safeNumber(42, 0)).toBe('42');
    });
  });

  describe('formatDistance', () => {
    it('formats large numbers with commas and "km" suffix', () => {
      expect(formatDistance(1000000)).toBe('1,000,000 km');
      expect(formatDistance(1234567)).toBe('1,234,567 km');
    });

    it('returns "Unknown distance" for invalid input', () => {
      expect(formatDistance(null)).toBe('Unknown distance');
      expect(formatDistance(undefined)).toBe('Unknown distance');
      expect(formatDistance('abc')).toBe('Unknown distance');
      expect(formatDistance(NaN)).toBe('Unknown distance');
    });

    it('handles small numbers correctly', () => {
      expect(formatDistance(100)).toBe('100 km');
      expect(formatDistance(0)).toBe('0 km');
    });
  });

  describe('formatSpeed', () => {
    it('formats speed with "km/h" suffix', () => {
      expect(formatSpeed(1000)).toBe('1,000 km/h');
      expect(formatSpeed(50000)).toBe('50,000 km/h');
    });

    it('returns "Unknown speed" for invalid input', () => {
      expect(formatSpeed(null)).toBe('Unknown speed');
      expect(formatSpeed(undefined)).toBe('Unknown speed');
      expect(formatSpeed('abc')).toBe('Unknown speed');
      expect(formatSpeed(NaN)).toBe('Unknown speed');
    });

    it('handles small numbers correctly', () => {
      expect(formatSpeed(100)).toBe('100 km/h');
      expect(formatSpeed(0)).toBe('0 km/h');
    });
  });
});