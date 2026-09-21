export function generateOrderNumber() {
  const y = new Date().getFullYear().toString().slice(-2);
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `DRV-${y}-${rand}`;
}
