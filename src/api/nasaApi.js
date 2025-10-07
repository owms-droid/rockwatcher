const API_KEY = "7AhBdjYv95e7JWvK5VVk0IzQruRtAYeZciQfqAVU"; // Replace with your NASA key
const API_URL = "https://api.nasa.gov/neo/rest/v1/feed";

export async function getAsteroids(startDate) {
  try {
    const res = await fetch(
      `${API_URL}?start_date=${startDate}&api_key=${API_KEY}`,
    );
    if (!res.ok) throw new Error("Failed to fetch asteroid data");
    const data = await res.json();
    return data.near_earth_objects[startDate] || [];
  } catch (error) {
    console.error("Error fetching asteroids:", error);
    return [];
  }
}
