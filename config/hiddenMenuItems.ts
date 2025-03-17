// List of menu items that should be hidden from the UI
export const hiddenMenuItems = [
  "/credit-allocation/usage-analytics",
  "/credit-allocation/distribution-reports",
  "/credit-allocation/forecasting",
  "/credit-allocation/change-history",
  "/credit-allocation/export-reporting",
]

// Function to check if a menu item should be hidden
export function isHiddenMenuItem(path: string): boolean {
  return hiddenMenuItems.includes(path)
}

