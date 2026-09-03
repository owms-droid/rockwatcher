import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Set up test env before importing
vi.stubGlobal('import.meta', {
  env: { VITE_NASA_API_KEY: 'test_key' }
});

import { getAsteroids, getAsteroidById, getCacheKey, getCachedData, setCachedData } from '../api/nasaApi.js';

describe('nasaApi.js', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    sessionStorage.clear();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  describe('getCacheKey', () => {
    it('generates consistent cache keys with nasa_ prefix', () => {
      expect(getCacheKey('feed', '2025-01-01', '2025-01-07')).toBe('nasa_feed_2025-01-01_2025-01-07');
      expect(getCacheKey('lookup', '12345')).toBe('nasa_lookup_12345');
    });
  });

  describe('setCachedData and getCachedData', () => {
    it('stores and retrieves data with timestamp', () => {
      const testData = { test: 'data' };
      setCachedData('test_key', testData);
      
      const cached = getCachedData('test_key');
      expect(cached).toEqual(testData);
    });

    it('returns null for non-existent key', () => {
      expect(getCachedData('non_existent')).toBeNull();
    });

    it('returns null and clears expired cache (older than 10 minutes)', () => {
      const testData = { test: 'data' };
      setCachedData('expired_key', testData);
      
      // Advance time by 11 minutes (660000ms)
      vi.advanceTimersByTime(11 * 60 * 1000);
      
      const cached = getCachedData('expired_key');
      expect(cached).toBeNull();
      expect(sessionStorage.getItem('nasa_expired_key')).toBeNull();
    });

    it('returns data for cache within 10 minutes', () => {
      const testData = { test: 'data' };
      setCachedData('fresh_key', testData);
      
      // Advance time by 5 minutes (300000ms)
      vi.advanceTimersByTime(5 * 60 * 1000);
      
      const cached = getCachedData('fresh_key');
      expect(cached).toEqual(testData);
    });
  });

  describe('getAsteroids', () => {
    it('returns cached data when available and fresh', async () => {
      const cachedData = [{ id: '1', name: 'Test Asteroid' }];
      setCachedData('nasa_feed_2025-01-01_2025-01-07', cachedData);
      
      const result = await getAsteroids('2025-01-01', '2025-01-07');
      expect(result).toEqual(cachedData);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('fetches from API when cache is empty', async () => {
      const mockAsteroids = [{ id: '1', name: 'Test Asteroid' }];
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ near_earth_objects: { '2025-01-01': mockAsteroids } })
      });
      
      const result = await getAsteroids('2025-01-01', '2025-01-07');
      expect(result).toEqual(mockAsteroids);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('neo/rest/v1/feed')
      );
    });

    it('returns empty array on API error', async () => {
      fetch.mockResolvedValue({
        ok: false,
        status: 429,
        statusText: 'Too Many Requests'
      });
      
      const result = await getAsteroids('2025-01-01', '2025-01-07');
      expect(result).toEqual([]);
    });
  });

  describe('getAsteroidById', () => {
    it('returns cached data when available and fresh', async () => {
      const cachedData = { id: '12345', name: 'Test Asteroid' };
      setCachedData('nasa_lookup_12345', cachedData);
      
      const result = await getAsteroidById('12345');
      expect(result).toEqual(cachedData);
      expect(fetch).not.toHaveBeenCalled();
    });

    it('fetches single asteroid from API', async () => {
      const mockAsteroid = { id: '12345', name: 'Test Asteroid' };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockAsteroid)
      });
      
      const result = await getAsteroidById('12345');
      expect(result).toEqual(mockAsteroid);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('neo/12345')
      );
    });

    it('returns null on API error', async () => {
      fetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });
      
      const result = await getAsteroidById('12345');
      expect(result).toBeNull();
    });
  });
});