import { renderAsteroidDetail } from "./asteroidDetail.js";
import { formatDistance, formatSpeed } from "../utils/helpers.js";

export function renderAsteroidList(asteroids) {
  const container = document.getElementById("asteroid-list");
  container.innerHTML = "<h2>Today's Closest Asteroids</h2>";

  if (!asteroids.length) {
    container.innerHTML += "<p>No asteroid data available.</p>";
    return;
  }

  const list = document.createElement("ul");
  list.classList.add("asteroid-list");

  asteroids.forEach((asteroid) => {
    const li = document.createElement("li");
    li.classList.add("asteroid-item");
    li.innerHTML = `
      <strong>${asteroid.name}</strong>
      <p>Speed: ${formatSpeed(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour)}</p>
      <p>Distance: ${formatDistance(asteroid.close_approach_data[0].miss_distance.kilometers)}</p>
      <button class="detail-btn">View Details</button>
    `;
    li.querySelector(".detail-btn").addEventListener("click", () => {
      renderAsteroidDetail(asteroid);
    });
    list.appendChild(li);
  });

  container.appendChild(list);
}
