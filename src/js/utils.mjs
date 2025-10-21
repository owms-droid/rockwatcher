
export function safeNumber(value, decimals = 2) {
  const n = parseFloat(value);
  if (Number.isNaN(n)) return "Unknown";
  return n.toFixed(decimals);
}

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
    console.log("Loading template from:", path);
    const res = await fetch(path);
    if (!res.ok) throw new Error("Failed to load template: " + path);
    const template = await res.text();
    console.log("Template loaded successfully:", template.length, "characters");
    return template;
  } catch (err) {
    console.error("Error loading template:", err);
    return "";
  }
}

// function to dynamically load the header and footer into a page
export async function loadHeaderFooter() {
  try {
    console.log("Loading header and footer...");
    // Check if we're in the root directory or src directory
    const isRoot = window.location.pathname.endsWith('/') || 
                  window.location.pathname.endsWith('index.html') || 
                  !window.location.pathname.includes('/src/');
    
    // Use different paths based on location
    const headerPath = isRoot ? "./src/partials/root-header.html" : "../partials/header.html";
    const footerPath = isRoot ? "./src/partials/footer.html" : "../partials/footer.html";
    
    console.log("Using header path:", headerPath);
    
    const headerTemplate = await loadTemplate(headerPath);
    const headerElement = document.querySelector("#main-header");
    const footerTemplate = await loadTemplate(footerPath);
    const footerElement = document.querySelector("#main-footer");

    console.log("Header element found:", !!headerElement);
    console.log("Header template loaded:", !!headerTemplate);
    console.log("Footer element found:", !!footerElement);
    console.log("Footer template loaded:", !!footerTemplate);

    if (headerElement && headerTemplate) {
      renderWithTemplate(headerTemplate, headerElement);
      console.log("Header rendered successfully");
    } else {
      console.warn("Header element or template not found");
    }
    
    if (footerElement && footerTemplate) {
      renderWithTemplate(footerTemplate, footerElement);
      console.log("Footer rendered successfully");
    } else {
      console.warn("Footer element or template not found");
    }
  } catch (err) {
    console.error("Error loading header/footer:", err);
  }
}
