// List of menu items that should be hidden from the UI
export const hiddenMenuItems = [
  "/credit-allocation/internal-reservations",
  "/credit-allocation/entity-directory",
  "/credit-allocation/my-recipients",
  "/credit-allocation/allocation-summary",
  "/credit-allocation/usage-analytics",
  "/credit-allocation/distribution-reports",
  "/credit-allocation/forecasting",
  "/credit-allocation/allocation-timeline",
  "/credit-allocation/change-history",
  "/credit-allocation/export-reporting",
  "/credit-allocation/calendar",
]

// Function to check if a menu item should be hidden
export function isHiddenMenuItem(path: string): boolean {
  return hiddenMenuItems.includes(path)
}

