
export function formatDistance(km) {
  const distance = parseFloat(km);
  if (Number.isNaN(distance)) return "Unknown distance";
  return `${distance.toLocaleString()} km`;
}

export function formatSpeed(kmh) {
  const speed = parseFloat(kmh);
  if (Number.isNaN(speed)) return "Unknown speed";
  return `${speed.toLocaleString()} km/h`;
}

// Render a string template into a DOM element
export function renderWithTemplate(templateString, element) {
  if (!element) return;
  element.innerHTML = templateString;
}

// load an HTML snippet (template) via fetch
export async function loadTemplate(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Failed to load template: " + path);
    const template = await res.text();
    return template;
  } catch (err) {
    console.error(err);
    return "";
  }
}

// function to dynamically load the header and footer into a page
export async function loadHeaderFooter() {
  try {
    // With Vite root set to ./src, use absolute paths from root
    const headerTemplate = await loadTemplate("/partials/header.html");
    const headerElement = document.querySelector("#main-header");
    const footerTemplate = await loadTemplate("/partials/footer.html");
    const footerElement = document.querySelector("#main-footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
  } catch (err) {
    console.error("Error loading header/footer:", err);
  }
}
