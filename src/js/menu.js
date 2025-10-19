// Import CSS at the top of your entry point
import "../styles/main.css";

// Your existing menu.js code goes here
// Add your menu functionality below

// Example menu rendering (adjust based on your actual menu code)
function renderHeader() {
  const header = document.getElementById("main-header");
  if (header) {
    header.innerHTML = `
      <nav>
        <a href="/">Home</a>
        <a href="/list.html">Asteroids</a>
        <a href="/about.html">About</a>
      </nav>
    `;
  }
}

function renderFooter() {
  const footer = document.getElementById("main-footer");
  if (footer) {
    footer.innerHTML = `
      <p>&copy; ${new Date().getFullYear()} Rock Watcher. Data from NASA NEO API.</p>
    `;
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
