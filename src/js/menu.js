import "../styles/main.css";

function renderHeader() {
  const header = document.getElementById("main-header");
  if (header) {
    const isProduction = window.location.hostname !== "localhost";
    const basePath = isProduction ? "/assets/img" : "/src/images";

    header.innerHTML = `
      <nav class="navbar">
        <a href="/" class="logo-container">
          <img
            class="logo"
            src="${basePath}/rockwatcherlogo.svg"
            alt="RockWatcher Logo"
          />
          <span class="app-name">RockWatcher</span>
        </a>
        <div class="nav-links">
          <a href="/" class="nav-link">Home</a>
          <a href="/list.html" class="nav-link">Asteroids</a>
          <a href="/about.html" class="nav-link">About</a>
        </div>
      </nav>
    `;
  }
}

function renderFooter() {
  const footer = document.getElementById("main-footer");
  if (footer) {
    footer.innerHTML = `
      <p>&copy; ${new Date().getFullYear()} RockWatcher • Data from NASA NEO API</p>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
