// src/js/asteroidDetail.js
import { formatDistance, formatSpeed, safeNumber } from "./utils.mjs";
import { renderOrbitChart } from "./orbitChart.js";

export function renderAsteroidDetail(asteroid) {
  const section = document.getElementById("asteroid-detail");
  section.classList.remove("hidden");

  const approach =
    (asteroid.close_approach_data && asteroid.close_approach_data[0]) || null;
  const diameter =
    asteroid.estimated_diameter && asteroid.estimated_diameter.meters
      ? safeNumber(asteroid.estimated_diameter.meters.estimated_diameter_max)
      : "Unknown";

  const speed = approach
    ? approach.relative_velocity.kilometers_per_hour
    : null;
  const distance = approach ? approach.miss_distance.kilometers : null;

  section.innerHTML = `
    <h2 id="detail-heading" tabindex="-1">${asteroid.name || "Unknown"}</h2>
    <p><strong>ID:</strong> ${asteroid.id || "Unknown"}</p>
    <p><strong>Diameter (max):</strong> ${diameter === "Unknown" ? diameter : diameter + " m"}</p>
    <p><strong>Speed:</strong> ${formatSpeed(speed)}</p>
    <p><strong>Distance:</strong> ${formatDistance(distance)}</p>
    <canvas id="orbitChart" width="300" height="300" aria-label="Orbit visualization"></canvas>
    <button id="back-btn">← Back to list</button>
  `;

  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      section.classList.add("hidden");
      // Scroll back to list
      document
        .getElementById("asteroid-list")
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  // Move focus to the detail heading for accessibility
  const heading = document.getElementById("detail-heading");
  if (heading) {
    heading.focus();
  }

  // Render orbit chart (will handle missing data gracefully)
  renderOrbitChart("orbitChart", asteroid);
}
