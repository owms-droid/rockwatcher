function renderHeader() {
  const header = document.getElementById("main-header");
  if (header) {
    const isProduction = !import.meta.env.DEV;
    const basePath = isProduction ? "/assets/img" : "/src/images";
    const pagePath = isProduction ? "" : "/src/pages";

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
          <a href="${pagePath}/list.html" class="nav-link">Asteroids</a>
          <a href="${pagePath}/about.html" class="nav-link">About</a>
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
