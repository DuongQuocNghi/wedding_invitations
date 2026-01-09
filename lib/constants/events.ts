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
 * Get default tab index for EventDetailsSection based on current date
 * @returns 0 for "Tiệc nhà gái" (before 2026-02-03), 1 for "Lễ tân hôn" (from 2026-02-03 onwards)
 */
export function getDefaultEventTab(): number {
  return isBeforeTargetDate() ? 0 : 1;
}
