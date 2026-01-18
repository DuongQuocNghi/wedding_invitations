// Event date constants
export const EVENT_TARGET_DATE = new Date('2026-02-02');
EVENT_TARGET_DATE.setHours(0, 0, 0, 0); // Set to midnight to ensure accurate date comparison

/**
 * Check if current date is before the target date
 * @returns true if current date < target date (2026-02-03)
 */
export function isBeforeTargetDate(): boolean {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return currentDate < EVENT_TARGET_DATE;
}

/**
 * Get query parameter from URL
 * @param key - query parameter key
 * @returns query parameter value or null
 */
export function getQueryParam(key: string): string | null {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}

/**
 * Get default tab index for EventDetailsSection based on query param or current date
 * @returns 0 for "Tiệc nhà gái", 1 for "Lễ tân hôn"
 */
export function getDefaultEventTab(): number {
  // Check query parameter first
  const aParam = getQueryParam('a');
  if (aParam === '1') {
    return 1; // Lễ tân hôn
  }
  // Otherwise use date-based logic
  return isBeforeTargetDate() ? 0 : 1;
}

/**
 * Check if should show groom's side (Lễ tân hôn) based on query param or date
 * @returns true if should show groom's side
 */
export function shouldShowGroomSide(): boolean {
  // Check query parameter first
  const aParam = getQueryParam('a');
  if (aParam === '1') {
    return true; // Show groom's side
  }
  // Otherwise use date-based logic
  return !isBeforeTargetDate();
}
