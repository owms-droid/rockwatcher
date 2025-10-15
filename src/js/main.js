import { getAsteroids } from "../api/nasaApi.js";
import { renderAsteroidList } from "./asteroidList.js";

let cachedAsteroids = [];

// Initialize asteroid list only when container exists
async function init() {
  const asteroidListContainer = document.getElementById("asteroid-list");
  if (!asteroidListContainer) return;

  try {
    const today = new Date().toISOString().split("T")[0];
    cachedAsteroids = await getAsteroids(today);
    applySortAndRender();
    wireSortControl();
  } catch (error) {
    console.error("Failed to initialize asteroid list:", error);
  }
}

function wireSortControl() {
  const select = document.getElementById("sortSelect");
  if (!select) return;
  select.addEventListener("change", applySortAndRender);
}

function applySortAndRender() {
  const select = document.getElementById("sortSelect");
  const mode = select ? select.value : "distance-asc";
  const sorted = sortAsteroids(cachedAsteroids, mode);
  renderAsteroidList(sorted);
}

function sortAsteroids(asteroids, mode) {
  const arr = asteroids.slice();
  const getMetrics = (a) => {
    const approach = a.close_approach_data && a.close_approach_data[0];
    const distance = approach ? parseFloat(approach.miss_distance.kilometers) : Number.POSITIVE_INFINITY;
    const speed = approach ? parseFloat(approach.relative_velocity.kilometers_per_hour) : Number.NEGATIVE_INFINITY;
    return { distance, speed };
  };
  switch (mode) {
    case "distance-desc":
      return arr.sort((a, b) => getMetrics(b).distance - getMetrics(a).distance);
    case "speed-asc":
      return arr.sort((a, b) => getMetrics(a).speed - getMetrics(b).speed);
    case "speed-desc":
      return arr.sort((a, b) => getMetrics(b).speed - getMetrics(a).speed);
    case "distance-asc":
    default:
      return arr.sort((a, b) => getMetrics(a).distance - getMetrics(b).distance);
  }
}

init();
