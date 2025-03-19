// List of menu items that should be hidden from the UI
export const hiddenMenuItems = [
  "/credit-allocation/internal-reservations",
  "/credit-allocation/my-recipients",
  "/credit-allocation/distribution-reports",
  "/credit-allocation/forecasting",
  "/credit-allocation/allocation-timeline",
  "/credit-allocation/change-history",
  "/credit-allocation/export-reporting",
  "/credit-allocation/calendar",
]

// Function to check if a menu item should be hidden
export function isHiddenMenuItem(path: string): boolean {
  // Don't hide the main credit allocation routes
  if (path === "/credit-allocation" || 
      path === "/credit-allocation/create" ||
      path === "/credit-allocation/entity-directory" ||
      path === "/credit-allocation/usage-analytics" ||
      path === "/credit-allocation/allocation-summary") {
    return false;
  }
  return hiddenMenuItems.includes(path);
}

