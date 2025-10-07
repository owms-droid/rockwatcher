import { getAsteroids } from "./api/nasaApi.js";
import { renderAsteroidList } from "./components/asteroidList.js";
import "./styles/main.css";

async function init() {
  const today = new Date().toISOString().split("T")[0];
  const asteroids = await getAsteroids(today);
  renderAsteroidList(asteroids);
}

init();
