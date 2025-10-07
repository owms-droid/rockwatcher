export function formatDistance(km) {
  const distance = parseFloat(km);
  return `${distance.toLocaleString()} km`;
}

export function formatSpeed(kmh) {
  const speed = parseFloat(kmh);
  return `${speed.toLocaleString()} km/h`;
}
