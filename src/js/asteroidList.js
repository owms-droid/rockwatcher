// src/js/asteroidList.js
import { renderAsteroidDetail } from "./asteroidDetail.js";
import { formatDistance, formatSpeed } from "./utils.mjs";

function safeGetApproach(asteroid) {
  return (
    (asteroid.close_approach_data && asteroid.close_approach_data[0]) || null
  );
}

export function renderAsteroidList(asteroids) {
  const container = document.getElementById("asteroid-list");
  container.innerHTML = "<h2>Today's Closest Asteroids</h2>";

  if (!Array.isArray(asteroids) || asteroids.length === 0) {
    container.innerHTML += "<p>No asteroid data available.</p>";
    return;
  }

  // Assume provided array already in desired order
  const sorted = asteroids;

  const list = document.createElement("ul");
  list.classList.add("asteroid-list");

  sorted.forEach((asteroid) => {
    const approach = safeGetApproach(asteroid);
    const speed = approach
      ? approach.relative_velocity.kilometers_per_hour
      : "N/A";
    const distance = approach ? approach.miss_distance.kilometers : "N/A";

    const li = document.createElement("li");
    li.classList.add("asteroid-item");
    li.innerHTML = `
      <strong>${asteroid.name || "Unknown"}</strong>
      <p>Speed: ${formatSpeed(speed)}</p>
      <p>Distance: ${formatDistance(distance)}</p>
      <button class="detail-btn">View Details</button>
    `;
    li.querySelector(".detail-btn").addEventListener("click", () => {
      const id = asteroid.id || asteroid.neo_reference_id;
      if (id) {
        window.location.href = `/pages/details.html?id=${encodeURIComponent(id)}`;
      }
    });
    list.appendChild(li);
  });

  container.appendChild(list);
}
