import { getAsteroids } from "../api/nasaApi.js";
import { renderAsteroidList } from "./asteroidList.js";

let cachedAsteroids = [];

// Initialize asteroid list only when container exists
async function init() {
  const asteroidListContainer = document.getElementById("asteroid-list");
  if (!asteroidListContainer) {
    console.log(
      "No asteroid-list container found, skipping asteroid initialization",
    );
    return;
  }

  console.log("Initializing asteroid list...");
  showLoading(true);
  try {
    const today = new Date().toISOString().split("T")[0];
    cachedAsteroids = await getAsteroids(today);
    console.log("Fetched asteroids:", cachedAsteroids.length);
    hideError();
    applySortAndRender();
    wireSortControl();
  } catch (error) {
    console.error("Failed to initialize asteroid list:", error);
    showError("Failed to load asteroid data. Please try again later.");
  } finally {
    showLoading(false);
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
    const distance = approach
      ? parseFloat(approach.miss_distance.kilometers)
      : Number.POSITIVE_INFINITY;
    const speed = approach
      ? parseFloat(approach.relative_velocity.kilometers_per_hour)
      : Number.NEGATIVE_INFINITY;
    return { distance, speed };
  };
  switch (mode) {
    case "distance-desc":
      return arr.sort(
        (a, b) => getMetrics(b).distance - getMetrics(a).distance,
      );
    case "speed-asc":
      return arr.sort((a, b) => getMetrics(a).speed - getMetrics(b).speed);
    case "speed-desc":
      return arr.sort((a, b) => getMetrics(b).speed - getMetrics(a).speed);
    case "distance-asc":
    default:
      return arr.sort(
        (a, b) => getMetrics(a).distance - getMetrics(b).distance,
      );
  }
}

function showLoading(show) {
  const container = document.getElementById("asteroid-list");
  if (!container) return;
  
  let loader = document.getElementById("asteroid-loader");
  if (show) {
    if (!loader) {
      loader = document.createElement("div");
      loader.id = "asteroid-loader";
      loader.className = "loader";
      loader.setAttribute("role", "status");
      loader.setAttribute("aria-live", "polite");
      loader.innerHTML = '<div class="spinner"></div><p>Loading asteroids...</p>';
      container.appendChild(loader);
    }
    loader.style.display = "flex";
  } else if (loader) {
    loader.style.display = "none";
  }
}

function showError(message) {
  const container = document.getElementById("asteroid-list");
  if (!container) return;
  
  let errorEl = document.getElementById("asteroid-error");
  if (!errorEl) {
    errorEl = document.createElement("div");
    errorEl.id = "asteroid-error";
    errorEl.className = "error-banner";
    errorEl.setAttribute("role", "alert");
    container.appendChild(errorEl);
  }
  errorEl.textContent = message;
  errorEl.style.display = "block";
}

function hideError() {
  const errorEl = document.getElementById("asteroid-error");
  if (errorEl) {
    errorEl.style.display = "none";
  }
}

init();
