import { getAsteroidById } from "../api/nasaApi.js";
import { formatDistance, formatSpeed } from "./utils.mjs";
import { renderOrbitChart } from "./orbitChart.js";

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function safeNumber(value, decimals = 2) {
  const n = parseFloat(value);
  if (Number.isNaN(n)) return "Unknown";
  return n.toFixed(decimals);
}

function renderDetail(asteroid) {
  const section = document.getElementById("asteroid-detail");
  if (!section) return;

  const approach = (asteroid.close_approach_data && asteroid.close_approach_data[0]) || null;
  const diameter = asteroid.estimated_diameter && asteroid.estimated_diameter.meters
    ? safeNumber(asteroid.estimated_diameter.meters.estimated_diameter_max)
    : "Unknown";

  const speed = approach ? approach.relative_velocity.kilometers_per_hour : null;
  const distance = approach ? approach.miss_distance.kilometers : null;

  section.innerHTML = `
    <h1>${asteroid.name || "Unknown"}</h1>
    <p><strong>ID:</strong> ${asteroid.id || "Unknown"}</p>
    <p><strong>Diameter (max):</strong> ${diameter === "Unknown" ? diameter : diameter + " m"}</p>
    <p><strong>Speed:</strong> ${formatSpeed(speed)}</p>
    <p><strong>Distance:</strong> ${formatDistance(distance)}</p>
    <canvas id="orbitChart" width="300" height="300" aria-label="Orbit visualization"></canvas>
    <p><a href="/pages/list.html" id="back-link">← Back to list</a></p>
  `;

  renderOrbitChart("orbitChart", asteroid);
}

async function init() {
  const id = getQueryParam("id");
  if (!id) return;

  try {
    const asteroid = await getAsteroidById(id);
    if (asteroid) {
      renderDetail(asteroid);
    }
  } catch (err) {
    console.error("Failed to load asteroid details:", err);
  }
}

init();


