// NASA NEO Feed endpoint
const API_URL = "https://api.nasa.gov/neo/rest/v1/feed";

// Get API key from environment variable (required)
const API_KEY = import.meta.env.VITE_NASA_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_NASA_API_KEY environment variable is required. Create a .env file with your NASA API key.");
}

// Cache configuration
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export function getCacheKey(type, ...params) {
  return `nasa_${type}_${params.join('_')}`;
}

export function getCachedData(key) {
  try {
    const cached = sessionStorage.getItem(key);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_TTL_MS) {
      sessionStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function setCachedData(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // Ignore storage errors (e.g., quota exceeded)
  }
}

export async function getAsteroids(startDate, endDate) {
  const end = endDate || startDate;
  const cacheKey = getCacheKey('feed', startDate, end);
  
  // Check cache first
  const cached = getCachedData(cacheKey);
  if (cached) {
    console.log('Returning cached asteroid data');
    return cached;
  }

  try {
    const res = await fetch(
      `${API_URL}?start_date=${startDate}&end_date=${end}&api_key=${API_KEY}`,
    );
    if (!res.ok) {
      throw new Error(`NASA API error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    const asteroids = data.near_earth_objects?.[startDate] || [];
    
    // Cache the result
    setCachedData(cacheKey, asteroids);
    return asteroids;
  } catch (error) {
    console.error("Error fetching asteroids:", error);
    return [];
  }
}

// Fetch a single asteroid by NASA NEO id
export async function getAsteroidById(asteroidId) {
  const cacheKey = getCacheKey('lookup', asteroidId);
  
  // Check cache first
  const cached = getCachedData(cacheKey);
  if (cached) {
    console.log('Returning cached asteroid detail');
    return cached;
  }

  try {
    const res = await fetch(
      `${API_URL.replace("/feed", "")}/neo/${asteroidId}?api_key=${API_KEY}`,
    );
    if (!res.ok) {
      throw new Error(`NASA API error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    
    // Cache the result
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching asteroid by id:", error);
    return null;
  }
}
