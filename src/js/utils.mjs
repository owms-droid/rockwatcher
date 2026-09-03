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
