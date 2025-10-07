import { formatDistance, formatSpeed } from "../utils/helpers.js";
import { renderOrbitChart } from "./orbitChart.js";

export function renderAsteroidDetail(asteroid) {
  const section = document.getElementById("asteroid-detail");
  section.classList.remove("hidden");

  section.innerHTML = `
    <h2>${asteroid.name}</h2>
    <p><strong>ID:</strong> ${asteroid.id}</p>
    <p><strong>Diameter:</strong> ${asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} m</p>
    <p><strong>Speed:</strong> ${formatSpeed(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour)}</p>
    <p><strong>Distance:</strong> ${formatDistance(asteroid.close_approach_data[0].miss_distance.kilometers)}</p>
    <canvas id="orbitChart" width="300" height="300"></canvas>
    <button id="back-btn">← Back to list</button>
  `;

  document.getElementById("back-btn").addEventListener("click", () => {
    section.classList.add("hidden");
  });

  renderOrbitChart("orbitChart", asteroid);
}
