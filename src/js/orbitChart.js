export function renderOrbitChart(canvasId, asteroid = null) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Earth
  ctx.beginPath();
  ctx.arc(150, 150, 20, 0, Math.PI * 2);
  ctx.fillStyle = "#00aaff";
  ctx.fill();

  // Asteroid orbit (mocked as a simple ellipse)
  ctx.beginPath();
  ctx.ellipse(150, 150, 100, 60, 0, 0, Math.PI * 2);
  ctx.strokeStyle = "#ff9900";
  ctx.stroke();

  // Asteroid position (could use real orbital data if available)
  if (asteroid && asteroid.orbital_data) {
    // TODO: Use actual orbital elements from NASA API
    // For now, use a fixed position
    ctx.beginPath();
    ctx.arc(250, 150, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#ff9900";
    ctx.fill();
  } else {
    // Default mocked position
    ctx.beginPath();
    ctx.arc(250, 150, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#ff9900";
    ctx.fill();
  }
}
