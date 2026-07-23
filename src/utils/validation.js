export function isNonEmptyString(value) {
  return String(value ?? "").trim().length > 0;
}

export function isValidEmail(value) {
  const normalized = String(value ?? "").trim();
  if (!normalized) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}
