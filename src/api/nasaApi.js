// NASA NEO Feed endpoint
const API_URL = "https://api.nasa.gov/neo/rest/v1/feed";

// Using a valid API key directly
const API_KEY = "zdUP8ElJv1cehFM0rsZVSQN7uBVxlDnu4diHlLSb";

export async function getAsteroids(startDate, endDate) {
  try {
    const end = endDate || startDate;
    const res = await fetch(
      `${API_URL}?start_date=${startDate}&end_date=${end}&api_key=${API_KEY}`,
    );
    if (!res.ok) {
      throw new Error(`NASA API error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data.near_earth_objects?.[startDate] || [];
  } catch (error) {
    console.error("Error fetching asteroids:", error);
    return [];
  }
}

// Fetch a single asteroid by NASA NEO id
export async function getAsteroidById(asteroidId) {
  try {
    const res = await fetch(
      `${API_URL.replace("/feed", "")}/neo/${asteroidId}?api_key=${API_KEY}`,
    );
    if (!res.ok) {
      throw new Error(`NASA API error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching asteroid by id:", error);
    return null;
  }
}
