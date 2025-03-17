import { screen } from "@testing-library/react"
import { renderWithProvider } from "../test-utils"
import AppSidebar from "../components/AppSidebar"

it("has correct padding for menu items", () => {
  renderWithProvider(<AppSidebar />)

  const menuItem = screen.getByRole("link")
  expect(menuItem).toHaveClass("px-4")
})

